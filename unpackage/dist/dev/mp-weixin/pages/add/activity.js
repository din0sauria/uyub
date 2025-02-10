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
  (_easycom_uni_icons + _easycom_uni_datetime_picker)();
}
const _sfc_main = {
  __name: "activity",
  setup(__props) {
    const Options = ["羽毛球", "游戏", "乒乓球", "其他"];
    const Tags = ["不限", "萌新", "中级", "高级"];
    const images = common_vendor.ref([]);
    const activity = common_vendor.reactive({
      title: "",
      price: "",
      address: "",
      detailAddress: "",
      date: "",
      startTime: "",
      endTime: "",
      plan: "",
      tag: "",
      option: "",
      description: "",
      images: []
    });
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 9 - images.value.length,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: (res) => {
          images.value = [...images.value, ...res.tempFilePaths];
        }
      });
    };
    const removeImage = (index) => {
      images.value.splice(index, 1);
    };
    const setDate = (e) => {
      activity.date = e;
    };
    const setStartTime = (e) => {
      activity.startTime = e.detail.value;
      validateTime();
    };
    const setEndTime = (e) => {
      activity.endTime = e.detail.value;
      validateTime();
    };
    const setTag = (e) => {
      activity.tag = Tags[e.detail.value];
    };
    const city = common_vendor.ref("不限");
    const onRegionChange = (e) => {
      city.value = e.detail.value[1];
    };
    const onAddressChange = (e) => {
      activity.detailAddress = city.value + e.detail.value;
    };
    const validateTime = () => {
      if (activity.startTime && activity.endTime) {
        const start = /* @__PURE__ */ new Date(`1970-01-01T${activity.startTime}`);
        const end = /* @__PURE__ */ new Date(`1970-01-01T${activity.endTime}`);
        if (start >= end) {
          common_vendor.index.showToast({
            title: "结束时间必须晚于开始时间",
            icon: "none"
          });
          activity.endTime = "";
        }
      }
    };
    const setOption = (e) => {
      activity.option = Options[e.detail.value];
    };
    const isSubmitting = common_vendor.ref(false);
    const publishActivity = async () => {
      if (userInfo.phone === "") {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      if (isSubmitting.value)
        return;
      const requiredFields = [
        { field: "title", message: "请填写活动标题" },
        { field: "price", message: "请填写活动费用" },
        { field: "address", message: "请选择所在场馆" },
        { field: "date", message: "请选择日期" },
        { field: "startTime", message: "请选择开始时间" },
        { field: "endTime", message: "请选择结束时间" },
        { field: "plan", message: "请填写计划人数" }
      ];
      for (const { field, message } of requiredFields) {
        if (!activity[field]) {
          return common_vendor.index.showToast({
            title: message,
            icon: "none"
          });
        }
      }
      try {
        const imageUrls = await uploadImages();
        const res = await common_vendor.index.request({
          method: "POST",
          url: "/activities",
          data: {
            ...activity,
            images: imageUrls
          }
        });
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "发布失败",
          icon: "none"
        });
      } finally {
        isSubmitting.value = false;
      }
    };
    const userInfo = common_vendor.reactive({
      avatar: "/static/dinohead.png",
      nickname: "未登录用户",
      phone: "1",
      birthday: ""
    });
    common_vendor.onLoad(() => {
      const stored = common_vendor.index.getStorageSync("userInfo");
      if (stored) {
        Object.assign(userInfo, stored);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: activity.title,
        b: common_vendor.o(($event) => activity.title = $event.detail.value),
        c: activity.price,
        d: common_vendor.o(($event) => activity.price = $event.detail.value),
        e: activity.address,
        f: common_vendor.o(($event) => activity.address = $event.detail.value),
        g: common_vendor.p({
          type: "location"
        }),
        h: common_vendor.t(city.value),
        i: common_vendor.o(onRegionChange),
        j: common_vendor.o([($event) => activity.detailAddress = $event.detail.value, onAddressChange]),
        k: activity.detailAddress,
        l: common_vendor.o(setDate),
        m: common_vendor.o(($event) => activity.date = $event),
        n: common_vendor.p({
          type: "date",
          modelValue: activity.date
        }),
        o: common_vendor.t(activity.startTime || "开始时间"),
        p: common_vendor.o(setStartTime),
        q: common_vendor.t(activity.endTime || "结束时间"),
        r: common_vendor.o(setEndTime),
        s: activity.plan,
        t: common_vendor.o(($event) => activity.plan = $event.detail.value),
        v: common_vendor.t(activity.option || "选择活动类型"),
        w: Options,
        x: common_vendor.o(setOption),
        y: common_vendor.t(activity.tag || "选择活动水平"),
        z: Tags,
        A: common_vendor.o(setTag),
        B: activity.description,
        C: common_vendor.o(($event) => activity.description = $event.detail.value),
        D: common_vendor.f(images.value, (image, index, i0) => {
          return {
            a: image,
            b: common_vendor.o(($event) => removeImage(index), index),
            c: index
          };
        }),
        E: images.value.length < 9
      }, images.value.length < 9 ? {
        F: common_vendor.o(chooseImage)
      } : {}, {
        G: common_vendor.t(userInfo.phone ? "立即发布" : "请先登录"),
        H: common_vendor.o(publishActivity)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ccb2f267"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/add/activity.js.map
