<template>
  <div id="app">
    {{ hours }}
    <InputDateTime></InputDateTime>
    <VueClock v-model="hours"></VueClock>
  </div>
</template>

<script>
import InputDateTime from '@/InputDateTime.vue'
import VueClock from '@/components/Clock.vue'

export default {
  name: 'App',
  components: {
    InputDateTime,
    VueClock
  },
  data: () => ({
    hours: '04:03:00 pm'
  })
}
</script>

<style lang="scss">
</style>
