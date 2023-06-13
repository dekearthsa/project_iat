<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div>
      <Navbar/>
      <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600&display=swap'); 

body{
  margin:0px;
  padding:0px;
  font-family: 'Noto Sans Thai', sans-serif;
}

</style>
