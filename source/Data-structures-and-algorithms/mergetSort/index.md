---
title: 默认
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、什么是归并排序

归并排序是采用分治法的典型应用，而且是一种稳定的排序方式，不过需要使用到额外的空间。

> 1、把数组不断划分成子序列，划成长度只有2或者1的子序列。
> 2、然后利用临时数组，对子序列进行排序，合并，再把临时数组的值复制回原数组。
> 3、反复操作1~2步骤，直到排序完成。

## 二、代码实现

```java
package com.dsaat;

import java.util.Arrays;

public class Dome01 {

    public static void main(String[] args) {
        int[] array = {8,4,5,7,1,3,6,2};
        int[] temp = new int[array.length];
        mergeSort(array,0, array.length - 1,temp);
        System.out.println(Arrays.toString(array));
    }

    private static void mergeSort(int[] array, int left, int right, int[] temp){
        if(right > left){
            int mid = (left + right) / 2;
            mergeSort(array, left, mid, temp);
            mergeSort(array, mid + 1, right, temp);
            merge(array,left,mid,right,temp);
        }
    }

    /**
     * 合并
     * @param array 数组
     * @param left 左边
     * @param mid 中间
     * @param right 右边
     * @param temp 临时数组
     */
    private static void merge(int[] array, int left, int mid, int right, int[] temp){
        int t = 0; // 临时数组下标
        int a = left;
        int b = mid + 1;

        // 循环的把左右的数从小到大排到新的数组temp中
        while (a <= mid && b <= right){
            if(array[a] < array[b]){
                temp[t] = array[a];
                a++;
            }else {
                temp[t] = array[b];
                b++;
            }
            t++;
        }
        // 剩余的一些数放入temp中
        while (a <= mid){
            temp[t] = array[a];
            a++;
            t++;
        }
        while (b <= right){
            temp[t] = array[b];
            b++;
            t++;
        }

        // 把临时temp中的数据放入array中
        t = 0;
        int tempLeft = left;
        while (tempLeft <= right){
            array[tempLeft] = temp[t];
            t++;
            tempLeft++;
        }
    }
}
```

