<template>
  <div>
    <div id="canvas-frame"></div>
    <div>Fov:<input type="text" value="90" id="txtFov" />(0到180的值)</div>
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
    };
  },
  mounted() {
    this.threeStart();
  },
  methods: {
    initThree() {
      this.width = document.getElementById("canvas-frame").clientWidth;
      this.height = document.getElementById("canvas-frame").clientHeight;
      this.renderer = new this.$THREE.WebGLRenderer({
        antialias: true,
      });
      this.renderer.setSize(this.width, this.height);
      document.getElementById("canvas-frame").appendChild(this.renderer.domElement);
      this.renderer.setClearColor(0xffffff, 1.0);
    },
    initCamera() {
      this.camera = new this.$THREE.PerspectiveCamera(
        45,
        this.width / this.height,
        1,
        10000
      );
    //   this.camera = new this.$THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 600;
      // camera.up.x = 0;
      // camera.up.y = 1;
      // camera.up.z = 0;
      // camera.lookAt({
      //     x : 0,
      //     y : 0,
      //     z : 0
      // });
    },
    initScene() {
      this.scene = new this.$THREE.Scene();
    },
    initLight() {
      this.light = new this.$THREE.AmbientLight(0xff0000);
      this.light.position.set(100, 100, 200);
      this.scene.add(this.light);

      this.light = new this.$THREE.PointLight(0x00ff00);
      this.light.position.set(0, 0, 300);
      this.scene.add(this.light);
    },
    initObject() {
      var geometry = new this.$THREE.CylinderGeometry(70, 100, 200);
      var material = new this.$THREE.MeshLambertMaterial({ color: 0xffffff });
      this.mesh = new this.$THREE.Mesh(geometry, material);
      this.mesh.position = new this.$THREE.Vector3(0, 0, 0);
      this.scene.add(this.mesh);
    },
    threeStart() {
      this.initThree();
      this.initCamera();
      this.initScene();
      this.initLight();
      this.initObject();
      this.animation();
    },
    animation() {
      this.changeFov();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animation);
    },
    setCameraFov(fov) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    },
    changeFov() {
      var txtFov = document.getElementById("txtFov").value;
      var val = parseFloat(txtFov);
      this.setCameraFov(val);
    },
  },
};
</script>
<style lang="scss">
#canvas-frame {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 600px;
  background-color: #eeeeee;
}
</style> 
   
 