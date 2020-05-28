<template>
	<div class="panel panel-default" style="background-color: #FFFFFF;">
		<div class="panel-heading">
			新增记录<span style="cursor: pointer;float: right;" @click="close">&times;</span>
		</div>
		<div class="panel-body">
			<span  v-for="(i,index) in  fields">
			 <Input v-if='i.type==="text"'  :key='index' v-model='i.value' :name='i.name' :placeholder="i.title" style="width: 300px;margin-top: 2%;"/>	
			</span>
			<button class="btn" @click="ok">确定</button>
			<button class="btn"  @click="close">关闭</button>
		</div>
</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {Input} from 'view-design'
	import bus from '../../../../config/Event.js'
	export default{
		name:'Add',
		components:{
			
		},
		props:{
			
		},
		data:()=>{
			return{
			
				fields:[],
				key:'',
			}
		},
		
		methods:{
			...mapMutations([
				'pushData','setKey'
			]),
			ok(){
				let item={}
				this.fields.forEach(e=>{
					if(e.value!==''){
						item[e.title]=e.value
					}
				})
				// let item1={
				// 	代号:1,
				// 	地址:'二号楼一单元',
				// 	制造商:'扩大飞机',
				// 	安装时间:'2020-03-23',
				// 	维保人员:'张天志',
				// 	经度:119.3,
				// 	纬度:39.3
				// }
				this.setKey(this.key)
				this.pushData(item)
				this.$emit('close')
			},
			
			show(e){
				
				this.fields=e.fields
				this.key=e.name
			},
			close(){
				
				this.fields.forEach(e=>{
					if(e.value!==''){
						e.value=''
					}
				})
				this.$emit('close')
			},
			
		},
		computed:{
			
		}
	}
</script>

<style scoped="scoped">
</style>
