<template>
  <scroll-view class="container" ref="container" scroll-y @scroll="onScroll">


    <!-- 轮播图 -->
    <swiper class="swiper" autoplay circular>
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image :src="item" mode="aspectFill" style="width: 100%;"></image>
      </swiper-item>
    </swiper>

    <!-- 搜索框 -->
    <view class="search-box" v-if="awesome" @click="goToSearch">
      <uni-icons type="search"></uni-icons>
      <input class="search-input" placeholder=" 搜索活动">
    </view>

    <view class="sticky-box" v-else @click="goToSearch">
      <view class="sticky-search">
        <uni-icons type="search"></uni-icons>
        <input class="search-input" placeholder=" 搜索活动">
      </view>
    </view>

    <!-- 活动类型 Tab -->
    <view :class="tab">
      <view class="active-bar">
        <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: activeTab === index }"
          @click="activeTab = index">
          {{ tab }}
        </view>
      </view>
    </view>

    <!-- 筛选条件 -->
    <view :class="filter">
      <view class="filter">
        <view class="date-picker"><uni-datetime-picker type="date" :clear-icon="false" v-model="single"
            :border="false" /></view>
        <view class="city-picker">
          <uni-icons type="location"></uni-icons>
          <picker mode="region" @change="onRegionChange" level="city">{{city}}</picker>
        </view>
        <picker mode="selector" :range="filters" @change="onFilterChange">
          {{ filters[selectedFilter] }}
          <uni-icons type="down"></uni-icons>
        </picker>

      </view>
    </view>
    <!-- 活动卡片 -->
    <scroll-view class="card-list" v-if="activeTab==0">
      <ActivityCard v-for="(activity, index) in activities" :key="index" :actID="activity.actID" :title="activity.title"
        :price="activity.price" :address="activity.address" :date="activity.date" :time="activity.time"
        :status="activity.status" :participants="activity.participants.length||activity.participants" :plan="activity.plan"
        :tag="activity.tag" />
    </scroll-view>
    <scroll-view class="card-list" v-else-if="activeTab==1">
      <ActivityCard v-for="(activity, index) in activities1" :key="index" :actID="activity.actID"
        :title="activity.title" :price="activity.price" :address="activity.address" :date="activity.date"
        :time="activity.time" :status="activity.status" :participants="activity.participants.length||0"
        :plan="activity.plan" :tag="activity.tag" />
    </scroll-view>
    <scroll-view class="card-list" v-else-if="activeTab==2">
      <ActivityCard v-for="(activity, index) in activities2" :key="index" :actID="activity.actID"
        :title="activity.title" :price="activity.price" :address="activity.address" :date="activity.date"
        :time="activity.time" :status="activity.status" :participants="activity.participants.length||0"
        :plan="activity.plan" :tag="activity.tag" />
    </scroll-view>
    <scroll-view class="card-list" v-else>
      <ActivityCard v-for="(activity, index) in activities3" :key="index" :actID="activity.actID"
        :title="activity.title" :price="activity.price" :address="activity.address" :date="activity.date"
        :time="activity.time" :status="activity.status" :participants="activity.participants.length||0"
        :plan="activity.plan" :tag="activity.tag" />
    </scroll-view>
    <view style="height: 200rpx;"></view>
  </scroll-view>

  <mid-button />
  <tabBar :selectedIndex="0" />
</template>

