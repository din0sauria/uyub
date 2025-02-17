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
        commentCount: 45,
        commentList: []
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
        commentCount: 23
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
        commentCount: 32
      }
    ]);
    function onLike(item) {
      item.isLiked = !item.isLiked;
      if (item.isLiked) {
        item.likeCount += 1;
      } else {
        item.likeCount -= 1;
      }
    }
    function onComment() {
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(dynamicList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.t(item.nickname),
            c: common_vendor.t(item.content),
            d: item.images && item.images.length > 0
          }, item.images && item.images.length > 0 ? {
            e: common_vendor.f(item.images, (img, imgIndex, i1) => {
              return {
                a: imgIndex,
                b: img
              };
            })
          } : {}, {
            f: common_vendor.t(item.time),
            g: common_vendor.o(($event) => onLike(item), index),
            h: "e73567d5-0-" + i0,
            i: common_vendor.p({
              type: item.isLiked ? "hand-up-filled" : "hand-up",
              size: "30",
              color: "rgb(41, 121, 255)"
            }),
            j: common_vendor.t(item.likeCount),
            k: common_vendor.o(onComment, index),
            l: "e73567d5-1-" + i0,
            m: common_vendor.t(item.commentCount),
            n: index
          });
        }),
        b: common_vendor.p({
          type: "chat",
          size: "30",
          color: "rgb(41, 121, 255)"
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
