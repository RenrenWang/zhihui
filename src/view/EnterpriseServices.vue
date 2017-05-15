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
      topTitle:"企业服务",
      icon:"icon-jiantou",
      list:[
        {"id":1,"title":"金融服务","icon":"./static/images/qys_1.png","url":"enterpriseservices"},
        {"id":2,"title":"人力资源","icon":"./static/images/qys_2.png","url":"enterpriseservices"},
          {"id":3,"title":"创新创业","icon":"./static/images/qys_3.png","url":"enterpriseservices"},
            {"id":4,"title":"IT服务","icon":"./static/images/qys_4.png","url":"enterpriseservices"},
              {"id":5,"title":"基础服务","icon":"./static/images/qys_5.png","url":"enterpriseservices"},
              {"id":6,"title":"知识产权","icon":"./static/images/qys_6.png","url":"enterpriseservices"}

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
