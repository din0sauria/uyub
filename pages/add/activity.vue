<template>
  <view class="page-container">
    <!-- 头部标题 -->
    <view class="page-header">
      <text class="header-title">发布活动</text>
    </view>

    <!-- 表单容器 -->
    <view class="form-container">
      <!-- 活动标题 -->
      <view class="form-item">
        <text class="item-label">活动标题</text>
        <input v-model="activity.title" class="input-field" placeholder="请输入活动名称" />
      </view>

      <!-- 活动费用 -->
      <view class="form-item">
        <text class="item-label">活动费用（元）</text>
        <input v-model="activity.price" class="input-field" placeholder="请输入人均费用" type="number" />
      </view>

      <!-- 地址选择 -->
      <view class="form-item address-group">
        <view class="address-item">
          <text class="item-label">所在场馆</text>
          <input v-model="activity.address" class="input-field" placeholder="场馆名称" />
        </view>
        <view class="address-item">
          <text class="item-label">详细地址</text>
          <view class="input-field city-picker">
            <uni-icons type="location"></uni-icons>
            <picker mode="region" @change="onRegionChange" level="city" style="width: 90%;">&ensp;{{city}}</picker>
          </view>
          <input v-model="activity.detailAddress" class="input-field" placeholder="街道/参照地标等信息" @input="onAddressChange" />
        </view>
      </view>

      <!-- 时间选择 -->
      <view class="form-item time-picker">
        <text class="item-label">活动时间</text>
        <!-- 日期选择 -->
        <view class="date-picker">
          <uni-datetime-picker type="date" v-model="activity.date" @change="setDate" />
        </view>
        <view class="time-container">
          <picker mode="time" @change="setStartTime" class="time-item">
            <view class="picker-content">
              {{ activity.startTime || '开始时间' }}
            </view>
          </picker>
          <text class="time-separator">-</text>
          <picker mode="time" @change="setEndTime" class="time-item">
            <view class="picker-content">
              {{ activity.endTime || '结束时间' }}
            </view>
          </picker>
        </view>
      </view>

      <!-- 人数设置 -->
      <view class="form-item number-group">
        <view class="number-item">
          <text class="item-label">计划人数</text>
          <input v-model="activity.plan" class="input-field" type="number" placeholder="总招募人数" />
        </view>
      </view>

      <!-- 活动标签 -->
      <view class="form-item">
        <text class="item-label">活动类型</text>
        <picker mode="selector" :range="Options" @change="setOption" class="tag-picker">
          <view class="picker-content">
            {{ activity.option || '选择活动类型' }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="item-label">活动水平</text>
        <picker mode="selector" :range="Tags" @change="setTag" class="tag-picker">
          <view class="picker-content">
            {{ activity.tag || '选择活动水平' }}
          </view>
        </picker>
      </view>

      <!-- 活动详情 -->
      <view class="form-item">
        <text class="item-label">活动详情</text>
        <textarea v-model="activity.description" class="textarea-field" placeholder="请输入活动详细说明..." auto-height />
      </view>

      <!-- 图片上传 -->
      <view class="form-item">
        <text class="item-label">活动图片</text>
        <view class="upload-container">
          <view v-for="(image, index) in images" :key="index" class="image-preview">
            <image :src="image" class="preview-image" mode="aspectFill" />
            <view class="delete-icon" @click="removeImage(index)">×</view>
          </view>
          <view class="upload-btn" @click="chooseImage" v-if="images.length < 9">
            <text class="plus-icon">+</text>
            <text class="upload-text">添加图片</text>
          </view>
        </view>
        <text class="upload-tip">建议上传活动场地实拍图（最多9张）</text>
      </view>
    </view>

    <!-- 发布按钮 -->
    <view class="submit-btn" @click="publishActivity">
      <text class="btn-text">{{ userInfo.userID ? '立即发布' : '请先登录' }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 定义常量
const Options = ['羽毛球', '游戏', '乒乓球', '其他'];
const Tags = ['不限', '萌新', '中级', '高级'];

// 定义响应式状态
const images = ref([]);
const activity = reactive({
  title: '',
  price: '',
  address: '',
  detailAddress: '',
  date: '',
  startTime: '',
  endTime: '',
  plan: '',
  tag: '',
  option: '',
  description: '',
  images: []
});

// 选图
const chooseImage = () => {
  uni.chooseImage({
    count: 9 - images.value.length,
    sizeType: ['compressed'],
    sourceType: ['album'],
    success: (res) => {
      images.value = [...images.value, ...res.tempFilePaths];
    }
  });
};

const removeImage = (index) => {
  images.value.splice(index, 1);
};

const setDate = (e) => {
  activity.date = e;
};

const setStartTime = (e) => {
  activity.startTime = e.detail.value;
  validateTime();
};

const setEndTime = (e) => {
  activity.endTime = e.detail.value;
  validateTime();
};

const setTag = (e) => {
  activity.tag = Tags[e.detail.value];
};
const city=ref('不限')

const onRegionChange = (e) => {
  city.value = e.detail.value[1];
};
const onAddressChange = (e) => {
  activity.detailAddress = city.value+e.detail.value;
};
const validateTime = () => {
  if (activity.startTime && activity.endTime) {
    const start = new Date(`1970-01-01T${activity.startTime}`);
    const end = new Date(`1970-01-01T${activity.endTime}`);
    if (start >= end) {
      uni.showToast({
        title: '结束时间必须晚于开始时间',
        icon: 'none'
      });
      activity.endTime = '';
    }
  }
};

const setOption = (e) => {
  activity.option = Options[e.detail.value];
};

const isSubmitting = ref(false);

const publishActivity = async () => {
  if (userInfo.userID === '') {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    return;
  }
  if (isSubmitting.value) return;

  // 表单验证
  const requiredFields = [
    { field: 'title', message: '请填写活动标题' },
    { field: 'price', message: '请填写活动费用' },
    { field: 'address', message: '请选择所在场馆' },
    { field: 'date', message: '请选择日期' },
    { field: 'startTime', message: '请选择开始时间' },
    { field: 'endTime', message: '请选择结束时间' },
    { field: 'plan', message: '请填写计划人数' }
  ];

  for (const { field, message } of requiredFields) {
    if (!activity[field]) {
      return uni.showToast({
        title: message,
        icon: 'none'
      });
    }
  }

  try {
    // 1. 先上传图片
    const imageUrls = await uploadImages();

    // 2. 提交活动数据
    const res = await uni.request({
      method: 'POST',
      url: '/activities',
      data: {
        ...activity,
        images: imageUrls
      }
    });

    // 处理响应...
  } catch (error) {
    uni.showToast({
      title: error.message || '发布失败',
      icon: 'none'
    });
  } finally {
    isSubmitting.value = false;
  }
};

// 用户信息
const userInfo = reactive({
  avatar: '/static/dinohead.jpg',
  nickname: '未登录用户',
  userID: '',
  birthday: ''
});

// 在页面初始化时读取
onLoad(() => {
  const stored = uni.getStorageSync('userInfo');
  if (stored) {
    Object.assign(userInfo, stored);
  }
});
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20rpx 30rpx;
  background: #f8f9fa;
  min-height: 100vh;
}

.page-header {
  padding: 40rpx 0;

  .header-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

.form-container {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.form-item {
  margin-bottom: 40rpx;

  .item-label {
    display: block;
    font-size: 30rpx;
    color: #333;
    margin-bottom: 20rpx;
    font-weight: 500;
  }
}

.input-field,
.textarea-field {
  padding: 20rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #333;
}

.upload-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-preview {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
  overflow: hidden;
  position: relative;

  .preview-image {
    width: 100%;
    height: 100%;
  }

  .delete-icon {
    position: absolute;
    right: 10rpx;
    top: 10rpx;
    width: 36rpx;
    height: 36rpx;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
  }
}

.upload-btn {
  width: 200rpx;
  height: 200rpx;
  border: 2rpx dashed #e9ecef;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .plus-icon {
    font-size: 48rpx;
    color: #666;
  }

  .upload-text {
    font-size: 24rpx;
    color: #666;
    margin-top: 10rpx;
  }
}

.upload-tip {
  font-size: 24rpx;
  color: #999;
  display: block;
  margin-top: 20rpx;
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

  .btn-text {
    color: white;
    font-size: 32rpx;
    font-weight: 500;
  }

  &:active {
    opacity: 0.9;
  }
}

.address-group {
  .address-item {
    margin-bottom: 30rpx;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
.city-picker{
  display: flex;
}
.time-picker {
  .date-picker {
    margin-bottom: 30rpx;
  }

  .time-container {
    display: flex;
    align-items: center;
    gap: 20rpx;

    .time-item {
      flex: 1;

      .picker-content {
        padding: 10rpx;
        border: 2rpx solid #e9ecef;
        border-radius: 8rpx;
        text-align: center;
        color: #333;
      }
    }

    .time-separator {
      color: #666;
      font-size: 28rpx;
    }
  }
}

.number-group {
  display: flex;
  gap: 30rpx;

  .number-item {
    flex: 1;
  }
}

.tag-picker {
  .picker-content {
    padding: 20rpx;
    border: 2rpx solid #e9ecef;
    border-radius: 8rpx;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.textarea-field {
  min-height: 200rpx;
  padding: 20rpx;
  line-height: 1.6;
}
</style>