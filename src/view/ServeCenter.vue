<template>
  <div id="servecenter">
      <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
       <main class="main">
           <ul class="number-list">
             <li><span>经济发展部负责人：</span><a href="tel:0571-86909109">0571-86909109</a></li>
             <li><span>招商投资部负责人：</span><a href="tel:0571-89800550">0571-89800550</a></li>
             <li><span>人才服务部负责人</span><a href="tel:0571-89800531">0571-89800531</a></li>
           </ul>
       </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
export default {
  name: '',
  data(){
    return{
      topTitle:"服务中心",
      icon:"icon-jiantou",
    }
  },
  components:{
    VHeader
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
.number-list{


   padding:0 rem(15px);
   width: 100%;
    color: #b5b0b0;
   font-size: 16px;
   box-sizing: border-box;
   li{
     margin: rem(30px) 0;

      display: flex;
    span{
      flex-basis: 150px;
      transform: translateY(rem(30px));
    }
     a{
       flex:1;

       font-size: 18px;
       font-weight: 600;
       color: #222;
       border: 1px solid #b5b0b0;
       border-radius: 10px;
       padding: rem(15px) 0;
       &:before{
         content: "";
         display: inline-block;
         height: rem(40px);
         width: rem(40px);
         margin:0 rem(30px) 0rem(10px);
         background: url('../assets/images/icon_phone.png') no-repeat center/cover;
       }

     }
   }

}
</style>
