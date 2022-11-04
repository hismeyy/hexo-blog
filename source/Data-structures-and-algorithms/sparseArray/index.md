---
title: 稀疏数组
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、实际需求
1. 编写五子棋程序时，有存盘退出和续上盘的功能
![](https://img.yublog.top/img/202211041833927.png)
2. 分析问题
因为该二维数组的很多值默认是0，因此记录了很多没有意义的数据，因此我们需要今天的主角**稀疏数组**

# 二、什么是稀疏数组
1. 当在一个数组中大部分元素是0，或者为同一值的时候，就可以用稀疏数组来保存该数组
2. 稀疏数组的处理方法
- 记录数组有几行几列，有多少个不同的值
- 把具有不同值的元素和行列及值记录在一个小规模的数组中，从而缩小程序的规模，该数组就是稀疏数组
![](https://img.yublog.top/img/202211041936051.png)

# 三、稀疏数组实现原理
## 3.1 二维数组转稀疏数组
1. 遍历原始的二维数组，得到有效数据的个数sum
2. 根据sum就可以创建稀疏数组sparseArr int[sum+1][3]
3. 将二维数组的有效数据存放到稀疏数组中
## 3.2 稀疏数组转二维数组
1. 先读取稀疏数组的第0行，根据第0行数据，创建原始的二维数组
2. 从第1行开始遍历稀疏数组，通过0列确定二维数组的行数，1列确定二维数组的列数，2列确定二维数组的值

# 四、代码实现

```java
package com.dsaat;

public class Dome01 {

    @SuppressWarnings({"all"})
    public static void main(String[] args) {
        // 1. 创建一个二维数组
        int[][] arrays = new int[5][4];
        // 2. 在二维数组中添加值
        arrays[1][1] = 1;
        arrays[2][2] = 11;
        arrays[0][3] = 3;

        // 二维数组转稀疏数组
        // 1. 遍历二维数组得到有效数据个数sum
        int sum = 0;
        for(int[] array : arrays){
            for(int ele : array){
                if(ele != 0){
                    sum++;
                }
            }
        }
        // 2. 创建稀疏数组
        int[][] sparseArrays = new int[sum + 1][3];
        // 3. 将二维数组的有效数据存储在稀疏数组中
        int i = 0;
        sparseArrays[0][0] = arrays.length;
        sparseArrays[0][1] = arrays[i].length;
        sparseArrays[0][2] = sum;
        for(int[] array : arrays){
            for(int j = 0; j < array.length; j++){
                if(array[j] != 0){
                    sparseArrays[i+1][0] = i;
                    sparseArrays[i+1][1] = j;
                    sparseArrays[i+1][2] = array[j];
                }
            }
            i++;
        }

        // 稀疏数组转二维数组
        // 1. 读取稀疏数组的第0行创建二维数组
        int[][] oldArrays = new int[sparseArrays[0][0]][sparseArrays[0][1]];

        // 2. 从第一行开始遍历稀疏数组，把值转换到二维数组中
        for(int x = 1; x <= sparseArrays[0][2]; x++){
            oldArrays[sparseArrays[x][0]][sparseArrays[x][1]] = sparseArrays[x][2];
        }


        // 测试代码
        for(int[] array : oldArrays){
            for(int ele : array){
                System.out.printf("%d\t", ele);
            }
            System.out.println();
        }

    }
}
```

