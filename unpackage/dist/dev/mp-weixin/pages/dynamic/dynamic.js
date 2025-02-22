"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + midButton + tabBar)();
}
const midButton = () => "../../components/midbutton.js";
const tabBar = () => "../../components/tabBar.js";
const _sfc_main = {
  __name: "dynamic",
  setup(__props) {
    const dynamicList = common_vendor.ref([
      {
        dynamicID: 1,
        avatar: "/static/dinohead.jpg",
        nickname: "恐龙苯龙",
        content: "今天天气真好，恐龙想CSltdd！",
        images: [
          "/static/dinoonsea.jpg",
          "/static/csltdd.jpg"
        ],
        time: "1小时前",
        isLiked: false,
        likeCount: 156,
        commentList: [{
          commentor: "ltdd",
          content: "不是哥们"
        }]
      },
      {
        dynamicID: 2,
        avatar: "/static/lyt3.jpg",
        nickname: "小雅",
        content: "分享一张照片～",
        images: ["/static/lyt4.jpg"],
        time: "2小时前",
        isLiked: false,
        likeCount: 99,
        commentList: []
      },
      {
        dynamicID: 3,
        avatar: "/static/zjy.jpg",
        nickname: "小蓝",
        content: "今天学习了新的编程知识，感觉收获满满！",
        images: [],
        time: "3小时前",
        isLiked: false,
        likeCount: 248,
        commentList: []
      }
    ]);
    function onLike(dynamicItem) {
      dynamicItem.isLiked = !dynamicItem.isLiked;
      if (dynamicItem.isLiked) {
        dynamicItem.likeCount += 1;
      } else {
        dynamicItem.likeCount -= 1;
      }
    }
    function onComment(dynamicItem) {
      common_vendor.index.showModal({
        title: "发表评论",
        showCancel: true,
        editable: true,
        // 显示输入框
        placeholderText: "请输入评论内容",
        success: (res) => {
          if (res.confirm) {
            const commentContent = res.content.trim();
            if (commentContent) {
              const stored = common_vendor.index.getStorageSync("userInfo");
              dynamicItem.commentList.push({
                commentor: stored.nickname,
                content: commentContent
              });
              common_vendor.index.__f__("log", "at pages/dynamic/dynamic.vue:129", dynamicItem.commentList);
            } else {
              common_vendor.index.showToast({
                title: "评论内容不能为空",
                icon: "none"
              });
            }
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(dynamicList.value, (dynamicItem, dynamicIndex, i0) => {
          return common_vendor.e({
            a: dynamicItem.avatar,
            b: common_vendor.t(dynamicItem.nickname),
            c: common_vendor.t(dynamicItem.content),
            d: dynamicItem.images && dynamicItem.images.length > 0
          }, dynamicItem.images && dynamicItem.images.length > 0 ? {
            e: common_vendor.f(dynamicItem.images, (img, imgIndex, i1) => {
              return {
                a: imgIndex,
                b: img
              };
            })
          } : {}, {
            f: common_vendor.t(dynamicItem.time),
            g: common_vendor.o(($event) => onLike(dynamicItem), dynamicItem.dynamicID),
            h: "e73567d5-0-" + i0,
            i: common_vendor.p({
              type: dynamicItem.isLiked ? "hand-up-filled" : "hand-up",
              size: "35",
              color: "rgb(20, 20, 20)"
            }),
            j: common_vendor.t(dynamicItem.likeCount),
            k: common_vendor.o(($event) => onComment(dynamicItem), dynamicItem.dynamicID),
            l: "e73567d5-1-" + i0,
            m: common_vendor.t(dynamicItem.commentList.length),
            n: common_vendor.f(dynamicItem.commentList, (commentItem, commentIndex, i1) => {
              return {
                a: common_vendor.t(commentItem.commentor),
                b: common_vendor.t(commentItem.content),
                c: commentIndex
              };
            }),
            o: dynamicItem.dynamicID
          });
        }),
        b: common_vendor.p({
          type: "chat",
          size: "35",
          color: "rgb(20, 20, 20)"
        }),
        c: common_vendor.p({
          selectedIndex: 1
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e73567d5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/dynamic/dynamic.js.map
