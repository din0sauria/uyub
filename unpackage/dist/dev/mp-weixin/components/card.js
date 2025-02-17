"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "card",
  props: {
    actID: String,
    // 活动 ID
    title: String,
    price: String,
    address: String,
    date: String,
    time: String,
    status: String,
    participants: Number,
    plan: Number,
    tag: String,
    author: String,
    authorAvatar: String
  },
  emits: ["sign-up"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const onSignUp = () => {
      common_vendor.index.navigateTo({
        url: `/pages/index/detail?actID=${props.actID}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.t(__props.price),
        c: common_vendor.p({
          type: "location-filled"
        }),
        d: common_vendor.t(__props.address),
        e: common_vendor.p({
          type: "calendar-filled"
        }),
        f: common_vendor.t(__props.date),
        g: common_vendor.t(__props.time),
        h: common_vendor.p({
          type: "personadd-filled"
        }),
        i: common_vendor.t(__props.status),
        j: common_vendor.t(__props.participants),
        k: common_vendor.t(__props.plan),
        l: common_vendor.t(__props.tag),
        m: __props.authorAvatar || "/static/dinohead.jpg",
        n: common_vendor.t(__props.author || "未知俱乐部"),
        o: common_vendor.o(onSignUp)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cc328a3d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/card.js.map
