<template>
  <div>
     <div id="lights"></div> hfjfhgj
  </div>
</template>
<script>
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      width: null,
      height: null,
      ambientLight: null, // 环境光
      spotLight: null, // 聚光灯
      pointLight: null // 点光源
      };
  },
  watch: {},
  created() {},
  mounted() {
    this.initMethods();
  },
  methods: {
    // 初始化渲染器对象
    initThreeJS(){
        // 获取id是lights的元素的高度，
        this.height = document.getElementById("lights").clientHeight;
        // 获取id是lights的元素的宽度；
        this.width = document.getElementById("lights").clientWidth;
        // 新建渲染器对象
        this.renderer = new this.$THREE.WebGLRenderer({
            antialias: true // 是否开启反锯齿
        });
        //  this.renderer.setClearColor(0xffffff,1.0);
           // 设置渲染器的尺寸，将输出canvas的大小调整为(width, height)并考虑设备像素比，
           // .setSize ( width : Integer, height : Integer, updateStyle : Boolean ) ; updateStyle：设置为false则阻止对canvas的样式改变；
           this.renderer.setSize(this.width, this.height, true);
        // domElement 是一个canvas,渲染器在domElement上绘制图形并输出
        document.getElementById("lights").appendChild(this.renderer.domElement);
    },
    // 初始化远景相机的方法
    initCamera(){
      // 新建远景相机对象
      // PerspectiveCamera(fov : Number, aspect : Number, near : Number, far : Number) 
      // fov — 摄像机视锥体垂直视野角度
      // aspect — 摄像机视锥体长宽比
      // near — 摄像机视锥体近端面
      // far — 摄像机视锥体远端面
      this.camera = new this.$THREE.PerspectiveCamera(125,this.width/this.height,0.1,10000);
      this.camera.position.z = 1.5;
    },
    // 初始化场景
    initScene(){
      this.scene = new this.$THREE.Scene();
      // const loader = new this.$THREE.TextureLoader();
      // const bgTexture = loader.load('../../assets/sky.jpg');
      // this.scene.background = bgTexture;
    },
    // 初始化灯光
    initLight(){
      // 新建环境光对象
      let ambientLight = new this.$THREE.AmbientLight(0xff0000);
      this.scene.add(ambientLight);
      // 新建聚光灯对象
      let spotLight = new this.$THREE.SpotLight(0xFF2346);
      this.scene.add(spotLight);
      // 新建点光源对象
      let pointLight = new this.$THREE.PointLight(0xffaa00, 1, 1000);
      this.scene.add(pointLight);
      
    },
    initMethods(){
      this.initThreeJS();
      this.initCamera();
      this.initScene();
      this.initLight();
      var material = new this.$THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
     });
      this.initObject(this.scene, material);;
      this.animation();
    },
    // 初始化物体对象 
    initObject(scene, material) {
      // 新建正二十面体对象
      // this.mesh = new this.$THREE.Mesh(new this.$THREE.IcosahedronGeometry(1.01), material);
      // 新建正八面体对象
      this.mesh = new this.$THREE.Mesh(new this.$THREE.OctahedronGeometry(1.01), material);
      // 新建正四面体对象
      // this.mesh = new this.$THREE.Mesh(new this.$THREE.TetrahedronGeometry(), material);
      this.scene.add(this.mesh);
    },
    animation() {
     this.mesh.rotation.x += 0.01; 
     this.mesh.rotation.y += 0.01; 
     this.mesh.rotation.z += 0.01; 
      this.renderer.render(this.scene, this.camera);
      // 定时器函数
      requestAnimationFrame(this.animation);
    },
  },
};
</script>
<style lang='scss' scoped>
#lights{
    width:100%;
    height:100vh;
    // background: skyblue;
}
</style>