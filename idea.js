class Idea {

  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = 0;
  }

  deleteFromStorage(parentID, i) {
// locate specific id on targeted card

// locate specific object with specific id

// remove specific object
    var ideasString = localStorage.ideas || '[]'
    var ideas = JSON.parse(ideasString);


    ideas.splice(i, 1);
    console.log(i);
    console.log(ideas);
      // localStorage.removeItem(ideas[i]);
    localStorage.ideas = JSON.stringify(ideas)
  
  }

  // Create static method and pass idea as argument. Call with Idea.saveToStorage(newIdea) in main.js
  saveToStorage() {
    var ideasString = localStorage.ideas || '[]'
    var ideas = JSON.parse(ideasString)
    ideas.push(this)
    localStorage.ideas = JSON.stringify(ideas)

    // localStorage.setItem("id", JSON.stringify(ideas));
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