<script setup>
  import {
    ref,
    computed,
    reactive
  } from 'vue';
  import {
    onShow
  } from '@dcloudio/uni-app'
  import ActivityCard from '/components/card.vue';
  import MidButton from '/components/midbutton.vue';
  import tabBar from '/components/tabBar.vue';

  // 轮播图数据
  const swiperList = [ '/static/zhuoer.jpg','/static/pgd.jpg'];
  const goToSearch = () => {
    uni.navigateTo({
      url: '/pages/index/search' // 替换为你的搜索页面路径
    });
  };


  // 活动类型 Tab
  const tabs = ref(['羽毛球', '游戏', '乒乓球', '其他']);
  const activeTab = ref(0);

  // 日期选择(默认今天)
  const single = ref(new Date().toISOString().split('T')[0]);

  // 下拉筛选条件
  const filters = ref(['不限', '萌新', '中级', '高级']);
  const selectedFilter = ref(0);

  // 筛选条件变化
  const onFilterChange = (e) => {
    selectedFilter.value = e.detail.value;
  };

  const activities = [{
      actID: '1',
      title: '星禾羽毛球运动中心',
      price: '50',
      address: '星禾羽毛球运动中心',
      date: '04月13日 周日',
      time: '19:00-22:00',
      status: '正在报名',
      participants: 99, 
      plan: 100,
      tag: '不限'
    },
    {
      actID: '2',
      title: '幸福林带冠深酷动力羽毛球馆',
      price: '60',
      address: '幸福林带冠深酷动力羽毛球馆',
      date: '04月13日 周日',
      time: '19:00-22:00',
      status: '报名结束',
      participants: 8,
      plan: 10,
      tag: '高级'
    },
    {
      actID: '3',
      title: '西安奥体中心羽毛球馆',
      price: '50',
      address: '西安市国际港务区港丰路69号',
      date: '04月13日 周日',
      time: '09:00-22:00',
      status: '正在报名',
      participants: 50,
      plan: 100,
      tag: '高级'
    },
    {
      actID: '4',
      title: '新曈羽毛球训练中心',
      price: '60',
      address: '西安省体育馆BE中心',
      date: '04月13日 周日',
      time: '10:00-22:00',
      status: '报名中',
      participants: 20,
      plan: 50,
      tag: '高级'
    },
    {
      actID: '5',
      title: '西安西北大学羽毛球馆',
      price: '10',
      address: '西安市太白北路229号西北大学校内',
      date: '04月13日 周日',
      time: '14:30-22:00',
      status: '报名中',
      participants: 30,
      plan: 60,
      tag: '中级'
    },
    {
      actID: '6',
      title: '朱雀羽毛球馆',
      price: '35',
      address: '西安市碑林区长安路北段14号',
      date: '04月13日 周日',
      time: '09:00-22:00',
      status: '正在报名',
      participants: 40,
      plan: 80,
      tag: '高级'
    },
    {
      actID: '7',
      title: '西安博蓝羽毛球馆',
      price: '免费',
      address: '西安市经济开发区凤城十路99号蓝天院内',
      date: '04月13日 周日',
      time: '08:00-22:00',
      status: '报名中',
      participants: 10,
      plan: 30,
      tag: '萌新'
    }
  ];
  
  const activities1 = [{
      actID: '8',
      title: '王者荣耀排位赛王者以上',
      price: '免费',
      address: '不限',
      date: '04月13日 周日',
      time: '19:00-22:00',
      status: '正在报名',
      participants: 120,
      plan: 150,
      tag: '高级'
    },
    {
      actID: '9',
      title: '瓦洛兰特团队赛',
      price: '免费',
      address: '不限',
      date: '04月13日 周日',
      time: '18:00-23:00',
      status: '报名中',
      participants: 45,
      plan: 60,
      tag: '高级'
    },
    {
      actID: '10',
      title: '第五人格新手局',
      price: '免费',
      address: '不限',
      date: '04月13日 周日',
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
      date: '04月13日 周日',
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
      date: '04月13日 周日',
      time: '15:00-21:00',
      status: '正在报名',
      participants: 90,
      plan: 100,
      tag: '萌新'
    },
    {
      actID: '13',
      title: '炉石传说萌新赛',
      price: '免费',
      address: '不限',
      date: '04月13日 周日',
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
      date: '04月13日 周日',
      time: '19:00-23:00',
      status: '正在报名',
      participants: 60,
      plan: 70,
      tag: '高级'
    }
  ];
  
  const activities2 = [{
      actID: '15',
      title: '星禾乒乓球运动中心',
      price: '45',
      address: '星禾乒乓球运动中心',
      date: '04月13日 周日',
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
      date: '04月13日 周日',
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
      date: '04月13日 周日',
      time: '09:30-21:30',
      status: '正在报名',
      participants: 65,
      plan: 120,
      tag: '高级'
    },
    {
      actID: '18',
      title: '新曈乒乓球训练中心',
      price: '50',
      address: '西安省体育馆BE中心',
      date: '04月13日 周日',
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
      date: '04月13日 周日',
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
      date: '04月13日 周日',
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
      date: '04月13日 周日',
      time: '08:30-21:30',
      status: '报名中',
      participants: 12,
      plan: 35,
      tag: '萌新'
    }
  ];
  
  const activities3 = [{
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
      tag: '萌新'
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
      tag: '萌新'
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
      tag: '萌新'
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
      tag: '竞技'
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
      tag: '萌新'
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
      tag: '萌新'
    }
  ];

  const userInfo = reactive({
    avatar: '/static/dinohead.jpg',
    nickname: '未登录用户',
    userID: '',
    birthday: '',
    token: ''
  });
  // 展示页面时读取本地存储的数据
  onShow(() => {
    const stored = uni.getStorageSync('userInfo');
    if (stored) {
      Object.assign(userInfo, stored); // 保持响应式
    }
    getact()
  });
  const getact = () => {
    uni.request({
      url: 'http://120.26.34.133:8081/activity/list', // 替换为实际的后端接口地址
      method: 'GET',
      header: {
        Authorization: `${userInfo.token}`
      },
      success: (res) => {
        console.log('后端交互成功', res);
        console.log(res.data)
        //console.log(activities)
        for (let i of res.data) {
          activities.push(i);
        }

      },
      fail: (err) => {
        console.error('后端交互失败', err);
        // 可以在这里处理错误
      }
    });
  }
  const container = ref(null); // 容器引用
  const scrollTop = ref(0); // 滚动距离
  // 监听滚动事件
  const onScroll = (e) => {
    scrollTop.value = e.detail.scrollTop; // 更新滚动距离
  };

  // 计算属性，用于判断是否需要显示吸顶效果
  const awesome = computed(() => {
    const rpxToPx = (rpx) => {
      const windowWidth = uni.getWindowInfo().screenWidth;
      const pixelRatio = windowWidth / 750; // 750 是设计稿宽度
      return rpx * pixelRatio;
    };
    return scrollTop.value < rpxToPx(220); // 将 rpx 转换为 px
  });

  const tab = computed(() => {
    return awesome.value ? '' : 'sticky-tab';
  });
  const filter = computed(() => {
    return awesome.value ? '' : 'sticky-filter';
  })
  const city = ref('不限');
  const onRegionChange = (e) => {
    city.value = e.detail.value[1];
  };
