<template>
<div class="container" >
	<h2 style="margin-top: 10%;color: #FFF0F6;">{{title}}</h2>
<form class="col-md-4" id="login">
  <div class="form-group">
    <input type="text" class="form-control" v-model="name" placeholder="账号">
  </div>
  <div class="form-group">
    <input type="password" class="form-control" v-model="pwd"  placeholder="密码">
  </div>
  <div class="form-group">
    <span class="bg-danger" v-if="msg">{{msg}}</span>
  </div>
  <button type="button"  style="width: 30%;"  @click="submit" class="btn btn-default">ENTER</button>
</form>
  </div>

</template>

<script>
import {ui} from '../../config/ui.js'
import {mapState,mapMutations} from 'vuex'
export default {
 name:'Login',
 data(){
	return{
	title:ui.title,
	 name:'',
	 pwd:'',
	 msg:null
	}
 },
 created() {
 	let data=this.users
	if(data&&data.length>0){
		localStorage.setItem('users',JSON.stringify(data))
	}
 },
 methods:{
     submit(){
		 let {name,pwd}=this;
		 if(name!==''&&pwd!==''){
			 let users=this.list
			 if(users.length>0){
				 users.forEach(e=>{
					 if(e.账号===name&&e.密码===pwd){
						 this.$router.push({path:'/index'});
						 e.登录=true
						 localStorage.setItem('u',JSON.stringify(e))
						 this.msg=null 
					 }
				 })
			 }
		 }else{
			 this.msg="账号或密码错误!"
		 }
       }
 },
 computed:{
	 ...mapState({
		 'users':'users'
	 }),
	 list(){
		 return JSON.parse(localStorage.getItem('users'))
	 }
 }
}
</script>

<style scoped>
.container{
    text-align: center;
	
}
#login{
	margin: 10% 35%;
}
</style>