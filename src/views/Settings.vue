<template>
  <div>
    <h1>This is Settings {{ user ? user.displayName : "" }}</h1>
    <DeleteAccount />
    <EmailAdress />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteAccount from "@/components/settings/DeleteAccount";
import EmailAdress from "@/components/settings/EmailAdress";

export default {
  name: "settings",
  components: {
    DeleteAccount,
    EmailAdress,
  },
  computed: {
    ...mapGetters(["user"]),
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
  },
};
</script>
