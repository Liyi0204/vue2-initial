<template>
  <div id="orderList">
    <div class="orderList-meum">
      <div class="meum-item" v-for="(item,index) in menuList" :key="index">
        <div v-if='item.divide' class="divide"></div>
        <a-dropdown-button placement="bottomLeft" @click="handleButtonClick" v-if="item.menuList">
          <a-icon type=" " v-if="item.menuIconUrl" class="myIcon yibiaopanIcon" :style="{backgroundImage:'url('+item.menuIconUrl+')'}"></a-icon>
          {{item.menuName}}
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item :key="items.menuid" v-for="items in item.menuList">
              <a-icon v-if="items.menuIconUrl" type=" " class="myIcon yibiaopanIcon" :style="{backgroundImage:'url('+items.menuIconUrl+')'}"></a-icon>{{items.menuName}}
            </a-menu-item>
          </a-menu>
          <a-icon slot="icon" type="caret-down" />
        </a-dropdown-button>
        <a-button type="primary" v-else>
          <a-icon type=" " v-if="item.menuIconUrl" class="myIcon yibiaopanIcon" :style="{backgroundImage:'url('+item.menuIconUrl+')'}"></a-icon>
          {{item.menuName}}
        </a-button>
      </div>
    </div>
    <div class="orderList-content">
      <a-dropdown :visible="right_clickMenuState" :trigger="['contextmenu']">
        <ws-page-table border :headerCellStyle='tableHeaderStyle' showIndexFixed style="width: 100%" height='818' stripe :data="tableData" ref="pageTable" :pageable="true" @rowContextmenu='rowContextmenu' :pageInfo="pageInfo" @pageChange="loadTableData" @rowClick="rowClick" :showIndex="false" :isShadow="false" :selection="'multi'">
          <el-table-column min-width="160" prop="internalOrderNum" label="内部订单号" ></el-table-column>
          <el-table-column min-width="220" prop="theSellerNote" label="卖家备注"></el-table-column>
          <el-table-column min-width="160" prop="shippingWarehouse" label="发货仓"></el-table-column>
          <el-table-column min-width="200" prop="commodity" label="商品"></el-table-column>
          <el-table-column min-width="100" prop="commodityState" label="状态"></el-table-column>
          <el-table-column min-width="160" prop="orderTime" label="订单时间"></el-table-column>
          <el-table-column min-width="160" prop="deliveryTime" label="发货时间"></el-table-column>
          <el-table-column min-width="160" prop="onlineOrderNum" label="线上订单号"></el-table-column>
          <el-table-column min-width="220" prop="shippingAddress" label="收货地址"></el-table-column>
          <el-table-column min-width="160" prop="confirmDeliveryTime" label="确认收货时间"></el-table-column>
          <el-table-column min-width="220" prop="buyerAccount_PlatformStore" label="买家账号+平台店铺"></el-table-column>
          <el-table-column min-width="120" prop="amountPaid" label="已付金额"></el-table-column>
          <el-table-column min-width="160" prop="expressCompany_TrackingNo" label="快递公司+运单号"></el-table-column>
          <el-table-column min-width="120" prop="amountPayable_Freight" label="应付金额+运费"></el-table-column>
          <el-table-column min-width="220" prop="invoiceTitle_TaxNumber_InvoiceAmount" label="发票抬头+税号+发票金额"></el-table-column>
          <el-table-column min-width="100" prop="weight" label="重量"></el-table-column>
          <el-table-column min-width="160" prop="estimatedDeliveryTime" label="预计发货时间"></el-table-column>
          <el-table-column min-width="160" prop="sign" label="标记"></el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="operation" v-if="Number(scope.row.failNum) > 0" @click="downloadFail(scope.row.id)">查看失败原因</span>
            </template>
          </el-table-column> -->
        </ws-page-table>
        <a-menu slot="overlay">
          <a-menu-item key="1">
            1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            3rd menu item
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    
  </div>
</template>

