export class Podcast {
  constructor(podcast) {
    this.identifier = podcast.identifier;
  }

  getIdentifier() {
    return this.identifier;
  }
}
