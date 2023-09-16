document.addEventListener('DOMContentLoaded', () => {
  //global variables
  let counter = 0
  let globalMonsters = []
  //Events
  document.getElementById('back').addEventListener('click', renderPreviousMonsters)
  document.getElementById('forward').addEventListener('click', renderNextMonsters)

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
    newMonsterList.forEach(monster => renderAllMonsters(monster))
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
    newMonsterList.forEach(monster => renderAllMonsters(monster))
    counter = counter + 50
  }
  //Renders to DOM
  function renderAllMonsters({ name, age, description }) {
    //monster container
    const monsterContainer = document.getElementById('monster-container')
    //create elements (div(to hold all elements), h2(name), h4(age), p(description)). Note: none of the elements have id's
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')
    //set text to elements
    h2.textContent = name
    h4.textContent = age
    p.textContent = description
    //append elements to monster container
    div.appendChild(h2)
    div.appendChild(h4)
    div.appendChild(p)
    //append to dom
    monsterContainer.appendChild(div)
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

  //init
  function init() {
    fetchAllMonsters()
  }
  init()
})