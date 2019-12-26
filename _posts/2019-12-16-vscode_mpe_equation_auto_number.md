---
layout:     post
title:      vscode配置mathjax
subtitle:   为markdown preview enhanced插件配置mathjax实现自动编号
date:       2019-12-16
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - vscode
    - markdown
    - mathjax
---

#  vscode配置mathjax

---

> vscode中markdown preview enhanced插件配置mathjax使其可以自动添加公式编号。

1. 修改公式渲染插件为`mathjax`

按下`ctrl+p`，找到`Markdown-preview-enhanced: Math Rendering Option`选项，修改为`MathJax`
或在setting.json文件添加`"markdown-preview-enhanced.mathRenderingOption": "MathJax"`

2. 开启公式自动编号

mathjax中公式自动编号功能默认是关闭的，需要手动打开

在`mathjax_config.js`的`TeX`中添加下面一行：
```json{.line-numbers}
equationNumbers: { autoNumber: "AMS" },
```

最终配置为：
```js{.line-numbers}
module.exports = {
  extensions: ['tex2jax.js'],
  jax: ['input/TeX','output/HTML-CSS'],
  messageStyle: 'none',
  tex2jax: {
    processEnvironments: false,
    processEscapes: true
  },
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
    equationNumbers: { autoNumber: "AMS" },
  },
  'HTML-CSS': { availableFonts: ['TeX'] }
}
```

3. 公式编写

在`equation`或`align`环境中的公式才会自动编号
```TeX{.line-numbers}
\begin{equation}
y = a_1x+b_1
\end{equation}
```
$$
\begin{equation}
y = a_1x+b_1
\end{equation}
$$

```TeX{.line-numbers}
\begin{align}
y = ax+b
\end{align}
```
$$
\begin{align}
y = ax+b
\end{align}
$$

若想取消某个`equation`或`align`环境中公式的编号，可以使用`equation*`或`align*`

```TeX{.line-numbers}
\begin{equation*}
y = ax+b
\end{equation*}
```
$$
\begin{equation*}
y = ax+b
\end{equation*}
$$

```TeX{.line-numbers}
\begin{align*}
y = ax+b
\end{align*}
```
$$
\begin{align*}
y = ax+b
\end{align*}
$$

另外，还可以通过`tag`自定义编号，按照顺序下面这个公式编号应为3，手动指定为4

```TeX{.line-numbers}
\begin{align*}
y = ax+b
\tag{1}
\end{align*}
```

$$
\begin{equation*}
y = ax+b
\tag{4}
\end{equation*}
$$