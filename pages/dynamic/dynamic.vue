<template>
  <view class="container">
    <!-- 朋友圈动态列表 -->
    <view class="dynamic-list">
      <view class="dynamic-item" v-for="(item, index) in dynamicList" :key="index">
        <!-- 用户头像和昵称 -->
        <view class="user-info">
          <image class="avatar" :src="item.avatar" mode="aspectFill"></image>
          <text class="nickname">{{ item.nickname }}</text>
        </view>
        <!-- 动态内容 -->
        <view class="content">
          <text class="text">{{ item.content }}</text>
          <!-- 动态图片 -->
          <view class="image-list" v-if="item.images && item.images.length > 0">
            <image
              class="image"
              v-for="(img, imgIndex) in item.images"
              :key="imgIndex"
              :src="img"
              mode="aspectFill"
            ></image>
          </view>
        </view>
        <!-- 动态时间和点赞评论 -->
        <view class="footer">
          <text class="time">{{ item.time }}</text>
          <view class="actions">
            <text class="action">点赞</text>
            <text class="action">评论</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <midButton/>
  <tabBar :selectedIndex="1" />
</template>

<script setup>
  import midButton from '/components/midbutton.vue'
import tabBar from '/components/tabBar.vue'

      // 朋友圈数据
const dynamicList=[
        {
          avatar: '/static/dinohead.png',
          nickname: '小明',
          content: '今天天气真好，出去散步了！',
          images: [
            '/static/dinoonsea.png',
            '/static/dinoonsea.png',
            '/static/dinoonsea.png',
          ],
          time: '1小时前',
        },
        {
          avatar: '/static/dinohead.png',
          nickname: '小红',
          content: '分享一张美食照片～',
          images: ['/static/dinohead.png'],
          time: '2小时前',
        },
        {
          avatar: '/static/dinohead.png',
          nickname: '小刚',
          content: '今天学习了新的编程知识，感觉收获满满！',
          images: [],
          time: '3小时前',
        },
      ]
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.dynamic-item {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.nickname {
  font-size: 32rpx;
  font-weight: bold;
}

.content {
  margin-bottom: 20rpx;
}

.text {
  font-size: 28rpx;
  line-height: 1.5;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20rpx;
}

.image {
  width: 200rpx;
  height: 200rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
  border-radius: 10rpx;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  color: #999;
}

.actions {
  display: flex;
}

.action {
  margin-left: 20rpx;
  color: #333;
}
</style>