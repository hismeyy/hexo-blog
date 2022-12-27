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

# 三、@RequestMapping注解

## 3.1 功能

@RequestMapping注解的作用是将请求和处理请求的控制器方法关联起来，建立映射关系。
SpringMVC 接收到指定的请求，就会来找到在映射关系中对应的控制器方法来处理这个请求。

## 3.2 位置

@RequestMapping标识一个类：设置映射请求的请求路径的初始信息
@RequestMapping标识一个方法：设置映射请求请求路径的具体信息

## 3.3 value属性

@RequestMapping注解的value属性通过请求的请求地址匹配请求映射
@RequestMapping注解的value属性是一个字符串类型的数组，表示该请求映射能够匹配多个请求地址所对应的请求
@RequestMapping注解的value属性必须设置，至少通过请求地址匹配请求映射

## 3.4 method属性

@RequestMapping注解的method属性通过请求的请求方式（get或post）匹配请求映射
@RequestMapping注解的method属性是一个RequestMethod类型的数组，表示该请求映射能够匹配多种请求方式的请求
若当前请求的请求地址满足请求映射的value属性，但是请求方式不满足method属性，则浏览器报错 405：Request method 'POST' not supported

> 注：
> 对于处理指定请求方式的控制器方法，SpringMVC中提供了@RequestMapping的派生注解
>
> - 处理get请求的映射-->@GetMapping
>
> - 处理post请求的映射-->@PostMapping
>
> - 处理put请求的映射-->@PutMapping
>
> - 处理delete请求的映射-->@DeleteMapping
>
> 常用的请求方式有get，post，put，delete
> 但是目前浏览器只支持get和post，若在form表单提交时，为method设置了其他请求方式的字符串（put或delete），则按照默认的请求方式get处理
> 若要发送put和delete请求，则需要通过spring提供的过滤器HiddenHttpMethodFilter，

## 3.5 params属性

@RequestMapping注解的params属性通过请求的请求参数匹配请求映射
@RequestMapping注解的params属性是一个字符串类型的数组，可以通过四种表达式设置请求参数和请求映射的匹配关系

- "param"：要求请求映射所匹配的请求必须携带param请求参数
- "!param"：要求请求映射所匹配的请求必须不能携带param请求参数
- "param=value"：要求请求映射所匹配的请求必须携带param请求参数且param=value
- "param!=value"：要求请求映射所匹配的请求必须携带param请求参数但是param!=value

> 注：
> 若当前请求满足@RequestMapping注解的value和method属性，但是不满足params属性，此时
> 页面回报错400：Parameter conditions

## 3.6 headers属性

@RequestMapping注解的headers属性通过请求的请求头信息匹配请求映射
@RequestMapping注解的headers属性是一个字符串类型的数组，可以通过四种表式设置请求头信息和请求映射的匹配关系

- "header"：要求请求映射所匹配的请求必须携带header请求头信息
- "!header"：要求请求映射所匹配的请求必须不能携带header请求头信息
- "header=value"：要求请求映射所匹配的请求必须携带header请求头信息且header=value
- "header!=value"：要求请求映射所匹配的请求必须携带header请求头信息且header!=value

若当前请求满足@RequestMapping注解的value和method属性，但是不满足headers属性，此时页面显示404错误，即资源未找到

## 3.7 ant风格

```
？：表示任意的单个字符
*：表示任意的0个或多个字符
**：表示任意层数的任意目录
注意：在使用**时，只能使用/**/xxx的方式
```

## 3.8 路径占位符

SpringMVC路径中的占位符常用于RESTful风格中，当请求路径中将某些数据通过路径的方式传输到服务器中，就可以在相应的@RequestMapping注解的value属性中通过占位符{xxx}表示传输的数据，在通过@PathVariable注解，将占位符所表示的数据赋值给控制器方法的形参

```java
@RequestMapping("/test/{id}/{username}")
public String testRest(@PathVariable("id") String id, @PathVariable("username") String username){
	return " ";
}
```

# 四、获取请求参数

## 4.1 通过ServletAPI获取

```java
@RequestMapping("/me")
    public String me(HttpServletRequest request){
        String username = request.getParameter("username");
        System.out.println("username:" + username);
        return "me";
}
```

## 4.2 通过控制器方法的形参获取

