class Idea {

  constructor() {
    this.id = null
    this.title = ''
    this.body = ''
    this.quality = 'Swill'
  }

  deleteFromStorage() {

  }

  saveToStorage() {
    var ideas = localStorage.ideas || '[]'
    ideas = JSON.parse(ideas)
    // newIdea.id = 1
    newIdea.title = titleInput.value
    newIdea.body = bodyInput.value
    ideas.push(newIdea)
    localStorage.ideas = JSON.stringify(ideas)
  }

  updateContent() {

  }

  updateQuality() {

  }

}
