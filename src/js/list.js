window.onload = function () {
  //导航栏二级菜单
  getList()

  function getList() {
    $.ajax({
      url: '../lib/nav_top.json',
      dataType: 'json',
      success: function (res) {
        console.log(res)

        // 4-1. 准备一个空字符串
        let str = ''

        // 4-2. 渲染一级的 li
        res.forEach(item => {
          str += `<li>${item.name}</li>`
        })

        // 4-3. 填充到 nav_top 里面的 ul 里面
        $('.nav_top  ul')
          .html(str)
          .on({
            mouseenter: () => $('.nav_box').stop().slideDown(),
            mouseleave: () => $('.nav_box').stop().slideUp()
          })
          .children('li') // 找到所有的一级菜单下的 li
          .on('mouseover', function () {
            // 5-1. 知道自己移入的时哪一个 li
            const index = $(this).index()
            // 5-2. 找到要渲染的数组
            const list = res[index].list
            // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
            let str = ''

            // 5-4. 进行组装
            list.forEach(item => {
              str += `
                  <li>
                    <div>
                      <img src="${ item.list_url}" alt="">
                    </div>
                    <p class="title">${ item.list_name}</p>
                    <span class="price">${ item.list_price}</span>
                  </li>
                `
            })

            // 5-5. 填充到页面里面
            $('.nav_box > ul').html(str)
          })

        // 4-4. 给 nav_box 添加一个移入移出事件
        $('.nav_box')
          .on({
            mouseover: function () { $(this).finish().show() },
            mouseout: function () { $(this).finish().slideUp() }
          })
      }
    })
  }


  getList2()

  function getList2() {
    $.ajax({
      url: '../lib/nav_list2.json',
      dataType: 'json',
      success: function (res) {
        console.log(res)

        // 4-1. 准备一个空字符串
        let str = ''

        // 4-2. 渲染一级的 li
        res.forEach(item => {
          str += `<a href="./list.html"><li>${item.name}</li></a>`
        })

        // 4-3. 填充到 nav_top 里面的 ul 里面
        $('.nav_list  ul')
          .html(str)
          .on({
            mouseenter: () => $('.list_box').stop().show(),
            mouseleave: () => $('.list_box').stop().hide()
          })
          .children('a') // 找到所有的一级菜单下的 li
          .on('mouseover', function () {
            // 5-1. 知道自己移入的时哪一个 li
            const index = $(this).index()
            // 5-2. 找到要渲染的数组
            const list = res[index].list
            // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
            let str = ''

            // 5-4. 进行组装
            list.forEach(item => {
              str += `
                  <li>
                    <div>
                      <img src="${ item.list_url}" alt="">
                    </div>
                    <p class="title">${ item.list_name}</p>
                  </li>
                `
            })

            // 5-5. 填充到页面里面
            $('.list_box > ul').html(str)
          })

        // 4-4. 给 nav_box 添加一个移入移出事件
        $('.list_box')
          .on({
            mouseover: function () { $(this).finish().show() },
            mouseout: function () { $(this).finish().hide() }
          })
      }
    })
  }




  $('.all')
    .on({
      mouseenter: () => $('.nav_list').stop().show(),
      mouseleave: () => $('.nav_list').stop().hide(1000)
    })


  $('.nav_list')
    .on({
      mouseover: function () { $(this).finish().show() },
      mouseout: function () { $(this).finish().hide() }
    })

  $('.list_box')
    .on({
      mouseenter: () => $('.nav_list').stop().show(),
      mouseleave: () => $('.nav_list').stop().hide()
    })


    // 准备两个变量
    let currPage = 1
    let flag = true
    // 准备一个变量接收数组
    let list = []

    getList4()
    function getList4() {
      $.ajax({
        url: '/dm',
        data: {
          keyword: '',
          cty: '',
          ctl: '演唱会',
          sctl: '',
          tsg: 0,
          st: '',
          et: '',
          order: 1,
          pageSize: 30,
          currPage: currPage,
          tn: ''
        },
        dataType: 'json',
        success: function (res) {
          // 执行渲染页面的函数
          bindHtml(res.pageData.resultData)

          // 执行渲染分页器的函数
          flag && bindPagi(res.pageData.totlaPage)

          // 把数组保存以下
          list = res.pageData.resultData
        }
      })
    }

    function bindHtml(list) {
      // 渲染页面
      // console.log(list)
      let str = ''
      list.forEach(item => {
        str += `
          <li data-id="${ item.id }">
            <img src="${ item.verticalPic }" alt="">
            <p>${ item.name }</p>
          </li>
        `
      })
      $('.goodsList > ul').html(str)
    }

    function bindPagi(totalPage) {
      // 关闭开关
      flag = false

      $('.pagi').pagination({
        pageCount: totalPage, // 总页数
        current: 1, // 当前页
        jump: true,
        coping: true,
        homePage: '首页', // 首页按钮的文本
        endPage: '末页', // 末页按钮的文本
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) { // 当你切换页面的时候会触发
          // 每次执行的时候改变一下全局 currPage
          currPage = api.getCurrent()

          // 从新执行以下 getList()
          getList4()
        }
      })
    }

    // 2. 事件委托的形式给每一个 li 添加点击事件
    $('.goodsList > ul').on('click', 'li', function () {
      // this 就是你点击的那一个 li
      // console.log(this)
      // 找到渲染这个 li 的数据
      // 从 list 数组里面找到这个数据
      // 点击 li 的时候, 拿到自己身上的 id 属性
      const id = $(this).data('id')

      // 2. 去到 list 这个数组里面找到一个 id 对应的数据
      //   这个数据就是渲染这个 li 的数据
      let data = null
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          data = list[i]
          break
        }
      }
      // console.log(data) // 我要找到的渲染当前这个 li 的数据

      // 3. 把找到的数据存储到 localStorage 里面
      //   为了详情页面使用
      localStorage.setItem('goodsInfo', JSON.stringify(data))

      // 4. 跳转页面
      window.location.href = './detail.html'
    })
}