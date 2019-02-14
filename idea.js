class Idea {

  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = 0;
  }

  deleteFromStorage() {

  }

  // Create static method and pass idea as argument. Call with Idea.saveToStorage(newIdea) in main.js
  saveToStorage() {
    var ideasString = localStorage.ideas || '[]'
    var ideas = JSON.parse(ideasString)
    ideas.push(this)
    localStorage.ideas = JSON.stringify(ideas)
  }

  updateContent(text, key) {
    var ideasString = localStorage.ideas || '[]'
    var ideas = JSON.parse(ideasString)
    if(key[0] === 'idea-title') {
      this.title = text
    } else {
      this.body = text
    }
  }

  updateQuality() {

  }

}
