/**
 * Created by xiaer on 2018/7/27.
 */

function isPalindrome(word) {
  // �쳣����
  if(word === undefined) {
    throw new Error('Invalid argument')
  }
  // ������� && �������
  if(typeof word !== 'number'){
    return false
  }

  // �ڿ�����������У��µĲ��԰�����������ϸ�ڣ����ɵĲ���ȷ��������������~����ڴ�����������У����Կ�����֤����~
  // return word.toString().split('').reverse().join('') === word.toString()
  var tmpWord = word.toString()
  for(var i = 0, j = tmpWord.length - 1; i < j; ++i, --j) {
    if(tmpWord[i] !== tmpWord[j]) {
      return false
    }
  }

  return true
}