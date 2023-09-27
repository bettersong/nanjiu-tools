<template>
  <div class="generate_area">
    <div class="upload_title">合成你的微信头像</div>
    <el-button type="primary" @click="generateImg">合成头像</el-button>
    <el-button type="success" @click="downloadImg">下载合成头像</el-button>
    <el-form :inline="true" style="margin-top: 8px">
      <el-form-item v-if="hasText" :label="textLabel">
        <el-input
          size="small"
          v-model="text"
          :placeholder="textDesc"
          :maxlength="gqList[template_id - 1].textLength"
          clearable
        />
      </el-form-item>
      <el-form-item v-if="hasText" label="选择文字颜色">
        <el-color-picker v-model="textColor" />
      </el-form-item>
      <div class="desc" v-if="gqList[template_id - 1].desc">
        说明：{{ gqList[template_id - 1].desc }}
      </div>
      <div v-if="mergeFlag">
        <el-progress
          :percentage="progress"
          :indeterminate="true"
          :duration="duration"
          :format="format"
        />
      </div>
    </el-form>

    <div ref="mergeImg" class="generate_img">
      <el-empty class="empty_box" v-if="!mergeing" description="合成区" />
      <canvas id="my_canvas" width="300" height="300"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref, toRefs, computed } from "vue";

const props = defineProps<{
  user_img: string;
  template_id: number;
  gqList: any[];
}>();

const { user_img, template_id, gqList } = toRefs(props);
const canvas = ref(null) as any;
const ctx = ref(null) as any;
const canDownload = ref(false);
const text = ref("");
const textColor = ref("#FED800");
const mergeFlag = ref(false);
const progress = ref(0);
const duration = ref(3);
const mergeing = ref(false);
const format = (percentage: number) =>
  percentage === 100 ? "合成成功" : `${percentage}%`;

const hasText = computed(() => {
  return gqList.value[template_id.value - 1].has?.includes("text");
});
const textLabel = computed(() => {
  return gqList.value[template_id.value - 1].textLabel ?? "";
});
const textDesc = computed(() => {
  const length = gqList.value[template_id.value - 1].textLength ?? "";
  return `最多输入${length}个字`;
});
const devices = ["iPhone", "Android", "Windows Phone"];
const ua = window.navigator.userAgent;

onMounted(() => {
  canvas.value = document.getElementById("my_canvas");
  ctx.value = canvas.value.getContext("2d");
  const dpr = window.devicePixelRatio || 1; // 获取设备的devicePixelRatio
  canvas.value.width = 300 * dpr; // 画布宽高放大dpr倍，绘制后再缩小dpr倍，解决模糊问题
  canvas.value.height = 300 * dpr; // 画布宽高放大dpr倍，绘制后再缩小dpr倍，解决模糊问题
  canvas.value.style.width = "300px"; // 显示高
  canvas.value.style.height = "300px"; // 显示高
  ctx.value.scale(dpr, dpr); // 按比例缩放画布，解决模糊问题
  init();
});

const clearCanvas = () => {
  progress.value = 0;
  duration.value = 3;
  ctx.value?.clearRect(0, 0, 300, 300);
  canDownload.value = false;
  mergeing.value = false;
};
const mergeDone = () => {
  progress.value = 100;
  canDownload.value = true;
  duration.value = 0;
};
const mergeImg = ref(null) as any;
const generateImg = () => {
  clearCanvas();
  if (devices.some((item) => ua.includes(item))) {
    mergeImg.value?.scrollIntoView();
  }

  if (!user_img.value) {
    console.log("生成图片", user_img.value);
    ElMessage({
      message: "请先上传头像～",
      type: "warning",
    });
  } else {
    mergeFlag.value = true;
    mergeing.value = true;
    progress.value = Math.random() * 30;
    if (template_id.value === 1) {
      drawImg1(ctx.value);
    } else if (template_id.value === 2) {
      drawImg2(ctx.value);
    } else if (template_id.value === 4 || template_id.value === 6) {
      drawImg4(ctx.value);
    } else {
      drawImg3(ctx.value);
    }
  }
};

