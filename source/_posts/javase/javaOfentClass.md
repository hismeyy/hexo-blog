---
title: Java常用类
date: 2022-10-6
description: 暂无
keywords: JavaSE
cover: https://img.yublog.top/img/202210282231552.jpg
top_img: https://img.yublog.top/img/202210282231552.jpg
tags: 
	- java
	- 进阶
	- 常用类
categories: java相关
---

# Object类
类 Object 是类层次结构的根类。每个类都使用 Object 作为超类。所有对象（包括数组）都实现这个类的方法，简单来说，Object类是所有类的父类，所有类都默认继承了Objet类。
## hashCode()
- 返回该对象的哈希值
## getClass()
- 表示此对象运行时类的Class对象
## toString()
- 返回该对象的字符串表示
- 建议重写
## equals()
- 表示两个对象是否相等
- 建议重写

# String类
String是不可变字符串序列
## length()
- 获取字符串长度
## charAt()
- 获取指定索引处的字符
## indexOf()
- 返回指定字符在此字符串中出现的第一次索引
## substring()
- 从指定位置开始截取到指定位置结束当前位置字符串

# StringBuffer类和StringBuilder类
StringBuffer是线程安全的可变字符串序列
StringBuilder是线程不安全的可变字符串序列
## append()
- 末尾追加字符串
## insert()
- 指定索引位置，添加
## deleteCharAt()
- 删除指定索引位置的元素
## delete()
- 删除指定长度字符
## replace()
- 指定索引区间替换
## reverse()
- 返回具有相反顺序的StringBuffer对象
## substring()
- 截取字符串

# Arrays类
## toString()
- 遍历
## sort()
- 排序
## binarySearch()
- 查找

# 包装类
基本类型的包装类：将我们的基本类型包装起来，可以添加相关方法，简化操作
- byte——Byte
- short——Short
- int——Integer
- long——Long
- float——Float
- double——Double
- char——Character
- bollean——Boolean
## toBinaryString()
- 转换二进制
## toOctalString()
- 转换八进制
## toHexString()
- 转换十六进制

# Math类
## random()
- 产生一个0-1之间的随机小数
## abs()
- 取绝对值
## 三角函数
- sin()		正弦
- cos()		余弦
- tan()		正切
- acos()	反余弦
- asin()	反正弦
- atan()	反正切
## cbrt()
- 立方根
## sqrt()
- 平方根
## ceil()
- 向上取整
## floor()
- 向下取整
## max()
- 返回最大值
## min()
- 返回最小值
## pow()
- 两个参数，a，b。意思是a的b次方
## round()
- 四舍五入

# Date类
Date 类表示系统特定的时间戳，可以精确到毫秒。Date 对象表示时间的默认顺序是星期、月、日、小时、分、秒、年。

