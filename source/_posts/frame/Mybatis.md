---
title: Mybatis
date: 2022-11-14
description: 第二次学习Mybatis，过去学完以后，笔记没有做，这次既复习顺便做一下笔记
keywords: Mybatis
cover: https://img.yublog.top/img/202210311034957.jpg
top_img: https://img.yublog.top/img/202210311034957.jpg
tags: 
	- java
	- 框架
	- Mybatis
categories: Java-框架相关
---



# 一、MyBatis简介

## 1.1 MyBatis历史

MyBatis最初是Apache的一个开源项目iBatis， 2010年6月这个项目由Apache Software Foundation迁移到了Google Code。随着开发团队转投Google Code旗下， iBatis3.x正式更名为MyBatis。代码于2013年11月迁移到Github。iBatis一词来源于“internet”和“abatis”的组合，是一个基于Java的持久层框架。 iBatis提供的持久层框架包括SQL Maps和Data Access Objects（DAO）。

## 1.2 MyBatis的特性

1. MyBatis 是支持定制化 SQL、存储过程以及高级映射的优秀的持久层框架
2. MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集
3. MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO（Plain Old Java
   Objects，普通的Java对象）映射成数据库中的记录
4. MyBatis 是一个 半自动的ORM（Object Relation Mapping）框架

## 1.3 MyBatis下载

MyBatis下载地址：https://github.com/mybatis/mybatis-3

## 1.4 和其它持久化层技术对比
1. JDBC
   - SQL 夹杂在Java代码中耦合度高，导致硬编码内伤
   - 维护不易且实际开发需求中 SQL 有变化，频繁修改的情况多见
   - 代码冗长，开发效率低
2. Hibernate 和 JPA
   - 操作简便，开发效率高
   - 程序中的长难复杂 SQL 需要绕过框架
   - 内部自动生产的 SQL，不容易做特殊优化
   - 基于全映射的全自动框架，大量字段的 POJO 进行部分映射时比较困难
   - 反射操作太多，导致数据库性能下降
3. MyBatis
   - 轻量级，性能出色
   - SQL 和 Java 编码分开，功能边界清晰。Java代码专注业务、SQL语句专注数据
   - 开发效率稍逊于HIbernate，但是完全能够接受

## 1.5 环境搭建

1. 创建maven项目

2. 导入maven依赖

   ```xml
   <!--修改打包方式-->
   <packaging>jar</packaging> 
   <!--导入依赖-->
   <dependencies>
       <!-- Mybatis核心 -->
       <dependency>
           <groupId>org.mybatis</groupId>
           <artifactId>mybatis</artifactId>
           <version>3.5.11</version>
       </dependency>
       <!-- junit测试 -->
       <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>4.13.2</version>
           <scope>test</scope>
       </dependency>
       <!-- MySQL驱动 -->
       <dependency>
           <groupId>mysql</groupId>
           <artifactId>mysql-connector-java</artifactId>
           <version>5.1.49</version>
       </dependency>
   </dependencies>
   ```

