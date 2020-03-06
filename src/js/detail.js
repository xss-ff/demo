window.onload = function(){

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


    // 1. 获取 localStorage 里面的数据
    const info = JSON.parse(localStorage.getItem('goodsInfo'))
    console.log(info)

    // 2. 判断数据是否存在
    if (!info) {
      // 能执行表示 !info 是一个 true
      // 表示 info 是一个 false
      // 表示数据不存在
      alert('您要查看的数据不存在')
      // 跳转回列表页面
      window.location.href = './list.html'
    }

    // 3. 渲染页面
    bindHtml()
    function bindHtml() {
      $('.goodsInfo img').attr('src', info.verticalPic)
      $('.goodsInfo .cate').text(info.categoryname)
      $('.goodsInfo .actors').text(info.actors)
      $('.goodsInfo .goodsName').text(info.name)
      $('.goodsInfo .price').text('￥: ' + info.price)
      $('.goodsInfo .show').text(info.showstatus)
      $('.goodsInfo .ven').text('地址：' + info.venuecity)
      $('.goodsInfo .showtime').text('时间：' + info.showtime)
    }

    // console.log(info)

    // 4. 点击添加购物车
    // 4-1. 添加点击事件
    $('.addCart').click(() => {
      // console.log('我要添加购物车了')

      // 4-2. 判断是否登录

      // 4-3. 加入到购物车数组里面
      //    先拿到 localStorage 里面的那个数组信息
      //    如果原先没有数据, 那么我就用一个空数组来代替
      //    如果有数据, 就用我们的数据
      const cartList = JSON.parse(localStorage.getItem('cartList')) || []

      // 象数组里面把本条数据添加进去
      // 4-4. 判断有没有这个数据
      //      每一个数据都有一个自己的 id
      //      只要看数组里面有没有 id 一样的数据, 就知道有没有这个数据了
      //      数组常用方法有一个叫做 some 的方法
      //      返回值:
      //        true: 表示数组里面有这个信息
      //        false: 表示数组里面没有这个信息
      let exits = cartList.some(item => {
        // 数组里面每一个的 id === 本页面的这条数据的 id
        return item.id === info.id
      })

      // console.log(exits)
      if (exits) {
        // 表示有这个信息了, 我们要让 number ++
        // console.log('已经存在 number ++')
        // 找到这个信息给他 number ++
        let data = null
        for (let i = 0; i < cartList.length; i++) {
          if (cartList[i].id === info.id) {
            data = cartList[i]
            break
          }
        }
        // data 就是我找到的这个信息
        data.number++

        // 4-5. 数量添加的时候, 小计价格要改变
        data.xiaoji = data.number * data.price // 数量 * 单价
      } else {
        // 表示没有这个信息, 直接 push 就可以了
        // push 之前, 象里面添加一个 number 信息为 1
        info.number = 1

        // 4-5. 多添加一些信息
        info.xiaoji = info.price // 因为默认是第一个, 小计就是单价
        info.isSelect = false // 默认不选中
        cartList.push(info)
      }

      // 在存储到 localStorage 里面
      localStorage.setItem('cartList', JSON.stringify(cartList))
    })
}