// 模版1
const drawImg1 = (ctx: any) => {
  const img = new Image();
  img.src = user_img.value;
  const gqImg = new Image();
  gqImg.src = gqList.value[template_id.value - 1].img;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 300, 300);

    gqImg.onload = () => {
      ctx.drawImage(gqImg, 0, 0, 300, 300);
      ctx.fillStyle = textColor.value;
      ctx.font = "26px kaiti";
      ctx.fillText(text.value ?? "", 52, 245);
      mergeDone();
    };
  };
};

// 模版2
const drawImg2 = (ctx: any) => {
  const img = new Image();
  img.src = user_img.value;
  const gqImg = new Image();
  gqImg.src = gqList.value[template_id.value - 1].img;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 300, 300);
    gqImg.onload = () => {
      ctx.drawImage(gqImg, 0, 0, 300, 300);
      mergeDone();
    };
  };
};
// 文字竖排
const drawVerticalText = (
  context: any,
  text: string,
  x: number,
  y: number,
  font: any
) => {
  context.save();
  context.font = font;
  for (var i = 0; i < text.length; i++) {
    context.fillText(text[i], x, y + i * font.size);
  }
  context.restore();
};

const drawImg3 = (ctx: any) => {
  const img = new Image();
  img.src = user_img.value;
  const gqImg = new Image();
  gqImg.src = gqList.value[template_id.value - 1].img;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 300, 300);
    gqImg.onload = () => {
      ctx.drawImage(gqImg, 0, 0, 300, 300);
      mergeDone();
    };
  };
};
// 模版4
const drawImg4 = (ctx: any) => {
  const img = new Image();
  img.src = user_img.value;
  const gqImg = new Image();
  gqImg.src = gqList.value[template_id.value - 1].img;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 300, 300); // 绘制头像
    gqImg.onload = () => {
      ctx.drawImage(gqImg, 0, 0, 300, 300); // 绘制国庆图
      ctx.fillStyle = textColor.value; // 设置文字颜色
      ctx.font = "20px kaiti"; // 设置文字大小及字体
      const textList = text.value?.split("，") ?? []; // 以中文逗号分割文字
      textList.forEach((item: string, i: number) => {
        drawVerticalText(ctx, item ?? "", 20 + i * 20, 186 + i * 20, {
          size: 20,
        }); // 绘制文字
      });
      mergeDone();
    };
  };
};

const downloadImg = () => {
  if (!canDownload.value) {
    ElMessage({
      message: "请先合成头像～",
      type: "warning",
    });
    return;
  }

  const url = canvas.value.toDataURL("image/png");
  if (devices.some((item) => ua.includes(item))) {
    ElMessageBox.alert(
      `
    请长按图片保存
    <img src="${url}" style="width: 100%;height: 100%;object-fit: contain;" />
    `,
      "保存图片",
      {
        dangerouslyUseHTMLString: true,
      }
    );
    return;
  }
  const a = document.createElement("a");
  a.href = url;
  a.download = "国庆头像.png";
  a.click();
};
const clear = () => {
  text.value = "";
};
const init = () => {
  text.value = gqList.value[template_id.value - 1].text ?? "";
  textColor.value = gqList.value[template_id.value - 1].textColor ?? "#FED800";
  mergeFlag.value = false;
};
defineExpose({ clearCanvas, clear, init });
</script>

<style lang="scss">
.el-form-item {
  margin-bottom: 0 !important;
}
.empty_box {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
<style lang="scss" scoped>
.generate_img {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 4px;
  margin: 50px auto 0;
}
.desc {
  margin-top: 8px;
  color: #999;
  font-size: 14px;
}
.generate_area {
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  padding: 12px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.upload_title {
  font-weight: 500;
  margin-bottom: 10px;
}
</style>
