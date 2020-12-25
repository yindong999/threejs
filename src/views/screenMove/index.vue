 <template>
  <div>
    <p>让场景动起来</p>
    <div
      id="canvas-frame"
      style="width: 100%; height: 500px; border: 1px solid red"
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
      mesh: null,
      scene: null,
      light: null,
      light2: null,
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
    initThree() {
      this.width = document.getElementById("canvas-frame").clientWidth;
      this.height = document.getElementById("canvas-frame").clientHeight;
      this.renderer = new this.$THREE.WebGLRenderer({
        antialias: true,
      });
      this.renderer.setSize(this.width, this.height);
      document
        .getElementById("canvas-frame")
        .appendChild(this.renderer.domElement);
      this.renderer.setClearColor(0x000000, 1.0);
    },
    initCamera() {
      this.camera = new this.$THREE.PerspectiveCamera(
        65,
        this.width / this.height,
        1,
        10000
      );
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 600;
      // this.camera.up.x = 0;
      // this.camera.up.y = 0;
      // this.camera.up.z = 1;
      // this.camera.lookAt({
      //   x: 0,
      //   y: 0,
      //   z: 0,
      // });
    },
    initScene() {
      this.scene = new this.$THREE.Scene();
    },
    initLight() {
      // 新建环境光对象：环境光（AmbientLight）这种光的颜色被应用到全局范围内的所有对象。
      this.light = new this.$THREE.AmbientLight(0xff0000);
      this.light.position.set(100, 100, 200);
      this.scene.add(this.light);
      // 点光源（PointLight）
      this.light2 = new this.$THREE.PointLight(0x00ff00);
      this.light2.position.set(0, 0, 300);
      this.scene.add(this.light2);
    },
    initObject() {
      // CylinderGeometry 一个用来创建圆柱几何体模型的类
      // CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
      // radiusTop — 圆柱体顶端半径. 默认值为20.
      // radiusBottom — 圆柱体底端半径. 默认值为20.
      // height — 圆柱体高度. 默认值为100.
      // radiusSegments — 围绕圆柱体周长的分割面数量. 默认值为8.
      // heightSegments — 沿圆柱体高度的分割面数量. 默认值为1. （不设置的话就是一个上下面等大的圆柱，设置大于1的数后，就是一个圆台了）
      // openEnded — 指示圆柱体两端是打开还是覆盖的布尔值. 默认值为false, 意思是覆盖.
      // thetaStart — 第一个分割面的开始角度, 默认值 = 0 (3点钟方向).
      // thetaLength — 圆形扇形的圆心角通常称为θ。默认为2 * Pi，这形成了一个完整的圆柱体.
      // 属性（Properties）
      var geometry = new this.$THREE.CylinderGeometry(100, 150, 400, 15,20);
      // 兰伯特网孔材料（MeshLambertMaterial）一种非发光材料（兰伯特）的表面，计算每个顶点。
      var material = new this.$THREE.MeshLambertMaterial({ color: 0xffffff });
      // 新建网格模型对象
      this.mesh = new this.$THREE.Mesh(geometry, material);
      this.mesh.position.x = 0;
      this.mesh.position.y = 0;
      this.mesh.position.z = 0;
      this.mesh.rotation.y = 30;
      this.mesh.rotation.x = 90;
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
      this.mesh.rotation.x -= 0.01; 
  
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animation);
    },
  },
};
</script>
<style lang="scss">
</style>