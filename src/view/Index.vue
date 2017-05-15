<template>
    <div id="index"  >


       <aside :class="['left-aside',{open:isOpen}]">
             <div class="aside-content">
                   <ul class="left-nav">
                       <li v-if="user"><router-link to="/edituser" class="text-hidden"><span class="lefticon   lefticon_1"></span><span>{{user.qdQymc}}</span></router-link></li>
                        <li v-else><router-link to="/login" class="text-hidden"><span class="lefticon   lefticon_1"></span><span>请登录</span></router-link></li>
                        <li><a herf="javascript:;"  @click.stop="slideout()"><span class="lefticon   lefticon_2"></span>主页</a></li>
                         <li><router-link to="/servecenter"><span class="lefticon   lefticon_3"></span>服务中心</router-link></li>
                          <li><router-link to="/version"><span class="lefticon   lefticon_4"></span>版本更新</router-link></li>
                   </ul>
                   <a  href="javascript:;" class="login-btn" v-if="user"  @click="logout()">注销</a>
                   <router-link v-else  to="/login"  class="login-btn">
                           登录
                   </router-link>


             </div>

       </aside>
       <div :class="['aside-bg',{isShow:isOpen}]"  @click.stop="slideout()"></div>
       <div class="header clearfix">

            <a href="javascript:;" class="iconfont  icon-touxiang fl"  @click.stop="slideout()"></a>
             <h1 class="logo">杭州钱塘智慧城</h1>
       </div>

       <main class="main">
           <VCarousel :carousels="toplist" />
            <div class="grid">

               <!-- <ul class="grid-list" v-for="vs  in columns">
                    <li class="grid-item" v-for="v in vs"><a href=""><img :src="v.icon" ></a></li>
               </ul> -->
               <ul class="grid-list" >
                    <li class="grid-item" v-for="v in columns"><router-link :to="v.url" :title="v.name"><img :src="v.icon" ></router-link></li>
               </ul>
           </div>

       </main>
    </div>
</template>

<script>

import VCarousel from '../components/Carousel/Carousel.vue'


export default {
  name: 'index',
  data(){
   return{
      user:this.$root.isLogin(),
     toplist:[
        {'title':"1",url:BASEURL+"/app/images/homeimg/himg1.png"},
        {'title':"1",url:BASEURL+"/app/images/homeimg/himg2.png"},
        {'title':"1",url:BASEURL+"/app/images/homeimg/himg3.png"},
        {'title':"1",url:BASEURL+"/app/images/homeimg/himg4.png"},
        {'title':"1",url:BASEURL+"/app/images/homeimg/himg5.png"},
        {'title':"1",url:BASEURL+"/app/images/homeimg/himg6.png"},
        {'title':"1",url:BASEURL+"/app/images/homeimg/himg7.png"}

        ],
      columns:

        [
          {
            'name':"","icon":"./static/images/images_homebtn1.png","url":"/notice"
          },
          {
            'name':"","icon":"./static/images/images_homebtn2.png","url":"/policyhall"
          },
          {
            'name':"","icon":"./static/images/images_homebtn3.png","url":"/activity"
          },

          {
            'name':"","icon":"./static/images/images_homebtn4.png","url":"/enterpriseservices"
          },
          {
            'name':"","icon":"./static/images/images_homebtn5.png","url":"/supply"
          },
          {
            'name':"","icon":"./static/images/images_homebtn6.png","url":"/enterprisedemand"
          },
          {
            'name':"","icon":"./static/images/images_homebtn7.png","url":"/propertyservices"
          }
        ],
        isOpen:false
}

  },
  mounted(){

    this.$http.get(BASEURL+'/app/qukuaiAction.action').then(response => {
      let data =response.body;
      console.log(data);

    });
  },
  methods:{
    slideout(){
      this.isOpen=!this.isOpen;

    },
    logout(){
        if(this.$root.logout()){
           this.user="";
        }
    }
  },
  components:{
  VCarousel
  }
}
</script>
<style lang='scss'>
@import "../assets/style/rem.scss";
#index{
  overflow: hidden;

  background: #f2f2f2;
  min-height: 100%;
 .main{
   padding-bottom:rem(60px);
  }

   .header{


      .icon-touxiang{
        line-height:  $h;
        font-size: rem(60px);
        color: #fff;
      }
      h1.logo{
        text-indent: -99999px;
        margin: rem(17.5px) auto;

        height: rem(65px);
        width: rem(340px);
        background: url('../assets/images/images_logotitle.png') no-repeat center/contain;
      }
   }


   .grid{
      background-color: #fff;
      text-align: center;
     .grid-list{

        position: relative;
        display: flex;
        flex-wrap:wrap;
        box-sizing: border-box;


       >.grid-item{
         position: relative;

         flex-basis:25%;

          padding:rem(30px);
          box-sizing: border-box;
        overflow: hidden;
        &:before{
        position:absolute;
        left: 0;
        bottom: 0;
        content:'';
        width:100%;
        height: 1px;
        background: #f2f2f2;

        z-index: 99999;
       }
          &:after{

           position:absolute;
           content:'';
           width:1px;
           height: 100%;
           right: 0;
           top: 0;
          background: #f2f2f2;

          z-index: 9999;
         }
         img{
          height: rem(140px);

         }
       }
     }
   }
}
.left-aside{


  position: fixed;
  top: 0;
  height: 100%;
  width:70%;


    background: url('/static/images/bg_panel.png') no-repeat  center/cover;
   z-index: 9999;
   transition: all .5s;
   opacity:0;
   transform: translateX(-100%);
 z-index: 9999;
   -webkit-overflow-scrolling: touch;
  &.open{
   opacity:1;
   transform: translateX(0);
  }
 .aside-content{
   position: relative;
     padding:0 25px;
     height: 100%;
 }
  .left-nav{
   margin-top: 15px;

    >li{


      padding: 25px 0;
      overflow: hidden;

    >a{
      display: inline-block;
      font-size: 16px;
      color: #fff;
      vertical-align: top;
      height: 30px;
      line-height: 30px;
     >span.lefticon{


        transform: translateY(5px);
        margin-right: 20px;
        display: inline-block;
        height:24px;
        width: 24px;
        background-position:center;
        background-size: cover;
          &.lefticon_1{
              background-image:url(../../static/images/lefticon1.png);
          }
          &.lefticon_2{
              background-image:url(../../static/images/lefticon2.png);
          }
          &.lefticon_3{
              background-image:url(../../static/images/lefticon3.png);
          }
          &.lefticon_4{
              background-image:url(../../static/images/lefticon4.png);
          }

      }

    }

    }

  }

  .login-btn{

    position: absolute;
    bottom:50px;
    display:inline-block;
    border:1px solid #fff;
    height: 30px;
    padding: 0 50px;
    line-height:30px;
    color: #fff;
    font-size: 14px;
  }
}
.aside-bg{
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background:#000;
  transition: all 1s;
  opacity:0;
  display: none;
   z-index: 9998;
   &.isShow{
   opacity:.5;
   display: block;
  }

}

</style>
