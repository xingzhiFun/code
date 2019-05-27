// There are two sorted arrays nums1 and nums2 of size m and n respectively.
// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
// You may assume nums1 and nums2 cannot be both empty.
// nums1 = [1, 3]
// nums2 = [2]
// The median is 2.0
// nums1 = [1, 2]
// nums2 = [3, 4]
// The median is (2 + 3)/2 = 2.5

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 * @notice 中位数
 */
const findMedianSortedArrays = function(nums1: number[], nums2: number[]): number {
  /* // 打平数组 方法1
  const newArr1 = nums1.flat(Infinity);
  const newArr2 = nums2.flat(Infinity);
  // 打平数组 方法2，join可以换成toString方法
  // nums1.join().split(',');
  // const newArr1 = JSON.parse(`[${num1.join()}]`);

  const sum1 = newArr1.reduce((account, val) => val + account);
  const sum2 = newArr2.reduce((account, val) => val + account);
  const result = (sum1 + sum2) / (newArr1.length + newArr2.length);
  return result; */

  const newArr = nums1.concat(nums2);
  newArr.sort((a, b) => a - b);

  const len = newArr.length;
  // 两个奇数的结果是一样的，但是Runtime差的特别大
  if (len & 1) return newArr[~~(len / 2)];
  // if (len % 2 === 1) return newArr[(len - 1) / 2];
  return (newArr[len / 2 - 1] + newArr[len / 2]) / 2;
};
