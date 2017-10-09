# 网络课程后台管理系统

## 描述

>这是一个模拟某学习网站的后台管理系统而写的一个设计，主要为了方便管理员以及网站讲师管理网站数据
如人员、文字、课程、图片等信息的增、删、改、查等操作。
简单来说就是对网站数据库和文件的快速操作和管理系统，以使得前台内容能够得到及时更新和调整。

## 技术介绍

1. mvc开发模式、seajs模块化开发、nodejs搭建后台，mysql存储数据。

2. bootstrap 构建页面，xTemplate处理后台数据模板，artTemplate处理前台模板。

3. 运用多个插件，比如：jquery-validate表单验证插件、jquery-form.js表单提交插件、jquery-region省市县联动插件、jcrop图片裁切插件、ckeditor富文本框插件、uploadify上传文件插件等。

4. 使用nodejs的mysql包的API连接、处理数据。

5. 使用jquery.cookie.js解析cookie，通过session是否存储用户信息判断用户是否登入。

6. 使用git版本控制。

7. 使用express框架设置路由，使用express.roter处理get、post发送的数据。

## 运行要求

- 在node环境下运行

- 数据存储在mysql数据库里

- 裁切图片使用了[gm](https://www.npmjs.com/package/gm)，因此许安装一个软件：[GraphicsMagick ](http://www.graphicsmagick.org/)，
并将gm设置成环境变量，这一步忽略则不能裁切图片，但对其他功能无影响。

## 运行步骤

1. 使用mysql导入db.sql文件，在config/db.js文件里修改数据库配置。
并在teacher表中手动添加一条初始数据，并将tc_type值为0，
