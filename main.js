
/*---------- Query Selectors -----------*/
var searchInput = document.querySelector('#search-input')
var titleInput = document.querySelector('#title-input')
var bodyInput = document.querySelector('#body-input')
var saveBtn = document.querySelector('#save-button')
var ideaArea = document.querySelector('#idea-area')
var ideaTemplate = document.querySelector('template')

/*---------- Event Listeners -----------*/
saveBtn.addEventListener('click', createIdeaCard)
searchInput.addEventListener('input', searchIdeas)
// All other listeners applied directly to each Idea in addIdeaListeners()

/*---------- Global Variables -----------*/
var qualities = ['Swill', 'Plausible', 'Genius']; 

/*---------- Functions -----------------*/
function searchIdeas() {
  var searchResults = []
  var searchQuery = searchInput.value.toLowerCase()
  var ideas = getIdeas();
  ideas.forEach(function(idea) {
    if(idea.title.toLowerCase().includes(searchQuery) || idea.body.toLowerCase().includes(searchQuery)) {
      searchResults.push(idea)
    }
  })
  ideaArea.innerHTML = '';
  searchResults.forEach(function(idea) {
    addIdeaCard(idea)
  })
}

function createIdeaCard(e) {
  e.preventDefault()
  var ideas = getIdeas();
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value)
  newIdea.saveToStorage(ideas);
  addIdeaCard(newIdea);
  localStorage.ideas = JSON.stringify(ideas)
}

function addIdeaCard(idea) {
  var ideaClone = ideaTemplate.content.cloneNode(true)
  ideaClone.querySelector('.idea-title').innerText = idea.title
  ideaClone.querySelector('.idea-body').innerText = idea.body
  ideaClone.querySelector('.idea-quality').innerText = qualities[idea.quality];
  ideaClone.querySelector('article').dataset.id = idea.id
  addIdeaListeners(ideaClone);
  ideaArea.insertBefore(ideaClone, ideaArea.firstChild)
  titleInput.value = ''
  bodyInput.value = ''
}

function getIdeas() {
  var ideasString = localStorage.ideas || '[]'
  var ideas = JSON.parse(ideasString);
  return ideas;
}

function saveEdits(e) {
  var ideas = getIdeas();
  var i = getIndex(e, ideas);
  var ideaToChange = new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].quality);
  ideaToChange.updateContent(e.target.innerText, e.target.classList);
  ideas[i] = ideaToChange;
  localStorage.ideas = JSON.stringify(ideas);
}

function getIndex(e, ideas) {
  var parent = e.target.closest('article')
  var parentID = parseInt(parent.dataset.id)
  var index = ideas.findIndex(function(idea) {
    return idea.id === parentID
  });
  return index;
}

function vote(e) {
  var ideas = getIdeas();
  var i = getIndex(e, ideas);
  var ideaToChange = new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].quality);
  if (e.target.className === 'upvote-icon') {
    ideaToChange.updateQuality('upvote');
  } else if (e.target.className === 'downvote-icon') {
    ideaToChange.updateQuality('downvote');
  }
  ideas[i] = ideaToChange;
  localStorage.ideas = JSON.stringify(ideas);
  addExistingCards();
}

function addIdeaListeners(clone) {
  clone.querySelector('.idea-title').addEventListener('blur', saveEdits)
  clone.querySelector('.idea-body').addEventListener('blur', saveEdits)
  clone.querySelector('.delete-icon').addEventListener('click', removeIdeaCard);
  clone.querySelector('.upvote-icon').addEventListener('click', vote)
  clone.querySelector('.downvote-icon').addEventListener('click', vote)
}

function removeIdeaCard(e) {
  if (e.target.className === 'delete-icon') {
    e.target.closest('article').remove();
    var ideas = getIdeas();
    var i = getIndex(e, ideas);
    var ideaToDelete = new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].quality);
    ideaToDelete.deleteFromStorage(ideas, i);
    localStorage.ideas = JSON.stringify(ideas)
  }
}

function addExistingCards() {
  ideaArea.innerHTML = '';
  var ideas = getIdeas();
  ideas.forEach(function(idea) {
    var existingIdea = new Idea(idea.id, idea.title, idea.body, idea.quality)
    addIdeaCard(existingIdea);
  })
}

window.onload = addExistingCards()
