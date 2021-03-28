<template>
  <div v-if="shopData">
    <select v-if="dates.length" v-model="selectedDate">
      <option value="">Selecteer een datum</option>
      <option v-for="(date, index) in dates" :key="index" :value="date.date">
        {{ date.date | formatDay }}
      </option>
    </select>
    <select v-if="slots" v-model="selectedSlot">
      <option value="">Selecteer een tijd</option>
      <option
        v-for="(visitors, slot, index) in slots"
        :key="index"
        :disabled="visitors >= shopData.maxCustomers"
        :value="slot"
      >
        {{ formatTime(slot) }}
      </option>
    </select>
    <select v-model="selectedVisitorCount">
      <option value="">Met hoeveel mensen komen jullie</option>
      <option
        v-for="(visitors, index) in shopData.maxCustomers"
        :key="index"
        :value="index"
      >
        {{ index + 1 }}
      </option>
    </select>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "Customer",
  data() {
    return {
      dates: [],
      selectedDate: "",
      slots: false,
      selectedSlot: "",
      day: false,
      selectedVisitorCount: "",
    };
  },
  computed: {
    // We should retrieve this with a get()
    ...mapGetters(["shopData"]),
  },
  watch: {
    selectedDate: function(selectedDate) {
      const index = this.dates.findIndex((date) => date.date === selectedDate);
      const dayOfWeek = moment.unix(selectedDate).isoWeekday() - 1;

      this.selectedSlot = "";
      this.slots = this.dates[index].slots;
      this.day = this.shopData.openingHours[dayOfWeek];
    },
  },
  methods: {
    formatTime: function(slotIndex) {
      const increase = slotIndex * this.shopData.slotDuration;
      const start = moment(this.day.start, "H:mm")
        .add(increase, "minutes")
        .format("H:mm");

      return start;
    },
    async getDates(uid) {
      const snapshot = await db
        .collection("shops")
        .doc(uid)
        .collection("dates")
        .get();

      snapshot.docs.map((doc) => {
        if (Object.keys(doc.data()).length !== 0) {
          this.dates.push({
            date: doc.id,
            slots: doc.data(),
          });
        }
      });
    },
  },
  filters: {
    formatDay: function(timeStamp) {
      return moment.unix(timeStamp).format("dd DD-MM");
    },
  },
  created() {
    const slugRef = db.collection("slugs").doc(this.$route.params.slug);
    slugRef.get().then((doc) => {
      if (doc.exists) {
        this.getDates(doc.data().uid);
      } else {
        console.log("error");
      }
    });
  },
};
</script>
