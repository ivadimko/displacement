(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(e,t,i){"use strict";var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();i(14);var r=v(i(2)),s=v(i(3)),a=g(i(4)),o=g(i(5)),u=i(13),c=g(i(8)),h=g(i(9)),l=g(i(10)),d=g(i(11)),m=g(i(12));function g(e){return e&&e.__esModule?e:{default:e}}function v(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}new(function(){function e(t){var i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=new r.Scene,this.renderer=new r.WebGLRenderer,this.vw=window.innerWidth,this.vh=window.innerHeight,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(this.vw,this.vh),this.renderer.setClearColor(0,1),this.container=document.querySelector(t),this.container.appendChild(this.renderer.domElement),this.camera=new r.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.001,1e3),this.camera.position.set(0,0,1),this.camera.lookAt(0,0,0),this.group=new r.Group,this.scene.add(this.group),this.settings=null,this.loader=new r.TextureLoader,this.loader.crossOrigin="anonymous",this.gallery=[c.default,h.default,l.default,d.default,m.default].map(function(e){return i.loader.load(e)}),this.currentSlide=0,this.resize=this.resize.bind(this),this.animate=this.animate.bind(this),this.setupResize(),this.resize(),this.addObjects(),this.animate(),setTimeout(function(){i.changeSlide()},3e3)}return n(e,[{key:"setupSettings",value:function(){var e=this;this.settings={progress:0,wireframe:!1},this.gui=new s.GUI,this.gui.add(this.settings,"progress",0,1),this.gui.add(this.settings,"wireframe").onChange(function(t){e.material.wireframe=t})}},{key:"setupResize",value:function(){window.addEventListener("resize",this.resize)}},{key:"resize",value:function(){this.vw=window.innerWidth,this.vh=window.innerHeight,this.renderer.setSize(this.vw,this.vh),this.camera.aspect=this.vw/this.vh,this.camera.updateProjectionMatrix()}},{key:"addObjects",value:function(){this.material=new r.ShaderMaterial({extensions:{derivatives:"#extension GL_OES_standard_derivatives : enable"},side:r.DoubleSide,uniforms:{progress:{type:"f",value:0},currentImage:{type:"t",value:this.gallery[this.currentSlide]},nextImage:{type:"t",value:this.gallery[this.currentSlide+1]}},transparent:!0,opacity:1,vertexShader:o.default,fragmentShader:a.default}),this.geometry=new r.PlaneGeometry(1,1,1,1),this.mesh=new r.Mesh(this.geometry,this.material),this.group.add(this.mesh)}},{key:"animate",value:function(){requestAnimationFrame(this.animate),this.render()}},{key:"render",value:function(){this.renderer.render(this.scene,this.camera)}},{key:"changeSlide",value:function(){var e=this,t=(this.currentSlide+1)%this.gallery.length;this.material.uniforms.nextImage.value=this.gallery[t],u.TweenMax.to(this.material.uniforms.progress,1,{value:1,ease:u.Expo.easeInOut,onComplete:function(){e.material.uniforms.currentImage.value=e.gallery[t],e.material.uniforms.currentImage.needsUpdate=!0,e.material.uniforms.progress.value=0,e.currentSlide=t,setTimeout(function(){e.changeSlide()},3e3)}})}}]),e}())("#container")},,,function(e,t){e.exports="varying vec2 vUv;\nuniform sampler2D currentImage;\nuniform sampler2D nextImage;\nuniform float progress;\n\nvoid main() {\n  vec2 uv = vUv;\n  vec4 _currentImage;\n  vec4 _nextImage;\n  float intensity = 0.3;\n  vec4 orig1 = texture2D(currentImage, uv);\n  vec4 orig2 = texture2D(nextImage, uv);\n  _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + progress * (orig2 * intensity)));\n  _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - progress) * (orig1 * intensity)));\n  vec4 finalTexture = mix(_currentImage, _nextImage, progress);\n  gl_FragColor = finalTexture;\n}\n"},function(e,t){e.exports="varying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n"},,,function(e,t,i){e.exports=i.p+"src/images/cat1.jpg"},function(e,t,i){e.exports=i.p+"src/images/cat2.jpg"},function(e,t,i){e.exports=i.p+"src/images/cat3.jpg"},function(e,t,i){e.exports=i.p+"src/images/cat4.jpg"},function(e,t,i){e.exports=i.p+"src/images/cat5.jpg"},,function(e,t){}],[[1,1,2]]]);