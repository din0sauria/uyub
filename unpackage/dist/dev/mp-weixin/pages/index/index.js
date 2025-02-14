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
  (_easycom_uni_icons + _easycom_uni_datetime_picker + ActivityCard + MidButton + tabBar)();
}
const ActivityCard = () => "../../components/card.js";
const MidButton = () => "../../components/midbutton.js";
const tabBar = () => "../../components/tabBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const swiperList = common_vendor.ref([{
      image: "/static/index/post1.png"
    }]);
    const goToSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/search"
        // 替换为你的搜索页面路径
      });
    };
    const tabs = common_vendor.ref(["羽毛球", "游戏", "乒乓球", "其他"]);
    const activeTab = common_vendor.ref(0);
    const single = common_vendor.ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    const filters = common_vendor.ref(["不限", "萌新", "中级", "高级"]);
    const selectedFilter = common_vendor.ref(0);
    const onFilterChange = (e) => {
      selectedFilter.value = e.detail.value;
    };
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
        tag: "中级"
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
    common_vendor.ref(null);
    const scrollTop = common_vendor.ref(0);
    const onScroll = (e) => {
      scrollTop.value = e.detail.scrollTop;
    };
    const awesome = common_vendor.computed(() => {
      const rpxToPx = (rpx) => {
        const windowWidth = common_vendor.index.getWindowInfo().screenWidth;
        const pixelRatio = windowWidth / 750;
        return rpx * pixelRatio;
      };
      return scrollTop.value < rpxToPx(250);
    });
    const tab = common_vendor.computed(() => {
      return awesome.value ? "" : "sticky-tab";
    });
    const filter = common_vendor.computed(() => {
      return awesome.value ? "" : "sticky-filter";
    });
    const city = common_vendor.ref("不限");
    const onRegionChange = (e) => {
      city.value = e.detail.value[1];
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: index
          };
        }),
        b: awesome.value
      }, awesome.value ? {
        c: common_vendor.p({
          type: "search"
        }),
        d: common_vendor.o(goToSearch)
      } : {
        e: common_vendor.p({
          type: "search"
        }),
        f: common_vendor.o(goToSearch)
      }, {
        g: common_vendor.f(tabs.value, (tab2, index, i0) => {
          return {
            a: common_vendor.t(tab2),
            b: index,
            c: activeTab.value === index ? 1 : "",
            d: common_vendor.o(($event) => activeTab.value = index, index)
          };
        }),
        h: common_vendor.n(tab.value),
        i: common_vendor.o(($event) => single.value = $event),
        j: common_vendor.p({
          type: "date",
          ["clear-icon"]: false,
          border: false,
          modelValue: single.value
        }),
        k: common_vendor.p({
          type: "location"
        }),
        l: common_vendor.t(city.value),
        m: common_vendor.o(onRegionChange),
        n: common_vendor.t(filters.value[selectedFilter.value]),
        o: common_vendor.p({
          type: "down"
        }),
        p: filters.value,
        q: common_vendor.o(onFilterChange),
        r: common_vendor.n(filter.value),
        s: common_vendor.f(activities, (activity, index, i0) => {
          return {
            a: index,
            b: "1cf27b2a-5-" + i0,
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
        }),
        t: common_vendor.o(onScroll),
        v: common_vendor.p({
          selectedIndex: 0
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
