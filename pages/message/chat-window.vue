<template>
	<view class="chat-container">
		<!-- 标题栏 -->
		<view class="header" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
			<view class="nav-back" @click="goBack">
				<uni-icons type="left" size="24" color="#333"></uni-icons>
				<text class="friend-name">{{ friendInfo.nickname }}</text>
			</view>
		</view>

		<!-- 消息列表 -->
		<scroll-view 
			class="message-area" 
			scroll-y
			:scroll-with-animation="true"
			:scroll-top="scrollTop"
		>
			<view 
				v-for="(msg, index) in messages" 
				:key="index" 
				class="message-bubble"
				:class="{ 'self-message': msg.isSelf }"
			>
				<image 
					class="user-avatar"
					:src="msg.isSelf ? myInfo.avatar : friendInfo.avatar"
					mode="aspectFill"
				/>
				<view class="content-box">
					<text class="message-text">{{ msg.content }}</text>
				</view>
			</view>
			<view class="scroll-anchor"></view>
		</scroll-view>

		<!-- 输入框 -->
		<view class="input-area" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
			<textarea
				class="message-input"
				v-model="messageToSend"
				placeholder="输入消息..."
				:adjust-position="false"
				@confirm="sendMessage"
			/>
			<button 
				class="send-button" 
				:class="{ 'disabled': !messageToSend.trim() }" 
				@click="sendMessage"
			>
				发送
			</button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const { safeAreaInsets } = uni.getSystemInfoSync();

// 用户信息
const myInfo = reactive({
	avatar: '/static/pyy.jpeg',
	nickname: '未登录用户',
	userID: '8'
});

const friendInfo = reactive({
	avatar: '',
	nickname: '',
	userID: ''
});

// 消息相关
const messages = ref([]);
const messageToSend = ref('');
const scrollTop = ref(0);

// 初始化加载
onLoad((options) => {
	const stored = uni.getStorageSync('userInfo');
	if (stored) Object.assign(myInfo, stored);
	
	friendInfo.avatar = options.friendAvatar || '/static/default-avatar.png';
	friendInfo.nickname = options.friendName || '未命名用户';
	friendInfo.userID = options.friendId;
	
	loadHistoryMessages(options.friendId, myInfo.userID);
});

// 加载历史消息
const loadHistoryMessages = (friendId, myId) => {
	try {
		const chatHistory = chatRecords[myId]?.[friendId] || [];
		messages.value = chatHistory.map(msg => ({
			content: msg.content,
			isSelf: msg.senderId === myId
		}));
		scrollToBottom();
	} catch (error) {
		console.error("加载历史消息失败:", error);
	}
};

// 发送消息
const sendMessage = () => {
	const content = messageToSend.value.trim();
	if (!content) return;

	messages.value.push({
		content: content,
		isSelf: true
	});
	
	messageToSend.value = '';
	scrollToBottom();
};

// 滚动到底部
const scrollToBottom = () => {
	nextTick(() => {
		scrollTop.value = Math.random();
	});
};

const goBack = () => {
	uni.navigateBack();
};

// 模拟数据
const chatRecords = {
"8": { // 用户1的聊天记录
			"1": [ // 与用户2的聊天记录
				{
					senderId: "1",
					content: "你好！",
				},
				{
					senderId: "8",
					content: "你好，我是彭于晏",		
				}
			],
			"3": [ // 与用户3的聊天记录
				{
					senderId: "1",
					content: "嗨，最近怎么样？",
				}
			]
		},
		"2": { // 用户2的聊天记录
			"1": [ // 与用户1的聊天记录（与上面重复，但为了完整性保留）
				{
					senderId: "1",
					content: "你好！",
				},
				{
					senderId: "2",
					content: "你好，我是朋友",
				}
			]
		},
		"3": { // 用户3的聊天记录
			"1": [ // 与用户1的聊天记录
				{
					senderId: "1",
					content: "嗨，最近怎么样？",
				}
			]
		}
};
</script>

<style lang="scss" scoped>
.chat-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background: #f0f2f5;

	.header {
		background: #fff;
    height: 100rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
		.nav-back {
			display: flex;
			align-items: center;
			padding: 16rpx 24rpx;
			
			.friend-name {
        margin-left: 16rpx;
				font-size: 34rpx;
				font-weight: 500;
				color: #333;
			}
		}
	}

	.message-area {
		flex: 1;
		overflow-anchor: auto;

		.message-bubble {
			margin: 24rpx 20rpx;
			display: flex;
			align-items: flex-start;
			max-width: 80%;

			.user-avatar {
				flex-shrink: 0;
				width: 64rpx;
				height: 64rpx;
				border-radius: 8rpx;
				margin-right: 16rpx;
			}

			.content-box {
				padding: 16rpx 24rpx;
				background: #fff;
				border-radius: 12rpx;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
				.message-text {
					font-size: 30rpx;
					line-height: 1.4;
					color: #333;
				}
			}

			&.self-message {
				flex-direction: row-reverse;
				margin-left: auto;
				
				.user-avatar {
					margin-left: 16rpx;
					margin-right: 0;
				}
				
				.content-box {
					background: #07c160;
					.message-text {
						color: #fff;
					}
				}
			}
		}

		.scroll-anchor {
			height: 1rpx;
			visibility: hidden;
		}
	}

	.input-area {
		background: #fff;
		padding: 20rpx 24rpx;
		display: flex;
		align-items: center;
		border-top: 1rpx solid #eee;
		box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.03);

		.message-input {
			flex: 1;
			min-height: 80rpx;
			max-height: 200rpx;
			padding: 16rpx 24rpx;
			margin-right: 20rpx;
			background: #f8f8f8;
			border-radius: 40rpx;
			font-size: 30rpx;
			line-height: 1.4;
		}

		.send-button {
			width: 140rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #07c160;
			color: #fff;
			font-size: 30rpx;
			border-radius: 40rpx;
			transition: all 0.2s;

			&.disabled {
				background: #ccc;
				opacity: 0.7;
			}
		}
	}
}
</style>