/**
 * 字符串工具类
 */
class StringUtil {
    //非空校验
    static isEmpty(str) {
        //判断一个字符串是否为空，首先就要确保他不是null，然后再判断他的长度
        if (str == null || str.length==0 ||this.trim(str).length ==0) {
            return true
        }
        return false
    }
    //去除空格
    static trim(str){       
        return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,''); 
    }
}
module.exports = StringUtil