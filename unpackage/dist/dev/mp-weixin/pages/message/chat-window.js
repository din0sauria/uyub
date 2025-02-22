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
    const chatRecords = {
      "8": {
        // 用户1的聊天记录
        "1": [
          // 与用户2的聊天记录
          {
            senderId: "1",
            content: "你好！",
            time: "2025-02-18T10:00:00"
          },
          {
            senderId: "8",
            content: "你好，我是彭于晏",
            time: "2025-02-18T10:01:00"
          }
        ],
        "3": [
          // 与用户3的聊天记录
          {
            senderId: "1",
            content: "嗨，最近怎么样？",
            time: "2025-02-18T11:00:00"
          }
        ]
      },
      "2": {
        // 用户2的聊天记录
        "1": [
          // 与用户1的聊天记录（与上面重复，但为了完整性保留）
          {
            senderId: "1",
            content: "你好！",
            time: "2025-02-18T10:00:00"
          },
          {
            senderId: "2",
            content: "你好，我是朋友",
            time: "2025-02-18T10:01:00"
          }
        ]
      },
      "3": {
        // 用户3的聊天记录
        "1": [
          // 与用户1的聊天记录
          {
            senderId: "1",
            content: "嗨，最近怎么样？",
            time: "2025-02-18T11:00:00"
          }
        ]
      }
    };
    const myInfo = common_vendor.reactive({
      avatar: "/static/pyy.jpeg",
      nickname: "未登录用户",
      userID: "8",
      birthday: ""
    });
    const friendInfo = common_vendor.reactive({
      avatar: "",
      nickname: "",
      userID: ""
    });
    const messages = common_vendor.ref([]);
    common_vendor.onLoad((options) => {
      const stored = common_vendor.index.getStorageSync("userInfo");
      if (stored) {
        Object.assign(myInfo, stored);
      }
      friendInfo.avatar = options.friendAvatar;
      friendInfo.nickname = options.friendName;
      friendInfo.userID = options.friendId;
      const friendId = options.friendId;
      const myId = myInfo.userID;
      fetchChatHistory(friendId, myId);
    });
    const fetchChatHistory = async (friendId, myId) => {
      try {
        if (chatRecords[myId] && chatRecords[myId][friendId]) {
          const chatHistory = chatRecords[myId][friendId];
          messages.value = chatHistory.map((message) => ({
            time: message.time,
            content: message.content,
            isSelf: message.senderId === myId
            // 如果 senderId 等于 myId，则 isSelf 为 true
          }));
          common_vendor.index.__f__("log", "at pages/message/chat-window.vue:157", "聊天记录转换成功:", messages.value);
        } else {
          common_vendor.index.__f__("log", "at pages/message/chat-window.vue:159", "没有找到与该朋友的聊天记录");
          messages.value = [];
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/message/chat-window.vue:163", "获取聊天记录失败:", error);
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const messageToSend = common_vendor.ref("");
    const toggle = common_vendor.ref(false);
    function onComfirm() {
      messages.value.push({
        content: messageToSend.value,
        isSelf: true
      });
      common_vendor.index.__f__("log", "at pages/message/chat-window.vue:194", messages);
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
        c: common_vendor.t(friendInfo.nickname),
        d: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        e: common_vendor.f(messages.value, (msg, index, i0) => {
          return common_vendor.e({
            a: !msg.isSelf
          }, !msg.isSelf ? {
            b: friendInfo.avatar,
            c: common_vendor.t(msg.content)
          } : {
            d: myInfo.avatar,
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
      }, toggle.value ? {
        l: common_vendor.o(onComfirm)
      } : {
        m: common_vendor.p({
          type: "fire",
          size: "30"
        }),
        n: common_vendor.p({
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
