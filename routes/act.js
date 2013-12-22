var mon = require('../models/db.js');
// 移动文件需要使用fs模块
var fs = require('fs');
//复制文件
var util = require("util");
//国外插件
var gm = require('gm');
var imageMagick = gm.subClass({ imageMagick : true });

var act={};

module.exports=act;

act.saveAct=function(req,res){
	var file=[];
	for(var i in req.files){
		file.push({
			name:req.files[i].name,
			path:req.files[i].path
		})
	}
	var path;
	for(var i=0,l=file.length;i<l;i++){
		path='./public/images/act/'+file[i].name;
		file[i].newPath=path;
		fs.rename(file[i].path, path, function(err){
			imageMagick(path)
			.resize(50, 50, '!') //加('!')强行把图片缩放成对应尺寸150*150！
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
	mon.addAct(obj,function(info){
		if(info.ok){
			res.redirect('/ok');
		}else{
			res.redirect('/error');
		}
	});
}

act.showAct=function(req,res){
	mon.showAct(function(info){
		res.render('act/show', { 
      list:info
    });
	})
}

act.lookEditAct=function(req,res){
	var uid=req.params.uid;
	mon.lookEditAct(uid,function(info){
		res.render('act/edit', { 
      info:info[0]._doc
    });
	})
}

act.editAct=function(req,res){
	var uid=req.query.uid;
	var file=[];
	if(req.files.size>0){
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
				.resize(50, 50, '!') //加('!')强行把图片缩放成对应尺寸150*150！
				.autoOrient()
				.write(path, function(err){
				  if (err) {
				    console.log(err);
				  }
				});
			});
		}
		//重新上传图片了
		var obj={
			title:req.body.title,
			com:req.body.com,
			pic:file[0]
		}
		mon.postEditAct(uid,obj,function(info){
			if(info.ok){
				res.redirect('/ok');
			}else{
				res.redirect('/error');
			}
		});
	}else{
		var obj={
			title:req.body.title,
			com:req.body.com
		}
		mon.postEditAct(uid,obj,function(info){
			if(info.ok){
				res.redirect('/ok');
			}else{
				res.redirect('/error');
			}
		});
	}
}

act.actdel=function(req,res){
	var uid=req.params.uid;
	mon.actdel(uid,function(info){
		if(info.ok){
			res.redirect('/act');
		}else{
			res.redirect('/error');
		}
	});
}