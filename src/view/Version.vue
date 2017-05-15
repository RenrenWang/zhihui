<template>
  <div id="version">
       <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
      <main class="main">
            <div class="v-conetnt">
                <div class="items">

                    <p><span class="img-logo"></span></span>
                    <p>{{vInfo.prodName}}</p>
                    <p>{{vInfo.versionInfo}}</p>
                    <p><a :href="vInfo.releaseUri">检查更新</a></p>
                </div>
            </div>
      </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
export default {
  name: 'version',
  data(){
    return{
      topTitle:"版本信息",
      icon:"icon-jiantou",
      vInfo:{},
    }
  },
  components:{
    VHeader
  },
  mounted(){
    if(this.$root.isAndroid()){
      this.getData("APP-IANDROID");
    }
    if(this.$root.isIos()){
      this.getData("APP-IIOS");
    }
  //this.$http.get(BASEURL+'/app/versionInfo.action?versionType=APP-IANDROID%20&callback=jQuery18306862034124787897_1444874513140')

   },
   methods:{
  getData(versionType){
    this.$http.get(BASEURL+'/app/versionInfo.action?versionType='+versionType+'&callback=jQuery18306862034124787897_1444874513140').then(response=>{
        let data=response.body;
        if(data.result=="success")
        {
           this.vInfo=data.data;
        }else if(data.result=="fail"){
            alert(data.msg);
        }
    })

    }
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
.v-conetnt{
  height: 100%;
  display: flex;
   justify-content:center;
    align-items:center;
    text-align: center;
    font-size: 16px;
    .items{
      p{
       margin-bottom:20px;
       >.img-logo{
         display: inline-block;
         height: 100px;
          width: 100px;
          background: url('/static/images/ic_launcher.png')  no-repeat center/cover;

       }
       a{
         display:inline-block;
         padding: 12px 35px;
         border: 1px solid #377eb5;
         color: #377eb5;
         border-radius: 15px;
       }
      }
    }
}
</style>
