<template>
  <div id="login">
            <VHeader :subTitle="topTitle" :iconInfo="icon"/>
            <main class="main">
              <form class="login-form">
                    <input type="text"  placeholder="用户名" v-model="username" class="input-text">

                    <input type="password"  placeholder="密码" v-model="password" class="input-text">
                    <input  type="button"   value="登录"  class="input-button"  @click="checkLogin()"/>
              </form>
            </main>
  </div>
</template>

<script>
import VHeader from '../components/Header/Header.vue'
export default {
  name: 'login',
  data(){
    return{
      topTitle:"登录",
      icon:"icon-jiantou",
      username:"",
      password:""
    }
  },
   mounted(){

   },
  methods:{
   checkLogin(){
     if(!this.username||this.username=='')
    return  alert("用户名不能为空");
     if(!this.password||this.password=='')
    return alert("密码不能为空");
     this.$http.get(BASEURL+'/app/sysLogin.action?appEpLogin=&epLoginName='+this.username+'&epLoginPwd='+this.password+'&callback=jQuery18306862034124787897_1444874513140').then(response=>{
     let data=response.body;
     if(data.result=="success"){
      localStorage.setItem('user',JSON.stringify(data.data));
      localStorage.setItem('password',this.password);
         alert("登录成功！！")
      return    this.$router.go(-1);
     }else if(data.result=="fail"){
        return alert(data.msg);
     }
      return alert("登录失败！！");
     },response=>{
        return alert("登录失败！！");
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
.login-form{
  width:90%;
  margin:0 auto;
  input{
    margin: rem(50px) 0;
    display: block;
    height: rem(120px);
    width:100%;

    border:none;
    &.input-text{
      padding-left: 15px;
      box-sizing: border-box;
      background: #eceaea;
    }
    &.input-button{
      margin-top: rem(80px);
      background:#0e93e6;
      color: #fff;
      font-size: 16px;
    }
  }

}
</style>
