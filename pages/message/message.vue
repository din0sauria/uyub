<template>

  <!-- 标题栏 -->
  <view
    style="text-align: center;font-size: 40rpx;height: 100rpx;line-height: 100rpx ;font-weight: bold;position: fixed;top:0;z-index: 9;background-color: white;width: 100%;">
    消息</view>
  <view class="layout">
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-icons class="search-icon" type="search" size="50rpx"></uni-icons>
      <input class="search-area" v-model="searchKeyword" placeholder="搜索好友" />
    </view>

    <!-- 好友列表 -->
    <scroll-view class="message-list" scroll-y>
      <view class="notification">
        <view class="ntf-box">
          <uni-icons class="ntf-icon" type="chatbubble-filled" color="#00FFCC" size="96rpx"
            @click="checkReply"></uni-icons>
          <text class="ntf-content">收到回复</text>
        </view>
        <view class="ntf-box">
          <uni-icons class="ntf-icon" type="hand-up-filled" color="#FF6699" size="96rpx" @click="checkLike"></uni-icons>
          <text class="ntf-content">收到喜欢</text>
        </view>
        <view class="ntf-box">
          <uni-icons class="ntf-icon" type="personadd-filled" color="#00ffff" size="96rpx"
            @click="checkNewFans"></uni-icons>
          <text class="ntf-content">好友申请</text>
        </view>
      </view>
      <view v-for="message in filteredMessages" :key="message.friendId" class="message-item"
        @click="goToChatWindow(message)">
        <!-- 头像 -->
        <image class="friend-avatar" :src="message.friendAvatar" mode="aspectFill"></image>

        <!-- 昵称和最后一条消息 -->
        <view class="message-content">
          <text class="friend-name">{{ message.friendName }}</text>
          <text class="last-message">{{ message.lastMessage }}</text>
        </view>

        <!-- 最后一条消息时间和未读消息条数 -->
        <view class="time-and-unreadcount">
          <view class="last-message-time">
            {{message.lastMessageTime}}
          </view>
          <view v-if="message.unreadCount > 0" class="unread-count">
            {{ message.unreadCount }}
          </view>
        </view>
      </view>
    </scroll-view>
    <tabBar :selectedIndex="2" ref="tabBarRef" />
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue';
  import tabBar from '/components/tabBar.vue';

  // 模拟好友数据
  const messages = ref([{
      friendId: 1,
      friendName: '小美',
      friendAvatar: '/static/bse1.jpg',
      lastMessage: '你好，我是彭于晏。',
      lastMessageTime: '18:35',
      unreadCount: 0,
    },
    {
      friendId: 2,
      friendName: '恐龙苯龙',
      friendAvatar: '/static/xkl.jpg',
      lastMessage: 'ltdd超市',
      lastMessageTime: '18:33',
      unreadCount: 1,
    },
    {
      friendId: 5,
      friendName: 'little day day',
      friendAvatar: '/static/ltdd.jpg',
      lastMessage: 'qwq',
      lastMessageTime: '17:59',
      unreadCount: 1,
    },
    {
      friendId: 3,
      friendName: '小蓝',
      friendAvatar: '/static/zjy.jpg',
      lastMessage: 'OKOK',
      lastMessageTime: '11:56',
      unreadCount: 2,
    },
    {
      friendId: 4,
      friendName: '小雅',
      friendAvatar: '/static/lyt2.jpg',
      lastMessage: '拜拜',
      lastMessageTime: '09:13',
      unreadCount: 0,
    },
    {
      friendId: 9,
      friendName: '小帅',
      friendAvatar: '/static/lm.jpg',
      lastMessage: '好嘞！',
      lastMessageTime: '昨天 23:22',
      unreadCount: 1,
    },
    {
      friendId: 6,
      friendName: '小薇',
      friendAvatar: '/static/lyt1.jpg',
      lastMessage: '我们不可能',
      lastMessageTime: '昨天 22:14',
      unreadCount: 0,
    },
    {
      friendId: 7,
      friendName: '小萱',
      friendAvatar: '/static/lyt3.jpg',
      lastMessage: '好吧',
      lastMessageTime: '星期一',
      unreadCount: 0,
    },
    {
      friendId: 8,
      friendName: '小琪',
      friendAvatar: '/static/bse5.jpg',
      lastMessage: '嗯嗯',
      lastMessageTime: '星期一',
      unreadCount: 0,
    },
  ]);


  // 跳转到聊天窗口
  const goToChatWindow = (message) => {
    uni.navigateTo({
      //   url: `/pages/message/chat-window?id=${message.friendId}`,
      url: '/pages/message/chat-window',
    });
  };

  // 搜索功能
  const searchKeyword = ref('');
  const filteredMessages = computed(() => {
    return messages.value.filter((message) =>
      message.friendName.includes(searchKeyword.value)
    );
  });

  function checkReply() {

  }

  function checkLike() {

  }

  function checkNewFans() {

  }
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;

    .header {
      padding: 40rpx;
      background-color: #f8f8f8;
      text-align: center;
      font-size: 36rpx;
      font-weight: bold;
    }

    .search-box {
      margin: 3rpx auto;
      width: 90%;
      height: 80rpx;
      line-height: 80rpx;
      /* 确保 line-height 与 height 一致 */
      padding-left: 20rpx;
      /* 为输入框的左侧添加内边距 */
      border: 3rpx solid gray;
      border-radius: 40rpx;
      box-shadow: 5rpx 5rpx #fff;
      display: flex;
      align-items: center;
      /* 垂直居中 */

      .search-area {
        flex-grow: 1;
      }

      .search-icon {
        margin-right: 10rpx;
      }
    }


    .message-list {
      flex: 1;
      padding: 10rpx;
      padding-bottom: 100rpx;
      box-sizing: border-box;
      background-color: #fff;

      .notification {
        display: flex;
        justify-content: space-around;
        padding: 20rpx 0;

        .ntf-box {
          display: flex;
          flex-direction: column;
          height: 100%;
          align-items: center;

          .ntf-icon {
            background-color: #f8f8f8;
            border-radius: 40%;
          }

          .ntf-content {
            margin-top: 16rpx;
            font-size: 24rpx;
            font-weight: 900rpx;
          }
        }
      }

      .message-item {
        display: flex;
        align-items: center;
        padding: 15rpx;

        .friend-avatar {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          margin-right: 30rpx;
          margin-bottom: 20rpx;
        }

        .message-content {
          flex: 1;
          height: 100rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-bottom: 20rpx;
          border-bottom: 1rpx solid #c8c8c8;

          .friend-name {
            font-size: 32rpx;
            font-weight: 600;
            margin-bottom: 10rpx;
          }

          .last-message {
            font-size: 28rpx;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .time-and-unreadcount {
          height: 100rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          padding-bottom: 20rpx;
          border-bottom: 1px solid #c8c8c8;

          .last-message-time {
            margin-top: 10rpx;
          }

          .unread-count {
            width: 34rpx;
            height: 34rpx;
            background-color: #ff0000;
            color: #fff;
            font-size: 24rpx;
            border-radius: 50%;
            text-align: center;
          }
        }
      }
    }
  }
</style>