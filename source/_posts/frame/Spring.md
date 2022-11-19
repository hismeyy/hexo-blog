---
title: Spring
date: 2022-11-16
description: 第二次学习Spring，第一次是看着狂神的视频学的，觉得自己掌握的不是很好，所以再来一边
keywords: Spring
cover: https://img.yublog.top/img/202211161135730.png
top_img: https://img.yublog.top/img/202211161135730.png
tags: 
	- java
	- 框架
	- Spring
categories: Java-框架相关
---

# 一、Spring简介

## 1.1 Spring是什么

> 官网地址：https://spring.io/
>
> Spring 是最受欢迎的企业级 Java 应用程序开发框架
> Spring 框架来创建性能好、易于测试、可重用的代码。
> Spring 框架是一个开源的 Java 平台，它最初是由 Rod Johnson 编写的，并且于 2003 年 6 月首次在 Apache 2.0 许可下发布。
> Spring 是轻量级的框架，其基础版本只有 2 MB 左右的大小。
> Spring 框架的核心特性是可以用于开发任何 Java 应用程序，但是在 Java EE 平台上构建 web 应用程序是需要扩展的。 Spring 框架的目标是使 J2EE 开发变得更容易使用，通过启用基于 POJO编程模型来促进良好的编程实践。

## 1.2 Spring家族

> 项目列表：https://spring.io/projects

## 1.3 Spring Framework

Spring 基础框架，可以视为 Spring 基础设施，基本上任何其他 Spring 项目都是以 Spring Framework为基础的。

### 1.3.1 特点

- 非侵入式：使用 Spring Framework 开发应用程序时，Spring 对应用程序本身的结构影响非常小。对领域模型可以做到零污染；对功能性组件也只需要使用几个简单的注解进行标记，完全不会破坏原有结构，反而能将组件结构进一步简化。这就使得基于 Spring Framework 开发应用程序时结构清晰、简洁优雅。
- 控制反转：IOC——Inversion of Control，翻转资源获取方向。把自己创建资源、向环境索取资源变成环境将资源准备好，我们享受资源注入。
- 面向切面编程：AOP——Aspect Oriented Programming，在不修改源代码的基础上增强代码功能。
- 容器：Spring IOC 是一个容器，因为它包含并且管理组件对象的生命周期。组件享受到了容器化的管理，替程序员屏蔽了组件创建过程中的大量细节，极大的降低了使用门槛，大幅度提高了开发效率。
- 组件化：Spring 实现了使用简单的组件配置组合成一个复杂的应用。在 Spring 中可以使用 XML和 Java 注解组合这些对象。这使得我们可以基于一个个功能明确、边界清晰的组件有条不紊的搭建超大型复杂应用系统。
- 声明式：很多以前需要编写代码才能实现的功能，现在只需要声明需求即可由框架代为实现。
- 一站式：在 IOC 和 AOP 的基础上可以整合各种企业应用的开源框架和优秀的第三方类库。而且Spring 旗下的项目已经覆盖了广泛领域，很多方面的功能性需求可以在 Spring Framework 的基础上全部使用 Spring 来实现。

### 1.3.2 五大功能模块

| 功能模块                | 功能介绍                                                    |
| ----------------------- | ----------------------------------------------------------- |
| Core Container          | 核心容器，在 Spring 环境下使用任何功能都必须基于 IOC 容器。 |
| AOP&Aspects             | 面向切面编程                                                |
| Testing                 | 提供了对 junit 或 TestNG 测试框架的整合。                   |
| Data Access/Integration | 提供了对数据访问/集成的功能。                               |
| Spring MVC              | 提供了面向Web应用程序的集成功能。                           |

# 二、IOC

## 2.1 IOC容器

### 2.1.1 IOC思想

IOC：Inversion of Control，翻译过来是反转控制。

1. 获取资源传统方式

   在应用程序中的组件需要获取资源时，传统的方式是组件主动的从容器中获取所需要的资源，在这样的模式下开发人员往往需要知道在具体容器中特定资源的获取方式，增加了学习成本，同时降低了开发效率。

2. 反转控制方式获取资源

   反转控制的思想完全颠覆了应用程序组件获取资源的传统方式：反转了资源的获取方向——改由容器主动的将资源推送给需要的组件，开发人员不需要知道容器是如何创建资源对象的，只需要提供接收资源的方式即可，极大的降低了学习成本，提高了开发的效率。这种行为也称为查找的被动形式。

3. DI

   Dependency Injection，翻译过来是依赖注入。

   DI 是 IOC 的另一种表述方式：即组件以一些预先定义好的方式（例如：setter 方法）接受来自于容器的资源注入。相对于IOC而言，这种表述更直接。

所以**IOC 就是一种反转控制的思想， 而 DI 是对 IOC 的一种具体实现。**

### 2.1.2 IOC容器在Spring中的实现

Spring 的 IOC 容器就是 IOC 思想的一个落地的产品实现。IOC 容器中管理的组件也叫做 bean。在创建bean 之前，首先需要创建 IOC 容器。Spring 提供了 IOC 容器的**两种实现方式：**

