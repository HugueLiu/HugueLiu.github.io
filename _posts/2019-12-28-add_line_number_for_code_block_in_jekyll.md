---
layout:     post
title:      为 jekyll 中的代码块添加行号
subtitle:   github基于jekyll搭建的博客中使用prism.js为代码块增加行号
date:       2019-12-28
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - github
    - markdown
    - jekyll
---

# 为 jekyll 中的代码块添加行号

> 使用`prism.js`为代码块添加行号

## 1. 下载安装 `prism.js`

在[官网](https://prismjs.com/download.html)下载`prism.js`和`prism.css`，可以自定义选择主题、支持语言及插件，这里的主题是`Okaidia`。支持的语言没必要选太多，不然体积会比较大，并且最上面最好选择`Minified version`。  
网页拉到底下载js和css文件，下载后分别复制到`js`和`css`文件夹即可。

## 2. js和css文件的引入

在`_include/head.html`中添加以下内容

```html{.line-numbers}
<!-- line number for code block -->
<script src="{{ "/js/prism.js" | prepend: site.baseurl }}"></script>
<link rel="stylesheet" href="{{ "/css/prism.css" | prepend: site.baseurl }}">
```

在`_include/footer.html`中添加：

```html{.line-numbers}
<!-- line number for code block -->
<script>
var pres = document.getElementsByTagName("pre");
for(var i = 0; i < pres.length; i++){
    var pre = pres[i];
    if(pre.childNodes[0].nodeName == "CODE"){
        pre.setAttribute("class","line-numbers");
    }
}
</script>
```

## 3. 使用

大功告成，只需在markdown文件中使用`~~~`或<code>```</code>中就可以愉快的显示行号了。

如：

~~~markdown{.line-numbers}
```cpp
int main(){
    return 0;
}
```
~~~

效果如下：

```cpp
int main(){
    return 0;
}
```

## 参考文章

1. [使用prismjs实现Jekyll代码语法高亮并显示行号](https://blog.csdn.net/u013961139/article/details/78853544)
