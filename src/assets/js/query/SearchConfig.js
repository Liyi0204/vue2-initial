/**
 * Created by wanghm on 2016/11/7.
 */
import util from 'util';
import moment from 'moment';
import Objects from '../Objects';
import tools from '../tools';
var SearchInfo = {
    //str,date,num
    createNew: function (config) {
        //console.log(config)
        let obj = {};
        obj.items = {};
        obj.searchForm = {};
        obj.sorts = {};

        if (config) {
            //console.log(config['items'])
            if (config['items']) {
                obj.items = config['items'];
                for (let key in obj.items) {
                    let item = obj.items[key];
                    if (!item['filter']) {
                        item.filter = "like";
                    }
                    if (!item['dataType']) {
                        item.dataType = 'str';
                    }
                }
            }
            if (config['searchForm']) {
                obj.searchForm = config['searchForm'];
            }
            if (config['sorts']) {
                obj.sorts = config['sorts'];
            }
        }

        //生成查询字符串
        obj.buildQueryString = function () {
            var that = this;

            var paramString = "params=";
            let i = 0;
            for (let paramName in this.searchForm) {
                let paramValue = this.searchForm[paramName];
                // paramValue =tools.encodingURI(paramValue); //将特殊字符进行编码/ 比如(% -> %25) //但是编码之后还需要转义，不然后台sql还是不对。
                //console.log(paramValue)
                if(!util.isArray(paramValue)){
                    paramValue = encodeURIComponent(paramValue);
                }
                if (paramValue === null || paramValue === undefined || paramValue === '' || paramValue==='null')continue;
                //console.log(paramName,paramValue)
                if (i > 0)paramString += ";";
                let filter = "like";
                let dataType = "str";
                if (that.items && that.items[paramName]) {
                    if (that.items[paramName].filter != null
                        && that.items[paramName].filter != undefined) {
                        filter = that.items[paramName].filter;
                    }
                    if (that.items[paramName].dataType != null
                        && that.items[paramName].dataType != undefined) {
                        dataType = that.items[paramName].dataType;
                    }
                }
                if (('between' === filter || 'BETWEEN' === filter) && util.isArray(paramValue)) {                    
                    let left = paramValue[0], right = paramValue[1];
                    if (util.isDate(left)) {
                        left = moment(left).format('YYYYMMDDHHmmss');
                    }
                    if (util.isDate(right)){
                        right = moment(right).format('YYYYMMDDHHmmss');
                        if(dataType=='date' && right.substr(8)=="000000"){
                            right = right.substr(0,8)+"235959";
                        }
                    }
                    // element日期控件设置为daterange时，选中以后再清空，会传回[null, null]，这里直接跳过这种情况
                    if (Objects.isEmpty(left) && Objects.isEmpty(right)) continue;
                    if (Objects.isNotEmpty(left)) paramValue = left;
                    paramValue += "~";
                    if (Objects.isNotEmpty(right)) paramValue += right;
                }
                let str = paramName + ':' + filter + ":" + paramValue + ":" + dataType;
                paramString += str;
                i++;
            }
            // console.log("search:%s", paramString)
            return i > 0 ? paramString : "";
        }
        obj.buildQuerySortString = function () {
            var paramString = "sorts="
            var i = 0;
            for(let paramName in this.sorts) {
                let paramValue = this.sorts[paramName].order;
                if(paramValue === null || paramValue === undefined || paramValue=== '') continue;
                if (i > 0)paramString += ";";
                let str = paramName + ':' + paramValue;
                paramString += str;
                i++;
            }
            return i > 0 ? paramString : "";
        }

        //返回类实例;
        return obj;
    }
}
export default SearchInfo;