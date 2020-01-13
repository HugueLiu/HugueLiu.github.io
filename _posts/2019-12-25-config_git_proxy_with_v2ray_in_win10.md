---
layout:     post
title:      在 win10 中为 git 命令设置代理（v2rayN）
date:       2019-12-25
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - git
    - proxy
---


# 在win10中为git命令设置代理（v2rayN）

---

在win10中为git命令设置代理，代理软件为v2rayN，有两种设置方式：`http`和`scoks`

## 1. 设置`scoks`代理

在`参数设置`-`Core:基础设置`中可以查看本地`socks`端口号，一般为1080。
在命令行中使用以下命令设置git代理：

```bash{.line-numbers}
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
```

## 2. 设置`http`代理

不知道本地`http`端口是在哪设置的，应该是和`socks`端口号有关。
把v2rayN设为全局模式，打开win10的设置中代理，可以看到`socks`端口号，我这里是1081。
在命令行中使用以下命令设置git代理：

```bash{.line-numbers}
git config --global http.proxy http://127.0.0.1:1081
git config --global https.proxy https://127.0.0.1:1081
```

## 3. 取消代理设置

```bash{.line-numbers}
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 注意：

1. 在执行`git clone`时，该方法只适用于http方式，不适用于ssh方式。ssh方式推荐使用proxychains(linux)。


## 参考文章：

1. [一招 git clone 加速](https://juejin.im/post/5cfe66406fb9a07edb393c56)