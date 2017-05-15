<template>
  <div id="terraceDetails">
       <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
      <main class="main">
        <VCarousel :carousels="toplist"/>
         <div class="text-content">

            <div class="tc-section">
                 <h3 class="cname">{{terrace.fqkQkmc}}</h3>
                 <ul class="numbers">
                     <li><i class="iconfont icon-mianjitu"></i>{{terrace.fqkArea}}<span class="unit">m²</span></li>
                     <li><i class="iconfont icon-amianji"></i>{{terrace.fqkFreearea}}<span class="unit">m²</span></li>
                     <li><i class="iconfont icon-loudong"></i>{{terrace.fqkZnum}}<span class="unit">幢</span></li>
                 </ul>
                 <p class="icontext"><span class="iconfont  icon-dizhi"></span>{{terrace.fqkAddr}}</p>
                 <p class="icontext"><span class="iconfont icon-zhuanqian"></span><span style="margin-left:5px;">单位面积税收产出比</span><span class="unit">{{terrace.fqkTaxrate}}元/平方米</span></p>
            </div>
            <div class="tc-section">
                 <LineTitle  :subTitle="title"/>
                 <p class="text-box">{{terrace.fqkIntro}}</p>
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
  name: 'terraceDetails',
  data(){
    return{
      topTitle:"平台详情",
      icon:"icon-jiantou",
      title:"平台介绍",
      toplist:[],
      terrace:[]
    }
  },
  mounted(){
       this.$http.get(BASEURL+'/app/qukuaiAction.action?querySingleInfo=&fqkId='+this.$route.params.id+'&callback=jQuery18306862034124787897_1444874513140').then(response=>{
         let data= response.body;
         if(data.result=="success"){
            let  info=data.data[0];
             this.terrace=info;
             this.toplist=[{
               title:info.fqkQkmc,
               url:BASEURL+'/app/'+info.fqkImguri1
             },{
               title:info.fqkQkmc,
               url:BASEURL+'/app/'+info.fqkImguri2
             }];
          console.log(info.fqkImguri2);
         }else  if(data.result=="fail")
             console.log(data.mgs);

       })
  },
  components:{
    VHeader,VCarousel,
    LineTitle
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
#terraceDetails{

.main{
   bottom: 20px;
}
   .tc-section{
     margin-top:15px;
     padding: 0 rem(25px);
     box-sizing: border-box;
     color: #a5a5a5;
     .line-tit{
      color:#a5a5a5;
     }
     .cname{
       text-align: center;
      font-size: 16px;
      color:#000;
     }
     .numbers{
       margin-top: rem(50px);

       display: flex;
       justify-content:center;
       >li{
         font-size: 14px;


        &:after{
          content: '|';
          padding:0 rem(15px);
        }
        &:last-child{
          &:after{
            content: '';
            padding:0;
          }
        }
        >i{
          font-size: 18px;
          margin-right:3px;
         }
         >.unit{

           margin-left: 3px;

         }
       }

     }

     .unit{
        color:#99d2ed;
     }
     .icontext{
        margin:rem(30px) 0;
       font-size: 16px;
       .icon-dizhi,.icon-zhuanqian{
         font-size:25px;
       }
     }

   }

}
</style>
