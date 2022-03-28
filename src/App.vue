<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang='less'>
@import "../src/assets/font/font.css";
#app {
  font-family: HOSCM;
  font-size: @font-size-12;
  /*---滚动条默认显示样式--*/
  ::-webkit-scrollbar-thumb {
    background-color: rgba(227, 227, 227, 1);
    outline-offset: -2px;
    outline: 4px solid rgba(227, 227, 227, 1);
    border-radius: 4px;
    border: 42px solid rgba(227, 227, 227, 1);
  }

  /*---鼠标点击滚动条显示样式--*/
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(227, 227, 227, 1);
    border-radius: 4px;
  }

  /*---滚动条大小--*/
  ::-webkit-scrollbar {
    width: 0px;
    height: 8px;
  }

  /*---滚动框背景样式--*/
  ::-webkit-scrollbar-track-piece {
    background-color: #fff;
    border-radius: 4px;
  }
}
</style>
