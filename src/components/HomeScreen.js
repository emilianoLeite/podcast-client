import React from "react";
import { parse } from "react-native-rss-parser";
import { PlaybackControl } from "./PlaybackControl";
import { PodcastEpisode } from "./PodcastEpisode";

import { ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.state = { displayControls: false }
    this._rssItems = this._rssItems.bind(this);
  }

  componentDidMount() {
    fetch("https://rss.simplecast.com/podcasts/282/rss")
      .then(response => response.text())
      .then(parse)
      .then(rss => this.setState({ rss }))
      .catch(console.error);
    // var path = `${RNFS.DocumentDirectoryPath}podcast_name.mp3`;
    // RNFS.stat(path).then((statResult) => {
    //   if (statResult.isFile()) {
    //     this.setState({ displayControls: true })
    //   }
    // });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Get started by opening</Text>
          </View>

          {this._rssItems()}
          {this.state.displayControls ? <PlaybackControl /> : <View />}
        </ScrollView>
      </View>
    );
  }

  _rssItems() {
    if (this.state.rss) {
      return <PodcastEpisode item={this.state.rss.items[0]} />;
    } else {
      return <Text> Loading...</Text>;
    }
  }
}

import { /*View, */ TouchableOpacity /*Text*/ } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const exampleData = [...Array(20)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));
class Example extends Component {
  state = {
    data: exampleData
  };

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? "blue" : item.backgroundColor,
          alignItems: "center",
          justifyContent: "center"
        }}
        onLongPress={drag}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 32
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => this.setState({ data })}
        />
      </View>
    );
  }
}

export default Example;
