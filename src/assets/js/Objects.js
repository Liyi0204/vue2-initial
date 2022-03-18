import util from 'util';
import jquery from 'jquery';

const isEmpty = (val) => {
    if (util.isNullOrUndefined(val)) return true;
    if (util.isArray(val)) return val.length == 0;
    if (util.isString(val)) return val === '';
    return false;
};

const isNotEmpty = (val) => {
    return !isEmpty(val);
};

// 重置对象自身的所有可枚举的属性
const resetProperties = (obj) => {
    let keys = Object.keys(obj);
    for (let key of keys) {
        obj[key] = '';
    }
};

const deepCopy = (dest, source) => {
    jquery.extend(true, dest, source);
    return dest;
};

const isArray = (value) => {
    return util.isArray(value);
};

export default {
    isEmpty: isEmpty,
    isNotEmpty: isNotEmpty,
    resetProperties: resetProperties,
    deepCopy: deepCopy,
    isArray: isArray,
}