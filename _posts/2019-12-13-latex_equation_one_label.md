---
layout:     post
title:      latex（markdown）中多行公式共用一个编号
date:       2019-12-13
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - markdown
    - latex
    - mathjax
---

# latex（markdown）中多行公式共用一个编号

---

在latex中，对于多行公式，`equation`只有第一行有编号，而`align`每一行都有一个不同编号。如：

```tex{.line-numbers}
$$
\begin{equation}
y_1=a_1x_2+b_1 \\
y_2=a_2x_2+b_2 \\
y_3=a_3x_3+b_3
\end{equation}
$$
```

$$
\begin{equation}
y_1=a_1x_2+b_1 \\
y_2=a_2x_2+b_2 \\
y_3=a_3x_3+b_3
\end{equation}
$$

```tex{.line-numbers}
$$
\begin{align}
y_1=a_1x_2+b_1 \\
y_2=a_2x_2+b_2 \\
y_3=a_3x_3+b_3
\end{align}
$$
```

$$
\begin{align}
y_1=a_1x_2+b_1 \\
y_2=a_2x_2+b_2 \\
y_3=a_3x_3+b_3
\end{align}
$$

要实现多行公式共用一个编号，且编号居中，可以使用`equation`+`aligned`。

```tex{.line-numbers}
$$
\begin{equation}
\begin{aligned}
y_1=a_1x_2+b_1 \\
y_2=a_2x_2+b_2 \\
y_3=a_3x_3+b_3
\end{aligned}
\end{equation}
$$
```

$$
\begin{equation}
\begin{aligned}
y_1=a_1x_2+b_1 \\
y_2=a_2x_2+b_2 \\
y_3=a_3x_3+b_3
\end{aligned}
\end{equation}
$$

## 参考文章

1. [[fw]Latex:多个公式使用同一个编号（右对齐）](http://blog.sina.com.cn/s/blog_5e36b06101015s3w.html)