<template>
  <div id="service">
     <VHeader  :subTitle="subTitle" :iconInfo="icon"/>
    <main  class="main">
      <div class="grid-2">
         <ul>
            <li v-for="v in  subList" class="item">
                <router-link  :to="{name:v.url,params: { id: v.id }}">
                   <div class="item-img">
                       <img :src="v.icon" :alt="v.title">
                   </div>
                   <p class="item-title">{{v.title}}</p>
               </router-link >
            </li>
          </ul>
      </div>
    </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
export default {
  name: 'service',
  props:['subTitle',"subList"],
  data(){
    return{

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
#service{
  .main{
    bottom: 0;
  }

  .grid-2{

   padding: rem(30px);
    >ul{
      display: flex;
      flex-wrap: wrap;
      >li.item{
       flex-basis: 50%;

       padding:rem(30px);

       box-sizing:border-box;
        >a{
          height: 100%;
          width: 100%;
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing:border-box;
           border: 1px solid #dcdcdc;
           border-radius: 3%;
           >.item-img,>.item-title{
             flex: 1;
             text-align: center;
             margin: rem(20px) 0;
           }
          >.item-img{
            img{
              width:rem(100px);
              height:rem(100px);

            }
          }
          >.item-title{
            font-size: 18px;
          }
        }
      }
    }

  }
}
</style>
