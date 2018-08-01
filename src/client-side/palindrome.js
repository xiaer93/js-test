/**
 * Created by xiaer on 2018/7/27.
 */

function isPalindrome(word) {
  // 异常测试
  if(word === undefined) {
    throw new Error('Invalid argument')
  }
  // 反向测试 && 正向测试
  if(typeof word !== 'number'){
    return false
  }

  // 在开发代码过程中，新的测试帮助我们完善细节，而旧的测试确保我们满足需求~因此在代码迭代过程中，可以快速验证功能~
  // return word.toString().split('').reverse().join('') === word.toString()
  var tmpWord = word.toString()
  for(var i = 0, j = tmpWord.length - 1; i < j; ++i, --j) {
    if(tmpWord[i] !== tmpWord[j]) {
      return false
    }
  }

  return true
}