<template>
  <view class="sticky-box">
    <view class="sticky-search">
      <uni-icons type="search"></uni-icons>
      <input class="search-input" placeholder=" 搜索活动">
    </view>

    <!-- 筛选条件 -->
    <view class="filter">
      <view class="date-picker"><uni-datetime-picker type="date" :clear-icon="false" v-model="single" :border="false" />
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
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue';
  import ActivityCard from '/components/card.vue';
  // 日期选择(默认今天)
  const single = ref(new Date().toISOString().split('T')[0]);

  // 下拉筛选条件
  const filters = ref(['不限','萌新','中级','高级']);
  const selectedFilter = ref(0);

  // 筛选条件变化
  const onFilterChange = (e) => {
    selectedFilter.value = e.detail.value;
  };

  // 活动卡片数据
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
      tag: '休闲'
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
    width: 40%;
  }

  .card-list {
    margin-top: 20rpx;
  }
</style>