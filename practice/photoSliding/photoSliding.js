$(function(){
  var $container = $("#container");
  var $list = $("#list");
  var $points = $("#pointsDiv>span");
  var $prev = $("#prev");
  var $next = $("#next");
  var TIME = 400;
  var ITEM_TIME = 20;
  var imgCount = $points.length;
  var index = 0; //圓點位置
  var moving = false;//是否正在翻頁


  // 一頁的寬度
  var PAGE_WIDTH = 600;

  $next.click(function(){
    // 平滑翻到下一頁
    nextPage(true);
  })
  $prev.click(function(){
    // 平滑翻到上一頁
    nextPage(false)
  })

  // 啟動自動切換圖片
  var intervalId = setInterval(() => {
    nextPage(true);
  }, 1000);

  $container.hover(function() {
    clearInterval(intervalId);
  },function(){
    intervalId = setInterval(() => {
      nextPage(true);
    }, 1000);
  });

  // 點擊圓點切換到對應的頁面
  $points.click(function(){
    // 計算出目標 index 
    var targetIndex = $(this).index();
    if(targetIndex!=index){
      nextPage(targetIndex)
    }
  });

  function nextPage(next){
    // 總時間: TIME
    // 單元移動的間隔時間 ITEM_TIME
    // 單元移動的偏移量 itemOffset = offset/(TIME/ITEM_TIME)

    // 如果正在翻頁 直接結束定時器
    if(moving){
      return
    }else{
      // 標識正在翻頁
      moving = true;
    }
    
    // 總偏移量: offset
    var offset = 0;
    if(typeof next ==="boolean"){
      offset = next ? -PAGE_WIDTH : PAGE_WIDTH;
    }else{
      offset = -(next-index)* PAGE_WIDTH;
    }

    var itemOffset = offset/(TIME/ITEM_TIME);
    // 得到當前 left 值
    var currentLeft  = $list.position().left;
    // 計算出目標 left 值
    var targetLeft = currentLeft + offset;
    // 啟動循環定時器不斷更新 $list 的 left
    var intervalId = setInterval(function(){
      // 計算出最新的 currentLeft
      currentLeft += itemOffset;
      if(currentLeft===targetLeft){
        // 到達目標位置停止定時器
        clearInterval(intervalId);
        // 標識 翻頁結束
        moving = false;
        // 如果到達最右邊圖片跳轉到最左邊的第二張
        if(currentLeft === -(imgCount + 1)*PAGE_WIDTH){
          currentLeft = -PAGE_WIDTH;
          // 如果到達最左邊圖片跳轉到最右邊的第二張
        }else if(currentLeft===0){
          currentLeft = -imgCount * PAGE_WIDTH;
        }
      }
      $list.css("left",currentLeft);
    },ITEM_TIME)
    
    updatePoints(next);
  }

  function updatePoints(next) {
    // 將當前 index 的 class 移除並計算出目標圓點
    var targetIndex = 0;
    if(typeof next ==="boolean"){
      if(next){
        targetIndex = index + 1; // [0,imgCount-1]
        if(targetIndex===imgCount){
          targetIndex = 0;
        }
      }else{
        targetIndex = index - 1;
        if(targetIndex===-1){
          targetIndex=imgCount-1;
        }
      }
    }else{
      targetIndex =next;
    }
    
    // 為目標圓點添加 class on
    $points.eq(index).removeClass("on");
    $points.eq(targetIndex).addClass("on");
    
    // 將 index 更新為 targetIndex
    index = targetIndex;
    
  }

});