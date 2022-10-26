---
title: JavaIO
date: 2022-10-25
description: 第二次学习IO的笔记，第一次学习是一年前跟着老杜学的。第二次学习是看着韩顺平老师的视频学的。
keywords: JavaSE
cover: /img/javaSE/io/javaIO-top-img.jpg
top_img: /img/javaSE/io/javaIO-top-img.jpg
highlight_shrink: false
---

# 文件
## 什么是文件？
1. 文件就是保存数据的地方

2. 文件在程序中以流的形式操作

   - 文件流

     输入流：文件（磁盘）—> Java程序（内存）

     输出流：Java程序（内存）—> 文件（磁盘）

## 文件操作

### 常用构造器

```java
// 根据路径构建一个File对象
new File(String pathname);
// 根据父目录文件+子路径构建
new File(String parent, String child);
// 根据父目录+子路径构建
new File(File parent, String child);
```

### 创建文件的方法

createNewFile()

### File类图

![File类图](/img/javaSE/io/io01.jpg)

### 获取文件相关信息

- getName()
  获取文件名称
- getAbsoultePath() 
  获取文件绝对路径
- getParent()
  获取文件父级目录
- length()
  获取文件中字节大小
  **注意：一个汉字三个字节**
- exists()
  是否存在
- isFile()
  是否是一个文件
- isDirectory()
  是否是一个目录

### 目录的操作和文件删除

- mkdir()

  创建一级目录

- mkdirs

  创建多级目录

- delete

  删除空目录或文件

# IO流原理及流的分类

