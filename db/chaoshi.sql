SET NAMES UTF8;
DROP DATABASE IF EXISTS cs;
CREATE DATABASE cs CHARSET=UTF8;
USE cs;

#用户�?
CREATE TABLE users(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32),
	upwd VARCHAR(32),
	email VARCHAR(64),
	phone VARCHAR(16),
	gender INT                  #性别  0-�? 1-�?
);

#商品类型�?
CREATE TABLE pro_laptop(
	lid INT PRIMARY KEY AUTO_INCREMENT,
	lname VARCHAR(64)
);

#商品�?
CREATE TABLE product(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	lid INT,					#商品类型
	pname VARCHAR(32),			#商品名称
	title VARCHAR(128),         #标�
	sub_title varchar(128), 	#������
	price DECIMAL(10,2),        #价格
	shelf_time BIGINT,          #上架时间
	sold_count INT,             #已售出的数量
	is_onsale BOOLEAN,          #是否促销�?
	color VARCHAR(64),           #颜色
  size varchar(64),            #尺寸
  expire BOOLEAN,               #是否已经失效
	FOREIGN KEY(lid) REFERENCES pro_laptop(lid)
);

#轮播图表
CREATE TABLE index_carousel(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	img VARCHAR(128),
  title VARCHAR(128)
);

#购物�?
CREATE TABLE shoppingcart_item(
	iid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT,			#用户编号
	pid INT,			#商品编号
	count INT,			#购买数量
	is_checked BOOLEAN,	#是否已勾选，确定购买
	FOREIGN KEY(pid) REFERENCES product(pid),
	FOREIGN KEY(uid) REFERENCES users(uid)
);

#收货地址�?
CREATE TABLE receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,                #用户编号
  receiver VARCHAR(16),       #接收人姓�?
  province VARCHAR(16),       #�?
  city VARCHAR(16),           #�?
  county VARCHAR(16),         #�?
  address VARCHAR(128),       #详细地址
  cellphone VARCHAR(16),      #手机
  fixedphone VARCHAR(16),     #固定电话
  postcode CHAR(6),           #邮编
  tag VARCHAR(16),            #标签�?
  is_default BOOLEAN,         #是否为当前用户的默认收货地址
  FOREIGN KEY(uid) REFERENCES users(uid)
);

#用户订单�?
CREATE TABLE orders(
  oid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  aid INT,
  status INT,             #订单状�? 1-等待付款  2-等待发货  3-运输�? 4-已签�? 5-已取�?
  order_time BIGINT,      #下单时间
  pay_time BIGINT,        #付款时间
  deliver_time BIGINT,    #发货时间
  received_time BIGINT,    #签收时间
  FOREIGN KEY(uid) REFERENCES users(uid),
  FOREIGN KEY(aid) REFERENCES receiver_address(aid)
);

#用户订单
CREATE TABLE order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  oid INT,              #订单编号
  pid INT,              #产品编号
  count INT,            #购买数量
  FOREIGN KEY(oid) REFERENCES orders(oid),
  FOREIGN KEY(pid) REFERENCES product(pid)
);

#首页商品�?
CREATE TABLE index_product(
  pid INT,
  lid INT,
  title VARCHAR(64),
  pic VARCHAR(128),
  price DECIMAL(10,2),
  href VARCHAR(128),
  seq_recommended TINYINT,
  seq_new_arrival TINYINT,
  seq_top_sale TINYINT,
  expire Boolean
);
CREATE TABLE product_pic(
  pic INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,              #��Ʒ���
  sm VARCHAR(128),            #СͼƬ·��
  md VARCHAR(128),            #��ͼƬ·��
  lg VARCHAR(128)             #��ͼƬ·��
);
CREATE TABLE admins(
	a_aid INT PRIMARY KEY AUTO_INCREMENT,
	aname varchar(16),
	auwpd varchar(12),
  gender Boolean,
  names  varchar(16),
  phone  varchar(16),
	grade  varchar(32),
  expire  Boolean
);

INSERT users VALUES
(null,'dingding',123456,'123@qq.com',15830466929,1),
(null,'lingling',123456,'234@qq.com',13410853280,1),
(null,'doudou',123456,'sun@qq.com',18301846570,0),
(null,'yaya',123456,'456@qq.com',18710242046,0);

INSERT admins VALUES
(null,'linqiang',234567,1,'林强','普通管理员',15830466925,0),
(null,'lilei',234567,0,'李蕾','普通管理员',15830476929,0),
(null,'hanmei',107825,0,'韩梅','超级管理员',15854466929,0);

