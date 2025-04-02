<template>
	<view>
		<view class="request-info" v-for="request in friendRequests" :key="userId">
			<image class="user-avatar" :src='request.useravatar' mode="aspectFill" />
			<view class="request-content">
				<view class="user-info">
					<text class="username">{{request.username}}</text>
					<text class="userid">用户id：{{request.userId}}</text>
				</view>
				<text class="request-message">验证消息：{{request.message}}</text>
			</view>
			<button @click="acceptRequest(request)" size="mini" :disabled="request.status">接受</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';

	import {
		onLoad
	} from '@dcloudio/uni-app';

	// 存储好友请求列表
	const friendRequests = ref([]);

	const myInfo = reactive({
		avatar: '/static/dinohead.jpg',
		nickname: '未登录用户',
		userID: '',
		birthday: '',
		token: ''
	});

	// 展示页面时读取本地存储的数据
	onLoad(() => {
		const stored = uni.getStorageSync('userInfo');
		if (stored) Object.assign(myInfo, stored)
		getFriendRequests();
	});

	// 获取好友请求列表
	const getFriendRequests = async () => {
		try {
			const {
				data: friendRequestData
			} = await uni.request({
				url: 'http://120.26.34.133:8081/friend/get_request_list',
				method: 'GET',
				header: {
					Authorization: myInfo.token
				}
			})
			// console.log(friendRequestData.data)
			friendRequests.value = friendRequestData.data.map(item => ({
				...item
			}))
			// console.log(friendRequests)
		} catch (err) {
			console.error('获取好友请求列表失败', err);
		}
	};

	// 同意好友请求
	const acceptRequest = async (request) => {
		// console.log(request)
		try {
			const {
				data: res
			} = await uni.request({
				url: `http://120.26.34.133:8081/friend/accept_friend_request/${request.userId}`,
				method: 'POST',
				header: {
					Authorization: myInfo.token
				},
			})
			console.log(res)

//这里应该在res.status == 200时才执行下面的逻辑
			console.log(request)
			const index = friendRequests.value.findIndex((item) => item.userId == request.userId)
			// console.log(index)
			// console.log('*****', friendRequests.value)
			if (index !== -1) {
				friendRequests.value[index] = {
					userId: request.userId,
					username: request.username,
					status: true
				}
				// friendRequests.value = [...friendRequests.value]
				// console.log('++++++', friendRequests.value)
				uni.showToast({
					title: '好友添加成功！',
					duration: 2000
				});
			}

		} catch (err) {
			console.error('同意请求失败', err);
		}
	};
</script>

<style lang="scss">
	.request-info {
		display: flex;
		justify-content: space-between;
		margin: 10rpx;
		padding: 15rpx;
		border: 2rpx solid #ddd;
		box-shadow: 3rpx 3rpx 5rpx gray;
		border-radius: 20rpx;

		.user-avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 30rpx;
			margin-bottom: 20rpx;
		}

		.request-content {
			flex: 1;
			height: 120rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.user-info {
				padding: 10rpx;
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;

				.username {
					font-size: 32rpx;
					font-weight: 600;
				}

				.userid {
					font-size: 28rpx;
					color: #b7b7b7;
					font-weight: 300;
					margin: 0 10rpx 0 30rpx;
				}
			}

			.request-message {
				margin-left: 10rpx;
				font-size: 30rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		button {
			display: flex;
			align-items: center;
			margin: 10rpx;
			background-color: #007aff;
			color: #fff;
			font-size: 600;
		}
	}
</style>