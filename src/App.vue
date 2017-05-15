<template>
  <div id="app">

    <router-view></router-view>

  </div>
</template>

<script>


export default {
  name: 'app',
  
  components:{

  }
}
</script>

<style lang="scss">
@import "./assets/style/base.scss";
#app{
  height: 100%;
}
.header{

  padding:0 rem(32px);
  position:fixed;
  height:$h;
  width: 100%;
  background: url('assets/images/navbar.png')  0 -1px ;
  box-sizing: border-box;
  z-index: 999;
}



html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
   -webkit-overflow-scrolling: touch;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
html,body{
  height: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling : touch;  /* liuhx:可以把这整行注释掉对比差别 */
}
body {

	line-height: 1;
	 color: #141514;
}
ol, ul {
	list-style: none;
}
input{
	outline: none;
}
a{
	 background: none;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;

	 color: #141514;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

</style>
