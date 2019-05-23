// Given a string, find the length of the longest substring without repeating characters.
// Example: 
// Input: "abcabcbb"
// Output: 3 
// Explanation: The answer is "abc", with the length of 3.

// Input: "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// Input: "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3. 
//              Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

/**
 * @description 找出字符串中 不重复出现的 最长字符的 长度
 * @param {String} data: 字符串
 * @return {Number}
 */
const lengthOfLongestSubstring = (data: string): number => {
  const len = data.length;
  const characterIndex = {}; // 存储字符
  const characterMap = []; // 存储不重复的字符
  let res = 0;

  for (let i = 0; i < len; i++) {
    const currentData = data[i];
    if (characterIndex[currentData]) { // 如果字符出现过，就删除这个字符在数组中位置之前的字符，重新对比。
      const delIndex = characterMap.findIndex(item => item === currentData);
      characterMap.splice(0, delIndex + 1);
    }

    characterIndex[currentData] = true; // 标记该字符出现
    characterMap.push(currentData); // 将新出现的字符 塞进数组（如果已经出现过，也在上面被删除了，可以当做新的字符看待）
    res = characterMap.length > res ? characterMap.length : res;
  }
  return res;
}
