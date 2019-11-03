var express = require('express');
var mongojs = require('mongojs');
var bodyparser=require('body-parser');
var err_fs = require('fs');
var db = mongojs('mongodb://localhost:27017/mylib', ['StudentData']);
var app = express();
app.use(bodyparser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});
app.use(express.static(__dirname+'/public'));
app.listen(5010);
console.log("Port Run on 5010");


app.get('/GetAllFeedbackFromSTD',function(req,res){
	try{

		db.StudentData.find({AYN:'Y'},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){
				res.send(docs);
			}
		})
	}
	catch(ee){
		ErrorLog("==> Error in GetAllFeedbackFromSTD \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
});

app.get('/GetAllFeedbackPie',function(req,res){
  try{

    db.StudentData.find({AYN:'Y'}).sort({_id:-1}).limit(1,function(err,docs){
      if(err){
        res.send(err)
      }
      if(docs){
        res.send(docs);
      }
    })
  }
  catch(ee){
    ErrorLog("==> Error in GetAllFeedbackPie \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
  }
});



function ErrorLog(ErrMsg){
	var d = new Date(),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	var currDate = day+""+month+""+year;

	var fileName = "Service_Error_Log_"+currDate+".txt";
	var folderName = "C://ErrorLog/"+fileName;
	err_fs.appendFile(folderName, ErrMsg , function (err) {
		if(err){
			console.log("Creating file faild.....");
		}
	});
}

app.options('/*',function(req,res){
	res.status(204).end();
})

