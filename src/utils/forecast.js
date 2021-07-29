    const request=require('request')

const forecast=( latitude , longitude ,callback) =>
    { 
        const url='http://api.weatherstack.com/current?access_key=06a586efcb9dcb6634287ea389cbfda2&query=' + latitude +',' + longitude



        request({ url , json : true } , (error,{body}) =>
        {
            if(error)
            console.log('unable to connect to services' , undefined)
            else if(body.error)
            console.log('Coordinate eror ',undefined)

            else{
                callback(undefined,{
                    Temp : body.current.temperature,
                    Humidity:body.current.humidity
                } )

            }

        }

            )

    }
    module.exports=forecast