3. 创建MyBatis核心配置文件

   - 命名为mybatis-config.xml
   - 核心配置文件主要用于配置连接数据库的环境以及MyBatis的全局配置信息
   - 核心配置文件存放的位置是src/main/resources目录下

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE configuration
           PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
           "https://mybatis.org/dtd/mybatis-3-config.dtd">
   
   <configuration>
   
       <environments default="development">
           <environment id="development">
               <transactionManager type="JDBC"/>
               <dataSource type="POOLED">
                   <property name="driver" value="com.mysql.jdbc.Driver"/>
                   <property name="url" value="jdbc:mysql://localhost:3306/db_ssm?characterEncoding=utf8&amp;serverTimezone=Asia/Shanghai&amp;useSSL=false"/>
                   <property name="username" value="root"/>
                   <property name="password" value="123"/>
               </dataSource>
           </environment>
       </environments>
       <mappers>
           <mapper resource="Mapper/UserMapper.xml"/>
       </mappers>
   </configuration>
   ```

4. 创建Mapper接口

   ```java
   package com.Mybatis.mapper;
   
   public interface UserMapper {
       int insertUser();
   }
   ```

5. 创建MyBatis的映射文件

   ORM（Object Relationship Mapping）对象关系映射。

   - 对象：Java的实体类对象
   - 关系：关系型数据库
   - 映射：二者之间的对应关系

   > 1、映射文件的命名规则：
   > 表所对应的实体类的类名+Mapper.xml
   > 例如：表t_user，映射的实体类为User，所对应的映射文件为UserMapper.xml
   > 因此一个映射文件对应一个实体类，对应一张表的操作
   > MyBatis映射文件用于编写SQL，访问以及操作表中的数据
   > MyBatis映射文件存放的位置是src/main/resources/mappers目录下
   > 2、 MyBatis中可以面向接口操作数据，要保证两个一致：
   > a）mapper接口的全类名和映射文件的命名空间（namespace）保持一致
   > b）mapper接口中方法的方法名和映射文件中编写SQL的标签的id属性保持一致

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE mapper
           PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
           "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
   
   <mapper namespace="com.Mybatis.mapper.UserMapper">
   
       <!--  int insertUser();  -->
       <insert id="insertUser">
           insert into tb_user
           values (null, 'admin', '123', '18', '女', '123@qq.com')
       </insert>
   
   </mapper>
   ```

## 1.6 通过Junit测试

测试步骤

1. 读取Mybatis的核心配置文件
2. 创建sqlSessionFactoryBuilder对象
3. 通过核心配置文件所对应的字节输入流创建SqlSessionFactory，产生SqlSession对象
4. // 通过代理模式创建UserMapper接口的代理实现类对象
5. 调用UserMapper接口中的方法，就可以根据UserMapper的全类名匹配元素文件，通过调用的方法名匹配映射文件中的SQL标签并执行标签中的SQL语句
6. 开启提交事务sqlSession.commit()或则在创建Session对象是传入true参数

   ```java
   public void insertTest() throws IOException {
           // 读取Mybatis的核心配置文件
           InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
           // 创建sqlSessionFactoryBuilder对象
           SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
           // 通过核心配置文件所对应的字节输入流创建SqlSessionFactory，产生SqlSession对象
           SqlSessionFactory sessionFactory = sqlSessionFactoryBuilder.build(inputStream);
           SqlSession sqlSession = sessionFactory.openSession(true);
           // 通过代理模式创建UserMapper接口的代理实现类对象
           UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
           // 调用UserMapper接口中的方法，就可以根据UserMapper的全类名匹配元素文件，通过调用的方法名匹配映射文件中的SQL标签并执行标签中的SQL语句
           int result = userMapper.insertUser();
           //  sqlSession.commit();
           System.out.println("结果" + result);
           sqlSession.close();
   
       }
   ```

## 1.7 加入Log4j日志

1. 导入依赖

   ```xml
   <!-- log4j日志 -->
   <dependency>
       <groupId>log4j</groupId>
       <artifactId>log4j</artifactId>
       <version>1.2.17</version>
   </dependency>
   ```

2. 加入log4j的配置文件

   > log4j的配置文件名为log4j.xml，存放的位置是src/main/resources目录下
   >
   > 日志的级别
   > FATAL(致命)>ERROR(错误)>WARN(警告)>INFO(信息)>DEBUG(调试)
   > 从左到右打印的内容越来越详细

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
   <log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
       <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
           <param name="Encoding" value="UTF-8"/>
           <layout class="org.apache.log4j.PatternLayout">
               <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS}
   %m (%F:%L) \n"/>
           </layout>
       </appender>
       <logger name="java.sql">
           <level value="debug"/>
       </logger>
       <logger name="org.apache.ibatis">
           <level value="info"/>
       </logger>
       <root>
           <level value="debug"/>
           <appender-ref ref="STDOUT"/>
       </root>
   </log4j:configuration>
   ```

# 二、 Mybatis的CRUD测试

## 2.1 增

Mapper接口

```java
int insertUser();
```

Mapper映射

```xml
<!--  int insertUser();  -->
<insert id="insertUser">
    insert into tb_user
    values (null, 'admin', '123', '18', '女', '123@qq.com')
