<template>
  <div>

    <v-carousel  paginationActiveColor="#fff"  :paginationPadding=3  :paginationSize=6 paginationColor="#898788" :perPage=1>
      <slide v-for="(v,i) in carousels" key="i">


           <img :src="v.url"  :alt="v.title"  />




      </slide>
    </v-carousel>
  </div>

</template>

<script>
import {
  Carousel,
  Slide
} from 'vue-carousel';
export default {
  name: 'carousel',
   props:['carousels'],
   data(){
   return{

   }
   },
  components: {
  vCarousel:Carousel,
    Slide
  }
}
</script>

<style  lang="scss">
@import '../../assets/style/base.scss';
.VueCarousel{

$h: rem(560px);
 height:$h;

  width: 100%;

  .VueCarousel-slide{
    position: relative;
      width: 100%;
        height:$h;

    img{
         width: 100%;
         height:100%;
         vertical-align: middle;

   }


  }
  .VueCarousel-pagination {

      position: absolute;
      bottom: rem(20px);
  }
}

</style>
