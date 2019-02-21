class Idea {

  constructor(id, title, body, quality = 2) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality;
  }

  // Create static method and pass idea as argument. Call with Idea.saveToStorage(newIdea) in main.js
  saveToStorage(ideas) {
    ideas.push(this);
  }

  updateContent(text, classList) {
    if(classList[0] === 'idea-title') {
      this.updateTitle(text);
    } else {
      this.updateBody(text);
    }
  }

  updateTitle(text) {
    this.title = text;
  }

  updateBody(text) {
    this.body = text;
  }

  updateQuality(vote) {
    if (vote === 'upvote') {
      this.upvote();
    } else {
      this.downvote();
    }
  }

  upvote() {
    if(this.quality < 4) {
      this.quality++;
    }
  }

  downvote() {
    if(this.quality > 0) {
      this.quality--;
    }
  }

  deleteFromStorage(ideas, index) {
    ideas.splice(index, 1);
  }
}
