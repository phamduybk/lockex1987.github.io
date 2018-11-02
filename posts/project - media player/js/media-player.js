/**
 * Return the given SRT timestamp as milleseconds.
 * @param {string|number} timestamp
 * @returns {number} milliseconds
 */
function toSecond(srtTimestamp) {
  // Là số rồi thì trả về luôn
  if (!isNaN(srtTimestamp)) {
    return srtTimestamp;
  }

  // Có dạng hh:mm:ss,ZZZ
  const match = srtTimestamp.match(/^(?:(\d{2,}):)?(\d{2}):(\d{2})[,.](\d{3})$/);

  if (!match) {
    throw new Error('Invalid SRT or VTT time format: "' + srtTimestamp + '"');
  }

  const hours = match[1] ? parseInt(match[1], 10) * 3600 : 0;
  const minutes = parseInt(match[2], 10) * 60;
  const seconds = parseInt(match[3], 10);
  const milliseconds = parseFloat(match[4], 10) / 1000;
  return hours + minutes + seconds + milliseconds;
}

/**
 * Chuyển cả dòng thời gian.
 * @param value
 * @returns {{start: Number, end: Number}}
 */
function parseTimestamps(value) {
  // Timestamp regex
  const regex = /^((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3}) --> ((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3})(?: (.*))?$/;
  const match = regex.exec(value);
  const cue = {
    start: toSecond(match[1]),
    end: toSecond(match[2])
  };
  return cue;
}

/**
 * Parse an SRT string.
 * @param {String} srtString
 * @return {Array} subtitles
 */
function parseSrtText(srtString) {
  if (!srtString) {
    return [];
  }

  // Chuẩn hóa và tách thành mảng
  const source = srtString
    .trim()
    .concat('\n')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n');

  return source.reduce((captions, row, index) => {
    // Lấy phần tử cuối cùng của mảng hiện tại
    const caption = captions[captions.length - 1];

    // Nếu mà chưa có index
    // thì kiểm tra dòng đó có phải là index không
    if (!caption.index) {
      if (/^\d+$/.test(row)) {
        caption.index = parseInt(row, 10);
        return captions;
      }
    }

    // Nếu mà chưa có thuộc tính start thì
    if (!caption.hasOwnProperty('start')) {
      Object.assign(caption, parseTimestamps(row));
      return captions;
    }

    // Nếu là xâu rỗng thì là chuẩn bị để bắt đầu 1 phần tử mới
    // Nếu không thì sẽ là nội dung
    if (row === '') {
      delete caption.index;
      if (index !== source.length - 1) {
        captions.push({});
      }
    } else {
      caption.text = caption.text
        ? caption.text + '\n' + row
        : row;
    }

    return captions;
  }, [{}]);
}

function parseLrcText(text) {
  var a = text.split('\n');
  var result = [];
  a.forEach(function(line) {
    // Kiểm tra xem có chứa xâu thời gian không
    var timeAnchors = line.match(/\d+:\d+\.\d+/g);
    if (!timeAnchors) {
      return;
    }
    
    var _t = line.split("]");
    var text = _t[_t.length - 1];
    timeAnchors.forEach(function(anchor) {
      var _r = anchor.split(":").map(parseFloat);
      var time = _r[0] * 60 + _r[1];
      result.push({
        start: time,
        text: text
      });
    });
  });

  // Cập nhật giá trị end
  for (var i = 0; i < result.length - 1; i++) {
    result[i].end = result[i + 1].start;
  }
  result[result.length - 1].end = -1;

  return result;
}
