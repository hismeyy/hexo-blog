---
title: JavaI/O流
date: 2022-10-28
description: 第二次学习IO的笔记，第一次学习是一年前跟着老杜学的。第二次学习是看着韩顺平老师的视频学的。
keywords: JavaSE
cover: /img/javaSE/io/javaIO-top-img.jpg
top_img: /img/javaSE/io/javaIO-top-img.jpg
highlight_shrink: false
tags: 
	- java
	- 进阶
	- I/O
categories: java相关
---

# 一、文件
## 1.1 什么是文件？
1. 文件就是保存数据的地方

2. 文件在程序中以流的形式操作

   - 文件流

     输入流：文件（磁盘）—> Java程序（内存）

     输出流：Java程序（内存）—> 文件（磁盘）

## 1.2 文件操作

### 1.2.1 常用构造器

```java
// 根据路径构建一个File对象
new File(String pathname);
// 根据父目录文件+子路径构建
new File(String parent, String child);
// 根据父目录+子路径构建
new File(File parent, String child);
```

### 1.2.2 创建文件的方法

createNewFile()

### 1.2.3 File类图

![File类图](/img/javaSE/io/io01.jpg)

### 1.2.4 获取文件相关信息

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

### 1.2.5 目录的操作和文件删除

- mkdir()

  创建一级目录

- mkdirs

  创建多级目录

- delete

  删除空目录或文件

# 二、IO流的分类

## 2.1 IO包

1. 存放在java.io包下，存放着流类和接口

## 2.2 流的分类

###  2.2.1 按数据单位分

   字节流(8bit)二进制文件，字符流(按字符)文本文件

###  2.2.2 按数据流的方向

   输入流，输出流

###  2.2.3 按流的角色

   节点流，处理流/包装流

### 2.2.4 分类表

   | 抽象基类 |    字节流    | 字符流 |
   | :------: | :----------: | :----: |
   |  输入流  | InputStream  | Reader |
   |  输出流  | OutPutStream | Writer |

