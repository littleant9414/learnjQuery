// 1 對哪些元素綁定什麼監聽
// 2 對哪些元素進行什麼 dom 操作
$(function() {
  showHide();
  hoverSubMenu();
  search();
  share();
  address();
  clickTabs();
  // 鼠標移入移出
  // 手機京東, 客戶服務, 網站導航, 我的京東, 去購物車結算, 全部商品 
  // name=show_hide > id=site_nav_items
  function showHide(){
    $("[name=show_hide]").hover(function(){
      let id = this.id + "_items";
      $("#" + id).show();
    },function(){
      let id = this.id + "_items";
      $("#" + id).hide();
    });
  }

  // id=category_items > class=cate_item > class=sub_cate_box
  function hoverSubMenu(){
    $("#category_items>div").hover(function(){
      $(this).children(":last").show();
    },function(){
      $(this).children(":last").hide();
    })
  }

  // focus _doKeyUp
  // id="search_helper" > class="search" > id="txtSearch"
  // jQuery on(events,[selector],[data],fn) 可以綁定多個事件監聽
  function search(){
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
  // 
  function share(){
    var isOpen = false;
    var $shareMore = $("#shareMore");
    var $parent = $shareMore.parent();
    var $as = $shareMore.prevAll("a:lt(2)");
    var $b = $shareMore.children();
    $shareMore.click(function(){
      if(isOpen){
        $parent.css("width",155);
        $as.hide();
        $b.removeClass("backward");
      }else{
        $parent.css("width",200);
        $as.show();
        $b.addClass("backward");
      }
      isOpen = !isOpen;
    })
  }

  // id="store_select"
  function address(){
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

  // id="store_tabs"
  function clickTabs(){
    $("#store_tabs">li).click(function(){
      $("#store_tabs">li).removeClass("hover");
      this.className = "hover";
    })
  }

});