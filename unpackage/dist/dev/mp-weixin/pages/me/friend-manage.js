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
  __name: "friend-manage",
  setup(__props) {
    const userID = common_vendor.ref("");
    const friendList = common_vendor.ref([]);
    const fetchFriends = async () => {
      try {
        friendList.value = [
          {
            avatar: "/static/dinohead.jpg",
            nickname: "dinosaur1",
            friendId: "12345678910"
          },
          {
            avatar: "/static/dinohead.jpg",
            nickname: "dinosaur2",
            friendId: "12345678911"
          }
        ];
      } catch (error) {
        common_vendor.index.showToast({ title: "加载失败", icon: "none" });
      }
    };
    const deleteFriend = async (friendId) => {
      try {
        friendList.value = friendList.value.filter((f) => f.friendId !== friendId);
        common_vendor.index.showToast({ title: "删除成功", icon: "success" });
      } catch (error) {
        common_vendor.index.showToast({ title: "删除失败", icon: "none" });
      }
    };
    const handleDelete = (friend) => {
      common_vendor.index.showModal({
        title: "确认删除",
        content: `确定要删除好友 ${friend.nickname} 吗？`,
        success: (res) => {
          if (res.confirm) {
            deleteFriend(friend.friendId);
          }
        }
      });
    };
    common_vendor.onLoad(() => {
      userID.value = common_vendor.index.getStorageSync("userID");
      fetchFriends();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(friendList.value, (friend, index, i0) => {
          return {
            a: friend.avatar || "/static/default-avatar.png",
            b: common_vendor.t(friend.nickname || "未命名用户"),
            c: common_vendor.t(friend.friendId),
            d: "6fd3c8f1-0-" + i0,
            e: common_vendor.o(($event) => handleDelete(friend), friend.friendId),
            f: friend.friendId
          };
        }),
        b: common_vendor.p({
          type: "trash",
          size: "30",
          color: "#ff4444"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/friend-manage.js.map
