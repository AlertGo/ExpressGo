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
getData('/viplist','vip')
getData('/vip0','vip0')


//登陆
router.post("/login",function(req,res){
	res.header("Access-Control-Allow-Origin","*")
	var user=req.body["user"]
	var pass=req.body["pass"]
	console.log(user)
	pool.query(`SELECT * from vipuse where users='${user}' AND pass='${pass}'`,function(err,rows,fields){
		console.log(rows.length)
		if(rows.length<1){
            res.send({"loginerrMessage":"账号或者密码错误！","message":"0"});
        }else{
        	res.send({"loginerrMessage":"成功","data":rows[0],"message":"1"})
        }
	})
})


//替换
router.post("/replace",function(req,res){
	res.header("Access-Control-Allow-Origin","*")
	var id=req.body["id"]
	var users=req.body["users"]
	var pass=req.body["pass"]
	var name=req.body["name"]
	var email=req.body["email"]
	var tel=req.body["tel"]



	console.log(id)
	pool.query(`UPDATE vipuse SET users='${users}',pass='${pass}',name='${name}',email='${email}',tel='${tel}' where id='${id}'`,function(err,rows,f){
		if(err){
			console.log(err)
		}else{
			res.send(rows)
		}
	})
})
//数据表添加数据
router.post("/addliebiao",function(req,res){
	res.header("Access-Control-Allow-Origin","*")
	var users=req.body["users"]
	var pass=req.body["pass"]
	var name=req.body["name"]
	var email=req.body["email"]
	var tel=req.body["tel"]
	pool.query(`insert into vipuse(users,pass,name,email,tel) values(${users},'${pass}','${name}','${email}','${tel}')`,function(err,rows,fields){
		res.send("1")
	})
})



module.exports=router;