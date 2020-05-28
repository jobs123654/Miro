<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			新增记录<span style="cursor: pointer;float: right;" @click="close">&times;</span>
		</div>
		<div class="panel-body">
			<Input v-for="i in fields" v-model="i.value" :placeholder="i.key" style="width: 300px;margin-top: 2%;"/>
			
		</div>
</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {Input} from view-design
	import bus from '../../../config/Event.js'
	export default{
		name:'Add',
		components:{
			
		},
		props:{
			
		},
		data:()=>{
			return{
				visible:false,
				fields:[]
			}
		},
		created() {
			bus.$on('showAdd',e=>{
				this.fields=e
			})
		},
		methods:{
			...mapMutations([
				'pushData','editDataItem'
			]),
			show(){
				this.visible=true
			},
			close(){
				this.visible=false
			},
			submit(){
				
			}
		},
		computed:{
			
		}
	}
</script>

<style scoped="scoped">
</style>
