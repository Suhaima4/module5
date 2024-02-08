const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const saltround = 10;

const users = [
    {username:"suhaima",password: "$2b$10$vrDLDutowq3QUhzUhJ58Be3B/7C9eyFBSlPvpB.0lFR1ZR.NvrzPO" }
]



app.use(express.urlencoded({extended:true}));

app.get('/register',(req,res)=>{
    res.status(200).sendFile(__dirname + "/register.html")
})

 app.post('/register',(req,res)=>{

    const {username,password} = req.body;

    bcrypt.hash(password,saltround,(err,hash)=>{

       if(err){
            res.send(err.message)
        }
        else{
            console.log(hash);
          res.status(303).redirect("/");
        }
    });
                            //console.log(password,username);
                           //res.send("register");
});
 
app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/login.html");
});

app.post("/",(req,res)=>{

    const{username,password}  = req.body;

     const user = users.find((user)=>user.username === username );
     if(!user){
        res.send("invalid credentials");
     }
     else{
        bcrypt.compare(password,user.password,(err,isPassword)=>{
           console.log(isPassword);
            if(err){
                res.send("invalid credentials");
            }
            else if (!password){
                res.redirect("invalid credentials ");
                
            }
            else{
                res.redirect('https://suhaima4.github.io/module3/');
            }
        });
     }

});


app.get('https://suhaima4.github.io/module3/',(req,es)=>{
    res.sendFile(__dirname + "https://suhaima4.github.io/module3/ ");
});

app.listen(4000,()=>{
    console.log('serrver is running on port 4000')
})