INSERT pro_laptop VALUES
(null,'女装'),
(null,'男装'),
(null,'户外'),
(null,'美妆'),
(null,'母婴');

INSERT index_carousel VALUES
(null,'img/lunbo1.jpg',"轮播图"),
(null,'img/lunbo2.jpg',"轮播图"),
(null,'img/lunbo3.jpg',"轮播图");

INSERT index_product VALUES
(1,1,'茉莉雅集人手常备冰肌弹力 真丝打底衬裙MLDLQ056','img/beixin.jpg',146,'product-detail.html?pid=1',1,1,1,0),
(2,1,'Artka阿卡夏季新优雅复古仙气吊带显瘦气质雪纺连衣裙LA10388Q预','img/qun1.jpg',429,'product-detail.html?pid=2',1,1,1,0),
(3,1,'ARMANI JEANS阿玛尼新款2018夏牛仔裤aj时尚休闲贴布修身长裤','img/ku1.jpg',539,'product-detail.html?pid=3',1,1,1,0),
(4,1,'韩都衣舍2018韩版女装夏新款宽松小心机上衣chic短袖T恤JW11153筱','img/duan1.jpg',69,'product-detail.html?pid=4',1,1,1,0),
(1,1,'茉莉雅集人手常备冰肌弹力 真丝打底衬裙MLDLQ056','img/beixin.jpg',146,'product-detail.html?pid=1',1,1,1,0),
(2,1,'Artka阿卡夏季新优雅复古仙气吊带显瘦气质雪纺连衣裙LA10388Q预','img/qun1.jpg',429,'product-detail.html?pid=2',1,1,1,0),
(3,1,'ARMANI JEANS阿玛尼新款2018夏牛仔裤aj时尚休闲贴布修身长裤','img/ku1.jpg',539,'product-detail.html?pid=3',1,1,1,0),
(4,1,'韩都衣舍2018韩版女装夏新款宽松小心机上衣chic短袖T恤JW11153筱','img/duan1.jpg',69,'product-detail.html?pid=4',1,1,1,0),
(20,3,'英国品牌RABNEUTRINOENDJKT户外800篷白鹅绒男款连帽羽绒服QDN50','img/mian1.jpg',1499,'product-detail.html?pid=20',1,1,1,0),
(21,3,'icebreaker拓冰者春夏羊毛男士短袖速干POLO衫运动休闲衫150gm','img/duan2.jpg',519,'product-detail.html?pid=21',1,1,1,0),
(22,3,'凯乐石户外男款格型快干短袖KG610118速干衬衣透气格子衬衫','img/duan3.jpg',519,'product-detail.html?pid=22',1,1,1,0),
(23,3,'NIAN JEEP户外速干裤男夏季薄款冲锋裤透气大码快干长裤登山裤男','img/ku2.jpg',86,'product-detail.html?pid=23',1,1,1,0),
(20,3,'英国品牌RABNEUTRINOENDJKT户外800篷白鹅绒男款连帽羽绒服QDN50','img/mian1.jpg',1499,'product-detail.html?pid=20',1,1,1,0),
(21,3,'icebreaker拓冰者春夏羊毛男士短袖速干POLO衫运动休闲衫150gm','img/duan2.jpg',519,'product-detail.html?pid=21',1,1,1,0),
(22,3,'凯乐石户外男款格型快干短袖KG610118速干衬衣透气格子衬衫','img/duan3.jpg',519,'product-detail.html?pid=22',1,1,1,0),
(23,3,'NIAN JEEP户外速干裤男夏季薄款冲锋裤透气大码快干长裤登山裤男','img/ku2.jpg',86,'product-detail.html?pid=23',1,1,1,0),
(40,4,'Thayers津尔氏金缕梅玫瑰爽肤水女 补水保湿 喷雾二次清洁水','img/meiguishui.jpg',39,'product-detail.html?pid=40',1,1,1,0),
(41,4,'韩国theSAEM得鲜茶树油脸部温和清洁无刺激眼唇部卸妆水液乳学生','img/shui1.jpg',29,'product-detail.html?pid=41',1,1,1,0),
(42,4,'膜法世家绿豆清肌护肤套装清洁控油保湿护肤化妆品','img/shui2.jpg',90,'product-detail.html?pid=42',1,1,1,0),
(43,4,'凡士林美白身体乳保湿滋润香体持久全身补水润肤乳400ml女烟酰胺','img/ru1.jpg',55,'product-detail.html?pid=43',1,1,1,0),
(40,4,'Thayers津尔氏金缕梅玫瑰爽肤水女 补水保湿 喷雾二次清洁水','img/meiguishui.jpg',39,'product-detail.html?pid=40',1,1,1,0),
(41,4,'韩国theSAEM得鲜茶树油脸部温和清洁无刺激眼唇部卸妆水液乳学生','img/shui1.jpg',29,'product-detail.html?pid=41',1,1,1,0),
(42,4,'膜法世家绿豆清肌护肤套装清洁控油保湿护肤化妆品','img/shui2.jpg',90,'product-detail.html?pid=42',1,1,1,0),
(43,4,'凡士林美白身体乳保湿滋润香体持久全身补水润肤乳400ml女烟酰胺','img/ru1.jpg',55,'product-detail.html?pid=43',1,1,1,0);


