> 请求根路径：https://api.1crh.cn/bookserver/
>
> `status`：0代表请求成功 1代表失败
>
> `msg`：消息提示
>
> `data`：返回的数据
>
> 只要不是 `api` 开头的请求，都需要登录

## 用户相关操作

### 用户获取邮箱验证码

1. 请求路径：`api/getvercode`

2. 请求方式：`POST`

3. 参数

   携带参数：

   | 参数    | 描述   | 备注                       |
   | ------- | ------ | -------------------------- |
   | account | 邮箱号 | 返回的token有效期为 3 分钟 |

   ```js
   {
       account: 'xxx@qq.com'
   }
   ```

   返回实例：

   ```js
   {
       "status": 0,
       "msg": "success",
       "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxpQ29kZSI6InZkbGUiLCJpYXQiOjE2NzM4NTc1NDYsImV4cCI6MTY3Mzg1NzY2Nn0.2xN9WL_Zk13UaH42uTYGIBRFILtG-iBtpuawknJCX2U"
   }
   ```

 ### 用户注册

   1. 请求路径：`api/register`

   2. 请求方式：`POST`

   3. 参数

      携带参数

      | 参数       | 描述                       | 备注                                          |
      | ---------- | -------------------------- | --------------------------------------------- |
      | account    | 账号                       | 使用邮箱号码作为用户名，不推荐使用QQ邮箱      |
      | password   | 密码                       | 要求必须包含大小写和数字，长度最小9位最长16位 |
      | valiCode   | 邮箱验证码                 |                                               |
      | secretCode | 服务器返回的加密后的验证码 | 有效期3分钟                                   |

      ```js
      {
          account: 'xxx@163.com',
          password: 'Aa1234567',
          valiCode: aass,
          secretCode: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxpQ29kZSI6InZkbGUiLCJpYXQiOjE2NzM4NTc1NDYsImV4cCI6MTY3Mzg1NzY2Nn0.2xN9WL_Zk13UaH42uTYGIBRFILtG-iBtpuawknJCX2U'
      }
      ```

      返回实例
      
      ```js
      {
          "status": 0,
          "msg": "注册成功，新用户信息录入完毕！"
      }
      ```

### 用户登录

1. 请求路径：`api/login`

2. 请求方式：`POST`

3. 参数

   携带参数

   | 参数     | 描述 | 备注 |
   | -------- | ---- | ---- |
   | account  | 账号 |      |
   | password | 密码 |      |

   ```json
   {
       "account": "xxx",
       "password": "xxx"
   }
   ```

   返回实例

   | 参数     | 描述          | 备注                     |
   | -------- | ------------- | ------------------------ |
   | id       | 用户的id      |                          |
   | identity | 用户的身份    |                          |
   | token    | 认证token信息 | 有效期24小时             |
   |          |               | TODO：返回对应的前端路由 |

   ```json
   {
       "status": 0,
       "msg": "登录成功",
       "data": {
           "id": "10103",
           "identity": 0,
           "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMTAzIiwiYWNjb3VudCI6IjMzMzEyMzA4MzZAcXEuY29tIiwicGFzc3dvcmQiOiIiLCJpZGVudGl0eSI6MCwiaXNfZGVsZXRlIjowLCJpYXQiOjE2NzM4NjYwODUsImV4cCI6MTY3Mzk1MjQ4NX0.p8gBTUYG-4Ilco9c5jnEE95Fm3SEskRJMHnmTpvV1mE"
       }
   }
   ```

### 用户找回密码

1. 请求路径：`api/retrievepwd`

2. 请求方式：`POST`

3. 参数

   携带参数

   | 参数       | 描述         | 备注                            |
   | ---------- | ------------ | ------------------------------- |
   | account    | 账号         | 验证码发这个邮箱号上            |
   | newPwd     | 设置的新密码 | 9-16位 必须包含大小写字母和数字 |
   | valiCode   | 接收的验证码 | 有效期 3 分钟                   |
   | secretCode | 加密的验证码 | 有效期 3 分钟                   |

   ```json
   {
       "account": "xxx",
       "newPwd": "xxx",
       "valiCode": "xxxx",
       "secretCode": 'xxxx'
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "修改密码成功"
   }
   ```


### 获取用户资料信息

1. 请求路径：`my/userinfo`

2. 请求方式：`GET`

