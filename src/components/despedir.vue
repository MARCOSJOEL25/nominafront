<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="targetId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Prestaciones</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Tiempo en la empresa</label
            >
            <input
              type="Text"
              class="form-control"
              v-model="data.tiempoEmpresa"
              id="exampleFormControlInput1"
              :disabled="true"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Regalia</label
            >
            <input
              type="text"
              class="form-control"
              v-model="data.prestacionesTotales"
              id="exampleFormControlInput1"
              :disabled="true"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Salario del empleado</label
            >
            <input
              type="text"
              class="form-control"
              v-model="data.salarioDelEmpleado"
              id="exampleFormControlInput1"
              :disabled="true"
            />
          </div>
        </div>
        <div class="modal-footer">
          <v-btn
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="$emit('renderTable')"
          >
            Close
          </v-btn>
          <v-btn type="button" class="btn btn-primary" @click="Delete"
            >Guardar cambios</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { mapActions } from "vuex";
export default {
  name: "despedirEmployee",
  props: {
    targetId: String,
    id: Number,
  },
  data() {
    return {
      data: [],
    };
  },
  async created(){
    this.data = await this.prestaciones(this.id);
    this.data.salarioDelEmpleado = this.formato(this.data.salarioDelEmpleado)
    this.data.prestacionesTotales = this.formato(this.data.prestacionesTotales)
  },
  methods: {
    ...mapActions(["DeleteEmployee", "prestaciones"]),
    async Delete() {
      console.log(this.id);
      this.isLoading = true;

      await this.prestacioness();
      await this.DeleteEmployee(this.id);

      this.isLoading = false;
    },
    formato(valor) {
      var numeral = require("numeral");

      return numeral(valor).format("0,0");
    },
  },
};
</script>
  <style>
</style>