<template>
    <TableEmployee v-if="$store.state.isLogin"/>
    <div v-else>
      <loginScreen />
    </div>
</template>

<script>
import TableEmployee from '../src/components/Table.vue'
import loginScreen from '../src/components/Login.vue'

export default {

  name: "App",
  components: {
    TableEmployee,
    loginScreen
  },
  data(){
    return{
    }
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
</style>
