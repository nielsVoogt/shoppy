<template>
  <div class="setup-view">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "SetupLayout",
};
</script>

<style lang="scss">
.setup-view {
  height: 100%;
  background: orange;
  overflow: auto;
}
</style>
