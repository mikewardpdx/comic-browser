<template>
  <div id="app">
    <div>{{ name }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from './utils/md5';

export default {
  data() {
    return {
      name: 'yo',
      isLoading: false,
    };
  },
  created() {
    const signature = md5(`${'1'}${process.env.VUE_APP_MARVEL_PRIVATE_KEY}${process.env.VUE_APP_MARVEL_PUBLIC_KEY}`);
    const route = `http://gateway.marvel.com/v1/public/comics?ts=1&apikey=${process.env.VUE_APP_MARVEL_PUBLIC_KEY}&hash=${signature}`;
    axios.get(route).then((res) => {
      const { data } = res;
      console.log(data);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
