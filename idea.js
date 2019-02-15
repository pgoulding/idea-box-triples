class Idea {

  constructor(id, title, body, quality = 0) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality;
  }

  deleteFromStorage(ideas, index) {
    ideas.splice(index, 1);
  }

  // Create static method and pass idea as argument. Call with Idea.saveToStorage(newIdea) in main.js
  saveToStorage(ideas) {
    ideas.push(this)
  }

  updateContent(text, key) {
    if(key[0] === 'idea-title') {
      this.updateTitle(text);
    } else {
      this.updateBody(text);
    }
  }

  updateQuality(vote) {
    if (vote === 'upvote') {
      this.upvote();
    } else {
      this.downvote();
    }
  }

  updateTitle(text) {
    this.title = text;
  }

  updateBody(text) {
    this.body = text;
  }

  upvote() {
    if(this.quality < 2) {
      this.quality++;
    }
  }

  downvote() {
    if(this.quality > 0) {
      this.quality--;
    }
  }

}