```java
@RequestMapping("/me")
public String me(String username){
	System.out.println("username:" + username);
	return "me";
}
```

> 注：
> 若请求所传输的请求参数中有多个同名的请求参数，此时可以在控制器方法的形参中设置字符串数组或者字符串类型的形参接收此请求参数
> 若使用字符串数组类型的形参，此参数的数组中包含了每一个数据
> 若使用字符串类型的形参，此参数的值为每个数据中间使用逗号拼接的结果

## 4.3 @RequesParam

@RequestParam是将请求参数和控制器方法的形参创建映射关系
@RequestParam注解一共有三个属性：

- value：指定为形参赋值的请求参数的参数名
- required：设置是否必须传输此请求参数，默认值为true
  若设置为true时，则当前请求必须传输value所指定的请求参数，若没有传输该请求参数，且没有设置
- defaultValue属性，则页面报错400：Required String parameter 'xxx' is not present；若设置为
  false，则当前请求不是必须传输value所指定的请求参数，若没有传输，则注解所标识的形参的值为null
- defaultValue：不管required属性值为true或false，当value所指定的请求参数没有传输或传输的值为""时，则使用默认值为形参赋值

```java
@RequestMapping("/me")
    public String me(@RequestParam("name") String username){
        System.out.println("username:" + username);
        return "me";
}
```

## 4.4 @RequesHeader

@RequestHeader是将请求头信息和控制器方法的形参创建映射关系
@RequestHeader注解一共有三个属性：value、required、defaultValue，用法同@RequestParam

## 4.5 @CookieValue

@CookieValue是将cookie数据和控制器方法的形参创建映射关系
@CookieValue注解一共有三个属性：value、required、defaultValue，用法同@RequestParam

## 4.6 通过POJO获取

可以在控制器方法的形参位置设置一个实体类类型的形参，此时若浏览器传输的请求参数的参数名和实体类中的属性名一致，那么请求参数就会为此属性赋值

## 4.7 乱码问题

解决获取请求参数的乱码问题，可以使用SpringMVC提供的编码过滤器CharacterEncodingFilter，但是必须在web.xml中进行注册

