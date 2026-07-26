<script setup lang="ts">
/**
 * PoC recursive stacked navigation drawers. Many drawers don't actually correspond nested HTML structure though, which naturally falls out of recursive algo parsing nested DS. Turns out you can just render v-navigation-bar anywhere.
 */
import { computed, ref, onMounted } from 'vue';

const panelFaceHeight = ref(1000);
const kickAngle = ref(0);
const faceAngle = ref(0);

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

onMounted(() => console.log('mounted'));

</script>

<template>
  <v-app>
    <v-main style="border: solid 1px green;">
      <v-container style="height: 100%;">
        <div class="container">
          <div class="panel">
            <v-sheet>
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
                    :max="90"
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
            </v-sheet>
          </div>
          <div class="panel number-panel">
            <h3>{{ cut }}</h3>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .panel {
    flex: 1;
    border: solid 1px slateblue;
    min-width: fit-content;
  }

  .number-panel {
    align-content: center;
    width: 100%;
    text-align: center;
    flex-grow: 10;
  }
</style>