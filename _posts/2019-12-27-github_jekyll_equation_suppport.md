---
layout:     post
title:      在 jekyll 中增加对公式的支持
subtitle:   github基于jekyll搭建的博客中增加对数学公式的支持及自动编号
date:       2019-12-27
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - github
    - markdown
    - jekyll
---

# 在 jekyll 中增加对公式的支持

---

在`_includes/head.html`中添加以下内容：

```javascript{.line-numbers}
<!-- 数学公式 -->
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            displayMath: [['$$','$$'], ['\[','\]']],
            inlineMath: [['$','$']],
        }
    });
</script>
```

要实现自动编号需要添加
```javascript{.line-numbers}
TeX: {equationNumbers: {autoNumber: "AMS"}},
```

最终设置为：
```javascript{.line-numbers}
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
                skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', '\''],
                displayMath: [['$$','$$'], ['\[','\]']],
                inlineMath: [['$','$']],
            },
            TeX: {equationNumbers: {autoNumber: "AMS"}},
        });
    </script>
```

## 注意

1. jekyll只有`display`(即以`\$\$...\$\$`或`\[...\]`的形式)的公式才能显示行号，并且前后均需要空行。
2. markdown中公式支持见[vscode配置mathjax](http://127.0.0.1:4000/2019/12/16/vscode_mpe_equation_auto_number/)

## 问题
添加了公式解析后，可能会导致`$[{``{]$`等成对符号解析错误。目前已知问题有：
1. 代码域`中的成对$会被解析为公式。
2. 行内公式（$$）内的`\{`无法显示。

## 参考文章

1. [如何在基于jekyll的github上发布的博客中支持MathJax(LaTex数学公式)？](https://www.zhihu.com/question/62114522?sort=created)