<template>
  <div id="layout">

    <router-view></router-view>
    <VFooter></VFooter>
  </div>
</template>

<script>
import VFooter from '../components/Footer/Footer.vue'

export default {
  name: 'layout',
  components:{
     VFooter
  }
}
</script>

<style lang="scss">
@import "../assets/style/rem.scss";

#layout{
  height: 100%;
}



</style>
