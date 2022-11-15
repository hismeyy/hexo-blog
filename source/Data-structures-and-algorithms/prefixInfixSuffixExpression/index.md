---
title: 前缀，中缀，后缀表达式(逆波兰表达式)
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、前缀表达式（波兰表达式）
## 1.1 什么是前缀表达式
1. (prefix)前缀表达式的运算符位于操作数之前
2. (3+4)×5-6 ——————> -×+3456
## 1.2 前缀表达式的计算机求值
1. 从右至左扫描表达式，遇到数字，将数字压入堆栈
2. 遇到运算符，弹出栈顶的两个数，用对应的运算符进行计算
3. 将结果压入栈
4. 重复上述过程，直到表达式最左端，最后运算得到的值即为表达式的值
## 1.3 代码实现

```java
package com.dsaat;

import java.util.LinkedList;
import java.util.Stack;

public class Dome01 {
    public static void main(String[] args) {
        String prefix = "- * + 3 4 5 6";
        String[] s = prefix.split(" ");
        LinkedList<String> prefixList = new LinkedList<>();
        for(String item : s){
            prefixList.add(item);
        }
        Stack<Integer> stack = new Stack<>();
        for(int i = prefixList.size()-1; i >= 0; i--){
            String ele = prefixList.get(i);
            // 如果是数字进行压栈
            if(ele.matches("\\d+")){
                stack.push(Integer.parseInt(ele));
            }else {
                int result;
                int num1 = stack.pop();
                int num2 = stack.pop();
                result = cal(num1,num2,ele);
                stack.push(result);
            }
        }
        System.out.println("最后结果是：" + stack.pop());
    }

    private static int cal(int num1, int num2, String operator) {
        if("+".equals(operator)){
            return num1 + num2;
        }else if("-".equals(operator)){
            return num1 - num2;
        }else if("*".equals(operator)){
            return num1 * num2;
        }else if("/".equals(operator)){
            return num1 / num2;
        }else {
            System.out.println("运算符错误");
            return 0;
        }
    }
}
```

# 二、中缀表达式
1. (infix)中缀表达式是常用的算数运算表达式 如 (3+4)×5-6
2. 中缀表达式是人最熟悉的，但是对计算机不友好，因此计算结果时转换成其他表达式，一般转换为后缀表达式

# 三、后缀表达式（逆波兰表达式）

1. (suffix)与前缀表达式相似，运算符位于操作数之后
2. (3+4)×5-6 ——————> 34+5×6-

# 四、逆波兰计算器
## 4.1 什么是逆波兰计算器
1. 输入逆波兰表达式，使用栈计算结果
2. 支持小括号，多位数整数
## 4.2 代码实现

```java
package com.dsaat;

import java.util.LinkedList;
import java.util.Stack;

public class Dome01 {
    public static void main(String[] args) {
        String prefix = "3 4 + 5 * 6 -";
        String[] s = prefix.split(" ");
        LinkedList<String> prefixList = new LinkedList<>();
        for(String item : s){
            prefixList.add(item);
        }
        Stack<Integer> stack = new Stack<>();
        for(int i = 0; i < prefixList.size(); i++){
            String ele = prefixList.get(i);
            // 如果是数字进行压栈
            if(ele.matches("\\d+")){
                stack.push(Integer.parseInt(ele));
            }else {
                int result;
                int num2 = stack.pop();
                int num1 = stack.pop();
                result = cal(num1,num2,ele);
                stack.push(result);
            }
        }
        System.out.println("最后结果是：" + stack.pop());
    }

    private static int cal(int num1, int num2, String operator) {
        if("+".equals(operator)){
            return num1 + num2;
        }else if("-".equals(operator)){
            return num1 - num2;
        }else if("*".equals(operator)){
            return num1 * num2;
        }else if("/".equals(operator)){
            return num1 / num2;
        }else {
            System.out.println("运算符错误");
            return 0;
        }
    }
}
```

