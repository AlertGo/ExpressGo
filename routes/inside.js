var express=require('express');
var mysql=require('mysql');
var router=express.Router();
var fs=require('fs');
var formidable=require('formidable');


var pool=mysql.createPool({
	host:'localhost',//localhost
	user:'root',   //用户名
	password:'root',    //密码
	database:'obs', //数据库
	port:8889
});
//获取数据
const getData = (url,table) => {
	router.get(url,function(req,res){
		res.header("Access-Control-Allow-Origin", "*")
		pool.query(`SELECT * from ${table}`, function(err, rows, fields) {
	  	if (err) throw err;
	 	res.send(rows)
		});
	});
}


//获取home页
getData('/text','home')
getData('/navlists','navlist')

//inside页
getData('/navlists','navlist')
//inside 二级页
getData('/inside0','inside0')
getData('/inside1','inside1')
getData('/inside2','inside2')
getData('/inside3','inside3')
getData('/inside5','inside5')
getData('/inside6','inside6')
getData('/inside7','inside7')
getData('/inside8','inside8')
getData('/callwo','callwo')

//inside 三级页
getData('/inside2s0','inside2s0')
getData('/inside2s1','inside2s1')
getData('/inside2s2','inside2s2')
getData('/inside2s3','inside2s3')
getData('/inside2s4','inside2s4')
getData('/inside2s5','inside2s5')

getData('/inside5s0','inside5s0')
getData('/inside5s1','inside5s1')
getData('/inside5s2','inside5s2')



router.post('/inside5s2s',function(req,res){
	res.header("Access-Control-Allow-Origin", "*")
	var id=req.body['id']
	pool.query(`SELECT * from inside5s2s where id='${id}'`, function(err, rows, fields) {
  	if (err) throw err;
 	res.send(rows)
	});
});

getData('/inside6s','inside6s')
getData('/inside8s0','inside8s0')
getData('/inside8s1','inside8s1')
getData('/inside8s2','inside8s2')
getData('/inside8s3','inside8s3')

//新闻页
getData('/news','news')
getData('/newsimg','newsimg')
//详情页跳转
router.post('/newsdetail',function(req,res){
	res.header("Access-Control-Allow-Origin", "*")
	var id=req.body['id']
	pool.query(`SELECT * from newsdetail where id='${id}'`, function(err, rows, fields) {
  	if (err) throw err;
 	res.send(rows)
	});
});

















module.exports=router;
