document.addEventListener('DOMContentLoaded', () => {
  //global variables
  let counter = 0
  let globalMonsters = []

  //Helper functions
  function getFormData(){
    const name = document.querySelector('#name')
    const age = document.querySelector('#age')
    const description = document.querySelector('#description')
    const formData = {
      name: name.value,
      age: age.value,
      description: description.value
    }
    return formData
  }
  function clearForm(){
    const name = document.querySelector('#name')
    const age = document.querySelector('#age')
    const description = document.querySelector('#description')
    name.value = ''
    age.value = ''
    description.value = ''
  }
  //Events
  document.getElementById('back').addEventListener('click', renderPreviousMonsters)
  document.getElementById('forward').addEventListener('click', renderNextMonsters)
  function addSubmitEventListener(){
    document.querySelector('#monster-form').addEventListener('submit', (e)=>{
      e.preventDefault()
      //post data to server
      postNewMonster(getFormData())
      clearForm()
    })
  }
  //Event Handlers
  function renderPreviousMonsters(){
    //clear the DOM for the next set of monsters
    const monsterContainer = document.getElementById('monster-container')
    const monsterList = monsterContainer.querySelectorAll('div')
    if(monsterList.length){
      monsterList.forEach(element => element.remove())
    }
    //render previous 50 monster
    const newMonsterList = globalMonsters.slice(counter - 100, counter - 50)
    newMonsterList.forEach(monster => createMonsterCard(monster))
    counter = counter - 50
    //when back button is clicked and the first 50 monsters are already rendered to DOM
    //counter will be 0, calling renderNextMonsters will keep the first 50 monsters on page
    if(!counter){
      renderNextMonsters()
      alert('Aint no monsters here')
    }
  }
  function renderNextMonsters() {
    //clear the DOM 
    const monsterContainer = document.getElementById('monster-container')
    const monsterListElements = monsterContainer.querySelectorAll('div')
    if(monsterListElements.length){
      monsterListElements.forEach(element => element.remove())
    }
    //render next 50 monsters
    const newMonsterList = globalMonsters.slice(counter, counter + 50)
    newMonsterList.forEach(monster => createMonsterCard(monster))
    counter = counter + 50
  }
  //Renders to DOM
  function createMonsterCard({ name, age, description }) {
    //monster container
    const monsterContainer = document.getElementById('monster-container')
    //create elements (div(to hold all elements), h2(name), h4(age), p(description)). Note: none of the elements have id's
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')
    //set text to elements
    h2.textContent = name
    h4.textContent = `Age: ${age}`
    p.textContent = `Description: ${description}`
    //append elements to monster container
    div.appendChild(h2)
    div.appendChild(h4)
    div.appendChild(p)
    //append to dom
    monsterContainer.appendChild(div)
  }

  function createForm(){
    const createMonsterContainer = document.getElementById('create-monster')
    //create elments
    const form = document.createElement('form')
    const name = document.createElement('input')
    const age = document.createElement('input')
    const description = document.createElement('input')
    const createBtn = document.createElement('button')
    //add attributes
    form.id = 'monster-form'
    name.id = 'name'
    age.id = 'age'
    description.id = 'description'
    //set placeholders to inputs
    name.placeholder = 'name...'
    age.placeholder = 'age...'
    description.placeholder = 'description...'
    //set text
    createBtn.textContent = 'Create'
    //append inputs to form
    form.appendChild(name)
    form.appendChild(age)
    form.appendChild(description)
    form.appendChild(createBtn)
    //append form to form container
    createMonsterContainer.appendChild(form)
    addSubmitEventListener()
  }
  
  //Fetch Requests
  function fetchAllMonsters() {
    fetch('http://localhost:3000/monsters')
      .then(res => res.json())
      .then(monsters => {
        globalMonsters = monsters
        renderNextMonsters()
      })
  }
  function postNewMonster(formData){
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(monster => {
      globalMonsters.push(monster)
      createMonsterCard(monster)
    })
  }

  //init
  function init() {
    fetchAllMonsters()
    createForm()
  }
  init()
})