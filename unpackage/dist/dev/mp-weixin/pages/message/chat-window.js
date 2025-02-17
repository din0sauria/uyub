"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "chat-window",
  setup(__props) {
    const {
      safeAreaInsets
    } = common_vendor.index.getSystemInfoSync();
    const friend = common_vendor.ref({
      id: 1,
      name: "小美",
      avatar: "/static/lyt4.jpg"
    });
    const self = common_vendor.ref({
      name: "帅哥",
      avatar: "/static/pyy.jpeg"
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const messages = common_vendor.ref([
      {
        content: "你好呀！",
        isSelf: false
      },
      {
        content: "你好，我是彭于晏。",
        isSelf: true
      }
    ]);
    const messageToSend = common_vendor.ref("");
    const toggle = common_vendor.ref(false);
    const id = common_vendor.ref(messages.value[messages.value.length - 1].id);
    function onComfirm() {
      messages.value.push({
        id: ++id.value,
        content: messageToSend.value,
        isSelf: true
      });
      messageToSend.value = "";
    }
    function onFocus() {
      toggle.value = true;
    }
    function onBlur() {
      toggle.value = false;
    }
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.p({
          type: "left",
          size: "24",
          color: "gray"
        }),
        b: common_vendor.o(goBack),
        c: common_vendor.t(friend.value.name),
        d: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        e: common_vendor.f(messages.value, (msg, index, i0) => {
          return common_vendor.e({
            a: !msg.isSelf
          }, !msg.isSelf ? {
            b: friend.value.avatar,
            c: common_vendor.t(msg.content)
          } : {
            d: self.value.avatar,
            e: common_vendor.t(msg.content)
          }, {
            f: msg.id
          });
        }),
        f: common_vendor.o(onFocus),
        g: common_vendor.o(onBlur),
        h: common_vendor.o(onComfirm),
        i: messageToSend.value,
        j: common_vendor.o(($event) => messageToSend.value = $event.detail.value),
        k: toggle.value
      }, toggle.value ? {} : {
        l: common_vendor.p({
          type: "fire",
          size: "30"
        }),
        m: common_vendor.p({
          type: "plus",
          size: "30"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e70fae52"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/chat-window.js.map
