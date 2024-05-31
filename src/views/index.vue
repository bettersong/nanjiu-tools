<template>
  <div>
    <div>name: {{ name }}</div>
    <div>age: {{ age }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

const name = ref("nanjiu");
let age = reactive({ value: 18 });
const user = reactive({
  name: "nanjiu",
  age: 18,
});

onMounted(() => {
  console.log("name", name);
  console.log("age", age);
});
</script>

<style scoped></style>
