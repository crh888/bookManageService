/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : bm

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 08/02/2023 17:27:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `account` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `identity` tinyint(1) NULL DEFAULT 0 COMMENT '0 是普通用户，1 是图书管理员，2 是超级管理员',
  `is_delete` tinyint(1) NULL DEFAULT 0 COMMENT '0 是未删除，1是已删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `zhwy`(`account`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('10000', 'root@123.com', '$2a$10$UDmiySSpGyE7S/1caD5c5es.WqDrN90IYzkB.vuG8DFyqfYeXiH9O', 2, 0);
INSERT INTO `account` VALUES ('10060', 'admin@123.com', '$2a$10$UDmiySSpGyE7S/1caD5c5es.WqDrN90IYzkB.vuG8DFyqfYeXiH9O', 1, 0);
INSERT INTO `account` VALUES ('10104', '123@123.com', '$2a$10$UDmiySSpGyE7S/1caD5c5es.WqDrN90IYzkB.vuG8DFyqfYeXiH9O', 0, 0);

-- ----------------------------
-- Table structure for affair
-- ----------------------------
DROP TABLE IF EXISTS `affair`;
CREATE TABLE `affair`  (
  `affair_id` int(3) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `book_id` int(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 是待批准，1 是已批准，2 是已还书',
  `due` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`affair_id`) USING BTREE,
  INDEX `foreignkey_accoid`(`account_id`) USING BTREE,
  INDEX `foreignkey_bookid`(`book_id`) USING BTREE,
  CONSTRAINT `foreignkey_accoid` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `foreignkey_bookid` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of affair
-- ----------------------------

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `book_id` int(3) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cover` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `author` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cate_id` int(3) NOT NULL,
  `is_delete` tinyint(1) NULL DEFAULT 0 COMMENT '0 是未删除 1是已删除',
  PRIMARY KEY (`book_id`) USING BTREE,
  INDEX `foreignkey`(`cate_id`) USING BTREE,
  CONSTRAINT `foreignkey` FOREIGN KEY (`cate_id`) REFERENCES `category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (1, 'JavaScript高级程序设计 第四版', '', '马特·弗里斯比', 2, 0);
INSERT INTO `book` VALUES (2, 'CSS权威指南 第四版', NULL, '安道', 2, 0);
INSERT INTO `book` VALUES (3, 'C++ Primer Plus 第6版（中文版）', NULL, '史蒂芬·普拉达', 2, 0);
INSERT INTO `book` VALUES (4, '钢铁是怎样练成的', NULL, '奥斯托洛夫斯基', 3, 0);
INSERT INTO `book` VALUES (5, '十万个为什么', NULL, '佚名', 3, 0);
INSERT INTO `book` VALUES (6, '狂人日记', NULL, '鲁迅', 3, 0);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int(3) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_delete` tinyint(1) NULL DEFAULT 0 COMMENT '0 是未删除 1 是已删除',
  PRIMARY KEY (`category_id`) USING BTREE,
  INDEX `unq_catename`(`category_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '科幻', 0);
INSERT INTO `category` VALUES (2, 'IT', 0);
INSERT INTO `category` VALUES (3, '文学', 0);
INSERT INTO `category` VALUES (4, '地理', 0);
INSERT INTO `category` VALUES (5, '天文', 1);

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `info_id` int(3) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `gender` tinyint(1) NULL DEFAULT 1 COMMENT '0 是女 1 是男',
  `birthday` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1999-1-1',
  `avatar` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `account_id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_delete` tinyint(1) NULL DEFAULT 0 COMMENT '0是可用 1是删除不可用 默认是0',
  PRIMARY KEY (`info_id`) USING BTREE,
  INDEX `foreignkey_id`(`account_id`) USING BTREE,
  CONSTRAINT `foreignkey_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (2, '新用户_453521', 1, '1999-1-1', NULL, '10000', 0);
INSERT INTO `userinfo` VALUES (3, '新用户_1721614', 1, '1999-1-1', NULL, '10060', 0);
INSERT INTO `userinfo` VALUES (7, '新用户_5811165', 1, '1999-1-1', NULL, '10104', 0);

SET FOREIGN_KEY_CHECKS = 1;
