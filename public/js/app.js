console.log('client side javascript file is loaded ')
const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo =document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')
//messageOne.textContent='From Javascript'
weatherForm.addEventListener('submit',(e)=> {

    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address=' + location).then((res) =>{
    res.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = "Temperature is : "+data.forecast.Temp +" , Humidity is : "+data.forecast.Humidity
           // messageThree.textContent=
            console.log(data.location)
            console.log(data.forecast)
            
        }
    })
})

})