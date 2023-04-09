<template>
  <teleport to="body">
    <div
      class="modal fade"
      :id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Contratacion</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <v-dialog
                    v-model="dialog"
                    :scrim="false"
                    persistent
                    width="auto"
                  >
                    <v-card color="primary">
                      <v-card-text>
                        ...loading
                        <v-progress-linear
                          indeterminate
                          color="white"
                          class="mb-0"
                        ></v-progress-linear>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
            <div v-if="isOpenAlert">
              <v-alert
                type="error"
                title="Debes de llenar los campos"
                text=""
              ></v-alert>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Nombre completo *</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                required="true"
                v-model="employeeModel.fullName"
              />
              <label for="Salario" class="form-label">Salario *</label>
              <input
                type="Number"
                class="form-control"
                required="true"
                id="Salario"
                v-model="employeeModel.netSalary"
              />
            </div>
          </div>
          <div class="modal-footer">
            <v-btn
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="$emit('render')"
            >
              Close
            </v-btn>
            <v-btn type="button" class="btn btn-primary" @click="add"
              >Crear</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "createEmployee",
  props: {
    exampleModal: String,
  },
  data() {
    return {
      employeeModel: {
        id: 0,
        fullName: "",
        netSalary: 0,
      },
      isOpenAlert: false,
      dialog:false
    };
  },
  methods: {
    ...mapActions(["postEmployee"]),
    async add() {
      if (this.Validar()) {
        this.dialog = true;
        await this.postEmployee(this.employeeModel);
        this.dialog = false;
        this.limpiar();
        return
      }
      console.log("debes llenar los campos")
    },
    limpiar() {
      (this.employeeModel.fullName = ""),
        (this.employeeModel.netSalary = 0);
    },
    Validar() {
      if (
        this.employeeModel.fullName == "" ||
        this.employeeModel.netSalary == 0 
      ) {
        return false;
      }

      return true;
    },
  },
};
</script>
<style lang="">
</style>