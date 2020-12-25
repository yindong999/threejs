<template>
  <div>  
		<p>网格线</p>
    <div id="canvas-frame" style="width: 100%; height: 500px; border: 1px solid red"></div>
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
        }
    },
    created() {
    },
    mounted() {
      this.threeStart();
    },
    methods: { 
             initThree() {
							// 通过id获取元素的宽度
              this.width = document.getElementById('canvas-frame').clientWidth; 
							// 通过id获取元素的高度
							this.height = document.getElementById('canvas-frame').clientHeight;
							// 新建渲染器对象
              this.renderer = new this.$THREE.WebGLRenderer({
                    antialias : true // 开启反锯齿
							});
							// 设置渲染器的尺存
							this.renderer.setSize(this.width, this.height);
							// domElement 一个用来绘制输出的 Canvas 对象。
							document.getElementById('canvas-frame').appendChild(this.renderer.domElement);
							// .setClearColor ( color, alpha )  设置清除的颜色和透明度。
              this.renderer.setClearColor(0xFFFFFF, 1.0);
            }, 
             initCamera() {
                this.camera = new this.$THREE.PerspectiveCamera(95, this.width / this.height, 1, 10000);
                this.camera.position.x = 0;
                this.camera.position.y = 100;
                this.camera.position.z = 500;
                // this.camera.up.x = 1;
                // this.camera.up.y = 0;
                // this.camera.up.z = 0;
                // this.camera.lookAt({
                //     x : 0,
                //     y : 0,
                //     z : 0
                // });
            },
             initScene() {
                this.scene = new this.$THREE.Scene();
            },
 
             initLight() {
                this.light = new this.$THREE.DirectionalLight(0xFF0000, 1.0, 0);
                this.light.position.set(100, 100, 200);
                this.scene.add(this.light);
            },
 
             initObject() {
                var geometry = new this.$THREE.Geometry();
                geometry.vertices.push( new this.$THREE.Vector3( - 500, 0, 0 ) );
                geometry.vertices.push( new this.$THREE.Vector3( 500, 0, 0 ) );

                for ( var i = 0; i <= 20; i ++ ) {

                    var line = new this.$THREE.Line( geometry, new this.$THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
                    line.position.y = ( i * 50 ) - 500;
                    // line.rotation.y = 90 * Math.PI / 180; 
                    this.scene.add( line );

                    var line2 = new this.$THREE.Line( geometry, new this.$THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
                    line2.position.x = ( i * 50 ) - 500;
                    line2.rotation.z = 90 * Math.PI / 180;
                    this.scene.add( line2 );

                }
            },
            initHelper(){
							var axes = new this.$THREE.AxisHelper(500);
							console.log('axes',axes);
							axes.rotation.x = 10;
							axes.rotation.y = 10;
							axes.rotation.z = 10;
              this.scene.add(axes);
            },
             threeStart() {
                this.initThree();
                this.initCamera();
								this.initScene();
								// this.initHelper();
                this.initLight();
                this.initObject();
                this.renderer.clear();
                this.renderer.render(this.scene, this.camera);
            }
    }
}
</script>
<style lang="scss">
</style>