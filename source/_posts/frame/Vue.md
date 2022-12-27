---
title: Vue
date: 2022-11-21
description: Vue前端很重要的框架，第一次学，计划一周结束。
keywords: Vue
cover: https://img.yublog.top/img/202211182216328.jpg
top_img: https://img.yublog.top/img/202211182216328.jpg
tags: 
	- 前端
	- 框架
	- Vue
categories: 前端-框架相关
---

# 一、Vue核心

## 1.1 Vue简介

> 官方 Vue 作者：尤雨溪
>
> vue2 https://v2.cn.vuejs.org/
>
> vue3 https://cn.vuejs.org/
>
> 动态构建用户界面的渐进式JavaScript 框架
>
> 借鉴Angular 的**模板**和**数据绑定**技术，借鉴React 的**组件化**和**虚拟DOM** 技术

特点：

1. 遵循MVVM 模式
2. 编码简洁, 体积小, 运行效率高, 适合移动/PC 端开发
3. 它本身只关注UI, 也可以引入其它第三方库开发项目

## 1.2 快速入门

1. 引入vue
2. 准备一个容器
3. 创建Vue实例，传入配置
4. el：指定容器
   - new Vue时候配置el属性
   - 先创建Vue实例，随后再通过```vm.$mount('#root')```指定el的值
5. data：存储数据
   - 对象式
   - 函数式
6. 在```{{XXX}}```中写JS表达式

```javascript
new Vue({
	el:'#demo', 
	data:{ 
		name:'atguigu',
		address:'北京'
	}
})
```

## 1.3 模板语法

1. **插值语法**

   功能：用于解析标签体内容
   写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性

2. **指令语法**

   功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）
   指令以v-开头

## 1.4 数据绑定

1. 单向数据绑定

   语法：```v-bind:href ="xxx"``` 或简写为```:href```

   特点：数据只能从data 流向页面

2. 双向数据绑定

   语法：```v-mode:value="xxx"``` 或简写为```v-model="xxx"```

   特点：数据不仅能从data 流向页面，还能从页面流向data

## 1.5 MVVM 模型

1. M：模型(Model) ：对应data 中的数据
2. V：视图(View) ：模板
3. VM：视图模型(ViewModel) ： Vue 实例对象

