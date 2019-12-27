---
layout:     post
title:      LaTex符号（2）：括号
subtitle:   latex中各种括号的写法
date:       2019-12-13
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - latex
    - markdown
    - mathjax
---

# LaTex符号（2）：括号

---

## 1. 短括号

|用法、名称|语法|显示|
|-|-|-|
|小括号|`( )`|$( )$|
|中括号|`[ ]`|$[ ]$|
|大括号|`\{ \}`|$\{ \}$|
|尖括号|`\langle \rangle`|$\langle \rangle$|
|单竖线|`| |`|\| \||
|双竖线|`|| ||`或`\| \|`|$\|\|$|
|向下取整|`\lfloor \rfloor`|$\lfloor \rfloor$|
|向上取整|`\lceil \rceil`|$\lceil \rceil$|

## 2. 长括号

普通括号如()、[]、{}、| |等通过在左右括号前分别添加`\left\ right`等可以变为自适应高度的括号。
    例如小括号`()`
    普通的小括号显示如下（`(\frac{a}{b})`）：
    $$
    (\frac{a}{b})
    $$适应小括号（`\left(\frac{a}{b}\right)`）为：
    $$
    \left(\frac{a}{b}\right)
    $$

## 3. 混合括号

`\left \right`后跟不同的括号，可以实现左右括号不同。
如开闭区间（`\left [0,1\right )`）：
$$
\left (0,1\right ]
$$

## 4. 单括号

单括号不能只写`\left`或`\right`，否则无法正常编译。而应该在没有括号的地方用`.`代替，`\left \right`必须同时存在。
$$
\left \{ \frac{a}{b} \right . 
$$

## 5. 括号大小

可以通过`\big \Big \bigg \Bigg`控制括号大小，以上四个依次增大。
如`\Bigg(\bigg(\Big(\big( (`：
$$
\Bigg(\bigg(\Big(\big( (
$$


## 参考文章
1. [LaTeX括号总结](http://www.360doc.com/content/12/0713/22/5696310_224072724.shtml)
