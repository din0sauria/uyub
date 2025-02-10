"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      images: [],
      isSubmitting: false,
      post: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    async chooseImage() {
      const remaining = 9 - this.images.length;
      common_vendor.index.chooseImage({
        count: remaining,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: (res) => {
          this.images = [...this.images, ...res.tempFilePaths];
        }
      });
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    categoryChange(e) {
      this.selectedCategoryIndex = e.detail.value;
    },
    async publishPost() {
      if (this.isSubmitting)
        return;
      if (!this.post.title.trim()) {
        return common_vendor.index.showToast({ title: "请填写标题", icon: "none" });
      }
      if (!this.post.content.trim()) {
        return common_vendor.index.showToast({ title: "请填写内容", icon: "none" });
      }
      this.isSubmitting = true;
      try {
        const res = await this.$myRequest({
          method: "post",
          url: "/fatie",
          data: {
            ...this.post,
            images: this.images.join(","),
            userId: this.$store.state.user.id,
            communityId: this.$store.state.communityId
          }
        });
        common_vendor.index.showToast({ title: "发布成功", icon: "success" });
        setTimeout(() => common_vendor.index.navigateBack(), 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/add/dynamic.vue:125", "发布失败:", error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.post.title,
    b: common_vendor.o(($event) => $data.post.title = $event.detail.value),
    c: $data.post.content,
    d: common_vendor.o(($event) => $data.post.content = $event.detail.value),
    e: common_vendor.f($data.images, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.removeImage(index), index),
        c: index
      };
    }),
    f: $data.images.length < 9
  }, $data.images.length < 9 ? {
    g: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    h: common_vendor.t($data.isSubmitting ? "发布中..." : "立即发布"),
    i: common_vendor.o((...args) => $options.publishPost && $options.publishPost(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-41388da8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/add/dynamic.js.map
