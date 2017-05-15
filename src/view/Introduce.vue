<template>
    <div id="introduce">
         <VHeader :subTitle="topTitle" />
         <loading  :loading="isLoading"/>
        <ErrorMsg   :error="isError"  :msg="msg"/>
         <main class="main" ref="morelist">
            <VCarousel :carousels="toplist" />
           <div class="pdding20">
                <div class="introduce-section">
                  <h3 class="mintit">{{introduceInfo_1.name}}</h3>
                  <p :class="['text',{'length':isShow}]" >
                   {{introduceInfo_1.text}}

                  </p>
                  <span @click="changshow()" class="fr" style="margin-top:10px;fontSize:14px;color:#4fa6eb">{{isShowText}}</span>
                </div>
                <div class="introduce-section">
                  <h3 class="mintit">{{introduceInfo_2.name}}</h3>
                  <ul class="introduce-list">
                       <li v-for="v in introduceInfo_2.list">
                        <router-link :to="{ name: 'terraceDetails', params: { id: v.fqkId }}">
                            <img :src="v.fqkLogo|setUrl" :title="v.fqkQkmc"/>
                            <p class="imgtit">{{v.fqkQkmc}}</p>
                         </router-link>
                       </li>
                      
                  </ul>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import VCarousel from '../components/Carousel/Carousel.vue'
import Loading from '../components/Loading/Loading.vue'
import ErrorMsg from '../components/ErrorMsg/ErrorMsg.vue'
export default {
  name: 'introduce',
  data(){
    return{
        topTitle:"园区介绍",
        isLoading:false,
        isNoData:false,
        isError:false,
        msg:"",
        Tx:"",
       error_:"数据获取失败！！！",
       page:1,
        toplist:[
           {'title':"杭州钱塘智慧城",url:BASEURL+"/app/images/benchimg/bimg1.png"},
           {'title':"杭州钱塘智慧城",url:BASEURL+"/app/images/benchimg/bimg2.png"},
           {'title':"杭州钱塘智慧城",url:BASEURL+"/app/images/benchimg/bimg3.png"},
            {'title':"杭州钱塘智慧城",url:BASEURL+"/app/images/benchimg/bimg4.png"},
             {'title':"杭州钱塘智慧城",url:BASEURL+"/app/images/benchimg/bimg5.png"},
              {'title':"杭州钱塘智慧城",url:BASEURL+"/app/images/benchimg/bimg6.png"},
               {'title':"杭州钱塘智慧城",url:BASEURL+"/app/images/benchimg/bimg7.png"}

         ],
          introduceInfo_1:{"name":"杭州钱塘智慧城","text":"杭州钱塘智慧城位于江干区东部，是杭州东部副城、新城联接交汇之地，涵盖九堡街道、江干科技经济园及杭州国际商贸城江干区辖区，面积15.3平方公里。四至范围东至江干区和杭州经济技术开发区交界，南接钱塘江，西至德胜路、红普路、三福路，北至江干区和余杭区交界。杭州钱塘智慧城按照“551”的发展定位（即“五业五区一中心”），重点发展智能制造、电子商务（跨境电商）、信息服务、现代商贸、医疗健康五大产业，着力打造人才管理改革试验区、协同创新发展示范区、科技金融创新先行区、城市转型发展先导区、科技成果转化实践区，成为杭州东部科技创新中心。发展目标是到2020年基本建成为高端要素集聚、发展特色鲜明、辐射带动强劲、创新生态一流的重要平台，形成“西有未来科技城、东有钱塘智慧城”格局，实现高新技术产业销售产值500亿元，财政总收入100亿元，引进培养“国家千人计划”、“省千人计划”、“市521”等人才100人。乘着“大众创业、万众创新”的东风，未来,钱塘智慧城将成为投资的热土和创业创新的天堂，努力形成杭州“西有未来科技城、东有钱塘智慧城”的发展格局 。"
},
isShow:true,
isShowText:"展开",
introduceInfo_2:{"name":"平台",list:[]}

    }
  },
  mounted(){

       this.getData();
   this.moreDate(this.$refs.morelist, _.debounce(this.getData,300));
  },
  methods:{
  changshow(){
    this.isShow=!this.isShow;
     this.isShowText=this.isShow?"展开":"收起";
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
  getData(){
    this.ajax((err,result)=>{
          if(err)
          this.msg=err;
          else{

            this.page=this.page+1;
            if(result.data.length>0)
          this.introduceInfo_2.list=this.introduceInfo_2.list.concat(result.data);
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
  this.$http.get(BASEURL+'/app/qukuaiAction.action?callback=jQuery18306862034124787897_1444874513140&pageno='+this.page).then(response=>{
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

     }
  },
  components:{
    VHeader,VCarousel,Loading,ErrorMsg
  }
}
</script>
<style lang='scss'>
@import "../assets/style/rem.scss";
#introduce{

    .main{

        background: #fff;
        padding: 0;

    }
    .introduce-section{
      margin-top: rem(30px);

      .mintit{
        padding: rem(10px) 0 rem(10px) rem(10px);
        border-left:4px solid #4fa6eb;
        font-size: 18px;
        color: #4fa6eb;

      }
      .text{
        margin-top: rem(15px);
        font-size: 14px;
        line-height: 20px;
        text-indent: 25px;
        letter-spacing: 1.5px;

      }
      .length{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
       }
      .introduce-list{
        margin-top: rem(30px);

         display: flex;
         flex-wrap:wrap;
        >li{
          flex-basis: 50%;
          padding: rem(5px);
          box-sizing: border-box;
          position:relative;
          text-align: center;
          >a{
            display: block;
            width: 100%;
            >img{
              width: 100%;

              height: 239px;
            }
            >.imgtit{
              position: absolute;
              width:100%;
              bottom: rem(45px);

              font-size: 16px;
              color: #fff;
              z-index: 10;

            }
          }
        }
      }
    }

}


</style>
