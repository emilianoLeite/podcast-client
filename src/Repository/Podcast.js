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

function saveToDisk(podcastEntity) {
  // TODO: Enteder pq isso sempre dá throw quando adicionando
  // um podcast novo
  const path = `${
    RNFS.DocumentDirectoryPath
  }/podcasts/${podcastEntity.getIdentifier()}.json`;
  RNFS.writeFile(path, JSON.stringify(podcastEntity), "utf8");
}

function saveToIndex(podcast) {
  readIndex()
    .then(result => {
      console.warn("index", result);
      return result;
    })
    .then(JSON.parse)
    .then(parsedIndex => {
      writePodcastToIndex(parsedIndex, podcast);
    })
    .catch(error => handleErrors(error, podcast));
}

function handleErrors(error, podcast) {
  if (isFileNotExistError(error)) {
    RNFS.writeFile(INDEX_PATH, JSON.stringify([podcast]), "utf8");
    console.warn("CRIEI");
  } else {
    throw error;
  }
}

function isFileNotExistError(error) {
  const noFileErrorMessage = RegExp("No such file or directory", "ig");
  return noFileErrorMessage.test(error.message);
}

function writePodcastToIndex(index, podcast) {
  console.warn(index.length);

  const foundPodcast = index.find(indexItem => {
    return indexItem.identifier === podcast.getIdentifier();
  });

  if (!foundPodcast) {
    RNFS.writeFile(INDEX_PATH, JSON.stringify([...index, podcast]), "utf8");
  }
}

export const PodcastRepository = {
  addPodcast(podcast) {
    saveToDisk(podcast);
    saveToIndex(podcast);
  },
  allPodcasts
};
