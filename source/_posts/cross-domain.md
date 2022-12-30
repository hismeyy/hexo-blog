---
title: SpringBoot项目的跨域问题
date: 2022-12-30
description: 项目开发时遇到了一个跨域问题
keywords: 跨域问题
tags: 
	- 跨域问题
categories: Java相关
---

# 一、前言

今天在做项目的时候遇到一个跨域问题，查了一会百度，最终发现是自己没有加注解，但也记录一下这个跨域问题的解决方式。

# 二、什么是跨域

跨域是指不同域名之间相互访问。跨域指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript施加的安全限制。

# 三、什么是同域

同一协议，同一ip，同一端口，三同中有一不同就产生了跨域。

# 四、解决思路

## 1、前端解决跨域

弄一个node服务器做代理，发出请求到node服务器，node服务器转发到后端就可以绕过跨域问题。

（我是后端人员，不考虑）

## 2、后端解决跨域

因为我做的项目是Springboot的，所以问题基于SpringBoot进行解决。

### @CrossOrigin注解

@CrossOrigin可以加到controller方法和类上

### 跨域配置文件

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 跨域配置
        registry.addMapping("/**").allowedOrigins("http://localhost:8181");
    }
}
```

