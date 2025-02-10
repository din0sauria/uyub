"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "midbutton",
  setup(__props) {
    const isActive = common_vendor.ref(false);
    const toggleButton = () => {
      isActive.value = !isActive.value;
      isActive.value ? popup.value.open() : popup.value.close();
    };
    const handleButton1 = () => {
      common_vendor.index.navigateTo({
        url: "/pages/add/dynamic"
      });
      closePopup();
    };
    const handleButton2 = () => {
      common_vendor.index.navigateTo({
        url: "/pages/add/activity"
      });
      closePopup();
    };
    const closePopup = () => {
      isActive.value = false;
      popup.value.close();
    };
    const onPopupChange = (e) => {
      if (e.type === "close")
        isActive.value = false;
    };
    const popup = common_vendor.ref(null);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.n({
          "active": isActive.value
        }),
        c: common_vendor.o(toggleButton),
        d: common_vendor.p({
          type: "paperplane-filled",
          size: "50rpx"
        }),
        e: common_vendor.o(handleButton1),
        f: common_vendor.p({
          type: "compose",
          size: "50rpx"
        }),
        g: common_vendor.o(handleButton2),
        h: common_vendor.sr(popup, "473b7fc9-0", {
          "k": "popup"
        }),
        i: common_vendor.o(onPopupChange),
        j: common_vendor.p({
          type: "center"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-473b7fc9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/midbutton.js.map
