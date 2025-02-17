<template>
  <view class="card">
    <view class="title">
      <view class="card-title">{{ title }}</view>
      <view class="card-price">{{ price }}</view>
    </view>
    <view class="card-address"><uni-icons type="location-filled"></uni-icons>&ensp;{{ address }}
    </view>
    <view class="card-date"> <uni-icons type="calendar-filled"></uni-icons>&ensp;{{ date }} {{ time }}</view>
    <view class="line">
      <view class="card-status"><uni-icons type="personadd-filled"></uni-icons>&ensp;{{ status }} {{ participants }} /
        {{ plan }}
      </view>
      <view class="card-tag"> {{ tag }} </view>
    </view>
    <view class="line">
      <view class="line">
        <view class="avatar-container"><img class="avatar" :src="authorAvatar||'/static/dinohead.jpg'"></view>
        <text>&ensp;{{ author||"未知俱乐部" }}</text>
      </view>

      <button class="card-button" @click="onSignUp">去报名</button>
    </view>
  </view>
</template>

<script setup>
  import {
    defineProps,
    defineEmits
  } from 'vue';

  const props = defineProps({
    actID: String, // 活动 ID
    title: String,
    price: String,
    address: String,
    date: String,
    time: String,
    status: String,
    participants: Number,
    plan: Number,
    tag: String,
    author: String,
    authorAvatar: String
  });

  const emit = defineEmits(['sign-up']);

  // 报名按钮点击事件
  const onSignUp = () => {
    //console.log(props.actID);
    //emit('sign-up', props.actID); // 触发父组件的事件，并传递活动 ID
    uni.navigateTo({
      url: `/pages/index/detail?actID=${props.actID}`
    });
  };
</script>

<style scoped>
  .card {
    background: #fff;
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 10rpx;
    font-size: 30rpx;
    line-height: 30px;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
  }

  .card-title {
    font-size: 36rpx;
    font-weight: bold;
  }

  .card-price {
    font-size: 40rpx;
    font-weight: bold;
    color: #FF3B30;
  }

  .card-button {
    background: #00ffff;
    width: 200rpx;
    margin: 0;
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    line-height: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    border: none;
  }

  .card-button::after {
    border: none;
  }

  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
  }

  .card-tag {
    color: #007AFF;
    background-color: #aaffff;
    border-radius: 5px;
    line-height: 30px;
    width: 50px;
    text-align: center;

  }

  .avatar-container {
    width: 40px;
    /* 容器宽度 */
    height: 40px;
    /* 容器高度 */
    overflow: hidden;
    /* 隐藏超出部分 */
    border-radius: 50%;
    /* 设置为圆形 */
    margin-right: 10rpx;
  }

  .avatar {
    width: 100%;
    /* 图片宽度 */
    height: 100%;
    /* 图片高度 */
    object-fit: cover;
    /* 确保图片填充圆形区域 */
  }
</style>