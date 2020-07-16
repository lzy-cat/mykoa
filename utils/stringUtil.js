/*
 * @Author: LZY
 * @Date: 2020-07-07 09:11:33
 * @Last Modified by: LZY
 * @Last Modified time: 2020-07-07 09:12:12
 * @description:    字符串工具包
 */


/**
 * 非空校验
 * @param {String} str 
 */
function isEmpty(str) {
    //判断一个字符串是否为空，首先就要确保他不是null，然后再判断他的长度
    if (str == null || str.length==0 ||trim(str).length ==0) {
        return true
    }
    return false
}
/**
 * 去除空格
 * @param {string} str 
 */
function trim(str){       
    return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,''); 
}
module.exports = {
    isEmpty,
    trim
}