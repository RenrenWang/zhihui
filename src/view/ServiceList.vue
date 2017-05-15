<template>
  <div id="servicelist">
  <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
    <main  class="main">
      <!-- <h2 class="service-title">{{m_title}}</h2> -->
      <div class="grid-3">
         <ul>
            <li v-for="v in  list" class="item">
              <router-link  :to="{name:v.url,params: { id: v.id }}">
                   <div class="item-img">
                       <img :src="v.icon" :alt="v.title">
                   </div>
                   <p class="item-title">{{v.title}}</p>
               </router-link>
            </li>
          </ul>
      </div>
    </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
export default {
  name: 'servicelist',
  data(){
    return{
      topTitle:"金融",
      icon:"icon-jiantou",

      list:[
        {"id":1,"title":"慧泉科技","icon":"./static/images/huiquan.png","url":"serviced"},
        {"id":2,"title":"慧泉科技","icon":"./static/images/huiquan.png","url":"serviced"},
          {"id":3,"title":"慧泉科技","icon":"./static/images/huiquan.png","url":"serviced"},
            {"id":4,"title":"慧泉科技","icon":"./static/images/huiquan.png","url":"serviced"},
              {"id":6,"title":"慧泉科技","icon":"./static/images/huiquan.png","url":"serviced"}

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
#servicelist{
  .main{
    bottom: 0;
  }
  .service-title{
    text-align: center;
    font-size: 18px;
    padding-top: rem(50px);
    font-weight: 600;
  }
  .grid-3{

   padding: rem(30px);
    >ul{
      display: flex;
      flex-wrap: wrap;
      >li.item{
       flex-basis: 33.333%;

       padding:rem(25px);

       box-sizing:border-box;
        >a{
          height: 100%;
          width: 100%;
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing:border-box;

           >.item-img,>.item-title{
             flex: 1;
             text-align: center;
             margin: rem(20px) 0;
             width: 100%;
           }
          >.item-img{
            img{

              width:100%;
              height:auto;
            }
          }
          >.item-title{
            font-size: 16px;
          }
        }
      }
    }

  }
}
</style>
