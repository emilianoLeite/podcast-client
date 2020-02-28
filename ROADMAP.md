# ROADMAP

## MVP

- [x] Download a file

  - https://github.com/itinance/react-native-fs
    - https://facebook.github.io/react-native/docs/permissionsandroid
    - https://stackoverflow.com/questions/44546199/how-to-download-a-file-with-react-native
  - https://github.com/react-native-community/async-storage

- [x] Playback a local file

- [x] Playback control

- [x] Save podcasts by inputing rss

- [x] List saved podcasts

- [X] Fix index read attempt upon first installation

- [X] Investigate if files are actually being persited to Disk
  - _Everytime_ that we try to save a podcast, the RNFS.writeFile throws an `ENOENT: open failed: ENOENT (No such file or directory), open '/data/user/0/com.podcast_client/files/podcasts/...` error
  - (but the podcast is correctly saved on index)
  - **Solution**: we were trying to create a file in a folder that did not yet existed
  - **Solution2**: we deleted Repository#saveToDisk because we do not remember its purpose

- [X] Render podcast title instead of identifier

- [ ] Stream an episode

- [ ] Playback control from notification

- [ ] Compose and rearranje reproduction playlist

- [ ] Jump 10 seconds foward; Jump 10 seconds backwards

  - This is necessary because we are not saving episode progress yet

- [ ] Delete local episode