# 五、中缀表达式转后缀表达式
## 5.1 步骤
1. 初始化两个栈，运算符栈s1和存储中间结果的栈s2
2. 从左至右扫描中缀表达式
3. 遇到操作数时，将其压入s2
4. 遇到运算符时，比较该运算符和s1栈顶运算符的优先级
  a 如果s1为空，或者栈顶运算符为左括号，则直接将此运算符入栈
  b 如果优先级比栈顶的高，也压入s1
  c 如果优先级低或相同，则将s1栈顶的运算符弹出并压入s2，再跳转到4.a与s1中新的栈顶运算符进行比较
5. 遇到括号时
  a 如果时左括号"("，则直接入栈s12022/11/13
  b 如果是右括号")"，则依次弹出s1栈顶的运算符，并压入s2，直到遇到最括号为止，并弹出左括号
6. 重复2-5，直到表达式的最右边
7. 将s1中剩余的运算符依次弹出压入s2
8. 依次弹出s2中的元素并输出，结果的逆序即为中缀表达式对应的后缀表达式

## 5.2 代码实现

```java
package com.dsaat;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import static com.dsaat.Priority.getPriority;

public class Dome01 {
    @SuppressWarnings({"all"})
    public static void main(String[] args) {
        String expression = "( 5 + 1 ) * 20 + 3 - 1";
        String[] strings = expression.split(" ");

        // 初始化运算符栈和存储结果栈
        Stack<String> s1 = new Stack<>();
        List<String> s2 = new ArrayList();

        for(int i = 0; i < strings.length; i++){
            // 如果是一个数字
            if(strings[i].matches("\\d+")){
                s2.add(strings[i]);
            } else if(strings[i].equals("(")){ // 如果是左括号 则直接压入s1
                s1.push(strings[i]);
            } else if (strings[i].equals(")")) { // 如果是右括号 则从s1pop出放入s2遇到(停止，并且pop出(
                while (!s1.peek().equals("(")){
                    s2.add(s1.pop());
                }
                s1.pop();
            } else {
                while (true){
                    if(s1.size() == 0 || s1.peek().equals("(")){
                        s1.push(strings[i]);
                        break;
                    }else if(getPriority(strings[i]) > getPriority(s1.peek())){
                        s1.push(strings[i]);
                        break;
                    }else {
                        s2.add(s1.pop());
                    }
                }
            }
        }

        // 将剩余的运算符栈中的值依次弹出压入s2
        while (s1.size() != 0){
            s2.add(s1.pop());
        }

        System.out.println(s2);


        Stack<Integer> stack = new Stack<>();
        for(int i = 0; i < s2.size(); i++){
            String ele = s2.get(i);
            // 如果是数字进行压栈
            if(ele.matches("\\d+")){
                stack.push(Integer.parseInt(ele));
            }else {
                int result;
                int num2 = stack.pop();
                int num1 = stack.pop();
                result = cal(num1,num2,ele);
                stack.push(result);
            }
        }
        System.out.println("最后结果是：" + stack.pop());
    }

    private static int cal(int num1, int num2, String operator) {
        if("+".equals(operator)){
            return num1 + num2;
        }else if("-".equals(operator)){
            return num1 - num2;
        }else if("*".equals(operator)){
            return num1 * num2;
        }else if("/".equals(operator)){
            return num1 / num2;
        }else {
            System.out.println("运算符错误");
            return 0;
        }
    }
}

// 优先级类
class Priority{
    public final static int ADD = 1;
    public final static int SUB = 1;
    public final static int MUL = 2;
    public final static int DIV = 2;

    // 获取优先级
    public static int getPriority(String o){
        if(o.equals("+")){
            return ADD;
        }else if(o.equals("-")){
            return SUB;
        }else if(o.equals("*")){
            return MUL;
        }else if(o.equals("/")){
            return DIV;
        }else {
            System.out.println("符号错误");
            return 0;
        }
    }
}
```

## 5.2 代码实现

# 逆波兰计算器完整版
1. 支持+-*/()
2. 多位数，小数
3. 兼容处理，过滤任何空白字符，包括括号，制表符，换页符等
