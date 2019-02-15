
/*---------- Query Selectors -----------*/
var searchInput = document.querySelector('#search-input');
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-button');
// var ideaCardQuality = document.querySelector('.idea-quality');
var ideaArea = document.querySelector('#idea-area');
var ideaTemplate = document.querySelector('template');

/*---------- Global Variables ----------*/


/*---------- Event Listeners -----------*/
saveBtn.addEventListener('click', createIdeaCard);
searchInput.addEventListener('input', searchIdeas);
ideaArea.addEventListener('focusout', saveEdits);
ideaArea.addEventListener('click', upvoteIdea);
ideaArea.addEventListener('click', downvoteIdea);
ideaArea.addEventListener('click', removeIdeaCard);

/*---------- Functions -----------------*/
function createIdeaCard(e) {
  e.preventDefault();
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  newIdea.saveToStorage();
  addIdeaCard(newIdea);
}

function addIdeaCard(idea) {
  var ideaClone = ideaTemplate.content.cloneNode(true);
  ideaClone.querySelector('.idea-title').innerText = idea.title;
  ideaClone.querySelector('.idea-body').innerText = idea.body;
  ideaClone.querySelector('article').dataset.id = idea.id;
  ideaArea.insertBefore(ideaClone, ideaArea.firstChild);
  titleInput.value = '';
  bodyInput.value = '';
}

function getIdeas() {
  var ideasString = localStorage.ideas || '[]';
  var ideas = JSON.parse(ideasString);
  return ideas;
}

function getIdeaIndex(e, ideas) {
  var parent = e.target.closest('article');
  var parentID = parseInt(parent.dataset.id);
  var index = ideas.findIndex(function(idea) {
    return idea.id === parentID;
  });
  return index;
}

function reinstateIdea(ideas, i) {
  var idea = new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].quality);
  return idea;
}

function searchIdeas() {
  var searchResults = [];
  var searchQuery = searchInput.value.toLowerCase();
  var ideas = getIdeas();
  ideas.forEach(function(idea) {
    if (idea.title.toLowerCase().includes(searchQuery) || idea.body.toLowerCase().includes(searchQuery)) {
      searchResults.push(idea);
    };
  });
  ideaArea.innerHTML = "";
  searchResults.forEach(function(idea) {
    addIdeaCard(idea);
  });
}

function saveEdits(e) {
  var ideas = getIdeas();
  var i = getIdeaIndex(e, ideas);
  var ideaToChange = reinstateIdea(ideas, i);
  ideaToChange.updateContent(e.target.innerText, e.target.classList, i, ideaToChange);
}

function upvoteIdea() {

}

function downvoteIdea() {

}

function removeIdeaCard(e) {
  if (e.target.className === 'delete-icon') {
    e.target.closest('article').remove();
    var ideas = getIdeas();
    var i = getIdeaIndex(e, ideas);
    var ideaToDelete = reinstateIdea(ideas, i);
    ideaToDelete.deleteFromStorage(i);
  }
}

function addExistingCards() {
  var ideas = getIdeas();
  ideas.forEach(function(idea) {
    var existingIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
    addIdeaCard(existingIdea);
  })
}

window.onload = addExistingCards();
