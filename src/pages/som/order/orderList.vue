<template>
  <div id="orderList" @mousedown="clickLeftMouse">
    <div class="left_main" :class="{ left_main_shou: !openStatus }">
      <screeningCondition @closeCondition='closeCondition'></screeningCondition>
    </div>
    <div class="right_main" :class="{ right_main_show: !openStatus }">
      <div class="orderList-meum">
        <div class="meum-item" v-for="(item,index) in menuList" :key="index">
          <div v-if='item.divide' class="divide"></div>
          <a-dropdown placement="bottomLeft" v-if="item.menuList">
            <a-menu slot="overlay">
              <a-menu-item :key="items.menuid" v-for="items in item.menuList" @click="handleMenuClick(items.menuid)">
                <a-icon v-if="items.menuIconUrl" type=" " class="myIcon yibiaopanIcon" :style="{backgroundImage:'url('+items.menuIconUrl+')'}"></a-icon>{{items.menuName}}
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              <a-icon type=" " v-if="item.menuIconUrl" class="myIcon yibiaopanIcon" :style="{backgroundImage:'url('+item.menuIconUrl+')'}"></a-icon> {{item.menuName}}
              <a-icon type="caret-down" />
            </a-button>
          </a-dropdown>
          <a-button type="primary" @click="handleMenuClick(item.menuid)" v-else>
            <a-icon type=" " v-if="item.menuIconUrl" class="myIcon yibiaopanIcon" :style="{backgroundImage:'url('+item.menuIconUrl+')'}"></a-icon>
            {{item.menuName}}
          </a-button>
        </div>
      </div>
      <div class="orderList-content">
        <a-dropdown :visible="right_clickMenuState" :trigger="['contextmenu']" overlayClassName="contextMenu">
          <ws-page-table border showIndexFixed style="width: 100%" height='818' stripe :data="tableData" ref="pageTable" :pageable="true" @rowContextmenu='rowContextmenu' :pageInfo="pageInfo" @pageChange="loadTableData" @rowClick="rowClick" :showIndex="false" :isShadow="false" :selection="'multi'" highlightRow>
            <el-table-column min-width="160" prop="internalOrderNum" label="内部订单号">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.internalOrderNum}}</div>
                <div class="tag-operation">
                  <div class="teg-item" @click="copyClick(scope.row.internalOrderNum)">复</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="220" prop="theSellerNote" label="卖家备注">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.theSellerNote}}</div>
                <div class="tag-operation">
                  <div class="teg-item">标</div>
                  <div class="teg-item">改</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="160" prop="shippingWarehouse" label="发货仓">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.shippingWarehouse}}</div>
                <div class="tag-operation">
                  <div class="teg-item">改</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="200" prop="commodity" label="商品">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.commodity}}</div>
                <div class="tag-operation">
                  <div class="teg-item">改</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="100" prop="commodityState" label="状态"></el-table-column>
            <el-table-column min-width="160" prop="orderTime" label="订单时间"></el-table-column>
            <el-table-column min-width="160" prop="deliveryTime" label="发货时间"></el-table-column>
            <el-table-column min-width="160" prop="onlineOrderNum" label="线上订单号">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.onlineOrderNum}}</div>
                <div class="tag-operation">
                  <div class="teg-item">复</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="220" prop="shippingAddress" label="收货信息">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.shippingAddress}}</div>
                <div class="tag-operation">
                  <div class="teg-item">改</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="160" prop="confirmDeliveryTime" label="确认收货时间"></el-table-column>
            <el-table-column min-width="160" prop="buyerMessage" label="买家留言">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.buyerMessage}}</div>
                <div class="tag-operation">
                  <div class="teg-item">标</div>
                  <div class="teg-item">改</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="220" prop="buyerAccount_PlatformStore" label="买家账号+平台店铺">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.buyerAccount_PlatformStore}}</div>
                <div class="tag-operation">
                  <div class="teg-item">复</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="120" prop="amountPaid" label="已付金额"></el-table-column>
            <el-table-column min-width="160" prop="expressCompany_TrackingNo" label="快递公司+运单号">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.expressCompany_TrackingNo}}</div>
                <div class="tag-operation">
                  <div class="teg-item">改</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="120" prop="amountPayable_Freight" label="应付金额+运费"></el-table-column>
            <el-table-column min-width="220" prop="invoiceTitle_TaxNumber_InvoiceAmount" label="发票抬头+税号+发票金额"></el-table-column>
            <el-table-column min-width="100" prop="weight" label="重量"></el-table-column>
            <el-table-column min-width="160" prop="estimatedDeliveryTime" label="预计发货时间">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.estimatedDeliveryTime}}</div>
                <div class="tag-operation">
                  <div class="teg-item">改</div>
                </div>
              </div>
            </el-table-column>
            <el-table-column min-width="160" prop="sign" label="标记">
              <div class="table-tag" slot-scope="scope">
                <div class="tag-content">{{scope.row.sign}}</div>
                <div class="tag-operation">
                  <div class="teg-item">改</div>
                </div>
              </div>
            </el-table-column>
            <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="operation" v-if="Number(scope.row.failNum) > 0" @click="downloadFail(scope.row.id)">查看失败原因</span>
            </template>
          </el-table-column> -->
          </ws-page-table>
          <a-menu slot="overlay">
            <a-menu-item :key="item.menuid" v-for="item in arrayContextMenu">
              <a-menu :selectable='false' @click="handleMenuClick" destroyPopupOnHide>
                <a-menu-item :key="items.menuid" v-for="items in item.menuItemList">
                  {{items.menuName}}
                </a-menu-item>
              </a-menu>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="screeningCondition" :class="{ screeningCondition_show: !openStatus }" @click="openStatus = false">
        筛选条件
        <a-icon type="double-right" />
      </div>
    </div>
    <manualOrderPop ref="manualOrder" @manualOrderOK='manualOrderOK'></manualOrderPop>
  </div>
