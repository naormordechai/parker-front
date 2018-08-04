<template>
  <footer class="footer-app">
    <div class="footer flex space-around align-center">
      <ul class="flex">
        <li>Privacy policy</li>
        <li>Terms of Use</li>
        <li>Legal Notice</li>
        <li>Accessibillity View</li>
      </ul>
    <div>
      Copyright © 2018 by Parker. All rights reserved
    </div>
    </div>

  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>

.footer{
  height: 25px;
  background-color: rgb(84, 92, 100);
  position: fixed;
  top: calc(100vh - 25px);
  /* top: 0; */
  width: 100%;
  color: #fff;
  z-index: 1000;
  font-size: 12px;
}

ul > *:not(:last-child){
  margin-right: 20px;
}
ul > *:hover{
  color: rgb(0, 199, 0);
  cursor: pointer;
}

ul{
  align-items: center;
}

@media (max-width:770px){
  .footer-app{
    display: none;
  }
}

/* .inline-block{
  display: inline-block;
}

.footer-app{
  padding: 5px;
  width: 100%;
}
ul > *:not(:last-child){
  margin-right: 20px;
}

.footer-list-details a{
  color: black;
  text-decoration: none;
}

footer {
  background-image: linear-gradient(to bottom, 
  rgba(238, 238, 238, 0.5)5%,
  rgba(97, 97, 97, 0.8));
  height: 56px;
} */


</style>
