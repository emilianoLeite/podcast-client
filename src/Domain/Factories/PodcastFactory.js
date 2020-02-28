import { Podcast } from "../Entities/Podcast";

function create(mappedPodcastItem) {
  return new Podcast(mappedPodcastItem);
}

export default {
  create
};
