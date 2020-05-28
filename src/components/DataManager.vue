<template>
<div class="panel panel-default">
   <div class="panel-body">
     <ul class="nav nav-tabs">
        <li role="presentation" :class="item.active" :key="i" @click="click(item)" v-for="(item,i) in obj">
          <a href="#">{{item.name}}</a>
        </li>
     </ul>
	  <!-- <button class="btn backMap btn-primary"  @click='back'>返回地图</button> -->
	   <Radiant class='d' v-show='rVisible'/>
	  
   </div>
</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Measure from './measure/Measure'
import Radiant from './radiant/Radiant'

import User from './user/User'
export default {
 name:'DataManager',
 components:{
	Measure ,Radiant,User
 },
 props:{
	 obj:Array
 },
 data(){
	return{
		rVisible:false,
		mVisible:true,
		uVisible:false,
	} 
 },
 methods:{
	 ...mapMutations([
	    'showMap','showData'
	 ]),
	 back(){
		// 97580389
		 this.showMap()
	 },
	 click(item){
	 	 item.active='active'
	 	 this.obj.forEach(e=>{
	 	     if(item.name!==e.name){e.active=''}
	 	 });
		 
	 	 if(item.name.indexOf('台风')>-1){
	 		 this.rVisible=true
	 		 this.mVisible=false
	 	     this.uVisible=false
		 }else if(item.name.indexOf('雨')>-1){
	 		 this.rVisible=false
	 		 this.mVisible=true
			 this.uVisible=false
	    }else{
			 this.rVisible=false
			 this.mVisible=false
			 this.uVisible=true
		 }
	 }
 }
 
}
</script>

<style scoped>
	
	.d{
		position: absolute;
	}
	.backMap{
		position: absolute;
		top: 2%;
		right: 3%;
	}

</style>