</script>


<style scoped>
  .container {
    height: 100vh;
  }

  .swiper {
    width: 100%;
    height: 350rpx;
    transition: height 0.3s;
  }


  .search-box {
    position: absolute;
    top: 250rpx;
    background: rgba(255, 255, 255, 0.7);
    padding: 10rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    margin-left: 30rpx;
    width: 350rpx;
  }

  .sticky-box {
    position: fixed;
    top: 0rpx;
    z-index: 5;
    background-color: #fff;
    /* 添加背景色 */
    transition: all 0.5s ease-out;
    display: block;
    padding-top: 50rpx;
    height: 60rpx;
    width: 100%;

  }

  .sticky-search {
    background-color: #efefef;
    padding: 10rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    margin-left: 30rpx;

    width: 350rpx;
    transition: all 0.5s ease-out;
  }

  .sticky-tab {
    display: block;
    position: fixed;
    top: 110rpx;
    /* 吸附在搜索栏下方 */
    z-index: 4;
    background-color: #fff;
    transition: all 0.5s ease-out;
    width: 100%;
  }

  .active-bar {
    padding: 10rpx;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    height: 100%;
  }

  .tab-item {
    padding: 10rpx;
  }

  .tab-item.active {
    border-bottom: 5rpx solid #007AFF;
  }

  .sticky-filter {
    position: fixed;
    top: 170rpx;
    /* 吸附在Tab栏下方 */
    z-index: 3;
    padding-top: 10rpx;
    background-color: #fff;
    transition: top 0.3s;
    width: 100%;
  }

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10rpx;
    height: 100%;
  }

  .date-picker {
    width: 30%;
  }

  .city-picker {
    width: 30%;
    display: flex;
    align-items: center;
  }

  .card-list {
    margin-top: 20rpx;
  }
</style>