</insert>
```

Test测试

```java
public void insertTest(){
        SqlSession sqlSession = GetSqlSession.getSqlSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        int result = userMapper.insertUser();
        System.out.println("结果" + result);
        sqlSession.close();
}
```

## 2.2 删
Mapper接口

```java
int deleteUser();
```

Mapper映射

```xml
<!--int deleteUser();-->
<delete id="deleteUser">
    delete from tb_user where id = 4
</delete>
```

Test测试

```java
@Test
public void deleteTest(){
    SqlSession sqlSession = GetSqlSession.getSqlSession();
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    int result = userMapper.deleteUser();
    System.out.println("结果" + result);
    sqlSession.close();
}
```

## 2.3 改
Mapper接口

```java
int updateUser();
```

Mapper映射

```xml
<!--int updateUser();-->
<update id="updateUser">
    update tb_user set username = 'root', password = '521' where id = 4
</update>
```

Test测试

```java
@Test
public void updateTest(){
    SqlSession sqlSession = GetSqlSession.getSqlSession();
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    int result = userMapper.updateUser();
    System.out.println("结果" + result);
    sqlSession.close();
}
```

## 2.4 查

> **注意：**
> 查询的标签select必须设置属性resultType或resultMap，用于设置实体类和数据库表的映射
> **关系**
> resultType：自动映射，用于属性名和表中字段名一致的情况
> resultMap：自定义映射，用于一对多或多对一或字段名和属性名不一致的情况

### 查一个实体类对象
Mapper接口

```java
User selectUserById();
```

Mapper映射

```xml
<!--User selectUserById();-->
<select id="selectUserById" resultType="com.Mybatis.pojo.User">
    select * from tb_user where id = 5
</select>
```

Test测试

```java
@Test
public void selectUserByIdTest(){
    SqlSession sqlSession = GetSqlSession.getSqlSession();
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    User user = userMapper.selectUserById();
    System.out.println("结果" + user);
    sqlSession.close();
}
```

### 查一个List集合
Mapper接口

```java
List<User> selectUserList();
```

Mapper映射

```xml
<!--List<User> selectUserList();-->
<select id="selectUserList" resultType="com.Mybatis.pojo.User">
    select * from tb_user
