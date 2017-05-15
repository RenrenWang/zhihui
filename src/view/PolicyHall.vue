<template>
  <div id="policyHall">
     <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
     <div class="tab">
         <ul class="tab-list">
            <li><a href="javascript:;" :class="{'tab-active':isShow_1}" @click.stop="tabChange_1(isShow_1)">最新政策</a></li>
            <li><a href="javascript:;" :class="{'tab-active':isShow_2}" @click.stop="tabChange_2(isShow_2)">专项申报</a></li>
         </ul>
     </div>
      <main class="main">
           <div class="tab-content">
              <loading  :loading="isLoading"/>
             <ErrorMsg   :error="isError"  :msg="msg"/>
             <ul class="tab-content-list tab-content-list-1" v-show="isShow_1"  ref="listView_1">
                 <li v-for="v in newPolicyList">
                     <router-link :to="{ name: 'newPolicy', params: { id: v.rid }}">
                        <div class="top clearfix">
                             <p class="tag fl"><span>{{v.typeName|setType}}</span></p>
                             <p  class="fr"><span class="iconfont icon-shijian"></span>{{v.rverifydate}}</p>
                        </div>
                         <h5>{{v.rsubject}}</h5>

                         <div class="push-info">
                            <p class="from">{{v.rverifyname}}</p>
                             <p class="fr"><span class="iconfont icon-chakan"></span>{{v.rcount}}</p>
                         </div>
                      </router-link>
                 </li>
                <li v-show="this.isNoData" id="loadingLast">{{Tx}}</li>
              </ul>
                <ul class="tab-content-list tab-content-list-2"  v-show="isShow_2" ref="listView_2">
                     <li v-for="v in specialList">
                        <router-link :to="{ name: 'special', params: { id: v.rid }}">
                            <h5><span class="tips">{{v.rshowmode|isApply}}</span>{{v.rsubject}}</h5>
                            <p class="from">{{v.rverifyname}}</p>
                            <div class="push-info">
                                <p><span class="iconfont icon-shijian"></span>{{v.rverifydate}}</p>
                                <p class="fr"><span class="iconfont icon-chakan"></span>{{v.rcount}}</p>
                            </div>
                         </router-link>
                    </li>
                <li  v-show="this.isNoData" id="loadingLast2">{{Tx}}</li>

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
  name: 'policyHall',
  data(){
    return{
      topTitle:"政策大厅",
      icon:"icon-jiantou",
      isShow_1:true,
      isShow_2:false,
     isLoading:false,
      isNoData:false,
      isError:false,
      msg:"",
      Tx:"",
      newPolicyList:[],
      specialList:[],
       page_1:1,
        page_2:1,



       error_:"数据获取失败！！！",

    }
  },
  mounted(){
    console.log("mounted"+this.newPolicyList.length);
    this.getTab_1();
    this.moreDate(this.$refs.listView_1, _.debounce(this.getTab_1,300));
    this.moreDate(this.$refs.listView_2, _.debounce(this.getTab_2,300));

  },
  methods:{


    tabInit(){

      this.isNoData=false;
      this.isLoading=false;
      this.msg="";
      this.Tx="";
      this.newPolicyList=[];
      this.specialList=[];
      return false;
    },
    tabChange_1(t){

       if(t){
           return ;
       }
       this.tabInit()
       this.isShow_1=true;
        this.isShow_2=false;
      this.page_1=1;
      console.log("tab_1");
      this.getTab_1();
    },
    tabChange_2(t){
      if(t){
          return ;
      }
        this.tabInit();
        this.isShow_1=false;
         this.isShow_2=true;
        this.page_2=1;
       console.log("tab_2");
     this.getTab_2();
    },
    getTab_1(e){


      console.log("page"+this.page_1);
      this.ajax('TX',this.page_1,(err,result)=>{
            if(err)
            this.msg=err;
            else{
              this.page_1=this.page_1+1;
                if(result.data.length>0){

                console.log("------>"+result.data.length);
                this.newPolicyList=this.newPolicyList.concat(result.data);
              }
              //  console.log(result.data.length);
            }

      });
    },
    getTab_2(e){

      this.ajax('SB',this.page_2,(err,result)=>{
            if(err)
            this.msg=err;
            else{

              this.page_2=this.page_2+1;
              if(result.data.length>0)
              this.specialList=this.specialList.concat(result.data);
              //  console.log(result.data.length);
            }

      });
    },
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
    ajax(type,page,callback){
      if(this.isNoData){
        this.Tx="我是有底线的 ";
        return false;
      }

    this.isLoading=true;
      // this.Tx="正在加载数据...";
    this.$http.get(BASEURL+'/app/pubInfo.action?infoType='+type+'&callback=jQuery18306862034124787897_1444874513140&pageno='+page).then(response=>{
     let body=response.body;
      this.isLoading=false;
    // if(!body.data){
    //     this.isNoData=true;
    // }
    if(body.result=="fail"){
       return  callback(body.msg);
    }
   if(body.result=="success"){
      //  console.log(body.data.length);
    //  if(body.)
      if(body.maxpage<page+1){
          this.isNoData=true;
      }
      return  callback(null,body);

     }
      this.isError=true;
     callback(this.error_);

    },response=> {
         this.isNoData=false;
        this.isLoading=false;
      this.isError=true;
        callback(this.error_);

     });

    }

  },
  filters:{
    isApply(n){
      return n==1?"【申请】":"";
    },
    setType(str){
      return str?str:"普通";
    }
  },
  components:{
    VHeader,Loading,ErrorMsg
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
#policyHall{
   .main{
     top:$h*2;
     bottom:0;
     overflow: hidden;
    background: #f2f2f2;
   }

   .tab{
     position: fixed;
     width: 100%;
     overflow: hidden;
      padding-top:$h;
      text-align: center;

      >.tab-list{
        height: $h;
        line-height:$h;
        display: flex;
        border-bottom: 1px solid  #dfdfdf;
        box-sizing: border-box;
        >li{
          flex:1;
          border-right: 1px solid  #dfdfdf;
          >a{
            font-size: 16px;
            &.tab-active{
              color:#4a9fe2;
            }
          }
       }
      }
   }

}
.tab-content-list{
  position: fixed;
  top:$h*2;
  bottom: 0;
   width: 100%;


  overflow-x: hidden;
    >li{
      margin-top: rem(10px);
      padding: rem(30px) 0;
     border-bottom: 1px solid  #dfdfdf;
 border-top: 1px solid  #dfdfdf;
       background: #fff;
      >a{
        position: relative;
        line-height: rem(45px);
        padding: 0 rem(20px);
        height: 100%;
        display: block;
        .top{
          margin-bottom: rem(30px);
        }
        .tag{


          background:url('../assets/images/tag.png') no-repeat  center/cover;
          width: rem(130px);
          height: rem(45px);
          line-height:  rem(45px);
          color: #fff;
        >span{

          padding-left: 10px;

         }
        }
        >h5{

           margin-bottom: rem(20px);
          font-size: 16px;
          >.tips{
            color: #efc183;
          }
        }



      }
    }

    &.tab-content-list-1{
        margin-top: 0;

      background: #fff;
      >li{
        margin:0;
        border-top:none;
      }
     }
}



</style>
