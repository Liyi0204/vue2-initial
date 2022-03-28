<template>
  <div class="ws-page-table" :class="{ 'box-shadow-unify': isShadow }">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <template v-if="selection === 'single'">
          <el-table ref="pageTable" :data="tableData" :border="border" :show-header="showHeader" @current-change="handleRowChange" @cell-dblclick="cellDblclick" @row-contextmenu="rowContextmenu" @row-click="rowClick" :max-height="height" :header-cell-style="tableHeaderStyle" :height="fixHeight" :width="fixWidth" :cell-style="cellStyle" :row-style="rowStyle" :row-class-name="tableRowClassName" :cell-class-name="tableCellClassName" @expand-change="expandChange" v-loading="tableLoading" element-loading-text="拼命加载中..." :stripe="stripe" highlight-current-row>
            <!-- <el-table-column v-if="showIndex" type="index" width="50"></el-table-column> -->
            <el-table-column v-if="showIndex" label="序号" width="100">
              <template slot-scope="scope">
                {{
                  scope.$index + 1 < 10
                    ? "0" + (scope.$index + 1)
                    : scope.$index + 1
                }}
              </template>
            </el-table-column>
            <slot></slot>
          </el-table>
        </template>
        <template v-else>
          <el-table ref="pageTable" :highlight-current-row='highlightRow' :show-header="showHeader" :data="tableData" :border="border" @selection-change="tableCheckChange" @cell-dblclick="cellDblclick" @row-contextmenu="rowContextmenu" @cell-click="cellClick" @row-click="rowClick" :max-height="height" :header-cell-style="tableHeaderStyle" :height="fixHeight" :width="fixWidth" :cell-style="cellStyle" :row-class-name="tableRowClassName" :cell-class-name="tableCellClassName" @expand-change="expandChange" v-loading="tableLoading" element-loading-text="拼命加载中..." :stripe="stripe">
            <el-table-column v-if="selection === 'multi'" type="selection" :fixed='showIndexFixed' :selectable="checkboxSelect" width="50"></el-table-column>
            <!-- <el-table-column v-if="showIndex" type="index" width="50"></el-table-column> -->
            <el-table-column v-if="showIndex" label="序号" width="100">
              <template slot-scope="scope">{{
                scope.$index + 1 < 10
                  ? "0" + (scope.$index + 1)
                  : scope.$index + 1
              }}</template>
            </el-table-column>
            <slot></slot>
          </el-table>
        </template>
      </el-col>
    </el-row>
    <!--分页栏-->
    <el-row v-if="pageable">
      <el-col :span="24">
        <div class="pagination-wrapper">
          <!-- layout="total, next, pager , prev ,sizes, jumper" -->
          <div class="total">
            共{{ paging.total }}条, 每页{{ paging.pageSize }}条
          </div>
          <el-pagination layout="prev, pager , next , jumper" background :total="paging.total" :current-page="paging.pageNo" :page-sizes="paging.pageSizes" :page-size="paging.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
</style>

