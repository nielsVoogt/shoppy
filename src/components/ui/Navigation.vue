<template>
  <div>
    <div class="navigation">
      <!-- USER IS LOGGED IN -->

      <nav class="navigation-links">
        <router-link :to="{ name: 'Reservations' }">
          Reservations
        </router-link>

        <router-link :to="{ name: 'Settings' }">
          <SettingsIcon />
          Settings
        </router-link>
      </nav>

      <div class="navigation-user-details-name" v-if="userProfile">
        {{ userProfile.username }}
      </div>

      <button class="navigation-link" type="button" @click="logOut()">
        <LogInIcon />
        Log out
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { LogInIcon, SettingsIcon } from "vue-feather-icons";

export default {
  name: "Navigation",
  components: {
    LogInIcon,
    SettingsIcon,
  },
  computed: {
    ...mapGetters([
      "isUserAuth",
      "userProfile",
      "followers",
      "pendingFollowers",
      "friendTips",
    ]),
  },
  methods: {
    ...mapActions(["logOutAction"]),

    logOut() {
      this.logOutAction().then(
        // why do we do this here..? And not in the onAuthChanged method..?
        () => this.$router.push({ name: "LandingPage" }).catch(() => {})
      );
    },
  },
};
</script>
