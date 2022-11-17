<template>
  <div>
    <h1>Detalles de Locación</h1>
    <p>{{location}}</p>
  </div>
</template>

<script>
import endpoints from '../endpoints'
export default {
  name: "Location",
  data() {
    return {
      id: '',
      location: {}
    }
  },
  created() {
    this.id = this.$route.params.id.toString();
    endpoints.getLocation(this.id).then((location) => {
      this.location = location
    })
  }
};
</script>
