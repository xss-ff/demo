"use strict";window.onload=function(){$.ajax({url:"../lib/nav_top.json",dataType:"json",success:function(i){console.log(i);var t="";i.forEach(function(n){t+="<li>".concat(n.name,"</li>")}),$(".nav_top  ul").html(t).on({mouseenter:function(){return $(".nav_box").stop().slideDown()},mouseleave:function(){return $(".nav_box").stop().slideUp()}}).children("li").on("mouseover",function(){var n=$(this).index(),t=i[n].list,o="";t.forEach(function(n){o+='\n                  <li>\n                    <div>\n                      <img src="'.concat(n.list_url,'" alt="">\n                    </div>\n                    <p class="title">').concat(n.list_name,'</p>\n                    <span class="price">').concat(n.list_price,"</span>\n                  </li>\n                ")}),$(".nav_box > ul").html(o)}),$(".nav_box").on({mouseover:function(){$(this).finish().show()},mouseout:function(){$(this).finish().slideUp()}})}}),$.ajax({url:"../lib/nav_list2.json",dataType:"json",success:function(i){console.log(i);var t="";i.forEach(function(n){t+='<a href="./list.html"><li>'.concat(n.name,"</li></a>")}),$(".nav_list  ul").html(t).on({mouseenter:function(){return $(".list_box").stop().show()},mouseleave:function(){return $(".list_box").stop().hide()}}).children("a").on("mouseover",function(){var n=$(this).index(),t=i[n].list,o="";t.forEach(function(n){o+='\n                  <li>\n                    <div>\n                      <img src="'.concat(n.list_url,'" alt="">\n                    </div>\n                    <p class="title">').concat(n.list_name,"</p>\n                  </li>\n                ")}),$(".list_box > ul").html(o)}),$(".list_box").on({mouseover:function(){$(this).finish().show()},mouseout:function(){$(this).finish().hide()}})}}),$(".all").on({mouseenter:function(){return $(".nav_list").stop().show()},mouseleave:function(){return $(".nav_list").stop().hide(1e3)}}),$(".nav_list").on({mouseover:function(){$(this).finish().show()},mouseout:function(){$(this).finish().hide()}}),$(".list_box").on({mouseenter:function(){return $(".nav_list").stop().show()},mouseleave:function(){return $(".nav_list").stop().hide()}});var e=1,s=!0,a=[];function l(){$.ajax({url:"/dm",data:{keyword:"",cty:"",ctl:"演唱会",sctl:"",tsg:0,st:"",et:"",order:1,pageSize:30,currPage:e,tn:""},dataType:"json",success:function(n){var t,o,i;t=n.pageData.resultData,o="",t.forEach(function(n){o+='\n          <li data-id="'.concat(n.id,'">\n            <img src="').concat(n.verticalPic,'" alt="">\n            <p>').concat(n.name,"</p>\n          </li>\n        ")}),$(".goodsList > ul").html(o),s&&(i=n.pageData.totlaPage,s=!1,$(".pagi").pagination({pageCount:i,current:1,jump:!0,coping:!0,homePage:"首页",endPage:"末页",prevContent:"上页",nextContent:"下页",callback:function(n){e=n.getCurrent(),l()}})),a=n.pageData.resultData}})}l(),$(".goodsList > ul").on("click","li",function(){for(var n=$(this).data("id"),t=null,o=0;o<a.length;o++)if(a[o].id===n){t=a[o];break}localStorage.setItem("goodsInfo",JSON.stringify(t)),window.location.href="./detail.html"})};