3. 参数：无

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": {
           "info_id": 5,
           "nickname": "新用户_369700",
           "gender": 1,
           "birthday": "1999-1-1",
           "avatar": null
       }
   }
   ```

### 更新用户资料信息

1. 请求路径：`my/updateuserinfo`

2. 请求方式：`POST`

3. 参数

   携带参数

   | 参数     | 描述         | 备注       |
   | -------- | ------------ | ---------- |
   | info_id  | 对应资料的id | 必填       |
   | nickname | 昵称         |            |
   | gender   | 性别         | 男1 女0    |
   | birthday | 生日         | YYYY-MM-DD |
   | avatar   | 头像         |            |

   ```json
   {
       "info_id": 1,
       "nickname": "赵四",
       "gender": 1,
       "birthday": "1999-01-01",
       "avatar": "xxxx"
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "更新用户信息成功"
   }
   ```


### 用户修改密码

1. 请求路径：`my/updatepwd`

2. 请求方式：`POST`

3. 参数

   | 参数   | 描述   | 备注 |
   | ------ | ------ | ---- |
   | oldPwd | 原密码 |      |
   | newPwd | 新密码 |      |

   ```json
   {
       "oldPwd": "xxx",
       "newPwd": "xxaa"
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "密码修改成功"
   }
   ```

### 上传用户头像

1. 请求路径：`my/uploadavatar`

2. 请求方式：`POST`

3. 参数

   | 参数   | 描述     | 备注 |
   | ------ | -------- | ---- |
   | avatar | 头像文件 |      |

   ```json
   {
       "avatar": "文件"
   }
   ```

   返回实例

   ```json
   {
           "status": 200,
           "msg": "上传成功， 手动拼接根路径哦",
           "data": "avatar/xxx.jpg"
         }
   ```

### 更新用户头像

1. 请求路径：`my/updateavatar`

2. 请求方式：`POST`

3. 参数

   | 参数   | 描述                    | 备注 |
   | ------ | ----------------------- | ---- |
   | avatar | 服务器返回的图片url路径 |      |

   ```json
   {
       "avatar": "127.0.0.1:9000/avatar/123sdsa.jpg"
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "更新用户头像成功"
   }
   ```

   

## 图书分类相关操作

### 获取全部分类信息

1. 请求路径：`cate/list`

2. 请求方式：`GET`

3. 参数： 无

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": [
           {
               "category_id": 1,
               "category_name": "科幻",
               "is_delete": 0
           },
           {
               "category_id": 2,
               "category_name": "IT",
               "is_delete": 0
           }
       ]
   }
   ```


### 获取指定id的分类信息

1. 请求方式：`cate/:id`

2. 请求方式：`GET`

3. 参数

   | 参数 | 描述     | 备注 |
   | ---- | -------- | ---- |
   | id   | 分类的id |      |

   ```js
   // 参数实例
   http://127.0.0.1:9000/cate/1
   ```

   返回体实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": {
           "category_id": 2,
           "category_name": "IT",
           "is_delete": 0
       }
   }
   ```

### 新增分类信息

1. 请求路径：`cate/addcate`

2. 请求方式：`POST`

3. 参数

   | 参数          | 描述     | 备注 |
   | ------------- | -------- | ---- |
   | category_name | 分类名称 |      |

   ```json
   {
       "category_name": "历史"
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "添加分类信息成功"
   }
   ```

### 修改分类信息

1. 请求路径：`cate/updatecate`

2. 请求方式：`POST`

3. 参数

   | 参数          | 描述       | 备注 |
   | ------------- | ---------- | ---- |
   | category_id   | 分类的id   |      |
   | category_name | 分类的name |      |

### 删除分类信息

1. 请求路径：`cate/delete/:id`

2. 请求方式：`GET`

3. 参数

   | 参数 | 描述     | 备注 |
   | ---- | -------- | ---- |
   | id   | 分类的id |      |

   ```js
   // 参数实例
   http://127.0.0.1:9000/cate/delete/555
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "删除分类信息成功"
   }
   ```

## 图书信息相关操作

### 获取全部图书

1. 请求路径：`book/list`

2. 请求方式：`GET`

3. 参数：无

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": [
           {
               "book_id": 1,
               "book_name": "JavaScript高级程序设计 第四版",
               "cover": "",
               "author": "马特·弗里斯比",
               "cate_id": 2,
               "is_delete": 0
           },
           {
               "book_id": 2,
               "book_name": "CSS权威指南 第四版",
               "cover": null,
               "author": "安道",
               "cate_id": 2,
               "is_delete": 0
           },
           {
               "book_id": 3,
               "book_name": "C++ Primer Plus 第6版",
               "cover": null,
               "author": "史蒂芬·普拉达",
               "cate_id": 2,
               "is_delete": 0
           },
           {
               "book_id": 4,
               "book_name": "钢铁是怎样练成的",
               "cover": null,
               "author": "奥斯托洛夫斯基",
               "cate_id": 3,
               "is_delete": 0
           }
       ]
   }
   ```

### 按 id 获取指定的图书信息

1. 请求路径：`book/:id`

2. 请求方式：`GET`