1. BeanFactory
   这是 IOC 容器的基本实现，是 Spring 内部使用的接口。面向 Spring 本身，不提供给开发人员使用。

2. ApplicationContext
   BeanFactory 的子接口，提供了更多高级特性。面向 Spring 的使用者，几乎所有场合都使用ApplicationContext 而不是底层的 BeanFactory。

3. ApplicationContext的主要实现类

| 类型名                          | 简介                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| ClassPathXmlApplicationContext  | 通过读取类路径下的 XML 格式的配置文件创建 IOC 容器对象       |
| FileSystemXmlApplicationContext | 通过文件系统路径读取 XML 格式的配置文件创建 IOC 容器对象     |
| ConfigurableApplicationContext  | ApplicationContext 的子接口，包含一些扩展方法refresh() 和 close() ，让 ApplicationContext 具有启动、关闭和刷新上下文的能力。 |
| WebApplicationContext           | 专门为 Web 应用准备，基于 Web 环境创建 IOC 容器对象，并将对象引入存入 ServletContext 域中。 |

## 2.2 基于XML管理bean

### 入门

1. 创建Maven Module

2. 引入依赖

   ```xml
   <dependencies>
   	<!-- 基于Maven依赖传递性，导入spring-context依赖即可导入当前所需所有jar包 -->
   	<dependency>
   	    <groupId>org.springframework</groupId>
   	    <artifactId>spring-context</artifactId>
   	    <version>5.3.23</version>
   	</dependency>
   	<!-- junit测试 -->
   	<dependency>
   	    <groupId>junit</groupId>
   	    <artifactId>junit</artifactId>
   	    <version>4.13.2</version>
   	    <scope>test</scope>
   	</dependency>
   </dependencies>
   ```

3. 创建类

   ```java
   package com.spring;
   
   public class HelloSpring {
       public void say(){
           System.out.println("HelloSpring");
       }
   }
   ```

4. 创建Spring的配置文件

   命名applicationContext.xml（也可以随便）

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
   
   </beans>
   ```

5. 在Spring的配置文件中配置bean

   ```xml
   <bean id="helloSpring" class="com.spring.HelloSpring"/>
   ```

6. 创建测试类

   ```java
   @Test
   public void sayTest(){
       ApplicationContext appletContext = new ClassPathXmlApplicationContext("applicationContext.xml");
       HelloSpring helloSpring = (HelloSpring) appletContext.getBean("helloSpring");
       helloSpring.say();
   }
   ```

7. 思路

   ![](https://img.yublog.top/img/202211180946470.png)

8. 注意

   Spring 底层默认通过反射技术调用组件类的无参构造器来创建组件对象，这一点需要注意。如果在需要
   无参构造器时，没有无参构造器，则会抛出下面的异常：

   > Instantiation of bean failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [com.spring.HelloSpring]: No default constructor found; nested exception is java.lang.NoSuchMethodException: com.spring.HelloSpring.
   >
   > 未找到默认构造方法

### 获取bean

1. 根据id获取

   ```java
   // 需要强转
   appletContext.getBean("helloSpring");
   ```

2. 根据类型获取

   ```java
   // 不需要强转
   appletContext.getBean(HelloSpring.class);
   ```

3. 根据id和类型获取

   ```java
   // 不需要强转
   appletContext.getBean("helloSpring",HelloSpring.class);
   ```

4. 注意

   当根据类型获取bean时，要求IOC容器中指定类型的bean有且只能有一个，当IOC容器中一共配置了两个：根据类型获取时会抛出异常：

   > org.springframework.beans.factory.NoUniqueBeanDefinitionException 
   >
   > Bean不唯一异常

5. 扩展

   - 如果组件类实现了接口，根据接口类型可以获取 bean 吗？

     >可以，前提是bean唯一

   - 如果一个接口有多个实现类，这些实现类都配置了 bean，根据接口类型可以获取 bean 吗？

     >不行，因为bean不唯一

6. 结论

   根据类型来获取bean时，在满足bean唯一性的前提下，其实只是看：『对象 instanceof 指定的类型』的返回结果，只要返回的是true就可以认定为和类型匹配，能够获取到。

### 依赖注入

1. setter注入

   > 需要在类中添加set方法

   property标签：通过组件类的setXxx()方法给组件对象设置属性
   name属性：指定属性名（这个属性名是getXxx()、setXxx()方法定义的，和成员变量无关）
   value属性：指定属性值

   ```xml
   <bean id="" class="">
   	<property name="" value=""></property>
   </bean>
   ```

2. 构造器注入

   > 需要在类中添加有参构造方法

   constructor-arg标签还有两个属性可以进一步描述构造器参数：

   value属性：指定属性值

   index属性：指定参数所在位置的索引（从0开始）
   name属性：指定参数名

   ```xml
   <bean id="" class="">
   	<constructor-arg value=""></constructor-arg>
   </bean>
   ```

### 赋值

1. 字面量赋值

   ```xml
   <property name="name" value="张三"/>
   ```

2. null值

   ```xml
   <property name="name">
   	<null />
   </property>
   ```

3. xml实体

   ```xml
   <!-- 小于号在XML文档中用来定义标签的开始，不能随便使用 -->
   <!-- 解决方案一：使用XML实体来代替 -->
   <property name="expression" value="a &lt; b"/>
   ```

4. CDATA节

   ```xml
   <property name="expression">
   	<!-- 解决方案二：使用CDATA节 -->
   	<!-- CDATA中的C代表Character，是文本、字符的含义，CDATA就表示纯文本数据 -->
   	<!-- XML解析器看到CDATA节就知道这里是纯文本，就不会当作XML标签或属性来解析 -->
   	<!-- 所以CDATA节中写什么符号都随意 -->
   	<value><![CDATA[a < b]]></value>
   </property>
   ```

5. 为类型赋值

   ```xml
   // 引用Bean
   <property name="clazz" ref="clazzOne"></property>
   
   // 内部bean
   <bean id="" class="">
   	<property name="">
   		<bean id="" class="">
   			<property name="" value=""></property>
   		</bean>
   	</property>
   </bean>
   
   // 级联属性赋值
   <bean id="studentFour" class="com.atguigu.spring.bean.Student">
   <!-- 一定先引用某个bean为属性赋值，才可以使用级联方式更新属性 -->
   <property name="clazz" ref="clazzOne"></property>
   <property name="clazz.clazzId" value="3333"></property>
   </bean>
   ```

6. 为数组赋值

   ```xml
   <bean id="" class="">
   	<property name="">
   		<array>
   			<value></value>
   			<value></value>
   			<value></value>
   		</array>
   	</property>
   </bean>
   ```

7. 为集合赋值

   ```xml
   <bean id="" class="">
   	<property name="">
   		<list>
   			<ref bean=""></ref>
   			<ref bean=""></ref>
   			<ref bean=""></ref>
   		</list>
   	</property>
   </bean>
   ```

   > 若为Set集合类型属性赋值，只需要将其中的list标签改为set标签即可

   ```java
   <bean id="" class="">
   	<property name="">
   		<map>
   			<entry>
   				<key>
       				<value></value>
   				</key>
   				<ref bean=""></ref>
   			</entry>
   		</map>
   	</property>
   </bean>

