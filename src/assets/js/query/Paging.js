/**
 * Created by xieh on 2018/8/7.
 */

var Paging = {
    createNew: function (config) {
        //console.log(config)
        var obj = {};
        obj.pageNo = 1;
        obj.pageSize = 10;
        obj.pageSizes = [10, 30, 50, 100];
        obj.total = 0;

        if (config) {
            if (config.pageNo != null && config.pageNo != undefined) {
                obj.pageNo = config.pageNo;
            }
            if (config.pageSize != null && config.pageSize != undefined) {
                obj.pageSize = config.pageSize;
            }

        }

        obj.buildQueryString = function () {
            return "paging=1&pageNo=" + this.pageNo + "&pageSize=" + this.pageSize;
        }
        return obj;
    }
}

export default Paging;