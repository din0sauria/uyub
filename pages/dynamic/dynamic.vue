<template>
	<!-- 动态的数据结构中添加头像属性
 评论只保留昵称和内容属性即可-->
	<view class="container">
		<!-- 朋友圈动态列表 -->
		<scroll-view class="dynamic-list" scroll-y>
			<view class="dynamic-item" v-for="(dynamicItem, dynamicIndex) in dynamicList" :key="dynamicItem.dynamicID">
				<!-- 用户头像和昵称 -->
				<view class="user-info">
					<image class="avatar" :src="dynamicItem.authorAvatar" mode="aspectFill"></image>
					<text class="nickname">{{ dynamicItem.author }}</text>
				</view>
				<!-- 动态内容 -->
				<view class="content">
					<text class="text">{{ dynamicItem.content }}</text>
					<!-- 动态图片 -->
					<!-- && dynamicItem.images.length > 0 -->
					<view class="image-list" v-if="dynamicItem.images ">
						<image class="image" v-for="(img, imgIndex) in dynamicItem.images" :key="imgIndex" :src="img"
							mode="aspectFill">
						</image>
					</view>
				</view>
				<!-- 动态时间和点赞评论 -->
				<view class="footer">
					<text class="time">{{ dynamicItem.time }}</text>
					<view class="actions">

						<!-- 						<view class="action">
							<uni-icons class="action-icon" :type="dynamicItem.isLiked?'hand-up-filled':'hand-up'"
								size="35" color="rgb(20, 20, 20)" @click="onLike(dynamicItem)"></uni-icons>
							<text class="action-content">{{dynamicItem.likeCount}}</text>
						</view> -->

						<view class="action">
							<uni-icons class="action-icon" type="chat" size="35" color="rgb(20, 20, 20)"
								@click="onComment(dynamicItem)"></uni-icons>
							<!-- 这里会报错，因为commentList是一个在异步操作中添加的属性，一开始的时候会undefined-->
							<!-- <text class="action-content">{{dynamicItem.commentList.length}}</text> -->
						</view>

					</view>
				</view>
				<view class="dynamic-comment" v-for="(commentItem, commentIndex) in dynamicItem.commentList"
					:key="commentIndex">
					<text class="commentor" style="font-weight:1000">{{ commentItem.author }}</text>
					<text class="comment-content">: {{ commentItem.comment }}</text>
				</view>
			</view>
			<view style="height: 200rpx;"></view>
		</scroll-view>
	</view>
	<midButton />
	<tabBar :selectedIndex="1" />
</template>

<script setup>
	import midButton from '/components/midbutton.vue'
	import tabBar from '/components/tabBar.vue'
	import {
		ref
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app';

	const dynamicList = ref([])
	const myInfo = ref()
	
	onShow((options) => {
		const stored = uni.getStorageSync('userInfo');
		if (stored) Object.assign(myInfo, stored);
		getDynamicList()
	})

	const getDynamicList = async () => {
		try {
			// 发起 GET 请求获取聊天记录
			const {
				data:dynamicData
			} = await uni.request({
				// url: 'http://api.ballmate.temp.ziqiang.net.cn/dynamic/showDynamics', // 请求的 URL
				url: 'http://api.ballmate.temp.ziqiang.net.cn/dynamic/showDynamics', 
				method: 'GET',
				header: {
					Authorization: `${myInfo.token}` // 假设 userInfo.token 包含有效的授权令牌
					// Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJpN0ZEYzUiLCJzZXNzaW9uX2tleSI6IjhxSU11RlliMnRkMyIsImxvZ2luX3RpbWUiOiIyMDI1LTA0LTAxVDEzOjI0OjQ5LjM4NDU1NCIsImV4cCI6MTc0MzU3MTQ4OS4zNjg1NDR9.UY2gA8amQMZCBFH8TcAFvpl_11_s2jSUC4GWPx6bR28'
				},
			});
			console.log(dynamicData)
			for (let i = 0; i < dynamicData.data.length; i++) {
				dynamicList.value.push(dynamicData.data[i])
			}
			for (let i = 0; i < dynamicList.value.length; i++) {
				const {
					data: dynamicData
				} = await uni.request({
					url: 'http://api.ballmate.temp.ziqiang.net.cn/dynamic/showComments',
					method: 'GET',
					header: {
						Authorization: myInfo.token // 假设 userInfo.token 包含有效的授权令牌
					},
					data: {
						dynID: dynamicList.value[i].dynID
					}
				})
				dynamicList.value[i].commentList = dynamicData.data
			}
			// console.log(dynamicList)
			console.log(dynamicList.value)
		} catch (error) {
			// 如果请求失败，打印错误信息
			console.error("hahaha", error);
		}
	}

	// function onLike(dynamicItem) {
	// 	dynamicItem.isLiked = !dynamicItem.isLiked;
	// 	if (dynamicItem.isLiked) {
	// 		dynamicItem.likeCount += 1; // 点赞数 +1
	// 	} else {
	// 		dynamicItem.likeCount -= 1; // 点赞数 -1
	// 	}
	// }

	function onComment(dynamicItem) {
		// 弹出评论输入框
		// console.log(dynamicItem.dynID)
		uni.showModal({
			title: "发表评论",
			showCancel: true,
			editable: true, // 显示输入框
			placeholderText: "请输入评论内容",
			success: (res) => {
				console.log(res)
				if (res.confirm) {
					const commentContent = res.content.trim();
					if (commentContent) {
						uni.request({
							url: 'http://api.ballmate.temp.ziqiang.net.cn/dynamic/comment/add',
							method: 'POST',
							header: {
								Authorization: myInfo.userID,
							},
							data: {
								dynID: dynamicItem.dynID,
								comment: commentContent
							}
						})
						dynamicItem.commentList.push({
							author: myInfo.nickname,
							comment: commentContent
						})
					} else {
						uni.showToast({
							title: "评论内容不能为空",
							icon: "none",
						});
					}
				}
			},
		});
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;


		.dynamic-list {
			.dynamic-item {
				margin-bottom: 30rpx;
				padding: 20rpx;
				background-color: #fff;
				border-radius: 10rpx;
				box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

				.user-info {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;

					.avatar {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.nickname {
						font-size: 32rpx;
						font-weight: bold;
					}
				}

				.content {
					margin-bottom: 20rpx;

					.text {
						font-size: 28rpx;
						line-height: 1.5;
					}

					.image-list {
						display: flex;
						flex-wrap: wrap;
						margin-top: 20rpx;

						.image {
							width: 200rpx;
							height: 200rpx;
							margin-right: 10rpx;
							margin-bottom: 10rpx;
							border-radius: 10rpx;
						}
					}
				}

				.footer {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 24rpx;
					color: #999;

					.actions {
						display: flex;
						align-items: center;

						.action {
							display: flex;
							align-items: center;
							margin-left: 24rpx;

							.action-icon {
								margin-right: 8rpx;
								color: #333;
							}
						}
					}

					.dynamic-comment {
						margin: 30rpx;
					}
				}
			}
		}
	}
</style>