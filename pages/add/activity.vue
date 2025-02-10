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
        <input v-model="activity.title" class="input-field" placeholder="请输入活动名称"
          placeholder-class="placeholder-style" />
      </view>

      <!-- 活动费用 -->
      <view class="form-item">
        <text class="item-label">活动费用（元）</text>
        <input v-model="activity.price" class="input-field" placeholder="请输入人均费用" placeholder-class="placeholder-style"
          type="number"  @input="valiInt"/>
      </view>

      <!-- 地址选择 -->
      <view class="form-item address-group">
        <view class="address-item">
          <text class="item-label">所在场馆</text>
          <input v-model="activity.address" class="input-field" placeholder="场馆名称"
            placeholder-class="placeholder-style" />
        </view>
        <view class="address-item">
          <text class="item-label">详细地址</text>
          <input v-model="activity.detailAddress" class="input-field" placeholder="街道门牌信息"
            placeholder-class="placeholder-style" />
        </view>
      </view>

      <!-- 时间选择 -->
      <view class="form-item time-picker">
        <text class="item-label">活动时间</text>
        <!-- 日期选择 -->
        <view class="date-picker">
          <uni-datetime-picker type="date" v-model="activity.date" :clear-icon="false" @change="setDate">
          </uni-datetime-picker>
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
          <input v-model="activity.plan" class="input-field" type="number" placeholder="总招募人数"
            placeholder-class="placeholder-style" @input="valiInt" />
        </view>
      </view>

      <!-- 活动标签 -->
      <view class="form-item">
        <text class="item-label">活动类型</text>
        <picker mode="selector" :range="Options" @change="setOption" class="tag-picker">
          <view class="picker-content">
            {{ activity.option || '选择活动类型' }}
            <text class="arrow-icon">▼</text>
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="item-label">活动水平</text>
        <picker mode="selector" :range="Tags" @change="setTag" class="tag-picker">
          <view class="picker-content">
            {{ activity.tag || '选择活动水平' }}
            <text class="arrow-icon">▼</text>
          </view>
        </picker>
      </view>

      <!-- 活动详情 -->
      <view class="form-item">
        <text class="item-label">活动详情</text>
        <textarea v-model="activity.description" class="textarea-field" placeholder="请输入活动详细说明..."
          placeholder-class="placeholder-style" auto-height />
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
    <br>
    <br>

    <!-- 发布按钮 -->
    <view class="submit-btn" @click="publishActivity">
      <text class="btn-text">{{ isSubmitting ? '提交中...' : '立即发布' }}</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        images: [],
        isSubmitting: false,
        Options: ['羽毛球', '游戏', '乒乓球', '其他'],
        Tags:['不限','萌新','中级','高级'],
        activity: {
          title: '',
          price: '',
          address: '',
          detailAddress: '',
          date: '',
          startTime: '',
          endTime: '',
          participants: '',
          plan: '',
          tag: '',
          option:'',
          description: '',
          images: []
        }
      };
    },
    methods: {
      chooseImage() {
        uni.chooseImage({
          count: 9 - this.images.length,
          sizeType: ['compressed'],
          sourceType: ['album'],
          success: (res) => {
            this.images = [...this.images, ...res.tempFilePaths];
          }
        });
      },
      removeImage(index) {
        this.images.splice(index, 1);
      },
      setDate(e) {
        this.activity.date = e;
      },
      setStartTime(e) {
        this.activity.startTime = e.detail.value;
        this.validateTime();
      },
      setEndTime(e) {
        this.activity.endTime = e.detail.value;
        this.validateTime();
      },
      setTag(e){
        this.activity.tag = this.Tags[e.detail.value];
      },
      validateTime() {
        if (this.activity.startTime && this.activity.endTime) {
          const start = new Date(`1970-01-01T${this.activity.startTime}`);
          const end = new Date(`1970-01-01T${this.activity.endTime}`);
          if (start >= end) {
            uni.showToast({
              title: '结束时间必须晚于开始时间',
              icon: 'none'
            });
            this.activity.endTime = '';
          }
        }
      },
      setOption(e) {
        this.activity.option = this.Options[e.detail.value];
      },
      async publishActivity() {
        if (this.isSubmitting) return;

        // 表单验证
        const requiredFields = [{
            field: 'title',
            message: '请填写活动标题'
          },
          {
            field: 'price',
            message: '请填写活动费用'
          },
          {
            field: 'address',
            message: '请选择所在场馆'
          },
          {
            field: 'detailAddress',
            message: '请填写详细地址'
          },
          {
            field: 'date',
            message: '请选择日期'
          },
          {
            field: 'startTime',
            message: '请选择开始时间'
          },
          {
            field: 'endTime',
            message: '请选择结束时间'
          },
          {
            field: 'plan',
            message: '请填写计划人数'
          }
        ];

        for (const {
            field,
            message
          }
          of requiredFields) {
          if (!this.activity[field]) {
            return uni.showToast({
              title: message,
              icon: 'none'
            });
          }
        }

        this.isSubmitting = true;

        try {
          const res = await new Promise((resolve, reject) => {
            uni.request({
              method: 'POST',
              url: '/activities', // 替换为你的实际接口地址
              data: {
                ...this.activity,
                images: this.images
              },
              success: (res) => {
                if (res.statusCode === 200) {
                  resolve(res.data);
                } else {
                  reject(res);
                }
              },
              fail: (error) => {
                reject(error);
              }
            });
          });
        
          uni.showToast({
            title: '发布成功',
            icon: 'success'
          });
          setTimeout(() => uni.navigateBack(), 1500);
          console.log('发布成功:', res);
        } catch (error) {
          console.error('发布失败:', error);
        } finally {
          this.isSubmitting = false;
        }
      }
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
    width: 600rpx;
    padding: 20rpx;
    border: 2rpx solid #e9ecef;
    border-radius: 8rpx;
    font-size: 28rpx;
    color: #333;

    &.textarea-field {
      height: 200rpx;
    }
  }

  .placeholder-style {
    color: #adb5bd;
    font-size: 28rpx;
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

  /* 新增特色样式 */
  .address-group {
    .address-item {
      margin-bottom: 30rpx;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .time-picker {
    .date-picker {
      margin-bottom: 30rpx;

      .picker-content {
        padding: 20rpx;
        border: 2rpx solid #e9ecef;
        border-radius: 8rpx;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
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