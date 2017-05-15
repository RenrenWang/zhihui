<template>
  <header>
        <div class="header clearfix">

              <a  v-if="iconInfo"   href="javascript:;" :class='["iconfont",iconInfo,"fl"]' @click="back()"></a>
              <a  v-if="text"   href="javascript:;" class="h-text fr" @click="action">{{text}}</a>
              <h1 class="title">{{subTitle}}</h1>

        </div>

  </header>
</template>

<script>
export default {
  props:['subTitle','iconInfo','text'],
  name: 'commonHeader',
  methods:{
    back(){
      this.$router.go(-1);
    },
    action(){
      this.$emit('action');
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/style/rem.scss";
.header{

   line-height:  $h;
   .iconfont{
      transform: translateY(rem(-5px));
     font-size: rem(50px);
     color: #fff;
   }
   h1.title{
    text-align: center;
    font-size: 18px;
    color: #fff;
   }
   .h-text{
     font-size: 16px;
     color:#fff;
   }
}
</style>
