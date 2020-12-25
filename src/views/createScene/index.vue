<template>
  <div> 
      <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";
export default {
  name: "ThreeTest",
  components: {},
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
    };
  },
  created() {
 
  },

  methods: {
    init: function () {
      let container = document.getElementById("container"); // 获取id为container的元素
      // 创建一个场景
      this.scene = new THREE.Scene(); 
      // 创建一个远景相机，
      /**
       * PerspectiveCamera( fov, aspect, near, far )
       *  fov: 相机视椎体垂直视角,从下到上的观察角度；
       *  aspect: 相机视椎体宽高比；
       *  near: 相机视椎体近裁剪面；
       *  far: 相机视椎体远裁剪面；
       */
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
      this.camera.position.z = 2;
      /**
       * 使用几何模型中的其中一个构造器 BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) 创建一个立方体；
       *  width — X轴上的面的宽度.
          height — Y轴上的面的高度.
          depth — Z轴上的面的深度.
          widthSegments — 可选参数. 沿宽度面的分割面数量. 默认值为1.
          heightSegments — 可选参数. 沿高度面的分割面数量. 默认值为1.
          depthSegments — 可选参数. 沿深度面的分割面数量. 默认值为1.
       */
      var geometry = new THREE.BoxGeometry( 1, 1, 1, 2, 3, 4 );
      // 新建网孔基础材料对盒子模型进行着色，MeshBasicMaterial( parameters ) ，参数是一个使用一个或多个属性定义材料外观的对象。参数比较多；
      var material = new THREE.MeshBasicMaterial( { color: 0xF34B4B } ); // 线条的十六进制颜色
      // 新建网孔对象，Mesh( geometry, material )，网孔是用来承载几何模型的一个对象, 将模型和材料组合起来；
      //  geometry ：一个 几何模型(Geometry) 实例，用来定义对象的结构。
      //  material ：一个 材料(Material) 实例，用来定义对象的外观 
      this.mesh = new THREE.Mesh( geometry, material );
      this.scene.add(this.mesh);
      
      // 创建一个渲染器，WebGLRenderer 是其中的一个，还有其他的渲染器；
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      // setSize ( width, height, updateStyle ) 调整输出canvas尺寸（宽度，高度），设置 updateStyle 为true，则显式添加像素到输出canvas的样式中。
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      //  this.renderer.render(this.scene, this.camera);
      container.appendChild(this.renderer.domElement);
    },
    animate() {
      // requestAnimationFrame 循环调用函数等同于setInterval,浏览器Tab切换后停止渲染以节约资源、和屏幕刷新同步避免无效刷新、在不支持该接口的浏览器中能安全回退为setInterval。
      requestAnimationFrame(this.animate);
      // rotation:表示物体绕x,y,z轴旋转的弧度(注意是弧度不是角度)
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
      this.mesh.rotation.z += 0.01;
      // 渲染器进行渲染
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
    this.animate();
 
  },
};
</script>
<style lang="scss">

  #container {
    // height: 400px;
    width:100%;
  }
</style>