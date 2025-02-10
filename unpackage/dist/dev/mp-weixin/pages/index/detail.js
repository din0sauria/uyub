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
  __name: "detail",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      avatar: "/static/dinohead.png",
      nickname: "未登录用户",
      phone: "",
      birthday: ""
    });
    common_vendor.onLoad(() => {
      const stored = common_vendor.index.getStorageSync("userInfo");
      if (stored) {
        Object.assign(userInfo, stored);
      }
    });
    const btntext = common_vendor.computed(() => {
      if (activity.value.status != "正在报名")
        return activity.value.status;
      else
        return userInfo.phone ? "立即报名" : "请先登录";
    });
    const activity = common_vendor.ref({
      id: 2,
      title: "幸福林带冠深酷动力羽毛球馆",
      price: "¥60",
      address: "幸福林带冠深酷动力羽毛球馆",
      detailAddress: "陕西省西安市新城区陕健康昆仑医院东南幸福林带冠深酷动力羽毛球馆",
      date: "02月07日 周五",
      time: "19:00-22:00",
      status: "正在报名",
      participants: 9,
      plan: 10,
      tag: "不限",
      description: `人满可以报名等位，等位人数够4人会＋场地，加不上也会退费。
免责声明:心脏病、高血压不宜打球，酒后严禁打球；如受伤或突发疾病本群不承担任何责任，报名视为同意声明。`,
      images: ["/static/dinoundertreezoom.png", "/static/dinoonsea.png"],
      author: "羽动生活俱乐部",
      avatars: [
        "/static/c1.png",
        "/static/c2.png",
        "/static/c3.png",
        "/static/c4.png",
        "/static/c5.png",
        "/static/c6.png",
        "/static/c7.png",
        "/static/c8.png",
        "/static/c9.png"
        // 超过 8 个
      ],
      authorAvatar: "/static/dinohead.png"
    });
    const activityex = activity.value;
    const activities = [
      {
        id: 1,
        title: "星禾羽毛球运动中心",
        price: "¥50",
        address: "星禾羽毛球运动中心",
        detailAddress: "陕西省西安市星禾羽毛球运动中心",
        date: "02月07日 周五",
        time: "19:00-22:00",
        status: "正在报名",
        participants: 99,
        plan: 100,
        tags: "不限",
        description: `人满可以报名等位，等位人数够4人会＋场地，加不上也会退费。
      免责声明:心脏病、高血压不宜打球，酒后严禁打球；如受伤或突发疾病本群不承担任何责任，报名视为同意声明。`,
        images: ["/static/dinoundertreezoom.png", "/static/dinoonsea.png"],
        author: "羽动生活俱乐部",
        avatars: [
          "/static/c1.png",
          "/static/c2.png",
          "/static/c3.png",
          "/static/c4.png",
          "/static/c5.png",
          "/static/c6.png",
          "/static/c7.png",
          "/static/c8.png",
          "/static/c9.png"
          // 超过 8 个
        ],
        authorAvatar: "/static/dinohead.png"
      },
      {
        id: 2,
        title: "幸福林带冠深酷动力羽毛球馆",
        price: "¥60",
        address: "幸福林带冠深酷动力羽毛球馆",
        detailAddress: "陕西省西安市新城区陕健康昆仑医院东南幸福林带冠深酷动力羽毛球馆",
        date: "02月07日 周五",
        time: "19:00-22:00",
        status: "报名结束",
        participants: 9,
        plan: 10,
        tags: "不限",
        description: `人满可以报名等位，等位人数够4人会＋场地，加不上也会退费。
免责声明:心脏病、高血压不宜打球，酒后严禁打球；如受伤或突发疾病本群不承担任何责任，报名视为同意声明。`,
        images: ["/static/dinoundertreezoom.png", "/static/dinoonsea.png"],
        author: "羽动生活俱乐部",
        avatars: [
          "/static/c1.png",
          "/static/c2.png",
          "/static/c3.png",
          "/static/c4.png",
          "/static/c5.png",
          "/static/c6.png",
          "/static/c7.png",
          "/static/c8.png",
          "/static/c9.png"
          // 超过 8 个
        ],
        authorAvatar: "/static/dinohead.png"
      },
      {
        id: 3,
        title: "西安奥体中心羽毛球馆",
        price: "¥50",
        address: "西安市国际港务区港丰路69号",
        date: "02月07日 周五",
        time: "09:00-22:00",
        status: "已报名",
        participants: 50,
        plan: 100,
        tags: "专业"
      },
      {
        id: 4,
        title: "新曈羽毛球训练中心",
        price: "¥60",
        address: "西安省体育馆BE中心",
        date: "02月07日 周五",
        time: "10:00-22:00",
        status: "正在报名",
        participants: 20,
        plan: 50,
        tags: "专业"
      },
      {
        id: 5,
        title: "西安西北大学羽毛球馆",
        price: "¥10",
        address: "西安市太白北路229号西北大学校内",
        date: "02月07日 周五",
        time: "14:30-22:00",
        status: "正在报名",
        participants: 30,
        plan: 60,
        tags: "休闲"
      },
      {
        id: 6,
        title: "朱雀羽毛球馆",
        price: "¥35",
        address: "西安市碑林区长安路北段14号",
        date: "02月07日 周五",
        time: "09:00-22:00",
        status: "正在报名",
        participants: 40,
        plan: 80,
        tags: "专业"
      },
      {
        id: 7,
        title: "西安博蓝羽毛球馆",
        price: "免费",
        address: "西安市经济开发区凤城十路99号蓝天院内",
        date: "02月07日 周五",
        time: "08:00-22:00",
        status: "正在报名",
        participants: 10,
        plan: 30,
        tags: "萌新"
      }
    ];
    const fetchActivityDetail = async (activityId) => {
      try {
        for (const res of activities) {
          if (res.id == activityId) {
            activity.value = res;
            return;
          }
        }
        common_vendor.index.__f__("log", "at pages/index/detail.vue:271", activityId);
        throw new Error("活动未找到");
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取活动详情失败",
          icon: "error"
        });
        common_vendor.index.__f__("error", "at pages/index/detail.vue:278", error);
      }
    };
    common_vendor.onLoad((options) => {
      const activityId = options.id;
      fetchActivityDetail(activityId);
    });
    const handleSignUp = () => {
      if (btntext.value != "立即报名")
        return;
      activity.value.participants += 1;
      activity.value.status = "已报名";
      common_vendor.index.showToast({
        title: "报名成功",
        icon: "success"
      });
    };
    const displayedAvatars = common_vendor.computed(() => {
      return activity.value.avatars.slice(0, 8);
    });
    common_vendor.computed(() => {
      return displayedAvatars.value.avatars.length > 8;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(activity.value.images || common_vendor.unref(activityex).images, (image, index, i0) => {
          return {
            a: image,
            b: index
          };
        }),
        b: common_vendor.t(activity.value.price),
        c: common_vendor.t(activity.value.title),
        d: common_vendor.p({
          type: "location",
          color: "#fff"
        }),
        e: common_vendor.t(activity.value.address),
        f: common_vendor.p({
          type: "map",
          color: "#fff"
        }),
        g: common_vendor.t(activity.value.detailAddress),
        h: common_vendor.t(activity.value.date),
        i: common_vendor.t(activity.value.time),
        j: common_vendor.t(activity.value.tag || "不限"),
        k: common_vendor.t(activity.value.status),
        l: common_vendor.t(activity.value.participants),
        m: common_vendor.t(activity.value.plan),
        n: common_vendor.f(displayedAvatars.value, (avatar, index, i0) => {
          return {
            a: avatar,
            b: index
          };
        }),
        o: common_vendor.p({
          type: "more-filled",
          size: "24"
        }),
        p: activity.value.authorAvatar || common_vendor.unref(activityex).authorAvatar,
        q: common_vendor.t(activity.value.author || common_vendor.unref(activityex).author),
        r: common_vendor.t(activity.value.description || common_vendor.unref(activityex).description),
        s: common_vendor.t(btntext.value),
        t: common_vendor.o(handleSignUp)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9e4af262"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/detail.js.map
