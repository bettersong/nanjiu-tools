<template>
  <div>
    <div>name: {{ name }}</div>
    <div>age: {{ age }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const name = ref("nanjiu");
let age = reactive({ value: 18 });
</script>

<style scoped lang="scss"></style>
