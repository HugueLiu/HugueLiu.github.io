---
layout:     post
title:      vscode中设置markdown的snippet
date:       2019-12-04
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - markdown
    - vscode
---

# vscode中设置markdown的snippet

---

问题：
在vscode的markdown.json中添加以下snippet后，在markdown文件中输入`eq`无法调出以下代码。
```json{.line-numbers}
"equation": {
    "prefix": "eq",
    "body": [
        "$$",
        "\\begin{equation}",
        "$1",
        "\\end{equation}",
        "$$",
        "$0"
    ],
    "description": "latex equation"
},
```
解决方案：
在vscode的配置文件setting.json中添加以下设置：
```json{.line-numbers}
"[markdown]": {
    "editor.quickSuggestions": {
        "other": true,
        "comments": true,
        "strings": true
    },
}
```


## 参考文章：
1. [Vscode Markdown Snippet 配置](https://blog.csdn.net/serryuer/article/details/89393760)