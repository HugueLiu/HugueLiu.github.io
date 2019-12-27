---
layout:     post
title:      修改Windows 10中磁贴背景颜色
date:       2019-12-05
author:     liumh
header-img: img/home-bg-geek.jpg
catalog: true
tags:
    - windows10
---

# 修改Windows 10中磁贴背景颜色

## 问题
Windows 10中部分磁贴的背景色不协调，其无法跟随系统主题颜色改变而改变，如vs，vscode，chrome等。

## 解决办法

无法变色的原因在于这些软件有自定义的格式，覆盖了系统默认格式。在程序的可执行文件目录下会有个名为*.VisualElementsManifest.xml的文件，该文件中定义了磁贴的颜色、图标等信息，因此只需要删除即可使用默认格式。

以chrome为例，其对应的配置文件为`chrome.VisualElementsManifest.xml`，内容如下所示，也可以手动修改`BackgroundColor`来指定背景颜色。

```xml{.line-numbers}
<Application xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'>
  <VisualElements
      ShowNameOnSquare150x150Logo='on'
      Square150x150Logo='78.0.3904.87\VisualElements\Logo.png'
      Square70x70Logo='78.0.3904.87\VisualElements\SmallLogo.png'
      Square44x44Logo='78.0.3904.87\VisualElements\SmallLogo.png'
      ForegroundText='light'
      BackgroundColor='#5F6368'/>
</Application>
```

## 注意
1. 注意备份。
2. 修改该文件后，磁贴不会立即更新，可以通过在磁贴右击`更多-打开文件位置`，找到对应的程序并重命名，然后再改回来即可。

## 参考文章
1. [How To Fix Google Chrome Icon Grey Or White Background In Windows 8 / 10 Start Menu](https://tehnoblog.org/how-to-fix-google-chrome-grey-white-background-in-windows-8-10-start-menu/)