</select>
```

Test测试

```java
@Test
public void selectUserListTest(){
    SqlSession sqlSession = GetSqlSession.getSqlSession();
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    List<User> users = userMapper.selectUserList();
    users.forEach(System.out::println);
    sqlSession.close();
}
```

# 三、核心配置文件详解

> MyBatis核心配置文件中，标签的顺序：
> properties?,settings?,typeAliases?,typeHandlers?,objectFactory?,objectWrapperFactory?,reflectorFactory?,plugins?,environments?,databaseIdProvider?,mappers?

## 3.1 environments

1. environments:：配置多个连接数据库的环境

   - 属性：

     default：设置使用的环境的id

2. environment：配置莫格具体的环境

   - 属性

     id：表示连接数据库的环境的唯一标识，不能重复

3. transactionManager：设置事务管理方式

   - 属性

     type = "JDBC|MANAGED"

     JDBC：表示当前环境中，执行SQL时，使用的是JDBC中原生的事务管理方式，事务的提交或回滚需要手动处理
     MANAGED：被管理，例如Spring

4. dataSource：配置数据源

   - 属性：
     type：设置数据源的类型
     type="POOLED|UNPOOLED|JNDI"
     POOLED：表示使用数据库连接池缓存数据库连接
     UNPOOLED：表示不使用数据库连接池
     JNDI：表示使用上下文中的数据源

5. property

   - 设置连接数据库的驱动 driver
   - 设置连接数据库的连接地址 url
   - 设置连接数据库的用户名 username
   - 设置连接数据库的密码 password

## 3.2 properties

1. 创建properties文件

   ```properties
   jdbc.driver = com.mysql.jdbc.Driver
   jdbc.url = jdbc:mysql://localhost:3306/db_ssm?characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false
   jdbc.username = root
   jdbc.password = 123
   ```

2. 在mybatis-config中配置

   ```xml
   <!--导入properties配置文件-->
   <properties resource="jdbc.properties"/>
   <!--使用${}的方式进行配置-->
   <environments default="development">
           <environment id="development">
               <transactionManager type="JDBC"/>
               <dataSource type="POOLED">
                   <property name="driver" value="${jdbc.driver}"/>
                   <property name="url" value="${jdbc.url}"/>
                   <property name="username" value="${jdbc.username}"/>
                   <property name="password" value="${jdbc.password}"/>
               </dataSource>
           </environment>
   </environments>
   ```

## 3.3 typeAliases

设置类型别名

1. 起名

   ```xml
   <!--
   	typeAlias：设置某个类型的别名
   		属性：
   		type：设置需要设置别名的类型
   		alias：设置某个类型的别名，若不设置该属性，那么该类型拥有默认的别名，即类名且不区分大小写
   -->
   <typeAlias type="com.Mybatis.pojo.User" alias="abc"/>
   ```

2. 使用默认类名

   ```xml
   <!--使用默认的名称做类名 user或者User 不区分大小写-->
   <typeAlias type="com.Mybatis.pojo.User"/>
   ```

3. 以包为单位引入（**常用**）

   ```xml
   <!--以包为单位，将包下所有的类型设置默认的类型别名，即类名且不区分大小写-->
   <package name="com.Mybatis.pojo"/>
   ```

## 3.4 mappers

引入映射文件

1. 单个引用

   ```xml
   <mapper resource="Mapper/UserMapper.xml"/>
   ```

2. 以包为单位引入映射文件

   > **注意**
   > 1、mapper接口所在的包要和映射文件所在的包一致
   > 2、mapper接口要和映射文件的名字一致

   ```xml
   <package name="com.Mybatis.mapper"/>
   ```

## 3.5 配置mybatis-config.xml模板

File	->	Settings	->	Editor	->	File and Code Templates

# 四、MyBatis获取参数值的两种方式

> MyBatis获取参数值的两种方式：${}和#{}
> 
> ${}的本质就是字符串拼接，#{}的本质就是占位符赋值
> ${}使用字符串拼接的方式拼接sql，若为字符串类型或日期类型的字段进行赋值时，需要手动加引号；但是#{}使用占位符赋值的方式拼接sql，此时为字符串类型或日期类型的字段进行赋值时，可以自动添加单引号

## 4.1 单个字面量类型的参数

若mapper接口中的方法参数为单个的字面量类型，此时可以使用${}和#{}以任意的名称获取参数的值，注意${}需要手动加单引号

## 4.2 多个字面量类型的参数

若mapper接口中的方法参数为多个时，此时MyBatis会自动将这些参数放在一个map集合中，以arg0,arg1...为键，以参数为值；以param1,param2...为键，以参数为值；因此只需要通过${}和#{}访问map集合的键就可以获取相对应的值，注意${}需要手动加单引号

## 4.3 map集合类型的参数

若mapper接口中的方法需要的参数为多个时，此时可以手动创建map集合，将这些数据放在map中。只需要通过${}和#{}访问map集合的键就可以获取相对应的值，注意${}需要手动加单引号

## 4.4 实体类类型的参数

若mapper接口中的方法参数为实体类对象时，此时可以使用${}和#{}，通过访问实体类对象中的属性名获取属性值，注意${}需要手动加单引号

## 4.5 使用@Param标识参数

可以通过@Param注解标识mapper接口中的方法参数。此时，会将这些参数放在map集合中，以@Param注解的value属性值为键，以参数为值；以param1,param2...为键，以参数为值；只需要通过${}和#{}访问map集合的键就可以获取相对应
的值，注意${}需要手动加单引号

# 五、MyBatis的各种查询功能

## 5.1 查询一个实体类对象

```java
User selectUserById();
```

```xml
<select id="selectUserById" resultType="com.Mybatis.pojo.User">
    select * from tb_user where id = #{id}
