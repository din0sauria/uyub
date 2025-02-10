"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (midButton + tabBar)();
}
const midButton = () => "../../components/midbutton.js";
const tabBar = () => "../../components/tabBar.js";
const _sfc_main = {
  __name: "message",
  setup(__props) {
    const messages = common_vendor.ref([
      {
        id: 1,
        avatar: "/static/c1.png",
        title: "微信用户1",
        content: "收到微信用户1的消息",
        time: "10:30"
      },
      {
        id: 2,
        avatar: "/static/c2.png",
        title: "微信用户2",
        content: "收到微信用户2的消息",
        time: "10:25"
      }
      // 其他消息...
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages.value, (message, k0, i0) => {
          return {
            a: message.avatar,
            b: common_vendor.t(message.title),
            c: common_vendor.t(message.content),
            d: common_vendor.t(message.time),
            e: message.id
          };
        }),
        b: common_vendor.p({
          ["selected-index"]: 2
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
