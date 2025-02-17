<template>
  <view class="chat-window">
    <!-- 标题栏 -->
    <view class="header" :style="{paddingTop:safeAreaInsets?.top + 'px'}">
      <view class="icon-back" @click="goBack">
        <uni-icons type="left" size="24" color="gray"></uni-icons>
      </view>
      <text class="friend-name">{{ friend.name }}</text>
    </view>

    <!-- 消息列表 -->
    <scroll-view class="message-list" scroll-y>
      <view v-for="(msg, index) in messages" :key="msg.id" class="message-item">
        <!-- 对方消息 -->
        <view v-if="!msg.isSelf" class="message-friend">
          <image class="avatar-friend" :src="friend.avatar" mode="aspectFill"></image>
          <view class="message-content-friend-text">
            {{msg.content}}
          </view>
        </view>


        <!-- 自己消息 -->
        <view v-else class="message-self">
          <image class="avatar-self" :src="self.avatar" mode="aspectFill"></image>
          <view class="message-content-self-text">{{msg.content}}</view>
        </view>
    </view>
        <!-- 占位元素，用于滚动到底部 -->
        <view id="last-msg-item" style="height: 1px;"></view>
    </scroll-view>

    <!-- 输入框 -->
    <view class="input-container">
      <textarea class="input-box" v-model="messageToSend" placeholder="请输入内容" @focus="onFocus" @blur="onBlur"
        @confirm="onComfirm"></textarea>
      <button class="send" v-if="toggle">
        发送
      </button>
      <template v-else>
        <uni-icons class="emoji" type="fire" size="30"></uni-icons>
        <uni-icons class="more" type="plus" size="30"></uni-icons>
      </template>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue';

  const {
    safeAreaInsets
  } = uni.getSystemInfoSync()

  // 获取路由参数
  const friend = ref({
    id: 1,
    name: '小美',
    avatar: '/static/lyt4.jpg',
  });
  const self = ref({
    name: '帅哥',
    avatar: '/static/pyy.jpeg',
  });
  const goBack = () => {
    uni.navigateBack()
  }
  // 消息列表
  const messages = ref([{
      content: '你好呀！',
      isSelf: false
    },
    {
      content: '你好，我是彭于晏。',
      isSelf: true
    },
  ]);

  // 输入框内容
  const messageToSend = ref('');

  const toggle = ref(false);

  const id = ref(messages.value[messages.value.length - 1].id);

  function onComfirm() {
    messages.value.push({
      id: ++id.value,
      content: messageToSend.value,
      isSelf: true
    })
    messageToSend.value = '';
  }

  function onFocus() {
    toggle.value = true;
  }

  function onBlur() {
    toggle.value = false;
  }
</script>

<style lang="scss" scoped>
  .chat-window {
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 90rpx;
      background: #fff;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      z-index: 2;

      /* 返回图标 */
      .back-icon {
        margin-left: 30rpx;
        /* 距离左边界的距离 */
      }

      /* 好友名字 */
      .friend-name {
        flex: 1;
        /* 占据剩余空间 */
        text-align: center;
        /* 文字居中 */
        font-size: 34rpx;
        font-weight: 500;
        color: #333;
        padding-right: 60rpx;
        /* 避免文字被返回图标挤压 */
      }
    }

    .message-list {
      padding-top: 200rpx;
      /* 为导航栏留出空间 */
      padding-bottom: 60rpx;
      /* 为输入框留出空间 */
      flex: 1;

      .message-item {
        margin: 20rpx;
        padding: 10rpx 0;

        .message-friend {
          display: flex;
          flex-direction: row;

          .avatar-friend {
            width: 80rpx;
            height: 80rpx;
            border-radius: 40rpx;
            margin-left: 20rpx;
          }

          .message-content-friend-text {
            max-width: 80%;
            padding: 8rpx 16rpx;
            margin-left: 25rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            border-radius: 30rpx;
            color: #000;
          }
        }

        .message-self {
          display: flex;
          flex-direction: row-reverse;

          .avatar-self {
            width: 80rpx;
            height: 80rpx;
            border-radius: 40rpx;
            margin-right: 20rpx;
          }

          .message-content-self-text {
            max-width: 80%;
            padding: 8rpx 16rpx;
            margin-right: 25rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #2d65f7;
            border-radius: 30rpx;
            color: #fff;
          }
        }
      }
    }

    .input-container {
      display: flex;
      align-items: center;
      padding: 20rpx 0;
      background: rgba(255, 255, 255, 0.8);
      padding-bottom: 35rpx;

      .input-box {
        flex: 1;
        height: 60rpx;
        padding: 16rpx;
        padding-bottom: 0rpx;
        border: 2.5rpx solid black;
        border-radius: 40rpx;
        margin: 0 30rpx;
        background: rgba(255, 255, 255, 0.5);
      }

      .emoji,
      .more {
        width: 50rpx;
        height: 50rpx;
        margin-right: 20rpx;
      }

      .send {
        margin-right: 30rpx;
        background-color: aqua;
      }
    }
  }
</style>