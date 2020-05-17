import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Button, Text, View } from "react-native";
import { PlaybackControl } from "./PlaybackControl";

const RNFS = require("react-native-fs");
const Sound = require("react-native-sound");

Sound.setCategory("Playback");

const rssStyles = StyleSheet.create({
  rssItem: {
    backgroundColor: "#EEEEEE",
    borderColor: "black",
    borderWidth: 1,
    padding: 4
  }
});

const PodcastEpisode = ({ item }) => {
  const [episode, setEpisode] = React.useState();
  const [playing, setPlaying] = React.useState(false);
  const [fileLoaded, setFileLoaded] = React.useState(false);

  React.useEffect(() => {
    var path = `${RNFS.DocumentDirectoryPath}podcast_name.mp3`;

    setEpisode(
      new Sound(path, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.warn("failed to load the sound", error);
        } else {
          setFileLoaded(true);
        }
      })
    );
  }, []);

  return (
    <View style={rssStyles.rssItem}>
      <Text>{item.title}</Text>
      <Button
        title={"Download"}
        onPress={() => {
          const enclosure = item.enclosures[0];

          var path = `${RNFS.DocumentDirectoryPath}/podcast_name.mp3`;
          console.warn(path);

          RNFS.downloadFile({
            fromUrl: enclosure.url,
            toFile: path
            // eslint-disable-next-line no-unused-vars
          }).promise.then(_downloadResult => {
            let episode = new Sound(path, Sound.MAIN_BUNDLE, error => {
              if (error) {
                console.warn("failed to load the sound", error);
                return;
              }

              // Play the sound with an onEnd callback
              episode.play(success => {
                if (success) {
                  console.warn("successfully finished playing");
                } else {
                  console.warn("playback failed due to audio decoding errors");
                }
              });
            });

            console.warn(Object.keys(item));
          });
        }}
      />

      {/* Move this button to PlaybackControl */}
      <Button
        title={"Play"}
        onPress={() => {
          if (fileLoaded) {
            setPlaying(true);
            episode.play(success => {
              if (success) {
                console.warn("successfully finished playing");
              } else {
                console.warn("playback failed due to audio decoding errors");
              }
            });
          } else {
            // waitForLoadAndPlay();
          }
        }}
      />
      {playing && <PlaybackControl episode={episode} />}
    </View>
  );
};

PodcastEpisode.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    enclosures: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string }))
  })
};

export { PodcastEpisode };
