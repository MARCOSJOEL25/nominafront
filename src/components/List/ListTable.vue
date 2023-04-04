<template>
    <div>
        <button class="btn btn-primary" @click="$emit('selection')">
            Nuevo
        </button>
        <table class="table">
            <thead class="table-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
            </tbody>
          </table>
        <table>
            <tr>
                <td>FullName</td>
                <td>Correo</td>
                <td>Genero</td>
                <td>Salario neto</td>
                <td>Salario bruto</td>
                <td>Puesto</td>
                <td>Opciones</td>
            </tr>
            <tr v-for="(item, index) in ListEmployee" :key="index">
                <td>{{ item.fullName }}</td>
                <td>{{ item.correo }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.netSalary }}</td>
                <td>{{  item.salaryFinal }}</td>
                <td>{{  item.job }}</td>
                <td>
                    <button>Ver Detalles</button>
                    <button>Editar</button>
                    <button>Despedir</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: "List-table",
    props:{
        ListEmployee: {
            type: Array,
            required: true
        }
    }
}
</script>
<style>
    
</style>