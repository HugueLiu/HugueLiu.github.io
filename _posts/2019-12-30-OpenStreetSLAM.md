---
layout:     post
title:      openStreetSLAM 论文阅读笔记
date:       2019-12-30
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - SLAM
    - OSM
---

# openStreetSLAM 论文阅读笔记

---

> 基于论文 *OpenStreetSLAM: Global Vehicle Localization Using OpenStreetMaps* 。

OpenStreetSLAM 将前端 VO 算法与 openStreetMap [1] 统一进一个蒙特卡洛定位框架中，可以在没有回环检测的情况下，避免长时间运行导致的漂移累计，得到更好的定位及建图效果。

文章假设 VO 在短距离内的定位是准确的，该假设是很合理的。文中用 GPS 提供初值，该初值可以误差很大，它只是用来提供一个大致的范围，并且根据该初值下载对应地点的 openStreetMap。

文章主要包括三个部分：VO 前端、Chamfer matching 以及 Monte Carlo 定位。

## 1. VO 前端

VO 前端对双目的左右图像分别提取 Harris 角点，而选择 Harris 角点是基于以下考虑：（1）图像的变换响应稳定、可重复；（2）速度快；（3）因为不包括回环，所以无需考虑尺度不变性。特征提取时将图像分为10*10的网格，为每个网格分别设置阈值。

提取特征点后，计算一个11*11的描述子，随后分别对同一时刻的左右图像及前后帧图像使用归一化交叉相关（Normalized Cross Correlation，NCC）[2] 匹配，匹配后通过三角化得到三维点。

使用三组匹配点（triplet）可以得到前后帧的相对位姿，选取多组 triplet 并使用 RANSAC 得到最佳估计值。同时使用了匀速卡尔曼滤波（constant-velocity Kalman filter）减小动态物体的影响。

## 2. Chamfer matching

Chamfer matching 是用来匹配两个边缘图像（edge map），并计算它们之间的二维变换矩阵 $\mathbf H=(\theta, t_x,t_y)$，$\mathbf H \in SE(2)$ 。

$$
\begin{equation}
\hat{\mathbf H}=\arg\min_{\mathbf H\in SE(2)}d_{CM}(\mathbf W(Q;\mathbf H),T)
\end{equation}
$$

其中，$\mathbf Q=\{\mathbf q_i\},\mathbf T=\{\mathbf t_i\}$ 分别为待匹配图像及模版图像，$d_{CM}$ 为距离，$\mathbf W(Q;\mathbf H)$ 为变换。

$$
\begin{equation}
\mathbf{W}(Q ; \mathbf{H})=\mathbf{H} \cdot Q 
\end{equation}
$$

$$
\begin{equation}
d_{C M}(Q, T)=\frac{1}{|Q|} \sum_{\mathbf{q}_i \in Q} \min _{\mathbf{t}_{j} \in T}\left|\mathbf{q}_{\boldsymbol{i}}-\mathbf{t}_{j}\right|
\end{equation}
$$

### Fast Directional Chamfer Matching (FDCM)

FDCM [3] 将边缘图像中的点转换为线段，而线段的数量远远小于点的数量。此外，FDCM 还在 cost function 中加入了方向信息，因此速度较快。openStreetSLAM 中使用的是 FDCM 。

## 3. Monte Carlo(MC) 定位

MC 从多个粒子中递归地估计当前状态 $\mathbf x_t$ 。MC将当前粒子中作为初始点，并依据运动模型进行采样，然后根据观测模型对采样的粒子进行评估，并分配一个权重。最后根据权重进行重采样，通过加权平均得到最终状态估计。

论文中将里程计模型作为运动模型，Champfer matching 中 cost function 的指数分布作为观测模型：

$$
\begin{equation}
w^{[m]}=\lambda \exp ^{-\lambda \cdot d_{CM}^{[m]}}, \quad m \in 1 \ldots M
\end{equation}
$$

其中的$\lambda$为经验值。

