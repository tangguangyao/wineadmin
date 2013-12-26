var assert = require("assert");
var should = require('should');

var mon = require('../models/db.js');

describe('models user', function(){
	//读取用户信息
	describe('User.get', function(){
  	it('get1', function (done) {
  		setTimeout(function () {
		  	mon.showNew(0,function(docs){
		  		docs.length.should.be.equal(3);
		  		done();
		  	})
	  	},50);
    });

    it('get2', function (done) {
	  	mon.showNew(0,function(docs){
	  		docs.length.should.be.equal(2);
	  		done();
	  	})
    });

    it('get3', function (done) {
	  	mon.showNew(0,function(docs){
	  		docs.length.should.be.equal(2);
	  		done();
	  	})
    });

    it('get4', function (done) {
	  	mon.showNew(0,function(docs){
	  		docs.length.should.be.equal(2);
	  		done();
	  	})
    });
  })

})