</template>

<script>
import pageTableMixin from "@/mixin/pageTableMixin";
import manualOrderPop from "./manualOrderPop";
import screeningCondition from "./screeningCondition";
export default {
  data() {
    return {
      openStatus: true,
      right_clickMenuState: false,
      arrayContextMenu: [
        {
          menuItemID: "1",
          menuItemList: [
            {
              menuid: "1",
              menuName: "订单号：",
            },
            {
              menuid: "2",
              menuName: "审核",
            },
            {
              menuid: "3",
              menuName: "转异常",
            },
            {
              menuid: "4",
              menuName: "转正常",
            },
            {
              menuid: "5",
              menuName: "售后：退货 | 换货 | 退款",
            },
          ],
        },
        {
          menuItemID: "2",
          menuItemList: [
            {
              menuid: "6",
              menuName: "设快递",
            },
            {
              menuid: "7",
              menuName: "改卖家备注",
            },
            {
              menuid: "8",
              menuName: "改标记",
            },
            {
              menuid: "9",
              menuName: "改发货仓",
            },
            {
              menuid: "10",
              menuName: "改商品",
            },
          ],
        },
        {
          menuItemID: "3",
          menuItemList: [
            {
              menuid: "11",
              menuName: "合并订单",
            },
            {
              menuid: "12",
              menuName: "拆分订单",
            },
            {
              menuid: "13",
              menuName: "订单详情",
            },
            {
              menuid: "14",
              menuName: "复制订单号",
            },
            {
              menuid: "15",
              menuName: "复制线上订单号",
            },
          ],
        },
      ],
      tableData: [
        {
          internalOrderNum: "A559562348",
          theSellerNote: "qinhd发放按发放的规范化是的撒大所多所多撒多撒大大多",
          shippingWarehouse: "山东",
          commodity: "渥康全脂 5.0 纯牛奶",
          commodityState: "待发货",
          orderTime: "2022.03.16 18:59:00",
          deliveryTime: "2022.03.16 18:59:00",
          onlineOrderNum: "A22878454587",
          shippingAddress: "福建省厦门市思明区宝龙一城东塔306-1",
          confirmDeliveryTime: "2022.03.16 18:59:00",
          buyerMessage: "快发货",
          buyerAccount_PlatformStore: "",
          amountPaid: "123.00",
          expressCompany_TrackingNo: "",
          amountPayable_Freight: "123.00",
          invoiceTitle_TaxNumber_InvoiceAmount: "",
          weight: "1kg",
          estimatedDeliveryTime: "2022.03.16 18:59:00",
          sign: "",
        },
        {
          internalOrderNum: "A5487875459562348",
          theSellerNote: "qinhd发放按发放的规范化是的撒大所多所多撒多撒大大多",
          shippingWarehouse: "山东",
          commodity: "渥康全脂 5.0 纯牛奶",
          commodityState: "待发货",
          orderTime: "2022.03.16 18:59:00",
          deliveryTime: "2022.03.16 18:59:00",
          onlineOrderNum: "A22878454587",
          shippingAddress: "福建省厦门市思明区宝龙一城东塔306-1",
          confirmDeliveryTime: "2022.03.16 18:59:00",
          buyerMessage: "快发货",
          buyerAccount_PlatformStore: "",
          amountPaid: "123.00",
          expressCompany_TrackingNo: "",
          amountPayable_Freight: "123.00",
          invoiceTitle_TaxNumber_InvoiceAmount: "",
          weight: "1kg",
          estimatedDeliveryTime: "2022.03.16 18:59:00",
          sign: "",
        },
      ],
      menuList: [
        {
          menuid: "1",
          menuName: "新增订单",
          menuIconUrl: require("../../../assets/images/icon/add-red.png"),
          menuList: [
            {
              menuid: "1-1",
              menuName: "新增订单",
              menuIconUrl: require("../../../assets/images/icon/add-red.png"),
            },
          ],
        },
        {
          menuid: "2",
          menuName: "审核",
          menuIconUrl: require("../../../assets/images/icon/succeed.png"),
          divide: true,
        },
        {
          menuid: "3",
          menuName: "转异常",
          menuIconUrl: require("../../../assets/images/icon/warning.png"),
        },
        {
          menuid: "4",
          menuName: "转正常",
          menuIconUrl: "",
        },
        {
          menuid: "5",
          menuName: "取消订单",
          menuIconUrl: "",
        },
        {
          menuid: "6",
          menuName: "设快递",
          menuIconUrl: "",
          divide: true,
          menuList: [
            {
              menuid: "6-1",
              menuName: "新增订单",
              menuIconUrl: "",
            },
          ],
        },
        {
          menuid: "6",
          menuName: "修改",
          menuIconUrl: require("../../../assets/images/icon/edit_red.png"),
          menuList: [
            {
              menuid: "6-1",
              menuName: "新增订单",
              menuIconUrl: "",
            },
          ],
        },
      ],
    };
  },
  components: {
    manualOrderPop,
    screeningCondition,
  },
  mixins: [pageTableMixin],
  methods: {
    loadTableData() {},
    handleMenuClick(menuid) {
      console.log(menuid);
      this.right_clickMenuState = false;
      if (menuid == "1-1") {
        this.$refs.manualOrder.visible = true;
      }
    },
    manualOrderOK(e) {
      console.log(e);
    },
    rowContextmenu(row) {
      console.log(row);
      if (row) {
        this.right_clickMenuState = true;
      }
    },
    rowClick() {
      this.right_clickMenuState = false;
    },
    clickLeftMouse() {
      this.right_clickMenuState = false;
    },
    copyClick(data) {
      let url = data;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      this.$message.success("复制完成");
      oInput.remove();
    },
    openManualOrder() {},
    closeCondition(e){
      this.openStatus=e;
    },
  },
};
</script>

