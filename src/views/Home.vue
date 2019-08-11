<template>
  <section class="home">
    <div class="registerForm" v-if="registered">
      <b-field label="Name">
        <b-input></b-input>
      </b-field>
      <b-field label="Email">
          <b-input type="email" maxlength="30"></b-input>
      </b-field>
      <b-field label="Username">
          <b-input maxlength="30"></b-input>
      </b-field>
      <b-field label="Password">
          <b-input type="password" maxlength="30"></b-input>
      </b-field>
      <div class="buttons is-centered">
        <b-button type="is-success">Register</b-button><b-button type="is-danger">Reset</b-button>
      </div>
      Already registered? Please <span @click="registered = !registered">log in.</span>
    </div>
    <div class="loginForm" v-else>
      <b-field label="Email">
          <b-input type="email" maxlength="30"></b-input>
      </b-field>
      <b-field label="Password">
          <b-input type="password" maxlength="30"></b-input>
      </b-field>
      <div class="buttons is-centered">
        <b-button type="is-success" @click="login()">Login</b-button><b-button type="is-danger">Reset</b-button>
      </div>
      <p>
        Don't have account? Please <span @click="registered = !registered">register.</span>
      </p>
      
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      registered: false
    }    
  },
  computed: {
      // registered: false
  },
  methods: {
    login() {
      console.log('login')
      this.$router.push("/boards")
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
  .registerForm, .loginForm {
    width: 400px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 20px;
  }
</style>
