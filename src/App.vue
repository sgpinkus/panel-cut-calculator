<script setup lang="ts">
/**
 * PoC recursive stacked navigation drawers. Many drawers don't actually correspond nested HTML structure though, which naturally falls out of recursive algo parsing nested DS. Turns out you can just render v-navigation-bar anywhere.
 */
import { computed, ref, onMounted, watch } from 'vue';
import * as THREE from 'three';

const panelFaceHeight = ref(1000);
const kickAngle = ref(30);
const faceAngle = ref(20);

const cut = computed(() => {
  return r.value * (1 - Math.cos(kickAngleRad.value)) / Math.sin(kickAngleRad.value);
});
const kickAngleRad = computed(() => {
  return 2 * Math.PI * (kickAngle.value / 360.);
});
const faceAngleRad = computed(() => {
  return 2 * Math.PI * (faceAngle.value / 360.);
});
const r = computed(() => {
  return panelFaceHeight.value * Math.sin(faceAngleRad.value);
});


const container = ref(null);

onMounted(() => {
  initScene();
});

function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas')!, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const panel1 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x4682b4, side: THREE.DoubleSide }),
  );
  const panel1GroupX = new THREE.Group();
  const panel1GroupY = new THREE.Group();
  panel1GroupX.add(panel1);
  panel1GroupY.add(panel1GroupX);
  panel1.position.set(0.5, 0.5, 0);
  panel1GroupX.rotation.x = -toRad(faceAngle.value);
  panel1GroupY.rotation.y = toRad(kickAngle.value);
  const panel2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide }),
  );
  const panel2Group = new THREE.Group();
  panel2Group.add(panel2);
  panel2.position.set(-0.5, 0.5, 0);
  panel2Group.rotation.x = -toRad(faceAngle.value);
  scene.add(panel1GroupY);
  scene.add(panel2Group);

  camera.position.set(0, 3, 3);
  camera.lookAt(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  renderer.render(scene, camera);

  watch(faceAngle, () => {
    panel1GroupX.rotation.x = -toRad(faceAngle.value);
    panel1GroupY.rotation.y = toRad(kickAngle.value);
    panel2Group.rotation.x = -toRad(faceAngle.value);
    renderer.render(scene, camera);
  });

  watch(kickAngle, () => {
    panel1GroupY.rotation.y = toRad(kickAngle.value);
    renderer.render(scene, camera);
  });

  // watch(panelFaceHeight, () => {
  //   panel1.scale.set(1, panelFaceHeight.value/1000, 1);
  //   panel2.scale.set(1, panelFaceHeight.value/1000, 1);
  //   renderer.render(scene, camera);
  // });
}

function toRad(x: number) {
  return Math.PI*2*(x/360);
}




</script>

<template>
  <v-app>
    <v-main>
      <v-container style="height: 100%;">
        <div class="container">
          <div class="panel">
              <v-list>
                <v-list-item>
                  <v-label>Panel Face Height (mm)</v-label>
                  <v-number-input
                    v-model.number="panelFaceHeight"
                    hide-details
                    single-line
                    variant="outlined"
                    density="compact"
                    :min="0"
                    :max="2000"
                    :step="1"
                  ></v-number-input>
                </v-list-item>
                <v-list-item>
                  <v-label>Kick Angle (degrees)</v-label>
                  <v-number-input
                    v-model.number="kickAngle"
                    hide-details
                    single-line
                    variant="outlined"
                    density="compact"
                    :min="-90"
                    :max="180"
                    :step="1"
                  ></v-number-input>
                </v-list-item>
                <v-list-item>
                  <v-label>Face Angle From Vertical (degrees)</v-label>
                  <v-number-input
                    v-model.number="faceAngle"
                    hide-details
                    single-line
                    variant="outlined"
                    density="compact"
                    :min="0"
                    :max="90"
                    :step="1"
                  ></v-number-input>
                </v-list-item>
              </v-list>
          </div>
          <div class="panel number-panel">
            <h3>{{ cut }}</h3>
            <div class="canvas" ref="container">
              <canvas></canvas>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
  // @use 'vuetify/settings' as settings;

  .container {
    display: flex;
    flex-direction: column;
    display: flex;
    height: 100%;


    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }

  .panel {
    flex: 1;
    border: solid 1px slateblue;
    min-width: fit-content;
    align-content: center;
    width: 100%;
    text-align: center;
  }

  .number-panel {
    flex-grow: 10;
  }

  .v-list, .v-list-item {
    background: transparent !important;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>