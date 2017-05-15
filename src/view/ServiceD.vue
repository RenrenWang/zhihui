<template>
  <div id="serviced">
    <VHeader  :subTitle="topTitle" :iconInfo="icon" />
    <main  class="main">
        <VCarousel :carousels="toplist"/>
        <div class="serviced-section">
            <h3 class="serviced-title">标题</h3>
            <p class="text-box">
             一直以来，在人们的印象中，那些成天穿梭在各大商场、肩背手提各种名牌购物袋，谈起各大品牌如数家珍的天生购物狂们，似乎只在女人之间产生。 如果不是接通Jay的电话，或许你很难想到这个远在洛杉矶的专职买手是一名31岁的男士，且是一名有两个孩子的奶爸。由于在美国读大学时选的专业是商科，加上自己也是一名潮人，工作两年后，Jay放弃了那份有着稳定薪水的工作，成为了专职买手。 不到一年半的时间里，Jay跑遍了洛杉矶的几个购物中心，包括Desert Hills Premium Outlets、Camarilo Premium Outlets、Ontario Mills等。每天晚上九点钟开始，他便开始在洋码头扫货神器、微信朋友圈、微店等一些平台做直播，用极具吸引力的价格吸引着国内的用户。
            </p>
        </div>
        <div class="serviced-section">
          <h3 class="serviced-title hot-line">联系方式</h3>
          <p class="text-box">
              986887525
          </p>
          <a href="tel:986887525" class="play-phone">联系方式</a>
        </div>
    </main>

  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import VCarousel from '../components/Carousel/Carousel.vue'
export default {
  name: 'serviced',
  data(){
    return{
      topTitle:"企业服务",
      icon:"icon-jiantou",
      toplist:[{"title":"标题","url":'/app/images/activity/act-02.jpg'}]
    }
  },
  components:{
    VHeader,VCarousel
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
#serviced{
  .main{
    bottom: 0;
  }

  .serviced-section{
    .serviced-title{

    height:rem(100px);
      line-height: rem(100px);
      background:#0074cb;
      padding-left: rem(20px);
      font-size: 14px;
      color: #fff;
      &.hot-line{

        margin-top: 20px;
        background: #ebebeb;
        color: #686868;
      }
    }
    .play-phone{
      display: block;
      width: 90%;
      height:rem(80px);
      line-height:rem(80px);
      background: #006fc1;
      color: #fff;
      text-align: center;
      margin:40px  auto 30px  auto;

      box-sizing: border-box;
      border-radius: 8px;
      font-size: 14px;
    }
  }
}
</style>
