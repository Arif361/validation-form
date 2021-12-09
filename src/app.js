const express=require("express")
const app =express()
const path = require("path")
const hbs = require("hbs")
const port=process.env.PORT||3000
const db =require("../conn")


const static_path=path.join(__dirname, "..", "public");
const template_path=path.join(__dirname,  "templates", "views");
const partials_path=path.join(__dirname,  "templates", "partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path))

app.set('view engine', 'hbs');
app.set("views",template_path)
hbs.registerPartials(partials_path)

app.get("/", (req,res)=>{
   // res.render("/",{layout:"index"})
   res.render("home",{layout:"index"})
})


app.post('/api/registers', (req, res) => {
    res.status(200).json({ success: true })
})
app.get("/register", (req,res)=>{
    res.render("register",{layout:"index"})

});

//post method used
app.post("/api/register",async(req,res)=>{
    try{
        const password=req.body.password;
        const consfirmpassword=req.body.Confirmpassword;
        if (password==consfirmpassword){
            try { 
             let result=await db.query(`INSERT INTO registers(firstname,lastname,email,gender,password,confirmpassword) values('${req.body.firstname}','${req.body.lastname}','${req.body.email}','${req.body.gender}','${req.body.password}','${req.body.Confirmpassword}')`)
              console.log(result)
                res.status(200).send(result)
              
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(400).send('password not matched');
        }
    } catch(error){
        res.status(400).send(error);
    }
});

//login page

app.get("/login",(req,res)=>{
    res.render("login", {layout: 'index'})
})

app.post('/login',async(req, res) =>{
    try {
       let email=req.body.email; 
       let password=req.body.password;
        let useremail= await db.query(`SELECT email,password FROM registers`)
        let arr1d = [].concat(...useremail);
        var clean = arr1d.filter((arr1d, index, self) =>
        index === self.findIndex((t) => (t.email === arr1d.email && t.password === arr1d.password)))
        let filterData = clean.filter(el => el.password == password && el.email == email)
        
       console.log(filterData);
        if(filterData.length > 0){
            res.status(201).render("course",{layout: 'index'})
        }else{
            res.send(`Either invalid email or password`)
       }
    }catch(error){
        console.log(error);
        res.status(400).send("invalid email")
    }
    
})



app.get('/about',(req,res)=>{
    res.render('about', {layout: 'index'})
})


app.get("/course",(req,res)=>{
    res.render("course", {layout: 'index'})
})

app.use('/static', express.static(static_path) )


app.listen(port,()=>{
    console.log(`server is successful,${port}`)
})