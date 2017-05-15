<template>
  <div class="ph-details">
        <div class="ph-top">
            <div class="push-info">
                <p><span class="iconfont icon-shijian"></span>{{details.rverifydate}}</p>
                <p class="fr"><span class="iconfont icon-chakan"></span>{{details.rcount}}</p>
            </div>
           <h5 class="text-hidden">{{details.rsubject}}</h5>
          <p class="from">{{details.rverifyname}}</p>
        </div>
       <main class="main">
           <p class="text-box">{{details.rcontent}}</p>
       </main>
       <div class="bottom-btns">
            <a    href="javascript:;" v-if="v.id==1" v-for="v in btns"  @click="action">{{v.name}}</a>
            <a    :href="phoneNumber(details.rmsgid)" v-if="v.id==2" v-for="v in btns">{{v.name}}</a>
       </div>
  </div>
</template>

<script>
export default {
  name: 'phDetails',
  props:['btns','details'],
  methods:{
    phoneNumber(n){

        return "tel:"+n;

    },
    action(){
        this.$emit('action');
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/style/rem.scss";
.ph-details{
  $phTopH:rem(160px);
  padding-top:$h;

  .ph-top{


   padding:rem(20px) 0;
   margin: 0 rem(20px);
   height:$phTopH;
   border-bottom: 1px solid #dfdfdf;
    h5{
     margin: rem(30px) 0;
     font-size: 16px;
    }

  }
   .main{


      top:$h+rem(20px)*2+$phTopH;
      bottom: $bottom_b;
      .text-box{

        margin-top: rem(20px);
        text-indent: 0;
        padding: 0 rem(20px);
        box-sizing: border-box;
      }
  }
  .bottom-btns{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: $bottom_b;
    display: flex;
    background: #53a6ea;
    z-index: 999;
    >a{
      flex: 1;
      color:#fff;
      font-size: 18px;
      line-height: $bottom_b;
      text-align: center;
      &:nth-of-type(2n){
        background:#fff;
        color: #53a6ea;
      }
    }
  }
}
</style>
