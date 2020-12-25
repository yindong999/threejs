<template>
  <div>
    <div
      id="canvas-frame"
      style="width: 100%; height: 900px; border: 1px solid red"
    ></div>
  
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      light: null,
      cube: null,
      width: null,
      height: null,
    };
  },
  created() {},
  mounted() {
    this.threeStart();
  },
  methods: {
    //  初始化渲染器
    initThree() {
      this.width = document.getElementById("canvas-frame").clientWidth;
      this.height = document.getElementById("canvas-frame").clientHeight;
      // 新建渲染器对象
      this.renderer = new this.$THREE.WebGLRenderer({
        antialias: true, // true/false表示是否开启反锯齿
      });
      this.renderer.setSize(this.width, this.height);
      document
        .getElementById("canvas-frame")
        .appendChild(this.renderer.domElement);
        // 设置背景色
      this.renderer.setClearColor(0xfdffdf, 1.0);
    },
    // 初始化远景相机
    initCamera() {
      this.camera = new this.$THREE.PerspectiveCamera(
        55,
        this.width / this.height,
        0.01,
        1000
      );
      this.camera.position.x = 5;
      this.camera.position.y = 5;
      this.camera.position.z = 5;
    //   this.camera.up.x = 0;
    //   this.camera.up.y = 0;
    //   this.camera.up.z = 0;
    //   this.camera.lookAt({
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //   });
    },
    // 初始化场景
    initScene() {
      this.scene = new this.$THREE.Scene();
    },

    initLight() {
      // 新建平行光构造器对象
      // DirectionalLight( hex, intensity )
      // hex -- 光源颜色的RGB数值。
      // intensity -- 光源强度的数值。默认是1
      this.light = new this.$THREE.DirectionalLight(0xff0000, 1.0);
      this.light.position.set(130, 100, 200);
      this.scene.add(this.light);
    },

    initObject() {
      // 定义一个几何模型对象
      var geometry = new this.$THREE.Geometry();
      // 定义一个基础线条材料对象（vertexColors — 定义顶点着色）
      var material = new this.$THREE.LineBasicMaterial({ vertexColors: true });
      // 定义两种颜色，分别表示线条两个端点的颜色
      var color1 = new this.$THREE.Color(0x444444);
      var color2 = new this.$THREE.Color(0xff0000);

      // 线的材质可以由2点的颜色决定
      // 三维向量。Vector3( x, y, z ) 定义一个点的位置
      var p1 = new this.$THREE.Vector3(20, 20, 0);
      var p2 = new this.$THREE.Vector3(0, 0, -20);
      // vertices数组。 用来保存模型中所有顶点位置的数组。
      geometry.vertices.push(p1);
      geometry.vertices.push(p2);
      // 顶点colors数组，和 vertices属性的个数和顺序一致。 用于 点(Points) 和 线条(Line)。
      geometry.colors.push(color1, color2);
      // 第三个参数是一组点的连接方式
      var line = new this.$THREE.Line(
        geometry,
        material,
        this.$THREE.LineSegments  // LineSegments用于将两个点连接为一条线，(只是链接两个点的话，可以不用写这个参数)
      );
      // 将线条添加到场景中
      this.scene.add(line);
    },

    threeStart() {
      this.initThree();
      this.initCamera();
      this.initScene();
      this.initLight();
      this.initObject();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>
<style lang="scss">
</style>