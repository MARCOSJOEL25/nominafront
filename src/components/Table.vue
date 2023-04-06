<template>
        <div class="container">
		<div class="row">
			<div class="card bg-success col-6">
				<div class="card-body text-center">
				<p class="card-text">Cantidad de empleados activos : {{ employees.length }} </p>
			</div>
			<div class="card bg-warning col-6">
				<div class="card-body text-center">
				<p class="card-text">Cantidad de empleados inactivos : {{ employees.length }} </p>
			</div>
		</div>
		</div>
		</div>
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-xs-6">
							<h2>Manage <b>Employees</b></h2>
						</div>
						<div class="col-xs-3">
							<a @click="isExtras = true" href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Employee</span></a>
						</div>
						<div class="col-xs-3">
							<a @click="isExtras = false" href="#addEmployeeModal" class="btn btn-warning" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Agregar ingresos extras</span></a>
						</div>
					</div>
				</div>
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th>Nombre Completo</th>
							<th>   Correo</th>
							<th>	Genero</th>
							<th>Cargo</th>
							<th>Salario Bruto</th>
							<th>Tiempo en la empresa</th>
							<th>ISR</th>
							<th>ARS</th>
							<th>AFP</th>
							<th>Adiccion</th>
							<th>Salario Neto</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in employees" :key="index">
							<td>{{ item.fullName }}</td>
							<td>{{ item.correo }}</td>
							<td>{{ item.gender }}</td>
							<td>{{ item.job }}</td>
							<td>{{ item.netSalary }}</td>
							<td>{{ item.dataIn }}</td>
							<td>{{ item.isr }}</td>
							<td>{{ item.afp }}</td>
							<td>{{ item.ars }}</td>
							<td>{{ item.adiccion }}</td>
							<td>{{ item.salaryFinal }}</td>
							<td>
								<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete" @click="prestacioness(item)">&#xE872;</i></a>
							</td>
						</tr>
					</tbody>
				</table>
				<!-- <div class="clearfix">
					<div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
					<ul class="pagination">
						<li class="page-item disabled"><a href="#">Previous</a></li>
						<li class="page-item"><a href="#" class="page-link">1</a></li>
						<li class="page-item"><a href="#" class="page-link">2</a></li>
						<li class="page-item active"><a href="#" class="page-link">3</a></li>
						<li class="page-item"><a href="#" class="page-link">4</a></li>
						<li class="page-item"><a href="#" class="page-link">5</a></li>
						<li class="page-item"><a href="#" class="page-link">Next</a></li>
					</ul>
				</div> -->
			</div>
		</div>        
	<!-- Add Modal HTML -->
	<div id="addEmployeeModal" class="modal fade">
		<div class="modal-dialog"  v-if="isExtras">
			<div class="modal-content">
				<form>
					<div class="modal-header">						
						<h4 class="modal-title">Agregar nuevo empleado</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<div class="form-group">
							<label>Nombre Completo</label>
							<input type="text" v-model="employeeModel.fullName" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Correo</label>
							<input type="email" v-model="employeeModel.correo" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Salario</label>
							<input type="Number" v-model="employeeModel.netSalary" class="form-control" required>
						</div>					
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<button type="submit" class="btn btn-success" @click="add" :disabled="isLoading">Agregar</button>
					</div>
				</form>
			</div>
		</div>
		<div class="modal-dialog" v-else>
			<div class="modal-content">
				<form>
					<div class="modal-header">						
						<h4 class="modal-title">Agregando extras</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<div class="form-group" >
							<label> id empleado </label>
							<input type="Number" v-model="employeeid" class="form-control"  required >
						</div>
						<div class="form-group">
							<label>Cantidad</label>
							<input type="Number" v-model="adicciónSalary" class="form-control"  required>
						</div>
						<div class="form-group">
							<label>Motivo</label>
							<textarea v-model="extrasModel.motivo" class="form-control" ></textarea>
						</div>				
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Salir">
						<input type="submit" class="btn btn-info" :disabled="isLoading" value="Save" @click="extras" >
					</div>
				</form>
			</div>
		</div>
	</div>
	</div>
	<!-- Edit Modal HTML -->
	<div id="editEmployeeModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">						
						<h4 class="modal-title">Agregando new Empleado</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<div class="form-group" >
							<label> Nombre Completo</label>
							<input type="text" class="form-control" v-model="employeeSelected.fullName" required >
						</div>
						<div class="form-group">
							<label>Correo</label>
							<input type="email" class="form-control" v-model="employeeSelected.correo" required>
						</div>
						<div class="form-group">
							<label>Salario</label>
							<textarea class="form-control" v-model="employeeSelected.netSalary" required></textarea>
						</div>				
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Salir">
						<input type="submit" class="btn btn-info" value="Save" @click="edit(selectEmployee)">
					</div>
					
				</form>
			</div>
		</div>
	</div>
	<!-- Delete Modal HTML -->
	<div id="deleteEmployeeModal" class="modal fade" v-if="employeeSelected">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">						
						<h4 class="modal-title">Despido</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<p>Esta seguro que quiere despedir a {{ data.nombreEmpleado  }} </p>
						<div class="form-group">
							<label>Salario del empleado</label>
							<input class="form-control" v-model="data.salarioDelEmpleado" :disabled="true"/>
						</div>
						<div class="form-group">
							<label>Tiempo en la empresa</label>
							<input class="form-control" v-model="data.tiempoEmpresa" :disabled="true"/>
						</div>
						<div class="form-group">
							<label>Prestaciones</label>
							<input class="form-control" v-model="data.prestacionesTotales" :disabled="true"/>
						</div>
						<p class="text-warning"><small>Estos datos posiblemente no sean exactos</small></p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
						<button type="submit" class="btn btn-danger" data-dismiss="modal" :disabled="isLoading" @click="Delete(employeeSelected.id)">Delete</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: "TableEmployee",
	props:{
		employeeProp:{
			type: Array,
			required:false
		}
	},
	data(){
		return{
			employeeModel: {
			"id": 0,
			"fullName": "",
			"netSalary": 0
			},
			employeeid:0,
			adicciónSalary: 0,
			extrasModel:{
				"id": 0,
				"employeeId": 0,
				"adicciónSalary": 0,
				"motivo": ""
			},
			data: {},
			isExtras: true,
			employeeSelected: {},
			isLoading:false,
			employees: Array
		}
	},
	async created(){
		await this.renderTable()
	},	
	methods:{
		async renderTable(){
			await this.getEmployee();
			this.employees = this.$store.state.employees;
		},
		...mapActions(['postEmployee', 'DeleteEmployee','getEmployee', 'extraEmployee','prestaciones' ]),
		async add(){
			this.isLoading = true;

			if(this.Validar()){
				await this.postEmployee(this.employeeModel);
				await this.renderTable();
				// this.$emit("Inicializador")
				this.limpiar();
				this.isLoading = false;
			}
			this.isLoading = false;
		},
		edit(item){
			this.postEmployee(item)
			// this.$emit("Inicializador")
		},
		async Delete(id){
			this.isLoading = true;

			await this.DeleteEmployee(id);
			await this.renderTable()
			// this.$emit("Inicializador")

			this.isLoading = false;

		},
		selectEmployee(item){
			this.employeeSelected = item
			console.log(this.employeeSelected)
		},
		async prestacioness(item){
			this.selectEmployee(item);
			this.data = await this.prestaciones(item.id);
		},
		limpiar(){
			this.employeeModel.fullName = "",
			this.employeeModel.correo = "",
			this.employeeModel.netSalary = 0
		},
		Validar(){
			if(this.employeeModel.fullName == "" || this.employeeModel.correo == "" || this.employeeModel.netSalary < 1){
				return false
			}

			return true
		},
		async extras(){
			this.isLoading = true;
			await this.extraEmployee(this.employeeid, this.adicciónSalary)
			await this.renderTable()

			this.isLoading = false;
		}
	}
}
</script>
<style>
    body {
        color: #566787;
		background: #f5f5f5;
		font-family: 'Varela Round', sans-serif;
		font-size: 13px;
	}
	.table-responsive {
        margin: 30px 0;
    }
	.table-wrapper {
		min-width: 1000px;
        background: #fff;
        padding: 20px 25px;
		border-radius: 3px;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
    }
	.table-title {        
		padding-bottom: 15px;
		background: #435d7d;
		color: #fff;
		padding: 16px 30px;
		margin: -20px -25px 10px;
		border-radius: 3px 3px 0 0;
    }
    .table-title h2 {
		margin: 5px 0 0;
		font-size: 24px;
	}
	.table-title .btn-group {
		float: right;
	}
	.table-title .btn {
		color: #fff;
		float: right;
		font-size: 13px;
		border: none;
		min-width: 50px;
		border-radius: 2px;
		border: none;
		outline: none !important;
		margin-left: 10px;
	}
	.table-title .btn i {
		float: left;
		font-size: 21px;
		margin-right: 5px;
	}
	.table-title .btn span {
		float: left;
		margin-top: 2px;
	}
    table.table tr th, table.table tr td {
        border-color: #e9e9e9;
		padding: 12px 15px;
		vertical-align: middle;
    }
	table.table tr th:first-child {
		width: 60px;
	}
	table.table tr th:last-child {
		width: 100px;
	}
    table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
	}
	table.table-striped.table-hover tbody tr:hover {
		background: #f5f5f5;
	}
    table.table th i {
        font-size: 13px;
        margin: 0 5px;
        cursor: pointer;
    }	
    table.table td:last-child i {
		opacity: 0.9;
		font-size: 22px;
        margin: 0 5px;
    }
	table.table td a {
		font-weight: bold;
		color: #566787;
		display: inline-block;
		text-decoration: none;
		outline: none !important;
	}
	table.table td a:hover {
		color: #2196F3;
	}
	table.table td a.edit {
        color: #FFC107;
    }
    table.table td a.delete {
        color: #F44336;
    }
    table.table td i {
        font-size: 19px;
    }
	table.table .avatar {
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 10px;
	}
    .pagination {
        float: right;
        margin: 0 0 5px;
    }
    .pagination li a {
        border: none;
        font-size: 13px;
        min-width: 30px;
        min-height: 30px;
        color: #999;
        margin: 0 2px;
        line-height: 30px;
        border-radius: 2px !important;
        text-align: center;
        padding: 0 6px;
    }
    .pagination li a:hover {
        color: #666;
    }	
    .pagination li.active a, .pagination li.active a.page-link {
        background: #03A9F4;
    }
    .pagination li.active a:hover {        
        background: #0397d6;
    }
	.pagination li.disabled i {
        color: #ccc;
    }
    .pagination li i {
        font-size: 16px;
        padding-top: 6px
    }
    .hint-text {
        float: left;
        margin-top: 10px;
        font-size: 13px;
    }    
	/* Custom checkbox */
	.custom-checkbox {
		position: relative;
	}
	.custom-checkbox input[type="checkbox"] {    
		opacity: 0;
		position: absolute;
		margin: 5px 0 0 3px;
		z-index: 9;
	}
	.custom-checkbox label:before{
		width: 18px;
		height: 18px;
	}
	.custom-checkbox label:before {
		content: '';
		margin-right: 10px;
		display: inline-block;
		vertical-align: text-top;
		background: white;
		border: 1px solid #bbb;
		border-radius: 2px;
		box-sizing: border-box;
		z-index: 2;
	}
	.custom-checkbox input[type="checkbox"]:checked + label:after {
		content: '';
		position: absolute;
		left: 6px;
		top: 3px;
		width: 6px;
		height: 11px;
		border: solid #000;
		border-width: 0 3px 3px 0;
		transform: inherit;
		z-index: 3;
		transform: rotateZ(45deg);
	}
	.custom-checkbox input[type="checkbox"]:checked + label:before {
		border-color: #03A9F4;
		background: #03A9F4;
	}
	.custom-checkbox input[type="checkbox"]:checked + label:after {
		border-color: #fff;
	}
	.custom-checkbox input[type="checkbox"]:disabled + label:before {
		color: #b8b8b8;
		cursor: auto;
		box-shadow: none;
		background: #ddd;
	}
	/* Modal styles */
	.modal .modal-dialog {
		max-width: 400px;
	}
	.modal .modal-header, .modal .modal-body, .modal .modal-footer {
		padding: 20px 30px;
	}
	.modal .modal-content {
		border-radius: 3px;
	}
	.modal .modal-footer {
		background: #ecf0f1;
		border-radius: 0 0 3px 3px;
	}
    .modal .modal-title {
        display: inline-block;
    }
	.modal .form-control {
		border-radius: 2px;
		box-shadow: none;
		border-color: #dddddd;
	}
	.modal textarea.form-control {
		resize: vertical;
	}
	.modal .btn {
		border-radius: 2px;
		min-width: 100px;
	}	
	.modal form label {
		font-weight: normal;
	}	
</style>