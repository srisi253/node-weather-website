const weatherForm = document.querySelector('form') //utliza el primer form que encuentra
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //Esto es para encotnrar el id, si fuera por clase es .nombreDeClase
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { //La e es de event, no de error
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            } else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
