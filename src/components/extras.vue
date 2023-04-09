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
          <select class="form-select" aria-label="Default select example">
            <option v-for="(item, index) in $store.state.employees" :key="index">{{ item.fullName }}</option>
          </select>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Cantidad</label
            >
            <input
              type="Number"
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
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "extrasEmployee",
  props: {
    targetId: String,
  },
  data() {
    return {
      extrasModel: {
        id: 0,
        employeeId: 0,
        adicciónSalary: 0,
        motivo: "string",
        employees: []
      },
    };
  },
};
</script>
<style>
</style>