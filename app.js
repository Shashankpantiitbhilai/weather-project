const express=require('express');
const app=express();
const https=require("https");
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));




app.get("/",function(req,res){
 res.sendFile(__dirname+"/index.html");
        });
    
    

app.post("/",function(req,res)
{const city=req.body.city;
    const appid=req.body.appid;
    console.log("city is"+city);
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units=metric";

https.get(url,function(response){
    
    response.on("data",function(data){
  
        console.log(JSON.parse(data));
        d=JSON.parse(data);
        const icon=d.weather[0].icon;
        const imgurl="https://openweathermap.org/img/wn/" +icon+ "@2x.png";
        res.write("<h1>temp in  "+city+" is"+d.main.temp+"</h1>");
        res.write("<img src="+imgurl+">");
        res.send();})
})});



app.listen(3000,function()
{
    console.log("server is running on port 3000");
});