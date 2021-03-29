const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = ((request,response) =>{
    response.render('postAdd');
});

exports.addAction = (async(request,response)=>{
    const post = new Post(request.body);
    
    try{
    await post.save();
    } catch(error){
        request.flash('error','Erro:'+ error.message);
        return response.redirect('/post/add');
    }
    request.flash('sucess','Post salvo com sucesso!');
    response.redirect('/');
});

exports.edit = (async (request,response)=>{
    const post = await Post.findOne({ slug:request.params.slug });
    response.render('postEdit',{ post });
});

exports.editAction = (async(request,response)=>{
   //procurar o item enviado
   const post = await Post.findOneAndUpdate(
       { slug:request.params.slug },
        request.body,
        {
            new:true,//Retornar novo item atualizado
            runValidators:true // Rodar as validações do Add. required, e as demais

        }
    ); 
    request.flash('sucess', 'Post Atualizado com sucesso! ');
    response.redirect('/');

});