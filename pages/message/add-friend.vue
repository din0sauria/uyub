<template>
  <view class="container">
    <!-- 好友ID输入 -->
    <view class="form-item">
      <text class="item-label">好友ID</text>
      <input 
        type="text" 
        v-model="formData.friendId" 
        class="input-field"
        placeholder="请输入对方ID"
        placeholder-class="placeholder-style"
      />
    </view>

    <!-- 验证消息输入 -->
    <view class="form-item content-item">
      <text class="item-label">验证消息</text>
      <view class="textarea-container">
        <textarea 
          v-model="formData.message" 
          class="textarea-field"
          placeholder="请输入验证信息（可选）"
          placeholder-class="placeholder-style"
          auto-height
        />
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-btn" @click="handleSubmit">
      <text class="btn-text">{{ loading ? '发送中...' : '发送好友请求' }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onReady } from '@dcloudio/uni-app';

// 表单数据
const formData = reactive({
  friendId: '',
  message: '我是'
});

// 用户信息
const userInfo = reactive({
  avatar: '/static/dinohead.jpg',
  nickname: '未登录用户',
  userID: '',
  birthday: ''
});

// 加载状态
const loading = ref(false);

// 打开页面时读取本地存储的数据
onReady(() => {
  const stored = uni.getStorageSync('userInfo');
  if (stored) {
    Object.assign(userInfo, stored); // 保持响应式
  }
});

// 提交处理
const handleSubmit = async () => {
  if (!formData.friendId.trim()) {
    uni.showToast({ title: '请输入对方ID', icon: 'none' });
    return;
  }

  if (loading.value) return;
  loading.value = true;

  // 模拟API调用
  const res = await mockAddFriendAPI(formData);

  if (res.success) {
    uni.showToast({ title: '请求已发送', icon: 'success' });
    setTimeout(() => uni.navigateBack(), 1500);
  } else {
    uni.showModal({
      title: '发送失败',
      content: res.message || '请检查ID是否正确',
      showCancel: false
    });
  }

  loading.value = false;
};

// 模拟API接口
const mockAddFriendAPI = (data) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: Math.random() > 0.5, 
        message: '对方不存在或网络错误'
      });
    }, 800);
  });
};
</script>

<style scoped>
.container {
  padding: 30rpx;
  background: #f8f9fa;
  min-height: 100vh;
}

.form-item {
  margin-bottom: 40rpx;
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.item-label {
  display: block;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.input-field, .textarea-field {
  padding: 20rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #333;
  width: 90%;
}

.placeholder-style {
  color: #adb5bd;
  font-size: 28rpx;
}

.textarea-container {
  display: flex;
  flex-direction: column;
}

.submit-btn {
  margin: 40rpx 0;
  background: #007aff;
  border-radius: 50rpx;
  padding: 25rpx 0;
  text-align: center;
  position: fixed;
  width: 80%;
  bottom: 0;
  left: 10%;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  z-index: 9;
}

.btn-text {
  color: white;
  font-size: 32rpx;
  font-weight: 500;
}

.submit-btn:active {
  opacity: 0.9;
}
</style>