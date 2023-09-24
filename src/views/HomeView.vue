<script setup lang="ts">
import { ref } from "vue";
import axios from "../utils/axios";
// const name = ref("南玖");
// const file = ref(null);
const change = async (e: any) => {
  const file = e.target.files[0];
  console.log(file);
  const res = await axios.post(
    "/jjapi/template/uploadImg",
    {
      picture: file,
    },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  console.log(res);
};
</script>

<template>
  <main>
    <!-- <input type="file" @change="change" /> -->
    前端南玖
  </main>
</template>

<style>
main {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
}
</style>
