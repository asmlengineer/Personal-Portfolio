const express = require('express');

const cookieParser = require('cookie-parser');

const path = require('path');

const userRouter = require('./routes/userRouter');

const hostRouter = require('./routes/hostRouter');

const { getError } = require('./controller/error');

const rootDir = require('./utils/pathUtil');

const authRouter = require('./routes/authRouter');

const MONGODB_URL = "mongodb+srv://ashish_db:ashish%40031008@cluster0.a3hrmgk.mongodb.net/Portfolio";

const session = require('express-session');

const mongoose = require('mongoose');

const multer = require('multer');

const validator = require('express-validator');

const app = express();

const mongoDbStore = require('connect-mongodb-session')(session); 

const dns = require('dns');

const uploads = multer({dest: "uploads/"});

dns.setServers([
    "1.1.1.1",
]);

app.get("/download/:filename", (req, res) => {
    const filePath = path.join(__dirname, "uploads", req.params.filename);
    res.download(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send("File not found");
        }
    });
});
    
const store = new mongoDbStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views'); 

app.use(express.static(path.join(rootDir, 'public')));
app.use('/uploads', express.static(path.join(rootDir, "uploads")));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'knowledge',
    resave: false,  
    saveUninitialized: true,
    store: store 
}));

app.use(cookieParser());
app.use((req, res, next) => {
    req.isLoggedIn = req.session.isLoggedIn === true;
    next();
});

app.use(authRouter);
app.use(userRouter);
app.use("/", (req, res, next) => {
    if (req.isLoggedIn) {
        next();
    } else {
        res.redirect("/login");
    }
});

app.use(hostRouter);
app.use(getError);

mongoose.connect(MONGODB_URL)
.then(() =>{
    console.log("Mongodb Connected");
})
.catch((error) =>{
    console.log(error);
})

const PORT = 3008;
app.listen(PORT, () =>{
console.log(`Server Running on Address http://localhost:${PORT}`)
});