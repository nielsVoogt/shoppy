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
    <select v-model="selectedVisitorCount" v-if="selectedSlot">
      <option value="">Met hoeveel mensen komen jullie</option>
      <option
        v-for="(visitors, index) in shopData.maxCustomers"
        :key="index"
        :value="index + 1"
      >
        {{ index + 1 }}
      </option>
    </select>

    <Input
      type="email"
      label="Email"
      placeholder="e.g. niels@company.nl"
      v-model="email"
      :error="fieldErrors.email"
      @blur="validateEmailAdress()"
      @change="fieldErrors.email = ''"
      v-if="selectedVisitorCount"
    />
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";
import moment from "moment";

import Input from "@/components/ui/Input";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Customer",
  components: {
    Input,
  },
  data() {
    return {
      email: "",
      dates: [],
      selectedDate: "",
      selectedSlot: "",
      selectedVisitorCount: "",
      slots: false,
      day: false,
      shopData: false,
      uid: false,
      fieldErrors: {
        email: "",
      },
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  watch: {
    selectedDate: function(selectedDate) {
      const index = this.dates.findIndex((date) => date.date === selectedDate);
      const dayOfWeek = moment.unix(selectedDate).isoWeekday() - 1;

      this.selectedSlot = "";
      this.selectedVisitorCount = "";
      this.slots = this.dates[index].slots;

      console.log(this.slots, dayOfWeek);
      this.day = this.shopData.openingHours[dayOfWeek];
    },
  },
  methods: {
    validateEmailAdress() {
      const isEmailValid = this.$v.email.email;
      this.fieldErrors.email = !isEmailValid
        ? "This is not a valid email adress"
        : "";
    },

    formatTime: function(slotIndex) {
      const increase = slotIndex * this.shopData.slotDuration;
      const start = moment(this.day.start, "H:mm")
        .add(increase, "minutes")
        .format("H:mm");

      return start;
    },

    async getShopData(uid) {
      const shop = await db
        .collection("shops")
        .doc(uid)
        .get();
      this.shopData = shop.data();
      this.uid = uid;
      this.getDates();
    },

    async getDates() {
      const today = moment
        .utc(new Date())
        .startOf("day")
        .unix();

      const snapshot = await db
        .collection("shops")
        .doc(this.uid)
        .collection("dates")
        .where("date", ">=", today)
        .get();

      snapshot.docs.map((doc) => {
        const slots = doc.data();
        delete slots["date"];
        if (Object.keys(slots).length !== 0) {
          this.dates.push({
            date: doc.data().date,
            slots,
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
        this.getShopData(doc.data().uid);
      } else {
        console.log("error");
      }
    });
  },
};
</script>
