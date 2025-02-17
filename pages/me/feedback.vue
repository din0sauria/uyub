<template>
  <view class="feedback-page">
    <view class="feedback-title">
      <text>用户反馈</text>
    </view>
    <view class="form-container">
      <!-- 问题类型 -->
      <view class="form-item">
        <text class="label">问题类型：</text>
        <uni-data-select v-model="feedbackType" :localdata="typeOptions" @change="typeChange" placeholder="请选择问题类型"
          class="custom-select"></uni-data-select>
      </view>

      <!-- 反馈内容 -->
      <view class="form-item">
        <text class="label">反馈内容：</text>
        <uni-easyinput type="textarea" v-model="content" placeholder="请详细描述您的反馈内容（必填）" maxlength="500"
          @input="contentInput" class="feedback-content"></uni-easyinput>
      </view>

      <!-- 联系方式 -->
      <view class="form-item">
        <text class="label">联系电话：</text>
        <uni-easyinput v-model="contact" placeholder="请填写手机号码（选填）" type="number" maxlength="11" @input="contactInput"
          class="contact-input"></uni-easyinput>
      </view>

      <!-- 提交按钮 -->
      <button class="submit-button" :disabled="!canSubmit" @click="handleSubmit">
        提交反馈
      </button>
    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import {
    onLoad
  } from '@dcloudio/uni-app';

  // 反馈数据
  const feedbackType = ref(''); // 问题类型
  const content = ref(''); // 反馈内容
  const contact = ref(''); // 联系方式

  // 表单校验状态
  const canSubmit = ref(false); // 是否允许提交

  // 问题类型选项
  const typeOptions = [{
      value: '功能建议',
      text: '功能建议'
    },
    {
      value: '功能报错',
      text: '功能报错'
    },
    {
      value: '其他问题',
      text: '其他问题'
    },
  ];

  // 问题类型改变时的处理
  const typeChange = () => {
    updateSubmitStatus();
  };

  // 反馈内容输入时的处理
  const contentInput = () => {
    updateSubmitStatus();
  };

  // 联系方式输入时的处理
  const contactInput = () => {
    updateSubmitStatus();
  };

  // 更新提交按钮状态
  const updateSubmitStatus = () => {
    canSubmit.value = feedbackType.value && content.value.trim();
  };

  // 提交反馈
  const handleSubmit = async () => {
    // 模拟提交反馈
    uni.showToast({
      title: '已提交,我们会尽快处理',
      icon: 'success',
      duration: 3000,
    });

    // 清空表单
    feedbackType.value = '';
    content.value = '';
    contact.value = '';
  };
</script>

<style lang="scss">
  .feedback-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx;
    background-color: #f5f5f5;
    height: 100vh;
  }

  .feedback-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 40rpx;
  }

  .form-container {
    width: 100%;
    max-width: 600rpx;
    background: #fff;
    padding: 40rpx;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  }

  .form-item {
    margin-bottom: 30rpx;
    display: flex;
    flex-direction: column;
  }

  .label {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 10rpx;
  }

  .custom-select {
    width: 100%;

    border-radius: 10rpx;
    padding: 20rpx 0;
    font-size: 28rpx;
  }

  .feedback-content {
    width: 100%;
    height: 200rpx;
    padding: 20rpx 0;
    font-size: 28rpx;

    border-radius: 10rpx;
    resize: none;
  }

  .contact-input {
    width: 100%;
    height: 80rpx;
    padding: 20rpx 0;
    font-size: 28rpx;

    border-radius: 10rpx;
  }

  .submit-button {
    width: 100%;
    height: 80rpx;
    margin-top: 40rpx;
    background: #0077ff;
    color: #fff;
    font-size: 32rpx;
    border: none;
    border-radius: 40rpx;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
  }

  .submit-button:disabled {
    background: #eee;
    color: #aaa;
    cursor: not-allowed;
  }

  .submit-button::after {
    border: none;
  }
</style>