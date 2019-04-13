<template>
    <div class="selection-tagging">It takes a team to produce good labeled data asd. But how do you manage a team of
        labelers?
    </div>
</template>

<script>
  import 'select2'

  export default {
    name: "SelectionTagging",
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        processingText: 'It takes a team to produce good labeled data. But how do you manage a team of labelers?'
      }
    },
    mounted() {
      this.init()
      this.handleEvents()

      setInterval(() => {
        console.log(this.getData())
      }, 3000)
    },
    methods: {
      init() {
        $(this.$el).on('mouseup', () => {
          let selection = window.getSelection()

          if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0)

            let str = range.toString()

            if (str.trim() !== ''
              && (
                range.commonAncestorContainer.childNodes.length === 0
                && range.commonAncestorContainer.parentElement
                && range.commonAncestorContainer.parentElement == this.$el
              )
              || (
                this.isAllTextNode(range.commonAncestorContainer.childNodes, range.startContainer, range.endContainer)
                && range.commonAncestorContainer.parentElement
                && range.commonAncestorContainer.parentElement == this.$el.parentElement
                && range.startContainer.parentElement == this.$el
                && range.endContainer.parentElement == this.$el
              )
            ) {
              //get full start word
              if (str.startsWith(' ')) {
                let splitStr = str.split(' ')
                let startIndex = splitStr.findIndex(item => item !== '')

                range.setStart(range.startContainer, range.startOffset + startIndex)
              } else {
                let startArr = range.startContainer.textContent.substring(0, range.startOffset).split(' ')
                if (startArr.length > 0 && startArr[startArr.length - 1] !== ' ') {
                  range.setStart(range.startContainer, range.startOffset - startArr[startArr.length - 1].length)
                  str = startArr[startArr.length - 1] + str
                }
              }

              //get full end word
              if (str.endsWith(' ')) {
                let splitStr = str.split('').reverse().join().split(' ')
                let endIndex = splitStr.findIndex(item => item !== '')

                range.setEnd(range.endContainer, range.endOffset - endIndex)
              } else {
                let endArr = range.endContainer.textContent.substring(range.endOffset).split(' ')
                if (endArr.length > 0 && endArr[0] !== ' ') {
                  range.setEnd(range.endContainer, range.endOffset + endArr[0].length)
                  str += endArr[0]
                }
              }

              //remove old content
              range.deleteContents()

              // add tag
              let wrapNode = document.createElement("span")
              wrapNode.setAttribute('class', 'tag-wrap tag-temp')

              let tagNode = document.createElement('div')
              tagNode.setAttribute('class', 'tag-node')
              tagNode.innerHTML = '<span class="tag-name-text">Chọn tag</span> <span class="tag-remove"> X </span> '

              let textNode = document.createElement('span')
              textNode.setAttribute('class', 'text-node')
              textNode.innerText = str.trim().replace(/(\r\n|\n|\r)/gm, "")

              wrapNode.appendChild(tagNode)
              wrapNode.appendChild(textNode)

              range.insertNode(wrapNode)

              range.detach()

              //remove selection
              selection.removeAllRanges()

              setTimeout(() => {
                this.$store.commit('tag/setCurrentTagNode', $(wrapNode))
              }, 10)
            }
          }
        })

        return ''
      },
      isAllTextNode(nodes, startNode, endNode) {
        let flag = true
        let inRange = false

        nodes.forEach(node => {
          if (node == startNode) {
            inRange = true
          }

          if (inRange && node.nodeType !== Node.TEXT_NODE) {
            flag = false
          }
          if (node == endNode) {
            inRange = false
          }
        })

        return flag
      },
      getData() {
        let nodeList = this.$el.childNodes
        let arr = []

        nodeList.forEach((item, index) => {
          if (item.nodeType === Node.TEXT_NODE) {
            let textArr = item.textContent.split(' ')
            textArr.forEach(str => {
              if (str !== '') {
                arr.push({
                  text: str,
                  tag: null
                })
              }
            })
          }

          if (item.nodeType === Node.ELEMENT_NODE) {
            let text = $(item).children('.text-node').text()
            let tag = $(item).find('.tag-name-text').text()

            if ($(item).hasClass('tag-temp')) {
              let textStr = text.split(' ')

              textStr.forEach(str => {
                if (str !== '') {
                  arr.push({
                    text: str,
                    tag: null
                  })
                }
              })
            } else {
              arr.push({
                text: text,
                tag: tag
              })
            }
          }
        })

        return arr
      },
      handleEvents() {
        let $this = this
        $(this.$el).on('click', '.tag-remove', function () {
          let tagNode = $(this).parents('.tag-wrap')
          let text = tagNode.children('.text-node').text()
          tagNode.replaceWith(text)
        })

        $(this.$el).on('click', '.tag-name-text', function () {
          let tagNode = $(this).parents('.tag-wrap')

          $this.$store.commit('tag/setCurrentTagNode', tagNode)
        })
      }
    }
  }
</script>

<style lang="scss">
    .tag-temp {
        .tag-node {
            background-color: #ffb822;
        }
    }

    .tag-wrap {
        border: 1px solid #e0e0e0;
        border-radius: 0.15em;
        display: inline-block;
        line-height: 1;
        position: relative;
        background: #eaeaea;
        padding: 0.4025rem;
        font-weight: 400;
        margin-right: 5px;
    }

    .tag-node {
        box-sizing: border-box;
        text-align: center;
        text-transform: uppercase;
        cursor: pointer;
        position: relative;
        padding: 3px 5px;
        background: #ED6A5A;
        font-size: 13px;
        border-radius: 1.61rem;
        color: #fff;
        margin-bottom: 3px;
    }

    .text-node {
        display: block;
        text-align: center;
    }

    .tag-remove {
        padding-left: 5px;
        padding-right: 5px;
        margin-left: 5px;
        border-left: 1px solid;
        float: right;

        &:hover {
            opacity: 0.5;
            transition: all ease-in 300ms;
        }
    }

    .selection-tagging {
        margin-bottom: 15px;
    }
</style>