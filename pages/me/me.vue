<template>
  <view class="container">
    <!-- 用户信息卡片 -->
    <uni-card class="info">
      <view class="user-info">
        <view class="avatar-section" @click="uploadAvatar">
          <image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
          <uni-icons type="camera" size="24" color="#666" class="camera-icon" />
        </view>
        <view class="info-section">
          <text class="nickname">{{ userInfo.nickname }}</text>
          <text class="phone" v-if="userInfo.phone">手机号：{{ userInfo.phone }}</text>
          <text class="birthday" v-if="userInfo.birthday">生日：{{ userInfo.birthday }}</text>
        </view>
      </view>
    </uni-card>

    <!-- 功能入口 -->
    <uni-list>
      <uni-list-item title="好友管理" showArrow>
        <template v-slot:header>
          <uni-icons type="personadd" size="20" color="#007AFF" />
        </template>
      </uni-list-item>
      <uni-list-item title="我发布的活动" showArrow @click="navTo('my-published')">
        <template v-slot:header>
          <uni-icons type="notification" size="20" color="#4CD964" />
        </template>
      </uni-list-item>
      <uni-list-item title="我参与的活动" showArrow @click="navTo('my-joined')">
        <template v-slot:header>
          <uni-icons type="flag" size="20" color="#F0AD4E" />
        </template>
      </uni-list-item>
      <uni-list-item title="建议反馈" showArrow @click="navTo('feedback')">
        <template v-slot:header>
          <uni-icons type="help" size="20" color="#DD524D" />
        </template>
      </uni-list-item>
      <uni-list-item title="联系客服" showArrow @click="contactService">
        <template v-slot:header>
          <uni-icons type="phone" size="20" color="#10AEFF" />
        </template>
      </uni-list-item>
    </uni-list>

    <!-- 手机号登录按钮 -->
    <view class="login-section" v-if="!userInfo.phone">
      <button 
        type="primary" 
        class="login-btn"
        open-type="getPhoneNumber" 
        @getphonenumber="decryptPhoneNumber"
      >
        手机号快速登录
      </button>
    </view>
    <view class="login-section" v-else>
      <button 
        type="primary" 
        class="login-btn"
        @click="logout"
      >
        退出登录/切换账号
      </button>
    </view>
  </view>
    <tabBar :selectedIndex="3" />
</template>

<script setup>
import { ref, reactive, toRaw } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import tabBar from '/components/tabBar.vue';

// 用户信息
const userInfo = reactive({
  avatar: '/static/dinohead.png',
  nickname: '未登录用户',
  phone: '',
  birthday: ''
});
// 在页面初始化时读取
onLoad(() => {
  const stored = uni.getStorageSync('userInfo');
  if (stored) {
    Object.assign(userInfo, stored); // 保持响应式
  }
});
// 上传头像
const uploadAvatar = async () => {
  try {
    const res = await uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    });
    
    // 这里调用上传接口
    // const uploadRes = await uni.uploadFile({
    //   url: '/api/uploadAvatar',
    //   filePath: res.tempFilePaths[0],
    //   name: 'avatar'
    // });
    
    // 模拟上传成功
    userInfo.avatar = res.tempFilePaths[0];
  } catch (err) {
    uni.showToast({ title: '上传失败', icon: 'none' });
  }
};

// 解密手机号
const decryptPhoneNumber = async (e) => {
  if (e.detail.errMsg !== 'getPhoneNumber:ok') return;
  
  try {
    // 这里调用后端解密接口
    // const { data } = await uni.request({
    //   url: '/api/decryptPhone',
    //   method: 'POST',
    //   data: {
    //     encryptedData: e.detail.encryptedData,
    //     iv: e.detail.iv
    //   }
    // });
    
    // 模拟解密成功
    userInfo.phone = '12345678910';
    userInfo.nickname = 'dinosaur';
    userInfo.birthday = '2000-01-01';
    uni.showToast({ title: '登录成功' });
    saveUserInfo();
  } catch (err) {
    uni.showToast({ title: '登录失败', icon: 'none' });
  }
};
// 保存到本地
const saveUserInfo = () => {
  uni.setStorageSync('userInfo', toRaw(userInfo)); // 使用toRaw去除Proxy
}
const logout = () => {
  userInfo.avatar = '/static/dinohead.png';
  userInfo.nickname = '未登录用户';
  userInfo.phone = '';
  userInfo.birthday = '';
  uni.removeStorageSync('userInfo');
};
// 导航功能
const navTo = (path) => {
  uni.navigateTo({ url: `/pages/me/${path}` });
};

// 联系客服
const contactService = () => {
  // uni.makePhoneCall({
  //   phoneNumber: '400-123-4567'
  // });
};
</script>

<style scoped lang="scss">
.container {
  padding: 30rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}


.user-info {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  
  .avatar-section {
    position: relative;
    margin-right: 40rpx;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: #eee;
    }
    
    .camera-icon {
      position: absolute;
      right: -8rpx;
      bottom: -8rpx;
      background: white;
      border-radius: 50%;
      padding: 4rpx;
    }
  }
  
  .info-section {
    display: flex;
    flex-direction: column;
    
    .nickname {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    
    .phone, .birthday {
      font-size: 24rpx;
      color: #666;
      margin-bottom: 6rpx;
    }
  }
}

.login-section {
  margin: 40rpx 30rpx;
  
  .login-btn {
    border-radius: 50rpx;
    font-size: 32rpx;
  }
}

::v-deep .uni-list-item__header {
  margin-right: 16rpx;
}
</style>