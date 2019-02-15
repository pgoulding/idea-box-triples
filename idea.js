class Idea {

  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = 0;
  }

  // Create static method and pass idea as argument. Call with Idea.saveToStorage(newIdea) in main.js
  saveToStorage() {
    var ideasString = localStorage.ideas || '[]';
    var ideas = JSON.parse(ideasString);
    ideas.push(this);
    localStorage.ideas = JSON.stringify(ideas);
  }

  updateContent(text, classList, i, ideaToChange) {
    var ideasString = localStorage.ideas || '[]';
    var ideas = JSON.parse(ideasString);
    if(classList[0] === 'idea-title') {
      this.title = text;
    } else {
      this.body = text;
    }
    ideas[i] = ideaToChange;
    localStorage.ideas = JSON.stringify(ideas);
  }

  updateQuality() {

  }

  deleteFromStorage(i) {
    var ideasString = localStorage.ideas || '[]';
    var ideas = JSON.parse(ideasString);
    ideas.splice(i, 1);
    localStorage.ideas = JSON.stringify(ideas);
  }

}
