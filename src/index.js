import '@/styles/main.scss';

import * as THREE from 'three';
import * as dat from 'dat.gui';

import fragment from '@/shaders/fragment.glsl';
import vertex from '@/shaders/vertex.glsl';

import { TweenMax, Expo } from 'gsap/all';

import slide1 from '@/images/cat1.jpg';
import slide2 from '@/images/cat2.jpg';
import slide3 from '@/images/cat3.jpg';
import slide4 from '@/images/cat4.jpg';
import slide5 from '@/images/cat5.jpg';

// const OrbitControls = require('three-orbit-controls')(THREE);

class Sketch {
  constructor(selector) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();

    this.vw = window.innerWidth;
    this.vh = window.innerHeight;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.vw, this.vh);
    this.renderer.setClearColor(0x000000, 1);

    this.container = document.querySelector(selector);
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001, 1000,
    );

    this.camera.position.set(0, 0, 1);

    this.camera.lookAt(0, 0, 0);

    this.group = new THREE.Group();

    this.scene.add(this.group);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.settings = null;

    this.loader = new THREE.TextureLoader();

    this.loader.crossOrigin = 'anonymous';

    this.gallery = [slide1, slide2, slide3, slide4, slide5].map(url => this.loader.load(url));

    this.currentSlide = 0;

    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);

    // this.setupSettings();
    this.setupResize();


    this.resize();
    this.addObjects();
    this.animate();

    setTimeout(() => {
      this.changeSlide();
    }, 3000);
  }

  setupSettings() {
    this.settings = {
      progress: 0,
      wireframe: false,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, 'progress', 0, 1);

    const wireframe = this.gui.add(this.settings, 'wireframe');
    wireframe.onChange((value) => {
      this.material.wireframe = value;
    });
  }

  setupResize() {
    window.addEventListener('resize', this.resize);
  }


  resize() {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.renderer.setSize(this.vw, this.vh);
    this.camera.aspect = this.vw / this.vh;
    this.camera.updateProjectionMatrix();
  }


  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      side: THREE.DoubleSide,
      uniforms: {
        progress: { type: 'f', value: 0 },
        currentImage: {
          type: 't',
          value: this.gallery[this.currentSlide],
        },
        nextImage: {
          type: 't',
          value: this.gallery[this.currentSlide + 1],
        },
      },
      transparent: true,
      opacity: 1,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.group.add(this.mesh);
  }

  animate() {
    requestAnimationFrame(this.animate);

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  changeSlide() {
    const nextSlide = (this.currentSlide + 1) % this.gallery.length;
    this.material.uniforms.nextImage.value = this.gallery[nextSlide];
    TweenMax.to(this.material.uniforms.progress, 1, {
      value: 1,
      ease: Expo.easeInOut,
      onComplete: () => {
        this.material.uniforms.currentImage.value = this.gallery[nextSlide];
        this.material.uniforms.currentImage.needsUpdate = true;
        this.material.uniforms.progress.value = 0;
        this.currentSlide = nextSlide;
        setTimeout(() => {
          this.changeSlide();
        }, 3000);
      },
    });
  }
}

// eslint-disable-next-line no-new
new Sketch('#container');
