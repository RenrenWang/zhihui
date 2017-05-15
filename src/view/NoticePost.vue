<template>
  <div id="noticepost">
          <VHeader  :subTitle="topTitle" :iconInfo="icon" :text="hText"  @action="fn()"/>
          <main class="main">
            <form class="edit-form">
                  <div class="edit-input  textarea">
                        <span>通知内容：</span><input type="text" v-model="ncontent" />
                  </div>
                  <div class="edit-input">
                        <span>通知标题：</span><input type="text" v-model="ntitle" />
                  </div>
                  <div class="edit-input">
                        <span>发布人姓名：</span><input type="text" v-model="npostname" />
                  </div>
            </form>
          </main>

  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
export default {
  name: 'noticepost',
 data(){
   return{
     topTitle:"通知发布",
     icon:"icon-jiantou",
     hText:"发布",
     user:this.$root.isLogin(),
     ncontent:"",
     ntitle:"",
     npostname:"",


   }
 },

 methods:{

   fn(){

     if(!this.user){
      return     this.$router.push({ path: '/login' });
     }
    if(this.ncontent==""){
      return alert("通知内容不能为空");
    }
    if(this.ntitle==""){
      return alert("通知标题不能为空");
    }
    if(this.npostname==""){
      return alert("发布人姓名不能为空");
    }

     this.$http.get(BASEURL+'/app/announcementAction.action?inseResource&rcreatename='+this.user.qdQymc+'&rsubject='+this.ntitle+'&rcontent='+this.ncontent+'&rverifyName='+this.npostname).then(response=>{
      let data= response.body;
     if(data.result=="success"){
       this.ncontent="";
       this.ntitle="";
         return alert("发布成功！！");
     }else if(data.result=="fail"){
        return alert(data.msg);
     }else{

       return alert("发布失败！！");
     }

     },response=>{
        return alert("发布失败！！");
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
#noticepost{
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