<style lang="less" scoped>
#orderList {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  // width: 100%;
  .left_main {
    width: 0%;
    height: 100%;
    visibility: hidden;
    position: relative;
    left: -13%;
    transition: width 1s, left 1s, visibility 1s;
    -webkit-transition: width 1s, left 1s, visibility 1s;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .right_main {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: calc(100% - 0%);
    transition: width 1s;
    -webkit-transition: width 1s;
    height: 100%;
    .orderList-meum {
      width: 100%;
      height: 5%;
      background: white;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      border: 1px solid rgba(227, 227, 227, 1);
      .meum-item {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .ant-btn-group {
          width: 100%;
          height: 100%;
          display: flex;
          margin: 0;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          /deep/.ant-btn {
            border-color: white;
            background: none;
            border: 0;
            height: 100%;
            border-radius: 0;
          }
          /deep/.ant-btn:nth-child(1) {
            color: rgba(28, 171, 237, 1);
            font-size: @font-size-12;
          }
          /deep/.ant-btn:nth-child(2) {
            font-size: 80%;
          }
        }
        .ant-btn {
          background: none;
          height: 100%;
          border: none;
          border-radius: 0;
          text-shadow: none;
          box-shadow: none;
          color: rgba(28, 171, 237, 1);
        }
      }
      .meum-item :hover {
        background: rgba(60, 149, 247, 1);
        color: white;
      }
      .meum-item :hover > .ant-btn {
        background: rgba(60, 149, 247, 1);
        color: white;
      }
      /deep/.meum-item:hover > .ant-btn-group > .ant-btn {
        background: rgba(60, 149, 247, 1);
        color: white;
      }
    }
    .orderList-content {
      width: 100%;
      height: 95%;
      .table-tag {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .tag-content {
          flex: 9;
        }
        .tag-operation {
          position: absolute; //如果tag大于两个，这两行就要去掉
          right: 2%; //如果tag大于两个，这两行就要去掉
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          display: none;
          .teg-item {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 80%;
            margin-top: 6px;
            background: rgba(86.69999999999999, 201.70499999999998, 255, 1);
            color: white;
            font-size: 0.625rem;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
      .hover-row,
      .current-row {
        .table-tag {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          .tag-content {
            flex: 9;
          }
          .tag-operation {
            position: absolute; //如果tag大于两个，这两行就要去掉
            right: 2%; //如果tag大于两个，这两行就要去掉
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            .teg-item {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              width: 23px;
              margin-top: 6px;
              background: rgba(86.69999999999999, 201.70499999999998, 255, 1);
              color: white;
              font-size: 0.625rem;
              border-radius: 50%;
              cursor: pointer;
            }
            .teg-item:hover {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              width: 23px;
              margin-top: 6px;
              background: rgb(255, 0, 0);
              color: white;
              font-size: 0.625rem;
              border-radius: 50%;
              cursor: pointer;
            }
          }
        }
      }
      /deep/.el-table__body tr.current-row > td.el-table__cell {
        background: rgba(255, 229, 150, 1);
      }
    }
    .screeningCondition {
      position: absolute;
      top: 40%;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      text-align: center;
      color: white;
      width: 1%;
      padding: 0.8%;
      background: rgba(24, 144, 255, 1);
      border-radius: 0 5% 5% 0;
      visibility: visible;
      // transition: visibility 1s;
      // -webkit-transition: visibility 1s;
      cursor: pointer;
      .anticon {
        margin: 5px 0;
      }
    }
    .screeningCondition_show {
      visibility:hidden;
      // transition: visibility 1s;
      // -webkit-transition: visibility 1s;
    }
  }
  .left_main_shou {
    width: 13%;
    left: 0%;
    visibility: visible;
  }
  .right_main_show {
    width: calc(100% - 13%);
  }
}
.contextMenu {
  .ant-dropdown-menu-item {
    border-radius: 0;
    padding: 0;
    .ant-menu {
      background: white;
      color: rgba(102, 102, 102, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      .ant-menu-item {
        margin: 0px;
      }
    }
    .ant-dropdown-menu-item:last-child {
      border-bottom: none;
    }
    .ant-menu-item-active {
      background: white;
      background: rgba(60.00000000000003, 149.00000000000003, 247, 1);
    }
  }
  .ant-dropdown-menu {
    padding: 0;
  }
}

.ant-dropdown-menu-item {
  border-radius: 0;
}
.ant-dropdown-menu-item-active {
  background: rgba(60.00000000000003, 149.00000000000003, 247, 1) !important;
  color: white;
}
.ant-dropdown-open {
  background: rgba(60.00000000000003, 149.00000000000003, 247, 1) !important;
  color: white !important;
}

.divide {
  width: 1px;
  height: 50%;
  border: 1px solid rgba(201, 201, 201, 1);
  margin: 0 1px;
}
</style>