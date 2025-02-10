"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_card + _easycom_uni_list_item + _easycom_uni_list + tabBar)();
}
const tabBar = () => "../../components/tabBar.js";
const _sfc_main = {
  __name: "me",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      avatar: "/static/dinohead.png",
      nickname: "未登录用户",
      phone: "",
      birthday: ""
    });
    common_vendor.onLoad(() => {
      const stored = common_vendor.index.getStorageSync("userInfo");
      if (stored) {
        Object.assign(userInfo, stored);
      }
    });
    const uploadAvatar = async () => {
      try {
        const res = await common_vendor.index.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"]
        });
        userInfo.avatar = res.tempFilePaths[0];
      } catch (err) {
        common_vendor.index.showToast({ title: "上传失败", icon: "none" });
      }
    };
    const decryptPhoneNumber = async (e) => {
      if (e.detail.errMsg !== "getPhoneNumber:ok")
        return;
      try {
        userInfo.phone = "12345678910";
        userInfo.nickname = "dinosaur";
        userInfo.birthday = "2000-01-01";
        common_vendor.index.showToast({ title: "登录成功" });
        saveUserInfo();
      } catch (err) {
        common_vendor.index.showToast({ title: "登录失败", icon: "none" });
      }
    };
    const saveUserInfo = () => {
      common_vendor.index.setStorageSync("userInfo", common_vendor.toRaw(userInfo));
    };
    const logout = () => {
      userInfo.avatar = "/static/dinohead.png";
      userInfo.nickname = "未登录用户";
      userInfo.phone = "";
      userInfo.birthday = "";
      common_vendor.index.removeStorageSync("userInfo");
    };
    const navTo = (path) => {
      common_vendor.index.navigateTo({ url: `/pages/me/${path}` });
    };
    const contactService = () => {
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.avatar,
        b: common_vendor.p({
          type: "camera",
          size: "24",
          color: "#666"
        }),
        c: common_vendor.o(uploadAvatar),
        d: common_vendor.t(userInfo.nickname),
        e: userInfo.phone
      }, userInfo.phone ? {
        f: common_vendor.t(userInfo.phone)
      } : {}, {
        g: userInfo.birthday
      }, userInfo.birthday ? {
        h: common_vendor.t(userInfo.birthday)
      } : {}, {
        i: common_vendor.p({
          type: "personadd",
          size: "20",
          color: "#007AFF"
        }),
        j: common_vendor.p({
          title: "好友管理",
          showArrow: true
        }),
        k: common_vendor.p({
          type: "notification",
          size: "20",
          color: "#4CD964"
        }),
        l: common_vendor.o(($event) => navTo("my-published")),
        m: common_vendor.p({
          title: "我发布的活动",
          showArrow: true
        }),
        n: common_vendor.p({
          type: "flag",
          size: "20",
          color: "#F0AD4E"
        }),
        o: common_vendor.o(($event) => navTo("my-joined")),
        p: common_vendor.p({
          title: "我参与的活动",
          showArrow: true
        }),
        q: common_vendor.p({
          type: "help",
          size: "20",
          color: "#DD524D"
        }),
        r: common_vendor.o(($event) => navTo("feedback")),
        s: common_vendor.p({
          title: "建议反馈",
          showArrow: true
        }),
        t: common_vendor.p({
          type: "phone",
          size: "20",
          color: "#10AEFF"
        }),
        v: common_vendor.o(contactService),
        w: common_vendor.p({
          title: "联系客服",
          showArrow: true
        }),
        x: !userInfo.phone
      }, !userInfo.phone ? {
        y: common_vendor.o(decryptPhoneNumber)
      } : {
        z: common_vendor.o(logout)
      }, {
        A: common_vendor.p({
          selectedIndex: 3
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19c123a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/me.js.map
