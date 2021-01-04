(function(){
  $.extend({
    min:function(a,b){
      return a<b ? a : b
    },
    max:function(a,b){
      return a>b ? a : b
    },
    leftTrim:function(str){
      return str.replace(/^\s+/,"");
    },
    rightTrim:function(str){
      return str.replace(/\s+$/,"")
    }
  });

  $.fn.extend({
    checkAll:function(){
      this.prop("checked",true);
    },
    unCheckAll:function(){
      this.prop("checked",false);
    },
    reverseCheck:function(){
      // this 是 jQuery對象
      this.each(function(){
        // this 是 dom 元素
        this.checked = !this.checked;
      })
    },

  })
})();