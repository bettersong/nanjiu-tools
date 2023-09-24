<template>
  <div class="generate_container">
    <div class="generate_title">/生成微信头像/</div>
    <div class="generate_center">
      <div class="generate_tools">
        <div class="upload_img">
          <div class="upload_title">上传你的微信头像</div>
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            :auto-upload="false"
            :on-change="change"
            :on-remove="remove"
          >
            <template #trigger>
              <el-button type="primary">上传头像</el-button>
            </template>
          </el-upload>
          <div class="show_avator">
            <img v-if="user_img" :src="user_img" />
          </div>
        </div>
        <div class="choose_gq">
          <div class="upload_title">选择合成模版</div>
          <el-radio-group
            class="gq_list"
            v-model="template_id"
            @change="gqChange"
          >
            <el-radio v-for="item in gqList" :key="item.id" :label="item.id">
              <div>{{ item.name }}</div>
              <img :src="item.template" alt="" />
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <generateImg
        ref="generateImgRef"
        :user_img="user_img"
        :template_id="template_id"
        :gqList="gqList"
      />
    </div>
    <div class="footer">design by 前端南玖</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import generateImg from "../components/generateImg.vue";

const getImg = (name: string, type = "png") => {
  return new URL(
    // 本地资源路径
    `/src/assets/img/${name}.${type}`,
    import.meta.url
  ).href;
};

const user_img = ref("");
const template_id = ref(1);
const gqList = ref([
  {
    id: 1,
    name: "模版1",
    img: getImg("gq0", "jpg"),
    template: getImg("tem1"),
    has: ["text"],
    textLabel: "请输入你的姓",
    desc: "最多输入1个字",
    text: "宋",
    textLength: 1,
  },
  {
    id: 2,
    name: "模版2",
    img: getImg("gq1", "jpg"),
    template: getImg("tem2"),
  },
  {
    id: 3,
    name: "模版3",
    img: getImg("gq2", "jpg"),
    template: getImg("tem3"),
  },
  {
    id: 4,
    name: "模版4",
    img: getImg("gq3", "jpg"),
    template: getImg("tem4"),
    has: ["text"],
    textLabel: "请输入祝福语",
    textColor: "#FED800",
    text: "生在国旗下，长在春风里",
    desc: "最多输入12个字, 请用中文逗号隔开",
    textLength: 12,
  },
  { id: 5, name: "模版5", img: getImg("gq4"), template: getImg("tem5") },
  {
    id: 6,
    name: "模版6",
    img: getImg("gq5", "jpg"),
    template: getImg("tem6"),
    has: ["text"],
    textLabel: "请输入祝福语",
    textColor: "#FED800",
    desc: "最多输入12个字, 请用中文逗号隔开",
    text: "不负韶华，只争朝夕",
    textLength: 12,
  },
  { id: 7, name: "模版7", img: getImg("gq6"), template: getImg("tem7") },
]);
onMounted(() => {});

// 用户头像
const change = (file: any, fileList: any) => {
  console.log(file, fileList);
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file.raw);
  fileReader.onload = (e: any) => {
    user_img.value = e.target.result;
  };
};

// 删除用户头像
const remove = () => {
  user_img.value = "";
};

const generateImgRef = ref(null) as any;
// 选择模版
const gqChange = (val: any) => {
  console.log(val);
  template_id.value = val;
  generateImgRef.value.clear();
  generateImgRef.value.init();
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
.gq_list {
  .el-radio {
    width: 30vw;
    max-width: 120px;
    height: 140px;
    margin-right: 10px;
  }
}
</style>
<style lang="scss" scoped>
.generate_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  // width: 100vw;
}
.generate_title {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  font-family: "kaiti";
  color: #e5353e;
}
.generate_center {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.generate_tools {
  box-sizing: border-box;
  width: 320px;
  height: 80vh;
  padding: 12px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.upload_img {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  height: 38%;
}
.upload_title {
  font-weight: 500;
  margin-bottom: 10px;
}
.generate_area {
  box-sizing: border-box;
  flex: 1;
  height: 80vh;
  padding: 12px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.show_avator {
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.choose_gq {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  height: 60%;
}
.gq_list {
  height: 100%;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: space-between;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    width: 0;
  }
  img {
    width: 25vw;
    height: 25vw;
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 4px;
  }
}
.footer {
  width: 100%;
  margin-top: 30px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  font-family: "kaiti";
  color: #e5353e;
}
</style>
