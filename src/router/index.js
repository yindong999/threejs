import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
      children: [ 
      {
        name:'createScene', 
        path:'createScene', 
        component: () => import("@/views/createScene"),
        meta: { title: '创建一个场景'}
      } ,
      {
        name:'matrixTransformation', 
        path:'matrixTransformation', 
        component: () => import("@/views/matrixTransformation"),
        meta: { title: '矩阵变换'}
      },
      {
        name:'menuTwo', 
        path:'menuTwo', 
        component: () => import("@/views/menuTwo"),
        meta: { title: '菜单2'}
      } ,
      {
        name:'firstFrame', 
        path:'firstFrame', 
        component: () => import("@/views/firstFrame"),
        meta: { title: 'firstFrame'}
      } ,
      {
        name:'pointerLineOne', 
        path:'pointerLineOne', 
        component: () => import("@/views/pointerLineOne"),
        meta: { title: 'pointerLineOne'}
      } ,
      {
        name:'pointerLineTwo', 
        path:'pointerLineTwo', 
        component: () => import("@/views/pointerLineTwo"),
        meta: { title: 'pointerLineTwo'}
      } ,
      {
        name:'screenMove', 
        path:'screenMove', 
        component: () => import("@/views/screenMove"),
        meta: { title: 'screenMove'}
      } ,
      {
        name:'threeSpace1', 
        path:'threeSpace1', 
        component: () => import("@/views/threeSpace1"),
        meta: { title: 'threeSpace1'}
      } ,
      {
        name:'threeSpace2', 
        path:'threeSpace2', 
        component: () => import("@/views/threeSpace2"),
        meta: { title: 'threeSpace2'}
      } ,
      {
        name:'ambientLight', 
        path:'ambientLight', 
        component: () => import("@/views/light"),
        meta: { title: 'ambientLight'}
      } ,
    ],
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      //  console.log('beforeEnter',to)
      //  console.log('beforeEnter',from)
       next()
    }
  }, 
  // {
  //   name:'my', 
  //   path:'/my',
  //   component: () => import('../views/my.vue'),
  //   redirect: '/my/namedView',// 表示进入/my时重定向到/my/namedView，这样进入/my时第一个子组件就显示了
  //   children: [ 
  //     {
  //       name:'namedView', 
  //       path:'/my/namedView',
  //       components:{
  //         default:() => import('../views/comp/Foo.vue'),
  //         a:() => import('../views/comp/Bar.vue'),
  //         b:() => import('../views/comp/Baz.vue')
  //       }
  //     } ,
  //     {
  //       name:'namedView2', 
  //       path:'/my/namedView233333',
  //       components:{
  //         default:() => import('../views/comp/Foo2.vue'),
  //         a:() => import('../views/comp/Bar2.vue'),
  //         b:() => import('../views/comp/Baz2.vue')
  //       }
  //     } 
  //   ]
  // } ,
]
const router = new VueRouter({
  mode: 'hash',// 路由模式，默认是hash模式，还有一种 history 模式
  routes:routes,
  // 配置页面的滚动行为
  scrollBehavior (to, from, savedPosition) {
    // savedPosition 只对浏览器的前进后退按钮有效
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
// 全局前置守卫:当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
// to: 即将进入的目标路由对象
// from：当前导航正要离开的路由对象；
// next :Function ，需要调用该方法来resolve这个钩子函数；执行效果依赖于next方法中的参数；
//   next中参数的说明：
router.beforeEach((to,from,next)=>{
  // console.log('beforeEach',to)
  // console.log('beforeEach',from)
  next()
})
// 全局解析守卫:在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
router.beforeResolve((to,from,next)=>{
  // console.log('beforeResolve',to)
  // console.log('beforeResolve',from)
  next()
})
// 全局后置钩子
router.afterEach((to,from)=>{
  // console.log('afterEach',to)
  // console.log('afterEach',from)
})
export default router