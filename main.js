
/*---------- Query Selectors -----------*/
var searchInput = document.querySelector('#search-input');
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-button');
var ideaArea = document.querySelector('#idea-area');
var ideaTemplate = document.querySelector('template');

/*---------- Event Listeners -----------*/
saveBtn.addEventListener('click', createIdea);
searchInput.addEventListener('input', searchIdeas);

/*---------- Functions -----------------*/
function getIdeas() {
  var ideasString = localStorage.ideas || '[]';
  var ideas = JSON.parse(ideasString);
  return ideas;
}

function storeIdeas(ideas) {
  localStorage.ideas = JSON.stringify(ideas);
}

function addExistingCards() {
  ideaArea.innerHTML = '';
  var ideas = getIdeas();
  ideas.forEach(function(idea) {
    var existingIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
    addIdeaCard(existingIdea);
  })
}

function createIdea(e) {
  e.preventDefault();
  var ideas = getIdeas();
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  newIdea.saveToStorage(ideas);
  addIdeaCard(newIdea);
  storeIdeas(ideas);
}

function addIdeaListeners(clone) {
  clone.querySelector('.idea-title').addEventListener('blur', saveEdits);
  clone.querySelector('.idea-body').addEventListener('blur', saveEdits);
  clone.querySelector('.delete-icon').addEventListener('click', removeIdeaCard);
  clone.querySelector('.upvote-icon').addEventListener('click', vote);
  clone.querySelector('.downvote-icon').addEventListener('click', vote);
}

function addIdeaCard(idea) {
  var ideaClone = ideaTemplate.content.cloneNode(true)
  var qualities = ['Swill', 'Plausible', 'Genius'];
  ideaClone.querySelector('article').dataset.id = idea.id;
  ideaClone.querySelector('.idea-title').innerText = idea.title;
  ideaClone.querySelector('.idea-body').innerText = idea.body;
  ideaClone.querySelector('.idea-quality').innerText = qualities[idea.quality];
  addIdeaListeners(ideaClone);
  ideaArea.insertBefore(ideaClone, ideaArea.firstChild);
  titleInput.value = '';
  bodyInput.value = '';
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

function saveEdits(e) {
  var ideas = getIdeas();
  var i = getIdeaIndex(e, ideas);
  var ideaToChange = reinstateIdea(ideas, i);
  ideaToChange.updateContent(e.target.innerText, e.target.classList);
  ideas[i] = ideaToChange;
  storeIdeas(ideas);
}

function vote(e) {
  var ideas = getIdeas();
  var i = getIdeaIndex(e, ideas);
  var ideaToVote = reinstateIdea(ideas, i);
  if (e.target.className === 'upvote-icon') {
    ideaToVote.updateQuality('upvote');
  } else if (e.target.className === 'downvote-icon') {
    ideaToVote.updateQuality('downvote');
  };
  ideas[i] = ideaToVote;
  storeIdeas(ideas);
  addExistingCards();
}

function searchIdeas() {
  var searchQuery = searchInput.value.toLowerCase();
  var ideas = getIdeas();
  var searchResults = ideas.filter(function(idea) {
    return idea.title.toLowerCase().includes(searchQuery) || idea.body.toLowerCase().includes(searchQuery);
  });
  ideaArea.innerHTML = '';
  searchResults.forEach(function(idea) {
    addIdeaCard(idea);
  });
}

function removeIdeaCard(e) {
  if (e.target.className === 'delete-icon') {
    e.target.closest('article').remove();
    var ideas = getIdeas();
    var i = getIdeaIndex(e, ideas);
    var ideaToDelete = reinstateIdea(ideas, i);
    ideaToDelete.deleteFromStorage(ideas, i);
    storeIdeas(ideas);
  };
}

window.onload = addExistingCards();
