## Ez-blog
Vue-express-mongodb构建的简易博客,使用饿了吗vue组件快速搭建，拿来练练手

 
### 技术选型
Vue+Vue-router+express+MongoDB 4.2+mongoose+element-ui
<br>
欢迎vuex重构

### Clone下来看看？
确认已经下载MongoDB 4.2 版本，并已在后台运行

```
git clone https://github.com/lofiencier/Ez-blog.git
cd ez-blog
npm install
//前端server
npm run dev
//后端server
npm run watch
```



### 已实现模块
- [x] 注册 / 登陆 <邮箱校验格式/是否重复 - 信息提示 - 记住登陆状态>
- [x] Discovery <展示最新文章-下拉刷新>
- [x] MINE 发表 / 删除文章
- [x] 添加/删除评论，添加 / 删除回复
- [x] 修改昵称，个人简介，头像
- [x] 查看个人主页 <点击头像>
- [x] 操作提示 <Vue EventBus侦听>
- [x] 关联删除:eg.删除文章时同时删除文章下评论
- [x] 权限控制
- 未登陆状态不可评论/回复/发表文章
- 只能删除自己的文章/回复/评论


### 引入的富文本编辑器
https://github.com/wangfupeng1988/wangEditor

### 欢迎star,提出issue/pr