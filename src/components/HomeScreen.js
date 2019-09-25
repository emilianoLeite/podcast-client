import React from 'react';
import { parse } from 'react-native-rss-parser';

import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this._rssItems = this._rssItems.bind(this);
  }

  componentDidMount() {
    return fetch('https://rss.simplecast.com/podcasts/282/rss')
      .then((response) => response.text())
      .then(parse)
      .then((rss) => this.setState({ rss }))
      .catch(console.error);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Get started by opening</Text>
          </View>

          {this._rssItems()}

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  _rssItems() {
    console.warn(this.state.rss)
    if (this.state.rss) {
      return (
        <RSSItem item={this.state.rss.items[0]} />
      )
    } else {
      <Text> Loading...</Text>
    }
  }
}

const rssStyles = StyleSheet.create({
  rssItem: {
    backgroundColor: '#EEEEEE',
    borderColor: "black",
    borderWidth: 1,
    padding: 4,
  }
});

function RSSItem({ item, navigation }) {
  return (
    <View style={rssStyles.rssItem}>
      <Text >
        {item.title}
      </Text>
      <Button title={"Download"} />
    </View>
  );
}

class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}
