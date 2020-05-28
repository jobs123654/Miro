
<template>
<div class="panel panel-default" v-show="visible" >
	<div class="panel-heading">
		故障信息<a href="#" @click="close" style="position: absolute;right: 2%;">&times;</a>
	</div>
	<div class="panel-body">
		<div class="btn-group" style="margin-left: 85%;">
			<!-- <button class="btn btn-default"  @click="showAdd">新增</button> -->
			
		</div>
		<Table border :columns="column" :data="data">
			 <!-- <template slot-scope="{ row, index }" slot="action">
			            <Button type="primary" size="small" style="margin-right: 5px" @click="showEdit(row)">编辑</Button>
			            <Button type="error" size="small" @click="del(row)">删除</Button>
			        </template> -->
		</Table>
		<Pager style='margin-top: 1%;' ref='page' @show='show'/>
		
		<VueDragResize v-show='addVisible' :parent="true" :isActive="true" :x="400" :y='100' :isResizable="false"  @activated="activateEv(1)">
				<Add ref='add' @close='closeAdd' class='del'></Add>
		</VueDragResize>
		<VueDragResize  v-show='editVisible' :parent="true" :isActive="true" :x="400" :y='100' :isResizable="false"  @activated="activateEv(1)">
		<Edit ref='edit' @close='closeEdit'  class='del'></Edit>
		</VueDragResize>
	</div>
       
	</div>
	
</template>

<script>
import bus from '../../../config/Event.js'	
	import {mapState,mapMutations} from 'vuex'
	import { Table } from 'view-design';
    import Pager from '../common/Pager'
	 import Add from '../common/data/Add.vue'
	 import Edit from '../common/data/Edit.vue'
	 import VueDragResize from "vue-drag-resize";
	export default{
		 props:{
			 obj:Object
		 },
		
	     data(){
			return{
				source:[],
				column:[],
				data:[],
				size:6,
				visible:true,
				addVisible:false,
				editVisible:false
				
			}
		},
		components:{
			Pager,	Add,Edit, VueDragResize,
		},
		created() {
			bus.$on('showBaseInfo',e=>{
				if (e.items&&e.items.length>0) {
					this.visible=true
				}else{
					this.visible=false
				}
			})
		},
		computed:{
			...mapState({
				'result':'data',
			})
		},
		mounted() {
			let d=JSON.parse(localStorage.getItem(this.obj.name))
			if(d&&d.length){
				this.source=d
				this.setData(d)
				
			}
			if(this.$refs.page){
				
			 this.load(d)
			}
			
			
		},
		methods:{
			...mapMutations([
				'setResult','setData','delDataItem','setKey'
			]),
			/* 分页输出 */
			show(e){
				let size=this.size,start=(e-1)*size;
				
				this.data=this.source.slice(start,start+size)
			},
			load(n){
				if(this.$refs.page){
					this.source=n
					let total=0,size=6;
					if(size<n.length){
						this.data=n.slice(0,size)
						total=n.length%size>0?n.length/size+n.length%size:n.length/size;                 
					}else{
						this.data=n.slice(0,n.length)
						total=n.length
						this.size=n.length
					}
					this.column=this.getColumn(this.data)
					this.$refs.page.init(n.length,size)
				
				}
			},
			getColumn(data){
				let column=[]
				for(let i in data[0]){
				 column.push({
					 title:i.toUpperCase(),
					 key:i
				 });
				}
				// column.push({
    //                     title: '操作',
    //                     slot: 'action',
    //                     width: 150,
    //                     align: 'center'
    //                 })
				return column
			},close(){
				this.visible=false
				
			},
			reload(){
				let d=JSON.parse(localStorage.getItem(this.obj.name))
				
				this.source=d
				this.load(d)
					
				
				
			},
			showAdd(){
				
				this.obj.fields.forEach(e=>{
				e.value=''
				})
				if(this.obj&&this.obj.fields){
					let item=this.source[this.source.length-1]
					if(item){
						this.obj.fields[0].value=parseInt(item.编号)+1
					}
					this.addVisible=true
					this.$refs.add.show(this.obj)
					
				}
			},
			showEdit(index){
				if(this.obj&&this.obj.fields){
					this.editVisible=true
					if(index){
						for(let i in index){
							let r=this.obj.fields.find(e=>e.title===i)
							if(r){
								r.value=index[i];
							}
						}
					}
					this.$refs.edit.show(this.obj)
					
				}
			},
			del(index){
				this.setKey(this.obj.name);
				this.delDataItem(index)
				this.reload()
			},
			closeAdd(){
				this.addVisible=false
			},
			closeEdit(){
				this.editVisible=false
				this.reload()
				// this.$forceUpdate()
			},
			activateEv(index) {
			  
		 let input=document.getElementsByTagName('input'),select=document.getElementsByTagName('select')
			    if(input&&input.length>0){
					   for (let i in input) {
					     if(isNaN(input[i]))
						
						 input[i].onclick=e=>{
							input[i]. focus()
						 }
					   }
					  
				   }
				   if(select&&select.length>0){
				   		for (let i in select) {
				   		  if(isNaN(select[i]))
						  select[i].onclick=e=>{
				   		  select[i]. focus()
				   			}
				   		}   
				   }
				 }
			
		},
		watch:{
			result:{
				handler(n,s){
					if(this.obj.name){
				    	let d=JSON.parse(localStorage.getItem(this.obj.name))
						if(d.length>0){
							 this.load(d)
						}
					}
				
					
				}
			}
		}
		
	}
</script>

<style scoped="scoped">
	.del{
		position: absolute;
	}
	
</style>