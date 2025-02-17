"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "message",
  setup(__props) {
    const messages = common_vendor.ref([
      {
        friendId: 1,
        friendName: "小美",
        friendAvatar: "/static/lyt4.jpg",
        lastMessage: "你好，我是彭于晏。",
        lastMessageTime: "18:35",
        unreadCount: 0
      },
      {
        friendId: 2,
        friendName: "恐龙苯龙",
        friendAvatar: "/static/xkl.jpg",
        lastMessage: "ltdd超市",
        lastMessageTime: "18:33",
        unreadCount: 1
      },
      {
        friendId: 5,
        friendName: "little day day",
        friendAvatar: "/static/ltdd.jpg",
        lastMessage: "qwq",
        lastMessageTime: "17:59",
        unreadCount: 1
      },
      {
        friendId: 3,
        friendName: "小蓝",
        friendAvatar: "/static/zjy.jpg",
        lastMessage: "OKOK",
        lastMessageTime: "11:56",
        unreadCount: 2
      },
      {
        friendId: 4,
        friendName: "小雅",
        friendAvatar: "/static/lyt2.jpg",
        lastMessage: "拜拜",
        lastMessageTime: "09:13",
        unreadCount: 0
      },
      {
        friendId: 9,
        friendName: "小帅",
        friendAvatar: "/static/lm.jpg",
        lastMessage: "好嘞！",
        lastMessageTime: "昨天 23:22",
        unreadCount: 1
      },
      {
        friendId: 6,
        friendName: "小薇",
        friendAvatar: "/static/lyt1.jpg",
        lastMessage: "我们不可能",
        lastMessageTime: "昨天 22:14",
        unreadCount: 0
      },
      {
        friendId: 7,
        friendName: "小萱",
        friendAvatar: "/static/lyt3.jpg",
        lastMessage: "好吧",
        lastMessageTime: "星期一",
        unreadCount: 0
      }
    ]);
    const goToChatWindow = (message) => {
      common_vendor.index.navigateTo({
        //   url: `/pages/message/chat-window?id=${message.friendId}`,
        url: "/pages/message/chat-window"
      });
    };
    const searchKeyword = common_vendor.ref("");
    const filteredMessages = common_vendor.computed(() => {
      return messages.value.filter(
        (message) => message.friendName.includes(searchKeyword.value)
      );
    });
    function checkReply() {
    }
    function checkLike() {
    }
    function checkNewFans() {
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search",
          size: "50rpx"
        }),
        b: searchKeyword.value,
        c: common_vendor.o(($event) => searchKeyword.value = $event.detail.value),
        d: common_vendor.o(checkReply),
        e: common_vendor.p({
          type: "chatbubble-filled",
          color: "#00FFCC",
          size: "96rpx"
        }),
        f: common_vendor.o(checkLike),
        g: common_vendor.p({
          type: "hand-up-filled",
          color: "#FF6699",
          size: "96rpx"
        }),
        h: common_vendor.o(checkNewFans),
        i: common_vendor.p({
          type: "personadd-filled",
          color: "#00ffff",
          size: "96rpx"
        }),
        j: common_vendor.f(filteredMessages.value, (message, k0, i0) => {
          return common_vendor.e({
            a: message.friendAvatar,
            b: common_vendor.t(message.friendName),
            c: common_vendor.t(message.lastMessage),
            d: common_vendor.t(message.lastMessageTime),
            e: message.unreadCount > 0
          }, message.unreadCount > 0 ? {
            f: common_vendor.t(message.unreadCount)
          } : {}, {
            g: message.friendId,
            h: common_vendor.o(($event) => goToChatWindow(), message.friendId)
          });
        }),
        k: common_vendor.sr("tabBarRef", "4c1b26cf-4"),
        l: common_vendor.p({
          selectedIndex: 2
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c1b26cf"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
