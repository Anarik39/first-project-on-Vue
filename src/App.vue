<template>
  <v-app>
    <v-app-bar app flat color="teal" dark>
      <v-btn to="/" plain :ripple="false">Index</v-btn>
      <v-btn to="/calculator" plain :ripple="false">Calculator</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
