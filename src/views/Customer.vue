<template>
  <div>CUSTOMER {{ dates }}</div>
</template>

<script>
import { db } from "@/firebaseConfig.js";

export default {
  name: "Customer",
  data() {
    return {
      dates: [],
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
    const datesRef = db.collection(`/shops/${this.$route.params.slug}/dates/`);
    datesRef.get().then((querySnapshot) => {
      let dates = [];
      querySnapshot.forEach((doc) => {
        if (doc.id > this.getTimeStamp() === true) {
          dates.push({
            date: doc.id,
            name: doc.data().name,
          });
        }
      });
      this.dates = dates;
    });
  },
};
</script>
