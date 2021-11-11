//搜索框按钮
let searchBtn = document.querySelector('button[type=submit]')
searchBtn.addEventListener('click', () => {
    console.log('搜索框按钮');
  })
  //左侧导航鼠标移动效果
let NavLeft = document.querySelector('.left')
NavLeft.addEventListener('mouseover', (e) => {
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

//用户头像hover效果
let navAvatar = document.querySelector('.avatar-container')
let profilePanel = document.querySelector('.profile-panel')
let userAvatarLi = document.querySelector('#nav-user-avatar')
userAvatarLi.addEventListener('mouseover', (e) => {
  navAvatar.classList.add('nav-avatar-hover')
  profilePanel.classList.add('profile-panel-hover')
})

userAvatarLi.addEventListener('mouseout', (e) => {
  navAvatar.classList.remove('nav-avatar-hover')
  profilePanel.classList.remove('profile-panel-hover')
})