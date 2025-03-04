"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_icons2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_datetime_picker)();
}
const _sfc_main = {
  __name: "info-manage",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      avatar: "/static/dinohead.jpg",
      nickname: "未登录用户",
      userID: "",
      birthday: ""
    });
    common_vendor.onShow(() => {
      onLoad();
    });
    const onLoad = () => {
      const stored = common_vendor.index.getStorageSync("userInfo");
      if (stored) {
        Object.assign(userInfo, stored);
      }
    };
    const changeAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        // 选择图片的数量
        success: (imgurl) => {
          userInfo.avatar = imgurl.tempFilePaths[0];
          common_vendor.index.uploadFile({
            url: "http://127.0.0.1:4523/m1/5810635-5495696-default/user/fileUpload",
            filePath: imgurl.tempFilePaths[0],
            name: "file",
            formData: {
              "user": "test"
            },
            success: (uploadFileRes) => {
              common_vendor.index.__f__("log", "at pages/me/info-manage.vue:78", uploadFileRes.data);
            },
            fail: (err) => {
              common_vendor.index.__f__("log", "at pages/me/info-manage.vue:81", err);
            }
          });
        }
      });
    };
    const saveUserInfo = () => {
      common_vendor.index.setStorageSync("userInfo", common_vendor.toRaw(userInfo));
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success",
        duration: 2e3
      });
      interactWithBackend();
    };
    const interactWithBackend = () => {
      common_vendor.index.request({
        url: "http://127.0.0.1:4523/m1/5810635-5495696-default/user/update",
        // 替换为实际的后端接口地址
        method: "PUT",
        header: {
          Authorization: `${userInfo.token}`
        },
        body: {
          nickname: userInfo.nickname,
          birthday: userInfo.birthday
        },
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/me/info-manage.vue:119", "后端交互成功", res);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/me/info-manage.vue:123", "后端交互失败", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: userInfo.avatar,
        b: common_vendor.o(changeAvatar),
        c: common_vendor.p({
          type: "camera",
          size: "24",
          color: "#666"
        }),
        d: userInfo.nickname,
        e: common_vendor.o(($event) => userInfo.nickname = $event.detail.value),
        f: common_vendor.o(($event) => userInfo.birthday = $event),
        g: common_vendor.p({
          type: "date",
          ["return-type"]: "string",
          start: "1900-01-01",
          end: "2100-12-31",
          modelValue: userInfo.birthday
        }),
        h: common_vendor.t(userInfo.userID),
        i: common_vendor.o(saveUserInfo)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ef8f52f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/info-manage.js.map
