"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      images: [],
      isSubmitting: false,
      Options: ["羽毛球", "游戏", "乒乓球", "其他"],
      Tags: ["不限", "萌新", "中级", "高级"],
      activity: {
        title: "",
        price: "",
        address: "",
        detailAddress: "",
        date: "",
        startTime: "",
        endTime: "",
        participants: "",
        plan: "",
        tag: "",
        option: "",
        description: "",
        images: []
      }
    };
  },
  methods: {
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 9 - this.images.length,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: (res) => {
          this.images = [...this.images, ...res.tempFilePaths];
        }
      });
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    setDate(e) {
      this.activity.date = e;
    },
    setStartTime(e) {
      this.activity.startTime = e.detail.value;
      this.validateTime();
    },
    setEndTime(e) {
      this.activity.endTime = e.detail.value;
      this.validateTime();
    },
    setTag(e) {
      this.activity.tag = this.Tags[e.detail.value];
    },
    validateTime() {
      if (this.activity.startTime && this.activity.endTime) {
        const start = /* @__PURE__ */ new Date(`1970-01-01T${this.activity.startTime}`);
        const end = /* @__PURE__ */ new Date(`1970-01-01T${this.activity.endTime}`);
        if (start >= end) {
          common_vendor.index.showToast({
            title: "结束时间必须晚于开始时间",
            icon: "none"
          });
          this.activity.endTime = "";
        }
      }
    },
    setOption(e) {
      this.activity.option = this.Options[e.detail.value];
    },
    async publishActivity() {
      if (this.isSubmitting)
        return;
      const requiredFields = [
        {
          field: "title",
          message: "请填写活动标题"
        },
        {
          field: "price",
          message: "请填写活动费用"
        },
        {
          field: "address",
          message: "请选择所在场馆"
        },
        {
          field: "detailAddress",
          message: "请填写详细地址"
        },
        {
          field: "date",
          message: "请选择日期"
        },
        {
          field: "startTime",
          message: "请选择开始时间"
        },
        {
          field: "endTime",
          message: "请选择结束时间"
        },
        {
          field: "plan",
          message: "请填写计划人数"
        }
      ];
      for (const {
        field,
        message
      } of requiredFields) {
        if (!this.activity[field]) {
          return common_vendor.index.showToast({
            title: message,
            icon: "none"
          });
        }
      }
      this.isSubmitting = true;
      try {
        const res = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            method: "POST",
            url: "/activities",
            // 替换为你的实际接口地址
            data: {
              ...this.activity,
              images: this.images
            },
            success: (res2) => {
              if (res2.statusCode === 200) {
                resolve(res2.data);
              } else {
                reject(res2);
              }
            },
            fail: (error) => {
              reject(error);
            }
          });
        });
        common_vendor.index.showToast({
          title: "发布成功",
          icon: "success"
        });
        setTimeout(() => common_vendor.index.navigateBack(), 1500);
        common_vendor.index.__f__("log", "at pages/add/activity.vue:272", "发布成功:", res);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/add/activity.vue:274", "发布失败:", error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  _easycom_uni_datetime_picker2();
}
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  _easycom_uni_datetime_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.activity.title,
    b: common_vendor.o(($event) => $data.activity.title = $event.detail.value),
    c: common_vendor.o([($event) => $data.activity.price = $event.detail.value, (...args) => _ctx.valiInt && _ctx.valiInt(...args)]),
    d: $data.activity.price,
    e: $data.activity.address,
    f: common_vendor.o(($event) => $data.activity.address = $event.detail.value),
    g: $data.activity.detailAddress,
    h: common_vendor.o(($event) => $data.activity.detailAddress = $event.detail.value),
    i: common_vendor.o($options.setDate),
    j: common_vendor.o(($event) => $data.activity.date = $event),
    k: common_vendor.p({
      type: "date",
      ["clear-icon"]: false,
      modelValue: $data.activity.date
    }),
    l: common_vendor.t($data.activity.startTime || "开始时间"),
    m: common_vendor.o((...args) => $options.setStartTime && $options.setStartTime(...args)),
    n: common_vendor.t($data.activity.endTime || "结束时间"),
    o: common_vendor.o((...args) => $options.setEndTime && $options.setEndTime(...args)),
    p: common_vendor.o([($event) => $data.activity.plan = $event.detail.value, (...args) => _ctx.valiInt && _ctx.valiInt(...args)]),
    q: $data.activity.plan,
    r: common_vendor.t($data.activity.option || "选择活动类型"),
    s: $data.Options,
    t: common_vendor.o((...args) => $options.setOption && $options.setOption(...args)),
    v: common_vendor.t($data.activity.tag || "选择活动水平"),
    w: $data.Tags,
    x: common_vendor.o((...args) => $options.setTag && $options.setTag(...args)),
    y: $data.activity.description,
    z: common_vendor.o(($event) => $data.activity.description = $event.detail.value),
    A: common_vendor.f($data.images, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.removeImage(index), index),
        c: index
      };
    }),
    B: $data.images.length < 9
  }, $data.images.length < 9 ? {
    C: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    D: common_vendor.t($data.isSubmitting ? "提交中..." : "立即发布"),
    E: common_vendor.o((...args) => $options.publishActivity && $options.publishActivity(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ccb2f267"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/add/activity.js.map
