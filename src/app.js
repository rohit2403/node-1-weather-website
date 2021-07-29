    const path=require('path')
    const express=require('express')
    const hbs=require('hbs')
    const app=express()
    const port = process.env.PORT || 3000
    const geocode = require('./utils/geocode')
    const forecast =require('./utils/forecast')
    // Define paths for Express config
    const publicDirectoryPath = path.join(__dirname,'../public')
    const viewspath=path.join(__dirname, '../templates/views')
    const partialsPath =path.join(__dirname, '../templates/partial')

    //Setup handlebars and views location 
    app.set('view engine','hbs' )
    app.set('views',viewspath)
    hbs.registerPartials(partialsPath)
    //setup static directory to serve 
    app.use(express.static(publicDirectoryPath))

    app.get('', (req,res) => {
        res.render('index',{
            title:'Weather',
            name:'Rohit'
        })

    })
    app.get('/about', (req,res) => {
        res.render('about',{
            title:'About ',
            name:'Rohit'
        })
    })
    app.get('/weather',(req,res) => {
        if(!req.query.address)
        {
            return res.send({
                error:'You must provide an adress'
            })
        }
        geocode(req.query.address,(error,{ latitude,longitude,location } = {}) => {
            if(error)
            {
                return res.send({error})
            }

            forecast(latitude,longitude,(error,forecastData) => {
                if(error)
                {
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.adress
                })
            })
        
        })


        // res.send({
        //     forecast:'It is snowing',
        //     location:'India',
        //     address:req.query.adress
        // })

    })


    app.get('/product',(req,res)=>{
        if(!req.query.search){
            return res.send({
                error:'You most provide a search term'
            })

        }



        console.log(req.query.search)
        res.send({
            product:[]
        })

    })

    app.get('/help', (req,res) => {
    
        res.render('help',{
            title:'Help',
            name:'Rohit ',
            info:'Help page '



        })

        
    })

    app.get('*',(req,res) => {
        res.render('404',{
            title:'Help page ',
            errorMessage:'Go to help ',
            name:'Rohit'
        })

    })


    app.listen(port,()=>{
        console.log('Server is on port' + port)
    })















