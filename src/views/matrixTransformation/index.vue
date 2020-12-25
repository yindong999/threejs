<template>
  <div>
      <div id="matrixTransformation"></div>
  </div>
</template>

<script>
// 引入three
import * as THREE from "three";
export default {
    components: {},
    data() {
        return {
            scene: null, // 定义场景
            camera: null, // 定义相机
            mesh: null, // 定义网格
            renderer: null, // 定义渲染器
        }
    },
    created() {

    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        // 1, 获取id为matrixTransformation的元素
        let dom = document.getElementById("matrixTransformation");
        // 2, 创建场景对象
        this.scene = new THREE.Scene();
        // 3, 创建一个远景相机对象
              // PerspectiveCamera( fov, aspect, near, far )
              // fov — 相机视锥体垂直视角
              // aspect — 相机视锥体宽高比
              // near — 相机视锥体近裁剪面
              // far — 相机视锥体远裁剪面。
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight,0.1, 200);
        // 3.1 设置远景相机的的z方向位置
        this.camera.position.z = 3;
        // 4, 创建网孔整体部分
            // 4.1 创建立方体盒子模型
            let geometry = new THREE.BoxGeometry(1, 2, 3);
            // 4.2 创建基础材料模型对象，用于对盒子模型进行着色的
            let material = new THREE.MeshBasicMaterial({
                color: 0x83EEA7, // 线条的十六进制颜
                skinning: true, // 定义材料是否使用皮肤
                });
            // 4.3 创建网孔对象
            this.mesh = new THREE.Mesh(geometry,material);
            // rotation:表示物体绕x,y,z轴旋转的弧度(注意是弧度不是角度)
            // this.mesh.rotation.x = 10.01;
            // this.mesh.rotation.y = 10.01;
            // this.mesh.rotation.z = 0.01;
        // 4.4 场景中添加网孔对象
        this.scene.add(this.mesh);
        // 5, 创建渲染器对象
        this.renderer = new THREE.WebGLRenderer({
          antialias: true, // true/false表示是否开启反锯齿
          alpha: true, // true/false 表示是否可以设置背景色透明
          precision: 'highp', // highp/mediump/lowp 表示着色精度选择
          premultipliedAlpha: false, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
          preserveDrawingBuffer: true, // true/false 表示是否保存绘图缓冲
          maxLights: 3, // 最大灯光数
          stencil: false // false/true 表示是否使用模板字体或图案
        });
          // 5.1 设置渲染器对象尺寸(调整输出canvas尺寸)
          this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 6, 将绘制输出的对象添加到页面元素中
        dom.appendChild(this.renderer.domElement);
        // domElement 一个用来绘制输出的 Canvas 对象。
           // 该对象通过构造函数中的渲染器所自动创建（如果没有提供的话）；你只需要将其添加到您的网页中。
        // 7, 渲染器进行渲染
        this.renderer.render(this.scene, this.camera);
      }
    }
}
</script>
<style lang="scss">
</style>