<template>
  <div id="merchandiseSelection">
    <a-modal :width='1200' title="商品选择" :visible="visible" @ok="handleOk" @cancel="close" ok-text="确定" cancel-text="取消">
      <ws-page-table style="width: 100%" :data="tableData" ref="pageTable" :pageable="true" :pageInfo="pageInfo" @pageChange="loadTableData" :showIndex="false" :isShadow="false" :selection="'multi'">
        <el-table-column min-width="100" prop="productName" label="商品名称"></el-table-column>
        <el-table-column min-width="100" prop="commodityCode" label="商品编码"></el-table-column>
        <el-table-column min-width="100" prop="distributableInventory" label="可配货库存"></el-table-column>
        <el-table-column min-width="100" prop="availableInStock" label="可售库存"></el-table-column>
        <el-table-column min-width="100" prop="originalCost" label="原价"></el-table-column>
      </ws-page-table>
    </a-modal>
  </div>
</template>

<script>
import pageTableMixin from "@/mixin/pageTableMixin";
export default {
  data() {
    return {
      visible: false,
      tableData:[
        {
          productName:'哈哈哈哈哈',
          commodityCode:'1*pkq，1*jng',
          distributableInventory:'14,000',
          availableInStock:'14,000',
          originalCost:'123.83'
        }
      ]
    };
  },
  mixins: [pageTableMixin],
  mounted() {
   
  },
  methods: {
    loadTableData() {},
    handleOk() {
      let selected = this.$refs.pageTable.getSelectedData();
      this.$emit("getGoodsData", selected);
      this.$refs.pageTable.clearSelection();
      this.visible = false;
    },
    close() {
      this.visible = false;
    },
  },
};
</script>