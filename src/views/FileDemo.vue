<template>
  <div class="edit_container">
    <div class="file_list">
      <div class="tools">
        <div class="open_file" @click="openFile">打开文件</div>
        <div class="open_file" @click="openDir">打开文件夹</div>
      </div>
      <div
        :class="{ file: true, active: currentIndex === index }"
        v-for="(item, index) in fileList"
        :key="index"
        @click="showCode(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="show_code">
      <pre v-highlight>
        <code class="lang-dart">
            {{ codeText }}
        </code>
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const fileList = ref([] as any[]);
const codeText = ref("");
const currentIndex = ref(0);
const openFile = async () => {
  const res = await window.showOpenFilePicker({
    // multiple: true,
  });
  console.log(res.length);
};

const openDir = async () => {
  // const fileList: object[] = [];
  const res = await window.showDirectoryPicker({});
  const detalAction = async (obj: any) => {
    if (obj.entries) {
      const dirs = obj.entries();
      for await (const entry of dirs) {
        if (entry[1].entries) {
          // 文件夹，递归处理
          detalAction(entry[1]);
        } else {
          // 文件
          fileList.value.push({
            name: entry[0],
            path: obj.name,
            fileHandle: entry[1],
          });
        }
      }
    }
  };
  await detalAction(res);
  showCode(fileList.value[0], 0);
  console.log("--fileList--", fileList);
};

const showCode = async (item: any, index: number) => {
  const file = await item.fileHandle.getFile();
  const text = await file.text();
  codeText.value = text;
  currentIndex.value = index;
};
</script>

<style lang="scss" scoped>
.tools {
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.open_file {
  box-sizing: border-box;
  text-align: center;
  min-width: 100px;
  max-width: 150px;
  margin-right: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #409eff;
  color: #fff;
  cursor: pointer;
}
.edit_container {
  display: flex;
  margin-top: 8px;
  height: 90vh;
  border: 1px solid #eee;
}
.file_list {
  padding: 8px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  overflow: auto;
}
.file {
  max-width: 200px;
  padding: 8px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.show_code {
  flex: 1;
  background: #282c34;
  padding: 8px;
  overflow: auto;
  max-height: 90vh;
}
.file.active {
  background-color: #409eff;
  color: #fff;
}
pre {
  margin: 0;
}
</style>