![](https://img.yublog.top/img/202211220805786.png)

## 1.6 事件处理

### 事件绑定

1. 使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名
2. 事件的回调需要配置在methods对象中，最终会在vm上
3. methods中配置的函数，不要用箭头函数！否则this就不是vm了
4. methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象
5. @click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参

### Vue事件修饰符

1. prevent：阻止默认事件（常用）；
2. stop：阻止事件冒泡（常用）；
3. once：事件只触发一次（常用）；
4. capture：使用事件的捕获模式；
5. self：只有event.target是当前操作的元素时才触发事件；
6. passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

### 键盘事件

1. Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
2. 绑定事件举例```v-on:keydown.按键```或```@keydown.按键```

## 1.7 计算属性

1. 定义：要用的属性不存在，要通过已有属性计算得来
2. 底层借助了Objcet.defineproperty方法提供的getter和setter
3. 使用：配置computed

## 1.8 监视属性

1. 监视的两种写法
   - new Vue时传入watch配置
   - 通过vm.$watch监视
2. 深度监视
   - Vue中的watch默认不监测对象内部值的改变（一层）
   - 配置deep:true可以监测对象内部值改变（多层）

## 1.9 样式绑定

### class样式

1. 写法```:class="xxx" ```xxx可以是字符串、对象、数组
   - 字符串写法适用于：类名不确定，要动态获取。
   - 对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
   - 数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用

### style样式

1. ```:style="{fontSize: xxx}"```其中xxx是动态值
2. ```:style="[a,b]"```其中a、b是样式对象

## 1.10 条件渲染

### v-if

1. 写法
   - v-if="表达式" 
   - v-else-if="表达式"
   - v-else="表达式"
2. 适用于：切换频率较低的场景
3. 特点：不展示的DOM元素直接被移除

### v-show

1. 写法

   v-show="表达式"

2. 适用于：切换频率较高的场景

3. 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

> **注意**：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到

## 1.11 列表渲染

### 列表显示指令

v-for指令:

1. 用于展示列表数据
2. 语法：v-for="(item, index) in xxx" :key="yyy"
3. 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

### Vue中的Key

面试题：react、vue中的key有什么作用？（key的内部原理）

> 1. 虚拟DOM中key的作用
>   key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
> 2. 对比规则：
>
>   - 旧虚拟DOM中找到了与新虚拟DOM相同的key：
>     ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
>     ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
>   - 旧虚拟DOM中未找到与新虚拟DOM相同的key
>     创建新的真实DOM，随后渲染到到页面。
> 3. 用index作为key可能会引发的问题
>     - 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
>       会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
>     - 如果结构中还包含输入类的DOM：
>       会产生错误DOM更新 ==> 界面有问题。
> 4. 开发中如何选择key?:
>       - 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
>       - 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

### Vue监视数据的原理

1. vue会监视data中所有层次的数据

2. 如何监测对象中的数据

   通过setter实现监视，且要在new Vue时就传入要监测的数据

   - 对象中后追加的属性，Vue默认不做响应式处理

   - 如需给后添加的属性做响应式，使用API

     ```
     Vue.set(target，propertyName/index，value)
     vm.$set(target，propertyName/index，value)
     ```

3. 如何监测数组中的数据

   通过包裹数组更新元素的方法实现，本质就是做了两件事

   - 调用原生对应的方法对数组进行更新
   - 重新解析模板，进而更新页面

4. 在Vue修改数组中的某个元素一定要用如下方法

   - 使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
   - Vue.set() 或 vm.$set()

> **注意**：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性

## 1.12 收集表单数据

1. ```input text```用```v-model```获取value
2. ```input radio```用```v-model```获取value
3. ```input checkbox```用```v-model```
   - 初始值是数组可以收集多选框
   - 初始值是非数组可以收集true或false
4. v-model的三个修饰符
   - lazy：失去焦点再收集数据
   - number：输入字符串为有效数字，一般和```type="number"```连用
   - trim：去掉首尾空格

## 1.13 过滤器

1. 定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）

2. 语法

   - 注册过滤器```Vue.filter(name,callback) 或 new Vue{filters:{}}```

   - 使用过滤器

     ```{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"```

3. 注意

   - 可以串联过滤
   - 过滤没有改变原来的数据，而是产生了新的数据

## 1.14 内置指令

1. v-text : 更新元素的textContent
2. v-html : 更新元素的innerHTML **有安全问题**
3. v-if : 如果为true, 当前标签才会输出到页面
4. v-else: 如果为false, 当前标签才会输出到页面
5. v-show : 通过控制display 样式来控制显示/隐藏
6. v-for : 遍历数组/对象
7. v-on : 绑定事件监听, 一般简写为@
8. v-bind : 绑定解析表达式, 可以省略v-bind
9. v-model : 双向数据绑定
10. v-cloak : 防止闪现, 与css 配合: [v-cloak] { display: none }
11. v-once：只渲染一次
12. v-pre：跳过节点编译过程，可以加快编译速度

## 1.15 自定义指令

1. 语法

   - 局部指令

     ```javascript
     new Vue({
     	directives:{
             指令名:配置对象
         }
     })
     
     new Vue({
     	directives{指令名:回调函数}
     })
     ```

   - 全局指令

     ```javascript
     Vue.directive(指令名,配置对象)
     Vue.directive(指令名,回调函数)
     ```

2. 配置对象中的常用的3个回调

   - bind：指令与元素成功绑定时调用。
   - inserted：指令所在元素被插入页面时调用。
   - update：指令所在模板结构被重新解析时调用。

3. 注意

   - 指令定义时不加v-，但使用时要加v-；
   - 指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。配置对象，记得加引号

## 1.16 生命周期

![](https://img.yublog.top/img/202211221545461.png)

# 二、Vue脚手架

> 文档：https://cli.vuejs.org/zh/

## 2.1 脚手架目录结构

├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README . md: 应用描述文件
├── package-lock.json：包版本控制文件

## 2.2 不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
    - vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
    - vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

## 2.3 vue.config.js配置文件

1. 使用```vue inspect > output.js```可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## 2.4 ref属性
1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
    2. 获取：```this.$refs.xxx```

## 2.5 props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

    1. 第一种方式（只接收）：```props:['name'] ```

    2. 第二种方式（限制类型）：```props:{name:String}```

    3. 第三种方式（限制类型、限制必要性、指定默认值）：

        ```js
        props:{
        	name:{
        	type:String, //类型
        	required:true, //必要性
        	default:'老王' //默认值
        	}
        }
        ```

    > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

## 2.6 mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    第一步定义混合：

    ```java
    export const mixin = {
    	methods: {},
    	mounted() {}
    }
    ```
    
    第二步使用混入：
    
    全局混入：```Vue.mixin(xxx)```
    局部混入：组件中配置```mixins:['xxx']	```

## 2.7 插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

    ```js
    export default {
        install (Vue, options) {
            // 1. 添加全局过滤器
            Vue.filter(....)
    
            // 2. 添加全局指令
            Vue.directive(....)
    
            // 3. 配置全局混入(合)
            Vue.mixin(....)
    
            // 4. 添加实例方法
            Vue.prototype.$myMethod = function () {...}
            Vue.prototype.$myProperty = xxxx
        }
    }
    ```

4. 使用插件：```Vue.use()```

## 2.8 scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

