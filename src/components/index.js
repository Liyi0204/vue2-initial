import PageTable from "./widgets/pageTable"

const components = [
  PageTable
]


// 只要在index.js里规定了install方法，就可以向其他ui组件库那样，使用Vue.use()来全局使用
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}