const RNFS = require("react-native-fs");

const ROOT_PATH = `${RNFS.DocumentDirectoryPath}/`;
const INDEX_PATH = `${ROOT_PATH}index.json`;

function readIndex() {
  return RNFS.readFile(INDEX_PATH, "utf8");
}

function allPodcasts() {
  return readIndex.then(() => {
    /*....*/
  });
}

function saveToDisk(podcastEntity) {
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
    throw x;
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
  }
};
