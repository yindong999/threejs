<template>
  <div>
    <div id="firstFrame"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cube: null,
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
			// 之所以用$THREE，是因为将three.js挂载到vue上了

			// 新建场景对象 
      this.scene = new this.$THREE.Scene();
			// 新建远景相机对象
      this.camera = new this.$THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
			// 新建渲染器对象
      this.renderer = new this.$THREE.WebGLRenderer();
				// 调整输出canvas尺寸（宽度，高度），要考虑设备像素比，并且设置视口（viewport）以匹配该尺寸
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			// 将渲染器的domElement添加到页面中；渲染器renderer的domElement元素，表示渲染器中的画布
      document.getElementById("firstFrame").appendChild(this.renderer.domElement);
			// 新建立方体对象
			var geometry = new this.$THREE.CubeGeometry(1, 1.5, 2);
			// 新建基础材质对象
			var material = new this.$THREE.MeshBasicMaterial({ color: 0x00ff00 });
			// 新建网孔对象
			this.cube = new this.$THREE.Mesh(geometry, material);
			// 场景中添加网孔对象
			this.scene.add(this.cube);
			// 设置远景相机的位置
      this.camera.position.z = 4;
			this.camera.position.x = 2;
			// 调用方法
			this.render();
    },
    render() {
			// 循环调用函数
			requestAnimationFrame(this.render);
			// 设置网孔对象的位置
      // this.cube.rotation.x += 0.01;
			this.cube.rotation.y += 0.01;
			// 渲染器进行渲染
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>
<style lang="scss">
</style>