<script>
import eventBus from "ASSETS/js/eventBus";
export default {
  name: "wsPageTable",
  components: {},
  props: {
    ignoreSelectionCols: {
      type: Array,
      default: function () {
        return [];
      },
    },
    height: { type: String },
    fixHeight: { type: String },
    fixWidth: { type: String },
    pageable: { type: Boolean, default: false },
    pageInfo: {
      type: Object,
      default: function () {
        return { pageNo: 1, pageSize: 10, pageSizes: [10, 30, 90], total: 0 };
      },
    },
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    rowKey: [String, Function],

    //选择模式:multi,single,null(多选，单选，无)
    selection: { type: String, default: null },
    //是否显示序列号
    showIndex: { type: Boolean, default: false },
    showIndexFixed: { type: Boolean, default: false },
    cellStyle: {
      type: Function,
      default: () => {},
    },
    checkboxSelect: {
      type: Function,
      default: () => {
        return true;
      },
    },
    rowStyle: {
      type: Function,
      default: () => {},
    },
    stripe: { type: Boolean, default: false },
    tableRowClassName: {
      type: Function,
      default: () => {},
    },
    tableCellClassName: {
      type: Function,
      default: () => {},
    },
    expandChange: {
      type: Function,
      default: () => {},
    },
    border: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    //多选状态下  是否需要高亮当前行
    highlightRow:{
      type: Boolean,
      default: false,
    },
    isShadow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedRows: [],
      tableLoading: false,
      clearSelective: true /*是否需要重新刷新选择*/,
      tableHeaderStyle: {
        background: "rgba(243, 243, 243, 1)",
      },
    };
  },
  watch: {
    data: function (newRows, oldRows) {
      if (this.clearSelective) {
        this.selectedRows = [];
      }
      this.clearSelective = true;
    },
  },
  computed: {
    paging() {
      if (sessionStorage.getItem("page")) {
        this.$set(
          this.pageInfo,
          "pageNo",
          parseInt(sessionStorage.getItem("page"))
        );
      }
      return this.pageInfo;
    },
    tableData: function () {
      return this.data;
    },
  },
  methods: {
    setPageNo(pageNo) {
      this.$set(this.pageInfo, "pageNo", pageNo);
    },
    /*每页条数变更后重新加载表格数据*/
    handleSizeChange(val) {
      //console.log(val)
      //console.log('pageSize change:%s', val);
      this.pageInfo.pageSize = val;
      this.$emit("pageChange");
    },
    /*当前页变更时重新加载表格数据*/
    handleCurrentChange(val) {
      //分页存在第一次加载赋值1的问题
      // console.log(val);
      // console.log(this.tableData)
      if (this.pageInfo.pageNo === val) {
        return;
      }
      this.pageInfo.pageNo = val;
      this.$store.commit("setPageNo", val);
      this.$emit("pageChange");
    },
    //多选会触发事件
    tableCheckChange(val) {
      //console.log(val)
      this.selectedRows = val;
    },
    cellDblclick(row, column, cell, event) {
      this.$emit("cellDblclick", row, column, cell, event);
    },
    rowContextmenu(row, column, event) {
      this.$emit("rowContextmenu", row, column, event);
    },
    rowClick(row, column, event) {
      this.$emit("rowClick", row, column, event);
    },
    /*单选*/
    handleRowChange(val) {
      //console.log(val)
      this.selectedRows = [];
      this.selectedRows.push(val);
      this.$emit("current-change", val);
    },
    getCheckedData() {
      return this.getSelectedData();
    },
    getSelectedData() {
      return this.selectedRows;
    },
    /*多选的情况下，实现点击表格任一行选中，除了操作栏和checkbox*/
    cellClick(row, column, cell, event) {
      let target = event.target;
      if (
        this.ignoreSelectionCols.includes(column.label) ||
        target.tagName === "INPUT" ||
        target.classList.contains("el-checkbox__inner") ||
        column.label === "操作" ||
        column.label === ""
      ) {
        return;
      }
      while (target.tagName !== "TR") {
        target = target.parentNode;
      }
      let checkbox = target.querySelector("td .el-checkbox");
      if (checkbox) {
        checkbox.click();
      }

      this.$emit("cellClick", row, column, cell, event);
    },
    /** 排序*/
    moveRows(forward) {
      let rowId = null;
      if (this.rowKey != null && this.rowKey != undefined) {
        if (this.rowKey instanceof Function) {
          rowId = this.rowKey();
        } else {
          rowId = this.rowKey;
        }
      }
      if (rowId) {
      } else {
        this.$alert("请设置table 的 row-key属性,才能支持该操作！", "提示");
        return;
      }

      let tableData = this.data;
      let rows = this.selectedRows;
      if (rows.length == 0) {
        return;
      }

      if (forward) {
        for (let len = tableData.length, i = 0; i < len; i++) {
          let id = tableData[i][rowId];
          let flag = false;
          for (let j in rows) {
            if (rows[j][rowId] === id) {
              flag = true;
              break;
            }
          }
          if (!flag) continue;

          if (i == 0) {
            return;
          }
          this.swapItems(tableData, i, i - 1);
        }
      } else {
        for (let len = tableData.length, i = len - 1; i >= 0; i--) {
          let id = tableData[i][rowId];
          let flag = false;
          for (let j in rows) {
            if (rows[j][rowId] === id) {
              flag = true;
              break;
            }
          }
          if (!flag) continue;
          if (i == len - 1) {
            return;
          }
          this.swapItems(tableData, i, i + 1);
        }
      }

      //标记watch 不要清空selectrow
      this.clearSelective = false;
    },

    // 交换数组元素
    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    clearSelection() {
      this.$refs.pageTable.clearSelection();
    },
  },
  mounted() {
    eventBus.$on("refresh", () => {
      this.$emit("pageChange");
    });
  },
};
</script>

<style lang="scss">
.ws-page-table {
  background-color: #fff;
  .table-img {
    > img {
      display: inline-block;
      vertical-align: middle;
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    > span {
      display: inline-block;
      vertical-align: middle;
      margin-left: 5px;
    }
  }
  .icon-operation {
    i {
      // font-size: 16px;
      cursor: pointer;
      margin-right: 50px;
      color: #468dea;
      &:last-of-type {
        margin-right: 0;
      }
    }
    a {
      margin-right: 50px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .pagination-wrapper {
    background: white;
    display: flex;
    padding-left: 20px;
    align-items: center;
    > div {
      flex: 1;
    }
    .total {
      color: #666;
      flex-basis: auto;
      letter-spacing: 1px;
    }
  }
  .el-pagination {
    margin-top: 15px;
    margin-bottom: 10px;
    text-align: right;
    padding-right: 30px;
  }
  .el-table .waringRow {
    background: #e6503c;
  }

  .el-table .tipRow {
    background: #ffff00;
  }
}
.el-table--enable-row-hover .el-table__body tr:active > td {
  background-color: #e8f1fd;
}
.el-table--enable-row-hover .el-table__body tr.current-row:hover > td {
  background-color: #e8f1fd !important;
}
</style>
