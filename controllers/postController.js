const mongoose = require('mongoose');
const slug = require('slug');
const Post = mongoose.model('Post');

exports.add = ((request,response) =>{
    response.render('postAdd');
});

exports.view=(async (request,response)=>{
    const post = await Post.findOne({ slug:request.params.slug });
    response.render('view',{ post });
});

exports.addAction = (async(request,response)=>{
    request.body.tags = request.body.tags.split(',').map(tag=>tag.trim());

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
    request.body.slug = slug(request.body.title,{lower:true});
    request.body.tags = request.body.tags.split(',').map(tag=>tag.trim());
    try{
       //procurar o item enviado
    const post = await Post.findOneAndUpdate(
       { slug:request.params.slug },
        request.body,
        
        {
            new:true,//Retornar novo item atualizado
            runValidators:true // Rodar as validações do Add. required, e as demais

        }
    ); 
    }catch(e){
        request.flash('error','Erro:'+ e.message);
        return response.redirect('/post/'+request.params.slug+'/edit');
    };

    request.flash('sucess', 'Post Atualizado com sucesso! ');
    response.redirect('/');

});