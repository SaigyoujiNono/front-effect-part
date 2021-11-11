//搜索框按钮
let searchBtn = document.querySelector('button[type=submit]')
searchBtn.addEventListener('click', () => {
    console.log('搜索框按钮');
  })
  //左侧导航鼠标移动效果
let NavLeft = document.querySelector('.left')
NavLeft.addEventListener('mouseover', (e) => {
  console.log('鼠标移入');
  if (e.target.tagName === 'A') {
    e.target.classList.add('item-hover')
  }
})
NavLeft.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'A') {
      e.target.classList.remove('item-hover')
    }
  })
  //右侧导航鼠标移动效果
let NavRight = document.querySelector('.right')
NavRight.addEventListener('mouseover', (e) => {
  console.log('鼠标移入');
  if (e.target.tagName === 'A') {
    e.target.classList.add('item-hover')
  }
})
NavRight.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'A') {
      e.target.classList.remove('item-hover')
    }
  })
  //search内容list效果
let searchContentList = document.querySelector('.search-content')
searchContentList.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'A') {
    e.target.classList.add('li-a-hover')
  }
})
searchContentList.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'A') {
      e.target.classList.remove('li-a-hover')
    }
  })
  //搜索框获得焦点的时候展示search内容list效果
let searchInput = document.querySelector('#nav-search')
searchInput.addEventListener('focus', (e) => {
  searchContentList.classList.add('search-content-active')
})
searchInput.addEventListener('blur', (e) => {
  searchContentList.classList.remove('search-content-active')
})