> 使用util:list、util:map标签必须引入相应的命名空间，可以通过idea的提示功能选择

```xml
<!--list集合类型的bean-->
<util:list id="">
	<ref bean=""></ref>
	<ref bean=""></ref>
	<ref bean=""></ref>
</util:list>
<!--map集合类型的bean-->
<util:map id="">
	<entry>
		<key>
			<value>10010</value>
		</key>
		<ref bean=""></ref>
	</entry>
</util:map>
```



### p空间命名

引入p命名空间后，可以通过以下方式为bean的各个属性赋值

```xml
<bean id="" class="" p:id="" p:name="" p:clazz-ref="" p:teacherMapref=""></bean>
```



### 引入外部属性文件

1. 加入依赖

   ```xml
   <!-- MySQL驱动 -->
   <dependency>
   	<groupId>mysql</groupId>
   	<artifactId>mysql-connector-java</artifactId>
   	<version>8.0.16</version>
   </dependency>
   <!-- 数据源 -->
   <dependency>
   	<groupId>com.alibaba</groupId>
   	<artifactId>druid</artifactId>
   	<version>1.0.31</version>
   </dependency>
   ```

2. 创建外部属性文件

   jdbc.properties

   ```properties
   jdbc.user=
   jdbc.password=
   jdbc.url=
   jdbc.driver=
   ```

3. 引入属性文件

   ```xml
   <!-- 引入外部属性文件 -->
   <context:property-placeholder location="classpath:jdbc.properties"/>
   ```

4. 配置bean

   ```xml
   <bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
   	<property name="url" value="${jdbc.url}"/>
   	<property name="driverClassName" value="${jdbc.driver}"/>
   	<property name="username" value="${jdbc.user}"/>
   	<property name="password" value="${jdbc.password}"/>
   </bean>
   ```

### bean的作用域

> 在Spring中可以通过配置bean标签的scope属性来指定bean的作用域范围

- singleton(默认) 单例 IOC容器初始时创建对象
- prototype 多例 获取bean时创建对象

> 在WebApplicationContext环境下还会有另外两个作用域.

- request 在一个请求范围内有效
- session 在一个会话范围内有效

### bean的生命周期

具体的生命周期过程

- bean对象创建（调用无参构造器）
- 给bean对象设置属性
- bean对象初始化之前操作（由bean的后置处理器负责）
- bean对象初始化（需在配置bean时指定初始化方法）
- bean对象初始化之后操作（由bean的后置处理器负责）、
- bean对象就绪可以使用
- bean对象销毁（需在配置bean时指定销毁方法）
- IOC容器关闭

