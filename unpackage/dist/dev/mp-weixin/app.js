"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/search.js";
  "./pages/index/detail.js";
  "./pages/add/dynamic.js";
  "./pages/add/activity.js";
  "./pages/me/me.js";
  "./pages/dynamic/dynamic.js";
  "./pages/message/message.js";
  "./pages/message/chat-window.js";
  "./pages/message/add-friend.js";
  "./pages/me/info-manage.js";
  "./pages/me/friend-manage.js";
  "./pages/me/my-published.js";
  "./pages/me/my-joined.js";
  "./pages/me/feedback.js";
  "./pages/me/about.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
