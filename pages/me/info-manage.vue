<template>
  <view class="page">

    <!-- 表单内容 -->
    <view class="form-container">
      <view class="title">个人信息修改</view>
      <view class="form-item">
        <view class="avatar-container">
          <image class="avatar" :src="userInfo.avatar" @click="changeAvatar"></image>
          <text class="icon"><uni-icons type="camera" size="24" color="#666"></uni-icons></text>
        </view>
      </view>

      <view class="form-item">
        <view class="label">昵称</view>
        <input class="input" type="text" v-model="userInfo.nickname" placeholder="请输入昵称" />
      </view>
      <view class="form-item">
        <view class="label">生日</view>
        <uni-datetime-picker v-model="userInfo.birthday" type="date" return-type="string" start="1900-01-01"
          end="2100-12-31" />
      </view>
      <view class="form-item">
        <view class="label">用户 ID</view>
        <text class="user-id">{{ userInfo.userID }}</text>
      </view>


      <view class="save-button" @click="saveUserInfo">保存</view>
    </view>

  </view>
</template>

<script setup>
  import {
    reactive,
    onMounted,
    toRaw
  } from 'vue';
  import {
    onShow
  } from '@dcloudio/uni-app';
  // 用户信息对象
  const userInfo = reactive({
    avatar: '/static/dinohead.jpg',
    nickname: '未登录用户',
    userID: '',
    birthday: ''
  });

  // 打开页面时读取本地存储的数据
  onShow(() => {
    onLoad();
  });

  const onLoad = () => {
    const stored = uni.getStorageSync('userInfo');
    if (stored) {
      Object.assign(userInfo, stored); // 保持响应式
    }
  };

  // 修改头像
  const changeAvatar = () => {
    uni.chooseImage({
      count: 1, // 选择图片的数量
      success: (imgurl) => {
        userInfo.avatar = imgurl.tempFilePaths[0];
        uni.uploadFile({
          url: 'http://120.26.34.133:8081/user/fileUpload',
          filePath: imgurl.tempFilePaths[0],
          header: {
            Authorization: `${userInfo.token}`
          },
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: (uploadFileRes) => {
            console.log(uploadFileRes.data);
          },
          fail: (err) => {
            console.log(err);
          }
        });


      }
    });
  };

  // 保存用户信息到本地存储
  const saveUserInfo = () => {
    // 使用 toRaw 去除 Proxy，将响应式对象转换为普通对象
    uni.setStorageSync('userInfo', toRaw(userInfo));

    //与后端交互
    interactWithBackend();
  };

  // 与后端交互的示例函数
  const interactWithBackend = () => {
    uni.request({
      url: 'http://120.26.34.133:8081/user/update', // 替换为实际的后端接口地址
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`
      },
      data: {
        nickname: userInfo.nickname,
        birthday: userInfo.birthday,
      },
      success: (res) => {
        console.log('后端交互成功', res);
        // 可以在这里处理后端返回的数据，如更新用户信息
         if (res.statusCode === 200) {
            uni.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            });
          } else {
            uni.showToast({
              title: '上传失败',
              icon: 'error',
              duration: 2000
            });
          }
      },
      fail: (err) => {
        console.error('后端交互失败', err);
        // 可以在这里处理错误
      }
    });
  };
</script>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f4f4f4;
    font-size: 32rpx;
  }

  .title {
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .save-button {
    background-color: #007aff;
    color: #ffffff;
    border-radius: 8rpx;
    line-height: 80rpx;
    height: 80rpx;
    text-align: center;
  }

  .form-container {
    margin: 40rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
    height: 80vh;
  }

  .form-item {
    align-items: center;
    margin-bottom: 40rpx;
  }

  .label {
    width: 160rpx;
    font-size: 28rpx;
    color: #666666;
    margin: 20rpx 0;
  }

  .input {
    width: rpx;
    padding: 20rpx;
    border: 2rpx solid #dddddd;
    border-radius: 8rpx;
  }

  .avatar-container {
    position: relative;
    width: 160rpx;
    height: 160rpx;
    margin: 10px auto;
  }

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .icon {
    position: absolute;
    bottom: -10rpx;
    right: -20rpx;
    color: #ffffff;
    padding: 8rpx 16rpx;
    border-radius: 8rpx;
  }

  .user-id {
    margin-left: 20rpx;
    font-size: 28rpx;
    color: #999999;
  }
</style>