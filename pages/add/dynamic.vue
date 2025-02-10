<template>
  <view class="page-container">
    <!-- 头部标题 -->
    <view class="page-header">
      <text class="header-title">发布动态</text>
    </view>

    <!-- 表单容器 -->
    <view class="form-container">
      <!-- 标题输入 -->
      <view class="form-item">
        <text class="item-label">标题</text>
        <input 
          type="text" 
          v-model="post.title" 
          class="input-field"
          placeholder="请输入吸引人的标题..."
          placeholder-class="placeholder-style"
        />
      </view>

      <!-- 内容输入 -->
      <view class="form-item content-item">
        <text class="item-label">内容</text>
        <view class="textarea-container">
        <textarea 
          v-model="post.content" 
          class="textarea-field"
          placeholder="分享你的精彩内容..."
          placeholder-class="placeholder-style"
          auto-height
        />
        </view>
      </view>

      <!-- 图片上传 -->
      <view class="form-item">
        <text class="item-label">图片</text>
        <view class="upload-container">
          <view 
            v-for="(image, index) in images" 
            :key="index" 
            class="image-preview"
          >
            <image :src="image" class="preview-image" mode="aspectFill" />
            <view class="delete-icon" @click="removeImage(index)">×</view>
          </view>
          <view 
            class="upload-btn" 
            @click="chooseImage"
            v-if="images.length < 9"
          >
            <text class="plus-icon">+</text>
            <text class="upload-text">添加图片</text>
          </view>
        </view>
        <text class="upload-tip">最多可上传9张图片</text>
      </view>
</view>
    <!-- 发布按钮 -->
    <view class="submit-btn" @click="publishPost">
      <text class="btn-text">{{ userInfo.phone ? '立即发布' : '请先登录' }}</text>
    </view>
  </view>
  <br>
  <br>
</template>

<script setup>
import { ref, reactive} from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const images = ref([]);
const isSubmitting = ref(false);
const post = reactive({
  title: '',
  content: '',
});

const selectedCategoryIndex = ref(null);

const chooseImage = () => {
  const remaining = 9 - images.value.length;
  uni.chooseImage({
    count: remaining,
    sizeType: ['compressed'],
    sourceType: ['album'],
    success: (res) => {
      images.value.push(...res.tempFilePaths);
    }
  });
};

const removeImage = (index) => {
  images.value.splice(index, 1);
};

const categoryChange = (e) => {
  selectedCategoryIndex.value = e.detail.value;
};
// 用户信息
const userInfo = reactive({
  avatar: '/static/dinohead.png',
  nickname: '未登录用户',
  phone: '1',
  birthday: ''
});
// 在页面初始化时读取
onLoad(() => {
  const stored = uni.getStorageSync('userInfo');
  if (stored) {
    Object.assign(userInfo, stored); // 保持响应式
  }
});

const publishPost = async () => {
  if(userInfo.phone==''){
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    return;
  }
  if (isSubmitting.value) return;

  if (!post.title.trim()) {
    uni.showToast({ title: '请填写标题', icon: 'none' });
    return;
  }

  if (!post.content.trim()) {
    uni.showToast({ title: '请填写内容', icon: 'none' });
    return;
  }
  isSubmitting.value = true;

  try {
    console.log(images.value.join(','));
    const res = await uni.request({
      method: 'post',
      url: '/fatie',
      data: JSON.stringify({
        ...post,
        images: images.value.join(','),
        phone:userInfo.phone
      }
    )});
    
    uni.showToast({ title: '发布成功', icon: 'success' });
    setTimeout(() => uni.navigateBack(), 1500);
  } catch (error) {
    console.error('发布失败:', error);
  } finally {
    isSubmitting.value = false;
  }
};
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
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
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

.input-field, .textarea-field {
  padding: 20rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #333;
  width: 95%;
}

.placeholder-style {
  color: #adb5bd;
  font-size: 28rpx;
}

.upload-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
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
    background: rgba(0,0,0,0.5);
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

.category-picker {
  .picker-content {
    padding: 20rpx;
    border: 2rpx solid #e9ecef;
    border-radius: 8rpx;
    font-size: 28rpx;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .arrow-icon {
      color: #666;
      font-size: 24rpx;
      margin-left: 20rpx;
    }
  }
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
</style>