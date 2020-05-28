<template>
	<div class="col-md-9">
		<button class="btn btn-default add" style="margin-left: 89%;margin-bottom: 0.3%;" @click="showAdd">新增</button>
		<table class="table table-bordered">
			<thead>
				<th v-for="i in fields">{{i}}</th>
			</thead>
		   <tbody>
			   <tr v-for="(u,i) in list" >
			   <td>{{u.ID}}</td>
			   <td>{{u.账号}}</td>
				<td>{{u.密码}}</td>
				 <td>{{u.角色}}</td>
				 <td>{{u.权限}}</td>
				  <td>{{u.电话}}</td>
				    <td class="btn-group">
						<button class="btn btn-sm" @click="showUpdate(u)"><i class="glyphicon glyphicon-pencil"></i></button>
						<button class="btn btn-sm" @click="del(u)"><i class="glyphicon glyphicon-trash"></i></button>
					</td>
			   </tr>
		   </tbody>
		</table>
		
	</div>
</template>

<script>
	import Pager from '../common/Pager.vue'
	import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
	export default{
		name:'User',
		components:{
			Pager,
		},
		data(){
			return {
			 addVisible:false,
		     updateVisible:false,
			 key:'user',
			 fields:['编号','账号','密码','角色','权限','电话','操作'],
			 formTemplate:{
				target:'user',
				title:'添加用户',
				content:[
					{
						name:'账号',
					},
                    {
                    	name:'密码',
                    },
                    
                   
					{
						name:'角色',
						item:[
							'超级管理员',
							'数据维护人员'
						]
					},
					{
						name:'电话',
					},
					
				]
			  }
			}
		},
		
		methods:{
		...mapMutations([
			'setForm','delUser','setDataObj','setKey'
		]),
		showAdd(){
			console.log(this.list)
			this.formTemplate.title='添加用户'
			this.setForm(this.formTemplate)
			this.setKey(this.key)
		},
		showUpdate(item){
			this.formTemplate.title='编辑信息'
			this.setForm(this.formTemplate)
			setTimeout(e=>{
				this.setDataObj(item)
			},300)
		},
		 del(item){
			this.delUser(item)
		 }
		},
		computed:{
			list(){
				let u=this.$store.state.users
				let map=new Map([['超级管理员','地图浏览、数据分析、数据管理'],['数据维护人员','数据采集与维护']])
				
				u.forEach(e=>{
					e['权限']=map.get(e.角色)
				})
				return u;
			}
		}
	}
</script>
<style scoped>
	th{text-align: center;}
	.Page{position: fixed;top: 87%;left: 40%;}
</style>
