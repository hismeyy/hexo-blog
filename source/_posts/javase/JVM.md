---
title: JVM
date: 2022-10-4
description: 不管现在的高级框架发展成什么样子，基础一定要进行学习。这是我第一次学习JVM做的笔记，是看着尚硅谷宋红康的视频，讲的挺清楚。
keywords: JavaSE
cover: https://img.yublog.top/img/202210282225449.jpg
top_img: https://img.yublog.top/img/202210282225449.jpg
tags: 
	- java
	- 进阶
	- JVM
categories: java相关
---

# 前言
## 遇到过的问题
1. 运行在线上的系统卡死，系统无法访问，直接OOM
2. 想解决线上JVM GC问题，但无从下手
3. 新项目上线，对各种JVM参数设置看不懂，直接默认
4. 每次面试，重新背JVM原理概念，面试官经常问实际项目中的调优JVM参数，如何解决GC，OOM等问题

## 为什么要学JVM
1. 面试的需要
2. 中高级程序员必备技能
3. 追求极客的精神

## Java和C++的区别
1. Java会自动内存动态分配和垃圾收集技术
2. C++是手动的

## 书推荐
1. Java虚拟机规范（不推荐）
2. 深入理解Java虚拟机2版本（推荐）
2. 深入理解Java虚拟机3版本（推荐）

# 内存与垃圾回收
## JVM与Java的体系结构
### 虚拟机
1. 虚拟机(Virtual Machine)，就是一台虚拟的计算机，他是一款软件，用来执行一系列虚拟计算机指令。大体上分为**系统虚拟机**和**程序虚拟机**

### Java虚拟机
1. Java虚拟机(JVM)是一台执行Java字节码的虚拟计算机，Java技术的核心是Java虚拟机
2. Java虚拟机就是二进制字节码的运行环境

