<template>
  <div id="noticeD">
         <VHeader  :subTitle="topTitle" :iconInfo="icon" :text="hText"  @action="curd()"/>
         <div :class="['down-panel',{opend:isDow}]">
                  <ul>
                    <li><a href="javascript:;" @click="noticeEdit">编辑</a></li>
                    <li><a href="javascript:;" @click="noticeUpdate">注销</a></li>
                     <li><a href="javascript:;"  @click="noticeDelete">删除</a></li>

                  </ul>
         </div>
        <main class="main">

             <div class="activity-info">
                  <div class="ai-top">
                    <h5 class="text-hidden">{{noticeD.rsubject}}</h5>
                    <div class="push-info">
                        <p><span class="iconfont icon-shijian"></span>{{noticeD.rverifydate|setdate}}</p>
                        <p class="fr"><span class="iconfont icon-chakan"></span>{{noticeD.rcount}}</p>
                    </div>
                     <div class="ai-top-s">
                        <!-- <p><span>通知类型：</span>{{noticeD.type}}</p> -->
                        <!-- <p><span>通知时间：</span>{{noticeD.date}}</p> -->
                        <p><span>发布人：</span>{{noticeD.rverifyname}}</p>
                        <!-- <p><span>发布单位：</span>{{noticeD.postDw}}</p> -->
                    </div>
                  </div>
                   <LineTitle  :subTitle="title"/>
                   <p class="text-box">
                        {{noticeD.rcontent}}
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
  name: 'noticeD',
  data(){
    return{
      topTitle:"通知详情",
      icon:"icon-jiantou",
      title:"通知内容",
      hText:"操作",
         noticeD:{},
         isDow:false,
user:this.$root.isLogin(),
    }
  },
  mounted(){

    this.$http.get(BASEURL+'/app/announcementAction.action?tbResourceId&rid='+this.$route.params.id).then(response => {
      let data =response.body;

      if(data.result=="success"){
          this.noticeD=data.data[0];

         }


       else  if(data.result=="fail")
        alert(data.msg);
    });
  },
  methods:{
    noticeUpdate(){
      if(!this.user){
        return    this.$router.push({ path: '/login' });
      }
      let result=confirm("是否确定注销？");
      if(result){
        this.$http.get(BASEURL+'/app/announcementAction.action?updaRstate&rid='+this.$route.params.id).then(response => {
          let data =response.body;

          if(data.result=="success"){
              alert(data.data);
              this.$router.go(-1)
           }
          else  if(data.result=="fail")
            alert("注销失败！！");
        });
      }
    },
    curd(){
      this.isDow=!this.isDow;
    },
    noticeDelete(){
      if(!this.user){
          return this.$router.push({ path: '/login' });
      }
      let result=confirm("是否确定删除？");
      if(result){
        this.$http.get(BASEURL+'/app/announcementAction.action?delResource&rid='+this.$route.params.id).then(response => {
          let data =response.body;

          if(data.result=="success"){
              alert(data.data);
              this.$router.go(-1)
           }
          else  if(data.result=="fail")
            alert("删除失败！！");
        });
      }
    },
      noticeEdit(){
        if(this.$root.isLogin()){
           this.$router.push({ name: 'eoticeedit',params:{id:this.$route.params.id}});
        }else{

           this.$router.push({ path: '/login' });
        }
    },


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
#noticeD{

  .down-panel{
    position: absolute;
    right: 0;
    top: $h;
    width: 80px;
    text-align: center;
    z-index: 9999;
    background: #efefef;
    border-radius:0 0 15px 15px;
    opacity: 0;
    transition: all .5s;
    &.opend{
      opacity: 1;

    }
    li{
        position: relative;
       padding: 10px 0;
       &:after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          transform: scaleY(.5);
        //  border-bottom: 1px solid  #c1c1c1;
       }
      a{
        font-size: 16px;
        color:#48a8e3;
        &.red{
          color:#f00;
        }
      }
    }

  }

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
