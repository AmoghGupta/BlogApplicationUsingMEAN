var express = require('express');
var app= express();
var bodyParser =  require('body-parser');
var mongoose  = require('mongoose');
mongoose.connect("mongodb://localhost:27017/BlogApp");

var PostSchema = mongoose.Schema({
  title: {type: String, required: true},
  body: String,
  tag: {type: String, enum: ['Politics','Economy','Education']},
  posted: {type:Date, default: Date.now}
}, {collection: 'post'});

var PostModel = mongoose.model("PostModel", PostSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// add new post
app.post("/api/blogpost", function(req, res){
  var post = req.body;
  PostModel.create(post).then(function(postObj){
    res.json(200);
  },function(err){
res.sendStatus(400);
  });

});

// get all posts
app.get("/api/blogpost",function(req,res){
  PostModel.find().then(function(getObjs){
res.json(getObjs);
  },function(err){
res.sendStatus(400);
  });
});

//edit post code
app.get("/api/blogpost/:id",function(req,res){
  var postID = req.params.id;
  PostModel.findById({_id: postID}).then(function(getObj){
res.json(getObj);
  },function(err){
res.sendStatus(400);
  });
});

//update exisiting post
app.put("/api/blogpost/:id",function(req,res){
  var postID = req.params.id;
  var post = req.body;
  PostModel.update({_id: postID},{
    title: post.title ,
    body: post.body
  }).then(function(status){
res.sendStatus(200);
  },function(err){
res.sendStatus(400);
  });
});

app.delete("/api/blogpost/:id",function(req,res){
  var postID = req.params.id;
  PostModel.remove({_id: postID}).then(function(status){
    res.sendStatus(200);
  },function(){
    res.sendStatus(400);
  });
})

app.listen(3000);
