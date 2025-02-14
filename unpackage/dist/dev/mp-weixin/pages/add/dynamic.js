"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "dynamic",
  setup(__props) {
    const images = common_vendor.ref([]);
    const isSubmitting = common_vendor.ref(false);
    const post = common_vendor.reactive({
      title: "",
      content: ""
    });
    common_vendor.ref(null);
    const chooseImage = () => {
      const remaining = 9 - images.value.length;
      common_vendor.index.chooseImage({
        count: remaining,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: (res) => {
          images.value.push(...res.tempFilePaths);
        }
      });
    };
    const removeImage = (index) => {
      images.value.splice(index, 1);
    };
    const userInfo = common_vendor.reactive({
      avatar: "/static/dinohead.png",
      nickname: "未登录用户",
      userID: "",
      birthday: ""
    });
    common_vendor.onLoad(() => {
      const stored = common_vendor.index.getStorageSync("userInfo");
      if (stored) {
        Object.assign(userInfo, stored);
      }
    });
    const publishPost = async () => {
      if (userInfo.userID == "") {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      if (isSubmitting.value)
        return;
      if (!post.title.trim()) {
        common_vendor.index.showToast({ title: "请填写标题", icon: "none" });
        return;
      }
      if (!post.content.trim()) {
        common_vendor.index.showToast({ title: "请填写内容", icon: "none" });
        return;
      }
      isSubmitting.value = true;
      try {
        common_vendor.index.__f__("log", "at pages/add/dynamic.vue:138", images.value.join(","));
        const res = await common_vendor.index.request({
          method: "post",
          url: "/fatie",
          data: JSON.stringify(
            {
              ...post,
              images: images.value.join(","),
              userID: userInfo.userID
            }
          )
        });
        common_vendor.index.showToast({ title: "发布成功", icon: "success" });
        setTimeout(() => common_vendor.index.navigateBack(), 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/add/dynamic.vue:152", "发布失败:", error);
      } finally {
        isSubmitting.value = false;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: post.title,
        b: common_vendor.o(($event) => post.title = $event.detail.value),
        c: post.content,
        d: common_vendor.o(($event) => post.content = $event.detail.value),
        e: common_vendor.f(images.value, (image, index, i0) => {
          return {
            a: image,
            b: common_vendor.o(($event) => removeImage(index), index),
            c: index
          };
        }),
        f: images.value.length < 9
      }, images.value.length < 9 ? {
        g: common_vendor.o(chooseImage)
      } : {}, {
        h: common_vendor.t(userInfo.userID ? "立即发布" : "请先登录"),
        i: common_vendor.o(publishPost)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-41388da8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/add/dynamic.js.map
