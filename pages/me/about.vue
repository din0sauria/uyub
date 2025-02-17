<template>
  <view class="about-page">
    <!-- 页面背景 -->
    <view class="bg"></view>

    <!-- 应用头部信息 -->
    <view class="app-header">
      <view class="app-name">有缘U伴</view>
      <view class="app-version">版本：1.0.0</view>
    </view>

    <!-- 公司信息 -->
    <view class="company-info">
      <view class="company-title">关于团队</view>
      <view class="company-desc">我们专注于为校园学生打造智能约伴平台，促进线上线下互动交流。</view>
    </view>

    <!-- 优势介绍 -->
    <view class="advantages">
      <view class="advantages-title">关于我们的优势</view>
      <view class="advantages-list">
        <view class="advantage-item">
          <uni-icons class="advantage-icon" type="contact-filled" size="30" color="#4cd964"></uni-icons>
          <view class="advantage-text">社交便捷性：快速浏览并报名参加各类活动。</view>
        </view>
        <view class="advantage-item">
          <uni-icons class="advantage-icon" type="location-filled" size="30" color="#007aff"></uni-icons>
          <view class="advantage-text">信息丰富性：活动发起者可以发布详细活动信息。</view>
        </view>
        <view class="advantage-item">
          <uni-icons class="advantage-icon" type="contact-filled" size="30" color="#f0ad4e"></uni-icons>
          <view class="advantage-text">跨平台性：可与微信系统的其他服务整合，如好友分享。</view>
        </view>
      </view>
    </view>

    <!-- 功能展示 -->
    <view class="function-display">
      <view class="function-title">平台核心功能</view>
      <view class="function-items">
        <view class="function-item">
          <uni-icons class="function-icon" type="plus-filled" size="30" color="#4cd964"></uni-icons>
          <view class="function-text">活动发起与报名：发起者与参与者线上线下互动交流。</view>
        </view>
        <view class="function-item">
          <uni-icons class="function-icon" type="star-filled" size="30" color="#007aff"></uni-icons>
          <view class="function-text">智能匹配与推荐：个性化推荐启发思考与实践。</view>
        </view>
        <view class="function-item">
          <uni-icons class="function-icon" type="location-filled" size="30" color="#f0ad4e"></uni-icons>
          <view class="function-text">发现附近的伙伴：寻找身边志同道合伙伴。</view>
        </view>
        <view class="function-item">
          <uni-icons class="function-icon" type="info-filled" size="30" color="#4cd964"></uni-icons>
          <view class="function-text">通知系统：及时推送活动状态变化。</view>
        </view>
        <view class="function-item">
          <uni-icons class="function-icon" type="chat-filled" size="30" color="#007aff"></uni-icons>
          <view class="function-text">精彩互动：分享活动感受、照片和总结。</view>
        </view>
        <view class="function-item">
          <uni-icons class="function-icon" type="contact-filled" size="30" color="#f0ad4e"></uni-icons>
          <view class="function-text">个人管理：便捷管理个人信息和活动记录。</view>
        </view>
      </view>
    </view>


    <!-- 团队介绍 -->
    <view class="team-info">
      <view class="team-title">团队成员</view>
      <view class="team-members">
        <view class="team-member">
          <uni-icons type="auth-filled" size="30"></uni-icons>
          <view class="member-name">张玮</view>
          <view class="member-department">产品经理</view>
        </view>
        <view class="team-member">
          <uni-icons type="auth-filled" size="30"></uni-icons>
          <view class="member-name">陈易东</view>
          <view class="member-department">UI设计师</view>
        </view>
        <view class="team-member">
          <uni-icons type="auth-filled" size="30"></uni-icons>
          <view class="member-name">陈易东</view>
          <view class="member-department">前端工程师</view>
        </view>
        <view class="team-member">
          <uni-icons type="auth-filled" size="30"></uni-icons>
          <view class="member-name">刘灿</view>
          <view class="member-department">前端工程师</view>
        </view>
        <view class="team-member">
          <uni-icons type="auth-filled" size="30"></uni-icons>
          <view class="member-name">戴天奕</view>
          <view class="member-department">后端工程师</view>
        </view>
      </view>
      <view class="team-slogan">一个有创造力和执行力的团队</view>
    </view>

    <!-- 版权信息 -->
    <view class="copyright">
      Copyright © 2024 Now | 有缘U伴 版权所有
    </view>
  </view>
</template>

<script>

</script>

<style>
/* 页面样式 */
.about-page {
  position: relative;
  width: 100vw;
  overflow: hidden;
  background-color: #f0f3f4;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  z-index: -1;
  opacity: 0.4;
}

.app-header {
  text-align: center;
  padding: 70px 0;
}

.app-name {
  font-size: 32px;
  font-weight: bold;
  color: #007aff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.app-version {
  margin-top: 12px;
  font-size: 16px;
  color: #333;
}

.company-info {
  margin: 30px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
}

.company-title {
  font-size: 24px;
  color: #007aff;
  margin-bottom: 15px;
}

.company-desc {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

.advantages {
  margin: 30px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
}

.advantages-title {
  font-size: 24px;
  color: #007aff;
  margin-bottom: 15px;
}

.advantage-item {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.advantage-icon {
  margin-right: 10px;
}

.advantage-text {
  color: #555;
  font-size: 16px;
}

.function-display {
  margin: 30px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
}

.function-title {
  font-size: 24px;
  color: #007aff;
  margin-bottom: 15px;
}

.function-items {
  display: flex;  
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
}

.function-item {
  display: flex;
  align-items: center;
}

.function-icon {
  margin-right: 10px;
}

.function-text {
  color: #555;
  font-size: 16px;
}

.login-button {
  width: 180px;
  height: 48px;
  margin: 40px auto 20px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 18px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease;
}

.login-button:active {
  transform: translateY(2px);
}

.team-info {
  margin: 30px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
}

.team-title {
  font-size: 24px;
  color: #007aff;
  margin-bottom: 15px;
}

.team-members {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
}

.team-member {
  text-align: center;
  max-width: 25%;
}

.member-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.member-name {
  font-weight: bold;
  color: #007aff;
  font-size: 16px;
}

.member-department {
  color: #555;
  font-size: 14px;
}

.team-slogan {
  text-align: center;
  color: #555;
  font-style: italic;
}

.copyright {
  text-align: center;
  color: #aaa;
  font-size: 12px;
  margin-bottom: 20rpx;
}
</style>