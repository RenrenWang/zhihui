<template>
  <div>
        <p class="loading" v-show="loading"></p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props:['loading']
}
</script>

<style lang="scss">
.loading{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-16px,-16px,0);
  z-index: 999;
  background: url('../../../static/images/loading.gif') no-repeat  center;
  height:32px;
  width: 32px;
}
</style>
