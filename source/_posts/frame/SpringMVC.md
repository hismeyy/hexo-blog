---
title: SpringMVC
date: 2022-11-19
description: 第二次学习SpringMVC，和Spring一样也是看着狂神的，现在重新复习一边顺便记笔记
keywords: SpringMVC
cover: https://img.yublog.top/img/202211172352685.jpg
top_img: https://img.yublog.top/img/202211172352685.jpg
tags: 
	- java
	- 框架
	- SpringMVC
categories: Java-框架相关
---

# 一、SpringMVC简介

## 1.1 什么是MVC

> MVC是一种软件架构的思想，将软件按照模型、视图、控制器来划分

- M：Model，模型层，指工程中的JavaBean，作用是处理数据
  JavaBean分为两类：
  - 一类称为实体类Bean：专门存储业务数据的，如 Student、User 等
  - 一类称为业务处理 Bean：指 Service 或 Dao 对象，专门用于处理业务逻辑和数据访问。
- V：View，视图层，指工程中的html或jsp等页面，作用是与用户进行交互，展示数据
- C：Controller，控制层，指工程中的servlet，作用是接收请求和响应浏览器

> MVC的工作流程： 
>
> 用户通过视图层发送请求到服务器，在服务器中请求被Controller接收，Controller调用相应的Model层处理请求，处理完毕将结果返回到Controller，Controller再根据请求处理的结果找到相应的View视图，渲染数据后最终响应给浏览器。

## 1.2 什么是SpringMVC

> SpringMVC是Spring的一个后续产品，是Spring的一个子项目
> SpringMVC 是 Spring 为表述层开发提供的一整套完备的解决方案。在表述层框架历经 Strust、WebWork、Strust2 等诸多产品的历代更迭之后，目前业界普遍选择了SpringMVC 作为 Java EE 项目表述层开发的首选方案。

注：三层架构分为表述层（或表示层）、业务逻辑层、数据访问层，表述层表示前台页面和后台servlet

## 1.3 SpringMVC的特点

- Spring 家族原生产品，与 IOC 容器等基础设施无缝对接
- 基于原生的Servlet，通过了功能强大的前端控制器DispatcherServlet，对请求和响应进行统一处理
- 表述层各细分领域需要解决的问题全方位覆盖，提供全面解决方案
- 代码清新简洁，大幅度提升开发效率
- 内部组件化程度高，可插拔式组件即插即用，想要什么功能配置相应组件即可
- 性能卓著，尤其适合现代大型、超大型互联网项目要求

# 二、入门

## 2.1 创建Maven项目

1. 添加web模块

   在maven中设置打包方式为war后，打开项目结构，修改web路径到...src/main/webapp...

2. 引入依赖

   ```xml
   <dependencies>
   	<!-- SpringMVC -->
   	<dependency>
   	    <groupId>org.springframework</groupId>
   	    <artifactId>spring-webmvc</artifactId>
   	    <version>5.3.1</version>
   	</dependency>
   	<!-- 日志 -->
   	<dependency>
   	    <groupId>ch.qos.logback</groupId>
   	    <artifactId>logback-classic</artifactId>
   	    <version>1.2.3</version>
   	</dependency>
   	<!-- ServletAPI -->
   	<dependency>
   	    <groupId>javax.servlet</groupId>
   	    <artifactId>javax.servlet-api</artifactId>
   	    <version>3.1.0</version>
   	    <scope>provided</scope>
   	</dependency>
   	<!-- Spring5和Thymeleaf整合包 -->
   	<dependency>
   	    <groupId>org.thymeleaf</groupId>
   	    <artifactId>thymeleaf-spring5</artifactId>
   	    <version>3.0.12.RELEASE</version>
   	</dependency>
   </dependencies>
   ```

## 2.2 配置web.xml

注册SpringMVC的前端控制器DispatcherServlet

1. 默认配置方式

   > 此配置作用下，SpringMVC的配置文件默认位于WEB-INF下，默认名称为```<servlet-name>-
   > servlet.xml```

   ```xml
   <!-- 配置SpringMVC的前端控制器，对浏览器发送的请求统一进行处理 -->
   <servlet>
       <servlet-name>springMVC</servlet-name>
       <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
   </servlet>
   <servlet-mapping>
       <servlet-name>springMVC</servlet-name>
       <!--
           设置springMVC的核心控制器所能处理的请求的请求路径
           /所匹配的请求可以是/login或.html或.js或.css方式的请求路径
           但是/不能匹配.jsp请求路径的请求
       -->
       <url-pattern>/</url-pattern>
   </servlet-mapping>
   ```

