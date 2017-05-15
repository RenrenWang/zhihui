<template>
  <div id="notice">
      <VHeader  :subTitle="subTitle" :iconInfo="icon"  :text="hText"  @action="postNotice()"/>
      <loading  :loading="isLoading"/>
      <ErrorMsg   :error="isError"  :msg="msg"/>
      <main class="main" >
        <!-- <div class="select-box">
            <div class="group-inpt">
                  <input type="text"  class="input-text" @blur="inputBlur" @focus="inputFocus"  v-model="inputSelect"  placeholder="请输入您要搜索的内容"/>
                  <span class="iconfont icon-search" :class="{pleft:isMove}"></span>
                  <span class="iconfont icon-shanchu" v-show="isChange" @click="deleteValue"></span>
            </div>

        </div> -->
        <ul class="tab-content-list tab-content-list-2" ref="nlist" >
            <li v-for="v in noticeList">
                <router-link :to="{ name: 'noticeD', params: { id: v.rid }}">
                  <div class="newnotice"  v-if="isNew(v.bits)">最新通知</div>
                    <h5>{{v.rsubject}}</h5>
                    <p class="from">{{v.rverifyname}}</p>
                    <div class="push-info">
                        <p><span class="iconfont icon-shijian"></span>{{v.rverifydate|setdate}}</p>
                        <p class="fr"><span class="iconfont icon-chakan"></span>{{v.rcount}}</p>
                    </div>
                 </router-link>
            </li>
            <li  v-show="isNoData" id="loadingLast">{{Tx}}</li>

        </ul>
      </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import Loading from '../components/Loading/Loading.vue'
import ErrorMsg from '../components/ErrorMsg/ErrorMsg.vue'
export default {
  name: 'notice',
  data(){
    return {
      subTitle:"通知公告",
      icon:"icon-jiantou",
      hText:"发布",
      keycode:'',
      noticeList:[],
      isChange:false,
      isMove:false,
      inputSelect:'',
      isLoading:false,
      isNoData:false,
      isError:false,
      msg:"",
      Tx:"",
     error_:"数据获取失败！！！",
     page:1,

    }
  },
  mounted(){
    this.getData();
  this.moreDate(this.$refs.nlist, _.debounce(this.getData,300));

  },
  watch: {
   // 如果 question 发生改变，这个函数就会运行
   inputSelect(str) {
    // this.answer = 'Waiting for you to stop typing...'
       //   this.getAnswer()

       this.isChange=str==""?false:true;


   }
 },

  methods:{

    isNew(bis){

       return bis<=1?true:false;
    },
    postNotice(){
      if(this.$root.isLogin()){
         this.$router.push({ path: '/noticepost'});
      }else{

         this.$router.push({ path: '/login' });
      }
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

                   if((pageHeight-scrollTop-viewportHeight)<=viewportHeight/2){

                fn();

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
              this.noticeList=this.noticeList.concat(result.data);

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
    this.$http.get(BASEURL+'/app/announcementAction.action?tbResourcelist=').then(response=>{
     let body=response.body;
      this.isLoading=false;

    if(body.result=="fail"){
       return  callback(body.msg);
    }
   if(body.result=="success"){

      if(1<this.page+1){

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

    },

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
    }
  },
  components:{
    VHeader,ErrorMsg,Loading
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
#notice{
  .main{
     bottom: 0;
     background: #efefef;
  }
   $pd:rem(40px);
   $inputH:rem(65px);
  .select-box{
 position: relative;
   padding: $pd  0;
  background: #efeff4;

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
       color: #a9a9ab;
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
 .newnotice{
  transform: translate3d(-2px,-10px,0);
   padding: 1px 5px;
   display:inline-block;
   background: #ffd22a;
   color: #fff;
   border-radius:3px;
 }
  .tab-content-list{
    //  top:$h+$pd*2+$inputH;
    top:$h;
  }
}
</style>
