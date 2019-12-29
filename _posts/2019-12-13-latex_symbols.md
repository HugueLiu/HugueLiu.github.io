---
layout:     post
title:      LaTex符号（1）：数学字体
subtitle:   latex中数学公式中常用字体
date:       2019-12-13
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - latex
---

# LaTex符号（1）：数学字体

---

1. `\mathbb`(blackboard bold, 黑板粗体)

    对于大写字母可以实现空心字体  
    $\mathbb{ABCDEN}$(`\mathbb{ABCDEN}`)  

2. `\mathcal`(calligraphy, 美术字)

    花体字  
    $\mathcal L$(`\mathcal L`): 常用来表示损失函数  
    $\mathcal D$(`\mathcal D`): 表示样本集  
    $\mathcal N$(`\mathcal N`): 常用来表示高斯分布

3. `\mathrm`(math roman)

    公式中的英文字母为正体，常用来表示计量单位、函数、常数、运算符等。  
    $\mathrm{kg}$(`\mathrm{kg}`): 千克  
    $\mathrm{sin}$(`\mathrm{sin}`): 正弦函数（latex中有专门表示正弦函数的符号`\sin`）  
    $\mathrm{d}$(`\mathrm{d}`): 微分符号

4. `mathbf`(math boldface)

    粗体，可以用来表示矩阵或向量符号  
    $\mathbf{Ax=b}$(`\mathbf{Ax=b}`)

5. `mathfrak`(math fraktur, 德文尖角体)

    一种拉丁字母的书法，有较多棱角，李代数中使用该字体。  
    $\mathfrak{se}(3)$(`\mathfrak{se}(3)`)

6. 其他字体

    以下分别为默认、`mathsf`、`\mathtt`、`\mathit`

    $$
    {f(x,y) = 3(x+y)y / (2xy-7)}\\
    \mathsf{f(x,y) = 3(x+y)y / (2xy-7)}\\
    \mathtt{f(x,y) = 3(x+y)y / (2xy-7)}\\
    \mathit{f(x,y) = 3(x+y)y / (2xy-7)}
    $$

## 参考文章

1. [LaTeX —— 特殊符号与数学字体](https://blog.csdn.net/lanchunhui/article/details/54633576)
2. [德文尖角体](https://zh.wikipedia.org/wiki/%E5%BE%B7%E6%96%87%E5%B0%96%E8%A7%92%E9%AB%94)