<template>
  <view class="container">
    <!-- 标题栏 -->
    <view class="header">
      <text class="title">我的好友</text>
      <button class="add" @click="addfriend">添加好友</button>
    </view>

    <!-- 好友列表 -->
    <scroll-view scroll-y class="friend-list">
      <view 
        v-for="(friend, index) in friendList" 
        :key="friend.friendId"
        class="friend-item"
      >
        <image 
          class="avatar" 
          :src="friend.avatar || '/static/default-avatar.png'"
          mode="aspectFill"
        />
        <view class="info">
          <text class="nickname">{{ friend.nickname || '未命名用户' }}</text>
          <text class="friend-id">ID: {{ friend.friendId }}</text>
        </view>
        <view 
          class="delete-btn" 
          @click="handleDelete(friend)"
        >
          <uni-icons type="trash" size="30" color="#ff4444"></uni-icons>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const userID = ref(''); // 当前用户ID
const friendList = ref([]); // 好友列表

// 获取好友列表
// const fetchFriends = async () => {
//   try {
//     const res = await uni.request({
//       url: 'https://api.example.com/friends',
//       method: 'GET',
//       data: { userID: userID.value }
//     });
//     friendList.value = res.data;
//   } catch (error) {
//     uni.showToast({ title: '加载失败', icon: 'none' });
//   }
// };
const fetchFriends = async () => {
  try {
    friendList.value = [{
  avatar: '/static/dinohead.jpg',
  nickname: 'dinosaur1',
  friendId: '12345678910'},
  {
  avatar: '/static/dinohead.jpg',
  nickname: 'dinosaur2',
  friendId: '12345678911'},]
  } catch (error) {
    uni.showToast({ title: '加载失败', icon: 'none' });
  }
};
const addfriend = () => {
  uni.navigateTo({
    url: '/pages/message/add-friend'
  });
}
// 删除好友
const deleteFriend = async (friendId) => {
  try {
    // await uni.request({
    //   url: 'https://api.example.com/friends/delete',
    //   method: 'POST',
    //   data: {
    //     userID: userID.value,
    //     friendId
    //   }
    // });
    friendList.value = friendList.value.filter(f => f.friendId !== friendId);
    uni.showToast({ title: '删除成功', icon: 'success' });
  } catch (error) {
    uni.showToast({ title: '删除失败', icon: 'none' });
  }
};

// 删除确认
const handleDelete = (friend) => {
  uni.showModal({
    title: '确认删除',
    content: `确定要删除好友 ${friend.nickname} 吗？`,
    success: (res) => {
      if (res.confirm) {
        deleteFriend(friend.friendId);
      }
    }
  });
};

onLoad(() => {
  userID.value = uni.getStorageSync('userID'); // 假设已存储用户ID
  fetchFriends();
});
</script>

<style lang="scss" scoped>
.container {
  padding: 24rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  padding: 32rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  .title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
  }
  .add{
    height: 60rpx;
    margin: 0;
    font-size: 26rpx;
    line-height: 60rpx;
    color: #fff;
    background-color: #007aff;
    border-radius: 8rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  }
}

.friend-list {
  height: calc(100vh - 160rpx);
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  
  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-right: 24rpx;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    
    .nickname {
      font-size: 32rpx;
      color: #333;
    }

    .friend-id {
      font-size: 24rpx;
      color: #999;
    }
  }

  .delete-btn {
    padding: 16rpx;
    margin-left: 16rpx;
  }
}
</style>