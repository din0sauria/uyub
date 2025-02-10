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
const activeColor = "#2979FF";
const inactiveColor = "#666";
const _sfc_main = {
  __name: "tabBar",
  props: {
    selectedIndex: Number
  },
  setup(__props) {
    const props = __props;
    const tabList = [
      { icon: "home", text: "首页", pagePath: "/pages/index/index" },
      { icon: "star", text: "动态", pagePath: "/pages/dynamic/dynamic" },
      { icon: "chat", text: "消息", pagePath: "/pages/message/message" },
      { icon: "person", text: "我的", pagePath: "/pages/me/me" }
    ];
    const internalSelectedIndex = common_vendor.ref(props.selectedIndex);
    common_vendor.watch(() => props.selectedIndex, (newVal) => {
      internalSelectedIndex.value = newVal;
    });
    const handleTabClick = (pagePath) => {
      common_vendor.index.redirectTo({ url: pagePath });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabList, (item, index, i0) => {
          return {
            a: "22586f07-0-" + i0,
            b: common_vendor.p({
              type: __props.selectedIndex === index ? item.icon + "-filled" : item.icon,
              color: __props.selectedIndex === index ? activeColor : inactiveColor,
              size: "28"
            }),
            c: common_vendor.t(item.text),
            d: __props.selectedIndex === index ? activeColor : inactiveColor,
            e: index,
            f: __props.selectedIndex === index ? 1 : "",
            g: common_vendor.o(($event) => handleTabClick(item.pagePath), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-22586f07"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/tabBar.js.map
