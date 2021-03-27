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
      label="Tijdsvak lengte (in minuten)"
      v-model="slotSize"
      :error="fieldErrors.slotSize"
      @update="fieldErrors.slotSize = ''"
      selectMessage="Selecteer het aantal bezoekers"
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
      slotSize: null,
      openingHours: [
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
      ],
      fieldErrors: {
        shopName: "",
        maxCustomers: "",
        slotSize: "",
        formMessage: "",
      },
    };
  },
  computed: {
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
    slotSize: {
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
    saveSetup() {
      if (this.validateFields()) {
        console.log("alles prima");
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

        if (!this.$v.slotSize.required)
          this.fieldErrors.slotSize = "Please select a slotsize";
      } else {
        return true;
      }
    },
  },
};
</script>
