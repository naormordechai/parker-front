<template>
  <section>
    <div class="home">
      <div class="header">
        <h2>Parker - Your Parking Friend!</h2>  
        <p>Wasting too much time finding an available parking? Parker helps you find one in just a few clicks!
        Simply set the preferred area, choose the parking that suits you, and click RESERVE - the parking will be waiting for you!   
        </p>      
        <router-link to="/parking"><button>Find a Parking!</button></router-link>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
     
    }
  },
  name: 'home',
  components: {
  }
}
</script>

<style scoped>
.home {
  background-image: url('../assets/images/parker.png');
  height: 100vh;
  width: 100%;  
}

.header{
  color: white;
  text-align: left;
  padding: 50px;
 
}
</style>