<template>
  <view class="tab-bar">
    <view class="tab-bar-content">
      <!-- 使用 v-for 动态渲染 tab 项 -->
      <view
        v-for="(item, index) in tabList"
        :key="index"
        class="tab-item"
        :class="{ active: selectedIndex === index }"
        @click="handleTabClick(item.pagePath)"
      >
        <!-- 图标 -->
        <uni-icons
          :type="selectedIndex === index ? item.icon + '-filled' : item.icon"
          :color="selectedIndex === index ? activeColor : inactiveColor"
          size="28"
        />
        <!-- 文字 -->
        <text
          class="text"
          :style="{ color: selectedIndex === index ? activeColor : inactiveColor }"
        >
          {{ item.text }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';

// 定义 props，接收调用页面传入的 selectedIndex
const props = defineProps({
  selectedIndex: Number
});

// 配置数据
const tabList = [
  { icon: 'home', text: '首页', pagePath: '/pages/index/index' },
  { icon: 'star', text: '动态', pagePath: '/pages/dynamic/dynamic' },
  { icon: 'chat', text: '消息', pagePath: '/pages/message/message' },
  { icon: 'person', text: '我的', pagePath: '/pages/me/me' }
];

const activeColor = '#2979FF'; // 选中颜色
const inactiveColor = '#666'; // 未选中颜色

// 监听 props 中的 selectedIndex 变化，更新内部状态
const internalSelectedIndex = ref(props.selectedIndex);
watch(() => props.selectedIndex, (newVal) => {
  internalSelectedIndex.value = newVal;
  //console.log('内部 selectedIndex 更新为：', internalSelectedIndex.value);
});

// 切换 Tab
const handleTabClick = (pagePath) => {
  uni.redirectTo({ url: pagePath });
};
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.06);
  z-index: 1;

  .tab-bar-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100rpx;

    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &.active {
        .text {
          font-weight: bold;
        }
      }

      .text {
        font-size: 22rpx;
        margin-top: 6rpx;
      }
    }
  }
}
</style>