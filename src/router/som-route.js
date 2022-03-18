const frame = {
  template: '<router-view></router-view>'
}

export default {
  path: 'som',
  name: 'som',
  component: frame,
  // children: [{
  //     path: 'orderList',
  //     meta: {
  //       title: '订单列表',
  //     },
  //     component: () => import('PAGES/som/order/orderList.vue')
  //   }

  // ]
}