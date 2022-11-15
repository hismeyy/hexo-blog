---
title: 递归
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、使用场景
1. 各种数学问题：八皇后问题，汉诺塔，阶乘问题，迷宫问题（回溯），球和篮子的问题等
2. 打印问题
3. 各种算法中也会使用递归，快排，归并排序，二分查找，分治算法等

# 二、什么是递归
1. 递归就是自己调用自己，每次调用传入不同的变量
2. 需要遵循的规则
	- 执行方法时，就创建一个新的受保护的独立空间（栈空间）
	- 方法的局部变量是独立的，不会相互影响
	- 递归必须向退出递归的条件逼近，否则就无限递归了
	- 当一个方法执行完毕，或者遇到return就会返回，遵守谁调用，就将结果返回给谁，同时当方法执行完毕或者返回时，该方法也就执行完毕

# 四、打印问题

```java
package com.dsaatt;

/**
 * 打印问题
 */
public class Dome01 {
    public static void main(String[] args) {
        printProblem(5);
    }

    private static void printProblem(int x){
        if(x > 2){
            printProblem(x-1);
        }
        System.out.print(x + " ");
    }
}
```

# 五、阶乘问题

```java
package com.dsaatt;

/**
 * 阶乘问题
 */
public class Dome02 {
    public static void main(String[] args) {
        System.out.println(factorial(3));
    }

    private static int factorial(int x){
        if(x == 1){
            return x;
        }else {
            return x * factorial(x - 1);
        }
    }
}
```

# 六、迷宫问题

```java
package com.dsaatt;

public class Dome03 {
    private static final int[][] maze = new int[7][6];

    public static void main(String[] args) {
        buildMaze();
        goMaze(1,1);
        // 打印迷宫
        for(int i = 0; i < 7; i++){
            for(int j = 0; j < 6; j++){
                System.out.print(maze[i][j] + " ");
            }
            System.out.println();
        }
    }

    private static void buildMaze(){
        // 加墙
        for(int i = 0; i < 6; i++){
            maze[0][i] = 1;
            maze[6][i] = 1;
        }
        for(int i = 0; i < 7; i++){
            maze[i][0] = 1;
            maze[i][5] = 1;
        }
        maze[3][1] = 1;
        maze[3][2] = 1;
    }

    private static void goMaze(int x, int y){
        if(maze[5][4] == 2){
           return;
        } else if(maze[x][y] == 0){
            if(maze[x+1][y] == 0){ // 下
                maze[x][y] = 2;
                goMaze(x+1,y);
            }else if(maze[x][y+1] == 0){
                maze[x][y] = 2;
                goMaze(x,y+1);
            }else if(maze[x-1][y] == 0){
                maze[x][y] = 2;
                goMaze(x,y+1);
            }else if(maze[x][y-1] == 0){
                maze[x][y] = 2;
                goMaze(x,y+1);
            }else {
                maze[x][y] = 3;
                return;
            }
        }
    }
}
```

# 七、八皇后问题

## 7.1 八皇后问题介绍
是一个古老而著名的问题，**是回溯算法的典型案例**。由纳克斯·贝瑟尔在1848年提出。在8×82022/11/13格的国际象棋上摆放八个皇后，使其不能相互攻击。**即任意两个皇后都不能处于同一行、同一列或同一斜线上，问一共有几种摆法。**
## 7.2 思路分析

1. 第一个皇后先放第一行第一列
2. 第二个皇后先放第二行第一列，然后判断是否OK，如果不OK，继续放在第二列，第三列，依次把所有的列都放完，找到一个合适位置
3. 继续放第三个皇后，还是从第一列，第二列，第三列....直到第8个皇后也能放在一个不冲突的位置，算是找到一个正确解
4. 当得到一个正确解时，在栈返回退到上一个栈时，就会开始回溯，即将第一个皇后，放在第一列的所有正解，全部得到。
5. 然后回头继续第一个皇后放在第二列，后面继续循环执行123的步骤
6. 理论上可以用二维数组，但是可以通过算法用一维数组解决问题

## 7.3 重点！！！

```java
// 是否在同一列
array[i] == array[n]
// 是否在同一斜线 和前一个皇后的行相减是否等于和前一个皇后的列相减
Math.abs(n-i) == Math.abs(array[n] - array[i])
```

![](https://img.yublog.top/img/202211121621139.png)

## 7.4 代码实现

```java
package com.dsaat;

public class Dome01 {
    static int max = 8;
    static int[] array = new int[max];
    static int sum = 0;
    public static void main(String[] args) {
        check(0);
        System.out.println(sum);
    }

    private static void check (int n){
        if(n == max){
            print();
            return;
        }
        // 每行放8次 每行i可以取0-7 虽然从第一行开始放，但是因为递归所以是最后一行先放完
        for (int i = 0; i < max; i++) {
            array[n] = i; // i对应的也是列的位置
            if(judge(n)){
                check(n+1); //n对应的是行的位置
            }
        }
    }

    // n表示第n个皇后
    private static boolean judge(int n){
        for (int i = 0; i < n; i++) {
            if(array[i] == array[n] || Math.abs(n-i) == Math.abs(array[n] - array[i])){
                return false;
            }
        }
        return true;
    }

    private static void print(){
        sum++;
        for (int i =0; i < array.length; i++){
            System.out.print(array[i] + " ");
        }
        System.out.println();
    }

}

```

