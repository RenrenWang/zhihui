<template>
  <div id="edituser">
          <VHeader  :subTitle="topTitle" :iconInfo="icon" :text="hText"  @action="postInfo"/>
          <main class="main">
            <form class="edit-form">
                  <div class="edit-input">
                        <span>企业名称：</span><input type="text" v-model="qyname" disabled/>
                  </div>
                  <div class="edit-input">
                        <span>联系人：</span><input type="text" v-model="qyusername" />
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
  name: 'edituser',
 data(){
   return{
     topTitle:"企业资料",
     icon:"icon-jiantou",
     hText:"保存",
     user:this.$root.isLogin(),
     qyname:"",
     qyusername:"",
     qyphone:""


   }
 },
 mounted(){
  if(this.user){
    this.qyname=this.user.qdQymc;
    this.qyusername=this.user.qdFzr;
    this.qyphone=this.user.qdLxfs;
  }
 },
 methods:{

   postInfo(){

     if(this.qyname=='')
    return  alert("企业名称不能为空");
     if(this.qyusername=='')
    return alert("联系人不能为空");
    if(this.qyphone=='')
    return alert("联系人号码不能为空");
     this.$http.get(BASEURL+'/app/enterpriseInfo.action?saveEditEinfo=&qdPrid='+this.user.qdPrid+'&qdFzr='+this.qyusername+'&qdLxfs='+this.qyphone+'&callback=jQuery18306862034124787897_1444874513140').then(response=>{
     let data=response.body;
     if(data.result=="success"){
    //  localStorage.setItem('user',JSON.stringify(data.data));


        this.$root.getData(result=>{
                if(result)
                return  alert(data.data);
                return alert("修改失败！！");

        });

     }else if(data.result=="fail"){
        return alert(data.msg);
     }else{
         return alert("修改失败！！");
     }

     },response=>{
        return alert("修改失败！！");
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
.edit-form{
   .edit-input{
     padding:rem(30px)  0;
     margin:rem(15px);
     border-bottom:1px solid #d6d6d6;
     display: flex;
      font-size: 16px;

     span{
       color: #b5b0b0;
       flex-basis:100px;
       display: inline-block;
     }
     input{
       flex: 1;
       width: 80%;
        display: inline-block;
        border:none;
       outline: none;
       background: #fff;
     }
   }
}
</style>
