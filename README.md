# podcast-client

## Goals
- ...

## Roadmap

### V0.1

- [X] show list of specific hard-coded podcast
  - Listing individual episodes is not possible because the rss feed already returns all the podcast`s episodes
- [X] Show Episode Detail
- [ ] Download episode
  - [ ] Persist locally
    - https://docs.expo.io/versions/latest/sdk/filesystem/
- [ ] play dowloaded episode
  - https://github.com/react-native-community/react-native-audio-toolkit/issues/97

### V0.2
- [ ] show list of hard-coded podcasts
- [ ] stream episode
- [ ] manual refresh of the list

## Tech Spec

- react-native
  - expo
  - typescript
  - [native-testing-library](https://testing-library.com/docs/native-testing-library/intro) for unit tests
  - [detox](https://github.com/wix/Detox) for e2e tests
 - graphQL
- deploy to netlify