2. 扩展配置方式

   可通过init-param标签设置SpringMVC配置文件的位置和名称，通过load-on-startup标签设置SpringMVC前端控制器DispatcherServlet的初始化时间

   ```xml
   <servlet>
       <servlet-name>springMVC</servlet-name>
       <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
   
       <!-- 通过初始化参数指定SpringMVC配置文件的位置和名称 -->
       <init-param>
           <!-- contextConfigLocation为固定值 -->
           <param-name>contextConfigLocation</param-name>
           <!-- 使用classpath:表示从类路径查找配置文件，例如maven工程中的src/main/resources -->
           <param-value>classpath:springMVC.xml</param-value>
       </init-param>
       <!--
              作为框架的核心组件，在启动过程中有大量的初始化操作要做
              而这些操作放在第一次请求时才执行会严重影响访问速度
              因此需要通过此标签将启动控制DispatcherServlet的初始化时间提前到服务器启动时
       -->
       <load-on-startup>1</load-on-startup>
   </servlet>
   ```

3. 注意

   >```<url-pattern>```标签中使用/和/*的区别：
   >/所匹配的请求可以是/login或.html或.js或.css方式的请求路径，但是/不能匹配.jsp请求路径的请
   >求
   >因此就可以避免在访问jsp页面时，该请求被DispatcherServlet处理，从而找不到相应的页面
   >/*则能够匹配所有请求，例如在使用过滤器时，若需要对所有请求进行过滤，就需要使用/*的写
   >法

## 2.3 创建请求控制器

> 由于前端控制器对浏览器发送的请求进行了统一的处理，但是具体的请求有不同的处理过程，因此需要创建处理具体请求的类，即请求控制器
> 请求控制器中每一个处理请求的方法成为控制器方法
> 因为SpringMVC的控制器由一个POJO（普通的Java类）担任，因此需要通过@Controller注解将其标识为一个控制层组件，交给Spring的IoC容器管理，此时SpringMVC才能够识别控制器的存在

```java
// @RequestMapping注解：处理请求和控制器方法之间的映射关系
// @RequestMapping注解的value属性可以通过请求地址匹配请求，/表示的当前工程的上下文路径
// localhost:8080/springMVC/
@Controller
public class HelloSpringMvc {
    
    @RequestMapping("/")
    public String hello(){
        return "index";
    }

}
```

## 2.4 创建SpringMVC的配置文件

```xml
<!-- 自动扫描包 -->
<context:component-scan base-package="扫描包"/>
<!-- 配置Thymeleaf视图解析器 -->
<bean id="viewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
    <property name="order" value="1"/>
    <property name="characterEncoding" value="UTF-8"/>
    <property name="templateEngine">
        <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
            <property name="templateResolver">
                <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
                    <!-- 视图前缀 -->
                    <property name="prefix" value="/WEB-INF/templates/"/>
                    <!-- 视图后缀 -->
                    <property name="suffix" value=".html"/>
                    <property name="templateMode" value="HTML5"/>
                    <property name="characterEncoding" value="UTF-8"/>
                </bean>
            </property>
        </bean>
    </property>
</bean>

```

## 2.5 创建html页面

在/WEB-INF/templates下创建

```html
<!DOCTYPE html>
<html lang="zh_CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
index
</body>
</html>
```

## 2.6 配置Tomcat

![](https://img.yublog.top/img/202211182203065.png)

## 2.7 总结

> 浏览器发送请求，若请求地址符合前端控制器的url-pattern，该请求就会被前端控制器DispatcherServlet处理。前端控制器会读取SpringMVC的核心配置文件，通过扫描组件找到控制器，将请求地址和控制器中@RequestMapping注解的value属性值进行匹配，若匹配成功，该注解所标识的控制器方法就是处理请求的方法。处理请求的方法需要返回一个字符串类型的视图名称，该视图名称会被视图解析器解析，加上前缀和后缀组成视图的路径，通过Thymeleaf对视图进行渲染，最终转发到视图所对应页面
