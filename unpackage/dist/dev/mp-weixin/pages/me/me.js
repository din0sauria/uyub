"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + tabBar)();
}
const tabBar = () => "../../components/tabBar.js";
const _sfc_main = {
  __name: "me",
  setup(__props) {
    const gridList = common_vendor.ref([
      {
        title: "个人信息管理",
        icon: "person",
        color: "#aa00ff",
        handler: () => {
          if (!userInfo.userID) {
            common_vendor.index.showToast({ title: "请先登录", icon: "none" });
            return;
          }
          navTo("info-manage");
        }
      },
      {
        title: "好友管理",
        icon: "staff",
        color: "#007AFF",
        handler: () => {
          if (!userInfo.userID) {
            common_vendor.index.showToast({ title: "请先登录", icon: "none" });
            return;
          }
          navTo("friend-manage");
        }
      },
      {
        title: "发布的活动",
        icon: "notification",
        color: "#4CD964",
        handler: () => {
          if (!userInfo.userID) {
            common_vendor.index.showToast({ title: "请先登录", icon: "none" });
            return;
          }
          navTo("my-published");
        }
      },
      {
        title: "参与的活动",
        icon: "flag",
        color: "#ff0000",
        handler: () => {
          if (!userInfo.userID) {
            common_vendor.index.showToast({ title: "请先登录", icon: "none" });
            return;
          }
          navTo("my-joined");
        }
      },
      {
        title: "建议反馈",
        icon: "help",
        color: "#ff557f",
        handler: () => navTo("feedback")
      },
      {
        title: "关于我们",
        icon: "info",
        color: "#ffaa00",
        handler: () => navTo("about")
      }
    ]);
    const handleGridClick = (item) => {
      if (item.handler)
        item.handler();
    };
    const userInfo = common_vendor.reactive({
      avatar: "/static/dinohead.jpg",
      nickname: "未登录用户",
      userID: "",
      birthday: ""
    });
    common_vendor.onShow(() => {
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
    const handleWechatLogin = async () => {
      if (userInfo.userID)
        return;
      try {
        userInfo.userID = "12345678910";
        userInfo.nickname = "dinosaur";
        userInfo.birthday = "2000-01-01";
        common_vendor.index.showToast({ title: "登录成功" });
        saveUserInfo();
      } catch (err) {
        common_vendor.index.showToast({ title: "登录失败", icon: "none" });
        common_vendor.index.__f__("log", "at pages/me/me.vue:217", err);
      }
    };
    const saveUserInfo = () => {
      common_vendor.index.setStorageSync("userInfo", common_vendor.toRaw(userInfo));
    };
    const logout = () => {
      userInfo.avatar = "/static/dinohead.jpg";
      userInfo.nickname = "未登录用户";
      userInfo.userID = "";
      userInfo.birthday = "";
      common_vendor.index.removeStorageSync("userInfo");
    };
    const navTo = (path) => {
      common_vendor.index.navigateTo({ url: `/pages/me/${path}` });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: userInfo.avatar,
        c: common_vendor.p({
          type: "camera",
          size: "24",
          color: "#666"
        }),
        d: common_vendor.o(uploadAvatar),
        e: common_vendor.t(userInfo.nickname),
        f: userInfo.userID
      }, userInfo.userID ? {
        g: common_vendor.t(userInfo.userID)
      } : {}, {
        h: userInfo.birthday
      }, userInfo.birthday ? {
        i: common_vendor.t(userInfo.birthday)
      } : {}, {
        j: common_vendor.f(gridList.value, (item, index, i0) => {
          return {
            a: "19c123a7-1-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: 30,
              color: item.color
            }),
            c: common_vendor.t(item.title),
            d: index,
            e: common_vendor.o(($event) => handleGridClick(item), index)
          };
        }),
        k: !userInfo.userID
      }, !userInfo.userID ? {
        l: common_vendor.o(handleWechatLogin)
      } : {
        m: common_vendor.o(logout)
      }, {
        n: common_vendor.p({
          selectedIndex: 3
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19c123a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/me.js.map
