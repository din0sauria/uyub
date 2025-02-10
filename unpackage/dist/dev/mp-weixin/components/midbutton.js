"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleButton() {
      this.isActive = !this.isActive;
      this.isActive ? this.$refs.popup.open() : this.$refs.popup.close();
    },
    handleButton1() {
      common_vendor.index.navigateTo({
        url: "/pages/add/dynamic"
      });
      this.closePopup();
    },
    handleButton2() {
      common_vendor.index.navigateTo({
        url: "/pages/add/activity"
      });
      this.closePopup();
    },
    closePopup() {
      this.isActive = false;
      this.$refs.popup.close();
    },
    onPopupChange(e) {
      if (e.type === "close")
        this.isActive = false;
    }
  }
};
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.n({
      "active": $data.isActive
    }),
    c: common_vendor.o((...args) => $options.toggleButton && $options.toggleButton(...args)),
    d: common_vendor.p({
      type: "paperplane-filled",
      size: "50rpx"
    }),
    e: common_vendor.o((...args) => $options.handleButton1 && $options.handleButton1(...args)),
    f: common_vendor.p({
      type: "compose",
      size: "50rpx"
    }),
    g: common_vendor.o((...args) => $options.handleButton2 && $options.handleButton2(...args)),
    h: common_vendor.sr("popup", "473b7fc9-0"),
    i: common_vendor.o($options.onPopupChange),
    j: common_vendor.p({
      type: "center"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-473b7fc9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/midbutton.js.map