```xml
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>forceEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

> 注：
> SpringMVC中处理编码的过滤器一定要配置到其他过滤器之前，否则无效

# 五、域对象共享数据

## 5.1 ServletAPI

```java
@RequestMapping("/testServletAPI")
 public String testServletAPI(HttpServletRequest request){
     request.setAttribute("username","ryh");
     return "me";
}
```

```html
<h1 th:text="${username}"></h1>
```

## 5.2 ModelAndView

```java
@RequestMapping("/testModelAndView")
public ModelAndView testModelAndView(){
    /**
     * ModelAndView有Model和View的功能
     * Model主要用于向请求域共享数据
     * View主要用于设置视图，实现页面跳转
     */
    ModelAndView modelAndView = new ModelAndView();
    //向请求域共享数据
    modelAndView.addObject("text","hello");
    //设置视图，实现页面跳转
    modelAndView.setViewName("me");
    return modelAndView;
}
```

```html
<h1 th:text="${text}"></h1>
```

## 5.3 Model

```java
@RequestMapping("/testModel")
public String testModel(Model model){
    model.addAttribute("text01","hello,model");
    return "me";
}
```

## 5.4 map

```java
@RequestMapping("/testMap")
public String testMap(Map<String, Object> map){
	map.put("testScope", "hello,Map");
	return "success";
}
```

## 5.5 ModelMap

```java
@RequestMapping("/testModelMap")
public String testModelMap(ModelMap modelMap){
	modelMap.addAttribute("testScope", "hello,ModelMap");
	return "success";
}
```

## 5.6 Model、ModelMap、Map的关系

Model、ModelMap、Map类型的参数其实本质上都是 BindingAwareModelMap 类型的

```java
public interface Model{}
public class ModelMap extends LinkedHashMap<String, Object> {}
public class ExtendedModelMap extends ModelMap implements Model {}
public class BindingAwareModelMap extends ExtendedModelMap {}
```

## 5.7 向session域共享数据

```java
@RequestMapping("/testSession")
public String testSession(HttpSession session){
	session.setAttribute("testSessionScope", "hello,session");
	return "success";
}
```

## 5.8 向application域共享数据

```java
@RequestMapping("/testApplication")
public String testApplication(HttpSession session){
	ServletContext application = session.getServletContext();
	application.setAttribute("testApplicationScope", "hello,application");
	return "success";
}
```

# 六、SpringMVC的视图

SpringMVC中的视图是View接口，视图的作用渲染数据，将模型Model中的数据展示给用户

SpringMVC视图的种类很多，默认有转发视图和重定向视图
当工程引入jstl的依赖，转发视图会自动转换为JstlView
若使用的视图技术为Thymeleaf，在SpringMVC的配置文件中配置了Thymeleaf的视图解析器，由此视
图解析器解析之后所得到的是ThymeleafView

## 6.1 ThymeleafView

当控制器方法中所设置的视图名称没有任何前缀时，此时的视图名称会被SpringMVC配置文件中所配置的视图解析器解析，视图名称拼接视图前缀和视图后缀所得到的最终路径，会通过转发的方式实现跳转

```java
@RequestMapping("/testHello")
public String testHello(){
	return "hello";
}
```

![](https://img.yublog.top/img/202211191351454.png)

## 6.2 转发视图

SpringMVC中默认的转发视图是InternalResourceView
SpringMVC中创建转发视图的情况：
当控制器方法中所设置的视图名称以"forward:"为前缀时，创建InternalResourceView视图，此时的视图名称不会被SpringMVC配置文件中所配置的视图解析器解析，而是会将前缀"forward:"去掉，剩余部分作为最终路径通过转发的方式实现跳转

```java
@RequestMapping("/testForward")
public String testForward(){
	return "forward:/testHello";
}	
```

![](https://img.yublog.top/img/202211191353753.png)

## 6.3 重定向视图

SpringMVC中默认的重定向视图是RedirectView

当控制器方法中所设置的视图名称以"redirect:"为前缀时，创建RedirectView视图，此时的视图名称不会被SpringMVC配置文件中所配置的视图解析器解析，而是会将前缀"redirect:"去掉，剩余部分作为最终路径通过重定向的方式实现跳转

```java
@RequestMapping("/testRedirect")
public String testRedirect(){
	return "redirect:/testHello";
}
```

![](https://img.yublog.top/img/202211191354162.png)

> 注：
> 重定向视图在解析时，会先将redirect:前缀去掉，然后会判断剩余部分是否以/开头，若是则会自动拼接上下文路径

## 6.4 视图控制器view-controller

>当控制器方法中，仅仅用来实现页面跳转，即只需要设置视图名称时，可以将处理器方法使用viewcontroller标签进行表示

```xml
<!--注意 开启mvc注解驱动的标签-->
<mvc:annotation-driven/>
<!--
	path：设置处理的请求地址
	view-name：设置请求地址所对应的视图名称
-->
<mvc:view-controller path="/" view-name="index"/>
```

> 注：
> 当SpringMVC中设置任何一个view-controller时，其他控制器中的请求映射将全部失效，此时需
> 要在SpringMVC的核心配置文件中设置开启mvc注解驱动的标签：
> ```<mvc:annotation-driven />```

# 七、RESTful

## 7.1 RESTful简介

REST：Representational State Transfer，表现层资源状态转移。

1. 资源

   资源是一种看待服务器的方式，即，将服务器看作是由很多离散的资源组成。

2. 资源的表述

   资源的表述是一段对于资源在某个特定时刻的状态的描述。

3. 状态转移

   状态转移说的是：在客户端和服务器端之间转移（transfer）代表资源状态的表述。通过转移和操作资源的表述，来间接实现操作资源的目的。

## 7.2 RESTful的实现

就是 HTTP 协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。
它们分别对应四种基本操作：

GET 用来获取资源，POST 用来新建资源，PUT 用来更新资源，DELETE用来删除资源

REST 风格提倡 URL 地址使用统一的风格设计，从前到后各个单词使用斜杠分开，不使用问号键值对方式携带请求参数，而是将要发送给服务器的数据作为 URL 地址的一部分，以保证整体风格的一致性。

| 操作     | 传统方式         | REST风格            |
| -------- | ---------------- | ------------------- |
| 查询操作 | getUserById?id=1 | user/1->get请求方式 |
| 保存操作 | saveUser         | user->post请求方式  |
| 删除操作 | deleteUser?id=1  | user/1->delete请求  |
| 更新操作 | updateUser       | user->put请求       |

## 7.3 HiddenHttpMethodFilter

SpringMVC 提供了 HiddenHttpMethodFilter 帮助我们将 POST 请求转换为 DELETE 或 PUT 请求
HiddenHttpMethodFilter 处理put和delete请求的条件：

1. 当前请求的请求方式必须为post
2. 当前请求必须传输请求参数_method

在web.xml中注册HiddenHttpMethodFilter

```xml
<filter>
	<filter-name>HiddenHttpMethodFilter</filter-name>
	<filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filterclass>
