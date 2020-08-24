const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    multer = require("multer"),
    upload = multer()
clearCache = require('./services/cache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//MongoDB Setup
mongoose.connect('mongodb://localhost:27017/redisdemo', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection
    .once('open', () => console.log('[INFO] Connected to Database.'))
    .on('error', (err) => console.error("[ERROR] Cannot connect to Database!", err))

app.use(upload.array());
app.use(express.static('public'));

//Routes
require('./routes/VehicleRoutes')(app);


app.listen(3000, () => console.log("[INFO] Server started at port: 3000"))