(function (){
  var app = angular.module('BlogApp', []);
app.controller('BlogController', ['$scope','$http', function($scope,$http){
  $scope.updateBtn = true;
function init(){
  getAllPosts();
}
init();

function getAllPosts(){
  $http.get("/api/blogpost/").success(function(posts){
    $scope.posts  = posts;
  });
}

$scope.updatePost = function(post){
$http.put("/api/blogpost/"+ post._id,post).success(function(){
  getAllPosts();
$scope.updateBtn = true;
alert("Updated Blog");
$scope.post={};
});
}

$scope.createPost =  function(post){
  $http.post("/api/blogpost/", post).success(function(){
  getAllPosts();
  alert("Posted Blog");
  });
  $scope.post={};
}

$scope.deletePost =  function(postid){
  $http.delete("/api/blogpost/"+postid).success(function(){
  getAllPosts();
  alert("Deleted Blog");
  });
}

$scope.editPost = function(postid){
  $scope.updateBtn = false;
  alert("You are about to Edit the Blog"); 
  $http.get("/api/blogpost/"+postid).success(function(post){
    $scope.post = post;
  });
}


}]);
}) ();
