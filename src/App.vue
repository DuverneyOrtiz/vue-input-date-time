<template>
  <div id="app">
    <VueClock v-model="hours"></VueClock>
  </div>
</template>

<script>
// import InputDateTime from '@/InputDateTime.vue'
import VueClock from '@/components/Clock.vue'

export default {
  name: 'App',
  components: {
    // InputDateTime,
    VueClock
  },
  data: () => ({
    hours: '00:00:00 am',
    date: '2023-01-22'
  })
}
</script>

<style lang="scss">
</style>
