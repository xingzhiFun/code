// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
// Example:
// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * @notice 链表
 */
const addTwoNumbers = (l1, l2) => {
  if (!l1 || !l2) return l1 || l2;

  const result = new ListNode();
  let p = l1, q = l2, cur = result, carry = 0;

  while(p || q) {
    let qval, pval;
    
    if (q) {
      qval = q.val;
      q = q.next;
    } else {
      qval = 0;
    }
  
    if(p){
      pval = p.val;
      p = p.next;
    } else {
      pval = 0;
    }

    let sum = qval + pval + carry;
    if (sum > 9) {
      carry = 1;
      sum = sum % 10;
    } else {
      carry = 0;
    }

    cur.next = new ListNode(sum);
    cur = cur.next;
  }

  if (carry) cur.next = new ListNode(1);
  return result.next;
}

/* const addTwoNumbers = (l1: number[], l2: number[]): number[] => {
  const NumArray2Num = (arr: number[]): number => {
    return +arr.reverse().join(',').replace(/,/g, '');
  }

  const sum = NumArray2Num(l1) + NumArray2Num(l2);
  const result = `${sum}`.split('').reverse().map(item => +item);
  return result;
}; */
