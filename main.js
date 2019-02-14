
/*---------- Query Selectors -----------*/
var searchInput = document.querySelector('#search-input')
var titleInput = document.querySelector('#title-input')
var bodyInput = document.querySelector('#body-input')
var saveBtn = document.querySelector('#save-button')
var upvoteBtn = document.querySelector('.upvote-icon')
var downvoteBtn = document.querySelector('.downvote-icon')
var deleteBtn = document.querySelector('.delete-icon')
var cardTitles = document.querySelector('.idea-title')
var cardBodies = document.querySelector('.idea-body')
// var ideaCardQuality = document.querySelector('.idea-quality')
var ideaArea = document.querySelector('#idea-area')
var ideaTemplate = document.querySelector('template')

/*---------- Global Variables ----------*/


/*---------- Event Listeners -----------*/
saveBtn.addEventListener('click', createIdeaCard)
searchInput.addEventListener('input', searchIdeas)
// upvoteBtn.addEventListener('click', upvoteIdea)
// downvoteBtn.addEventListener('click', downvoteIdea)
ideaArea.addEventListener('click', removeIdeaCard)
ideaArea.addEventListener('focusout', saveEdits)

/*---------- Functions -----------------*/
function searchIdeas() {
  var searchResults = []
  var searchQuery = searchInput.value.toLowerCase()
  var ideas = localStorage.ideas || '[]'
  ideas = JSON.parse(ideas)
  ideas.forEach(function(idea) {
    if(idea.title.toLowerCase().includes(searchQuery) || idea.body.toLowerCase().includes(searchQuery)) {
      searchResults.push(idea)
    }
  })
  ideaArea.innerHTML = ""
  searchResults.forEach(function(idea) {
    addIdeaCard(idea)
  })
}

function createIdeaCard(e) {
  e.preventDefault()
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value)
  newIdea.saveToStorage()
  addIdeaCard(newIdea)
}

function addIdeaCard(idea) {
  var ideaClone = ideaTemplate.content.cloneNode(true)
  ideaClone.querySelector('.idea-title').innerText = idea.title
  ideaClone.querySelector('.idea-body').innerText = idea.body
  ideaClone.querySelector('article').dataset.id = idea.id
  ideaArea.insertBefore(ideaClone, ideaArea.firstChild)
  titleInput.value = ''
  bodyInput.value = ''
}

function saveEdits(e) {
  var ideasString = localStorage.ideas || '[]'
  var ideas = JSON.parse(ideasString);
  var i = getIdeaIndex(e, ideas);
  var ideaToChange = new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].quality);
  ideaToChange.updateContent(e.target.innerText, e.target.classList);
  ideas[i] = ideaToChange;
  localStorage.ideas = JSON.stringify(ideas);
}

function getIdeaIndex(e, ideas) {
  var parent = e.target.closest('article')
  var parentID = parseInt(parent.dataset.id)
  var index = ideas.findIndex(function(idea) {
    return idea.id === parentID
  });
  console.log(index);
  return parseInt(index);
}

function upvoteIdea() {

}

function downvoteIdea() {

}

function removeIdeaCard(e) {
  if (e.target.className ==='delete-icon') {
    e.target.closest('article').remove();
    var ideasString = localStorage.ideas || '[]'
    var ideas = JSON.parse(ideasString);
    var i = getIdeaIndex(e, ideas);
    var ideaToDelete = new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].quality);
    ideaToDelete.deleteFromStorage(i);
  }



}

function addExistingCards() {
  var ideas = localStorage.ideas || '[]'
  ideas = JSON.parse(ideas)
  ideas.forEach(function(idea) {
    var existingIdea = new Idea(idea.id, idea.title, idea.body, idea.quality)
    addIdeaCard(existingIdea);
  })
}

window.onload = addExistingCards()
