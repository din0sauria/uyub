"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_data_select2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_easyinput)();
}
const _sfc_main = {
  __name: "feedback",
  setup(__props) {
    const feedbackType = common_vendor.ref("");
    const content = common_vendor.ref("");
    const contact = common_vendor.ref("");
    const canSubmit = common_vendor.ref(false);
    const typeOptions = [
      {
        value: "功能建议",
        text: "功能建议"
      },
      {
        value: "功能报错",
        text: "功能报错"
      },
      {
        value: "其他问题",
        text: "其他问题"
      }
    ];
    const typeChange = () => {
      updateSubmitStatus();
    };
    const contentInput = () => {
      updateSubmitStatus();
    };
    const contactInput = () => {
      updateSubmitStatus();
    };
    const updateSubmitStatus = () => {
      canSubmit.value = feedbackType.value && content.value.trim();
    };
    const handleSubmit = async () => {
      common_vendor.index.showToast({
        title: "已提交,我们会尽快处理",
        icon: "success",
        duration: 3e3
      });
      feedbackType.value = "";
      content.value = "";
      contact.value = "";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(typeChange),
        b: common_vendor.o(($event) => feedbackType.value = $event),
        c: common_vendor.p({
          localdata: typeOptions,
          placeholder: "请选择问题类型",
          modelValue: feedbackType.value
        }),
        d: common_vendor.o(contentInput),
        e: common_vendor.o(($event) => content.value = $event),
        f: common_vendor.p({
          type: "textarea",
          placeholder: "请详细描述您的反馈内容（必填）",
          maxlength: "500",
          modelValue: content.value
        }),
        g: common_vendor.o(contactInput),
        h: common_vendor.o(($event) => contact.value = $event),
        i: common_vendor.p({
          placeholder: "请填写手机号码（选填）",
          type: "number",
          maxlength: "11",
          modelValue: contact.value
        }),
        j: !canSubmit.value,
        k: common_vendor.o(handleSubmit)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/feedback.js.map
