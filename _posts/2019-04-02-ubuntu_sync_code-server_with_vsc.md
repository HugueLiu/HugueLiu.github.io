---
layout:     post
title:      ubuntu16.04下同步code-server与vscode的配置
date:       2019-04-02
author:     liumh
header-img: img/post-bg-unix-linux.jpg
catalog: true
tags:
    - vscode
    - ubuntu16.04
    - code-server
---

# ubuntu16.04下同步code-server与vscode的配置

---

在ubuntu16.04下安装了code-server后, 想要使用`setting sync`插件将vscode的配置和安装的插件同步过来, 但是问题在于code-server的配置文件路径和正常安装的vscode配置文件路径不同, 但setting sync会将同步时下载的文件放在vscode默认路径下, 因此无法实现同步.
解决方案为: 
在code-server和vscode之间建立一个链接, 使code-server的配置文件指向vscode的配置文件.

具体方法为:

1. 同步插件
    ```bash{.line-numbers}
    ln -s ~/.vscode/extensions ~/.local/share/code-server
    ```
2. 同步用户配置
   ```bash{.line-numbers}
    ln -s ~/.config/Code/User ~/.local/share/code-server
   ```
3.  同步启动时的默认路径
    ```bash{.line-numbers}
    ln -s ~/.config/Code/Backups ~/.local/share/code-server
    ```

仍然存在的问题:

1. 语言扩展不起作用, 无法配置为中文.
    

相关内容：  
    [1] [code-server下载](https://github.com/codercom/code-server/releases)  
    [2] [code-server文档](https://github.com/codercom/code-server/blob/master/doc/self-hosted/index.md)  
    [3] [vscode](https://github.com/Microsoft/vscode)
    [4] [四步实现内网穿透](http://kaopubear.top/2017-12-21-frpbasic-md/)