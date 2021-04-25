const express = require('express')

const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname+'/public/css'))
app.use('/js', express.static(__dirname+'/public/js'))
app.use('/img', express.static(__dirname+'/public/img'))


const body_parser = require('body-parser')

app.use(body_parser.json())

//setviews
app.set('views','./views')
app.set('view engine', 'ejs')

//routes
app.get('',(req,res)=>{
    //res.sendFile(__dirname+ '/views/index.html')
    res.render('index', {text: 'This is EJS'})
    //res.send('Hello we are at home')

})

app.get('/about',(req,res)=>{
    //res.sendFile(__dirname+ '/views/index.html')
    res.render('about', {text: 'About pagec'})
    //res.send('Hello we are at home')

})

app.listen(8888, (err, live)=>{
    if (err){
        console.log(err)
    }

    console.log('server running on port 8888')

})