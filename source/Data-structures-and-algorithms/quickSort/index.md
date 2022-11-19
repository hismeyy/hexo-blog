---
title: 快速排序
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、什么是快速排序

快速排序是对冒泡排序的一种改进。基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法，对这两部数据分别进行快速排序。整个排序过程可以用递归进行。以此达到整个数据变成有序序列

## 二、代码实现

```java
package com.dsaat;

import java.util.Arrays;

public class Dome01 {
    public static void main(String[] args) {
        int[] array = {5, 4, 0, -1, 2, 6, 8, -5};
        quickSort(array,0, array.length - 1);
        System.out.println(Arrays.toString(array));
    }

    private static void quickSort(int[] array, int left, int right){
        int l = left;
        int r = right;
        int temp;
        int pivotIndex = (right + left) / 2;
        int pivot = array[pivotIndex]; // 中间值
        // 左边 小于右边才可以继续
        while (l < r){
            // 左边 寻找 大于中间值的下标
            while(array[l] < pivot){
                l++;
            }

            // 右边 寻找 小于中间值的下标
            while(array[r] > pivot){
                r--;
            }

            // 交换左边大于中间值和右边小于中间值的位置
            if(r <= l){
                break;
            }
            temp = array[l];
            array[l] = array[r];
            array[r] = temp;

            // 防止死循环
            if(array[l] == pivot){
                r--;
            }
            // 防止死循环
            if(array[r] == pivot){
                l++;
            }
            // 继续排序
            quickSort(array,left,l);
            quickSort(array,r,right);
        }
    }
}
```

