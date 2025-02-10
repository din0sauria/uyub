"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_icons2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_datetime_picker + ActivityCard)();
}
const ActivityCard = () => "../../components/card.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const single = common_vendor.ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    const filters = common_vendor.ref(["不限", "萌新", "中级", "高级"]);
    const selectedFilter = common_vendor.ref(0);
    const onFilterChange = (e) => {
      selectedFilter.value = e.detail.value;
    };
    const activities = [
      {
        id: "1",
        title: "星禾羽毛球运动中心",
        price: "¥50",
        address: "星禾羽毛球运动中心",
        date: "02月07日 周五",
        time: "19:00-22:00",
        status: "正在报名",
        participants: 99,
        plan: 100,
        tag: "不限"
      },
      {
        id: "2",
        title: "幸福林带冠深酷动力羽毛球馆",
        price: "¥60",
        address: "幸福林带冠深酷动力羽毛球馆",
        date: "02月07日 周五",
        time: "19:00-22:00",
        status: "报名结束",
        participants: 8,
        plan: 10,
        tag: "高级"
      },
      {
        id: "3",
        title: "西安奥体中心羽毛球馆",
        price: "¥50",
        address: "西安市国际港务区港丰路69号",
        date: "02月07日 周五",
        time: "09:00-22:00",
        status: "正在报名",
        participants: 50,
        plan: 100,
        tag: "高级"
      },
      {
        id: "4",
        title: "新曈羽毛球训练中心",
        price: "¥60",
        address: "西安省体育馆BE中心",
        date: "02月07日 周五",
        time: "10:00-22:00",
        status: "报名中",
        participants: 20,
        plan: 50,
        tag: "高级"
      },
      {
        id: "5",
        title: "西安西北大学羽毛球馆",
        price: "¥10",
        address: "西安市太白北路229号西北大学校内",
        date: "02月07日 周五",
        time: "14:30-22:00",
        status: "报名中",
        participants: 30,
        plan: 60,
        tag: "休闲"
      },
      {
        id: "6",
        title: "朱雀羽毛球馆",
        price: "¥35",
        address: "西安市碑林区长安路北段14号",
        date: "02月07日 周五",
        time: "09:00-22:00",
        status: "正在报名",
        participants: 40,
        plan: 80,
        tag: "高级"
      },
      {
        id: "7",
        title: "西安博蓝羽毛球馆",
        price: "免费",
        address: "西安市经济开发区凤城十路99号蓝天院内",
        date: "02月07日 周五",
        time: "08:00-22:00",
        status: "报名中",
        participants: 10,
        plan: 30,
        tag: "萌新"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search"
        }),
        b: common_vendor.o(($event) => single.value = $event),
        c: common_vendor.p({
          type: "date",
          ["clear-icon"]: false,
          border: false,
          modelValue: single.value
        }),
        d: common_vendor.t(filters.value[selectedFilter.value]),
        e: common_vendor.p({
          type: "down"
        }),
        f: filters.value,
        g: common_vendor.o(onFilterChange),
        h: common_vendor.f(activities, (activity, index, i0) => {
          return {
            a: index,
            b: activity.id,
            c: "d746ad8e-3-" + i0,
            d: common_vendor.p({
              id: activity.id,
              title: activity.title,
              price: activity.price,
              address: activity.address,
              date: activity.date,
              time: activity.time,
              status: activity.status,
              participants: activity.participants,
              plan: activity.plan,
              tag: activity.tag
            })
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/search.js.map
