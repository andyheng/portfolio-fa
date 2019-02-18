<template>
  <main>
    <div class="container">
      <div class="form-container">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit" class="form">
          <div class="form-field form-title">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" v-model="login.email" ref="emailRef">
          </div>
          <div class="form-field form-title">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" v-model="login.password">
          </div>
          <div class="form-field form-submit">
            <button type="submit" class="form-submit-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { auth } from "../main";
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      //login
      auth.signInWithEmailAndPassword(
          this.login.email.trim(),
          this.login.password
        )
        .then(() => {
            this.login.email = "";
            this.login.password = "";
            this.$router.push({path: "/admin"})
        });
    }
  },
  mounted() {
    this.$refs.emailRef.focus();
  }
};
</script>

<style scoped>
.container {
  margin-top: 1em;
  color: #fff;
}
</style>