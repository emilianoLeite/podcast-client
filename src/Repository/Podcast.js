import PodcastFactory from "../Domain/Factories/PodcastFactory";
import { fromStorage } from "../Application/mappers/podcast";

const RNFS = require("react-native-fs");

const ROOT_PATH = `${RNFS.DocumentDirectoryPath}/`;
const INDEX_PATH = `${ROOT_PATH}index.json`;

function readIndex() {
  return RNFS.readFile(INDEX_PATH, "utf8");
}

function allPodcasts() {
  return readIndex()
    .then(parsedIndex => {
      return JSON.parse(parsedIndex)
        .map(fromStorage)
        .map(PodcastFactory.create);
    })
    .catch(() => []);
}

function saveToIndex(podcast) {
  readIndex()
    .then(JSON.parse)
    .then(parsedIndex => {
      writePodcastToIndex(parsedIndex, podcast);
    })
    .catch(error => handleErrors(error, podcast));
}

function handleErrors(error, podcast) {
  if (isFileNotExistError(error)) {
    RNFS.writeFile(INDEX_PATH, JSON.stringify([podcast]), "utf8");
  } else {
    throw error;
  }
}

function isFileNotExistError(error) {
  const noFileErrorMessage = RegExp("No such file or directory", "ig");
  return noFileErrorMessage.test(error.message);
}

function writePodcastToIndex(index, podcast) {
  const foundPodcast = index.find(indexItem => {
    return indexItem.identifier === podcast.getIdentifier();
  });

  if (!foundPodcast) {
    RNFS.writeFile(INDEX_PATH, JSON.stringify([...index, podcast]), "utf8");
  }
}

export const PodcastRepository = {
  addPodcast(podcast) {
    saveToIndex(podcast);
  },
  allPodcasts
};
