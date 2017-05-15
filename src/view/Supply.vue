<template>
  <div id="supply">
     <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
    <main  class="main">
      <div class="grid-4">
         <ul>
            <li v-for="v in list">
               <a href="javascript:;">
                  <img :src="v.icon" class="item-img" />
                  <p class="item-title">{{v.title}}</p>
               </a>
            </li>
          </ul>
      </div>
    </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
export default {
  name: 'supply',
  data(){
    return{
      topTitle:"供需对接",
      icon:"icon-jiantou",
      list:[
        {"title":"企业供应","icon":"./static/images/gy.png","url":""},
        {"title":"企业需求","icon":"./static/images/xq.png","url":""},

      ]
    }
  },
components:{
  VHeader
}
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
#supply{
   .main{
    background: #efeff4;
   bottom: 0;
   }
   .grid-4{
     margin: rem(25px);
    border: 1px solid #dcdcdc;
    background: #fff;
    box-sizing: border-box;
    text-align: center;
    border-radius: 3%;
     >ul{
       padding: rem(15px);

       display: flex;
       flex-wrap: wrap;
       >li{

         flex-basis: 33.333%;
         box-sizing: border-box;
         img{
           height: 48px;
           width: 48px;
         }
         p{
           font-size: 14px;
           padding: rem(15px) 0;
         }
       }
     }

   }
}
</style>
