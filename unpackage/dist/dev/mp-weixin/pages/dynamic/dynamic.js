"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (midButton + tabBar)();
}
const midButton = () => "../../components/midbutton.js";
const tabBar = () => "../../components/tabBar.js";
const _sfc_main = {
  __name: "dynamic",
  setup(__props) {
    const dynamicList = [
      {
        avatar: "/static/dinohead.png",
        nickname: "小明",
        content: "今天天气真好，出去散步了！",
        images: [
          "/static/dinoonsea.png",
          "/static/dinoonsea.png",
          "/static/dinoonsea.png"
        ],
        time: "1小时前"
      },
      {
        avatar: "/static/dinohead.png",
        nickname: "小红",
        content: "分享一张美食照片～",
        images: ["/static/dinohead.png"],
        time: "2小时前"
      },
      {
        avatar: "/static/dinohead.png",
        nickname: "小刚",
        content: "今天学习了新的编程知识，感觉收获满满！",
        images: [],
        time: "3小时前"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(dynamicList, (item, index, i0) => {
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
            g: index
          });
        }),
        b: common_vendor.p({
          selectedIndex: 1
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e73567d5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/dynamic/dynamic.js.map
