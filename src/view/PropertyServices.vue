<template>
    <div>
      <Services   :subTitle="topTitle" :subList="list"/>
    </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import Services from './Services.vue'
export default {
  name: 'service',
  data(){
    return{
      topTitle:"物业服务",
      icon:"icon-jiantou",
      list:[
        {"id":1,"title":"报修","icon":"./static/images/wy_1.png","url":"propertyservices"},
        {"id":2,"title":"订水","icon":"./static/images/wy_2.png","url":"propertyservices"},
          {"id":3,"title":"车位申请","icon":"./static/images/wy_3.png","url":"propertyservices"},
            {"id":4,"title":"会议预定","icon":"./static/images/wy_4.png","url":"propertyservices"}

      ]
    }
  },
components:{
  VHeader,Services
}
}
</script>

<style lang="scss">


</style>
