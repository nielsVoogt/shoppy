<template>
  <div>
    RESERVATIONS
    <div v-if="$route.params.setupComplete">You have set up your shit</div>
  </div>
</template>

<script>
export default {
  name: "Reservations",
  data() {
    return {
      showSetupCompleteModal: false,
    };
  },
};
</script>
