;
(() => {
  //轮播图的地址
  let imgLinks = [
    { url: '/img/1.jpg', target: 'javascript:void(0)' },
    { url: '/img/2.png', target: 'javascript:void(0)' },
    { url: '/img/3.png', target: 'javascript:void(0)' }
  ]

  // 生成元素
  createSelect = () => {
    const res = { points: [], pictures: [] }
    imgLinks.forEach(n => {
      let node = document.createElement('a')
      node.href = 'javascript:void(0)'
      node.classList.add('item')
      if (n === imgLinks[0]) {
        node.classList.add('item-active')
      }
      res.points.push(node)
      let picture = document.createElement('a')
      picture.href = n.target
      picture.classList.add('link-picture')
      let img = document.createElement('img')
      img.src = n.url
      img.classList.add('sliders-img')
      picture.appendChild(img)
      res.pictures.push(picture)
    })
    return res
  }

  //生成虚化背景
  let filterCreate = (img) => {
    let res = document.createElement('div')
    res.classList.add('sliders-bg')
    res.style.backgroundImage = `url('${img.url}')`
    return res
  }

  // 轮播图编号，默认-1，加载完成后会初始化为0
  let currentSlide = -1

  //轮播时间
  let loopTime = 6000

  // 定时器
  let slidersTimers = null

  // 获取图片区域
  let pictureList = document.querySelector('#sliders-picture')

  // 获取选择点区域
  let selectPointer = document.querySelector('#sliders-select')

  //容器
  let slidersContainer = document.querySelector('.sliders-container')

  //定位元素
  let imgContainer = document.querySelector('#sliders-img-container')

  //初始元素
  let pictureInfo = null

  // 虚化背景
  let fliterBg = null

  let init = () => {
    // 虚化背景
    fliterBg = filterCreate(imgLinks[0])
    slidersContainer.insertBefore(fliterBg, imgContainer)

    pictureInfo = createSelect()

    //生成点加入到页面
    pictureInfo.points.forEach(n => {
      selectPointer.appendChild(n)
    })
    pictureList.appendChild(pictureInfo.pictures[0])
    currentSlide = 0
  }

  const selectSlider = (index, isLeft) => {
    if (index > imgLinks.length - 1) {
      index = 0
    }
    if (index < 0) {
      index = imgLinks.length - 1
    }

    //选择点
    Array.from(selectZone.children).forEach(n => {
      n.classList.remove('item-active')
    })
    pictureInfo.points[index].classList.add('item-active')

    //动画过渡效果开始

    // pictureInfo.pictures[currentSlide].children[0].style.opacity = 0.5
    // pictureInfo.pictures[currentSlide].children[0].addEventListener('transitionend', () => {

    // })

    //动画过渡效果结束
    slidersContainer.removeChild(fliterBg)
    fliterBg = filterCreate(imgLinks[index])
    slidersContainer.insertBefore(fliterBg, imgContainer)
    if (isLeft) {
      pictureInfo.pictures[index].children[0].style.left = '-1000px'
      pictureInfo.pictures[index].children[0].style.animation = 'img_leave 1.5s linear forwards;'
    } else {
      pictureInfo.pictures[index].children[0].style.left = '1000px'
      pictureInfo.pictures[index].children[0].style.animation = 'img_entry 1.5s linear forwards;'
    }
    pictureList.removeChild(pictureInfo.pictures[currentSlide])
    pictureList.appendChild(pictureInfo.pictures[index])
    currentSlide = index



  }

  // 点击选择点区域添加样式
  let selectZone = document.querySelector('.sliders-select')
  selectZone.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      let clickIndex = pictureInfo.points.findIndex(n => n === e.target)
      let flag = false
      if (clickIndex === currentSlide) {
        return
      } else if (clickIndex > currentSlide) {
        flag = false
      } else {
        flag = true
      }
      selectSlider(clickIndex, flag)
      Array.from(selectZone.children).forEach(n => {
        n.classList.remove('item-active')
      })
      e.target.classList.add('item-active')
    }
  })

  let leftBtn = document.querySelector('#sliders-bt-left')
  let rightBtn = document.querySelector('#sliders-bt-right')

  //左边按钮
  leftBtn.addEventListener('click', (e) => {
    selectSlider(currentSlide - 1, true)
  })

  //右边按钮
  rightBtn.addEventListener('click', (e) => {
    selectSlider(currentSlide + 1, false)
  })

  slidersTimers = setInterval(() => {
    selectSlider(currentSlide + 1, false)
  }, loopTime)

  //鼠标移入时停止自动播放
  slidersContainer.addEventListener('mouseenter', (e) => {
    clearInterval(slidersTimers)
  })

  //鼠标移出时开启自动播放
  slidersContainer.addEventListener('mouseleave', (e) => {
    slidersTimers = setInterval(() => {
      selectSlider(currentSlide + 1, false)
    }, loopTime)

  })

  //初始化
  init()

})()