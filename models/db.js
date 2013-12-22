var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/wine');

var Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;
	
//新闻模块
var New = new Schema({
    title: { type: String },
    com  : { type: String },
    pic  : {}, 
    uid  :{ type: Number }	
});

//营销模块
var Act = new Schema({
    title: { type: String },
    com  : { type: String },
    pic  : {}, 
    uid  :{ type: Number }	
});

var p = mongoose.model('new', New);
var q = mongoose.model('act', Act);

var News = mongoose.model("new");
var Acts = mongoose.model("act");

var mon={};

module.exports = mon;

//新闻数据库操作
mon.changeNew=function(obj,callback){
	var news = new News();
	//过滤空图片
	var arr=[];
	for(var i=0,l=obj.pic.length;i<l;i++){
		if(obj.pic[i].name!=""){
			arr.push(obj.pic[i]);
		}
	}
	obj.pic=arr;

	News.find({},null,{ limit:1, sort:{uid:-1}}, function (err, docs) {
		if(docs.length==0){
			var uid=0;
		}else{
			var uid=docs[0]._doc.uid;
		}
		news.title=obj.title;
		news.com=obj.com;
		news.uid=uid+1;
		news.pic=obj.pic;
		news.save(function(err){
	    if (err) {
	      callback({ok:false});  
	    }
	    callback({ok:true});
		});
	});
}
//新闻首页
mon.showNew=function(num,callback){
	News.count(function(err, count){
		News.find({},null,{ skip: num ,limit:10, sort:{uid:-1}}, function (err, docs) {
			docs.num=count;
			callback(docs);
		});
	});
}

//展示编辑修改新闻
mon.editNew=function(uid,callback){
	News.find({uid:uid},function(err,doc){
		callback(doc);
	});
}

//提交修改新闻
mon.postEditNew=function(uid,obj,callback){
	News.update({uid:uid},obj,function(err,doc){
		if (err) {
      callback({ok:false});  
    }
    callback({ok:true});
	});
}

//删除新闻
mon.newdel=function(uid,callback){
	News.remove({uid:uid},function(err,doc){
		if (err) {
      callback({ok:false});  
    }
    callback({ok:true});
	});
}

//活动操作
//添加新活动
mon.addAct=function(obj,callback){
	var act = new Acts();
	//过滤空图片
	var arr=[];
	for(var i=0,l=obj.pic.length;i<l;i++){
		if(obj.pic[i].name!=""){
			arr.push(obj.pic[i]);
		}
	}
	obj.pic=arr[0];

	Acts.find({},null,{ limit:1, sort:{uid:-1}}, function (err, docs) {
		if(docs.length==0){
			var uid=0;
		}else{
			var uid=docs[0]._doc.uid;
		}
		act.title=obj.title;
		act.com=obj.com;
		act.uid=uid+1;
		act.pic=obj.pic;
		act.save(function(err){
	    if (err) {
	      callback({ok:false});  
	    }
	    callback({ok:true});
		});
	});
}
//活动首页
mon.showAct=function(callback){
	Acts.find({},null,{ sort:{uid:-1}}, function (err, docs) {
		callback(docs);
	});
}
//查看修改
mon.lookEditAct=function(uid,callback){
	Acts.find({uid:uid},function(err,doc){
		callback(doc);
	});
}
//提交修改新闻
mon.postEditAct=function(uid,obj,callback){
	Acts.update({uid:uid},obj,function(err,doc){
		if (err) {
      callback({ok:false});  
    }
    callback({ok:true});
	});
}
//删除活动
mon.actdel=function(uid,callback){
	Acts.remove({uid:uid},function(err,doc){
		if (err) {
      callback({ok:false});  
    }
    callback({ok:true});
	});
}