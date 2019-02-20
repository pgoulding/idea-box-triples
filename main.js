
/*---------- Query Selectors -----------*/
var searchInput = document.querySelector('#search-input');
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-button');
var seeMoreBtn = document.querySelector('.see-more-btn');
var ideaArea = document.querySelector('#idea-area');
var ideaTemplate = document.querySelector('template');
var qualityDropDown = document.querySelector('#quality-select-list');
var qualityText = document.querySelector('idea-quality');

/*---------- Global Variables -----------*/
var cardsToShow;

/*---------- Event Listeners -----------*/
titleInput.addEventListener('input', disableSave)
bodyInput.addEventListener('input', disableSave)
saveBtn.addEventListener('click', createIdea);
seeMoreBtn.addEventListener('click', toggleCardView);
searchInput.addEventListener('input', searchIdeas);
qualityDropDown.addEventListener('input', filterByQuality);

/*---------- Functions -----------------*/
function getIdeas() {
  var ideasString = localStorage.ideas || '[]';
  return JSON.parse(ideasString);
}

function getIdeaIndex(e, ideas) {
  var parent = e.target.closest('article');
  var parentID = parseInt(parent.dataset.id);
  var index = ideas.findIndex(idea => idea.id === parentID);
  return index;
}

function reinstateIdea(ideas, i) {
  return new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].quality);
}

function storeIdeas(ideas) {
  localStorage.ideas = JSON.stringify(ideas);
}

function createIdea(e) {
  e.preventDefault();
  var ideas = getIdeas();
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  newIdea.saveToStorage(ideas);
  storeIdeas(ideas);
  displayCards();
}

function addIdeaListeners(clone) {
  clone.querySelector('.idea-title').addEventListener('blur', saveEdits);
  clone.querySelector('.idea-body').addEventListener('blur', saveEdits);
  clone.querySelector('.delete-icon').addEventListener('click', removeIdeaCard);
  clone.querySelector('.upvote-icon').addEventListener('click', vote);
  clone.querySelector('.downvote-icon').addEventListener('click', vote);
}

function addIdeaCard(idea) {
  var ideaClone = ideaTemplate.content.cloneNode(true);
  addIdeaData(ideaClone, idea);
  addIdeaListeners(ideaClone);
  ideaArea.insertBefore(ideaClone, ideaArea.firstChild);
  titleInput.value = '';
  bodyInput.value = '';
  saveBtn.disabled = true;
}

function addIdeaData(clone, idea) {
  var qualities = ['Swill', 'Plausible', 'Genius'];
  clone.querySelector('article').dataset.id = idea.id;
  clone.querySelector('.idea-title').innerText = idea.title;
  clone.querySelector('.idea-body').innerText = idea.body;
  clone.querySelector('.idea-quality').innerText = qualities[idea.quality];
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
    // qualityText.innerHTML
  } else {
    ideaToVote.updateQuality('downvote');
  }
  ideas[i] = ideaToVote;
  storeIdeas(ideas);
  displayCards();
}

function displayCards() {
  if(seeMoreBtn.innerText === 'See More') {
    getRecentIdeas(10);
  } else {
    getRecentIdeas(getIdeas().length);
  }
}

function searchIdeas() {
  var searchQuery = searchInput.value.toLowerCase();
  var ideas = getIdeas();
  var searchResults = ideas.filter(idea => idea.title.toLowerCase().includes(searchQuery) || idea.body.toLowerCase().includes(searchQuery));
  ideaArea.innerHTML = '';
  searchResults.forEach(idea => addIdeaCard(idea));
}

function filterByQuality() {
  var quality = qualityDropDown.value;
  if (quality === '--') {
    getRecentIdeas(getIdeas().length);
  } else {
    var ideas = getIdeas();
    var filterQuality = ideas.filter(idea => idea.quality === parseInt(quality));
    ideaArea.innerHTML = '';
    filterQuality.forEach(idea => addIdeaCard(idea));
    seeMoreBtn.style.display = 'none';
  }
}

function getRecentIdeas(numIdeas) {
  ideaArea.innerHTML = '';
  var ideas = getIdeas();
  if(ideas.length <= 10) {
    ideas.forEach(idea => addIdeaCard(idea));
    seeMoreBtn.style.display = 'none';
  } else {
    var recentIdeas = ideas.slice(ideas.length - numIdeas, ideas.length);
    recentIdeas.forEach(idea => addIdeaCard(idea));
    seeMoreBtn.style.display = 'block';
  }
}

function toggleCardView(e) {
  e.preventDefault();
  if (seeMoreBtn.innerText === 'See More') {
    getRecentIdeas(getIdeas().length);
    seeMoreBtn.innerText = 'See Less';
  } else {
    getRecentIdeas(10);
    seeMoreBtn.innerText = 'See More';
  }
}

function removeIdeaCard(e) {
  e.target.closest('article').remove();
  var ideas = getIdeas();
  var i = getIdeaIndex(e, ideas);
  var ideaToDelete = reinstateIdea(ideas, i);
  ideaToDelete.deleteFromStorage(ideas, i);
  storeIdeas(ideas);
  displayCards();
}

function disableSave() {
  if (titleInput.value !== '' && bodyInput.value !== '') {
    saveBtn.disabled = false;
  } else {
    saveBtn.disabled = true;
  }
}

window.onload = getRecentIdeas(10);
