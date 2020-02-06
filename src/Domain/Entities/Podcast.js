export class Podcast {
  constructor(podcast) {
    this.identifier = podcast.title;
    this.contents = podcast.contents;
  }

  getIdentifier() {
    return this.identifier;
  }

  getContents() {
    return this.contents;
  }
}
