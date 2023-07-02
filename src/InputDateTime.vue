<template>
    <div id="fbe49ea16cf84b049b7e871e8fbd7461">
      <table border="0">
        <tr>
          <td class="text-date" colspan="7">
            {{ getDay() }}, {{ getDayMonth() }} de {{ getMonthCurrent() }} de
            {{ getYear() }}
          </td>
        </tr>
        <tr class="title-actions">
          <td colspan="3">
            <span>{{ getMonth }} de {{ nextYear }}</span>
          </td>
          <td class="container-arrow-actions" colspan="4">
            <span class="arrrow-actions" @click="nextMonth">&#x2191;</span>
            <span class="arrrow-actions" @click="previustMonth">&#x2193;</span>
          </td>
        </tr>
        <tr class="header-days">
          <td v-for="(day, index) in getDayLetter" :key="index">{{ day }}</td>
        </tr>
  
        <tr v-for="(week, index) in weeks" :key="index">
          <td
            v-for="(day, j) in week"
            :key="j"
            :class="{
              today: isToday(day),
              'otherDay cursor-pointer': isDayEmpty(day),
            }"
          >
            {{ day }}
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import {
    getYear,
    getMonth,
    getDate,
    daysMonth,
    letterMonth,
    dayWeekInit,
    letterDays,
    getDayWeek,
    addMonth,
    dayWeekStart,
  } from "./script/moment";
  
  
  export default {
    name: "InputDateTime",
    components: {
    },
    props: {
      max: {
        // eslint-disable-next-line vue/require-prop-type-constructor
        type: Number | Boolean,
        required: false,
        default: true,
      },
      min: {
        // eslint-disable-next-line vue/require-prop-type-constructor
        type: Number | Boolean,
        required: false,
        default: true,
      },
    },
    data: () => ({
      getDayLetter: letterDays("es", "small"),
      weeks: [],
      countMonth: 0,
      countYear: 0,
      momentCurrent: undefined,
      nextYear: getYear(),
    }),
    created() {
      this.weeks = this.createCalendarInit();
    },
    computed: {
      getMonth() {
        return letterMonth("es", this.momentCurrent);
      },
    },
    methods: {
      createCalendarInit() {
        const dayInitDate = dayWeekInit();
        const totalDays = daysMonth();
        return this.createCalendar(dayInitDate, totalDays);
      },
      createCalendar(dayInitDate, totalDays) {
        let i = 1;
        let j = 0;
        let arrayDaysMonth = [];
  
        do {
          if (j >= dayInitDate) {
            arrayDaysMonth.push(i);
            i++;
          } else arrayDaysMonth.push("");
  
          j++;
        } while (i <= totalDays);
  
        const week1 = arrayDaysMonth.slice(0, 7);
        const week2 = arrayDaysMonth.slice(7, 14);
        const week3 = arrayDaysMonth.slice(14, 21);
        const week4 = arrayDaysMonth.slice(21, 28);
        const week5 = arrayDaysMonth.slice(28, 35);
        let week6 = arrayDaysMonth.slice(35, 42);
  
        if (week5.length < 7) {
          const subs = 7 - week5.length;
          for (let k = 0; k < subs; k++) {
            week5.push("");
          }
        }
  
        if (week6[0] === undefined) return [week1, week2, week3, week4, week5];
  
        if (week6.length < 7) {
          const subs = 7 - week6.length;
          for (let k = 0; k < subs; k++) {
            week6.push("");
          }
        }
  
        return [week1, week2, week3, week4, week5, week6];
      },
      getYear() {
        return getYear();
      },
      getMonthCurrent() {
        return letterMonth();
      },
      getDay() {
        return getDayWeek();
      },
      getDayMonth() {
        return getDate();
      },
      isToday(day) {
        return (
          day === this.getDayMonth() &&
          this.getMonth === this.getMonthCurrent() &&
          this.nextYear === this.getYear()
        );
      },
      isDayEmpty(day) {
        return day !== "" && !this.isToday(day);
      },
      nextMonth() {
        if (!this.ValidateMax()) return;
        this.countMonth++;
  
        this.momentCurrent = addMonth(this.countMonth);
        if (getMonth(this.momentCurrent) % 12 === 0) {
          this.nextYear++;
          if (!this.ValidateMax()) {
            this.countMonth--;
            this.momentCurrent = addMonth(this.countMonth);
            this.nextYear--;
            return;
          }
        }
        const dayInitDate = dayWeekStart(this.momentCurrent);
        const totalDays = daysMonth(this.momentCurrent);
  
        this.weeks = this.createCalendar(dayInitDate, totalDays);
      },
      previustMonth() {
        this.countMonth--;
        this.momentCurrent = addMonth(this.countMonth);
        if (getMonth(this.momentCurrent) === 11) {
          this.nextYear--;
          if (!this.validateMin()) {
            this.countMonth++;
            this.momentCurrent = addMonth(this.countMonth);
            this.nextYear++;
            return;
          }
        }
  
        const dayInitDate = dayWeekStart(this.momentCurrent);
        const totalDays = daysMonth(this.momentCurrent);
  
        this.weeks = this.createCalendar(dayInitDate, totalDays);
      },
      ValidateMax() {
        if (this.max === true) return true;
  
        return this.nextYear <= this.max;
      },
      validateMin() {
        if (this.min === true) return true;
  
        return this.nextYear >= this.min;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  @import "./style/main.css";
  </style>