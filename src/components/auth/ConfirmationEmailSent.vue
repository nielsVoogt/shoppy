<template>
  <div>
    <div>📬</div>
    We've sent you a email to confirm your account.
    <Button size="lg" full-width @click="$router.push({ name: 'Login' })">
      Back to login
    </Button>
  </div>
</template>

<script>
import Button from "@/components/ui/Button";
export default {
  name: "ConfirmationEmailSent",
  components: {
    Button,
  },
};
</script>
