<template>
  <h3 class="lineTitle">
     <span class="dashed"></span>
          <font class="line-tit">{{subTitle}}</font>
     <span class="dashed"></span>
  </h3>
</template>

<script>
export default {
  name: 'lineTitle',
  props:['subTitle']
}
</script>

<style lang="scss">
@import "../../assets/style/rem.scss";
.lineTitle{

position: relative;
 font-size: 14px;
 color: #67b5ed;
  height: 30px;
  line-height: 30px;
  margin:rem(15px) 0;
   width: 100%;
  .line-tit{
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left:-40px;
    background: #fff;
    width:80px;
    z-index:9;
  }
  .dashed{

   transform: translateY(-5px);
   display: inline-block;

    width:49%;
    border-bottom: 2px dashed #f2f2f2;
  }
}
</style>