### 2.2.5 节点流和处理流
![](https://img.yublog.top/img/202211031513164.png)
	
节点流和处理流的区别和联系
	1. 节点流是底层流/低级流，直接跟数据源相接
	2. 处理流(包装流)包装节点流，既可以消除不同节点的实现差异，也可以提供更方便的方法来完成输入输出
	3. 处理流对节点流进行包装，使用了修饰器设计模式，不会直接与数据源相连
处理流的功能主要体现在一下两个方面
	1. 性能的提高：主要以增加缓冲的方式来提高输入输出的效率
	2. 操作的便捷：处理流可能提供了一系列便捷的方法来一次输出大批量的数据。使用更加灵活方便



# 三、字节流

![File类图](/img/javaSE/io/io02.jpg)

## 3.1 字节输入流 InputStream
1. FileInputStream
2. FilterInputStream
   - BufferedInputStream
   - DataInputStream
   - PushbakInputStream
3. ObjectInputStream
4. PipedInputStream
5. SequenceInputStream
6. StringBufferInputStream
7. ByteArrayInutStream

![](https://img.yublog.top/img/202211030811245.png)

### 3.1.1 FileInputStream
1. 文件字节输入流
2. 构造
	![](https://img.yublog.top/img/202211030815011.png)
3. 使用
	- new对象
	- 调用方法
	- 抛异常
	- 关闭流
4. 常用方法
	![](https://img.yublog.top/img/202211030818426.png)

### 3.1.2 BufferedInputStream
1. 缓冲字节输入流，操作二进制文件
2. 使用
	- new对象
	- 调方法
	- 关闭流

### 3.1.3 ObjectInputStream
1. 对象字节输入流


## 3.2 字节输出流 OutputStream

1. FileOutputStream
2. FilterOutputStream
   - BufferedOutputStream
   - DataOutputStream
   - printStream
3. ObjectOutputStream
4. PipedOutputStream
5. ByteArrayOutputStream

	
### 3.2.1 FileOutputStream
1. 文件字节输出流
2. 构造
	![](https://img.yublog.top/img/202211030821768.png)
3. 使用
	- new对象
	- 调方法
	- 刷新流
	- 抛异常
	- 关闭流
4. 常用方法
	![](https://img.yublog.top/img/202211030822759.png)
### 3.2.2 BufferedOutputStream
1. 缓冲字节输出流

### 3.2.3 ObjectOutputStream
1. 对象字节输入流

### 3.2.4 PrintStream
1. 字节打印流
2. 底层时write
3. 修改输出位置默认是显示器
	- System.setOut()

## 3.3 序列化和反序列化
1. 序列化就是在保存数据时，保存数据的值和数据类型
2. 反序列化就是在恢复数据时，恢复数据的值和数据类型
3. 需要让某个对象支持序列化机制，则必须让其类是可序列化的，需要实现两个接口
	- Serializable	是一个标记接口
	- Externalizable
3. 注意
	- 要实现Serializable
	- 序列化的类中建议添加serialVersionUID，为了提高版本的兼容性
	- 序列化对象时，默认将所有属性都进行序列化，除了static或者transient修饰的成员
	- 序列化对象时，要求里面属性的类型也选哟实现序列化接口
	- 序列化具备可继承性，也就是如果某类已经实现了序列化，则他的所有子类默认实现序列化
# 四、字符流

![File类图](/img/javaSE/io/io03.jpg)

## 4.1 字符输入流Reader

1. BufferedReader
2. InputStreamReader
   - FileReader
3. StringReader
4. PipedReader
5. ByteArrayReader
6. FilterReader
   - PushbackReader

### 4.1.1 FileReader
1. 文件字符输入流
2. 构造
	![](https://img.yublog.top/img/202211030831800.png)
3. 使用
	- new对象
	- 调方法
	- 抛异常
	- 关闭流
4. 方法
	![](https://img.yublog.top/img/202211030836355.png)
	
### 4.1.2 BufferedReader
1. 缓冲字符输入流(处理流)，读取文本文件
2. 使用
	- new对象
	- 调方法
	- 关闭流，底层关闭的是传入的流
	
### 4.1.3 InputStreamReader
1. 输入转换流 字节转字符

## 4.2 字符输出流Writer

1. BufferedWriter
2. OutputStreamWriter
   - FileWriter
3. PrintWriter
4. StringWriter
5. PipedWriter
6. CharArrayWriter
7. FilterWriter

### 4.2.1 FileWriter
1. 文件字符输出流
2. 构造
	![](https://img.yublog.top/img/202211030834849.png)
3. 使用
	- new对象
	- 调方法
	- 刷新流
	- 抛异常
	- 关闭流
4. 方法
	![](https://img.yublog.top/img/202211030835532.png)


### 4.2.2 BufferedWriter
1. 缓冲字符输出流(处理流)，写出文本文件
2. 使用
	- new对象，需要追加，需要写true
	- 调方法
	- 关闭流，底层关闭的是传入的流
### 4.2.3 OutputStreamWriter
1. 输出转换流 字节转字符

### 4.2.4 PrintWriter
1. 字符打印流

# 五、标准流
## 5.1 System.in
1. 标准输入流 键盘
2. System类的public final static InputStream in = null
3. 编译类型 InputStream
4. 运行类型 BufferedInputStream

## 5.2 System.out
1. 标准输出流 显示器
2. System类的public final static PrintStream out = null
3. 编译类型 PrintStream
4. 运行类型 PrintStream


# 六、配置文件
## 6.1 properties类
1. java.util.Properties
2. 读取格式
	- 配置文件格式以点properties
	- 键= 值
## 6.2 常用方法
1. load
	加载配置文件的键值对到Properties对象
2. list
	将数据显示到指定设备
3. getProperty(key)
	根据key获取值
4. setProperty(key, value)
	设置值
5. store
	将Properties中的键值对存储到配置文件中，在idea中，保存信息的配置文件，如果含有中文，会存储为unicode码

## 6.3 使用
1. new Properties()
2. 加载指定的配置文件 load(new FileReader())
3. 显示到控制台 list(Systen.out)



