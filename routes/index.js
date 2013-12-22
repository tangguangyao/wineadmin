var admin = require('./admin');
var act = require('./act');

module.exports = function(app){
	

	app.get('/ok',function(req,res){
		res.render('ok');
	});

	app.get('/error',function(req,res){
		res.render('error');
	});

	//新闻相关的get和post
	//添加新闻
	app.get('/adminNewShow',function(req,res){
		res.render('admin/newshow');
	});

	//添加新闻post
	app.post('/changeNew',function(req,res){
		admin.saveNews(req,res);	
	});

	//新闻列表
	app.get('/adminNew',function(req,res){
		admin.newlist(req,res);
	});
	//新闻编辑页面
	app.get('/newedit/:uid',function(req,res){
		admin.newedit(req,res);
	});
	//修改新闻
	app.post('/newedit',function(req,res){
		admin.editnew(req,res);
	});

	//删除新闻
	app.get('/newdel/:uid',function(req,res){
		admin.newdel(req,res);
	});

	//营销活动相关
	app.get('/act',function(req,res){
		act.showAct(req,res);
	});
	//添加活动页面
	app.get('/addact',function(req,res){
		res.render('act/add')
	});
	//post 添加新活动
	app.post('/addact',function(req,res){
		act.saveAct(req,res);	
	});
	//访问修改活动
	app.get('/actedit/:uid',function(req,res){
		act.lookEditAct(req,res);
	});
	//post修改活动
	app.post('/actedit',function(req,res){
		act.editAct(req,res);
	});
	//删除活动
	app.get('/actdel/:uid',function(req,res){
		act.actdel(req,res);
	});
}