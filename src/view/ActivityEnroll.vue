<template>
  <div id="activityenroll">
          <VHeader  :subTitle="topTitle" :iconInfo="icon" :text="hText"  @action="fn()"/>
          <main class="main">
            <form class="edit-form">
                  <div class="edit-input  textarea">
                        <span>报名描述：</span><input type="text" v-model="qydescription" />
                  </div>
                  <div class="edit-input">
                        <span>企业名称：</span><input type="text" v-model="qyname" />
                  </div>
                  <div class="edit-input">
                        <span>联系电话：</span><input type="text" v-model="qyphone" />
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
     hText:"报名",
     user:this.$root.isLogin(),
     qydescription:"",
     qyname:"",
     qyphone:"",
     qyid:""

   }
 },
 mounted(){
  if(this.user){

    this.qyname=this.user.qdQymc;
    this.qyphone=this.user.qdLxfs;
    this.qyid=this.user.qdPrid;
    this.qyusername=this.user.qdFzr;
  }
 },
 methods:{

   fn(){


     this.$http.get(BASEURL+'/app/pubInfo.action?sbInfo=&callback=jQuery18306862034124787897_1444874513140&LRID='+ this.$route.params.id+'&LCID=HD&LUSER_ID='+this.qyid+'&LPOLICY_TYPE=ZZ&LPOST_TEXT='+this.qydescription+'&LPOST_LXR ='+this.qyname+'&LPOST_TEL='+this.qyphone).then(response=>{
      let data= response.body;
     if(data.result=="success"){

         return alert(data.msg);
     }else if(data.result=="fail"){
        return alert(data.msg);
     }else{
         return alert("报名失败！！");
     }

     },response=>{
        return alert("报名失败！！");
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
  overflow: hidden;

.main{
  bottom:0;
}
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
  }
}

</style>
