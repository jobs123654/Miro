<template>
	<Page simple :total="total" show-elevator :page-size='size' @on-change='click'></Page>
</template>

<script>
	import {Page} from 'view-design';
	export default{
		name:'Pager',
		props:{
			
		},
		data(){
			return {
				total:0,
				size:1,
			}
		},
		methods:{
			click(e){
				this.$emit('show',e)
			},
			init(t,s){
				this.total=t
				this.size=s
			}
		},
		
	}
</script>

<style>
</style>
