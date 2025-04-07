<template>
  <view class="sticky-box">
    <view class="sticky-search">
      <uni-icons type="search"></uni-icons>
      <input class="search-input" placeholder=" 搜索活动" v-model="searchinput">
    </view>

    <!-- 筛选条件 -->
    <view class="filter">
      <view class="date-picker"><uni-datetime-picker type="date" :clear-icon="false" v-model="single" :border="false" />
      </view>
      <view style="display: flex;width: 20%;">
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
    <ActivityCard v-for="(activity, index) in showactivities" :key="index" :actID="activity.actID" :title="activity.title"
      :price="activity.price" :address="activity.address" :date="activity.date" :time="activity.time"
      :status="activity.status" :participants="activity.participants" :plan="activity.plan" :tag="activity.tag"/>
  </scroll-view>
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue';
  import ActivityCard from '/components/card.vue';
  // 日期选择(默认今天)
  const single = ref(new Date().toISOString().split('T')[0]);
  const searchinput = ref('');

  // 下拉筛选条件
  const filters = ['不限','萌新','中级','高级'];
  const selectedFilter = ref(0);

  // 筛选条件变化
  const onFilterChange = (e) => {
    selectedFilter.value = e.detail.value;
  };
  const city = ref('不限');
  const onRegionChange = (e) => {
    city.value = e.detail.value[1];
  };
  // 活动卡片数据
  const activities = [{
      actID: '1',
      title: '星禾羽毛球运动中心',
      price: '50',
      address: '星禾羽毛球运动中心',
      date: '04月13日 周五',
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
      date: '04月13日 周五',
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
      date: '04月13日 周五',
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
      date: '04月13日 周五',
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
      date: '04月13日 周五',
      time: '14:30-22:00',
      status: '报名中',
      participants: 30,
      plan: 60,
      tag: '休闲'
    },
    {
      actID: '6',
      title: '朱雀羽毛球馆',
      price: '35',
      address: '西安市碑林区长安路北段14号',
      date: '04月13日 周五',
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
      date: '04月13日 周五',
      time: '08:00-22:00',
      status: '报名中',
      participants: 10,
      plan: 30,
      tag: '萌新'
    },
    {
      actID: '8',
      title: '王者荣耀排位赛王者以上',
      price: '免费',
      address: '不限',
      date: '04月06日 周日',
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
      plan: 120,
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
  const showactivities = computed(()=>{
    let reg = new RegExp(searchinput.value) //声明正则变量
    let t=activities.filter(item => reg.test(item.title)) //返回
    if (selectedFilter.value != 0 ){
      t = t.filter(item => item.tag === filters[selectedFilter.value])
    }
    return t
  })
</script>

<style>
  .sticky-box {
    position: sticky;
    top: 0rpx;
    z-index: 5;
    background-color: #fff;
    /* 添加背景色 */
    transition: all 0.5s ease-out;
    display: block;
    padding-top: 10rpx;
    width: 100%;
    height: 110rpx;
  }

  .sticky-search {
    background-color: #efefef;
    padding: 10rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    margin-left: 50rpx;
    width: 650rpx;
    transition: all 0.5s ease-out;
    height: 50rpx;
  }

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10rpx;
    height: 50rpx;
  }

  .date-picker {
    width: 30%;
  }

  .card-list {
    margin-top: 20rpx;
  }
</style>