new Vue({
  el: '#app',
  data () {
    return {
      stories,
      showList: true,
      currentStory: '',
      audioLink: ''
    }
  },
  methods: {
    showStory (story) {
      var vm = this
      // console.log(story)

      // var audioPlayer = document.querySelector('#audioPlayer');
      // audioPlayer.src = ;
      // audioPlayer.play();
      vm.audioLink = story.link

      var url = 'data/' + this.normalizeFileName(story.title)
      // console.log(url)
      fetch(url)
        .then(response => response.text())
        .then(htmlCode => {
          console.log(htmlCode)
          vm.showList = false
          vm.currentStory = htmlCode
        })
    },

    returnListView () {
      this.showList = true
    },

    normalizeFileName (title) {
      return title.toLowerCase().replace(/\s+/g, '_').replace(/'/g, '') + '.html'
    }
  },

  mounted () {
    // displayStory(data[0]);
    createMediaPlayer('#audioPlayer');
  }
});
