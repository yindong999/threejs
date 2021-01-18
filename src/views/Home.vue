<template>
  <!-- 动态组件 -->
  <div>
    <div style="display: flex; align-items: center">
      <el-tag>Three.js中文教程</el-tag>
      <i
        :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        style="
          font-size: 20px;
          border: 1px solid #000;
          margin-left: 10px;
          border-radius: 3px;
        "
      ></i> 
    </div>
    <div style="display: flex">
      <div :style="{ width: isCollapse ? '63px' : '200px' }" class="sideBar">
        <el-menu
          :router="true"
          background-color="#F8DBDB"
          text-color="#000"
          default-active="menuOne"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="select"
        >
          <template v-for="(item) in menuList">
            <el-submenu
              v-if="item.childrenMenu && item.childrenMenu.length > 0"
              :key="item.id"
              :index="item.menuPath"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title"  :style="{
                      opacity: !isCollapse ? 1 : 0,
                      transition: !isCollapse ? 'all 1.5s' : 'all 0.5s',
                    }">{{item.firstMenuName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="one.menuPath" v-for="(one,num) in item.childrenMenu" :key="num" :style="{width: isCollapse ? '63px' : '100px'}"> 
                   <el-tooltip
                    class="item"
                    effect="dark"
                    :content="one.menuName"
                    placement="right"
                    v-if="isCollapse"
                  >
                    <i :class="one.icon"></i>
                  </el-tooltip>
                  <i :class="one.icon" v-if="!isCollapse"></i>
                  <span
                    slot="title"
                    :style="{
                      opacity: !isCollapse ? 1 : 0,
                      transition: !isCollapse ? 'all 1.5s' : 'all 0.5s',
                    }"
                    >{{ one.menuName }}</span
                  >
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.menuPath" :key="item.id">
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.menuName"
                placement="right"
              >
                <i :class="item.icon"></i>
              </el-tooltip>
              <i :class="item.icon" v-if="!isCollapse"></i>
              <span
                slot="title"
                :style="{
                  opacity: !isCollapse ? 1 : 0,
                  transition: !isCollapse ? 'all 1.5s' : 'all 0.5s',
                }"
                >{{ item.menuName }}</span
              >
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div
        :style="{
          border: '1px solid red',
          width: isCollapse ? 'calc(100% - 63px)' : 'calc(100% - 200px)',
        }"
        class="sideBar"
      >
        <router-view />
 
      </div>
    </div>
 
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
 
      isCollapse: false,
      menuList: [
        {
          id: 1,
          firstMenuName: "入门介绍",
          icon: "el-icon-menu",
          menuPath: "createScene",
          childrenMenu: [
            {
              id: 1,
              menuName: "创建一个场景",
              icon: "el-icon-platform-eleme",
              menuPath: "createScene",
              childrenMenu: [],
            },
            {
              id: 2,
              menuName: "矩阵变换",
              icon: "el-icon-user-solid",
              menuPath: "matrixTransformation",
              childrenMenu: [],
            },
            {
              id: 200,
              menuName: "菜单二",
              icon: "el-icon-user-solid",
              menuPath: "menuTwo",
              childrenMenu: [],
            },
          ],
        },
        {
          id: 2,
          firstMenuName: "开启Threejs之旅",
          icon: "el-icon-menu",
          menuPath: "firstFrame",
          childrenMenu: [
            {
              id: 1,
              menuName: "第一个框架",
              icon: "el-icon-platform-eleme",
              menuPath: "firstFrame",
              childrenMenu: [],
            }, 
          ],
        },
        {
          id: 3,
          firstMenuName: "点、线、面",
          icon: "el-icon-menu",
          menuPath: "pointerLineOne",
          childrenMenu: [
            {
              id: 1,
              menuName: "点线面(一）",
              icon: "el-icon-platform-eleme",
              menuPath: "pointerLineOne",
              childrenMenu: [],
            }, 
            {
              id: 2,
              menuName: "点线面(二）",
              icon: "el-icon-platform-eleme",
              menuPath: "pointerLineTwo",
              childrenMenu: [],
            }, 
          ],
        },
        {
          id: 4,
          firstMenuName: "让场景动起来",
          icon: "el-icon-menu",
          menuPath: "screenMove",
          childrenMenu: [
             {
              id: 1,
              menuName: "让场景动起来",
              icon: "el-icon-platform-eleme",
              menuPath: "screenMove",
              childrenMenu: [],
            }, 
          ],
        },
        {
          id: 5,
          firstMenuName: "三维空间的观察",
          icon: "el-icon-menu",
          menuPath: "threeSpace1",
          childrenMenu: [
             {
              id: 1,
              menuName: "正投影相机的观察",
              icon: "el-icon-platform-eleme",
              menuPath: "threeSpace1",
              childrenMenu: [],
            },
             {
              id: 2,
              menuName: "透视投影相机的观察",
              icon: "el-icon-platform-eleme",
              menuPath: "threeSpace2",
              childrenMenu: [],
            },
          ],
        },
        {
          id: 6,
          firstMenuName: "五彩的光源",
          icon: "el-icon-menu",
          menuPath: "ambientLight",
          childrenMenu: [
             {
              id: 1,
              menuName: "环境光",
              icon: "el-icon-platform-eleme",
              menuPath: "ambientLight",
              childrenMenu: [],
            },
            //  {
            //   id: 2,
            //   menuName: "透视投影相机的观察",
            //   icon: "el-icon-platform-eleme",
            //   menuPath: "threeSpace2",
            //   childrenMenu: [],
            // },
          ],
        },
      ],
    };
  },
  watch: { 
  },
  methods: {
    change(key) {},
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    select(index, indexPath) {
      console.log(index, indexPath);
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-submenu__title{
  text-align: left!important;
}
/deep/ .el-menu-item {
  text-align: left!important;
}
/deep/ .el-menu-item-group__title {
  padding:0;
}
.sideBar {
  transition: width 1s;
}
.menu {
  transition: all 0.5s;
}
.el-menu-vertical-demo {
  width: 100%;
  min-height: 400px;
}
// .el-menu--collapse {
//   // transition:width 2s;
// }
</style>