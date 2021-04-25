<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  overflow-x: hidden;
}
html {
  height: 100%;
}
body {
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', tahoma,
    arial, \5b8b\4f53, sans-serif;
  /* font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif; */
  color: #262626;
  font-size: 14px;
  height: 100%;
}
body,
div,
a,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td,
s {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
img {
  display: inline-block;
}
em {
  font-style: normal;
}
a,
a:focus,
a:visited,
a:link,
a:hover {
  outline: none;
  text-decoration: none;
}
a {
  color: #333;
}
a:hover {
  color: #0089f0;
}

i {
  vertical-align: middle;
}
i,
label,
input[type='checkbox'] {
  vertical-align: middle;
}
input {
  padding: 10px;
}
label {
  font-weight: normal;
}
textarea {
  resize: none !important;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #999;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #999;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #999;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #999;
}
</style>
