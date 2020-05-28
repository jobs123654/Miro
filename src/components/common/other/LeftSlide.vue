<template>
	 <aside>
		 <slot name="menu"></slot>
		
		<slot name="chart"></slot>
		<slot name="pop"></slot>
		
	</aside>
</template>

<script>
	export default{
		data:e=>{
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped="scoped">
	aside{
		background-color: #FFFFFF;
		
	}
</style>
