class Idea {

  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = 0;
  }

  deleteFromStorage() {
// locate specific id on targeted card

// locate specific object with specific id

// remove specific object
    localStorage.removeItem()
  }

  // Create static method and pass idea as argument. Call with Idea.saveToStorage(newIdea) in main.js
  saveToStorage() {
    var ideasString = localStorage.ideas || '[]'
    var ideasObject = JSON.parse(ideasString)
    ideasObject.push(this)
    localStorage.ideas = JSON.stringify(ideasObject)
  }

  updateContent() {

  }

  updateQuality() {

  }

}
