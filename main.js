
/*---------- Query Selectors -----------*/
var searchInput = document.querySelector('#search-input')
var titleInput = document.querySelector('#title-input')
var bodyInput = document.querySelector('#body-input')
// var searchBtn = document.querySelector('.search-icon')
var saveBtn = document.querySelector('#save-button')
var upvoteBtn = document.querySelector('.upvote-icon')
var downvoteBtn = document.querySelector('.downvote-icon')
var deleteBtn = document.querySelector('.delete-icon')
var ideaCardTitle = document.querySelector('.idea-title')
var ideaCardBody = document.querySelector('.idea-body')
var ideaCardQuality = document.querySelector('.idea-quality')
var ideaArea = document.querySelector('#idea-area')
var ideaTemplate = document.querySelector('template')
var ideaCard = document.querySelector('#idea-area')

/*---------- Global Variables ----------*/

var nextID = 0;

/*---------- Event Listeners -----------*/
searchInput.addEventListener('input', searchIdeas);
// searchBtn.addEventListener( , );
saveBtn.addEventListener('click', createIdeaCard)
// upvoteBtn.addEventListener('click', upvoteIdea);
// downvoteBtn.addEventListener('click', downvoteIdea);
ideaCard.addEventListener('click', removeIdea);



/*---------- Functions -----------------*/
function searchIdeas() {
  var searchResults = []
  var searchQuery = searchInput.value.toLowerCase()
  var ideas = localStorage.ideas
  ideas = JSON.parse(ideas)
  ideas.forEach(function(i) {
    if(i.title.toLowerCase().includes(searchQuery) || i.body.toLowerCase().includes(searchQuery)) {
      searchResults.push(i);
    }
  })
  ideaArea.innerHTML = ""
  searchResults.forEach(function(i) {
    addIdea(i)
  })
}

function createIdeaCard(e) {
  e.preventDefault()
  nextID++; // use localStorage, function to increment id
  var newIdea = new Idea(nextID, titleInput.value, bodyInput.value)
  newIdea.saveToStorage()
  addIdea(newIdea)
}

function addIdea(idea) {
  var ideaClone = ideaTemplate.content.cloneNode(true)
  ideaClone.querySelector('.idea-title').innerText = idea.title
  ideaClone.querySelector('.idea-body').innerText = idea.body
  ideaClone.querySelector('article').dataset.id = nextID;
  ideaArea.insertBefore(ideaClone, ideaArea.firstChild)
  titleInput.value = ''
  bodyInput.value = ''
}

function upvoteIdea() {

}

function downvoteIdea() {

}

function removeIdea() {
  if (event.target.className === 'delete-icon') {
    event.target.parentNode.parentNode.parentNode.remove();
  }
}

function addExistingCards() {
  var ideas = localStorage.ideas || '[]'
  ideas = JSON.parse(ideas)
  ideas.forEach(function(i) {
    var existingIdea = new Idea()
    existingIdea.id = i.id
    existingIdea.title = i.title
    existingIdea.body = i.body
    existingIdea.quality = i.quality
    addIdea(existingIdea);
  })
}

window.onload = addExistingCards()
