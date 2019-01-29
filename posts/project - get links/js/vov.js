// http://vov2.vov.vn/doc-truyen-dem-khuya-c11-p1.aspx
// http://vov2.vov.vn/doc-truyen-dem-khuya-c11-p25.aspx

// Danh sách truyện
var stories = []

/**
 * Từ trang danh sách, trích xuất các truyện để thêm vào danh sách truyện.
 * @param {String} htmlCode Mã HTML của trang danh sách
 */
function extractListPage(htmlCode) {
  var parser = new DOMParser()
  var doc = parser.parseFromString(htmlCode, 'text/html');
  doc.querySelectorAll('.story').forEach(function(story) {
    var imageLink = story.querySelector('.img img').src
    
    // Xóa thời gian ở tiêu đề
    var timeTag = story.querySelector('.title a .time')
    timeTag.parentNode.removeChild(timeTag)

    var title = story.querySelector('.title').textContent.trim()
    var description = story.querySelector('.moreless-content').textContent
    var storyLink = story.querySelector('.title a').href
    var obj = {
      title,
      description,
      imageLink,
      storyLink
    }
    //console.log(JSON.stringify(obj, null, 2))
    stories.push(obj)
  })
}

/**
 * Lấy danh sách tất cả các truyện.
 */
function getStories() {
  var promises = []
  var numberOfPages = 25; // 25

  for (var page = 1; page <= numberOfPages; page++) {
    var url = `http://vov2.vov.vn/doc-truyen-dem-khuya-c11-p${page}.aspx`
    var p = fetch(url)
        .then(response => response.text())
        .then(htmlCode => extractListPage(htmlCode))
    promises.push(p)
  }

  // Chờ thực hiện xong tất cả thì hiển thị
  Promise
      .all(promises)
      .then(() => {
        //console.log(`All: ${stories.length}`)
        var text = JSON.stringify(stories, null, 2)
        saveTextAsFile(text, 'stories.json')
      })
}

getStories()


// -------------------------------------------------------------------------------------------

stories = [
  {
    "title": "Truyện ngắn \"Tiếng đất\" hay chính là tiếng gọi lương tri? 14/8/2018",
    "description": "Hình ảnh ám ảnh người đọc, người nghe bắt đầu từ bát yến cho mẹ già ăn không phải từ món yến đắt đỏ mà những đứa con bất hiếu ấy đã nạo từ quả đu đủ, đánh lừa bà. Và tệ hơn nữa, là mong bà chóng chết để chúng mau chóng thực hiện ý đồ bán hết đất đai mà ông bà dày công vun xới, giữ gìn. Người mẹ già bệnh tật nằm trong căn buồng tối om, không có đứa con nào hỏi han, chăm sóc, các con bà ở ngoài kia đang bày mưu tính kế chia chác đất đai. Truyện như một tiếng thở dài u uất và cay đắng...( V0V6 - Đọc truyện đêm khuya 13/8/2018)",
    "imageLink": "http://media.vov2.vn//UploadImages/vov2/vannghe/btvvannghe/15-10hinh-anh-nhung-con-duong-dep-tren-the-gioi6.jpg?w=180",
    "storyLink": "http://vov2.vov.vn/doc-truyen-dem-khuya/truyen-ngan-tieng-dat-hay-chinh-la-tieng-goi-luong-tri-c11-27678.aspx"
  }
]

// -------------------------------------------------------------------------------------------

// Bắt đấu xử lý từ truyện thứ mấy
var startIndex = 0

// Số truyện xử lý trong một lần
var noEachInterval = 10


/**
 * Trích xuất thông tin từ trang chi tiết truyện, cập nhật lại truyện (trường audioLink).
 * @param {String} htmlCode Mã HTML của trang chi tiết truyện
 * @param {Object} story Một truyện nào đó
 */
function extractDetailPage(htmlCode, story) {
  //console.log(htmlCode)
  var parser = new DOMParser()
  var doc = parser.parseFromString(htmlCode, 'text/html')

  var audioTag = doc.querySelector('#MainContent audio source')
  if (!audioTag) {
    console.log('Không có file âm thanh', story)
  } else {
    var audioLink = audioTag.src
    //console.log(audioLink)
    story.audioLink = audioLink
    //delete story.storyLink
  }
}

/**
 * Cập nhật thông tin cho một truyện nào đó.
 * @param {Object} story Đối tượng truyện
 */
function updateStory(story) {
  var p = fetch(story.storyLink)
        .then(response => response.text())
        .then(htmlCode => extractDetailPage(htmlCode, story))
  return p
}

/**
 * Cập nhật lại trường audioLink cho tất cả các truyện.
 */
function updateAudioLinks() {
  console.log('Interval', startIndex)
  var promises = []
  for (var i = startIndex; i < stories.length && i < startIndex + noEachInterval; i++) {
    var story = stories[i]
    var p = updateStory(story)
    promises.push(p)
  }

  // Chờ cho tất cả các tiến trình bất đồng bộ thực hiện xong
  Promise
      .all(promises)
      .then(() => {
        startIndex += noEachInterval
        if (startIndex < stories.length) {
          // Tiếp tục gọi vòng lặp khác, xử lý 10 truyện tiếp
          updateAudioLinks()
        } else {
          // Đã xử lý xong tất cả các truyện
          var text = JSON.stringify(stories, null, 2)
          //console.log(text)
          saveTextAsFile(text, 'stories_with_audio.json')
        }
      })
}

updateAudioLinks()
