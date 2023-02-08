## 图书管理系统

> 所用技术栈：JavaScript + Express  + Mysql

### 介绍

　　本系统采用 `Node.js + Express.js` 操作 `MySQL/MariaDB` 数据库。系统采用 `ES6` 新语法进行编写，便于阅读，系统采用模块化开发，便于维护。

　　具体的接口文档请移步`bookService.md` 。

### 项目运行

请先安装 `Node.js` 程序，然后进行以下操作：

1. `npm i` 安装依赖
2. `node app.js` 运行程序
3. 项目运行在：`http://127.0.0.1:9000`

### 数据库

1. 新建一个数据库 `create database bookmanage;` 
2. 导入 `bookmanage.sql` 文件

数据库数据配置请在 `config/index.js` 文件中修改

### 系统账号

| 角色       | 账号          | 密码      |
| ---------- | ------------- | --------- |
| 超级管理员 | root@123.com  | Asd000000 |
| 图书管理员 | admin@123.com | Asd000000 |
| 普通用户   | 123@123.com   | Asd000000 |

### 邮件服务

邮件服务配置数据请在`utils/mail.js` 中进行配置。