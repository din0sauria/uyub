<template>

	<!-- 朋友圈动态列表 -->
	<view class="container">
		<scroll-view class="dynamic-list" scroll-y>
			<view class="dynamic-item" v-for="(dynamicItem, dynamicIndex) in dynamicList" :key="dynamicItem.dynamicID">
				<!-- 用户头像和昵称 -->
				<view class="user-info">
					<image class="avatar" :src="dynamicItem.avatar" mode="aspectFill"></image>
					<text class="nickname">{{ dynamicItem.nickname }}</text>
				</view>
				<!-- 动态内容 -->
				<view class="content">
					<text class="text">{{ dynamicItem.content }}</text>
					<!-- 动态图片 -->
					<view class="image-list" v-if="dynamicItem.images && dynamicItem.images.length > 0">
						<image class="image" v-for="(img, imgIndex) in dynamicItem.images" :key="imgIndex" :src="img"
							mode="aspectFill">
						</image>
					</view>
				</view>
				<!-- 动态时间和点赞评论 -->
				<view class="footer">
					<text class="time">{{ dynamicItem.time }}</text>
					<view class="actions">

						<view class="action">
							<uni-icons class="action-icon" :type="dynamicItem.isLiked?'hand-up-filled':'hand-up'"
								size="35" color="rgb(20, 20, 20)" @click="onLike(dynamicItem)"></uni-icons>
							<text class="action-content">{{dynamicItem.likeCount}}</text>
						</view>

						<view class="action">
							<uni-icons class="action-icon" type="chat" size="35" color="rgb(20, 20, 20)"
								@click="onComment(dynamicItem)"></uni-icons>
							<text class="action-content">{{dynamicItem.commentList.length}}</text>
						</view>

					</view>
				</view>
				<view class="dynamic-comment" v-for="(commentItem, commentIndex) in dynamicItem.commentList"
					:key="commentIndex">
					<text class="commentor" style="font-weight:1000">{{ commentItem.commentor }}</text>
					<text class="comment-content">: {{ commentItem.content }}</text>
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
	// 朋友圈数据
	const dynamicList = ref([{
			dynamicID: 1,
			avatar: '/static/dinohead.jpg',
			nickname: '恐龙苯龙',
			content: '今天天气真好，恐龙想CSltdd！',
			images: [
				'/static/dinoonsea.jpg',
				'/static/csltdd.jpg',
			],
			time: '1小时前',
			isLiked: false,
			likeCount: 156,
			commentList: [{
				commentor: 'ltdd',
				content: '不是哥们'
			}]
		},
		{
			dynamicID: 2,
			avatar: '/static/lyt3.jpg',
			nickname: '小雅',
			content: '分享一张照片～',
			images: ['/static/lyt4.jpg'],
			time: '2小时前',
			isLiked: false,
			likeCount: 99,
			commentList: []
		},
		{
			dynamicID: 3,
			avatar: '/static/zjy.jpg',
			nickname: '小蓝',
			content: '今天学习了新的编程知识，感觉收获满满！',
			images: [],
			time: '3小时前',
			isLiked: false,
			likeCount: 248,
			commentList: []
		},
	])

	function onLike(dynamicItem) {
		dynamicItem.isLiked = !dynamicItem.isLiked;
		if (dynamicItem.isLiked) {
			dynamicItem.likeCount += 1; // 点赞数 +1
		} else {
			dynamicItem.likeCount -= 1; // 点赞数 -1
		}
	}

	function onComment(dynamicItem) {
		// 弹出评论输入框
		uni.showModal({
			title: "发表评论",
			showCancel: true,
			editable: true, // 显示输入框
			placeholderText: "请输入评论内容",
			success: (res) => {
				if (res.confirm) {
					const commentContent = res.content.trim();
					if (commentContent) {
						// 添加评论到动态的评论列表
						const stored = uni.getStorageSync('userInfo');

						dynamicItem.commentList.push({
							commentor: stored.nickname,
							content: commentContent
						});
						console.log(dynamicItem.commentList);
						// 更新评论数
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