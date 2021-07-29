const request = require("request")

const geocode = ( address , callback) => {
        const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +  address + '.json?access_token=pk.eyJ1Ijoicm9oaXRzdHJ0IiwiYSI6ImNrcmlndGlqOTBpcjMycHBlcnVxd2Fyd20ifQ.mbhqNdCq44VD_7NfUcbQ_g&limit=1'


        request({ url:url ,json : true},(error,{body})=>
        {
            if(error)
            {
                callback('Wrong adress' , undefined)
            }
            else if( body.features.length === 0)
            {
                callback('Location not found' , undefined)
            }
            else{
                callback(undefined,{
                    longitude : body.features[0].center[0],
                    latitude  : body.features[0].center[1],
                    location  : body.features[0].context[2].text
                })
            }

        })

    }
    module.exports = geocode