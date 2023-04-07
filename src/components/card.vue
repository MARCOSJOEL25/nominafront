<template>
     <div class="card">
          <h5 class="card-header">{{ title }}</h5>
          <div class="card-body">
            <slot name="contador">
            </slot>
          </div>
        </div>
</template>
<script>
export default {
    name: "card_count",
    props:{
        title:{
            type:String,
            required:true
        },
        count:{
            type:{
                type:Number,
                required:true,
                default: 3
            }
        }
    }
    
}
</script>
<style>
    
</style>