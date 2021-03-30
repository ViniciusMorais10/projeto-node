const express = require('express');
const mustache = require ('mustache-express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const router = require('./routers/index');
const helpers = require('./helpers');
const errorHandler = require('./handlers/errorHandler');


//Configurações 
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public'));

app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret:process.env.SECRET,
    resave:false, // opção utilizada para informar que se nada foi alterado nao destruir ou alterar a sessao
    saveUninitialized:false //Iniciar sessao e nao salvar nada, nao salvar !
}));

app.use(flash());

app.use((req,res, next)=>{
    res.locals.help = helpers;
    res.locals.flashes = req.flash();
    next();
});

//Importar CSS antes das rotas


app.use('/',router);

app.use(errorHandler.notfound);


app.engine('mst', mustache(__dirname+'/views/partials','.mst'));
app.set('view engine','mst');
app.set('views',__dirname + '/views');


module.exports = app;


