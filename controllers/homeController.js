const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.userMiddleware = ((request,response,next)=>{

    let info = {
        name:'Vinicius',
        id: 123
    };
    request.userInfo = info;
    next();
})

exports.index = (async (request,response)=>{
    let responseJson = {
        pageTitle:'HOME',
        posts:[]
    };

    const posts = await Post.find();
    responseJson.posts = posts;

    response.render('home',responseJson);

});
