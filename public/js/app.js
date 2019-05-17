console.log("Index page in app.js")


const wform = document.querySelector('form') // document.getElementById('weather_form')
const search = document.querySelector('input')
const mess = document.querySelector("#message")

wform.addEventListener('submit', (e)=>{
    e.preventDefault()
    mess.textContent = 'Loading...'
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            mess.textContent = data.error
        }else{
            mess.textContent = data.forecast +" in "+ data.location
        }
    })
})
})