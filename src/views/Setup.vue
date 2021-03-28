<template>
  <div>
    <h1>Step 1:</h1>
    <h2>Your details:</h2>
    <Input
      type="text"
      label="Winkelnaam"
      placeholder="Naam van uw winkel"
      v-model="shopName"
      v-on:blur="validateShopName()"
      :error="fieldErrors.shopName"
      @change="fieldErrors.shopName = ''"
    />

    <Input
      type="textarea"
      label="Uw formulier introductie"
      v-model="formMessage"
      :error="fieldErrors.formMessage"
      @change="fieldErrors.formMessage = ''"
      placeholder="Een korte tekst die uw bezoeker ziet in het formulier om een reservering te maken"
    />

    <Input
      type="select"
      label="Maximum aantal bezoeker gebaseerd op winkeloppervlakte"
      v-model="maxCustomers"
      :error="fieldErrors.maxCustomers"
      @update="fieldErrors.maxCustomers = ''"
      selectMessage="Aantal bezoekers"
      :selectOptions="maxCustomersOptions"
    />

    <Input
      type="select"
      label="Tijdsvak lengte"
      v-model="slotDuration"
      :error="fieldErrors.slotDuration"
      @update="fieldErrors.slotDuration = ''"
      selectMessage="Tijd van afspraak in minuten"
      :selectOptions="[15, 30, 45, 60]"
    />

    <h1>Step 2:</h1>
    <h2>Your openinghours:</h2>
    <OpeningHours :opening-hours="openingHours" />

    <button @click="saveSetup()">Set up my shop</button>
  </div>
</template>

<script>
import Input from "@/components/ui/Input";
import OpeningHours from "@/components/settings/OpeningHours";
import { required, minLength } from "vuelidate/lib/validators";
const fb = require("@/firebaseConfig.js");
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Setup",
  components: {
    OpeningHours,
    Input,
  },
  data() {
    return {
      shopName: "",
      slug: "",
      formMessage: "",
      maxCustomers: null,
      slotDuration: null,
      openingHours: [
        { start: "9:00", end: "17:00", open: true },
        { start: "9:00", end: "17:00", open: true },
        { start: "9:00", end: "17:00", open: true },
        { start: "9:00", end: "17:00", open: true },
        { start: "9:00", end: "21:00", open: true },
        { start: "9:00", end: "17:00", open: true },
        { start: "9:00", end: "17:00", open: false },
      ],
      fieldErrors: {
        shopName: "",
        maxCustomers: "",
        slotDuration: "",
        formMessage: "",
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
    maxCustomersOptions: function() {
      return Array.from({ length: 60 }, (_, i) => i + 1);
    },
  },
  validations: {
    shopName: {
      required,
    },
    maxCustomers: {
      required,
    },
    slotDuration: {
      required,
    },
    formMessage: {
      required,
      minLength: minLength(50),
    },
  },
  watch: {
    shopName: function() {
      this.slug = this.shopName.replace(/[^A-Z0-9]/gi, "").toLowerCase();
    },
  },
  methods: {
    async addSlots() {
      this.openingHours.forEach((day, index) => {
        if (day.open) {
          let startTime = moment(day.start, "H:mm");
          let endTime = moment(day.end, "H:mm");
          var duration = moment.duration(endTime.diff(startTime)).asMinutes();
          var slotAmount = duration / parseInt(this.slotDuration);
          this.openingHours[index].slots = slotAmount;
        } else {
          this.openingHours[index].slots = 0;
        }
      });
    },

    createDaySlotsObject(slotCount) {
      let slots = {};
      Array.from(Array(slotCount)).forEach((_, i) => {
        slots[i] = 0;
      });
      return slots;
    },

    async addDates() {
      const today = moment.utc(new Date()).startOf("day");
      const correctedOpeneningHours = [{}, ...this.openingHours];

      for (let i = 0; i < 10; i++) {
        const day = moment(today).add(i, "d");
        const timeStamp = moment(day).unix();
        const dayNumber = moment(day).isoWeekday();

        const docData = this.createDaySlotsObject(
          correctedOpeneningHours[dayNumber].slots
        );

        const uid = this.user.uid;

        fb.shopsCollection
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

    async saveSetup() {
      if (this.validateFields()) {
        await this.addSlots();

        const shop = {
          slug: this.slug,
          shopName: this.shopName,
          formMessage: this.formMessage,
          maxCustomers: parseInt(this.maxCustomers),
          slotDuration: parseInt(this.slotDuration),
          openingHours: this.openingHours,
        };

        const uid = this.user.uid;

        // Add the shop slug
        await fb.shopsSlugCollection.doc(this.slug).set({ uid });

        // Add the shop details
        await fb.shopsCollection.doc(uid).set(shop);

        await this.addDates();

        this.$router.push({
          name: "Reservations",
          params: { setupComplete: true },
        });
      }
    },

    async validateShopName() {
      if (this.shopName !== "") {
        const isShopNameAlreadyInDatabase = await fb.shopsSlugCollection
          .doc(this.slug)
          .get();

        console.log(isShopNameAlreadyInDatabase);
        if (isShopNameAlreadyInDatabase.exists) {
          this.fieldErrors.shopName =
            "This shop name already exists. Append your shopname with the location and/or location number";
        }
      }
    },

    validateFields() {
      if (this.$v.$invalid) {
        if (!this.$v.shopName.required)
          this.fieldErrors.shopName = "shopName can't be empty";

        if (!this.$v.formMessage.required)
          this.fieldErrors.formMessage = "formMessage can't be empty";

        if (!this.$v.formMessage.minLength) {
          this.fieldErrors.formMessage =
            "Your intro must be at least 50 characters";
        }

        if (!this.$v.maxCustomers.required)
          this.fieldErrors.maxCustomers = "Please select a maximum of visitors";

        if (!this.$v.slotDuration.required)
          this.fieldErrors.slotDuration = "Please select a slotDuration";
      } else {
        return true;
      }
    },
  },
};
</script>
