const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.set('view engine','ejs');
const dirname=path.join(__dirname,'notes');
if(!fs.existsSync(dirname)){
    fs.mkdirSync(dirname);
}
app.get('/',function(req,res){
    const files = fs.readdirSync(dirname);
    res.render("index",{notes:files});
})
app.get('/note/:filename',function(req,res){
    var add=req.params.filename;
    var addd=path.join(dirname,add);
   
     if (fs.existsSync(addd)) {
        const data = fs.readFileSync(addd, "utf-8");
        res.render("note", { title: add.replace(".txt",""), data });
    } else {
        res.status(404).send("Note not found");
    }
});
app.post('/add',function(req,res){
    var title= req.body.title;
    var data=req.body.data;
    console.log(data);
    const file=path.join(dirname,title +".txt");
    fs.writeFile(file,data,function(err){
         if(err) return res.status(500).send("Error");
         console.log("File saved");
         res.redirect('/');
    });
});
app.listen(3000);