<script>
import pageTableMixin from "@/mixin/pageTableMixin";
export default {
  data() {
    return {
      right_clickMenuState: false,
      tableHeaderStyle:{
        'background':' rgba(243, 243, 243, 1)',
      },
      tableData: [
        {
          internalOrderNum: "A559562348",
          theSellerNote: "qinhd发放按发放的规范化是的撒大所多所多撒多撒大大多",
          shippingWarehouse: "山东",
          commodity: "渥康全脂 5.0 纯牛奶",
          commodityState:'待发货',
          orderTime:'2022.03.16 18:59:00',
          deliveryTime:'2022.03.16 18:59:00',
          onlineOrderNum:'A22878454587',
          shippingAddress:'福建省厦门市思明区宝龙一城东塔306-1',
          confirmDeliveryTime:'2022.03.16 18:59:00',
          buyerAccount_PlatformStore:'',
          amountPaid:'123.00',
          expressCompany_TrackingNo:'',
          amountPayable_Freight:'123.00',
          invoiceTitle_TaxNumber_InvoiceAmount:'',
          weight:'1kg',
          estimatedDeliveryTime:'2022.03.16 18:59:00',
          sign:''
        },
        {
          internalOrderNum: "A5487875459562348",
          theSellerNote: "qinhd发放按发放的规范化是的撒大所多所多撒多撒大大多",
          shippingWarehouse: "山东",
          commodity: "渥康全脂 5.0 纯牛奶",
          commodityState:'待发货',
          orderTime:'2022.03.16 18:59:00',
          deliveryTime:'2022.03.16 18:59:00',
          onlineOrderNum:'A22878454587',
          shippingAddress:'福建省厦门市思明区宝龙一城东塔306-1',
          confirmDeliveryTime:'2022.03.16 18:59:00',
          buyerAccount_PlatformStore:'',
          amountPaid:'123.00',
          expressCompany_TrackingNo:'',
          amountPayable_Freight:'123.00',
          invoiceTitle_TaxNumber_InvoiceAmount:'',
          weight:'1kg',
          estimatedDeliveryTime:'2022.03.16 18:59:00',
          sign:''
        },
      ],
      menuList: [
        {
          menuid: "1",
          menuName: "新增订单",
          menuMethods: "",
          menuIconUrl: require("../../../assets/images/icon/add-red.png"),
          menuList: [
            {
              menuid: "1-1",
              menuName: "新增订单",
              menuMethods: "",
              menuIconUrl: require("../../../assets/images/icon/add-red.png"),
            },
          ],
        },
        {
          menuid: "2",
          menuName: "审核",
          menuMethods: "",
          menuIconUrl: require("../../../assets/images/icon/succeed.png"),
          divide: true,
        },
        {
          menuid: "3",
          menuName: "转异常",
          menuMethods: "",
          menuIconUrl: require("../../../assets/images/icon/warning.png"),
        },
        {
          menuid: "4",
          menuName: "转正常",
          menuMethods: "",
          menuIconUrl: "",
        },
        {
          menuid: "5",
          menuName: "取消订单",
          menuMethods: "",
          menuIconUrl: "",
        },
        {
          menuid: "6",
          menuName: "设快递",
          menuMethods: "",
          menuIconUrl: "",
          divide: true,
          menuList: [
            {
              menuid: "6-1",
              menuName: "新增订单",
              menuMethods: "",
              menuIconUrl: "",
            },
          ],
        },
        {
          menuid: "6",
          menuName: "修改",
          menuMethods: "",
          menuIconUrl: require("../../../assets/images/icon/edit_red.png"),
          menuList: [
            {
              menuid: "6-1",
              menuName: "新增订单",
              menuMethods: "",
              menuIconUrl: "",
            },
          ],
        },
      ],
    };
  },
  mixins: [pageTableMixin],
  methods: {
    loadTableData() {},
    handleButtonClick() {},
    handleMenuClick() {},
    rowContextmenu(row) {
      console.log(row);
      if (row) {
        this.right_clickMenuState = true;
      }
    },
    rowClick() {
      this.right_clickMenuState = false;
    },
  },
};
</script>

<style lang="less" scoped>
#orderList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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