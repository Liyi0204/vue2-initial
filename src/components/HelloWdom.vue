<template>
  <div class="hello">
  <a-dropdown>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
        <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
        <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
      </a-menu>
      <a-button style="margin-left: 8px"> Button <a-icon type="down" /> </a-button>
    </a-dropdown>
    <ws-page-table
              stripe
              :data="tableData"
              ref="pageTable"
              :pageable="true"
              :pageInfo="pageInfo"
              @pageChange="loadTableData"
              :showIndex="false"
              :isShadow="false"
              :selection="'multi'"
      >
        <el-table-column prop="batch" label="批次"  fixed></el-table-column>
        <el-table-column prop="importTime" label="导入时间" width="180"></el-table-column>
        <el-table-column prop="progress" label="进度"></el-table-column>
        <el-table-column prop="sumNum" label="总条数"></el-table-column>
        <el-table-column prop="successNum" label="成功条数"></el-table-column>
        <el-table-column prop="failNum" label="失败条数"></el-table-column>
        <el-table-column prop="insertOrderNum" label="合单后条数"></el-table-column>
        <el-table-column prop="batchOrderPayState" label="支付状态"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
                    class="operation"
                    v-if="Number(scope.row.failNum) > 0"
                    @click="downloadFail(scope.row.id)"
            >查看失败原因</span>
            <!-- <span class="operation" v-else>撤销</span> -->
          </template>
        </el-table-column>
      </ws-page-table>
  </div>
</template>

<script>
import pageTableMixin from "@/mixin/pageTableMixin";
export default {
  name: "HelloWorld",
  data() {
    return {
      // property: 'value',
      tableData: [
        {
          batch: "12",
        },
        {
          batch: "12",
        },
        {
          batch: "12",
        },
        {
          batch: "12",
        },
      ],
    };
  },
  mixins: [pageTableMixin],
  methods:{
    loadTableData(){}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .hello {
//   width: 100vh;
//   height: 100vh;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// }
</style>
