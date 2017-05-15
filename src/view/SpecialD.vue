<template>
  <div id="special">
            <VHeader  :subTitle="topTitle" :iconInfo="icon" />
            <loading  :loading="isLoading"/>
            <ErrorMsg   :error="isError"  :msg="msg"/>
            <PhDetails v-if="!isError" :btns="btndata" :details="specialD"  @action="fn"/>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
import PhDetails from '../components/PhDetails/PhDetails.vue'
import Loading from '../components/Loading/Loading.vue'
import ErrorMsg from '../components/ErrorMsg/ErrorMsg.vue'
export default {
  name: 'special',
  data(){
    return{
      topTitle:"申报详情",
      icon:"icon-jiantou",
      btndata:[{
        'id':1,
        "name":"办理申请"
      },{
        'id':2,
        "name":"办理资询"
      }],
     specialD:{},
     isLoading:false,
     isError:false,
     msg:"",
      user:this.$root.isLogin(),
    }
  },
  mounted(){
      this.isLoading=true;

    this.$http.get(BASEURL+'/app/pubInfo.action?viewSInfo=&callback=jQuery18306862034124787897_1444874513140&infoType=SB&rid='+this.$route.params.id).then(response=>{
      let data= response.body;
      if(data.result=="success"){
          this.isLoading=false;
         this.specialD=data.data;


       console.log(data);
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
  methods:{
    fn(){

       if(this.user){
          this.$router.push({ name: 'specialenroll',params: { id:this.$route.params.id}});
       }else{

            this.$router.push({ path: '/login' });
       }
    }
  },
  components:{
    VHeader,PhDetails,Loading,ErrorMsg
  }
}
</script>

<style lang="scss">

</style>
