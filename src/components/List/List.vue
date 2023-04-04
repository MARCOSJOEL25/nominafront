<template>
    <div>
        <div v-if="showCreate">
            <ListTable :ListEmployee="employee" @selection="funciona" @Back="funciona"/>
        </div>
        <div v-else> 
            <create/>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import ListTable from './ListTable.vue'
import create from '../createOrUpdate/create.vue'

export default {
    name: 'List-components',
    components:{
        ListTable,
        create,
    },
    data(){
        return{
            employee: [],
            showCreate:true,
        }
    },

    async created(){
        await this.getEmployee();
        this.employee = this.$store.state.employees
    },

    methods:{
        ...mapActions(['getEmployee']),
        funciona(){
            this.showCreate = this.showCreate ? false: true;
            console.log(this.showCreate)
        }
    }

}
</script>
<style>
    
</style>