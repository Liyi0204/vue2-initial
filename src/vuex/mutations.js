export default {
  changeOpenRemember(state, val) {
    state.isOpenRemember = val
  },
  changeActPage(state, val) {
    state.actPage = val;
  },
  delPage(state, val) {
    state.pageTabList.splice(val, 1)
    if (state.actPage >= val) {
      state.actPage -= 1;
    }
  },
  pageJump(state, obj) {
    let arr = state.pageTabList,
      needPush = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].path == obj.path) {
        needPush = false;
        state.actPage = i;
      }
    }
    if (needPush) {
      state.actPage = arr.length;
      state.pageTabList.push({
        title: obj.meta.title || '无标题',
        name: obj.name,
        path: obj.path,
        // canClose:obj.path!='/Home'
      })
    }
  }
}