---
layout:     post
title:      kramdown 语法
subtitle:   使用 kramdown 中遇到的问题--公式和代码
date:       2019-12-29
author:     liumh
header-img: img/post-bg-hacker.jpg
catalog: false
tags:
    - markdown
---

# kramdown 语法

---

> 以下所有内容均基于 jekyll 中的 kramdown 做的测试。

## 1 公式

按照官方文档，kramdown 中 <code>display</code> 公式用双美元符 <code>$$</code> 表示，并且前后需留空行（[文档](https://kramdown.gettalong.org/syntax.html#code-blocks)中有三种方案，这里只以空行作为例子）。若不是前后均为空行，则为<code>inline</code>公式，另外若前后均有空行但想要解析为<code>inline</code>公式，则可以对第一个美元符号转义：
~~~latex
\$$...$$
~~~
若不想解析为公式，则对前两个美元符号转义：
~~~latex
\$\$...$$
~~~

下面我们来一个个尝试：

### 1.1 math block

~~~latex

$$y=ax+b$$

~~~
表现为：

$$y=ax+b$$

### 1.2 inline math

~~~latex

\$$y=ax+b$$

~~~
表现为：

\$$y=ax+b$$

~~~latex
这个公式
$$y=ax+b$$
是行内吧！
~~~
表现为：  
这个公式
$$y=ax+b$$
是行内吧！

### 1.3 no math

~~~latex

\$\$y=ax+b$$

~~~
表现为：  

\$\$y=ax+b$$

<font color="red">仍然是math block！</font>

注意：
1. kramdown 对于单个美元符号仍会解析为inline code

### 1.4 math with color 

由于 markdown 不支持字体颜色，所以修改字体颜色要通过 html 直接修改，但带颜色的公式也会出问题。

如：
~~~md
<font color="blue">文字变为蓝色了。</font>  
正常公式：$$y=ax+b$$  
蓝色公式：<font color="blue">$$y=ax+b$$</font>  
蓝色公式：<font color="blue">\$$y=ax+b$$</font>  
~~~

<font color="blue">文字变为蓝色了。</font>  
正常公式：$$y=ax+b$$  
蓝色公式：<font color="blue">$$y=ax+b$$</font>
蓝色公式：<font color="blue">\$$y=ax+b$$</font> 

<font color="red">所以为公式修改颜色会使 inline math 变为 math code 。</font>

解决办法是不要使用双 `$`，使用单 `$`：
~~~md 
蓝色公式：<font color="blue">$y=ax+b$</font>  
~~~
蓝色公式：<font color="blue">$y=ax+b$</font>  

所以 kramdown 其实支持单 `$`，但某些时候单 `$`公式会有问题，如面对`}_... _{`的时候：
~~~md 
${a}_1-a_{2}$   
~~~
${a}_1-a_{2}$   

甚至不在一个公式域中也可以影响到：
~~~md 
${a}_1$ and $a_{2}$
~~~
${a}_1$ and $a_{2}$

原因在于在 kramdown 中，`__`的解析优先级要比`$`高，所以会先解析`__`。

**综上，平时使用双 `$`，公式带颜色时使用单 `$`。**

写上面这行话又发现了 inline code 带颜色的坑。

如：
~~~md
<font color="blue">综上，平时使用双 `$`，公式带颜色时使用单 `$`。</font>  
~~~
变为了  
<font color="blue">综上，平时使用双 `$`，公式带颜色时使用单 `$`。</font>  

## 2 代码

markdown 中使用 <code>```</code>实现代码块，<code>`</code>实现行内代码。而 kramdown 中的代码块使用 <code>~~~</code>， 行内代码仍使用 <code>`</code>。指定代码类型方式相同，仍是在第一行的<code>~~~</code>后面加上类型。

如：
```
~~~cpp
int a = 1;
int b = a;
~~~
```
以上代码显示为：
~~~cpp
int a = 1;
int b = a;
~~~

~~~c
这里有`inline`代码。
~~~
以上显示为：    
这里有`inline`代码。

### 注意：

1. <code>```</code>一般也能正确解析，但是不推荐，下面代码即通过<code>```</code>生成。
```cpp
int a = 1;
int b = a;
```

## 3 代码中包含公式

> 挑战来了！

code block 中包含公式是没有问题的，如第一节所示。而 inline code 中包含公式会有各种问题。

### 3.1 单 $ 符号

如何在 inline code 中实现以下效果呢？
~~~latex
$y=ax+b$
~~~

首先尝试
~~~md
`$y=ax+b$`
~~~
效果为：  
`$y=ax+b$`  
<font color="red">公式被解析了！</font>

再尝试
~~~md
`\$y=ax+b$`
~~~
效果为：  
`\$y=ax+b$`
<font color="red">仍然被解析！</font>

当然，如果前后都转义呢？
~~~md
`\$y=ax+b\$`
~~~
效果为：  
`\$y=ax+b\$`
<font color="red">失败了！</font>

### 3.2 双 $ 符号

如何在 inline code 中实现以下效果呢？
~~~latex
$$y=ax+b$$
~~~

一次性展示：

~~~latex
`$$y=ax+b$$`   
`\$$y=ax+b$$`   
`\$\$y=ax+b$$`   
~~~

`$$y=ax+b$$`   
`\$$y=ax+b$$`   
`\$\$y=ax+b$$`   

<font color="red">都没用！</font>
最后看来，最接近的方式还是分开写：
~~~latex
`$$``y=ax+b``$$`
~~~
`$$``y=ax+b``$$`
