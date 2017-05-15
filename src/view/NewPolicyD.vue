<template>
  <div id="newpolicy">
            <VHeader  :subTitle="topTitle" :iconInfo="icon"/>
             <loading  :loading="isLoading"/>
             <ErrorMsg   :error="isError"  :msg="msg"/>
            <PhDetails  v-if="!isError"  :btns="btndata" :details="newPolicyD"/>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import PhDetails from '../components/PhDetails/PhDetails.vue'
import Loading from '../components/Loading/Loading.vue'
import ErrorMsg from '../components/ErrorMsg/ErrorMsg.vue'
export default {
  name: 'newpolicy',
  data(){
    return{
      topTitle:"政策详情",
      icon:"icon-jiantou",
      btndata:[{
        'id':1,
        "name":"办理资训"
      }],
      newPolicyD:{},
      isLoading:false,
      isError:false,
      msg:""
    }
  },
  mounted(){

      this.isLoading=true;
      this.isError=false;
       this.$http.get(BASEURL+'/app/pubInfo.action?viewSInfo=callback=jQuery18306862034124787897_1444874513140&infoType=TX&rid='+this.$route.params.id).then(response=>{
         let data= response.body;
         if(data.result=="success"){
             this.isLoading=false;
            this.newPolicyD=data.data;



         }else  if(data.result=="fail"){
           this.isError=true;
           this.msg=data.mgs;
         }else{
           this.isLoading=false;
           this.isError=true;
           this.msg="获取数据失败！！";
         }


       },response=> {

           this.isLoading=false;
           this.isError=true;
           this.msg="获取数据失败！！";

        });
  },
  components:{
    VHeader,PhDetails,Loading,ErrorMsg
  }
}
</script>

<style lang="scss">
.PhDetails{

}
</style>
