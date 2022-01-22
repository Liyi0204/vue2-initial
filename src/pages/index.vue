<template>
  <a-layout class="pageAll">
    <a-layout-sider breakpoint="sm" collapsed-width="80" :trigger='null' :collapsed="collapsed" collapsible>
      <!-- theme="light" -->
      <div class="mySider">
        <div class="sider-top">
          <div class="Navlogo">
            <img :class="collapsed?'img_small':'img_medium'" src='../assets/images/logo/logo_01.png'>
          </div>
          <a-menu mode="inline" :inlineCollapsed="collapsed">
            <template v-for="nav in NavBarData">
              <a-sub-menu v-if='nav.Children' :key="nav.MenuID">
                <span slot="title">
                  <a-icon v-if="nav.Icon" :type="nav.Icon" />
                  <span>{{nav.MenuTitle}}</span>
                </span>
                <template v-for="nChild in nav.Children">
                  <menu-Rec v-if='nChild.Children' :subMenuArr="nChild" :key="nChild.MenuID"></menu-Rec>
                  <a-menu-item v-else :key="nChild.MenuID">
                    <a-icon v-if="nChild.Icon" :type="nChild.Icon" />
                    <span>{{nChild.MenuTitle}}</span>
                    <router-link :to="nChild.MenuPath"></router-link>
                  </a-menu-item>
                </template>
              </a-sub-menu>
              <a-menu-item v-else :key="nav.MenuID">
                <a-icon v-if="nav.Icon" :type="nav.Icon" />
                <span>{{nav.MenuTitle}}</span>
                <router-link :to="nav.MenuPath"></router-link>
              </a-menu-item>
            </template>
          </a-menu>
        </div>
        <div class="sider-bottom">
          <a-menu mode="inline" :inlineCollapsed="collapsed">
            <a-menu-item>
              <a-icon type="bell" />
              <span>通知</span>
              <!-- <router-link :to="nav.MenuPath"></router-link> -->
            </a-menu-item>
            <a-menu-item>
              <a-icon type="user" />
              <span>user</span>
              <!-- <router-link :to="nav.MenuPath"></router-link> -->
            </a-menu-item>
          </a-menu>
          <div class="openMenu" @click="() => (collapsed = !collapsed)">
            <a-icon :type="collapsed ? 'right' : 'left'" class="triggerIcon headTool" />
          </div>
        </div>
      </div>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header class="pageHead">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="triggerIcon headTool" @click="() => (collapsed = !collapsed)" />
        <a-switch class="openMethod headTool" checked-children="Tab" un-checked-children="Cover" :checked="isOpenRemember" @change="changeOpenType" />
      </a-layout-header> -->
      <a-layout-content class="pageCont">
        <a-spin tip="Loading..." :spinning="loading">
          <a-tabs v-show='isOpenRemember' size="small" class="pgTab" :activeKey="actPage" hide-add type="editable-card" @tabClick="changePage" @edit="onDelPage">
            <a-tab-pane v-for="(pg,pgInd) in pageTabList" :key="pgInd" :tab="pg.title" :closable="pgInd!=0">
            </a-tab-pane>
          </a-tabs>
          <router-view class="moduleAll" :class="{hasTab:isOpenRemember}" />
        </a-spin>
      </a-layout-content>
      <!-- <a-layout-footer style="textAlign: center">
			Ant Design ©2022 Created by Ant UED
		  </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
import menuRec from "COMPS/menuRec";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isOpenRemember", "pageTabList", "actPage"]),
  },
  data() {
    return {
      loading: true,
      collapsed: true,
      openNavList: [],
      NavBarData: [
        {
          MenuTitle: "Example",
          Icon: "deployment-unit",
          MenuID: 100,
          Children: [
            {
              MenuID: 101,
              MenuTitle: "Option 5",
              Icon: "deployment-unit",
              MenuPath: "/HomeVue",
              Children: [
                {
                  MenuID: 200,
                  MenuTitle: "模块",
                  MenuPath: "/HomeVue",
                  Icon: "deployment-unit",
                  Children: [
                    {
                      MenuID: 202,
                      MenuTitle: "模块12",
                      MenuPath: "/HomeVue",
                      Icon: "deployment-unit",
                    },
                  ],
                },
              ],
            },
            {
              MenuID: 102,
              MenuTitle: "模块二",
              Icon: "deployment-unit",
              MenuPath: "/lo",
            },
            {
              MenuID: 103,
              MenuTitle: "实例页面",
              MenuPath: "/ExamplePage",
              Icon: "deployment-unit",
            },
          ],
        },
        {
          MenuTitle: "公司管理",
          Icon: "user",
          MenuID: 1,
          MenuPath: "/som/kk",
        },
        {
          MenuTitle: "数据管理",
          Icon: "hdd",
          MenuID: 5,
          MenuPath: "/som",
        },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      //假装加载。。。
      this.loading = false;
    }, 500);
  },
  components: {
    menuRec,
  },
  methods: {
    changeOpenType(e) {
      // console.log(e);
      this.$store.commit("changeOpenRemember", e);
    },
    changePage(e) {
      // console.log(e);
      if (e != this.actPage) {
        this.$store.commit("changeActPage", e);
        this.$router.push({ path: this.pageTabList[e].path });
      }
    },
    onDelPage(e) {
      // console.log('del',e);
      let arr = this.pageTabList,
        len = arr.length;
      if (e == len - 1 && this.actPage == e) {
        //删的是最后一页
        this.$router.push({ path: this.pageTabList[len - 2].path });
      }
      this.$store.commit("delPage", e);
    },
    onOpenNav(e) {
      // console.log(e);
      let endKey = e.pop();
      this.openNavList = endKey ? [endKey] : [];
    },
  },
};
</script>

<style lang="less" scoped>
.pageAll {
  width: 100vw;
  height: 100vh;
  .Navlogo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    .img_medium {
      width: 50px;
      height: 50px;
    }
    .img_small {
      width: 36px;
      height: 36px;
    }
    .anticon {
      margin-right: 5px;
    }
  }
  .mySider {
    width: 100%;
    height: 100%;
    display: flex;
    background: @primary-color;
    flex-direction: column;
    justify-content: space-between;
    .sider-top{
      padding: 0;
      margin: 0;
      /deep/.ant-menu-inline{
        border-right: 1px solid @primary-color;
      }
      /deep/.ant-menu-vertical{
        border-right: 1px solid @primary-color;
      }
    }
    .sider-bottom {
      .openMenu {
        width: 100%;
        height: 50px;
        background: @menu-swith-bg;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0;
      }
      .triggerIcon {
        font-size: 14px;
        line-height: 100%;
        cursor: pointer;
        color: @menu-item-color;
        transition: color 0.3s;
      }
      /deep/.ant-menu-inline{
        border-right: 1px solid @primary-color;
      }
      /deep/.ant-menu-vertical{
        border-right: 1px solid @primary-color;
      }
    }
  }
  .pageHead {
    padding: 0;
    display: flex;
    align-items: center;
    .headTool {
      margin: 0 10px;
    }
  }
  .pageCont {
    overflow: hidden;
    padding: 10px;
    height: 100%;
    .pgTab/deep/ {
      .ant-tabs-bar {
        margin: 0;
      }
      /deep/.ant-tabs-card-bar,
      .ant-tabs-tab {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
      }
    }
    .moduleAll {
      width: 100%;
      background-color: #ffffff;
      height: calc(100vh - 64px - 20px);
      overflow-y: auto;
      &.hasTab {
        height: calc(100vh - 8px);
      }
    }
  }
}
</style>
