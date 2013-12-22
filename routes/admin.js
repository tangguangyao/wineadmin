var mon = require('../models/db.js');

// 移动文件需要使用fs模块
var fs = require('fs');
//复制文件
var util = require("util");
//国外插件
var gm = require('gm');
var imageMagick = gm.subClass({ imageMagick : true });

var admin={};

module.exports=admin;

//保存新新闻
admin.saveNews=function(req,res){
	var file=[];
	for(var i in req.files){
		file.push({
			name:req.files[i].name,
			path:req.files[i].path
		})
	}
	var path;
	for(var i=0,l=file.length;i<l;i++){
		path='./public/images/news/'+file[i].name;
		file[i].newPath=path;
		fs.rename(file[i].path, path, function(err){
			imageMagick(path)
			.resize(200, 200, '!') //加('!')强行把图片缩放成对应尺寸150*150！
			.autoOrient()
			.write(path, function(err){
			  if (err) {
			    console.log(err);
			  }
			});
		});
	}

	var obj={
		title:req.body.title,
		com:req.body.com,
		pic:file
	}
	mon.changeNew(obj,function(info){
		if(info.ok){
			res.redirect('/ok');
		}else{
			res.redirect('/error');
		}
	});
}

//新闻列表
admin.newlist=function(req,res){
	var pageNum=req.query.page;
	var num=pageNum*10;
	mon.showNew(num,function(info){
		res.render('admin/newlist', { 
      list:info
    });
	});
}

//访问编辑新闻
admin.newedit=function(req,res){
	var uid=req.params.uid;
	mon.editNew(uid,function(info){
		res.render('admin/newedit', { 
      info:info[0]._doc
    });
	})
}

//修改新闻
admin.editnew=function(req,res){
	var uid=req.query.uid;
	var file=[];
	for(var i in req.files){
		file.push({
			name:req.files[i].name,
			path:req.files[i].path
		})
	}
	var path;
	for(var i=0,l=file.length;i<l;i++){
		path='./public/images/news/'+file[i].name;
		file[i].newPath=path;
		fs.rename(file[i].path, path, function(err){
			imageMagick(path)
			.resize(200, 200, '!') //加('!')强行把图片缩放成对应尺寸150*150！
			.autoOrient()
			.write(path, function(err){
			  if (err) {
			    console.log(err);
			  }
			});
		});
	}

	if(file.length>0){
		//重新上传图片了
		var obj={
			title:req.body.title,
			com:req.body.com,
			pic:file
		}
		mon.postEditNew(uid,obj,function(info){
			if(info.ok){
				res.redirect('/ok');
			}else{
				res.redirect('/error');
			}
		});
	}else{
		//重新上传图片了
		var obj={
			title:req.body.title,
			com:req.body.com
		}
		mon.postEditNew(uid,obj,function(info){
			if(info.ok){
				res.redirect('/ok');
			}else{
				res.redirect('/error');
			}
		});
	}
}

//删除新闻
admin.newdel=function(req,res){
	var uid=req.params.uid;
	mon.newdel(uid,function(info){
		if(info.ok){
			res.redirect('/adminNew');
		}else{
			res.redirect('/error');
		}
	});
}


