<template>
    <div id="company">
      <VHeader  :subTitle="topTitle"/>
      <loading  :loading="isLoading"/>
     <ErrorMsg   :error="isError"  :msg="msg"/>
      <main class="main" ref="imglist">
        <div class="card">
            <ul class="card-list">
               <li v-for="v in imglist"><router-link :to="{ name:'companydetails',params: { id: v.qdPrid }}"><img :src="v.gyImguri|setUrl" :title="v.title"/><p>{{v.qdQymc}}</p></router-link></li>
          

            </ul>
        </diV>
      </main>
    </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import Loading from '../components/Loading/Loading.vue'
import ErrorMsg from '../components/ErrorMsg/ErrorMsg.vue'
export default {
  name: 'company',
  data(){
    return{
       topTitle:"园区企业",
       page:1,
       imglist:[],
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
this.moreDate(this.$refs.imglist, _.debounce(this.getData,300));
  },
  methods:{
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
            this.imglist=this.imglist.concat(result.data);
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
    this.$http.get(BASEURL+'/app/enterpriseInfo.action?compNameList&qdQymc=&pageno='+this.page).then(response=>{
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
<style lang='scss'>
@import "../assets/style/rem.scss";
#company{
    .card-list{
     display: flex;
     flex-wrap: wrap;
     >li{
       flex-basis: 33.333%;
       padding: rem(20px);
       box-sizing: border-box;
       >a{
         display: block;
         width: 100%;
         font-size: 14px;
         text-align: center;
         >p{
          padding: 5px 0;
          line-height: 20px;
         }
        >img{
           width: 100%;

         }
       }
     }
    }
}

</style>
