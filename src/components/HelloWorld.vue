<template>
  <v-card max-width="1600" class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>LugoTech</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      

      <v-main>
        <v-card-title class="text-h6 text-md-h5 text-lg-h4 pa-md-6 mx-lg-auto font-weight-black">N O M I N A</v-card-title>
        <v-container fluid>
          <v-table density="compact" v-if="employees">
            <thead>
              <tr>
                <th class="text-center">Nombre Completo</th>
                <th class="text-center">Genero</th>
                <th class="text-center">Puesto de trabajo</th>
                <th class="text-center">correo</th>
                <th class="text-center">Fecha de cumpleaños</th>
                <th class="text-center">Salario neto</th>
                <th class="text-center">Salario bruto</th>
                <th class="text-center">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in employees" :key="item.id">
                <td>{{ item.fullName }}</td>
                <td>{{ item.gender == 'M' ? "Masculino" : "Femenino"}}</td>
                <td>{{ item.job }}</td>
                <td>{{ item.correo }}</td>
                <td>{{ item.birdDate }}</td>
                <td>{{ item.netSalary }}</td>
                <td>{{ item.salaryFinal }}</td>
                <td>
                  <v-btn color="indigo" @click="selectEmployee(index, true)"> Editar </v-btn>
                </td>
                <td>
                  <v-btn color="lime"> Ver detalles </v-btn>
                </td>
                <td>
                  <v-btn color="primary" @click="selectEmployee(index, false)"> despedir </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card>
          <v-card-text>
           Este empleado {{ employeesSelect.fullName }} sera despedido 
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="despedirEmployee">Si, despidelo</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-dialog
    v-model="dialogPost"
    persistent
    width="1024"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                label="Nombre Completo"
                v-model="employeesSelect.fullName"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                label="correo"
                v-model="employeesSelect.correo"
                required
                hint="example@gmail.com"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                label="Legal last name*"
                hint="example of persistent helper text"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogPost = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  components:{
  },
  data() {
    return {
      dialogPost: false,
      dialog: false,
      employees: [],
      employeesSelect: null,
    };
  },
  async created(){
    await this.getEmployee();
    this.employees = this.$store.state.employees
  },
  methods:{
    ...mapActions(['getEmployee', 'despedir']),
    selectEmployee(index, isEdit){
      if(!isEdit)
        this.dialog = true;
      this.dialogPost = true;
      
      this.employeesSelect = this.employees[index];
    },
    async despedirEmployee(){
      this.dialog = false;
      await this.despedir();
      this.employeesSelect = false;
      this.employees = this.$store.state.employees
    },
    save(){
      this.dialogPost = false;
      console.log(this.employeesSelect)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
