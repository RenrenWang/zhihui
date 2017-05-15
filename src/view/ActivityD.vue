<template>
  <div id="activityD">
         <VHeader  :subTitle="topTitle" :iconInfo="icon" :text="hText"  @action="fn"/>
        <main class="main">
              <VCarousel :carousels="toplist"/>
             <div class="activity-info">
                  <div class="ai-top">
                    <h5 class="text-hidden">{{activityD.rsubject}}</h5>
                    <div class="push-info">
                        <p><span class="iconfont icon-shijian"></span>{{activityD.activityReldate}}</p>
                        <p class="fr"><span class="iconfont icon-chakan"></span>{{activityD.rcount}}</p>
                    </div>
                    <div class="ai-top-s">
                        <p><span>发起人：</span>{{activityD.activityLead}}</p>
                        <p><span>活动时间：</span>{{activityD.activityReldate}}</p>
                        <p><span>活动地点：</span>{{activityD.activitySite}}</p>
                    </div>
                  </div>
                
                   <LineTitle  :subTitle="title"/>
                   <p class="text-box">
                        {{activityD.rcontent}}
                   </p>

             </div>

        </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import VCarousel from '../components/Carousel/Carousel.vue'
import LineTitle from '../components/LineTitle/LineTitle.vue'
export default {
  name: 'activityD',
  data(){
    return{
      topTitle:"活动详情",
      icon:"icon-jiantou",
      hText:"报名",
         toplist:[],
         activityD:{},
         title:"活动介绍",
            user:this.$root.isLogin(),
    }
  },
  mounted(){

    this.$http.get(BASEURL+'/app/pubInfo.action?viewSInfo=&callback=jQuery18306862034124787897_1444874513140&infoType=HD&rid='+this.$route.params.id).then(response => {
      let data =response.body;

      if(data.result=="success"){
          this.activityD=data.data;
          this.toplist=[{
            "title":data.data.rsubject,
              "url":BASEURL+'/app'+data.data.activityImgurl
          }];

      }


       else  if(data.result=="fail")
          console.log(data.msg);
    });
  },
  methods:{
    fn(){

       if(this.user){
          this.$router.push({ name: 'activityenroll',params: { id:this.$route.params.id}});
       }else{

            this.$router.push({ path: '/login' });
       }
    }
  },
  components:{
    VHeader,
    VCarousel,
    LineTitle
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
#activityD{
  .main{

    bottom: 0;
}
  .activity-info{
    padding:rem(20px);
    box-sizing: border-box;
    .ai-top{
      h5{

          font-size: 18px;
        }
        .push-info{
            margin-top: rem(30px);
            font-size: 14px;
         }
          .ai-top-s{
            margin-top: rem(40px);
            font-size: 14px;
            color: #000;
           p{

              margin: rem(15px) 0;
             span{
                color:#868686;
              }
           }

          }


    }
  }

  .line-tit{

     color:#868686;
  }
}

</style>