INSERT product VALUES
(1,1,'衬裙','茉莉雅集人手常备冰肌弹力 真丝打底衬裙MLDLQ056','冰肌弹力真丝打底衬裙',146,150123456789,4560,false,'白色','L',0),
(2,1,'连衣裙','Artka阿卡夏季新优雅复古仙气吊带显瘦气质雪纺连衣裙LA10388Q预','优雅复古仙气吊带显瘦气质',429,150123458789,2360,false,'白色','M',0),
(3,1,'裤子','ARMANI JEANS阿玛尼新款2018夏牛仔裤aj时尚休闲贴布修身长裤','时尚潮流 韩式休闲',539,150123458789,2220,false,'黑色','W31',0),
(4,1,'短袖','韩都衣舍2018韩版女装夏新款宽松小心机上衣chic短袖T恤JW11153筱','字母印花 个性破洞 宽松百搭',69,150123458789,2220,false,'黑色','M',0),
(5,1,'衬裙','茉莉雅集人手常备冰肌弹力 真丝打底衬裙MLDLQ056','冰肌弹力真丝打底衬裙',146,150123456789,4560,false,'粉色','M',0),
(6,1,'衬裙','茉莉雅集人手常备冰肌弹力 真丝打底衬裙MLDLQ056','冰肌弹力真丝打底衬裙',146,150123456789,4560,false,'白色','S',0),
(7,1,'衬裙','茉莉雅集人手常备冰肌弹力 真丝打底衬裙MLDLQ056','冰肌弹力真丝打底衬裙',146,150123456789,4560,false,'粉色','S',0),
(8,1,'连衣裙','Artka阿卡夏季新优雅复古仙气吊带显瘦气质雪纺连衣裙LA10388Q预','优雅复古仙气吊带显瘦气质',429,150123458789,2360,false,'白色','M',0),
(9,1,'连衣裙','Artka阿卡夏季新优雅复古仙气吊带显瘦气质雪纺连衣裙LA10388Q预','优雅复古仙气吊带显瘦气质',429,150123458789,2300,false,'蓝色','M',0),
(10,1,'裤子','ARMANI JEANS阿玛尼新款2018夏牛仔裤aj时尚休闲贴布修身长裤','时尚潮流 韩式休闲',539,150123458789,2220,false,'黑色','W30',0),
(11,1,'短袖','韩都衣舍2018韩版女装夏新款宽松小心机上衣chic短袖T恤JW11153筱','字母印花 个性破洞 宽松百搭',69,150123458789,2220,false,'黄色','M',0),
(12,1,'短袖','韩都衣舍2018韩版女装夏新款宽松小心机上衣chic短袖T恤JW11153筱','字母印花 个性破洞 宽松百搭',69,150123458789,2220,false,'白色','L',0),
(13,1,'短袖','韩都衣舍2018韩版女装夏新款宽松小心机上衣chic短袖T恤JW11153筱','字母印花 个性破洞 宽松百搭',69,150123458789,2220,false,'粉色','M',0)
;

INSERT product_pic VALUES
(null,4,'img/product/sm/duan1.jpg','img/product/md/duan1.jpg','img/product/lg/duan1.jpg'),
(null,4,'img/product/sm/duan2.jpg','img/product/md/duan1.jpg','img/product/lg/duan2.jpg'),
(null,4,'img/product/sm/duan3.jpg','img/product/md/duan1.jpg','img/product/lg/duan3.jpg'),
(null,11,'img/product/sm/duan1.jpg','img/product/md/duan1.jpg','img/product/lg/duan1.jpg'),
(null,12,'img/product/sm/duan2.jpg','img/product/md/duan1.jpg','img/product/lg/duan2.jpg'),
(null,13,'img/product/sm/duan3.jpg','img/product/md/duan1.jpg','img/product/lg/duan3.jpg')
;

  INSERT shoppingcart_item VALUES
  (null,1,4,2,0);