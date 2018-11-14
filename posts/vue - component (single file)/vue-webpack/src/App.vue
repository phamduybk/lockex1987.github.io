<template>
  <div id="app">
    <!--app-message></app-message-->
    <h1>Vue App</h1>

    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/users">Users</a>
      </li>
    </ul>

    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/users/10">Users</router-link>
      </li>
    </ul>


    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
