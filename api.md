# 数据格式说明

## 首页活动列表/搜索页活动列表

发送参数

```js
  // 活动类型 Tab
 // const tabs = ref(['羽毛球', '游戏', '乒乓球', '其他']);

  // 日期选择(默认今天)
 // const single = ref(new Date().toISOString().split('T')[0]);//yyyy-mm-dd

  // 下拉筛选条件
 // const filters = ref(['不限','萌新','中级','高级']);

  //用户ID（字符串）
  //查询字符串
  //会把城市塞到查询字符串里
  {
  tab:'羽毛球'
  single:'yyyy-mm-dd'
  filter:'不限'
  userID:'123456789'
  query:'西安'

  }
```

希望接收按照以上条件筛选的列表，例如：

```js
//类型说明
const props = defineProps({
  actID: String, // 活动 ID
  title: String,
  price: String,
  address: String,
  date: String,
  time: String,
  status: String,//包括正在报名，报名结束，已报名（根据用户ID查询）
  participants: Number,
  plan: Number,
  tag: String,
  author: String,//昵称
  authorAvatar: String//头像
});
///举例
const activities = [{
      actID: '1',
      title: '星禾羽毛球运动中心',
      price: '¥50',
      address: '星禾羽毛球运动中心',
      date: '02月07日 周五',
      time: '19:00-22:00',
      status: '正在报名',//包括正在报名，报名结束，已报名（根据用户ID查询）
      participants: 99,
      plan: 100,
      tag: '不限',
      author: String,
      authorAvatar: String
    },
    {
      actID: '2',
      title: '幸福林带冠深酷动力羽毛球馆',
      price: '¥60',
      address: '幸福林带冠深酷动力羽毛球馆',
      date: '02月07日 周五',
      time: '19:00-22:00',
      status: '报名结束',
      participants: 8,
      plan: 10,
      tag: '高级',
      author: String,
      authorAvatar: String
    }
//...
  ];
```

## 活动详情

发送参数：活动actID，用户手机号

返回活动详情，其中活动如下表示

```js
const activity = ref({
    actID: 2,
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
    images: ["/static/dinoundertreezoom.jpg", "/static/dinoonsea.jpg"],
    author:'羽动生活俱乐部',
    avatars : [
      '/static/c1.png',
      '/static/c2.png',
      '/static/c3.png',
      '/static/c4.png',
      '/static/c5.png',
      '/static/c6.png',
      '/static/c7.png',
      '/static/c8.png',
      '/static/c9.png',
    ],
    authorAvatar:'/static/dinohead.jpg'
    authorID:'666'

  });
```

## 活动报名

发送参数：活动actID，用户手机号

返回报名结果（成功/失败）

## 发布动态

先发送图片，参考[uni.uploadFile(OBJECT) | uni-app官网](https://uniapp.dcloud.net.cn/api/request/network-file.html)

```js

```

希望返回图片urls

然后发送以下内容

```js
{
          title: '',
          content: '',
          images:[],//图片urls
          userID:''//用户ID
}
```

## 发布活动

同样先发送图片，希望返回图片urls，然后发送以下内容

```js
{
  title: '',
  price: '',
  address: '',
  detailAddress: '',
  date: '',
  startTime: '',
  endTime: '',
  plan: '',
  tag: '',
  option: '',
  description: '',
  images:[],//图片urls
  userID:''//用户ID
});
```

## 动态列表

发送userID（根据userID查询是否点赞）,返回动态列表

```js
{
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
      commentCount: 45,
      commentList: ['ldd超市']
    }
```

发送评论

```js
{
      dynamicID: 1,
      userID:'1'
      comment: 'ldd超市'
    }
```

发送点赞/取消点赞

```js
{
      dynamicID: 1,
      userID:'1'
    }
```

## 消息列表

发送userID,返回是否有好友申请。

发送userID,返回消息列表。（unreadCount为上次发送获取消息详情请求后，此对话新增消息数）

```js
{
      friendId: '2',
      friendName: '小美',
      friendAvatar: '/static/bse1.jpg',
      lastMessage: '你好，我是彭于晏。',
      lastMessageTime: '18:35',
      unreadCount: 0,
    }
```

## 消息详情

发送userID,返回消息列表。（unreadCount为上次发送获取消息详情请求后，此对话新增消息数）

```
  // 消息列表
  const messages = ref([{
      content: '你好呀！',
      isSelf: false
    },
    {
      content: '你好，我是彭于晏。',
      isSelf: true
    },
  ]);
```

发送消息

```
  // 消息列表
  const messages = ref([{
      content: '你好呀！',
      isSelf: false
    },
    {
      content: '你好，我是彭于晏。',
      isSelf: true
}])

```

## 我的

## 登录

后端参考

[用户信息 / 用户信息 / 获取插件用户openpid](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/basic-info/getPluginOpenPId.html)

[用户信息 / 手机号 / 手机号快速验证](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/phone-number/getPhoneNumber.html)

```
小程序登录
    1. 调用 [wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 获取 **临时登录凭证code** ，并回传到开发者服务器。
    2. 调用 [auth.code2Session](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html) 接口，换取 **用户唯一标识 OpenID** 、 用户在微信开放平台账号下的**唯一标识UnionID**（若当前小程序已绑定到微信开放平台账号） 和 **会话密钥 session_key**。
```

```
手机号快速验证组件
    步骤1：需要将 button 组件 open-type 的值设置为 getPhoneNumber，当用户点击并同意之后，通过 bindgetphonenumber 事件获取回调信息；
    步骤2：将 bindgetphonenumber 事件回调中的动态令牌code传到开发者后台，并在开发者后台调用微信后台提供的 phonenumber.getPhoneNumber 接口，消费code来换取用户手机号。每个code有效期为5分钟，且只能消费一次。

    注：getPhoneNumber 返回的 code 与 wx.login 返回的 code 作用是不一样的，不能混用。
```

第一种获得appID/第二种获得手机号，作为用户ID。

希望返回以下内容

```js
const userInfo = reactive({
  avatar: '/static/dinohead.jpg',//(首次给默认值)
  nickname: '未设置昵称',//(首次给默认值)
  userID: '12345678910',//ID
  birthday: ''//yyyy-mm-dd(首次给默认值)
});
```

备注：前端本地会长时间存储userInfo，除非用户退出登录才会清空userInfo

## 修改个人信息

发送更改的`userInfo`，（用户ID（userID）不会修改）

## 获取新增好友列表

发送userID，返回新增好友列表

```js
    [{
      avatar: '/static/dinohead.jpg',
      nickname: '未设置昵称',
      friendId: '12345678910'}]
```

## 获取好友列表

发送userID，返回好友列表

```js
[{
  avatar: '/static/dinohead.jpg',
  nickname: '未设置昵称',
  friendId: '12345678910'}]
```

## 添加好友

发送userID和好友ID

## 删除好友

发送userID和好友ID

## 我发布的活动

发送userID，返回userID发布的活动列表（类似于首页活动列表）

```
{
  actID: String, // 活动 ID
  title: String,
  price: String,
  address: String,
  date: String,
  time: String,
  status: String,
  participants: Number,
  plan: Number,
  tag: String,
  author: String,//昵称
  authorAvatar: String//头像
}
```

## 我参与的活动

发送userID，返回userID报名的活动列表（类似于首页活动列表）