3. 参数

   | 参数 | 描述     | 备注 |
   | ---- | -------- | ---- |
   | id   | 图书的id |      |

   ```js
   // 携带参数实例
   http://127.0.0.1:9000/book/66
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": {
           "book_id": 1,
           "book_name": "JavaScript高级程序设计 第四版",
           "cover": "",
           "author": "马特·弗里斯比",
           "cate_id": 2,
           "is_delete": 0
       }
   }
   ```

### 按照书名查询图书（可模糊查询）

1. 请求路径：`book/bookname/:bookname`

2. 请求方式：`GET`

3. 参数

   | 参数     | 描述     | 备注 |
   | -------- | -------- | ---- |
   | bookname | 图书名称 |      |

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": [
           {
               "book_id": 1,
               "book_name": "JavaScript高级程序设计 第四版",
               "cover": "",
               "author": "马特·弗里斯比",
               "cate_id": 2,
               "is_delete": 0
           }
       ]
   }
   ```

### 通过分类ID查询图书

1. 请求路径：`book/booklist/:id`

2. 请求方式：`GET`

3. 参数

   | 参数 | 描述   | 备注 |
   | ---- | ------ | ---- |
   | id   | 分类id |      |

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": [
           {
               "book_id": 4,
               "book_name": "钢铁是怎样练成的",
               "cover": null,
               "author": "奥斯托洛夫斯基",
               "cate_id": 3,
               "is_delete": 0
           },
           {
               "book_id": 5,
               "book_name": "十万个为什么",
               "cover": null,
               "author": "佚名",
               "cate_id": 3,
               "is_delete": 0
           },
           {
               "book_id": 6,
               "book_name": "狂人日记",
               "cover": null,
               "author": "鲁迅",
               "cate_id": 3,
               "is_delete": 0
           }
       ]
   }

### 修改图书信息

1. 请求路径：`book/update`

2. 请求方式：`POST`

3. 参数

   | 参数      | 描述         | 备注         |
   | --------- | ------------ | ------------ |
   | book_id   | 图书的id     |              |
   | book_name | 图书的名字   | 名字必须唯一 |
   | cover     | 封面         |              |
   | author    | 作者         |              |
   | cate_id   | 图书分类的id |              |

   ```json
   {
       "book_id": 1,
       "book_name": "aaa",
       "cover": "sdsfas",
       "author": "bbb",
       "cate_id": 1
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "修改图书信息成功"
   }
   ```


### 新增图书信息

1. 请求路径：`book/addbook`

2. 请求方式：`POST`

3. 参数

   | 参数      | 描述     | 备注 |
   | --------- | -------- | ---- |
   | book_name | 图书名字 |      |
   | cover     | 封面图片 |      |
   | author    | 作者     |      |
   | cate_id   | 分类id   |      |

   ```json
   {
       "book_name": "十万个为什么",
       "cover": "xxx.com/sdsd.jpg",
       "author": "佚名",
       "cate_id": 3
   }
   ```

   返回实例

   ```json
   {
       "status": 1,
       "msg": "书名已存在"
   }
   ```

### 删除图书

1. 请求路径：`book/delete/:id`

2. 请求方式：`GET`

3. 参数

   | 参数 | 描述     | 备注 |
   | ---- | -------- | ---- |
   | id   | 图书的id |      |

   ```js
   // 具体实例
   // 删除 id 为 1 的图书信息
   http://127.0.0.1/book/delete/1
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "删除图书成功"
   }
   ```

### 上传图书封面

1. 请求路径：`book/updatecover`

2. 请求方式：`POST`

3. 参数

   | 参数  | 描述         | 备注 |
   | ----- | ------------ | ---- |
   | cover | 封面图片文件 |      |

   返回实例

   ```json
   {
       "status": 200,
       "msg": "上传成功， 手动拼接根路径哦",
       "data": "cover/1674460941790.jpeg"
   }
   ```


## 用户管理

### 查询用户列表

1. 请求路径：`user/list`

2. 请求方式：`POST`

3. 参数： 无

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": [
           {
               "id": "10060",
               "account": "admin_Hui",
               "nickname": "新用户_1721614",
               "avatar": null
           },
           {
               "id": "10101",
               "account": "nice235@163.com",
               "nickname": "新用户_8102116",
               "avatar": null
           },
           {
               "id": "10102",
               "account": "1367054158@qq.com",
               "nickname": "赵四",
               "avatar": "avatar/1674198035977.jpeg"
           },
           {
               "id": "10103",
               "account": "3331230836@qq.com",
               "nickname": "新用户_53798",
               "avatar": null
           }
       ]
   }
   ```

### 按邮箱查询用户

1. 请求路径：`user/account`

2. 请求方式：`POST`

