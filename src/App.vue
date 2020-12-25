<template>
  <div id="app">
      <router-view /> 
  </div>
</template>

<style lang="scss">
.v-enter {
  // v-enter：定义进入过渡的开始状态。元素被插入之前生效，在元素被插入之后的下一帧移除
  transition: all 0.5s ease;
  // transform: translateX(100%);
  opacity: 1;
}
.v-enter-active{
  transition: all 1s ease;
  // transform: translateX(100%);
  opacity: 1;
}
.v-leave {
  // v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态
  transition: all 0.5s ease;
  opacity: 0;
}
.v-leave-active {
  // v-enter-active：定义进入过渡生效时的状态
  // v-leave-active：定义离开过渡生效时的状态
  transition: all 0.5s ease;
  opacity: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0;
  height: auto;
}
 
 
</style>
