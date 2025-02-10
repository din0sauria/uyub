<template>
  <view class="header"><image src="/static/dinoundertreezoom.png" mode="aspectFill" class="img"></image> </view>
  <view class="container">
    <!-- 用户信息卡片 -->
    <view class="info">
      <view class="user-info">
        <view class="avatar-section" @click="uploadAvatar">
          <image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
          <uni-icons type="camera" size="24" color="#666" class="camera-icon" />
        </view>
        <view class="info-section">
          <text class="nickname">{{ userInfo.nickname }}</text>
          <text class="phone" v-if="userInfo.phone">ID：{{ userInfo.phone }}</text>
          <text class="birthday" v-if="userInfo.birthday">生日：{{ userInfo.birthday }}</text>
        </view>
      </view>
    </view>

    <!-- 功能入口 -->
    <view class="grid-container">
          <view class="grid-item" v-for="(item, index) in gridList" :key="index" @click="handleGridClick(item)">
            <view class="grid-icon">
              <uni-icons :type="item.icon" :size="30" :color="item.color" />
            </view>
            <text class="grid-text">{{ item.title }}</text>
          </view>
        </view>

    <!-- 手机号登录按钮 -->
    <view class="login-section" v-if="!userInfo.phone">
      <button 
        type="primary" 
        class="login-btn"
        open-type="getPhoneNumber" 
        @getphonenumber="decryptPhoneNumber"
      >
        快速登录
      </button>
    </view>
    <view class="login-section" v-else>
      <button 
        type="primary" 
        class="login-btn"
        @click="logout"
      >
        退出登录
      </button>
    </view>
  </view>
    <tabBar :selectedIndex="3" />
</template>

<script setup>
import { ref, reactive, toRaw } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import tabBar from '/components/tabBar.vue';
// 在script部分添加宫格数据
const gridList = ref([
  { 
    title: '好友管理', 
    icon: 'personadd',
    color: '#007AFF',
    handler: () => navTo('friend-manage')
  },
  { 
    title: '发布的活动', 
    icon: 'notification',
    color: '#4CD964',
    handler: () => navTo('my-published')
  },
  { 
    title: '参与的活动', 
    icon: 'flag',
    color: '#F0AD4E',
    handler: () => navTo('my-joined')
  },
  { 
    title: '建议反馈', 
    icon: 'help',
    color: '#DD524D',
    handler: () => navTo('feedback')
  },
  { 
    title: '联系客服', 
    icon: 'phone',
    color: '#10AEFF',
    handler: () => navTo('about')
  }
]);

// 添加宫格点击处理
const handleGridClick = (item) => {
  if(item.handler) item.handler();
};
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
.header{
  width: 100%;
  height: 400rpx;
  z-index: -1;
}
.img{
  width: 100%;
  height: 400rpx;
}
.container {
  position: absolute;
  left: 5%;
  top:300rpx;
  width: 90%;
}
.info{
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
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
.grid-container {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
}

.grid-item {
  flex: 0 0 33.3333%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30rpx 0;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 60%;
    background-color: #eee;
  }
  
  &:nth-child(3n):after {
    display: none;
  }
}

.grid-icon {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15rpx;
}

.grid-text {
  font-size: 26rpx;
  color: #666;
  text-align: center;
}
.login-section {
  margin: 40rpx 30rpx;
  
  .login-btn {
    border-radius: 50rpx;
    font-size: 32rpx;
  }
}


</style>