let ulElement = document.getElementById('ulElement')
let form = document.getElementById('form')
let date = document.getElementById('date')
let text = document.getElementById('text')
let time = document.getElementById('time')

let lista = JSON.parse(localStorage.getItem('lista',)) || [];

tarefasDisplay()

form.addEventListener('submit', ((e)=>{
    e.preventDefault();

    let dados = new FormData(form)

    let pessoa = dados.get('pessoa')
    let data = dados.get('data')
    let hora = dados.get('hora')

    data = data.split('-').reverse().join('/')

    if(data === '' || pessoa === '' || hora === ''){
        alert('Algo esta faltando!!!')
    }else{
        lista.push({pessoa, data, hora})
        localStorage.setItem('lista', JSON.stringify(lista))

        tarefasDisplay()
    }
    console.log(lista)
}))

function tarefasDisplay(){
    date.value = ''
    text.value = ''
    time.value = ''

    ulElement.innerText = ''

    lista.map((todo, index)=>{
        let liElement = document.createElement('li')
        liElement.innerHTML = `
        ${todo.pessoa}<br>
        ${todo.data}<br>
        ${todo.hora}
    `;

    let aElement = document.createElement('a')
    aElement.textContent = 'Remover'
    aElement.href = '#'
    liElement.appendChild(aElement)

    aElement.addEventListener('click', (()=>{
        lista.splice(index, 1)

        localStorage.setItem('lista', JSON.stringify(lista))

        tarefasDisplay()
    }))

        ulElement.appendChild(liElement)
    })
}