</select>
```

## 5.2 查询一个list集合

> 当查询的数据为多条时，不能使用实体类作为返回值，否则会抛出异常
> TooManyResultsException；但是若查询的数据只有一条，可以使用实体类或集合作为返回值

```java
List<User> selectUserList();
```

```xml
<select id="selectUserList" resultType="User">
    select * from tb_user
</select>
```

## 5.3 查询单个数据

```java
int selectUserCount();
```

```xml
<select id="selectUserCount" resultType="Int">
    select count(*) from tb_user
</select>
```

## 5.4 查询一条数据为map集合

```java
Map<String, Object> selectUserToMap(@Param("id") int id);
```

```xml
<select id="selectUserToMap" resultType="Map">
    select * from tb_user where id = #{id}
</select>
```

## 5.5 查询多条数据为map集合

### 结果封装到List中

```java
List<Map<String, Object>> selectUserToList();
```

```xml
<select id="selectUserToList" resultType="Map">
    select * from tb_user
</select>
```

### 结果封装到Map中

```java
@MapKey("id")
Map<String, Object> selectUserToMaps();
```

```xml
<select id="selectUserToMaps" resultType="Map">
    select * from tb_user
</select>
```

# 六、特殊的SQL

## 6.1 模糊查询

1. ```sql
   select * from tb_user where username like '%${mohu}%'
   ```

2. ```sql
   select * from tb_user where username like concat('%',#{mohu},'%')
   ```

3. ```sql
   select * from tb_user where username like "%"#{mohu}"%"
   ```

## 6.2 批量删除

1. ```sql
   delete from tb_user where id in (${ids})
   ```

## 6.3 动态设置表名

1. ```sql
   select * from ${tableName}
   ```

## 6.4 添加功能获取自增的主键

> useGeneratedKeys：设置使用自增的主键
> keyProperty：因为增删改有统一的返回值是受影响的行数，因此只能将获取的自增的主键放在传输的参
> 数user对象的某个属性中

```java
int insertUser(User user);
```

```xml
<insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
	insert into tb_user values(null,#{username},#{password},#{age},#{sex})
</insert>
```

# 七、自定义映射resultMap

## 7.1 resultMap处理字段和属性的映射关系

> 若字段名和实体类中的属性名不一致，则可以通过resultMap设置自定义映射
>
> 字段名符合数据库的规则（使用\_），实体类中的属性名符合Java的规则（使用驼峰）此时也可通过以下两种方式处理字段名和实体类中的属性的映射关系
> a）可以通过为字段起别名的方式，保证和实体类中的属性名保持一致
> b）可以在MyBatis的核心配置文件中设置一个全局配置信息mapUnderscoreToCamelCase，可
> 以在查询表中数据时，自动将_类型的字段名转换为驼峰

resultMap：设置自定义映射

- 属性：
  			id：表示自定义映射的唯一标识
    			type：查询的数据要映射的实体类的类型
- 子标签：
  			id：设置主键的映射关系
    			result：设置普通字段的映射关系
    			association：设置多对一的映射关系
    			collection：设置一对多的映射关系
- 属性：
  				property：设置映射关系中实体类中的属性名
        				column：设置映射关系中表中的字段名

```xml
<resultMap id="userMap" type="User">
	<id property="id" column="id"></id>
	<result property="userName" column="user_name"></result>
	<result property="password" column="password"></result>
	<result property="age" column="age"></result>
	<result property="sex" column="sex"></result>
</resultMap>

<select id="testMohu" resultMap="userMap">
	select * from td_user where username like '%${mohu}%
</select>
```

MyBatis的核心配置文件中设置一个全局配置信息mapUnderscoreToCamelCase

```xml
<settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
```

## 7.2 多对一映射处理

1. 级联方式处理映射关系

   ```xml
   <resultMap id="empDeptMap" type="Emp">
   	<id column="eid" property="eid"></id>
   	<result column="ename" property="ename"></result>
   	<result column="age" property="age"></result>
   	<result column="sex" property="sex"></result>
   	<result column="did" property="dept.did"></result>
   	<result column="dname" property="dept.dname"></result>
   </resultMap>
   <!--Emp getEmpAndDeptByEid(@Param("eid") int eid);-->
   <select id="getEmpAndDeptByEid" resultMap="empDeptMap">
   	select emp.*,dept.* from t_emp emp 
       left join t_dept dept 
       on emp.did = dept.did 
       where emp.eid = #{eid}
   </select>
   ```

2. 使用association处理映射关系

   ```xml
   <resultMap id="empDeptMap" type="Emp">
   	<id column="eid" property="eid"></id>
   	<result column="ename" property="ename"></result>
   	<result column="age" property="age"></result>
   	<result column="sex" property="sex"></result>
   	<association property="dept" javaType="Dept">
   		<id column="did" property="did"></id>
   		<result column="dname" property="dname"></result>
   	</association>
   </resultMap>
   <!--Emp getEmpAndDeptByEid(@Param("eid") int eid);-->
   <select id="getEmpAndDeptByEid" resultMap="empDeptMap">
   	select emp.*,dept.* from t_emp emp 
       left join t_dept dept 
       on emp.did =dept.did 
       where emp.eid = #{eid}
   </select>	
   ```

3. 分步查询

   ```xml
   <resultMap id="empDeptStepMap" type="Emp">
   	<id column="eid" property="eid"></id>
   	<result column="ename" property="ename"></result>
   	<result column="age" property="age"></result>
   	<result column="sex" property="sex"></result>
   	<!--
   		select：设置分步查询，查询某个属性的值的sql的标识（namespace.sqlId）
   		column：将sql以及查询结果中的某个字段设置为分步查询的条件
   	-->
   	<association property="dept"
   		select="com.mybatis.mapper.DeptMapper.getEmpDeptByStep" 
           column="did">
   	</association>
   </resultMap>
   
   <!--第一步-->
   <!--Emp getEmpByStep(@Param("eid") int eid);-->
   <select id="getEmpByStep" resultMap="empDeptStepMap">
   	select * from t_emp where eid = #{eid}
   </select>
   <!--第二步-->
   <!--Dept getEmpDeptByStep(@Param("did") int did);-->
   <select id="getEmpDeptByStep" resultType="Dept">
   	select * from t_dept where did = #{did}
   </select>
   ```

## 7.3 一对多映射处理

1. collection

   ```xml
   <resultMap id="deptEmpMap" type="Dept">
   	<id property="did" column="did"></id>
   	<result property="dname" column="dname"></result>
   	<!--
   		ofType：设置collection标签所处理的集合属性中存储数据的类型
   	-->
   	<collection property="emps" ofType="Emp">
   		<id property="eid" column="eid"></id>
   		<result property="ename" column="ename"></result>
   		<result property="age" column="age"></result>
   		<result property="sex" column="sex"></result>
   	</collection>
   </resultMap>
   <!--Dept getDeptEmpByDid(@Param("did") int did);-->
   <select id="getDeptEmpByDid" resultMap="deptEmpMap">
   	select dept.*,emp.* from t_dept dept 
       left join t_emp emp 
       on dept.did = emp.did 
       where dept.did = #{did}
   </select>
   ```

2. 分步查询

   ```xml
   <resultMap id="deptEmpStep" type="Dept">
   	<id property="did" column="did"></id>
   	<result property="dname" column="dname"></result>
   	<collection property="emps" fetchType="eager"
   		select="com.mybatis.mapper.EmpMapper.getEmpListByDid" 	
           column="did">
   	</collection>
   </resultMap>
   
   <!--第一步-->
   <!--Dept getDeptByStep(@Param("did") int did);-->
   <select id="getDeptByStep" resultMap="deptEmpStep">
   	select * from t_dept where did = #{did}
   </select>
   <!--第二步-->
   <!--List<Emp> getEmpListByDid(@Param("did") int did);-->
   <select id="getEmpListByDid" resultType="Emp">
   	select * from t_emp where did = #{did}
   </select>
   ```

## 7.4 分步查询的优点

> 可以实现延迟加载，但是必须在核心配置文件中设置全局配置信息：
>
> lazyLoadingEnabled：延迟加载的全局开关。当开启时，所有关联对象都会延迟加载。
> aggressiveLazyLoading：当开启时，任何方法的调用都会加载该对象的所有属性。否则，每个属性会按需加载。此时就可以实现按需加载，获取的数据是什么，就只会执行相应的sql。
> 
> 此时可通过association和collection中的fetchType属性设置当前的分步查询是否使用延迟加载， fetchType="lazy(延迟加载)|eager(立即加载)"

# 八、动态SQL

## 8.1 if标签

> if标签可通过test属性的表达式进行判断，若表达式的结果为true，则标签中的内容会执行；反之标签中的内容不会执行

```xml
<select id="getEmpListByMoreTJ" resultType="Emp">
	select * from t_emp where 1=1
	<if test="ename != '' and ename != null">
		and ename = #{ename}
	</if>
	<if test="age != '' and age != null">
		and age = #{age}
	</if>
	<if test="sex != '' and sex != null">
		and sex = #{sex}
	</if>
</select>
```

## 8.2 where标签

> where和if一般结合使用：
> a）若where标签中的if条件都不满足，则where标签没有任何功能，即不会添加where关键字
> b）若where标签中的if条件满足，则where标签会自动添加where关键字，并将条件最前方多余的
> and去掉
> **注意**：where标签不能去掉条件最后多余的and

```xml
<select id="getEmpListByMoreTJ2" resultType="Emp">
	select * from t_emp
	<where>
		<if test="ename != '' and ename != null">
			ename = #{ename}
		</if>
		<if test="age != '' and age != null">
			and age = #{age}
		</if>
		<if test="sex != '' and sex != null">
			and sex = #{sex}
		</if>
	</where>
</select>
```

## 8.3 trim标签

>trim用于去掉或添加标签中的内容
>常用属性：
>prefix：在trim标签中的内容的**前面添加**某些内容
>prefixOverrides：在trim标签中的内容的**前面去掉**某些内容
>suffix：在trim标签中的内容的**后面添加**某些内容
>suffixOverrides：在trim标签中的内容的**后面去掉**某些内容

```xml
<select id="getEmpListByMoreTJ" resultType="Emp">
	select * from t_emp
	<trim prefix="where" suffixOverrides="and">
		<if test="ename != '' and ename != null">
    		ename = #{ename} and
		</if>
		<if test="age != '' and age != null">
			age = #{age} and
		</if>
		<if test="sex != '' and sex != null">
			sex = #{sex}
		</if>
	</trim>
</select>
```

## 8.4 choose、when、otherwise标签

> choose、when、 otherwise相当于if...else if..else

```xml
<select id="getEmpListByChoose" resultType="Emp">
	select <include refid="empColumns"></include> from t_emp
	<where>
		<choose>
			<when test="ename != '' and ename != null">
				ename = #{ename}
			</when>
			<when test="age != '' and age != null">
				age = #{age}
			</when>
			<when test="sex != '' and sex != null">
				sex = #{sex}
			</when>
			<when test="email != '' and email != null">
				email = #{email}
			</when>
		</choose>
	</where>
</select>
```

## 8.5 foreach标签

```xml
<!--批量插入-->
<insert id="insertMoreEmp">
	insert into t_emp values
	<foreach collection="emps" item="emp" separator=",">
		(null,#{emp.ename},#{emp.age},#{emp.sex},#{emp.email},null)
	</foreach>
</insert>
<!--批量删除-->
<delete id="deleteMoreByArray">
	delete from t_emp where
	<foreach collection="eids" item="eid" separator="or">
		eid = #{eid}
	</foreach>
</delete>
<!--批量删除-->	
<delete id="deleteMoreByArray">
	delete from t_emp where eid in
	<foreach collection="eids" item="eid" separator="," open="(" close=")">
	    #{eid}
	</foreach>
</delete>
```

## 8.6 sql片段

> sql片段，可以记录一段公共sql片段，在使用的地方通过include标签进行引入

```xml
<sql id="empColumns">
	eid,ename,age,sex,did
</sql>

select <include refid="empColumns"></include> from t_emp
```

# 九、Mybatis的缓存

# 十、Mybatis的逆向工程

# 十一、分页插件
