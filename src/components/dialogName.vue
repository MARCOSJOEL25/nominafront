<template>
  <v-dialog v-model="dialog" activator="parent" width="auto">
    <v-card>
      <v-card-text>
        El empleado {{ item.fullName }} sera despedido y sus prestaciones seran las
        siguientes
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Despedir y cerrar</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "dialogName",
  props: {
    propsDialog: {
      type: String,
      default: 'fdsfsd'
    },
  },
  data(){
    return {
      dialog: null,
    }
    },
  created() {
    console.log(this.propsDialog);
    this.change()
  },
  methods:{
    change(){
      this.dialog = true;
    }
  }
};
</script>
<style></style>
