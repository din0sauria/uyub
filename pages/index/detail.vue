<template>
  <!-- 轮播图 -->
  <swiper class="swiper" autoplay circular>
    <swiper-item v-for="(image, index) in (activity.images||activityex.images)" :key="index">
      <image :src="image" mode="aspectFill" style="width: 100%;"></image>
    </swiper-item>
  </swiper>
  <view class="detail-container">

    <!-- 活动价格 -->
    <view class="price">{{ activity.price }}</view>

    <!-- 活动标题 -->
    <view class="title">{{ activity.title }}</view>

    <!-- 活动地址 -->
    <view class="address"><uni-icons type="location" color="#fff"></uni-icons>&emsp;{{ activity.address }}</view>
    <view class="detailAddress"><uni-icons type="map"
        color="#fff"></uni-icons>&emsp;{{ activity.detailAddress||activity.address }}</view>
    <view class="divider"></view> <!-- 模拟 <hr> -->
    <!-- 活动时间 -->
    <view class="time"><text style="color: gray;">活动时间&emsp;</text>{{ activity.date }} {{ activity.time }}</view>
    <!-- 活动水平 -->
    <view class="tag"><text style="color: gray;">活动水平&emsp;</text>
      <view class="card-tag">{{ activity.tag||"不限" }}</view>
    </view>

  </view>
  <!-- 活动状态 -->
  <view class="signUpinfo">
    <view class="status"> {{ activity.status }}&emsp;( {{ activity.participants }} /
      {{ activity.plan }} )
    </view>

    <!-- 渲染头像 -->
    <view class="avatar-list">
      <view v-for="(avatar, index) in displayedAvatars" :key="index" class="avatar-item">
        <image :src="avatar" mode="aspectFill" class="avatar-image" />
      </view>
      <!-- 如果头像超过 8 个，显示 more-filled 图标 -->
      <uni-icons type="more-filled" size="24" v-if="hasMore" />
    </view>
  </view>
  <!-- 组织方 -->
  <view class="author">
    <view>组织方</view>
    <view class="author-info">
      <image :src="activity.authorAvatar||activityex.authorAvatar" mode="aspectFill" class="author-avatar" />
      <view>
        <view class="author-name">{{ activity.author|| activityex.author}}</view>
        <view class="author-name" style="font-weight: normal;" @click="copytext">
          ID:&ensp;{{ activity.authorID||activityex.authorID }}
          <text style="color: gray;font-weight: 100;">(点击复制)</text>
        </view>
      </view>
    </view>
  </view>


  <!-- 活动介绍 -->
  <view class="intro">
    <view>活动介绍</view>
    <view class="description" style="white-space:pre-line;">{{ activity.description||activityex.description }}</view>

  </view>

  <view style="height: 200rpx;">

  </view>

  <!-- 报名按钮 -->
  <view class="button-container">
    <button class="button" @click="handleSignUp">{{btntext}}</button>
  </view>
</template>

