<template>
  <ul v-if="openingHours">
    <li v-for="(day, index) in openingHours" :key="index" class="day">
      <div class="day-name">
        {{ index | formatDay }}
      </div>
      <div class="day-opening-hours">
        van
        <select
          v-model="openingHours[index].start"
          :disabled="!openingHours[index].open"
        >
          <option :value="i | time" v-for="(_, i) in 31" :key="i">
            {{ i | time }}
          </option>
        </select>
        tot
        <select
          v-model="openingHours[index].end"
          :disabled="!openingHours[index].open"
        >
          <option :value="i | time" v-for="(_, i) in 31" :key="i">
            {{ i | time }}
          </option>
        </select>
      </div>
      <div class="day-open">
        <select v-model="openingHours[index].open">
          <option :value="true">Open</option>
          <option :value="false">Gesloten</option>
        </select>
      </div>
    </li>
  </ul>
</template>

<script>
import moment from "moment";

export default {
  props: {
    openingHours: {
      type: Array,
      required: true,
    },
  },
  // methods: {
  //   saveOpeningHours() {
  //     let valid = true;
  //     this.openingHours.forEach((day, index) => {
  //       // Check for empty values
  //       if (Object.values(day).indexOf("") > -1) {
  //         // console.log(index);
  //         valid = false;
  //       }
  //     });

  //     if (!valid) return;
  //   },
  // },
  filters: {
    formatDay: function(index) {
      const days = [
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag",
        "Zaterdag",
        "Zondag",
      ];
      return days[index];
    },

    time: function(index) {
      const startTime = "07:00";
      const increase = index * 30;
      return moment(startTime, "H:mm")
        .add(increase, "minutes")
        .format("H:mm");
    },
  },
};
</script>

<style lang="scss">
.day {
  background: #f9f9f9;
  display: flex;
  padding: 1em;
  border-radius: 0.5em;
  margin-top: 0.5em;
}

.day-name {
  width: 7.5em;
  font-weight: bold;
}

.day-open {
  margin-left: auto;
}
</style>
