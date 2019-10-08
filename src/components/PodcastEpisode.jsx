import React from "react";

import {
  StyleSheet,
  Button,
  Text,
  View,
} from 'react-native';

const RNFS = require("react-native-fs");
const Sound = require('react-native-sound');

Sound.setCategory('Playback');

const rssStyles = StyleSheet.create({
  rssItem: {
    backgroundColor: '#EEEEEE',
    borderColor: "black",
    borderWidth: 1,
    padding: 4,
  }
});

export function PodcastEpisode({ item }) {
  return (
    <View style={rssStyles.rssItem}>
      <Text>{item.title}</Text>
      <Button
        title={"Download"}
        onPress={() => {
          const enclosure = item.enclosures[0];

          var path = `${RNFS.DocumentDirectoryPath}podcast_name.mp3`;
          console.warn(path);

          RNFS.downloadFile({
            fromUrl: enclosure.url,
            toFile: path,
          }).promise.then((success) => {
            console.warn('FILE WRITTEN!');

            let episode = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
              console.warn('entrou');

              if (error) {
                console.warn('failed to load the sound', error);
                return;
              }
              // loaded successfully
              console.warn(
                'duration in seconds: ' +
                episode.getDuration() +
                'number of channels: ' +
                episode.getNumberOfChannels(),
              );

              // Play the sound with an onEnd callback
              episode.play((success) => {
                if (success) {
                  console.warn('successfully finished playing');
                } else {
                  console.warn('playback failed due to audio decoding errors');
                }
              });
            });

            console.warn(Object.keys(item));
          });
        }}
      />

      <Button
        title={"Play"}
        onPress={() => {
          var path = `${RNFS.DocumentDirectoryPath}podcast_name.mp3`;

          console.warn('FILE WRITTEN!');

          let episode = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
            console.warn('entrou');

            if (error) {
              console.warn('failed to load the sound', error);
              return;
            }
            // loaded successfully
            console.warn(
              'duration in seconds: ' +
              episode.getDuration() +
              'number of channels: ' +
              episode.getNumberOfChannels(),
            );

            // Play the sound with an onEnd callback
            episode.play((success) => {
              if (success) {
                console.warn('successfully finished playing');
              } else {
                console.warn('playback failed due to audio decoding errors');
              }
            });
          });
        }}
      />
    </View>
  );
}
