<template>
  <div class="mt-5 mb-3">
    <div v-if="showList">
      <img src="@/assets/cover.jpg">

      <h1>{{ msg }}</h1>

      <ul>
        <li v-for="s in stories"
            :key="s.title">
          <a href="#" @click="showStory(s)">{{ s.title }}</a>
        </li>
      </ul>
    </div>

    <div v-else>
      <div>
        <audio id="audioPlayer" controls :src="audioLink"></audio>
      </div>

      <div v-html="currentStory" class="content"></div>

      <div>
        <button class="btn btn-success" @click="returnListView">
          Quay lại
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import stories from '@/data/stories'

export default {
  name: 'CTTD',
  data () {
    return {
      msg: 'The Adventures of Sherlock Holmes',
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

      var url = '../data/' + this.normalizeFileName(story.title)
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
    // createMediaPlayer('#audioPlayer');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.content {
  font-size: 18px;
  padding: 10px;
}
.content p {
  text-align: justify;
  line-height: 32px;
}
.content img {
  display: block;
  margin: 10px 5px;
}
.content dd {
  margin-left: 20px;
  color: green;
}
</style>
