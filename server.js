const express =require('express');
const hbs=require('hbs');
const fs =require('fs');

const port =process.env.PORT || 3000;
var app =express();
hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper("getcurrentyear",()=>
{
  return new Date().getFullYear();
});
hbs.registerHelper("screamit",(text)=>
{
  return text.toUpperCase();
});
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>
{var now =new Date().toString();
  var log=`${now}, ${req.method},${req.url}`;
  fs.appendFile('server.log',log +'\n',(err)=>
{if(err)
  {
  console.log("unable to append");
}
});
  //console.log(log);
next();
});

app.get('/',(req,res)=>
{//res.send("<h1>hello</h1>");
res.render('home.hbs',{
  pageTitle:"aboutpage",

welcomemsg : "hello welcome to my page"
});

});
app.get('/about',(req,res)=>
{
  res.render("about.hbs",{
    pageTitle:"aboutpage",

  });
});
app.get('/bad',(req,res)=>
{
  res.send({
    error : "badmessage"
  });
});
app.get('/projects',(req,res)=>
{//console.log("hello this is a project page");
  res.render("projects.hbs",{pagetitle : "this is a project page"});
});
app.listen(port,()=>
{
  console.log("server is up on port 3000");
  console.log(port);
});
