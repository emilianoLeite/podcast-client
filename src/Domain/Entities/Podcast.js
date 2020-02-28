// @ts-check
export class Podcast {
  constructor(podcast) {
    this.identifier = podcast.identifier;
    this.title = podcast.title;
  }

  getIdentifier() {
    return this.identifier;
  }

  getTitle() {
    return this.title;
  }
}
