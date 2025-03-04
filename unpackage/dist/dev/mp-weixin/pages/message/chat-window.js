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
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const myInfo = common_vendor.reactive({
      avatar: "/static/pyy.jpeg",
      nickname: "未登录用户",
      userID: "8"
    });
    const friendInfo = common_vendor.reactive({
      avatar: "",
      nickname: "",
      userID: ""
    });
    const messages = common_vendor.ref([]);
    const messageToSend = common_vendor.ref("");
    const scrollTop = common_vendor.ref(0);
    common_vendor.onLoad((options) => {
      const stored = common_vendor.index.getStorageSync("userInfo");
      if (stored)
        Object.assign(myInfo, stored);
      friendInfo.avatar = options.friendAvatar || "/static/default-avatar.png";
      friendInfo.nickname = options.friendName || "未命名用户";
      friendInfo.userID = options.friendId;
      loadHistoryMessages(options.friendId, myInfo.userID);
    });
    const loadHistoryMessages = (friendId, myId) => {
      var _a;
      try {
        const chatHistory = ((_a = chatRecords[myId]) == null ? void 0 : _a[friendId]) || [];
        messages.value = chatHistory.map((msg) => ({
          content: msg.content,
          isSelf: msg.senderId === myId
        }));
        scrollToBottom();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/message/chat-window.vue:102", "加载历史消息失败:", error);
      }
    };
    const sendMessage = () => {
      const content = messageToSend.value.trim();
      if (!content)
        return;
      messages.value.push({
        content,
        isSelf: true
      });
      messageToSend.value = "";
      scrollToBottom();
    };
    const scrollToBottom = () => {
      common_vendor.nextTick$1(() => {
        scrollTop.value = Math.random();
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const chatRecords = {
      "8": {
        // 用户1的聊天记录
        "1": [
          // 与用户2的聊天记录
          {
            senderId: "1",
            content: "你好！"
          },
          {
            senderId: "8",
            content: "你好，我是彭于晏"
          }
        ],
        "3": [
          // 与用户3的聊天记录
          {
            senderId: "1",
            content: "嗨，最近怎么样？"
          }
        ]
      },
      "2": {
        // 用户2的聊天记录
        "1": [
          // 与用户1的聊天记录（与上面重复，但为了完整性保留）
          {
            senderId: "1",
            content: "你好！"
          },
          {
            senderId: "2",
            content: "你好，我是朋友"
          }
        ]
      },
      "3": {
        // 用户3的聊天记录
        "1": [
          // 与用户1的聊天记录
          {
            senderId: "1",
            content: "嗨，最近怎么样？"
          }
        ]
      }
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: common_vendor.p({
          type: "left",
          size: "24",
          color: "#333"
        }),
        b: common_vendor.t(friendInfo.nickname),
        c: common_vendor.o(goBack),
        d: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        e: common_vendor.f(messages.value, (msg, index, i0) => {
          return {
            a: msg.isSelf ? myInfo.avatar : friendInfo.avatar,
            b: common_vendor.t(msg.content),
            c: index,
            d: msg.isSelf ? 1 : ""
          };
        }),
        f: scrollTop.value,
        g: common_vendor.o(sendMessage),
        h: messageToSend.value,
        i: common_vendor.o(($event) => messageToSend.value = $event.detail.value),
        j: !messageToSend.value.trim() ? 1 : "",
        k: common_vendor.o(sendMessage),
        l: ((_b = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _b.bottom) + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e70fae52"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/chat-window.js.map
