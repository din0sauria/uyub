<template>
  <scroll-view class="container" ref="container" scroll-y @scroll="onScroll">


    <!-- 轮播图 -->
    <swiper class="swiper" autoplay circular>
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image :src="item.image" mode="aspectFill" style="width: 100%;"></image>
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
    <scroll-view class="card-list">
      <ActivityCard v-for="(activity, index) in activities" :key="index" :id="activity.id" :title="activity.title"
        :price="activity.price" :address="activity.address" :date="activity.date" :time="activity.time"
        :status="activity.status" :participants="activity.participants" :plan="activity.plan" :tag="activity.tag" />
    </scroll-view>
    <view style="height: 200rpx;"></view>
  </scroll-view>
 
  <mid-button />
  <tabBar :selectedIndex="0" />
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue';
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import ActivityCard from '/components/card.vue';
  import MidButton from '/components/midbutton.vue';
  import tabBar from '/components/tabBar.vue';

  // 轮播图数据
  const swiperList = ref([{
    image: '/static/index/post1.png'
  }]);
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
      id: '1',
      title: '星禾羽毛球运动中心',
      price: '¥50',
      address: '星禾羽毛球运动中心',
      date: '02月07日 周五',
      time: '19:00-22:00',
      status: '正在报名',
      participants: 99,
      plan: 100,
      tag: '不限'
    },
    {
      id: '2',
      title: '幸福林带冠深酷动力羽毛球馆',
      price: '¥60',
      address: '幸福林带冠深酷动力羽毛球馆',
      date: '02月07日 周五',
      time: '19:00-22:00',
      status: '报名结束',
      participants: 8,
      plan: 10,
      tag: '高级'
    },
    {
      id: '3',
      title: '西安奥体中心羽毛球馆',
      price: '¥50',
      address: '西安市国际港务区港丰路69号',
      date: '02月07日 周五',
      time: '09:00-22:00',
      status: '正在报名',
      participants: 50,
      plan: 100,
      tag: '高级'
    },
    {
      id: '4',
      title: '新曈羽毛球训练中心',
      price: '¥60',
      address: '西安省体育馆BE中心',
      date: '02月07日 周五',
      time: '10:00-22:00',
      status: '报名中',
      participants: 20,
      plan: 50,
      tag: '高级'
    },
    {
      id: '5',
      title: '西安西北大学羽毛球馆',
      price: '¥10',
      address: '西安市太白北路229号西北大学校内',
      date: '02月07日 周五',
      time: '14:30-22:00',
      status: '报名中',
      participants: 30,
      plan: 60,
      tag: '中级'
    },
    {
      id: '6',
      title: '朱雀羽毛球馆',
      price: '¥35',
      address: '西安市碑林区长安路北段14号',
      date: '02月07日 周五',
      time: '09:00-22:00',
      status: '正在报名',
      participants: 40,
      plan: 80,
      tag: '高级'
    },
    {
      id: '7',
      title: '西安博蓝羽毛球馆',
      price: '免费',
      address: '西安市经济开发区凤城十路99号蓝天院内',
      date: '02月07日 周五',
      time: '08:00-22:00',
      status: '报名中',
      participants: 10,
      plan: 30,
      tag: '萌新'
    }
  ];


  const container = ref(null); // 容器引用
  const scrollTop = ref(0); // 滚动距离
  // 监听滚动事件
  const onScroll = (e) => {
    scrollTop.value = e.detail.scrollTop; // 更新滚动距离
  };

  // 计算属性，判断是否小于 300rpx
  const awesome = computed(() => {
    const rpxToPx = (rpx) => {
      const windowWidth = uni.getWindowInfo().screenWidth;
      const pixelRatio = windowWidth / 750; // 750 是设计稿宽度
      return rpx * pixelRatio;
    };
    return scrollTop.value < rpxToPx(250); // 将 rpx 转换为 px
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
  .city-picker{
    width: 30%;
    display: flex;
    align-items: center;
  }

  .card-list {
    margin-top: 20rpx;
  }
</style>