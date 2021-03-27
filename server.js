const app = require('./app');

const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});

//Conexão ao banco de dados
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error',(error)=>{
    console.error("ERRO +"+error.message);
});

app.set('port', process.env.PORT || 3333);

const server = app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado na porta:'+server.address().port);
});

