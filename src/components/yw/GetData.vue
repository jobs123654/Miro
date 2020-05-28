<template>
	<div class="col-md-9" style="overflow-x:auto;height: 100%;width: 96%;">
		<div class="btn-group" style="margin-left: 85%;">
			<button class="btn btn-default"  @click="showAdd">导入</button>
			<button class="btn btn-default "  @click="moreDel">批量删除</button>
		</div>
		<table class="table table-bordered" style="margin-right: 100px;">
			<thead>
				<tr>
					<th>选择</th>
					<th style="width: auto;" v-for="i in fields">{{i}}</th>
					<th>操作</th>
				</tr>
				
			</thead>
		   <tbody>
			   <tr v-for="(u,i) in data">
			   <td><input type="checkbox" :value="u.ID" v-model="checks"/></span></td>
			   <td v-for="(k,v) in u" >
			  
			  <span>{{k}}</span>
			   </td>
				    <td class="btn-group" role="group">
						<!-- <button class="btn btn-sm" @click="showUpdate(u)"><i class="glyphicon glyphicon-pencil"></i></button> -->
						<button class="btn btn-sm" @click="del(u)"><i class="glyphicon glyphicon-trash"></i></button>
					</td>
			   </tr>
		   </tbody>
		</table>
		<!-- 分页组件 -->
		<Pager class='mPage' ref='page'  @show='show' />
		
	</div>
</template>

<script>
	import Pager from '../common/Pager.vue'
	import Import from '../common/Import'
	import bus from '../../../config/Event.js'
	import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
	export default{
		name:'GetData',
		components:{
			Pager,Import,VueDragResize
		},
		props:{
			
		},
		data:()=>{
			return{
				 checks:[],
				 data:[],
				 size:8,
				 visible:false,
				 fields:[],
			}
		},
		methods:{
			show(){
				this.visible=true
			},
			close(){
				this.visible=false
			},
			showAdd(){
			   bus.$emit('addData',this.fields)
			},
			showUpdate(item){
				 bus.$emit('editData',item)
			},
			 del(item){
				
				this.delDataItem(item)
			 },
			 moreDel(){
				 if(this.checks.length>0){
					
					 this.checks.forEach(e=>{
						 this.delDataItem({ID:e})
					 })
				 }
			  }
		},
		computed:{
			
		}
	}
</script>

<style scoped="scoped">
	th{text-align: center;}
	.mPage{position: absolute;top: 77%;left: 44%; }
	.Import{
		position: absolute;
		width: 300px;
		left: 40%;
		top: 30%;
	}
</style>
