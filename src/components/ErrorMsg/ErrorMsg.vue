<template>
  <div>
        <p class="error" v-if="error">{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'error',
  props:['error',"msg"]
}
</script>

<style lang="scss">
.error{



  width: 100%;
 position: fixed;
  top: 50%;
  left: 50%;
 z-index: 999;
  // height: rem(300px);
  // width: rem(300px);
   transform: translate3d(-50%,-50%,0);
//  line-height:  rem(300px);
  text-align: center;
//  background: rgba(0,0,0,.3);
  color: #565656;
  font-size: 14px;
  //border-radius:rem(30px);
  white-space:nowrap;
}
</style>
