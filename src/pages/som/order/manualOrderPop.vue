<template>
  <div id="manualOrder">
    <a-modal :width='1200' title="手工下单" :visible="visible" @ok="handleOk" @cancel="close" ok-text="确定" cancel-text="取消">
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="订单基本信息">
          <div class="myFrom-row">
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">店铺名称：</div>
              <a-input></a-input>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">线上订单号：</div>
              <a-input></a-input>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">下单时间：</div>
              <a-input></a-input>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">发货仓库：</div>
              <a-input></a-input>
            </div>
          </div>
          <div class="myFrom-row">
            <div class="myFrom-row-item-long">
              <div class="myFrom-row-label">买家留言：</div>
              <a-input></a-input>
            </div>
          </div>
          <div class="myFrom-row">
            <div class="myFrom-row-item-long">
              <div class="myFrom-row-label">买家备注：</div>
              <a-input></a-input>
            </div>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="买家收货信息">
          <div class="myFrom-row">
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">姓名：</div>
              <a-input></a-input>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">手机：</div>
              <a-input></a-input>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">快递公司：</div>
              <a-input></a-input>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">运费：</div>
              <a-input></a-input>
            </div>
          </div>
          <div class="myFrom-row">
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">收货地址：</div>
              <a-cascader style="width:100%" :options="options" placeholder="请选择收货地址" @change="onChange" />
            </div>
            <div class="myFrom-row-item-long">
              <div class="myFrom-row-label">详细地址：</div>
              <a-input></a-input>
            </div>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="3">
          <template slot="header">
            <p>订单商品<span class="addTheGoods" @click.stop="$refs.merchandiseSelectionPop.visible = true">添加新的商品</span></p>
          </template>
          <ws-page-table style="width: 100%" :data="tableData" ref="pageTable" :pageInfo="pageInfo" @pageChange="loadTableData" :showIndex="false" :isShadow="false">
            <el-table-column min-width="100" prop="productName" label="商品名称"></el-table-column>
            <el-table-column min-width="100" prop="commodityCode" label="商品编码"></el-table-column>
            <el-table-column min-width="100" prop="distributableInventory" label="可配货库存"></el-table-column>
            <el-table-column min-width="100" prop="availableInStock" label="可售库存"></el-table-column>
            <el-table-column min-width="100" prop="originalCost" label="原价"></el-table-column>
          </ws-page-table>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="订单支付情况">
          <div class="myFrom-row">
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">快递公司：</div>
              <a-radio-group name="radioGroup" :default-value="value">
                <a-radio value="1">
                  A
                </a-radio>
                <a-radio value="2">
                  B
                </a-radio>
              </a-radio-group>
            </div>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="5" header="订单发票信息">
          <div class="myFrom-row">
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">发票类型：</div>
              <a-select default-value="lucy" style="width: 100%">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">发票抬头：</div>
              <a-input></a-input>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">发票税号：</div>
              <a-input></a-input>
            </div>
          </div>
          <div class="myFrom-row">
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">电话号码：</div>
              <a-input></a-input>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">发票地址：</div>
              <a-input></a-input>
            </div>
          </div>
          <div class="myFrom-row">
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">开户银行：</div>
              <a-input></a-input>
            </div>
            <div class="myFrom-row-item">
              <div class="myFrom-row-label">银行账户：</div>
              <a-input></a-input>
            </div>
            <!-- <div class="myFrom-row-item-long">
              <div class="myFrom-row-label">发票地址：</div>
              <a-input></a-input>
            </div> -->
          </div>
        </a-collapse-panel>
      </a-collapse>
      <!-- <p>nedsdsds </p> -->
    </a-modal>
    <merchandiseSelectionPop ref="merchandiseSelectionPop" @getGoodsData='getGoodsData'></merchandiseSelectionPop>
  </div>
</template>

<script>
import cities from "ASSETS/js/cities.js";
import merchandiseSelectionPop from "./merchandiseSelectionPop.vue";
import pageTableMixin from "@/mixin/pageTableMixin";
export default {
  data() {
    return {
      visible: false,
      activeKey: ["1", "2", "3", "4", "5"],
      options: cities,
      value: "2",
      tableData:[]
    };
  },

  mounted() {},
  mixins: [pageTableMixin],
  methods: {
    confirmLoading() {},
    loadTableData() {},
    handleOk() {
      this.$emit("manualOrderOK", "aa");
      this.visible = false;
    },
    close() {
      this.visible = false;
    },
    onChange() {},
    getGoodsData(data) {
      console.log(data);
      for(let i in data){
        this.tableData.push(data[i]);
      }
    },
  },
  components: {
    merchandiseSelectionPop,
  },
};
</script>

<style lang="less" scoped>
.myFrom-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1.3% 0;
  width: 100%;
  .myFrom-row-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 30%;
    margin-right: 2.8%;
    .myFrom-row-label {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      white-space: nowrap;
    }
  }
  .myFrom-row-item:last-child {
    margin: 0;
  }
  .myFrom-row-item-long {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .myFrom-row-label {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      white-space: nowrap;
    }
  }
}
/deep/.ant-collapse-content-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
/deep/.ant-modal-body {
  padding: 0;
}
/deep/.ant-collapse-header {
  background: white;
}
.ant-collapse > .ant-collapse-item {
  border: none;
}
/deep/.ant-collapse-item p {
  margin: 0;
}
/deep/.ant-collapse-item .addTheGoods {
  cursor: pointer;
  color: rgba(28, 171, 237, 1);
  margin-left: 12px;
}
/deep/.ant-modal-header {
  border: none;
}

/deep/.ant-collapse-content {
  border: none;
}
/deep/.ant-collapse-content-box {
  padding: 0 3em;
}
</style>