> 注意其中的initMethod()和destroyMethod()，可以通过配置bean指定为初始化和销毁的方法

```xml
<!-- 使用init-method属性指定初始化方法 -->
<!-- 使用destroy-method属性指定销毁方法 -->
<bean class="" scope="prototype" init-method="initMethod" destroy-method="destroyMethod">
<property name="" value=""></property>
</bean>
```

bean的后置处理器

bean的后置处理器会在生命周期的初始化前后添加额外的操作，需要实现BeanPostProcessor接口，
且配置到IOC容器中，需要注意的是，bean后置处理器不是单独针对某一个bean生效，而是针对IOC容器中所有bean都会执行
创建bean的后置处理器：

```java
package com.atguigu.spring.process;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
public class MyBeanProcessor implements BeanPostProcessor {
    
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName)
            throws BeansException {
        System.out.println("☆☆☆" + beanName + " = " + bean);
        return bean;
    }
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName)
            throws BeansException {
        System.out.println("★★★" + beanName + " = " + bean);
        return bean;
    }
}
```

### FactoryBean

FactoryBean是Spring提供的一种整合第三方框架的常用机制。和普通的bean不同，配置一个FactoryBean类型的bean，在获取bean的时候得到的并不是class属性中配置的这个类的对象，而是getObject()方法的返回值。通过这种机制，Spring可以帮我们把复杂组件创建的详细过程和繁琐细节都屏蔽起来，只把最简洁的使用界面展示给我们。

1. 创建UserFactoryBean实现FactoryBean<User>接口

2. 配置

   ```xml
   <bean id="user" class="com.atguigu.bean.UserFactoryBean"></bean>
   ```

3. 测试

   ```java
   @Test
   public void testUserFactoryBean(){
   	//获取IOC容器
   	ApplicationContext ac = new ClassPathXmlApplicationContext("springfactorybean.xml");
   	User user = (User) ac.getBean("user");
   	System.out.println(user);
   }
   ```

### 基于XML的自动装配

> 自动装配：
> 根据指定的策略，在IOC容器中匹配某一个bean，自动为指定的bean中所依赖的类类型或接口类型属性赋值

配置bean

> 使用bean标签的autowire属性设置自动装配效果
> 自动装配方式：byType
> byType：根据类型匹配IOC容器中的某个兼容类型的bean，为属性自动赋值。若在IOC中，没有任何一个兼容类型的bean能够为属性赋值，则该属性不装配，即值为默认值null
> 若在IOC中，有多个兼容类型的bean能够为属性赋值，则抛出异常：
> NoUniqueBeanDefinitionException

```xml
<bean id=""
	class="" autowire="byType">
</bean>
```

> 自动装配方式：byName
> byName：将自动装配的属性的属性名，作为bean的id在IOC容器中匹配相对应的bean进行赋值

```xml
<bean id=""
	class="" autowire="byName">
</bean>
```

## 2.3 基于注解管理bean

### 标记与扫描

**注解**
和 XML 配置文件一样，注解本身并不能执行，注解本身仅仅只是做一个标记，具体的功能是框架检测到注解标记的位置，然后针对这个位置按照注解标记的功能来执行具体操作。

> @Component：将类标识为普通组件 
>
> @Controller：将类标识为控制层组件 
>
> @Service：将类标识为业务层组件 
>
> @Repository：将类标识为持久层组件

**扫描**

Spring 为了知道程序员在哪些地方标记了什么注解，就需要通过扫描的方式，来进行检测。然后根据注解进行后续操作。

1. 最基本的扫描方式

   ```xml
   <context:component-scan base-package="扫描包"></context:component-scan>
   ```

2. 指定要排除的组件

   ```xml
   <context:component-scan base-package="扫描包">
   	<!-- context:exclude-filter标签：指定排除规则 -->
   	<!--
   		type：设置排除或包含的依据
   		type="annotation"，根据注解排除，expression中设置要排除的注解的全类名
   		type="assignable"，根据类型排除，expression中设置要排除的类型的全类名
   	-->
   	<context:exclude-filter type="annotation"
   	expression="排除的包"/>
   	<!--<context:exclude-filter type="assignable"
   	expression="com.atguigu.controller.UserController"/>-->
   </context:component-scan>
   ```

3. 仅扫描指定组件

   ```xml
   <context:component-scan base-package="扫描包" use-default-filters="false">
   	<!-- context:include-filter标签：指定在原有扫描规则的基础上追加的规则 -->
   	<!-- use-default-filters属性：取值false表示关闭默认扫描规则 -->
   	<!-- 此时必须设置use-default-filters="false"，因为默认规则即扫描指定包下所有类 -->
   	<!--
   		type：设置排除或包含的依据
   		type="annotation"，根据注解排除，expression中设置要排除的注解的全类名
   		type="assignable"，根据类型排除，expression中设置要排除的类型的全类名
   	-->
   	<context:include-filter type="annotation"
   	expression=""/>
   	<!--<context:include-filter type="assignable"
   	expression="com.atguigu.controller.UserController"/>-->
   </context:component-scan>
   ```