### JVM的位置
![JVM的位置](https://img.yublog.top/img/202210290950282.png)
![](https://img.yublog.top/img/202210290953771.png)

### JVM的整体结构
![](https://img.yublog.top/img/202210290956976.png)
1. HotSpot VM 是目前市场上高性能虚拟机的代表之一
2. 它采用解释器与即时编译器并存的架构
3. 现在Java程序的运行速度已经可以和C/C++相比了

### Java代码执行流程
![](https://img.yublog.top/img/202210291007334.png)

### JVM的架构模型
Java编译器输入的指令流基本是一种基于**栈的指令集架构**，另外一种指令集架构则是基于**寄存器的指令集架构**
#### 两种架构之间的区别
1. 基于栈式架构的特点
	- 设计实现简单，适用于资源受限的系统
	- 便开了及生存期的分配难题，使用零地址指令方式分配
	- 指令流中的指令大部分是零地址指令，其执行过程依赖于操作栈，指令集更小，编译器越容易实现
	- 不需要硬件支持，可以指性更好，更好实现跨平台
2. 基于寄存器架构的特点
	- 典型的应用是x86的二进制指令集，比如传统的PC以及Android的Davlik虚拟机
	- 指令集架构完全依赖硬件，可移植性差
	- 性能优秀和执行更高效
	- 花费更少的指令去完成一项操作
	- 大部分情况下，基于寄存器架构的指令往往都以一地址指令，二地址指令，三地址指令为主，而基于栈式架构的指令集却是以零地址指令为主

### JVM生命周期
#### 启动
1. Java虚拟机的启动是通过引导类加载器(bootstrop class loader)创建一个初始类(initial class)来完成，这个类是是虚拟机的具体实现指定的

#### 执行
1. 一个运行中Java虚拟机有着一个清晰的任务，执行Java程序
2. 程序开始执行时他才运行，程序结束时他停止
3. 执行一个Java程序，真真在执行的是一个Jaa虚拟机的进程

#### 退出
1. 程序正常执行结束
2. 执行过程中出现异常或错误终止
3. 由操作系统出现错误而导致Java虚拟机进程终止
4. 调用Runtime类或System类的exit方法，或Runtime类的halt方法，并且Java安全管理器也允许这次exit或halt操作
5. JNI可以用API来加载或卸载Java虚拟机

### JVM发展历
#### Sun Classic VM
1. 1996年，Java1.0版本，Sun公司发布第一款名为Sun Classic VM的Java虚拟机，他同时也是世界上第一款商用Java虚拟机，JDK1.4时被淘汰
2. 这款虚拟机内部只提供解释器
3. 如果使用JIT编译器，就需要进行外挂，但是一旦使用了JIT编译器，JIT就会接管虚拟机的执行系统。解释器就不再工作，解释器和编译器不饿能配合工作
4. 现在hotspot内置了此虚拟机

#### Exact VM
1. 为了解决Sun Classic VM虚拟机的问题，jdk1.2时，sun提供了此虚拟机
2. Exact Memory Management：准确式内存管理
	- 也可以叫Non-Conservative/Accurate Memory Management
	- 虚拟机可以知道内存中摸个位置的数据具体是什么类型
3. 具有现代高性能虚拟机的雏形
	- 热点探测
	- 编译器与解释器混合工作模式
4. 只在Solaris平台上短暂使用，其他平台晒还是Classic VM
	- 英雄气短，最终被Hotspot虚拟机代替

#### Sun的HotSpot VM
1. HotSpot历史
	- 最初是由“Longview Technologies”的小公司设计
	- 1997年，此公司被Sun收购，2009年Sun公司被甲骨文收购
	- JDK1.3时，HotSpot VM成为默认虚拟机
2. 目前HotSpot占有绝对的市场地位
	- 不管JDK6，JDK8默认虚拟机都是使用HotSpot
	- SUn/Oracle JDK和OpenJDK的默认虚拟机
3. 从服务器、桌面到移动端、嵌入式都有运用
4. 名称HotSpot指的是它的热点代码探测技术
	- 通过计数器找到最具有编译价值的代码，触发即时编译或栈上替换
	- 通过编译器和解释器协协同工作，最优化的程序响应时间与最佳执行性能中取得平衡

#### BEA的JRockit
1. 专注于服务端应用
	- 它不太关注程序启动速度，因此该虚拟机内部不包含解释器实现，全部代码都靠即时编译器编译后执行
2. 大量行业基准测试显示，JRockit虚拟机是世界上最快的JVM
3. 优势：全面的Java运行时解决方案组合
	- JRockit面向延迟敏感型应用的解决方案JRockit Real Time提供毫秒或微妙级的JVM响应时间，适合财务、军事指挥、电信网络的需要
	- MissionControl服务套件，他是一组以极低的开销来监控、管理和分析生产环境中的应用程序的工具
4. 08年BEA被Oracle收购
	- Oracle想把HotSpot和JRockit进行整合，大概在JDK8中完成

#### IBM的J9
1. 全称：IBM Technology for java Virtual Machine 简称It4J，内部代号：J9
2. 市场定位与HotSpot接近，服务端、桌面应用、嵌入式等多用途VM
3. 广泛用于IBM的各种Java产品
4. 目前有影响力的三大商用虚拟机之一，也号称是世界上最快的Java虚拟机
5. 2017年左右，IBM发布了开源J9 VM，命名OpenJ9，交给了Eclipse基金会管理，也称为Eclipse OpenJ9

#### KVM和CDC/CLDC HotSpot
1. Oracle在java ME产品线上的两款虚拟机：
	- CDC/CLDC HotSpot
	- Implementation VM
2. KVM(Kilobyte)是CLDC-HI早期产品
3. 目前移动端领域被Android和IOS占领
4. KVM简单，轻量，高度可移植，面向更低端的设备
	- 智能控制器，传感器，老人手机
5. 所有虚拟机的原则：一次编译，到处运行





# 字节码与类的加载
# 性能监控与调优
