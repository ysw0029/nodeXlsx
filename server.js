var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename:function(req, file, cb){
    cb(null, file.originalname);
  }
});
var upload = multer({storage:storage});
var app = express();
app.use('/users', express.static('uploads'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var xlsx = require('xlsx');


app.get('/', function(req, res){
    res.render('index.html');
});
app.get('/client', function(req, res){
    res.render('client.html');
});


function getCol(fileName){
  var workbook = xlsx.readFile(fileName);
  var json = xlsx.utils.sheet_to_json(workbook.Sheets[0]);


  console.log(json);
};

app.post ('/upload', upload.single('userfile'), function(req, res){
  getCol("uploads/"+req.file.originalname);

  res.send('Uploaded! : '+req.file);
  console.log(req.file.originalname);
});



var server = app.listen(3000, function(){
  console.log("connecting server using port 3000");
})
