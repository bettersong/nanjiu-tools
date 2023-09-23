<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <!-- <input type="file" id="htmlUpload" accept="text/html" required /> -->
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  // htmlUpload.addEventListener("change", function (event) {
  //   let file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = function (e) {
  //     console.log(e.target.result);
  //   };
  //   reader.readAsText(file);
  // });
});
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
