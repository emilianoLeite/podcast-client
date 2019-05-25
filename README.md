# podcast-client

## Goals
- ...

## Roadmap

### V0.1
- [ ] show list of specific hard-coded podcast
  - Listing individual episodes is not possible because the rss feed already returns all the podcast`s episodes
  - [ ] Read RSS URL
 - [ ] Download episode
  - [ ] Persist locally
- [ ] play dowloaded episode

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
