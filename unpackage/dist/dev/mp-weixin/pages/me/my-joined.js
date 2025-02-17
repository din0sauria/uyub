"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  ActivityCard();
}
const ActivityCard = () => "../../components/card.js";
const _sfc_main = {
  __name: "my-joined",
  setup(__props) {
    const activities = [
      {
        actID: "1",
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
        actID: "2",
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
        actID: "3",
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
        actID: "4",
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
        actID: "5",
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
        actID: "6",
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
        actID: "7",
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
        a: common_vendor.f(activities, (activity, index, i0) => {
          return {
            a: index,
            b: "23bc4387-0-" + i0,
            c: common_vendor.p({
              actID: activity.actID,
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/my-joined.js.map
