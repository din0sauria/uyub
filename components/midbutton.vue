<!-- components/midButton/midButton.vue -->
<template>
  <view>
    <!-- 中间按钮 -->
    <image
      src="/static/add.png"
      :class="['mid-button', { 'active': isActive }]"
      @click="toggleButton"
    />
    
    <!-- 弹出层 -->
    <uni-popup ref="popup" type="center" @change="onPopupChange" class="popup">
      <view class="popup-content">
        <button class="action-btn" @click="handleButton1"><uni-icons type="paperplane-filled" size="50rpx"></uni-icons><view>发布动态</view></button>
        <button class="action-btn" @click="handleButton2"><uni-icons type="compose" size="50rpx"></uni-icons><view>发布活动</view></button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleButton() {
      this.isActive = !this.isActive;
      this.isActive ? this.$refs.popup.open() : this.$refs.popup.close();
    },
    handleButton1() {
      uni.navigateTo({
        url: '/pages/add/dynamic'
      });
      this.closePopup();
    },
    handleButton2() {
      uni.navigateTo({
        url: '/pages/add/activity'
      });
      this.closePopup();
    },
    closePopup() {
      this.isActive = false;
      this.$refs.popup.close();
    },
    onPopupChange(e) {
      // 监听弹窗关闭，同步状态
      if (e.type === 'close') this.isActive = false;
    }
  }
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600rpx;
}
.mid-button {
  position: fixed;
  bottom: 50rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 100rpx;
  height: 100rpx;
  transition: transform 0.3s;
  z-index: 999;
}

.mid-button.active {
  transform: translateX(-50%) rotate(45deg);
}

.popup-content {
  background: #fff;
  padding: 10rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 24rpx;
}

.action-btn {
  border-radius: 8rpx;
  font-size: 32rpx;
  line-height: 50rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  background: #fff;
}
.action-btn::after {
  border: none;
}
</style>