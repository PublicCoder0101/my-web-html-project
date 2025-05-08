const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');
const User=require('./userModul');


const app=express();
mongoose.connect('mongodb://localhost:27017/studentDB');


app.use(bodyParser.urlencoded({
    extended:false
}));


// get from FileSystemEntry.html
app.get('/',(req,res)=>
    res.sendFile(path.join(__dirname,'entry.html')));



app.post('/submit',async(req,res)=>{
    await User.create(req.body);
res.redirect('/data')
});

// show data
app.get('/data',async(req,res)=>{
    const user=await User.find();
    let list="<h2>User : </h2><ol>";
    user.forEach(u=>list+=`<li>${u.name} - - ${u.email}`);
    list+="</ol><a href='/'>Back</a>";
    res.send(list);
});

app.listen(3000,()=>console.log("http:/localhost:3000"));



// html css ->github->godady->50 5gb gtihub -domen🛒🛒🛒