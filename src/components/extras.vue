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
          <h5 class="modal-title" id="exampleModalLabel">Extras</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
            <label for="exampleFormControlInput1" class="form-label"
              >Empleado elegido</label>
          <select class="form-select" aria-label="Default select example" v-model="extrasModel.employeeId">
            <option v-for="(item, index) in $store.state.employees" :key="index" :value="item.id">{{ item.fullName }}</option>
          </select>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Cantidad</label
            >
            <input
              type="Number"
              v-model="extrasModel.adicciónSalary"
              class="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Motivo</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
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
          <v-btn type="button" class="btn btn-primary" @click="extras">Guardar cambios</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: "extrasEmployee",
  props: {
    targetId: String,
  },
  data() {
    return {
      extrasModel:{
        employeeId: 0,
        adicciónSalary: 0,
      }
    };
  },
  methods:{
    ...mapActions(["extraEmployee"]),
    async extras() {
      console.log(this.extrasModel)
      this.isLoading = true;
      await this.extraEmployee(this.extrasModel);

      this.isLoading = false;
    },
  }
};
</script>
<style>
</style>