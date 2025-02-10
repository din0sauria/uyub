<template>
  <view>
    <!-- 消息列表 -->
    <view class="message-list">
      <view 
        class="message-item"
        v-for="message in messages"
        :key="message.id"
      >
        <image class="message-avatar" :src="message.avatar" mode="aspectFill"></image>
        <view class="message-content">
          <view class="message-title">{{ message.title }}</view>
          <view class="message-text">{{ message.content }}</view>
        </view>
        <text class="message-time">{{ message.time }}</text>
      </view>
    </view>

    <!-- +按钮 -->
    <midButton />

    <!-- TabBar -->
    <tabBar :selected-index="2" />
  </view>
</template>

<script setup>
  import { ref } from 'vue';
  import midButton from '/components/midbutton.vue';
  import tabBar from '/components/tabBar.vue';

  // 模拟消息数据
  const messages = ref([
    {
      id: 1,
      avatar: '/static/c1.png',
      title: '微信用户1',
      content: '收到微信用户1的消息',
      time: '10:30'
    },
    {
      id: 2,
      avatar: '/static/c2.png',
      title: '微信用户2',
      content: '收到微信用户2的消息',
      time: '10:25'
    },
    // 其他消息...
  ]);
</script>

<style>
  .message-list {
    padding: 20px;
    background-color: #f8f8f8;
  }

  .message-item {
    display: flex;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .message-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .message-content {
    flex: 1;
    margin-left: 10px;
  }

  .message-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  .message-text {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
  }

  .message-time {
    margin-left: 10px;
    font-size: 12px;
    color: #999;
  }
</style>