<script setup>
  import {
    ref,
    computed,
    onMounted,
    reactive
  } from 'vue';
  import {
    onLoad
  } from '@dcloudio/uni-app';
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
      Object.assign(userInfo, stored); // 保持响应式
    }
  });
  const btntext = computed(() => {
    if (activity.value.status != '正在报名') return activity.value.status||'去报名';
    else return userInfo.userID ? '立即报名' : '请先登录';
  })
  const activity = ref({
    id: 2,
    title: '幸福林带冠深酷动力羽毛球馆',
    price: '¥60',
    address: '幸福林带冠深酷动力羽毛球馆',
    detailAddress: '陕西省西安市新城区陕健康昆仑医院东南幸福林带冠深酷动力羽毛球馆',
    date: '02月07日 周五',
    time: '19:00-22:00',
    status: '正在报名',
    participants: 9,
    plan: 10,
    tag: '不限',
    description: `人满可以报名等位，等位人数够4人会＋场地，加不上也会退费。
免责声明:心脏病、高血压不宜打球，酒后严禁打球；如受伤或突发疾病本群不承担任何责任，报名视为同意声明。`,
    images: ['/static/zhuoer.jpg','/static/pgd.jpg'],
    author: '羽动生活俱乐部',
    avatars: [
      '/static/c1.png',
      '/static/c2.png',
      '/static/c3.png',
      '/static/c4.png',
      '/static/c5.png',
      '/static/c6.png',
      '/static/c7.png',
      '/static/c8.png',
      '/static/c9.png', // 超过 8 个
    ],
    authorAvatar: '/static/dinohead.jpg',
    authorID: '1234567890'

  });
  const activityex = activity.value;

  // 获取活动详情
  // const fetchActivityDetail = async (actID) => {
  //   try {
  //     const res = await uni.request({
  //       url: `https://your-api-endpoint/activities/${actID}`, // 后端接口
  //       method: 'GET'
  //     });
  //     activity.value = res.data; // 后端返回的数据
  //   } catch (error) {
  //     uni.showToast({
  //       title: '获取活动详情失败',
  //       icon: 'error'
  //     });
  //   }
  // };
  const activities = [{
      actID: 1,
      title: '星禾羽毛球运动中心',
      price: '¥50',
      address: '星禾羽毛球运动中心',
      detailAddress: '陕西省西安市星禾羽毛球运动中心',
      date: '02月07日 周五',
      time: '19:00-22:00',
      status: '正在报名',
      participants: 99,
      plan: 100,
      tags: '不限',
      description: `人满可以报名等位，等位人数够4人会＋场地，加不上也会退费。
      免责声明:心脏病、高血压不宜打球，酒后严禁打球；如受伤或突发疾病本群不承担任何责任，报名视为同意声明。`,
      images: ['/static/zhuoer.jpg','/static/pgd.jpg'],
      author: '羽动生活俱乐部',
      avatars: [
        '/static/c1.png',
        '/static/c2.png',
        '/static/c3.png',
        '/static/c4.png',
        '/static/c5.png',
        '/static/c6.png',
        '/static/c7.png',
        '/static/c8.png',
        '/static/c9.png', // 超过 8 个
      ],
      authorAvatar: '/static/dinoundertreezoom.jpg'
    },
    {
      actID: 2,
      title: '幸福林带冠深酷动力羽毛球馆',
      price: '¥60',
      address: '幸福林带冠深酷动力羽毛球馆',
      detailAddress: '陕西省西安市新城区陕健康昆仑医院东南幸福林带冠深酷动力羽毛球馆',
      date: '02月07日 周五',
      time: '19:00-22:00',
      status: '报名结束',
      participants: 9,
      plan: 10,
      tags: '不限',
      description: `人满可以报名等位，等位人数够4人会＋场地，加不上也会退费。
免责声明:心脏病、高血压不宜打球，酒后严禁打球；如受伤或突发疾病本群不承担任何责任，报名视为同意声明。`,
      images: ['/static/zhuoer.jpg','/static/pgd.jpg'],
      author: '羽动生活俱乐部',
      avatars: [
        '/static/c1.png',
        '/static/c2.png',
        '/static/c3.png',
        '/static/c4.png',
        '/static/c5.png',
        '/static/c6.png',
        '/static/c7.png',
        '/static/c8.png',
        '/static/c9.png', // 超过 8 个
      ],
      authorAvatar: '/static/dinoundertreezoom.jpg'
    },
    {
      actID: 3,
      title: '西安奥体中心羽毛球馆',
      price: '¥50',
      address: '西安市国际港务区港丰路69号',
      date: '02月07日 周五',
      time: '09:00-22:00',
      status: '已报名',
      participants: 50,
      plan: 100,
      tags: '专业'
    },
    {
      actID: 4,
      title: '新曈羽毛球训练中心',
      price: '¥60',
      address: '西安省体育馆BE中心',
      date: '02月07日 周五',
      time: '10:00-22:00',
      status: '正在报名',
      participants: 20,
      plan: 50,
      tags: '专业'
    },
    {
      actID: 5,
      title: '西安西北大学羽毛球馆',
      price: '¥10',
      address: '西安市太白北路229号西北大学校内',
      date: '02月07日 周五',
      time: '14:30-22:00',
      status: '正在报名',
      participants: 30,
      plan: 60,
      tags: '休闲'
    },
    {
      actID: 6,
      title: '朱雀羽毛球馆',
      price: '¥35',
      address: '西安市碑林区长安路北段14号',
      date: '02月07日 周五',
      time: '09:00-22:00',
      status: '正在报名',
      participants: 40,
      plan: 80,
      tags: '专业'
    },
    {
      actID: 7,
      title: '西安博蓝羽毛球馆',
      price: '免费',
      address: '西安市经济开发区凤城十路99号蓝天院内',
      date: '02月07日 周五',
      time: '08:00-22:00',
      status: '正在报名',
      participants: 10,
      plan: 30,
      tags: '萌新'
    },
    {
      actID: '8',
      title: '王者荣耀排位赛王者以上',
      price: '免费',
      address: '不限',
      date: '04月06日 周日',
      time: '19:00-22:00',
      status: '正在报名',
      participants: 12,
      plan: 15,
      tag: '高级'
    },
    {
      actID: '9',
      title: '瓦洛兰特团队赛',
      price: '免费',
      address: '不限',
      date: '04月06日 周日',
      time: '18:00-23:00',
      status: '报名中',
      participants: 4,
      plan: 5,
      tag: '高级'
    },
    {
      actID: '10',
      title: '第五人格新手局',
      price: '免费',
      address: '不限',
      date: '04月06日 周日',
      time: '14:00-18:00',
      status: '正在报名',
      participants: 30,
      plan: 50,
      tag: '萌新'
    },
    {
      actID: '11',
      title: 'CSGO团队竞技赛',
      price: '免费',
      address: '不限',
      date: '04月06日 周日',
      time: '20:00-23:00',
      status: '报名结束',
      participants: 75,
      plan: 80,
      tag: '高级'
    },
    {
      actID: '12',
      title: '英雄联盟匹配',
      price: '免费',
      address: '不限',
      date: '04月06日 周日',
      time: '15:00-21:00',
      status: '正在报名',
      participants: 90,
      plan: 100,
      tag: '萌新'
    },
    {
      actID: '13',
      title: '炉石传说休闲赛',
      price: '免费',
      address: '不限',
      date: '04月06日 周日',
      time: '13:00-17:00',
      status: '报名中',
      participants: 25,
      plan: 40,
      tag: '萌新'
    },
    {
      actID: '14',
      title: 'DOTA2排位赛',
      price: '免费',
      address: '不限',
      date: '04月06日 周日',
      time: '19:00-23:00',
      status: '正在报名',
      participants: 60,
      plan: 70,
      tag: '高级'
    },
    {
      actID: '15',
      title: '星禾乒乓球运动中心',
      price: '45',
      address: '星禾乒乓球运动中心',
      date: '04月06日 周日',
      time: '18:00-21:00',
      status: '正在报名',
      participants: 85,
      plan: 100,
      tag: '不限'
    },
    {
      actID: '16',
      title: '幸福林带乒乓球训练馆',
      price: '55',
      address: '幸福林带乒乓球训练馆',
      date: '04月06日 周日',
      time: '19:30-22:30',
      status: '报名中',
      participants: 15,
      plan: 30,
      tag: '高级'
    },
    {
      actID: '17',
      title: '西安奥体中心乒乓球馆',
      price: '40',
      address: '西安市国际港务区港丰路69号',
      date: '04月06日 周日',
      time: '09:30-21:30',
      status: '正在报名',
      participants: 65,
      plan: 12,
      tag: '高级'
    },
    {
      actID: '18',
      title: '新曈乒乓球训练中心',
      price: '50',
      address: '西安省体育馆BE中心',
      date: '04月06日 周日',
      time: '10:30-21:30',
      status: '报名中',
      participants: 35,
      plan: 60,
      tag: '高级'
    },
    {
      actID: '19',
      title: '西安西北大学乒乓球馆',
      price: '8',
      address: '西安市太白北路229号西北大学校内',
      date: '04月06日 周日',
      time: '14:00-21:00',
      status: '报名中',
      participants: 45,
      plan: 70,
      tag: '中级'
    },
    {
      actID: '20',
      title: '朱雀乒乓球馆',
      price: '30',
      address: '西安市碑林区长安路北段14号',
      date: '04月06日 周日',
      time: '09:30-21:30',
      status: '正在报名',
      participants: 55,
      plan: 90,
      tag: '高级'
    },
    {
      actID: '21',
      title: '西安博蓝乒乓球馆',
      price: '免费',
      address: '西安市经济开发区凤城十路99号蓝天院内',
      date: '04月06日 周日',
      time: '08:30-21:30',
      status: '报名中',
      participants: 12,
      plan: 35,
      tag: '萌新'
    },
    {
      actID: '22',
      title: '星禾健身中心团体课',
      price: '60',
      address: '星禾健身中心',
      date: '04月07日 周一',
      time: '19:00-20:30',
      status: '正在报名',
      participants: 45,
      plan: 50,
      tag: '中级'
    },
    {
      actID: '23',
      title: '城市游泳馆夜场',
      price: '30',
      address: '城市游泳馆',
      date: '04月07日 周一',
      time: '18:00-22:00',
      status: '报名中',
      participants: 60,
      plan: 80,
      tag: '不限'
    },
    {
      actID: '24',
      title: '幸福林带篮球场3v3比赛',
      price: '免费',
      address: '幸福林带篮球场',
      date: '04月08日 周二',
      time: '19:30-21:30',
      status: '正在报名',
      participants: 24,
      plan: 30,
      tag: '竞技'
    },
    {
      actID: '25',
      title: '西安奥体中心足球友谊赛',
      price: '40',
      address: '西安市国际港务区港丰路69号',
      date: '04月09日 周三',
      time: '18:00-20:00',
      status: '报名中',
      participants: 15,
      plan: 22,
      tag: '高级'
    },
    {
      actID: '26',
      title: '新曈瑜伽中心晨练课',
      price: '45',
      address: '新曈瑜伽中心',
      date: '04月10日 周四',
      time: '07:00-08:30',
      status: '正在报名',
      participants: 18,
      plan: 25,
      tag: '不限'
    },
    {
      actID: '27',
      title: '朱雀公园户外徒步',
      price: '免费',
      address: '西安市碑林区朱雀公园',
      date: '04月11日 周五',
      time: '08:30-12:00',
      status: '报名中',
      participants: 35,
      plan: 50,
      tag: '休闲'
    },
    {
      actID: '28',
      title: '西安博蓝攀岩馆挑战赛',
      price: '50',
      address: '西安市经济开发区凤城十路99号',
      date: '04月12日 周六',
      time: '14:00-17:00',
      status: '正在报名',
      participants: 12,
      plan: 20,
      tag: '高级'
    },
    {
      actID: '29',
      title: '西北大学田径场夜跑活动',
      price: '免费',
      address: '西安市太白北路229号西北大学校内',
      date: '04月13日 周日',
      time: '19:00-21:00',
      status: '报名中',
      participants: 40,
      plan: 60,
      tag: '不限'
    },
    {
      actID: '30',
      title: '城市射箭馆体验课',
      price: '80',
      address: '城市射箭馆',
      date: '04月14日 周一',
      time: '19:30-21:00',
      status: '正在报名',
      participants: 10,
      plan: 15,
      tag: '不限'
    },
    {
      actID: '31',
      title: '星禾电竞中心英雄联盟赛事',
      price: '免费',
      address: '不限',
      date: '04月15日 周二',
      time: '19:00-23:00',
      status: '报名中',
      participants: 75,
      plan: 100,
      tag: '高级'
    },
    {
      actID: '32',
      title: '幸福林带台球馆友谊赛',
      price: '25',
      address: '幸福林带台球馆',
      date: '04月16日 周三',
      time: '18:30-22:00',
      status: '正在报名',
      participants: 16,
      plan: 24,
      tag: '中级'
    },
    {
      actID: '33',
      title: '西安奥体中心滑冰体验',
      price: '40',
      address: '西安市国际港务区港丰路69号',
      date: '04月17日 周四',
      time: '14:00-17:00',
      status: '报名中',
      participants: 28,
      plan: 40,
      tag: '不限'
    }
  ];
  const fetchActivityDetail = async (activityId) => {
    try {
      for (const res of activities) {
        // 如果活动 ID 匹配，则赋值给 activity 并返回
        if (res.actID == activityId) {
          activity.value = res; // 找到匹配的活动，赋值给 activity
          return; // 找到后直接返回，避免继续循环
        }
      }
      // 如果没有找到匹配的活动，抛出错误
      console.log(activityId)
      throw new Error('活动未找到');
    } catch (error) {
      uni.showToast({
        title: '获取活动详情失败',
        icon: 'error'
      });
      console.error(error); // 在控制台打印错误信息，方便调试
    }
  };

  // 页面加载时获取活动 ID 并请求数据
  onLoad((options) => {
    // 从 URL 参数中获取活动 ID
    const activityId = options.actID; // 从 URL 参数中获取活动 ID
    //console.log(activityId);
    fetchActivityDetail(activityId);
  });
  //
  const copytext = () => {
    uni.setClipboardData({
      data: activity.value.authorID || activityex.authorID,
      success: function() {
        uni.showToast({
          title: 'ID已复制',
          icon: 'success'
        });
      }
    });
  }

  // 报名按钮点击事件
  const handleSignUp = () => {
    if (userInfo.userID == '') {
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
    if (btntext.value != '立即报名') return;
    // 执行报名逻辑，例如发送请求到后端
    // 这里只是一个示例，实际应用中需要根据后端接口进行相应处理
    activity.value.participants += 1; // 假设报名成功，活动人数加一
    activity.value.status = '已报名'; // 更新活动状态
    uni.showToast({
      title: '报名成功',
      icon: 'success'
    });
  };

  // 计算属性：只显示前 8 个头像
  const displayedAvatars = computed(() => {
    if (!activity.value.avatars) activity.value.avatars=[
        '/static/c1.png',
        '/static/c2.png',
        '/static/c3.png',
        '/static/c4.png',
        '/static/c5.png',
        '/static/c6.png',
        '/static/c7.png',
        '/static/c8.png',
        '/static/c9.png', // 超过 8 个
      ].slice(0,activity.value.participants);
    if (activity.value.avatars.length <= 8) {
      return activity.value.avatars;
    } else {
      return activity.value.avatars.slice(0, 8);
    }
  });

  // 计算属性：判断是否还有更多头像
  const hasMore = computed(() => {
    if (activity.value.avatars) return activity.value.avatars.length > 8;
    else return false;
  });
</script>

<style scoped>
  .detail-container {
    background-color: #333;
    padding: 20rpx 40rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 400rpx;
    font-size: 28rpx;
    color: #eee;
  }

  .swiper {
    height: 400rpx;
  }

  .price {
    position: absolute;
    top: 330rpx;
    right: 0;
    font-size: 60rpx;
    color: gold;
    margin-top: 10rpx;
    background-color: #333;
    padding: 20rpx;
    width: 200rpx;
    border-radius: 50rpx 0;
    text-align: center;
  }

  .title {
    font-size: 40rpx;
    font-weight: bold;
    margin-top: 20rpx;
    color: #fff;
  }

  .tag {
    display: flex;
    height: 40rpx;
    padding: 0;
  }

  .card-tag {
    color: #007AFF;
    background-color: #aaffff;
    border-radius: 5px;
    line-height: 20px;
    width: 100rpx;
    height: 40rpx;
    text-align: center;
    display: block
  }

  .divider {
    border: #eee 1rpx dotted;
  }


  .signUpinfo {
    background-color: #fff;
    height: 100rpx;
    border-radius: 20rpx;
    margin: 20rpx;
    padding: 30rpx;
    font-size: 36rpx;
    font-weight: bold;
    height: 130rpx;
  }

  .avatar-list {
    margin-top: 30rpx;
    display: flex;
    align-items: center;
  }

  .avatar-item {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    margin-right: 10rpx;
  }

  .avatar-image {
    width: 100%;
    height: 100%;
  }

  .author {
    background-color: #fff;
    border-radius: 20rpx;
    margin: 20rpx;
    padding: 30rpx;
    font-size: 36rpx;
    font-weight: bold;
    height: 160rpx;
  }

  .author-avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }

  .author-info {
    display: flex;
    align-items: center;
  }

  .author-name {
    margin: 15rpx 40rpx;
    font-size: 32rpx;
    font-weight: bold;
  }

  .intro {
    background-color: #fff;
    border-radius: 20rpx;
    margin: 20rpx;
    padding: 30rpx;
    font-size: 36rpx;
    font-weight: bold;
  }

  .description {
    font-weight: normal;
    margin-top: 10px;
  }

  .button-container {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 120rpx;
  }

  .button {
    width: 80%;
    margin: 10rpx auto;
    height: 100rpx;
    background-color: #55ffff;
    color: #000;
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    border-radius: 50rpx;
    line-height: 100rpx;
  }

  .button::after {
    border: none;
  }
</style>