<font color="red">运动模型为状态量 $\mathbf x_{k-1}$ 到 $\mathbf x_{k}$ 的变化，观测模型是在 $\mathbf x_k$ 状态下对路标 $\mathbf y$ 的观测值 $\mathbf z_k$ 。所以将里程计模型作为运动模型很好理解，$d_{CM}$ 表示当前帧与 openStreetMap 的距离，可以将 openStreetMap 理解为一种路标，因此 $d_{CM}$ 也是一种测量值，它的函数可以作为观测模型。</font>

## 4. MCL 与 OpenStreetMap 的结合

初始阶段，通过GPS获得一个初始定位并下载地图，将地图转化为边缘地图（line segment）为后续 Chamfer matching 的模版，同时为了减小后续计算量，文中将线段方向离散化为 60 个角度，并计算了距离变换（distance transform）[4]。距离变换计算图像中各个像素距离背景的距离，一般是到零值的距离。

机器人行走距离及转向角度达到一定阈值后，通过 FDCM 匹配得到多个可能的初始位置，为每个可能的位置分配粒子及权重，每个粒子保留 $p$ 个历史位姿便于进行匹配。随后进行 MC 定位并根据匹配情况调整权重，并进行重采样。

## 附录

距离变换计算公式如下所示：

$$
\begin{equation}
DT(x)=\min _{t_j \in T}\left|x-t_j\right|
\end{equation}
$$

其中 $$v_j$$ 为二值边缘图像中的边缘点（一般为黑色，灰度值为0），则上式表示对于图像中的每个像素，计算相对于边缘点的最近距离。

若边缘图像为：

|255|255|255|255|255|
|:-:|:-:|:-:|:-:|:-:|
|255|0|255|255|255|
|255|0|255|255|255|
|255|0|255|255|255|

则其距离变换后为：

|2|1|2|3|4|
|:-:|:-:|:-:|:-:|:-:|
|1|0|1|2|3|
|1|0|1|2|3|
|1|0|1|2|3|

在 Chamfer Matching 中将模版图像进行距离变换后，则两张图像之间的距离变为：

$$
\begin{equation}
d_{CM}(Q, T)=\frac{1}{|Q|} \sum_{\mathbf q_i \in Q} DT_{T}\left(\mathbf q_i\right)
\end{equation}
$$

对于匹配图像 $Q$，只需要计算其中每一点 $\mathbf q_i$ 在模版图像对应位置的距离的平均值即可。

相比于 CM，FDCM 首先将边缘图像中的点采样后转换为线段，不不仅可以减少点的数量，点的方向也更准确（即为直线方向），同时还加入了线段方向信息，并将方向进行离散化，即将 $[0, \pi)$ 均匀分为 $p$ 段，假设分为9段，则方向 $\hat\Phi = \{\hat\phi_i\}=\{0°,20°,40°,60°,80°,100°,120°,140°,160°\}$。加上方向后的距离变换为：

$$
\begin{equation}
DT3(x, \phi(x))=\min_{\hat\phi_i \in \hat{\Phi}}\left(DT_{\left\{\hat{\phi}_{i}\right\}}+\lambda\left|\hat\phi(x)-\phi_i\right|\right)
\end{equation}
$$

注意计算距离时仍然是逐点计算，而不是计算直线。 **话说这里按照线段计算可行吗？** 上式计算距离和方向的加权最小值，即首先固定方向，计算每个 $\phi_i$ 方向上的最小值，然后在其中选择最小的一个。公式中的 $\hat\phi(x)$ 为 $\phi(x)$ 最接近的离散化 $\hat\phi_i$。

## 参考文章

1. [OpenStreetMap](https://www.openstreetmap.org/)
2. [归一化交叉相关Normalization cross correlation (NCC)](https://www.cnblogs.com/YiXiaoZhou/p/5998153.html)
3. [啥是Fast Directional Chamfer Matching](https://zhuanlan.zhihu.com/p/51580821)
4. [Distance Transform  距离变换](https://blog.csdn.net/u012566751/article/details/54233788)
