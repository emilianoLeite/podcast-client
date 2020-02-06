import { Podcast } from "../Entities/Podcast";

function create(podcastItem) {
  return new Podcast(podcastItem);
}

export default {
  create
};