</filter>
<filter-mapping>
	<filter-name>HiddenHttpMethodFilter</filter-name>
	<url-pattern>/*</url-pattern>
</filter-mapping>
```

> 注：
>
> 目前为止，SpringMVC中提供了两个过滤器：CharacterEncodingFilter和HiddenHttpMethodFilter
> 在web.xml中注册时，必须先注册CharacterEncodingFilter，再注册HiddenHttpMethodFilter
> 原因：
>
> - 在 CharacterEncodingFilter 中通过 request.setCharacterEncoding(encoding) 方法设置字
>   符集的
>
> - request.setCharacterEncoding(encoding) 方法要求前面不能有任何获取请求参数的操作
>
> - 而 HiddenHttpMethodFilter 恰恰有一个获取请求方式的操作：
>
>   ```String paramValue = request.getParameter(this.methodParam);```

```html
<form id="delete_form" method="post">
	<!-- HiddenHttpMethodFilter要求：必须传输_method请求参数，并且值为最终的请求方式 -->
	<input type="hidden" name="_method" value="delete"/>
</form>
```

# 八、SpringMVC处理ajax请求

## 8.1 @RequestBody

@RequestBody可以获取请求体信息，使用@RequestBody注解标识控制器方法的形参，当前请求的请求体就会为当前注解所标识的形参赋值

```html
<!--此时必须使用post请求方式，因为get请求没有请求体-->
<form th:action="@{/test/RequestBody}" method="post">
	用户名：<input type="text" name="username"><br>
	密码：<input type="password" name="password"><br>
	<input type="submit">
</form>
```

```java
@RequestMapping("/test/RequestBody")
public String testRequestBody(@RequestBody String requestBody){
	System.out.println("requestBody:"+requestBody);
	return "success";
}
```

## 8.2 @RequestBody获取json格式的请求参数

> 在使用了axios发送ajax请求之后，浏览器发送到服务器的请求参数有两种格式：
>
> 1. name=value&name=value...，此时的请求参数可以通过request.getParameter()获取，对应SpringMVC中，可以直接通过控制器方法的形参获取此类请求参数
> 2. {key:value,key:value,...}，此时无法通过request.getParameter()获取，之前我们使用操作json的相关jar包gson或jackson处理此类请求参数，可以将其转换为指定的实体类对象或map集合。在SpringMVC中，直接使用@RequestBody注解标识控制器方法的形参即可将此类请求参数转换为java对象

1. 导入入jackson的依赖

   ```xml
   <dependency>
   	<groupId>com.fasterxml.jackson.core</groupId>
   	<artifactId>jackson-databind</artifactId>
   	<version>2.12.1</version>
   </dependency>
   ```

2. SpringMVC的配置文件中设置开启mvc的注解驱动

   ```xml
   <!--开启mvc的注解驱动-->
   <mvc:annotation-driven />
   ```

3. 在控制器方法的形参位置，设置json格式的请求参数要转换成的java类型（实体类或map）的参
   数，并使用@RequestBody注解标识

   ```java
   //将json格式的数据转换为map集合
   @RequestMapping("/test/RequestBody/json")
   public void testRequestBody(@RequestBody Map<String, Object> map,
   HttpServletResponse response) throws IOException {
   	System.out.println(map);
   	//{username=admin, password=123456}
   	response.getWriter().print("hello,axios");
   }
   //将json格式的数据转换为实体类对象
   @RequestMapping("/test/RequestBody/json")
   public void testRequestBody(@RequestBody User user, HttpServletResponse
   response) throws IOException {
   	System.out.println(user);
   	//User{id=null, username='admin', password='123456', age=null,gender='null'}
   	response.getWriter().print("hello,axios");
   }
   ```

## 8.3 @ResponseBody

@ResponseBody用于标识一个控制器方法，可以将该方法的返回值直接作为响应报文的响应体响应到浏览器

```java
@RequestMapping("/testResponseBody")
public String testResponseBody(){
	//此时会跳转到逻辑视图success所对应的页面
	return "success";
}
@RequestMapping("/testResponseBody")
@ResponseBody
public String testResponseBody(){
	//此时响应浏览器数据success
	return "success";
}
```

## 8.4 @ResponseBody响应浏览器json数据

@ResponseBody响应浏览器json数据的条件

1. 导入jackson的依赖

   ```xml
   <dependency>
   	<groupId>com.fasterxml.jackson.core</groupId>
   	<artifactId>jackson-databind</artifactId>
   	<version>2.12.1</version>
   </dependency>
   ```

2. SpringMVC的配置文件中设置开启mvc的注解驱动

   ```xml
   <!--开启mvc的注解驱动-->
   <mvc:annotation-driven />
   ```

3. 使用@ResponseBody注解标识控制器方法，在方法中，将需要转换为json字符串并响应到浏览器的java对象作为控制器方法的返回值，此时SpringMVC就可以将此对象直接转换为json字符串并响应到浏览器

   ```java
   //响应浏览器list集合
   @RequestMapping("/test/ResponseBody/json")
   @ResponseBody
   public List<User> testResponseBody(){
   	User user1 = new User(1001,"admin1","123456",23,"男");
   	User user2 = new User(1002,"admin2","123456",23,"男");
   	User user3 = new User(1003,"admin3","123456",23,"男");
   	List<User> list = Arrays.asList(user1, user2, user3);
   	return list;
   }
   //响应浏览器map集合
   @RequestMapping("/test/ResponseBody/json")
   @ResponseBody
   public Map<String, Object> testResponseBody(){
   	User user1 = new User(1001,"admin1","123456",23,"男");
   	User user2 = new User(1002,"admin2","123456",23,"男");
   	User user3 = new User(1003,"admin3","123456",23,"男");
   	Map<String, Object> map = new HashMap<>();
   	map.put("1001", user1);
   	map.put("1002", user2);
   	map.put("1003", user3);
   	return map;
   }
   //响应浏览器实体类对象
   @RequestMapping("/test/ResponseBody/json")
   @ResponseBody
   public User testResponseBody(){
   	return user;
   }
   ```

## 8.5 @RestController注解

@RestController注解是springMVC提供的一个复合注解，标识在控制器的类上，就相当于为类添加了@Controller注解，并且为其中的每个方法添加了@ResponseBody注解

# 九、文件上传和下载

## 9.1 文件下载

使用ResponseEntity实现下载文件的功能

```java
@RequestMapping("/download")
public ResponseEntity<byte[]> download(HttpSession httpSession) throws IOException {
    // 获取ServletContext对象
    ServletContext servletContext = httpSession.getServletContext();
    // 获取服务器中文件的真实路径
    String realPath = servletContext.getRealPath("/static/01.jpg");
    //创建输入流
    InputStream is = new FileInputStream(realPath);
    //创建字节数组
    byte[] bytes = new byte[is.available()];
    //将流读到字节数组中
    is.read(bytes);
    //创建HttpHeaders对象设置响应头信息
    MultiValueMap<String, String> headers = new HttpHeaders();
    //设置要下载方式以及下载文件的名字
    headers.add("Content-Disposition", "attachment;filename=1.jpg");
    //设置响应状态码
    HttpStatus statusCode = HttpStatus.OK;
    //创建ResponseEntity对象
    ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(bytes, headers, statusCode);
    // 关闭流
    is.close();
    return responseEntity;
}
```

## 9.2 文件上传

> 文件上传要求form表单的请求方式必须为post，并且添加属性enctype="multipart/form-data"
>
> SpringMVC中将上传的文件封装到MultipartFile对象中，通过此对象可以获取文件相关信息

1. 加入依赖

   ```xml
   <!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
   <dependency>
       <groupId>commons-fileupload</groupId>
       <artifactId>commons-fileupload</artifactId>
       <version>1.3.1</version>
   </dependency>
   ```

2. 在SpringMVC的配置文件中添加配置：

   ```xml
   <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"/>
   ```

3. 控制器方法

   ```java
    @RequestMapping("/upFile")
    public String upFile (MultipartFile photo, HttpSession session) throws IOException {
        //获取上传的文件的文件名
        String fileName = photo.getOriginalFilename();
        //处理文件重名问题
        String hzName = fileName.substring(fileName.lastIndexOf("."));
        fileName = UUID.randomUUID().toString() + hzName;
        //获取服务器中photo目录的路径
        ServletContext servletContext = session.getServletContext();
        String photoPath = servletContext.getRealPath("photo");
        File file = new File(photoPath);
        if(!file.exists()){
            file.mkdir();
        }
        String finalPath = photoPath + File.separator + fileName;
        //实现上传功能
        photo.transferTo(new File(finalPath));
        return "me";
    }
   ```

4. html表单

   ```html
   <form th:action="@{/upFile}" method="post" enctype="multipart/form-data">
       <input type="file" name="photo"/><br>
       <input type="submit" value="上传文件">
   </form>
   ```

# 十、拦截器

## 10.1 拦截器的配置

SpringMVC中的拦截器用于拦截控制器方法的执行

1. SpringMVC中的拦截器需要实现HandlerInterceptor

   ```java
   @Component
   public class Interceptor implements HandlerInterceptor {
       @Override
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
           System.out.println("preHandle");
           return false;
       }
   
       @Override
       public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
           System.out.println("postHandle");
       }
   
       @Override
       public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
           System.out.println("afterCompletion");
       }
   }
   ```

2. SpringMVC的拦截器必须在SpringMVC的配置文件中进行配置：

   ```xml
   <mvc:interceptors>
   	<mvc:interceptor>
   	    <mvc:mapping path="/**"/>
           <mvc:exclude-mapping path="/"/>
   	    <ref bean="interceptor"/>
   	</mvc:interceptor>
   </mvc:interceptors>
   ```

## 10.2 拦截器的三个抽象方法

 SpringMVC中的拦截器有三个抽象方法：

- preHandle：控制器方法执行之前执行preHandle()，其boolean类型的返回值表示是否拦截或放行，返回true为放行，即调用控制器方法；返回false表示拦截，即不调用控制器方法
- postHandle：控制器方法执行之后执行postHandle()
- afterCompletion：处理完视图和模型数据，渲染视图完毕之后执行afterCompletion()

## 10.3 多个拦截器的执行顺序

1. 若每个拦截器的preHandle()都返回true
   此时多个拦截器的执行顺序和拦截器在SpringMVC的配置文件的配置顺序有关：
   preHandle()会按照配置的顺序执行，而postHandle()和afterCompletion()会按照配置的反序执行
2. 若某个拦截器的preHandle()返回了false
   preHandle()返回false和它之前的拦截器的preHandle()都会执行，postHandle()都不执行，返回false的拦截器之前的拦截器的afterCompletion()会执行

# 十一、异常处理器

## 11.1 基于配置的异常处理

SpringMVC提供了一个处理控制器方法执行过程中所出现的异常的接口：HandlerExceptionResolver
HandlerExceptionResolver接口的实现类有：DefaultHandlerExceptionResolver和SimpleMappingExceptionResolver
SpringMVC提供了自定义的异常处理器SimpleMappingExceptionResolver，使用方式：

```xml
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
	<property name="exceptionMappings">
		<props>
		<!--
			properties的键表示处理器方法执行过程中出现的异常
			properties的值表示若出现指定异常时，设置一个新的视图名称，跳转到指定页面
		-->
		<prop key="java.lang.ArithmeticException">error</prop>
		</props>
	</property>
	<!--
		exceptionAttribute属性设置一个属性名，将出现的异常信息在请求域中进行共享
	-->
	<property name="exceptionAttribute" value="ex"></property>
</bean>
```

## 11.2 基于注解的异常处理

```java
//@ControllerAdvice将当前类标识为异常处理的组件
@ControllerAdvice
public class ExceptionController {
	//@ExceptionHandler用于设置所标识方法处理的异常
	@ExceptionHandler(ArithmeticException.class)
	//ex表示当前请求处理中出现的异常对象
	public String handleArithmeticException(Exception ex, Model model){
	model.addAttribute("ex", ex);
	return "error";
	}
}
```

# 十二 注解配置SpringMVC

## 12.1 创建初始化类，代替web.xml

> 在Servlet3.0环境中，容器会在类路径中查找实现avax.servlet.ServletContainerInitializer接口的类，如果找到的话就用它来配置Servlet容器。 Spring提供了这个接口的实现，名为SpringServletContainerInitializer，这个类反过来又会查找实现ebApplicationInitializer的类并将配置的任务交给它们来完成。Spring3.2引入了一个便利的WebApplicationInitializer基础实现，名为AbstractAnnotationConfigDispatcherServletInitializer，当我们的类扩展了AbstractAnnotationConfigDispatcherServletInitializer并将其部署到Servlet3.0容器的时候，容器会自动发现它，并用它来配置Servlet上下文。

```java
public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {
	/**
	* 指定spring的配置类
	* @return
	*/
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[]{SpringConfig.class};
	}
	/**
	* 指定SpringMVC的配置类
	* @return
	*/
	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[]{WebConfig.class};
	}
	/**
	* 指定DispatcherServlet的映射规则，即url-pattern
	* @return
	*/
	@Override
	protected String[] getServletMappings() {
		return new String[]{"/"};
	}
	/**
	* 添加过滤器
	* @return
	*/
	@Override
	protected Filter[] getServletFilters() {
		CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
		encodingFilter.setEncoding("UTF-8");
		encodingFilter.setForceRequestEncoding(true);
		HiddenHttpMethodFilter hiddenHttpMethodFilter = new
		HiddenHttpMethodFilter();
		return new Filter[]{encodingFilter, hiddenHttpMethodFilter};
	}
}
```

## 12.2 创建SpringConfig配置类，代替spring的配置文件

```java
@Configuration
public class SpringConfig {
	//ssm整合之后，spring的配置信息写在此类中
}
```

## 12.3 创建WebConfig配置类，代替SpringMVC的配置文件

```java
@Configuration
//扫描组件
@ComponentScan("com.atguigu.mvc.controller")
//开启MVC注解驱动
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	//使用默认的servlet处理静态资源
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer	configurer) {
		configurer.enable();
	}
	//配置文件上传解析器
	@Bean
	public CommonsMultipartResolver multipartResolver(){
		return new CommonsMultipartResolver();
	}
	//配置拦截器
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
        FirstInterceptor firstInterceptor = new FirstInterceptor();
		registry.addInterceptor(firstInterceptor).addPathPatterns("/**");
	}
	//配置视图控制
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("index");
	}
	//配置异常映射
	@Override
	public void
	configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
		SimpleMappingExceptionResolver exceptionResolver = new
		SimpleMappingExceptionResolver();
		Properties prop = new Properties();
		prop.setProperty("java.lang.ArithmeticException", "error");
		//设置异常映射
		exceptionResolver.setExceptionMappings(prop);
		//设置共享异常信息的键
		exceptionResolver.setExceptionAttribute("ex");
		resolvers.add(exceptionResolver);
	}
        
	//配置生成模板解析器
	@Bean
	public ITemplateResolver templateResolver() {
		WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
		// ServletContextTemplateResolver需要一个ServletContext作为构造参数，可通过	WebApplicationContext 的方法获得
		ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(
		webApplicationContext.getServletContext());
		templateResolver.setPrefix("/WEB-INF/templates/");
		templateResolver.setSuffix(".html");
		templateResolver.setCharacterEncoding("UTF-8");
		templateResolver.setTemplateMode(TemplateMode.HTML);
		return templateResolver;
	}
	//生成模板引擎并为模板引擎注入模板解析器
	@Bean
	public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
		SpringTemplateEngine templateEngine = new SpringTemplateEngine();
		templateEngine.setTemplateResolver(templateResolver);
		return templateEngine;
	}
	//生成视图解析器并未解析器注入模板引擎
	@Bean
	public ViewResolver viewResolver(SpringTemplateEngine templateEngine) {
		ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
		viewResolver.setCharacterEncoding("UTF-8");
		viewResolver.setTemplateEngine(templateEngine);
		return viewResolver;
	}
}
```

# 十三、SpringMVC执行流程

