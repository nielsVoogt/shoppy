<template>
  <div>
    Landingpage
    <nav>
      <router-link :to="{ name: 'Registration' }">Register</router-link> |
      <router-link :to="{ name: 'Login' }">Log in</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style></style>
