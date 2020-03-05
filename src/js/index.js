window.onload = function () {

  let id = Cookies.get('id');
  let un = Cookies.get('username');

  console.log(id);

  if (!id) {
    alert('请登录');
    location.href = './login.html';
  }

  let exitBtn = document.querySelector('.exit');
  exitBtn.onclick = function () {

    Cookies.remove('id');
    Cookies.remove('username');
    alert('退出成功');
    location.href = './login.html';
  }

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

  //轮播图
  var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: {
      delay: 2000
    },

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })

  //倒计时
  function time(n) {
    return n >= 0 && n < 10 ? "0" + n : n;
  }

  let timer = setInterval(function () {
    let nowDate = new Date('2020-4-3');
    let oldDate = new Date();

    let subDate = nowDate - oldDate;
    let second = Math.floor(subDate / 1000);

    let day = Math.floor(second / 86400);
    second = second % 86400;
    let hours = Math.floor(second / 3600);
    second = second % 3600;
    let minute = Math.floor(second / 60);
    second = second % 60;

    let sp = document.querySelectorAll('.box span');
    sp[0].innerText = time(day);
    sp[1].innerText = time(hours);
    sp[2].innerText = time(minute);
  }, 1000);

  //闪购轮播图
  getProct()
  function getProct() {

    $.ajax({
      url: '../lib/nav_list.json',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        let str = '';

        res.forEach(item => {

          str += `
              <li>
                  <img src="${item.img}" alt="">
                  <p>${item.name}</p>
                  <span class="sp">${item.pro}</span>
                  <span class="sp2">${item.price}</span>
              </li>
              `
        })

        $('.row_list > ul').html(str);
      }
    })

  }

  //获取手机下的数据

  getIpone()
  function getIpone() {

    $.ajax({
      url: '../lib/list_ipone.json',
      dataType: 'json',
      success: function (res) {

        let str = '';

        res.forEach(item => {

          str += `
          <li>
              <img src="${item.img}" alt="">
              <p>${item.name}</p>
              <span class="sp">${item.pro}</span>
              <span class="sp2">${item.price}</span>
          </li>
          `;
        })

        $('.bd_list > ul').html(str);
      }
    })
  }

  //获取家电下的数据

  getJd()
  function getJd() {

    $.ajax({
      url: '../lib/list_jiadian.json',
      dataType: 'json',
      success: function (res) {

        let str = '';

        res.forEach(item => {

          str += `
          <li>
              <img src="${item.img}" alt="">
              <p>${item.name}</p>
              <span class="sp">${item.pro}</span>
              <span class="sp2">${item.price}</span>
          </li>
          `;
        })

        $('.bd_list2 > ul').html(str);
      }
    })
  }

  //获取搭配下的数据

  getDp()
  function getDp() {

    $.ajax({
      url: '../lib/list_dapei.json',
      dataType: 'json',
      success: function (res) {

        let str = '';

        res.forEach(item => {

          str += `
             <li>
                 <img src="${item.img}" alt="">
                 <p>${item.name}</p>
                 <span class="sp">${item.pro}</span>
                 <span class="sp2">${item.price}</span>
             </li>
             `;
        })

        $('.bd_list3 > ul').html(str);
      }
    })
  }

  //轮播图二级菜单

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

  //回到顶部

  let btn = document.querySelector('.btn');
  window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop >= 450) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  }

  btn.onclick = function () {

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

}
