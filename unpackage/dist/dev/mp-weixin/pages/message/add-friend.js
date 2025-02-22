"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "add-friend",
  setup(__props) {
    const formData = common_vendor.reactive({
      friendId: "",
      message: "我是"
    });
    const userInfo = common_vendor.reactive({
      avatar: "/static/dinohead.jpg",
      nickname: "未登录用户",
      userID: "",
      birthday: ""
    });
    const loading = common_vendor.ref(false);
    common_vendor.onReady(() => {
      const stored = common_vendor.index.getStorageSync("userInfo");
      if (stored) {
        Object.assign(userInfo, stored);
      }
    });
    const handleSubmit = async () => {
      if (!formData.friendId.trim()) {
        common_vendor.index.showToast({ title: "请输入对方ID", icon: "none" });
        return;
      }
      if (loading.value)
        return;
      loading.value = true;
      const res = await mockAddFriendAPI();
      if (res.success) {
        common_vendor.index.showToast({ title: "请求已发送", icon: "success" });
        setTimeout(() => common_vendor.index.navigateBack(), 1500);
      } else {
        common_vendor.index.showModal({
          title: "发送失败",
          content: res.message || "请检查ID是否正确",
          showCancel: false
        });
      }
      loading.value = false;
    };
    const mockAddFriendAPI = (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: Math.random() > 0.5,
            message: "对方不存在或网络错误"
          });
        }, 800);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: formData.friendId,
        b: common_vendor.o(($event) => formData.friendId = $event.detail.value),
        c: formData.message,
        d: common_vendor.o(($event) => formData.message = $event.detail.value),
        e: common_vendor.t(loading.value ? "发送中..." : "发送好友请求"),
        f: common_vendor.o(handleSubmit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-72fb3617"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/add-friend.js.map
