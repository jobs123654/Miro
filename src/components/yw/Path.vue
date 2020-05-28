<template>
	<div class="panel panel-default" v-show="visible">
		<div class="panel-heading">
			台风记录<span style="cursor: pointer;float: right;" @click="close">&times;</span>
		</div>
		<div class="panel-body">
			<ul class="list-group"  style='margin-top: 2%;'>
				<!-- ios-radio-outline -->
			  <li class="list-group-item"  v-for="i in obj.items"> 
				  <a href="#" style='color: #2C3E50;' @click='click(i)' ><Checkbox v-model="i.checked"></Checkbox>{{i.name}}年</span></a>&nbsp;&nbsp;&nbsp;<span style="float: right;">记录:{{i.num.length}}条</span>
			  </li>
			 
			</ul>
			<span>月份</span>
			 <Select v-model="month" style="width:200px">
			        <Option v-for="(item,i) in months" :value="item.value"  :key='i' >{{ item.label }}</Option>
			    </Select>
			<div style="height: 350px; overflow: auto;">
				<Table border :columns="column" :data="data"></Table>
			</div>
		</div>
</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {Input,Checkbox,Select} from 'view-design'
	import { Table } from 'view-design';
	import bus from '../../../config/Event.js'
	export default{
		name:'Path',
		components:{
			
		},
		props:{
			
		},
		data:()=>{
			return{
				visible:false,
				obj:{items:[]},
				column:[{
					title:'时间',
					key:'时间',
					width:150,
				},
				{
					title:'风速',
					key:'风速',
					width:70,
				},
				{
					title:'等级',
					key:'等级',
					width:70,
				},
				{
					title:'方向',
					key:'移动方向',
					width:70,
				},
				
				 ],
				data:[],
				months:[],
				month:[],
				item:{},
				size:6,
			}
		},
		created() {
			bus.$on('showPath',e=>{
				this.obj.items=e;
				this.show()
			})
			bus.$on('resetCheck',e=>{
				this.obj.items.forEach(e=>{
					if (e.checked) {
						e.checked=false
					}
				})
			})
			
			
		},
		methods:{
			...mapMutations([
				'pushData','editDataItem'
			]),
			getTime(t){
			 return t.substr(0,4)+'/'+t.substr(4,2)+'/'+t.substr(6,2)+' '+t.substr(8,2)
			},
			show(){
				this.visible=true
			},
			close(){
				this.visible=false
			},
			click(i){
				i.checked=!i.checked
				if(i.checked){
					this.item=i;
					let list=i.num
					let m=i.num.map(e=>{
						return{
							value:(e['时间(世界时)']).substr(4,2),
							label:(e['时间(世界时)']).substr(4,2)
						}
					})
					this.months=[...new Set(m)]
					
					if(list.length>0){
						list.forEach(e=>{
							let item={
								'时间':this.getTime(e['时间(世界时)']),
								'风速':e['2min平均风速(ms-1)'],
								'等级':e['强度'],
								'移动方向':'西北',
							}
							this.data.push(item)
						})
					}
					
				}
			},
		},
		computed:{
			
		},
		watch:{
			month:{
				handler(o,n){
					let l=this.item.num.filter(e=>(e['时间(世界时)']).substr(4,2)===this.month)
					
					bus.$emit('path',{num:l})
				}
			}
		}
	}
</script>

<style scoped="scoped">
</style>
