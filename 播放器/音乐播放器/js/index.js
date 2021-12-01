//触发播放暂停事件
let isPlay = false;
let control = document.getElementById('play-control-i')
control.classList.remove('fa-pause-circle-o')
control.classList.add('fa-play-circle-o')

function setIsPlay(val) {
  if (val) {
    control.classList.remove('fa-play-circle-o')
    control.classList.add('fa-pause-circle-o')
  } else {
    control.classList.remove('fa-pause-circle-o')
    control.classList.add('fa-play-circle-o')
  }
  isPlay = val
}

playground.addEventListener('play', () => {
  console.log('触发了播放事件');
  setIsPlay(true);
})

playground.addEventListener('pause', () => {
  console.log('触发了暂停事件');
  setIsPlay(false)
})

function audioPauseOrPlay() {
  if (isPlay) {
    playground.pause()
  } else {
    playground.play()
  }
}

count = 0;

function audioNext() {
  selectAudio(audioArray[count % 2])
  count++;
  playground.play()
}

function audioPre() {
  count--;
  if (count < 0) {
    count = audioArray.length - 1
  } else {
    count++;
  }
  selectAudio(audioArray[count % 2])
  playground.play()
}
//事件转换
function numToMinSecond(num) {
  if (num === 0) {
    return '00:00'
  }
  if (num < 60) {
    return '00:' + (parseInt(num * 1) < 10 ? '0' + parseInt(num * 1) : parseInt(num * 1))
  }
  return parseInt(num / 60) + ':' + (parseInt(num % 60) < 10 ? '0' + parseInt(num % 60) : parseInt(num % 60))
}
//歌单数组
let audioArray = [
    { title: '一瞬', author: 'An', url: 'An - 一瞬.mp3', img: './img/1.jpeg' },
    { title: 'Town of Windmill', author: 'a_hisa', url: 'a_hisa - Town of Windmill.mp3', img: 'https://mqd-online-edu.oss-cn-guangzhou.aliyuncs.com/2021/11/24/8f496c41a52e41a09983e105f5ef207d.jpg' },
  ]
  //进度条
let audioCurrent = document.getElementById('audio-current')
let audioTotal = document.getElementById('audio-total')

//标题获取
let audioImg = document.getElementById('audio-img')
let audioTitle = document.getElementById('audio-title')
let audioAuthor = document.getElementById('audio-author')

//进度条
let currentProgress = document.getElementById('progress-current')

//进度条容器
let audioProgress = document.getElementById('audio-progress')

//缓存条
let cacheProgress = document.getElementById('progress-cache')

//音量条
let volumeProgress = document.getElementById('volume-progress')

let volumeCurrent = document.getElementById('volume-current')

//改变进度条函数
function changeProgress() {
  let cur = playground.currentTime / playground.duration
  currentProgress.style.width = cur * 100 + '%'
  audioTotal.innerHTML = numToMinSecond(playground.duration)
  audioCurrent.innerHTML = numToMinSecond(playground.currentTime)
}
//改变缓存条
function changeCache() {
  const timeRanges = playground.buffered
  let cache = timeRanges.end(timeRanges.length - 1) / playground.duration
  cacheProgress.style.width = cache * 100 + '%'
}
//改变标题
function changeTitle(audio) {
  audioImg.src = audio.img
  audioTitle.innerHTML = audio.title
  audioAuthor.innerHTML = audio.author
}

//选择音乐
function selectAudio(audio) {
  playground.removeEventListener('suspend', changeCache)
  playground.src = './audio/' + audio.url
  changeTitle(audio)
}

playground.addEventListener('ended', (e) => {
  audioNext()
})

playground.addEventListener('timeupdate', changeProgress)
playground.addEventListener('canplaythrough', () => {
  console.log('canplaythrough');
  playground.addEventListener('suspend', changeCache)
})
playground.addEventListener('playing', (e) => {

})
playground.addEventListener('durationchange', (e) => {
  volumeCurrent.style.width = playground.volume * volumeProgress.offsetWidth + 'px'
  console.log('durationchange')
})

playground.addEventListener('loadeddata', (e) => {
  audioTotal.innerHTML = numToMinSecond(playground.duration)
  audioCurrent.innerHTML = numToMinSecond(playground.currentTime)
  changeProgress()
  changeCache()
})
playground.addEventListener('volumechange', (e) => {
  console.log('volumechange')
})

// 进度条
audioProgress.addEventListener('click', (e) => {
  if (!e.target.classList.contains('progress-cursor') && e.target.tagName !== 'SPAN') {
    let offsetAudio = e.offsetX / audioProgress.offsetWidth
    playground.currentTime = playground.duration * offsetAudio
  }

})

volumeProgress.addEventListener('click', (e) => {
  if (e.target.classList.contains('progress-current') || e.target.classList.contains('volume-progress')) {
    let offsetAudio = e.offsetX / volumeProgress.offsetWidth
    playground.volume = offsetAudio
    volumeCurrent.style.width = volumeProgress.offsetWidth * (e.offsetX / volumeProgress.offsetWidth) + 'px'
  }

})