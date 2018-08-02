<template>
    <footer>
    <div class="footer-app flex space-around">
        <ul class="footer-list-details flex">
          <li><a href="#">About us</a></li>
          <li><a href="#">blog</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">iOS App</a></li>
          <li><a href="#">Android App</a></li>
       </ul>
      <ul class="footer-list-details flex">
        <li><a href="#">F</a></li>
        <li><a href="#">I</a></li>
        <li><a href="#">B</a></li>
        <li><a href="#">T</a></li>
      </ul>
    </div>
     <p>Copyright © 2018 by Parker. All rights reserved.</p>
  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.inline-block{
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
}

footer p {
  /* padding-bottom: 30px; */
}
</style>
