<template>
  <div id="activity">
     <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
     <loading  :loading="isLoading"/>
    <ErrorMsg   :error="isError"  :msg="msg"/>
    <main class="main"  ref="listView">
       <div class="listview" >

            <ul>
                <li v-for="v in  list">
                   <router-link  :to="{name:'activityD',params: { id: v.rid }}">
                           <img :src="v.activityImgurl|setUrl" />
                           <div class="item-text">
                               <h5 class="text-hidden">{{v.rsubject}}</h5>
                                <p class="text-hidden"><span class="iconfont icon-touxiang"></span>{{v.activityLead}}</p>
                                <p  class="text-hidden"><span class="iconfont icon-shijian"></span>{{v.activityReldate}}</p>
                                 <p  class="text-hidden"><span class="iconfont icon-dizhi"></span>{{v.activitySite}}</p>

                           </div>
                   </router-link>
                 </li>
              <li  v-show="isNoData" id="loadingLast">{{Tx}}</li>
            </ul>
       </div>
    </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import Loading from '../components/Loading/Loading.vue'
import ErrorMsg from '../components/ErrorMsg/ErrorMsg.vue'
export default {
  name: 'activity',
  data(){
    return{
      topTitle:"园区活动",
      icon:"icon-jiantou",
       isLoading:false,
       isNoData:false,
       isError:false,
       msg:"",
       Tx:"",
      error_:"数据获取失败！！！",
      page:1,
      list:[]
    }
  },
  mounted(){


      this.getData();
  this.moreDate(this.$refs.listView, _.debounce(this.getData,300));

  },

  methods:{

    //ajax(callback){
    //  this.isGetData=true;
    //  this.$http.get(BASEURL+'/app/pubInfo.action?infoType=HD&callback=jQuery18306862034124787897_1444874513140&pageno='+this.page).then(callback);

  //  }
  moreDate($domScroll,fn){

     $domScroll.addEventListener("scroll", (e)=>{

                     e.preventDefault();
                  //真实内容的高度
              let pageHeight = Math.max($domScroll.scrollHeight,$domScroll.offsetHeight);
              //视窗的高度
              let viewportHeight = $domScroll.innerHeight || $domScroll.clientHeight || 0;
              //隐藏的高度
              let scrollTop = $domScroll.pageYOffset ||  $domScroll.scrollTop || 0;
                if(scrollTop==0){
                    return false;
              }
              //   console.log("pageHeight:"+pageHeight+",viewportHeight:"+viewportHeight+",scrollTop:"+scrollTop);
             // console.log('------>'+(pageHeight-scrollTop-viewportHeight));

                //      this.number=pageHeight-scrollTop-viewportHeight;
                 if((pageHeight-scrollTop-viewportHeight)<=viewportHeight/2){
              // console.log(_);
              fn();
                      // (function(){
                      //      console.log( $domScroll);
                      //  },500);
                    //  $domScroll.style.transform="translate3d(0,-30px,0)";

                 }
     });



  },
  getData(){
    this.ajax((err,result)=>{
          if(err)
          this.msg=err;
          else{

            this.page=this.page+1;
            if(result.data.length>0)
            this.list=this.list.concat(result.data);
            //  console.log(result.data.length);
          }

    });
  },
  ajax(callback){
    if(this.isNoData){
      this.Tx="我是有底线的 ";
      return false;
    }

  this.isLoading=true;
    // this.Tx="正在加载数据...";
  this.$http.get(BASEURL+'/app/pubInfo.action?infoType=HD&callback=jQuery18306862034124787897_1444874513140&pageno='+this.page).then(response=>{
   let body=response.body;
    this.isLoading=false;

  if(body.result=="fail"){
     return  callback(body.msg);
  }
 if(body.result=="success"){

    if(body.maxpage<this.page+1){
        this.isNoData=true;
    }
    return  callback(null,body);

   }
    this.isError=true;
   callback(this.error_);

  },response=>{
       this.isNoData=false;
      this.isLoading=false;
       this.isError=true;
      callback(this.error_);

    })

     }
  },
  components:{
    VHeader,Loading,ErrorMsg
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
#activity{

    .main{
      bottom: 0;
    }
    .listview{
      >ul>li{


      >a{


          display: flex;
          padding: rem(25px);
          height: 100%;
          width: 100%;
         border-bottom: 1px solid  #dfdfdf;
      box-sizing: border-box;
         >img{
           flex-basis: rem(200px);
           width:rem(210px);
           height: rem(210px);
         }

      >.item-text{
         flex: 1;
         width: 100%;
         font-size: 14px;
          color: #575757;
          margin-left:rem(15px);
          >h5{
            margin-bottom: rem(25px);
            font-size:16px;
            color: #000;
          }
         >p{
         line-height: rem(45px);

         }
        }
      }
      }
    }
}
</style>
