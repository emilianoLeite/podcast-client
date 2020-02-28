import React from "react";
import { parse } from "react-native-rss-parser";

import { StyleSheet, Text, View, TextInput } from "react-native";
import { PodcastRepository } from "../Repository/Podcast";
import { fromRss } from "../Application/mappers/podcast";
import PodcastFactory from "../Domain/Factories/PodcastFactory";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  input: {
    borderWidth: 1
  }
});

function savePodcast(url) {
  fetch(url)
    .then(response => response.text())
    .then(parse)
    .then(fromRss)
    .then(mapped => {
      PodcastRepository.addPodcast(PodcastFactory.create(mapped));
    })
    .then(() => {
      console.warn("DEU BOM");
    })
    .catch(console.error);
}

export default function PodcastInput() {
  const [value, setValue] = React.useState("");

  return (
    <View style={styles.container}>
      <Text>INPUT RSS URL</Text>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        onSubmitEditing={() => savePodcast(value)}
      ></TextInput>
    </View>
  );
}
