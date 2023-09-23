<template>
  <div>sharp</div>
  <div class="container">
    <div class="code_container">
      <Codemirror
        v-model="code"
        placeholder="Code svg here..."
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
        @change="log('change', $event)"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
      />
    </div>
    <div class="preview_img">
      <div class="top_tools">
        <div class="preview_btn" @click="generateImg">生成海报</div>
      </div>
      <div class="show_img_url">访问路径：{{ img }}</div>
      <img class="show_img" v-if="img" :src="img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { ref } from "vue";
import axios from "../utils/axios";
const code = ref("");
const img = ref("");
const extensions: never[] = [];
const handleReady = (editor: any) => {
  console.log("editor is ready");
};
const log = (event: string, value: any) => {
  console.log(event, value);
};
// 生成图片
const generateImg = async () => {
  const res: any = await axios.post("/sharp/generateImg", {
    code: code.value,
  });
  const data = res?.data || {};
  if (data?.code === 200) {
    img.value = data.url;
  }
  console.log(res);
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.code_container {
  width: 60%;
  border: 1px solid #ccc;
}
.preview_img {
  width: 40%;
}
.top_tools {
  width: 100%;
  display: flex;
  justify-content: center;
}
.preview_btn {
  width: 100px;
  height: 40px;
  background: #e5353e;
  color: #fff;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
}
.show_img_url {
  font-size: 14px;
  color: #191919;
  margin: 10px 0;
}
.show_img {
  display: block;
  width: auto;
  max-height: 500px;
  margin: 0 auto;
}
</style>
