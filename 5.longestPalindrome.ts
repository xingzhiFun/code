// Given a string s, find the longest palindromic substring in s.
// You may assume that the maximum length of s is 1000.

// Example1: 
// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.

// Example2:
// Input: "cbbd"
// Output: "bb"

/**
 * @param {string} s
 * @return {string}
 * 回文串：正反一致的特性
 */
const longestPalindrome = (s: string): string => {
    const len = s.length;
    if (len < 2) return s;

    let tempMaxPalindRome = s[0];
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            const data = s.substr(i, j - i + 1);
            const reverseData = data.split('').reverse().join('');
            if (data === reverseData && data.length > tempMaxPalindRome.length) {
                tempMaxPalindRome = data;
            }
        }
    }
    return tempMaxPalindRome;
};

// /****************  暴力解法  ****************/
// class Solution {
//     /**
//      * @param String $s
//      * @return String
//      */
//     function longestPalindrome($s) {
//         $len = strlen($s);
//         if($len < 2) return $s;         //初始化判断
//         $max = $s[0];
//         for($i=0;$i<$len;$i++){         //从每一个字符开始，截取到最后一个字符
//             for($j=$i+1;$j<$len;++$j){
//                 $str = substr($s, $i,$j-$i+1);  //正向字符串
//                 $restr = strrev($str);          //反向字符串
//                 if($str == $restr && strlen($str) > strlen($max)){
//                     $max = $str;        //比较是否是回文串，且比当前最大的子串长
//                 }
//             }
//         }
//         return $max;
//     }
// }
// /****************  动态规划  ****************/
// class Solution {
//     /**
//      * @param String $s
//      * @return String
//      */
//     function longestPalindrome($s) {
//         $len = strlen($s);
//         if($len < 2) return $s;         //初始化判断
//         $dp = [];                       //初始化动态规划dp数组，dp[i][j]表示从j到i的字符串是否为回文串
//         $right = $left = 0;             //初始化最长的最优节点
//         for($i=0;$i<$len;++$i){
//             $dp[$i][$i] = true;         //只有一个元素的时候肯定为true
//             for($j=$i-1;$j>=0;--$j){    //遍历到第i个元素，再倒退判断是否为回文串
//                 //头i尾j两个元素相等，且dp[i-1][j+1]是回文串，即dp[i][j]也是回文串
//                 //特殊情况,“bb”,此时dp[i-1][j+1]=dp[j][i]此时数组不成立，不存在截取的反向字符串
//                 $dp[$i][$j] = $s[$i] == $s[$j] && ($i-$j==1 || $dp[$i-1][$j+1]);
//                 if($dp[$i][$j] && ($i-$j)>($right-$left)){
//                     $right = $i;        //截取的字符串的长度大于之前求得的左右长度，则取的左右下标点
//                     $left = $j;
//                 }
//             }
//         }
//         return substr($s,$left,$right-$left+1); //截取字符串
//     }
// }
// /****************  中心扩展法  ****************/
// class Solution {
//     private $s,$len;
//     /**
//      * @param String $s
//      * @return String
//      */
//     function longestPalindrome($s) {
//         $len = strlen($s);
//         if($len < 2) return $s;         //初始化判断
//         $this->len = $len;              //使其成为成员变量
//         $this->s = $s;
//         $left = $right = 0;             //定义左右边界
//         for($i=0;$i<$len;++$i){
//             $lenji = $this->centerExpand($i,$i);    //奇数中心扩散，判断该点的回文长度
//             $lenou = $this->centerExpand($i,$i+1);  //偶数中心扩散
//             $maxLen = max($lenji,$lenou);           //取最大
//             if($maxLen > $right-$left+1){
//                 $right = $i + floor($maxLen/2);     //取新的左右值
//                 $left = $i - floor(($maxLen-1)/2);  //其本身也包含在内，因此要($maxLen-1)
//             }
//         }
//         return substr($s,$left,$right-$left+1); //截取字符串
//     }
//     private function centerExpand($left,$right){
//         while($left>=0 && $right<$this->len && $this->s[$left] == $this->s[$right]){
//             $left--;$right++;
//         }
//         //当不满足条件是，左右都再进了一位，此时不是常规的$right-$left+1，而是要-1
//         return $right-$left-1;
//     }
// }
// /****************  马拉车算法  ****************/
// class Solution {
//     /**
//      * @param String $s
//      * @return String
//      */
//     function longestPalindrome($s) {
//         $len = strlen($s);
//         if($len < 2) return $s;         //初始化判断
//         $str = '^#'.implode('#', str_split($s)).'#$';   //分割字符串，使奇偶性统一
//         $len = strlen($str);            //计算改好的字符串长度
//         $r = array_fill(0, $len, 0);    //初始化半径数组
//         $center = $maxRight = 0;        //初始化偏移量：中心点和回文串最大右点
//         $maxStr = '';                   //结果，最长的回文串
//         for($i=1;$i<$len;++$i){
//             if($i<$maxRight){
//                 $r[$i] = min($maxRight-$i,$r[2*$center-$i]);    //计算当前回文路径的长度
//             }
//             while ($str[$i-$r[$i]-1] == $str[$i+$r[$i]+1]) {    //扩展回文子串南京
//                 $r[$i] ++;
//             }
//             if($i+$r[$i] > $maxRight){  //如果超出最右的点，则更新中心点和右节点
//                 $maxRight = $i+$r[$i];
//                 $center = $i;           
//             }
//             if(1+2*$r[$i] > strlen($maxStr)){       //计算当前回文子串是否大于记录的结果
//                 $maxStr = substr($str,$i-$r[$i],2*$r[$i]+1);
//             }
//         }
//         return str_replace('#', '', $maxStr);
//     }
// }