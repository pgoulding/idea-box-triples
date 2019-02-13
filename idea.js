class Idea {

  constructor(id, title, body) {
    this.id = id
    this.title = title
    this.body = body
    this.quality = 0
  }

  deleteFromStorage() {

  }

  // Create static method and pass idea as argument. Call with Idea.saveToStorage(newIdea) in main.js
  saveToStorage() {
    var ideas = localStorage.ideas || '[]'
    ideas = JSON.parse(ideas)
    ideas.push(this)
    localStorage.ideas = JSON.stringify(ideas)
  }

  updateContent() {

  }

  updateQuality() {

  }

}
