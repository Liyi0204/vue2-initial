
<!--vue中的函数式组件也称为无状态组件，与Flutter中的无状态组件类似，其内部没有任何状态。函数式组件中只接受一个props参数，没有其他参数。-->
<template functional>
  <a-sub-menu :key="props.subMenuArr.MenuID">
    <span slot="title">
      <a-icon :type="props.subMenuArr.Icon" /><span>{{props.subMenuArr.MenuTitle}}</span>
    </span>
    <template v-for="(subMenuItem, subMenuKey) in props.subMenuArr.Children">

      <template v-if="subMenuItem.Children">
        <!--  vue组件自己调用自己  -->
        <menu-Rec :key="subMenuKey.MenuID" :subMenuArr="subMenuItem"></menu-Rec>
      </template>

      <template v-else>
        <a-menu-item :key="subMenuItem.MenuID">
          <a-icon v-if="subMenuItem.Icon" :type="subMenuItem.Icon" />
          <span>{{subMenuItem.MenuTitle}}</span>
          <router-link :to="subMenuItem.MenuPath"></router-link>
        </a-menu-item>
      </template>

    </template>
  </a-sub-menu>
</template>
 
<script>
export default {
  name: "menuRec",
  components: {},
  props: {
    subMenuArr: {},
  },
};
</script>