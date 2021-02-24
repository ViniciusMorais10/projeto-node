const express = require('express');

const router = express.Router();
router.get('/',(request,response)=>{
    let nome = request.query.nome;
    let sobrenome = request.query.sobrenome;

    let resposta = {nomeCompleto:nome+' '+sobrenome};
    response.json(resposta);
    //response.send('Hello World Node! 2.0');
});

router.get('/sobre',(request,response)=>{
    response.send('Página Sobre!');
});

router.get('/posts/:id',(request,response)=>{
    let id = request.params.id;
    response.send('Id do post: '+id);
});

module.exports = router;
