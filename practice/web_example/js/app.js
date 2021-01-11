// 1 對哪些元素綁定什麼監聽
// 2 對哪些元素進行什麼 dom 操作
$(function() {
  showHide();
  hoverSubMenu();
  search();
  share();
  address();
  clickTabs();
  hoverMiniCart();
  clickProductTabs();
  moveMiniImg();
  hoverMiniImg();
  bigImg();

  // 鼠標移入移出
  // 手機京東, 客戶服務, 網站導航, 我的京東, 去購物車結算, 全部商品 
  // name=show_hide > id=site_nav_items
  function showHide () {
    $("[name=show_hide]").hover(function(){
      let id = this.id + "_items";
      $("#" + id).show();
    },function(){
      let id = this.id + "_items";
      $("#" + id).hide();
    });
  }

  // 二級菜單
  // id=category_items > class=cate_item > class=sub_cate_box
  function hoverSubMenu () {
    $("#category_items>div").hover(function(){
      $(this).children(":last").show();
    },function(){
      $(this).children(":last").hide();
    })
  }

  // 搜尋欄
  // focus _doKeyUp
  // id="search_helper" > class="search" > id="txtSearch"
  // jQuery on(events,[selector],[data],fn) 可以綁定多個事件監聽
  function search () {
    $("#txtSearch")
    .on("keyup focus", function(){
      var txt = this.value.trim();
      if(txt){
        $("#search_helper").show();
      }
    })
    .blur(function(){
      $("#search_helper").hide();
    })
  }

  // id="shareMore" 
  // click event
  // 社群分享
  function share () {
    var isOpen = false;
    var $shareMore = $("#shareMore");
    var $parent = $shareMore.parent();
    var $as = $shareMore.prevAll("a:lt(2)");
    var $b = $shareMore.children();
    $shareMore.click(function(){
      if(isOpen){
        $parent.css("width",155);
        $as.hide();
        $b.removeClass("backword");
      }else{
        $parent.css("width",200);
        $as.show();
        $b.addClass("backword");
      }
      isOpen = !isOpen;
    })
  }

  // 寄送地址
  // id="store_select"
  function address () {
    var $select = $("#store_select");
    $select.hover(function(){
      $(this).children(":gt(0)").show();
    },function(){
      $(this).children(":gt(0)").hide()
    })
      .children(":last")
      .click(function(){
        $select.children(":gt(0)").hide();
      });
  }

  // 寄送地址切換欄
  // id="store_tabs"
  function clickTabs () {
    $("#store_tabs>li").click(function(){
      $("#store_tabs>li").removeClass("hover");
      this.className = "hover";
    })
  }

  // 加入購物車顯示/隱藏
  // id="minicart"
  function hoverMiniCart () {
    $("#minicart").hover(function(){
      this.className = "minicart";
      $(this).children(":last").show();
    },function(){
      this.className = "";
      $(this).children(":last").hide();
    });
  }

  // 商品訊息切換欄
  // id="product_detail"
  function clickProductTabs () {
    var $lis = $("#product_detail>ul>li");
    var $contents = $("#product_detail>div:gt(0)")
    $("#product_detail>ul>li").click(function(){
      $lis.removeClass("current")
      this.className = "current";
      // 隱藏所有內容
      $contents.hide();
      var index = $(this).index();
      $contents.eq(index).show();
    })
  }

  // 商品照片左右切換
  // id="preview"
  function moveMiniImg () {
    var $as = $("#preview>h1>a");
    var $backward = $as.first();
    var $forward = $as.last();
    var $Ul = $("#icon_list");
    var SHOW_COUNT = 5;
    var imgCount = $Ul.children("li").length;
    var moveCount = 0; //點擊向右移動為正, 向左移動為負 單位: 62px
    var liWidth = $Ul.children(":first").width();

    if(imgCount>SHOW_COUNT){
      // $forward[0].className = "forward";
      $forward.attr("class","forward");
    }

    $forward.click(function(){
      $backward.attr("class","backward");

      // 判斷 ul 是否需要移動
      if(moveCount === imgCount-SHOW_COUNT){
        return;
      }
      moveCount++;
      if(moveCount === imgCount-SHOW_COUNT){
        $forward.attr("class","forward_disabled");
      }
      $Ul.css({
        left:-moveCount*liWidth
      })
    })

    $backward.click(function(){
      $forward.attr("class","forward");

      // 判斷 ul 是否需要移動
      if(moveCount === 0){
        return;
      }
      moveCount--;
      if(moveCount === 0){
        $backward.attr("class","backward_disabled");
      }
      $Ul.css({
        left:-moveCount*liWidth
      })
    })
  }

  // 小圖與中圖設置同步
  function hoverMiniImg () {
    $("#icon_list>li").hover(function(){
      // this.children()[0].className = "hoveredThumb";
      var $img = $(this).children();
      $img.addClass("hoveredThumb");
      // 顯示對應的中圖
      var src = $img.attr("src").replace(".jpg","-m.jpg");
      $("#mediumImg").attr("src",src);
    },function () {
      $(this).children().removeClass("hoveredThumb");

    })
  }

  // 中圖與大圖設置同步
  // id="medimImgContainer" id="mask" id="maskTop" id="largeImgContainer" id="largeImg"
  function bigImg () {
    var $mediumImg = $("#mediumImg");
    var $mask = $("#mask");  //遮罩
    var $maskTop = $("#maskTop");
    var $largeImgContainer = $("#largeImgContainer");
    var $loading = $("#loading");
    var $largeImg = $("#largeImg");
    var maskWidth = $mask.width();
    var maskHeight = $mask.height();
    var maskTopWidth = $maskTop.width();
    var maskTopHeight = $maskTop.height();
     
    $maskTop.hover(function () {
      // 顯示遮罩
      $mask.show();

      var src = $mediumImg.attr("src").replace("-m.","-l.");
      $largeImg.attr("src",src);
      $largeImgContainer.show();
      // $largeImg.show();
      $largeImg.on("load",function () {
        // 大圖加載完成
        // 大圖移動 比例關系
        var largeWidth = $largeImg.width();
        var largeHeight = $largeImg.height();
        
        // $largeImgContainer 設置尺寸
        $largeImgContainer.css({
          width: largeWidth/2,
          height: largeHeight/2
        })
        $largeImg.show();
        $loading.hide();
        // console.log($largeImg.width(),$largeImg.height());

      // 綁定 mousemove 監聽
      // 遮罩跟隨鼠標移動 
      $maskTop.mousemove(function (event) {
        var left = 0;
        var top = 0;
        var eventLeft = event.offsetX;
        var eventTop = event.offsetY;
        left = eventLeft - maskWidth/2;
        top = eventTop - maskHeight/2;
        // left [0,maskTopWidth - maskWidth]
        if(left<0){
          left =0;
        }else if(left > maskTopWidth - maskWidth){
          left = maskTopWidth - maskWidth;
        }
        // top [o,maskTopHeight - maskHeight]
        if(top<0){
          top = 0;
        }else if(top > maskTopHeight - maskHeight){
          top = maskTopHeight - maskHeight;
        }

        $mask.css({
          left:left,
          top: top
        })

        left = -left * largeWidth/maskTopWidth;
        top = -top * largeHeight/maskTopHeight;
        $largeImg.css({
          left:left,
          top:top
        })
        
      })

      })
      
    },function () {
      // 隱藏遮罩
      $mask.hide();
      $largeImgContainer.hide();
      $largeImg.hide();

    })
  }
});