3. 参数

   | 参数    | 描述       | 备注 |
   | ------- | ---------- | ---- |
   | account | 用户的邮箱 |      |

   ```json
   {
       "account": "1367054158@qq.com"
   }
   ```

   返回实例

   ````json
   {
       "status": 0,
       "msg": "success",
       "data": {
           "id": "10102",
           "account": "1367054158@qq.com",
           "nickname": "赵四",
           "identity": 0
       }
   }
   ````

   

### 新增用户

1. 请求路径：`user/adduser`

2. 请求方式：`POST`

3. 参数

   | 参数     | 描述           | 备注 |
   | -------- | -------------- | ---- |
   | id       | 用户唯一标识符 |      |
   | account  | 用户账户       |      |
   | password | 用户密码       |      |
   | identity | 用户的权限等级 |      |

   ```json
   {
      ? "id":　1100,
       "account": "123@111.com",
       "password": "Asd1234567",
      ? "identity": 0
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "注册成功，新用户信息录入完毕！"
   }
   ```

### 删除用户

1. 请求路径：`user/delete`

2. 请求方式：`POST`

3. 参数

   | 参数 | 描述           | 备注 |
   | ---- | -------------- | ---- |
   | id   | 要删除用户的id |      |

   ```json
   {
       "id": 10120
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "删除用户成功"
   }
   ```

### 重置用户密码

> 重置的密码为`Asd000000`

1. 请求路径：`user/retrievepwd`

2. 请求方式：`POST`

3. 参数

   | 参数 | 描述             | 备注 |
   | ---- | ---------------- | ---- |
   | id   | 重置用户密码的id |      |

   ```json
   {
       "id": 10120
   }
   ```

   返回实例

   ```json
   {
       "status": 1,
       "msg": "重置用户密码成功"
   }
   ```

### 修改用户权限

1. 请求路径：`user/permission`

2. 请求方式：`POST`

3. 参数

   | 参数     | 描述               | 备注 |
   | -------- | ------------------ | ---- |
   | identity | 设置用户的权限等级 |      |
   | id       | 修改权限用户的id   |      |

   ```json
   {
       "identity": 1,
       "id": 10105
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "修改用户权限成功"
   }
   ```

## 借阅相关操作

### 用户发起借阅请求

1. 请求路径：`affair/borrow`

2. 请求方式：`POST`

3. 参数

   | 参数    | 描述             | 备注 |
   | ------- | ---------------- | ---- |
   | book_id | 借阅图书的唯一id |      |

   ```json
   {
       "book_id": 1
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "发起借阅请求成功"
   }
   ```

### 管理员批准借阅

1. 请求路径：`affair/agree`

2. 请求方式：`POST`

3. 参数

   | 参数      | 描述             | 备注 |
   | --------- | ---------------- | ---- |
   | affair_id | 请求借阅的唯一id |      |

   ```json
   {
       "affair_id": 2
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "批准借阅"
   }
   ```

### 管理员获取借阅请求列表

1. 请求路径：`affair/list`

2. 请求方式：`GET`

3. 参数：无

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": [
           {
               "affair_id": 1,
               "nickname": "赵四",
               "book_name": "JavaScript高级程序设计 第四版",
               "cover": ""
           },
           {
               "affair_id": 3,
               "nickname": "新用户_53798",
               "book_name": "CSS权威指南 第四版",
               "cover": null
           }
       ]
   }
   ```

### 用户还书

1. 请求路径：`affair/repay`

2. 请求方式：`POST`

3. 参数

   | 参数      | 描述             | 备注 |
   | --------- | ---------------- | ---- |
   | affair_id | 借阅请求的唯一id |      |

   ```json
   {
       "affair_id": 2
   }
   ```

   返回实例

   ```json
   {
       "status": 0,
       "msg": "还书成功"
   }
   ```

   

### 用户获取待批阅请求列表

1. 请求路径：`affair/tbapplist`

2. 请求方式：`GET`

3. 参数：无

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": [
           {
               "affair_id": 1,
               "book_name": "JavaScript高级程序设计 第四版",
               "author": "马特·弗里斯比",
               "cover": ""
           }
       ]
   }
   ```

### 用户获取已批准借阅列表

1. 请求路径：`affair/agreelist`

2. 请求方式：`GET`

3. 参数：无

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": [
           {
               "affair_id": 6,
               "book_name": "十万个为什么",
               "author": "佚名",
               "cover": null,
               "due": "2023-02-21"
           }
       ]
   }
   ```

### 用户获取已归还图书列表

1. 请求路径：`affair/repaylist`

2. 请求方式：`GET`

3. 参数：无

   返回实例

   ```json
   {
       "status": 0,
       "msg": "success",
       "data": [
           {
               "affair_id": 2,
               "book_name": "C++ Primer Plus 第6版（中文版）",
               "author": "史蒂芬·普拉达",
               "cover": null
           }
       ]
   }
   ```

