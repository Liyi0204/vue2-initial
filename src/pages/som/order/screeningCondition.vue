<template>
  <div id="screeningCondition">
    <div class="screeningCondition-header">
      <div class="search-btn">
        <a-button type="primary">
          组合查询
        </a-button>
        <a-button>清空条件</a-button>
      </div>
      <div class="packUp" @click="closeCondition">
        收起
        <a-icon type="left" />
      </div>
    </div>
    <div class="screeningCondition-content">
      <div class="search-input">
        <a-input placeholder="内部订单号"></a-input>
        <a-input placeholder="线上订单号"></a-input>
      </div>
      <div class="Condition">
        <div class="Condition-item">
          <div class="Condition-label">订单状态</div>
          <div class="tree-item">
            <a-tree v-model="checkedKeys" checkable :expanded-keys="expandedKeys" :auto-expand-parent="autoExpandParent" :selected-keys="selectedKeys" :tree-data="treeData" @expand="onExpand" @select="onSelect">
            </a-tree>
          </div>
        </div>
        <div class="Condition-item">
          <div class="Condition-label">平台+店铺</div>
          <div class="tree-item">
            <a-tree v-model="checkedKeys" checkable :expanded-keys="expandedKeys" :auto-expand-parent="autoExpandParent" :selected-keys="selectedKeys" :tree-data="treeData" @expand="onExpand" @select="onSelect">
            </a-tree>
          </div>
        </div>
        <div class="Condition-item">
          <div class="Condition-label">平台+店铺</div>
          <div class="radio-item">
            <a-radio-group v-model="value" @change="onChange">
              <a-radio :style="radioStyle" :value="1">
                Option A
              </a-radio>
              <a-radio :style="radioStyle" :value="2">
                Option B
              </a-radio>
              <a-radio :style="radioStyle" :value="3">
                Option C
              </a-radio>
              <a-radio :style="radioStyle" :value="4">
                More...
                <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />
              </a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="Condition-item" style="height:2000px">

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value:'1',
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px",
      },
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: ["0-0-0"],
      selectedKeys: [],
      treeData: [
        {
          title: "0-0",
          key: "0-0",
          children: [
            {
              title: "0-0-0",
              key: "0-0-0",
              children: [
                { title: "0-0-0-0", key: "0-0-0-0" },
                { title: "0-0-0-1", key: "0-0-0-1" },
                { title: "0-0-0-2", key: "0-0-0-2" },
              ],
            },
            {
              title: "0-0-1",
              key: "0-0-1",
              children: [
                { title: "0-0-1-0", key: "0-0-1-0" },
                { title: "0-0-1-1", key: "0-0-1-1" },
                { title: "0-0-1-2", key: "0-0-1-2" },
              ],
            },
            {
              title: "0-0-2",
              key: "0-0-2",
            },
          ],
        },
        {
          title: "0-1",
          key: "0-1",
          children: [
            { title: "0-1-0-0", key: "0-1-0-0" },
            { title: "0-1-0-1", key: "0-1-0-1" },
            { title: "0-1-0-2", key: "0-1-0-2" },
          ],
        },
        {
          title: "0-2",
          key: "0-2",
        },
      ],
    };
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    },
  },
  methods: {
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    closeCondition() {
      this.$emit("closeCondition", true);
    },
    onChange(){}
  },
};
</script>
<style lang="less" scoped>
#screeningCondition {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .screeningCondition-header {
    height: 5%;
    width: 100%;
    background: white;
    padding: 0 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .search-btn {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 70%;
      height: 100%;
      .ant-btn {
        margin-right: 5%;
      }
      .ant-btn {
        width: 50%;
        height: 60%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 0;
        padding: 0;
      }
    }
    .packUp {
      width: 30%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      color: rgba(24, 144, 255, 1);
      cursor: pointer;
    }
  }
  .screeningCondition-content {
    height: 95%;
    width: 100%;
    overflow: auto;
    .search-input {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .ant-input {
        width: 90%;
        margin: 2% 0;
      }
    }

    .search-item {
      width: 100%;
      background: white;
    }
    .Condition {
      width: 100%;
      padding: 0 5%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .Condition-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        background: white;
        padding: 5% 5%;
        margin-top: 3%;
        .tree-item {
          width: 100%;
          position: relative;
          /deep/.ant-tree-switcher {
            position: absolute;
            right: 0%;
          }
        }
        .radio-item{
          width: 100%;
        }
      }
    }
  }
}
</style>