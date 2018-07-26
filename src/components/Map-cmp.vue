<template>
    <section class='map'>
        <div id='map'></div>
    </section>



</template>

<script>

export default {
  data () {
    return {

    }
  },

  methods: {

  },

  created() {
    mapService.initMap()
        .then(
            () => {
                mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            }
        ).catch(console.warn);
  }

};
</script>

<style>
#map {
        height: 100%;
      }
</style>
