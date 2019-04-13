<template>
    <div class="popover fade bs-popover-top popover-tag">
        <div class="arrow" style="left: calc(50% - 10px)"></div>
        <h3 class="popover-header">Lựa chọn Tag</h3>
        <div class="popover-body">
            <select2 v-model="tag" ref="select2" :options="options" width="150px" placeholder="Chọn tag..."/>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "TagChosen",
    data() {
      return {
        options: [],
        tag: null
      }
    },
    computed: {
      ...mapState({
        currentTagNode: state => state.tag.currentTagNode,
        tagsArr: state => state.tag.tagsArr
      })
    },
    beforeMount() {
      this.options = this.tagsArr
      this.tag = null
    },
    mounted() {
      this.handleClickOutside()
    },
    methods: {
      handleClickOutside() {
        $(document).mouseup(
          function (e) {
            const el = $(this.$el)

            let target = $(e.target)

            if (!target.hasClass('select2-results__option')) {
              if (!el.is(e.target) && el.has(e.target).length === 0) {
                this.$store.commit('tag/setCurrentTagNode', null)
              }
            }

          }.bind(this)
        )
      },
    },
    watch: {
      async currentTagNode(node) {
        if (node) {
          let popoverWidth = 173
          let popoverHeight = 88
          let position = node.position()
          let width = node.width()

          let tagName = this.currentTagNode.find('.tag-name-text').text()
          let tagObj = this.options.find(item => item.text === tagName)

          if (tagObj) {
            this.tag = tagObj
          } else {
            this.tag = null
          }

          await this.$nextTick()

          $(this.$el).offset({
            top: position.top - popoverHeight - 2,
            left: position.left + width / 2 - popoverWidth / 2
          }).addClass('show')

          this.$refs.select2.open()
        } else {
          this.tag = null
          $(this.$el).removeClass('show')
          this.$refs.select2.close()
        }
      },
      tag(val) {
        if (val) {
          if (this.currentTagNode) {
            this.currentTagNode.removeClass('tag-temp')
            let tagName = this.currentTagNode.find('.tag-name-text')
            tagName.html(val.text)
          }
        }

        $(this.$el).removeClass('show')
        this.$refs.select2.close()
      }
    }
  }
</script>

<style>
    .select2-dropdown {
        z-index: 9999;
    }

    .popover-tag:not(.show) {
        top: -99999px !important;
        left: -99999px !important;
    }
</style>
