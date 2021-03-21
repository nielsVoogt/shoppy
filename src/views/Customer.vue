<template>
  <div>
    CUSTOMER
    <div>{{ dates }}</div>
    <div>{{ bookings }}</div>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";

export default {
  name: "Customer",
  data() {
    return {
      dates: [],
      bookings: [],
    };
  },
  methods: {
    getTimeStamp() {
      var today = new Date();
      var date = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;
      const currentTimeStamp = parseInt(
        (new Date(date).getTime() / 1000).toFixed(0)
      );

      return currentTimeStamp;
    },
  },

  created() {
    const bookingsRef = db.collection(
      `/shops/${this.$route.params.slug}/bookings/`
    );

    bookingsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id > this.getTimeStamp() === true) {
          console.log(doc.data());
        }
      });
    });

    // DATES AND SLOTS
    const datesRef = db.collection(`/shops/${this.$route.params.slug}/dates/`);
    datesRef.get().then((querySnapshot) => {
      let dates = [];
      querySnapshot.forEach((doc) => {
        if (doc.id > this.getTimeStamp() === true) {
          const { slots, name } = doc.data();

          const availableSlots = slots.reduce(function(result, slot) {
            if (slot.count < 4) {
              result.push(slot);
            }
            return result;
          }, []);

          dates.push({
            date: doc.id,
            availableSlots,
            name,
          });
        }
      });
      this.dates = dates;
    });
  },
};
</script>
