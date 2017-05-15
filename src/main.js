// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import './assets/js/flexible.js'
import './assets/fonts/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import _  from 'lodash';


Vue.use(VueAwesomeSwiper)
global.BASEURL="http://121.40.241.28:7070";
//global.BASEURL="";
Vue.filter('setUrl', function (url) {
   return BASEURL+'/app'+url;
});
Vue.filter('setdate', function (inputTime) {
  var date = new Date(inputTime);
     var y = date.getFullYear();
     var m = date.getMonth() + 1;
     m = m < 10 ? ('0' + m) : m;
     var d = date.getDate();
     d = d < 10 ? ('0' + d) : d;
     var h = date.getHours();
     h = h < 10 ? ('0' + h) : h;
     var minute = date.getMinutes();
     var second = date.getSeconds();
     minute = minute < 10 ? ('0' + minute) : minute;
     second = second < 10 ? ('0' + second) : second;
     return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;

});
Vue.config.productionTip = false
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mounted(){
       if(this.isLogin()){
         let user=this.isLogin();

          this._ajax(user.qdQymc,localStorage.getItem('password'),(err,result)=>{
            if(err){
              console.log('d');
              localStorage.setItem('user',JSON.stringify(result.data));
              return true;
           }else{
              localStorage.removeItem('user');
             localStorage.removeItem('password');
              return  false;
            }
          })
       }
  },
   methods:{
     OS(){
      // let  app = navigator.appVersion;
          return  navigator.userAgent;
     },
    isAndroid(){
     let u=this.OS();
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器

    },
    isIos(){
       let u=this.OS();


        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    },
    isLogin(){
      let user=localStorage.getItem("user");
      if(user&&user!=""){
        user=(JSON.parse(user))[0];
        return user;
      }else{

         return false;
      }


    },
    getData(callback){
      let user=this.isLogin();

       if(user){
         this._ajax(user.qdQymc,localStorage.getItem('password'),(err,result)=>{

           if(err){

            localStorage.setItem('user',JSON.stringify(result.data));

            return callback(true);
          }else{

            return callback(false);
           }
         })
       }
    },
    _ajax(name,password,callback){
      this.$http.get(BASEURL+'/app/sysLogin.action?appEpLogin=&epLoginName='+name+'&epLoginPwd='+password+'&callback=jQuery18306862034124787897_1444874513140').then(response=>{
      let data=response.body;
      console.log(data);
      if(data.result=="success"){

       return callback(true,data);
      }else if(data.result=="fail"){
         return callback(false);
      }
       return callback(false);
      },response=>{
         return callback(false);
      })
    },
    logout(){
        let user=localStorage.getItem("user");
        if(user&&user!=""){
          let m=localStorage.removeItem("user");
            console.log(m);
          return true;
        }else{
           return false;
        }
    }
   },
  router,
  template: '<App/>',
  components: { App }
})
