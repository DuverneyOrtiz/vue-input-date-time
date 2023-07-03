<template>
  <div id="app">
    {{ hours }} - {{ date }}
    <InputDateTime v-model="date" :max="2023" :min="2022"></InputDateTime>
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
    hours: '00:00:00 am',
    date: '2023-01-22'
  })
}
</script>

<style lang="scss">
</style>
