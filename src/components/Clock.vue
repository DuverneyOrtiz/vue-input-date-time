<template>
  <div class="circleExternal">
    <div class="circleInternal">
      <div
        class="cursor-pointer reloj-am"
        :class="{
          'AM-PM-selected': meridiano === 'am',
          'AM-PM-disabled': meridiano === 'pm',
        }"
        @click="selectedMeridiano('am')"
      >
        AM
      </div>
      <div class="showHours">
        <span>
          <span class="cursor-pointer" @click="showHour()">{{ hour }}</span> :
          <span class="cursor-pointer" @click="showMinutes()">{{
            minutes
          }}</span>
        </span>
      </div>
      <div
        class="reloj-pm cursor-pointer"
        :class="{
          'AM-PM-selected': meridiano === 'pm',
          'AM-PM-disabled': meridiano === 'am',
        }"
        @click="selectedMeridiano('pm')"
      >
        PM
      </div>

      <div
        v-for="({ attr, hours }, index) in arrayHours"
        :key="index"
        :class="attr.className"
      >
        <span
          v-for="(item, j) in hours"
          :key="j"
          class="cursor-pointer"
          :class="{ hourSeleted: selectedHour === item.conditionClass }"
          @click="getHourMinutes(item.value)"
          >{{ item.hour }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import HOURS from "./hours";
import MINUTES from "./minutes";
import moment from "moment";

import { getHour,  getMinute, getSecond,  getMeridiano } from '@/script/moment'

export default {
  name: "InputClock",
  props: {
    value: {
      type: String,
      required: false,
      default: "00",
    },
  },
  data: () => ({
    hour: "00",
    minutes: "00",
    seconds: '',
    meridiano: "am",
    isHour: true,
    arrayHours: [],
  }),
  mounted() {
    this.arrayHours = this.createHours();
    if (this.validateValue(this.value)) {
      this.hour = this.getHour(this.value);
      this.minutes = this.getMinutes(this.value);
      this.meridiano = this.getMeridiano(this.value);
    }
  },
  computed: {
    selectedHour() {
      if (this.isHour) return this.hour;
      return this.minutes;
    },
  },
  methods: {
    getHourMinutes(hour) {
      if (!this.isHour) {
        this.minutes = hour.length === 1 ? `0${hour}` : hour;
      }

      if (this.isHour) {
        this.hour = hour.length === 1 ? `0${hour}` : hour;
        this.arrayHours = MINUTES;
        this.isHour = false;
      }
      const clock = `${this.hour}:${this.minutes}:${getSecond()} ${this.meridiano}`;
      this.$emit("input", clock);
    },
    selectedMeridiano(meridiano) {
      this.meridiano = meridiano
      const clock = `${this.hour}:${this.minutes}:${getSecond()} ${meridiano}`;
      this.$emit("input", clock);
    },
    createHours() {
      return HOURS;
    },
    showHour() {
      this.arrayHours = HOURS;
      this.isHour = true;
    },
    showMinutes() {
      this.arrayHours = MINUTES;
      this.isHour = false;
    },
    validateValue(hours) {
      const result = moment(hours, "hh:mm").format("hh:mm");
      return result !== "Invalid date";
    },
    getHour(hours) {
      return getHour(hours, "hh:mm:ss a");
    },
    getMinutes(hours) {
      return getMinute(hours, "hh:mm:ss a");
    },
    getMeridiano(hours) {     
      return getMeridiano(hours, "hh:mm:ss a");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/reloj.scss";
</style>