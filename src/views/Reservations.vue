<template>
  <div>
    RESERVATIONS
    <div v-if="$route.params.setupComplete">You have set up your shit</div>
    <button @click="test()">click</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/firebaseConfig.js";

import moment from "moment";
export default {
  name: "Reservations",
  data() {
    return {
      showSetupCompleteModal: false,
    };
  },
  computed: {
    ...mapGetters(["shopData", "user"]),
  },
  methods: {
    createDaySlotsObject(slotCount) {
      let slots = {};
      Array.from(Array(slotCount)).forEach((_, i) => {
        slots[i] = 0;
      });
      return slots;
    },

    test() {
      const today = moment.utc(new Date()).startOf("day");
      const correctedOpeneningHours = [{}, ...this.shopData.openingHours];

      for (let i = 0; i < 10; i++) {
        const day = moment(today).add(i, "d");
        const timeStamp = moment(day).unix();
        const dayNumber = moment(day).isoWeekday();

        const docData = this.createDaySlotsObject(
          correctedOpeneningHours[dayNumber].slots
        );

        const uid = this.user.uid;

        db.collection("shops")
          .doc(uid)
          .collection("dates")
          .doc(timeStamp.toString())
          .set(docData)
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    },
  },
};
</script>