4. 组件所对应的bean的id

   在我们使用XML方式管理bean的时候，每个bean都有一个唯一标识，便于在其他地方引用。现在使用
   注解后，每个组件仍然应该有一个唯一标识。

   > 默认情况
   > 类名首字母小写就是bean的id。例如：UserController类对应的bean的id就是userController。
   >
   > 自定义bean的id
   >
   > 可通过标识组件的注解的value属性设置自定义的bean的id
   > @Service("userService") 
   >
   > 默认为userServiceImpl public class UserServiceImpl implements UserService {}
   

### 基于注解的自动装配

> @Autowired注解
> 在成员变量上直接标记@Autowired注解即可完成自动装配，不需要提供setXxx()方法。

> @Autowired注解其他细节
> @Autowired注解可以标记在构造器和set方法上

> @Autowired工作流程
>
> ![](https://img.yublog.top/img/202211181230272.png)
>
> 首先根据所需要的组件类型到IOC容器中查找
>
> - 能够找到唯一的bean：直接执行装配
> - 如果完全找不到匹配这个类型的bean：装配失败
>   - 和所需类型匹配的bean不止一个
>   - 没有@Qualifier注解：根据@Autowired标记位置成员变量的变量名作为bean的id进行匹配
>     - 能够找到：执行装配
>     - 找不到：装配失败
>   - 使用@Qualifier注解：根据@Qualifier注解中指定的名称作为bean的id进行匹配
>     - 能够找到：执行装配
>     - 找不到：装配失败

> @Autowired中有属性required，默认值为true，因此在自动装配无法找到相应的bean时，会装配失败可以将属性required的值设置为true，则表示能装就装，装不上就不装，此时自动装配的属性为默认值。但是实际开发时，基本上所有需要装配组件的地方都是必须装配的，用不上这个属性。

# 三、AOP

## 3.1 什么是AOP

AOP（Aspect Oriented Programming）是一种设计思想，是软件设计领域中的面向切面编程，它是面
向对象编程的一种补充和完善，它以通过预编译方式和运行期动态代理方式实现在不修改源代码的情况
下给程序动态统一添加额外功能的一种技术。



1. 横切关注点
   从每个方法中抽取出来的同一类非核心业务。在同一个项目中，我们可以使用多个横切关注点对相关方
   法进行多个不同方面的增强。
   这个概念不是语法层面天然存在的，而是根据附加功能的逻辑上的需要：有十个附加功能，就有十个横
   切关注点。
2. 通知
   每一个横切关注点上要做的事情都需要写一个方法来实现，这样的方法就叫通知方法。
   - 前置通知：在被代理的目标方法前执行
   - 返回通知：在被代理的目标方法成功结束后执行（寿终正寝）
   - 异常通知：在被代理的目标方法异常结束后执行（死于非命）
   - 后置通知：在被代理的目标方法最终结束后执行（盖棺定论）
   - 环绕通知：使用try...catch...finally结构围绕整个被代理的目标方法，包括上面四种通知对应的所有位置
3. 切面
   封装通知方法的类。
4. 目标
   被代理的目标对象。
5. 代理
   向目标对象应用通知之后创建的代理对象。
6. 连接点
   这也是一个纯逻辑概念，不是语法定义的。把方法排成一排，每一个横切位置看成x轴方向，把方法从上到下执行的顺序看成y轴，x轴和y轴的交叉点就是连接点。
7. 切入点
   定位连接点的方式。每个类的方法中都包含多个连接点，所以连接点是类中客观存在的事物（从逻辑上来说）。如果把连接点看作数据库中的记录，那么切入点就是查询记录的 SQL 语句。Spring 的 AOP 技术可以通过切入点定位到特定的连接点。切点通过 org.springframework.aop.Pointcut 接口进行描述，它使用类和方法作为连接点的查询条件。



**优点**

- 简化代码

  把方法中固定位置的重复的代码抽取出来，让被抽取的方法更专注于自己的核心功能，提高内聚性。

- 代码增强

  把特定的功能封装到切面类中，看哪里有需要，就往上套，被套用了切面逻辑的方法就被切面给增强了。

## 3.2 基于注解的AOP

> 动态代理（InvocationHandler）：JDK原生的实现方式，需要被代理的目标类必须实现接口。因为这个技术要求代理对象和目标对象实现同样的接口（兄弟两个拜把子模式）。
> cglib：通过继承被代理的目标类（认干爹模式）实现代理，所以不需要目标类实现接口。
> AspectJ：本质上是静态代理，将代理逻辑“织入”被代理的目标类编译得到的字节码文件，所以最终效果是动态的。weaver就是织入器。Spring只是借用了AspectJ中的注解。

1. 添加依赖

   ```xml
   <!-- spring-aspects会帮我们传递过来aspectjweaver -->
   <dependency>
   	<groupId>org.springframework</groupId>
   	<artifactId>spring-aspects</artifactId>
   	<version>5.3.1</version>
   </dependency>
   ```

2. 创建切面类并配置

   ```java
   // @Aspect表示这个类是一个切面类
   @Aspect
   // @Component注解保证这个切面类能够放入IOC容器
   @Component
   public class LogAspect {
       @Before("execution(public int com.atguigu.aop.annotation.CalculatorImpl.*(..))")
       public void beforeMethod(JoinPoint joinPoint) {
           String methodName = joinPoint.getSignature().getName();
           String args = Arrays.toString(joinPoint.getArgs());
           System.out.println("Logger-->前置通知，方法名：" + methodName + "，参数："+args);
       }
   
       @After("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
       public void afterMethod(JoinPoint joinPoint) {
           String methodName = joinPoint.getSignature().getName();
           System.out.println("Logger-->后置通知，方法名：" + methodName);
       }
   
       @AfterReturning(value = "execution(*com.atguigu.aop.annotation.CalculatorImpl.*(..))", returning = " result")
       public void afterReturningMethod(JoinPoint joinPoint, Object result) {
           String methodName = joinPoint.getSignature().getName();
           System.out.println("Logger-->返回通知，方法名：" + methodName + "，结果："+result);
       }
   
       @AfterThrowing(value = "execution(*com.atguigu.aop.annotation.CalculatorImpl.*(..))", throwing = " ex")
       public void afterThrowingMethod(JoinPoint joinPoint, Throwable ex) {
           String methodName = joinPoint.getSignature().getName();
           System.out.println("Logger-->异常通知，方法名：" + methodName + "，异常：" + ex);
       }
   
       @Around("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
       public Object aroundMethod(ProceedingJoinPoint joinPoint) {
           String methodName = joinPoint.getSignature().getName();
           String args = Arrays.toString(joinPoint.getArgs());
           Object result = null;
           try {
               System.out.println("环绕通知-->目标对象方法执行之前");
               //目标对象（连接点）方法的执行
               result = joinPoint.proceed();
               System.out.println("环绕通知-->目标对象方法返回值之后");
           } catch (Throwable throwable) {
               throwable.printStackTrace();
               System.out.println("环绕通知-->目标对象方法出现异常时");
           } finally {
               System.out.println("环绕通知-->目标对象方法执行完毕");
           }
           return result;
       }
   }
   ```

3. 在Spring的配置文件中配置

   ```xml
   <!--
   	基于注解的AOP的实现：
   	1、将目标对象和切面交给IOC容器管理（注解+扫描）
   	2、开启AspectJ的自动代理，为目标对象自动生成代理
   	3、将切面类通过注解@Aspect标识
   -->
   <context:component-scan base-package="">
   </context:component-scan>
   <aop:aspectj-autoproxy />
   ```

## 3.3 各种通知

- 前置通知：使用@Before注解标识，在被代理的目标方法前执行
- 返回通知：使用@AfterReturning注解标识，在被代理的目标方法成功结束后执行（寿终正寝）
- 异常通知：使用@AfterThrowing注解标识，在被代理的目标方法异常结束后执行（死于非命）
- 后置通知：使用@After注解标识，在被代理的目标方法最终结束后执行（盖棺定论）
- 环绕通知：使用@Around注解标识，使用try...catch...finally结构围绕整个被代理的目标方法，包
- 括上面四种通知对应的所有位置
  - 各种通知的执行顺序：
  - Spring版本5.3.x以前：
    前置通知
    目标操作
    后置通知
    返回通知或异常通知
  - Spring版本5.3.x以后：
    前置通知
    目标操作
    返回通知或异常通知
    后置通知

## 3.4 切入点表达式语法

![](https://img.yublog.top/img/202211181340065.png)

## 3.5 重用切入点表达式

1. 声明

   ```java
   @Pointcut("execution(* com.atguigu.aop.annotation.*.*(..))")
   public void pointCut(){}
   ```

2. 运用

   ```java
   @Before("pointCut()")
   @Before("com.atguigu.aop.CommonPointCut.pointCut()")
   ```

## 3.6 获取通知的相关信息

1. 获取连接点信息
   获取连接点信息可以在通知方法的参数位置设置JoinPoint类型的形参
2. 获取目标方法的返回值
   @AfterReturning中的属性returning，用来将通知方法的某个形参，接收目标方法的返回值
3. 获取目标方法的异常
   @AfterThrowing中的属性throwing，用来将通知方法的某个形参，接收目标方法的异常

## 3.7 环绕通知

```java
@Around("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
public Object aroundMethod(ProceedingJoinPoint joinPoint){
	String methodName = joinPoint.getSignature().getName();
	String args = Arrays.toString(joinPoint.getArgs());
	Object result = null;
	try {
		System.out.println("环绕通知-->目标对象方法执行之前");
		//目标方法的执行，目标方法的返回值一定要返回给外界调用者
		result = joinPoint.proceed();
		System.out.println("环绕通知-->目标对象方法返回值之后");
	} catch (Throwable throwable) {
		throwable.printStackTrace();
		System.out.println("环绕通知-->目标对象方法出现异常时");
	} finally {
		System.out.println("环绕通知-->目标对象方法执行完毕");
	}
	return result;
}
```

## 3.8 切面的优先级

相同目标方法上同时存在多个切面时，切面的优先级控制切面的内外嵌套顺序。

- 优先级高的切面：外面

- 优先级低的切面：里面

使用@Order注解可以控制切面的优先级：

- @Order(较小的数)：优先级高
- @Order(较大的数)：优先级低

## 3.3 基于XML的AOP

```xml
<context:component-scan base-package="com.atguigu.aop.xml"></context:componentscan>
<aop:config>
<!--配置切面类-->
<aop:aspect ref="loggerAspect">
    <aop:pointcut id="pointCut" expression="execution(*com.atguigu.aop.xml.CalculatorImpl.*(..))"/>
    <aop:before method="beforeMethod" pointcut-ref="pointCut"></aop:before>
    <aop:after method="afterMethod" pointcut-ref="pointCut"></aop:after>
    <aop:after-returning method="afterReturningMethod" returning="result" pointcut-ref="pointCut"></aop:after-returning>
    <aop:after-throwing method="afterThrowingMethod" throwing="ex" pointcutref="pointCut"></aop:after-throwing>

    <aop:around method="aroundMethod" pointcut-ref="pointCut"></aop:around></aop:aspect>
    <aop:aspect ref="validateAspect" order="1">
        <aop:before method="validateBeforeMethod" pointcut-ref="pointCut">
        </aop:before>
    </aop:aspect>
</aop:config>
```

# 四、声明式事务

## 4.1 声明式事务概念

### 编程式事务

```java
Connection conn = ...;
try {
	// 开启事务：关闭事务的自动提交
	conn.setAutoCommit(false);
	// 核心操作
	// 提交事务
	conn.commit();
}catch(Exception e){
	// 回滚事务
	conn.rollBack();
}finally{
    // 释放数据库连接
	conn.close();
}
```

编程式的实现方式存在缺陷：

- 细节没有被屏蔽：具体操作过程中，所有细节都需要程序员自己来完成，比较繁琐。
- 代码复用性不高：如果没有有效抽取出来，每次实现功能都需要自己编写代码，代码就没有得到复用。

### 声明式事务

既然事务控制的代码有规律可循，代码的结构基本是确定的，所以框架就可以将固定模式的代码抽取出来，进行相关的封装。
封装起来后，我们只需要在配置文件中进行简单的配置即可完成操作。

- 好处1：提高开发效率
- 好处2：消除了冗余的代码
- 好处3：框架会综合考虑相关领域中在实际开发环境下有可能遇到的各种问题，进行了健壮性、性能等各个方面的优化

总结：

- 编程式：自己写代码实现功能
- 声明式：通过配置让框架实现功能

## 4.2 基于注解的声明式事务

1. 准备

   ```xml
   <dependencies>
   	<!-- 基于Maven依赖传递性，导入spring-context依赖即可导入当前所需所有jar包 -->
   	<dependency>
   		<groupId>org.springframework</groupId>
   		<artifactId>spring-context</artifactId>
   		<version>5.3.1</version>
   	</dependency>
   	<!-- Spring 持久化层支持jar包 -->
   	<!-- Spring 在执行持久化层操作、与持久化层技术进行整合过程中，需要使用orm、jdbc、tx三个
   	jar包 -->
   	<!-- 导入 orm 包就可以通过 Maven 的依赖传递性把其他两个也导入 -->
   	<dependency>
   		<groupId>org.springframework</groupId>
   		<artifactId>spring-orm</artifactId>
   		<version>5.3.1</version>
   	</dependency>
   	<!-- Spring 测试相关 -->
   	<dependency>
   		<groupId>org.springframework</groupId>
   		<artifactId>spring-test</artifactId>
   		<version>5.3.1</version>
   	</dependency>
   	<!-- junit测试 -->
   	<dependency>
   		<groupId>junit</groupId>
   		<artifactId>junit</artifactId>
   		<version>4.12</version>
   		<scope>test</scope>
   	</dependency>
   	<!-- MySQL驱动 -->
   	<dependency>
   		<groupId>mysql</groupId>
   		<artifactId>mysql-connector-java</artifactId>
   		<version>8.0.16</version>
   	</dependency>
   	<!-- 数据源 -->
   	<dependency>
   		<groupId>com.alibaba</groupId>
   		<artifactId>druid</artifactId>
   		<version>1.0.31</version>
   	</dependency>
   </dependencies>
   ```

2. 创建jdbc.properties

3. 配置Spring的配置文件

   ```xml
   <!--扫描组件-->
   <context:component-scan base-package="com.atguigu.spring.tx.annotation">
   </context:component-scan>
   <!-- 导入外部属性文件 -->
   <context:property-placeholder location="classpath:jdbc.properties" />
   <!-- 配置数据源 -->
   <bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
   	<property name="url" value="${jdbc.url}"/>
   	<property name="driverClassName" value="${jdbc.driver}"/>
   	<property name="username" value="${jdbc.username}"/>
   	<property name="password" value="${jdbc.password}"/>
   </bean>
   <!-- 配置 JdbcTemplate -->
   <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
   	<!-- 装配数据源 -->
   	<property name="dataSource" ref="druidDataSource"/>
   </bean>
   ```

4. 添加事务配置

   ```xml
   <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
   	<property name="dataSource" ref="dataSource"></property>
   </bean>
   <!--
   	开启事务的注解驱动
   	通过注解@Transactional所标识的方法或标识的类中所有的方法，都会被事务管理器管理事务
   -->
   <!-- 
   	transaction-manager属性的默认值是transactionManager，如果事务管理器bean的id正好就是这个默认值，则可以省略这个属性 
   	导入的名称空间需要 tx 结尾的那个。
   -->
   <tx:annotation-driven transaction-manager="transactionManager" />
   ```

5. 添加事务注解

   添加注解@Transactional

   @Transactional标识在方法上，只会影响该方法
   @Transactional标识的类上，会影响类中所有的方法

### 只读

1. 对一个查询操作来说，如果我们把它设置成只读，就能够明确告诉数据库，这个操作不涉及写操作。这样数据库就能够针对查询操作来进行优化。

2. 使用方式

   ```java
   @Transactional(readOnly = true)
   ```

3. 注意

   对增删改操作设置只读会抛出下面异常：
   Caused by: java.sql.SQLException: Connection is read-only. Queries leading to data modificationare not allowed

### 超时

1. 概括来说就是一句话：超时回滚，释放资源。

2. 使用

   ```java
   @Transactional(timeout = 3)
   ```

3. 抛出异常

   org.springframework.transaction.TransactionTimedOutException: Transaction timed out:
   deadline was Fri Jun 04 16:25:39 CST 2022

### 回滚策略

1. 声明式事务默认只针对运行时异常回滚，编译时异常不回滚。
   可以通过@Transactional中相关属性设置回滚策略
   rollbackFor属性：需要设置一个Class类型的对象
   rollbackForClassName属性：需要设置一个字符串类型的全类名
   noRollbackFor属性：需要设置一个Class类型的对象
   rollbackFor属性：需要设置一个字符串类型的全类名

2. 使用方式

   ```java
   @Transactional(noRollbackFor = ArithmeticException.class)
   ```

### 事务隔离级别

```java
@Transactional(isolation = Isolation.DEFAULT)//使用数据库默认的隔离级别
@Transactional(isolation = Isolation.READ_UNCOMMITTED)//读未提交
@Transactional(isolation = Isolation.READ_COMMITTED)//读已提交
@Transactional(isolation = Isolation.REPEATABLE_READ)//可重复读
@Transactional(isolation = Isolation.SERIALIZABLE)//串行化
```

### 事务传播行为

可以通过@Transactional中的propagation属性设置事务传播行为。

@Transactional(propagation = Propagation.REQUIRED)，默认情况，表示如果当前线程上有已经开
启的事务可用，那么就在这个事务中运行。

@Transactional(propagation = Propagation.REQUIRES_NEW)，表示不管当前线程上是否有已经开启
的事务，都要开启新事务

## 4.3 基于XML的声明式事务

将Spring配置文件中去掉tx:annotation-driven 标签，并添加配置：

```xml
<aop:config>
<!-- 配置事务通知和切入点表达式 -->
<aop:advisor advice-ref="txAdvice" pointcut="execution(*com.atguigu.spring.tx.xml.service.impl.*.*(..))"></aop:advisor>
</aop:config>
<!-- tx:advice标签：配置事务通知 -->
<!-- id属性：给事务通知标签设置唯一标识，便于引用 -->
<!-- transaction-manager属性：关联事务管理器 -->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
<tx:attributes>
<!-- tx:method标签：配置具体的事务方法 -->
<!-- name属性：指定方法名，可以使用星号代表多个字符 -->
<tx:method name="get*" read-only="true"/>
<tx:method name="query*" read-only="true"/>
<tx:method name="find*" read-only="true"/>
<!-- read-only属性：设置只读属性 -->
<!-- rollback-for属性：设置回滚的异常 -->
<!-- no-rollback-for属性：设置不回滚的异常 -->
<!-- isolation属性：设置事务的隔离级别 -->
<!-- timeout属性：设置事务的超时属性 -->
<!-- propagation属性：设置事务的传播行为 -->
<tx:method name="save*" read-only="false" rollbackfor="java.lang.Exception" propagation="REQUIRES_NEW"/>
<tx:method name="update*" read-only="false" rollbackfor="java.lang.Exception" propagation="REQUIRES_NEW"/>
<tx:method name="delete*" read-only="false" rollbackfor="java.lang.Exception" propagation="REQUIRES_NEW"/>
</tx:attributes>
</tx:advice>
```

**注意**：基于xml实现的声明式事务，必须引入aspectJ的依赖

```xml
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-aspects</artifactId>
	<version>5.3.1</version>
</dependency>
```

