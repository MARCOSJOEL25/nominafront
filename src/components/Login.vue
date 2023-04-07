<template>
  <!-- <nav class="navbar navbar-default navbar-expand-lg navbar-light">
	<div class="navbar-header">
		<a class="navbar-brand" href="#">Lugo<b>Tech</b></a>  		
		<button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
			<span class="navbar-toggler-icon"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>
	</div> -->
  <!-- Collection of nav links, forms, and other content for toggling 
	<div  v-if="!$store.state.isLogin" id="navbarCollapse" class="collapse navbar-collapse">
		<form class="navbar-form form-inline">
			<div class="input-group search-box">								
				<input type="text" id="search" class="form-control" placeholder="Search here...">
				<span class="input-group-addon"><i class="material-icons">&#xE8B6;</i></span>
			</div>
		</form>
		<ul class="nav navbar-nav navbar-right">			
			<li>
				<a data-toggle="dropdown" class="dropdown-toggle" href="#">Login</a>
				<ul class="dropdown-menu form-wrapper">					
					<li>
						<form>
							<div class="form-group">
								<input type="text" class="form-control" v-model="loginModel.userName" placeholder="Username" required="required">
							</div>
							<div class="form-group">
								<input type="password" class="form-control" v-model="loginModel.password" placeholder="Password" required="required">
							</div>
							<button type="submit" class="btn btn-primary btn-block" :disabled="isLoading" @click="login">Login</button>
						</form>
					</li>
				</ul>
			</li>
			<li>
				<ul class="dropdown-menu form-wrapper">					
					<li>
						<form action="/examples/actions/confirmation.php" method="post">
							<p class="hint-text">Fill in this form to create your account!</p>
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Username" required="required">
							</div>
							<div class="form-group">
								<input type="password" class="form-control" placeholder="Password" required="required">
							</div>
							<div class="form-group">
								<input type="password" class="form-control" placeholder="Confirm Password" required="required">
							</div>
							<div class="form-group">
								<label class="checkbox-inline"><input type="checkbox" required="required"> I accept the <a href="#">Terms &amp; Conditions</a></label>
							</div>
							<button type="submit" class="btn btn-primary btn-block">Sign up</button>
						</form>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</nav> -->
  <section class="">
    <div v-if="isOpenAlert">
      <v-alert type="error" title="Credenciales incorrectas" text=""></v-alert>
    </div>
    <div
      class="px-4 py-5 px-md-5 text-center text-lg-start abs-center"
      style="background-color: hsl(0, 0%, 96%)"
    >
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-3 fw-bold ls-tight">
              LugoTech <br />
              <span class="text-primary"
                >No solo es software, son tus ideas.</span
              >
            </h1>
            <p style="color: hsl(217, 10%, 50.8%)">
              Experto en soluciones tecnologicas
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card">
              <div class="card-body py-5 px-md-5">
                <h1 class="my-5 display-5 fw-bold ls-tight">Sign in</h1>
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control" v-model="loginModel.userName"/>
                  <label class="form-label" for="form3Example3"
                    >Email address</label
                  >
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example4"
                    class="form-control"
					v-model="loginModel.password"
                  />
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                <div class="text-center">
                  <v-btn
                    :disabled="dialog"
                    :loading="dialog"
                    color="purple-darken-2"
                    @click="dialog = true"
                  >
                    Login
                  </v-btn>
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
                </div>

                <!-- <button class="btn btn-primary btn-block mb-4" :disabled="isLoading" @click="login">
                  Sign up
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "loginScreen",
  data() {
    return {
      loginModel: {
        userName: "",
        password: "",
      },
      isLoading: false,
      isOpenAlert: false,
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["LoginEmployee"]),
    async login() {

		this.isLoading = true;
		console.log(this.loginModel);
      
		await this.LoginEmployee(this.loginModel);
		
		this.isLoading = true;
    },
  },
  watch: {
    async dialog(val) {
      if (!val) return;
	
		if(!(await this.login(this.loginModel))){
			this.isOpenAlert = true
		}

		this.dialog = false;
    },
  },
};
</script>

<style>
.abs-center {
  position: absolute;
  margin: auto;
  top: 180px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>