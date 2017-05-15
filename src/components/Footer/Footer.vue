<template>
  <footer>
      <div class="footer">
           <ul>
             <li v-for="(v,i) in  items"><router-link :to="v.url" :title="v.name"><p :class="['iconfont',v.icon]"></p><span>{{v.name}}</span></router-link></li>
           </ul>
      </div>

  </footer>
</template>

<script>
export default {
  name: 'footer',
  data(){
    return{
      items:[
        {"name":"首页","url":'/index',"icon":'icon-shouye'},
        {"name":"园区介绍","url":'/introduce',"icon":'icon-jieshao'},
        {"name":"园区企业","url":'/company',"icon":'icon-qiyerenyuan'}
      ]
    }
  },
  methods:{
    setIcon(i){
     return "url("+items[i]['icon']+") no-repeat  center/contain";
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/style/rem.scss";
.footer{
    position: fixed;
    bottom:0;
    width: 100%;
    height:$bottom;
    background: #fff;
    z-index: 999;
     &:before{
        // border-top:1px solid #ededed;
        content: '';
        width: 100%;
        height: 1px;
        background: #ededed;
        transform: scaleY(.5);
        position: absolute;
        top: 0;
    }
    >ul{
      display: flex;
      >li{
        text-align: center;

        flex: 1;
      a{
       color: #b9b9b9;
      &.router-link-active{
        color: #469fe5;
      }
       p{
         margin: rem(8px) 0;
         font-size: rem(70px);

         width: 100%;
       }
       span{

         font-size: 14px;
       }
      }

      }
    }
}

</style>
