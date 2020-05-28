<template>
	<div class="panel panel-default" v-if='form'>
	  <div class="panel-heading" >{{form.title}}</div>
	  <form class="panel-body" id="form" style="padding-left: -4%;">
	    <ul style="margin-right: 9%;">
	      <li  style="margin-top: 2%;text-align: left;" v-for='(c,i) in form.content' :key='i'>
			<span v-if="c&&c.item">
				<select class="form-control" :name="c.name" required="required">
					<option >选择{{c.name}}</option>
					<option v-for="j in c.item" :value="j">{{j}}</option>
				</select>
			</span>
			
			<span class="form-inline form-group" v-else>
			   <label for="exampleInputName2">{{c.name}}</label>
				<input  type="text" :name="c.name" class="form-control":placeholder="c.name" required="required">
			</span>
			<input type="hidden" name="ID">
	      </li>
	    </ul>
		<div class="btn-group">
			<button class="btn" @click="confirm" type="submit" onclick='return false;'>确定</button>
			<button class="btn" @click="close" type='button' >取消</button>
		</div>
	  </form>
	</div>
</template>

<script>
	import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
	export default{
		name:'FormPanel',
		computed:{
			...mapState({
				form:'formObj',
				data:'dataObj',
				users:'users',
				key:'key',
			})
		},
	    
		methods:{
			...mapMutations([
				'setForm','putUsers','setDataObj','editUsers','editDataItem','editDataItem1','pushData'
			]),
			confirm(){
				let fs=document.getElementById('form'),s={}
				
				if(fs.length>0){
					let input=fs.getElementsByTagName('input'),
					select=fs.getElementsByTagName('select')
					for (let i in input) {
						let k=input[i].name,v=input[i].value
						if (v&&v.indexOf('undefined')<0) {
							s[k]=v
						}
					}
					for (let i in select) {
						let k=select[i].name,v=select[i].value
						if (v&&v.indexOf('undefined')<0) {
							s[k]=v
						}
					}
					
					if(this.data!=null){
						//编辑
						s['ID']=this.data.ID;
						if(this.data.账号){
						 this.editUsers(s)	
						}
						if(this.data['时间(世界时)']){
						 this.editDataItem(s)
						}if(this.data.监测值){
						  this.editDataItem1(s)
						}
					}else{
						//新增
						 if(s.账号){
							this.putUsers(s)
						 }else{
							 this.pushData(s)
						 }
						 
					}
					// console.log(this.$store.state.users)
				}
				
				 this.close()
			},
			close(){
				this.setForm(null)
				this.setDataObj(null)
			},
		},
		created(){
			
		},
		watch:{
			data(o,n){
				 
				if(n==null||o!=null){
					
				 let f=document.getElementById('form')
			
					 for (let i = 0; i < f.elements.length; i++) {
					 	let t=f.elements[i].type
						if(t==='text'||t==='password'){
						    f.elements[i].value=o[f.elements[i].name]
						}
						if (t.indexOf('select')>-1) {
							let select= f.elements[i]
							for (let  j = 0; j <select.options.length; j++){  
							        if (select.options[j].value == o[select.name]){  
							            select.options[j].selected = true;  
							            break;  
							        }  
							    } 
						}
						
					 }
				}
				// alert(n==null)
				
				
			}
		}
		
	}
</script>

<style>
</style>
