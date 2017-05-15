<template>
  <div id="activityenroll">
          <VHeader  :subTitle="topTitle" :iconInfo="icon" :text="hText"  @action="fn()"/>
          <main class="main">
            <form class="edit-form">
                  <div class="edit-input">
                        <span>政策类别：</span>
                        <select v-model="xmtype"  class="select"  style=" width: 200px;background:none;border:none;outline:none">

                            <option :value ="v.codeName"  v-for="(v,i) in zclist"  >{{v.codeValue}}</option>

                        </select>
                  </div>
                  <div class="edit-input">
                        <span>企业名称：</span><input type="text" v-model="qyname" />
                  </div>
                  <div class="edit-input">
                        <span>联系电话：</span><input type="text" v-model="qyphone" />
                  </div>
                  <div class="edit-input  textarea">
                        <span>报名描述：</span><input type="text" v-model="xmdescription" />
                  </div>
            </form>
          </main>

  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
export default {
  name: 'activityenroll',
 data(){
   return{
     topTitle:"活动报名",
     icon:"icon-jiantou",
     hText:"申请",
     user:this.$root.isLogin(),
     xmtype:"",
     qyname:"",
     qyphone:"",
     xmdescription:"",
     zclist:[],

   }
 },
 mounted(){
  if(this.user){

    this.qyname=this.user.qdQymc;
    this.qyphone=this.user.qdLxfs;
    this.qyid=this.user.qdPrid;
    this.qyusername=this.user.qdFzr;
  }
  this.$http.get(BASEURL+'/app/pubInfo.action?policyType=callback=jQuery18306862034124787897_1444874513140').then(response=>{
     let data=response.body;
    if(data.result=="success"){
      this.zclist=data.data;
      this.xmtype=data.data[0].codeName;

    }
  },response=>{

  })

 },
 methods:{

   fn(){

     this.$http.get(BASEURL+'/app/pubInfo.action?sbInfo=&callback=jQuery18306862034124787897_1444874513140&LRID='+ this.$route.params.id+'&LCID=SB&LUSER_ID='+this.qyid+'&LPOLICY_TYPE='+this.xmtype+'&LPOST_TEXT='+this.xmdescription+'& LPOST_LXR ='+this.qyname+'&LPOST_TEL='+this.qyphone).then(response=>{
       let data= response.body;
      if(data.result=="success"){

          return alert(data.msg);
      }else if(data.result=="fail"){
         return alert(data.msg);
      }else{
          return alert("申请失败！！");
      }

      },response=>{
         return alert("申请失败！！");
      })

   }
 },
  components:{
    VHeader
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";
#activityenroll{
  .edit-input.textarea{

    flex-direction:column;
    span{
      flex-basis:30px;

      display: block;
      margin:0;
      padding: 0;
      overflow: hidden;
    }
    input{
        flex:1;
        height: 200px;
        width: 100%;
        background: #f5f5f5;
    }
    .select{
        display: block;

    }
  }
}

</style>
