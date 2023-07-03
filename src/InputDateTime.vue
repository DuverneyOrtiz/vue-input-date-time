<template>
  <div id="fbe49ea16cf84b049b7e871e8fbd7461">
    {{ momentCurrent.format('YYYY-MM-DD') }}
    <table border="0">
      <tr>
        <td class="text-date" colspan="7">
          {{ getDay }}, {{ getDayMonthToday() }} de
          {{ getMonthCurrentToday }} de
          {{ getYear }}
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
          @click="dateSelected(day)"
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
  InstanceMoment,
  formatDate,
} from "./script/moment";

export default {
  name: "InputDateTime",
  components: {},
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
    value: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data: () => ({
    getDayLetter: letterDays("es", "small"),
    weeks: [],
    countMonth: 0,
    countYear: 0,
    momentCurrent: InstanceMoment(),
    momentCurrentToday: InstanceMoment(),
    nextYear: getYear(),
    getDaySelected: getDate(),
    getMonthSelected: getMonth() + 1,
    pointRefMoment: InstanceMoment()
  }),
  // created() {
  //   this.weeks = this.createCalendarInit();
  // },
  mounted() {
    if (this.value !== undefined && this.value !== null) {
      this.momentCurrentToday = InstanceMoment(this.value);
      this.momentCurrent = InstanceMoment(this.value);
      this.pointRefMoment = InstanceMoment(this.value);
      this.nextYear = getYear(this.momentCurrent)
      this.getDaySelected = getDate(this.momentCurrent)
      this.getMonthSelected = getMonth(this.momentCurrent) + 1
    }

    this.weeks = this.createCalendarInit();
  },
  computed: {
    getMonth() {
      return letterMonth("es", this.momentCurrent);
    },
    getMonthCurrentToday() {
      return letterMonth("es", this.momentCurrentToday);
    },
    getYearCurrentToday() {
      return getYear(this.momentCurrentToday);
    },
    getDay() {
      return getDayWeek(this.momentCurrentToday);
    },
    getYear() {
      return getYear(this.momentCurrentToday);
    },
  },
  methods: {
    createCalendarInit() {
      const dayInitDate = dayWeekInit(this.momentCurrent);
      const totalDays = daysMonth(this.momentCurrent);
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
    getMonthCurrent() {
      return letterMonth();
    },
    getDayMonth() {
      return getDate();
    },
    getDayMonthToday() {
      return getDate(this.momentCurrentToday);
    },
    dateSelected(day) {
      this.getDaySelected = day;
      if (
        this.momentCurrent.get("month") > this.momentCurrentToday.get("month")
      ) {
        const diff =
          this.momentCurrent.get("month") -
          this.momentCurrentToday.get("month");
        this.momentCurrentToday.add(diff, "months");
      }

      if (
        this.momentCurrent.get("month") < this.momentCurrentToday.get("month")
      ) {
        const diff =
          (this.momentCurrentToday.get("month") -
            this.momentCurrent.get("month")) *
          -1;
        this.momentCurrentToday.add(diff, "months");
      }

      if (
        this.momentCurrent.get("year") > this.momentCurrentToday.get("year")
      ) {
        const diff =
          this.momentCurrent.get("year") - this.momentCurrentToday.get("year");
        this.momentCurrentToday.add(diff, "years");
      }

      if (
        this.momentCurrent.get("year") < this.momentCurrentToday.get("year")
      ) {
        const diff =
          (this.momentCurrentToday.get("year") -
            this.momentCurrent.get("year")) *
          -1;
        this.momentCurrentToday.add(diff, "years");
      }

      const Day = day;
      const month = getMonth(this.momentCurrentToday) + 1;
      const year = this.nextYear;

      const date = formatDate(
        `${year}-${month}-${Day}`,
        "YYYY-M-D",
        "YYYY-MM-DD"
      );
      this.momentCurrentToday = InstanceMoment(date);

      const resultDate = `${this.nextYear}-${
        getMonth(this.momentCurrentToday) + 1
      }-${day}`;
      this.$emit("input", formatDate(resultDate, "YYYY-M-D", "YYYY-MM-DD"));
    },
    isToday(day) {
      return (
        day === this.getDayMonthToday() &&
        this.getMonth === this.getMonthCurrentToday &&
        this.nextYear === this.getYearCurrentToday
      );
    },
    isDayEmpty(day) {
      return day !== "" && !this.isToday(day);
    },
    nextMonth() {
      if (!this.ValidateMax()) return;
      // const ddd = this.momentCurrent;
      this.momentCurrent = undefined;
      this.countMonth++;

      this.momentCurrent = addMonth(1, this.pointRefMoment);
      if (getMonth(this.momentCurrent) % 12 === 0) {
        this.nextYear++;
        if (!this.ValidateMax()) {
          this.countMonth--;
          this.momentCurrent = addMonth(-1, this.pointRefMoment);
          this.nextYear--;
          return;
        }
      }
      const dayInitDate = dayWeekStart(this.momentCurrent);
      const totalDays = daysMonth(this.momentCurrent);

      this.weeks = this.createCalendar(dayInitDate, totalDays);
    },
    previustMonth() {
      this.momentCurrent = undefined;
      this.countMonth--;
      this.momentCurrent = addMonth(-1, this.pointRefMoment);
      if (getMonth(this.momentCurrent) === 11) {
        this.nextYear--;
        if (!this.validateMin()) {
          this.countMonth++;
          this.momentCurrent = addMonth(1, this.pointRefMoment);
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