<template>
  <div id="companyDetails">
       <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
      <main class="mian">
        <VCarousel :carousels="toplist"/>
         <div class="text-content">
            <div class="tc-section">
                 <LineTitle  :subTitle="title_1"/>
                 <p class="text-box">
                  {{cDetails.qyIntro}}

                 </p>
            </div>
            <div class="tc-section">
                 <LineTitle  :subTitle="title_2"/>
                 <p class="text-box">

                    {{cDetails.qyProdinfo}}
                 </p>
            </div>
         </div>
      </main>


  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import VCarousel from '../components/Carousel/Carousel.vue'
import LineTitle from '../components/LineTitle/LineTitle.vue'
export default {
  name: 'companyDetails',
  data(){
    return{
      topTitle:"企业详情",
      icon:"icon-jiantou",
      title_1:"公司介绍",
        title_2:"产品服务",
       toplist:[],
       cDetails:[]
    }
  },
  mounted(){

    this.$http.get(BASEURL+'/app/enterpriseInfo.action?introProdInfo=&qdPrid='+this.$route.params.id+'&jQuery18306862034124787897_1444874513140').then(response => {
      let data =response.body;

      if(data.result=="success"){
          this.cDetails=data.data[0];
          this.toplist=[{
            "title":data.data[0].qdPrid,
              "url":BASEURL+'/app'+data.data[0].gyImguri
          }];

      }


       else  if(data.result=="fail")
          console.log(data.msg);
    });
  },
  components:{
    VHeader,VCarousel,
    LineTitle
  }
}
</script>

<style lang="scss">
#companyDetails{
   .tc-section{
     margin-top:15px;
   }

}
</style>
