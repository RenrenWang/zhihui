<template>
  <div id="enterprisedemand">
     <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
     <div class="tab">
         <ul class="tab-list">
            <li><a href="javascript:;" :class="{'tab-active':isShow_1}" @click.stop="tabChange_1(isShow_1)">诉求查询</a></li>
            <li><a href="javascript:;" :class="{'tab-active':isShow_2}" @click.stop="tabChange_2(isShow_2)">诉求提报</a></li>
         </ul>
     </div>
     <div class="select-box" v-show="isShow_1">
         <div class="group-inpt">
               <input type="text"  class="input-text" @blur="inputBlur" @focus="inputFocus"  v-model="inputSelect"  placeholder="请输入您要搜索的内容"/>
               <span class="iconfont icon-search" :class="{pleft:isMove}"></span>
               <span class="iconfont icon-shanchu" v-show="isChange" @click="deleteValue"></span>
         </div>

     </div>
      <main class="main">


           <div class="tab-content">
              <loading  :loading="isLoading"/>
             <ErrorMsg   :error="isError"  :msg="msg"/>
             <ul class="tab-content-list tab-content-list-1" v-show="isShow_1"  ref="listView_1">
                 <li v-for="v in newPolicyList">
                     <!-- <router-link :to="{ name: 'newPolicy', params: { id: v.fAskid }}"> -->
                   <a  href="javascript:;">
                        <div class="top clearfix">
                             <h5>{{v.fAskname}}</h5>

                        </div>

                         <div class="center">
                               <p ><span>资讯时间：</span>{{v.fAskcreatedate}}</p>
                                  <p ><span>办理部门：</span>{{v.qdQymc}}</p>
                                     <p><span>办理状态：</span>{{v.fAskstatus|cStatus}}</p>

                         </div>
                         <div class="push-info clearfix">

                             <p class="fr">编号：{{v.fAskid}}</p>
                         </div>
                      </a>
                 </li>
                <li v-show="this.isNoData" id="loadingLast">{{Tx}}</li>
              </ul>
                <!-- <ul class="tab-content-list tab-content-list-2"  v-show="isShow_2" ref="listView_2">
                     <li v-for="v in specialList">
                        <router-link :to="{ name: 'special', params: { id: v.rid }}">
                            <h5>{{v.rsubject}}</h5>
                            <p class="from">江干科技局</p>
                            <div class="push-info">
                                <p><span class="iconfont icon-shijian"></span>{{v.rverifydate}}</p>
                                <p class="fr"><span class="iconfont icon-chakan"></span>20</p>
                            </div>
                         </router-link>
                    </li>
                <li  v-show="this.isNoData" id="loadingLast2">{{Tx}}</li>

                </ul> -->

           </div>
      </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import Loading from '../components/Loading/Loading.vue'
import ErrorMsg from '../components/ErrorMsg/ErrorMsg.vue'
export default {
  name: 'enterprisedemand',
  data(){
    return{
      topTitle:"企业诉求",
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
        isChange:false,
        isMove:false,
        inputSelect:'',


       error_:"数据获取失败！！！",

    }
  },

  mounted(){
    console.log("mounted"+this.newPolicyList.length);
    this.getTab_1();
    this.moreDate(this.$refs.listView_1, _.debounce(this.getTab_1,300));
    this.moreDate(this.$refs.listView_2, _.debounce(this.getTab_2,300));

  },
  watch: {
   // 如果 question 发生改变，这个函数就会运行
   inputSelect(str) {
    // this.answer = 'Waiting for you to stop typing...'
       //   this.getAnswer()

       this.isChange=str==""?false:true;


   }
 },
 filters:{
   cStatus(s){
     console.log(s);
      return s==1? "处理完成":"未处理完";
   }
 },
  methods:{
    inputBlur(){
    if(event.target.value==""){
        this.isMove=false;
    }

    },
    inputFocus(e){

          this.isMove=true;


    },
    deleteValue(){
      this.inputSelect='';
      this.isChange=false;
    },

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
    this.$http.get(BASEURL+'/app/businessDemandsAction.action').then(response=>{
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
      if(1<page+1){
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

  components:{
    VHeader,Loading,ErrorMsg
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
#enterprisedemand{

  $pd:rem(40px);
  $inputH:rem(65px);
  $tab_h:rem(15px);
  background: #efeff4;
  overflow: hidden;
  height: 100%;
   .tab{


     position: fixed;

      overflow: hidden;

      text-align: center;
        width:80%;
     height:$h - $tab_h;
       top:$h+$pd;
       border: 1px solid #4a9fe2;
      border-radius: rem(15px);
      box-sizing: border-box;
       left: 50%;

      margin-left:-40%;
      background: #fff;
      z-index: 999;
      >.tab-list{

           height: $h - $tab_h;
           line-height:$h - $tab_h;
            display: flex;

                  box-sizing: border-box;

        >li{


          flex:1;

          &:first-of-type{
              border-right: 1px solid  #4a9fe2;
          }
          >a{

          display: block;
            font-size: 16px;
              color:#4a9fe2;
            &.tab-active{
              color:#fff;
              background: #007afc;
            }
          }
       }
      }
   }

   .tab-content-list{
     position: fixed;
     top:$h*2+$pd*3+$inputH - $tab_h;
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
             margin-bottom: rem(10px);

             >h5{

                margin-bottom: rem(20px);
                font-size: 16px;

             }
           }

       .center{
         p{
           margin: 0;
           color: #868686;
            font-size: 12px;
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


  .select-box{
 position: fixed;
 top:$h*2+$pd - $tab_h;
   padding: $pd  0;
  background: #efeff4;
width: 100%;
   border-bottom: 1px solid #dfdfdf;
   z-index: 999;
  .group-inpt{

      position: relative;
      height: $inputH;
       width: rem(600px);
       margin: 0 auto;
       border: 1px solid #a9a9ab;
       border-radius: rem(30px);
       padding: 0 32px;
       box-sizing: border-box;
      background-color: rgba(0, 0, 0, .1);
   }
    .input-text{
      display: block;
      height: 100%;
      width:100%;
      box-sizing: border-box;
       text-align: center;
       border: none;
       outline: none;
       color: #000;
        border-radius: rem(30px);
       background:none;
   }
    .icon-search{
     position: absolute;
      top:rem((65px-35px)/2);
      left: rem(105px);
     color: #a9a9ab;
     transition: all .5s;
     &.pleft{
       left: rem(32px);
       }
    }
    .icon-shanchu{
      position: absolute;
      top:rem((65px-35px)/2);

      right:  rem(32px);
    }
  }
  .main{
    top:$h*2;
    bottom:0;
    overflow: hidden;
   background: #f2f2f2;
  }
}


</style>
