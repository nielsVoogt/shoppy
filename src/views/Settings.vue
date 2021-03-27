<template>
  <div>
    <h1>This is Settings {{ user ? user.displayName : "" }}</h1>
    <DeleteAccount />
    <EmailAdress />
    <OpeningHours />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteAccount from "@/components/settings/DeleteAccount";
import EmailAdress from "@/components/settings/EmailAdress";
import OpeningHours from "@/components/settings/OpeningHours";

export default {
  name: "settings",
  components: {
    OpeningHours,
    DeleteAccount,
    EmailAdress,
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
