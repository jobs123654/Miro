<template>
  <nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <a class="navbar-brand" href="#"><Icon type="ios-color-palette" size='26' /></a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li :class="item.active" :key="i" @click="click(item)" v-for="(item,i) in items">
           <a href="#">{{item.name}}</a>
        </li>
		<li >
			<DropDownMenu style='margin: 15% 20%;width: 100px;'  :obj="obj.dropdown"/>
		</li>
		
      </ul>
	  <a href="#" class="btn" @click="logout" style="cursor: pointer; position: absolute;right: 3%;top:15%" >退出</a>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>

<script>
import bus from '../../../config/Event.js'
import {mapState,mapMutations} from 'vuex'
import DropDownMenu from './menu/DropDownMenu'
export default {
  name: 'Navigation',
  components:{
	DropDownMenu  
  },
  props:{
      obj:Object
  },
  data(){
      return{
       title:this.obj.title,
       items:this.obj.items
      }
  },
  methods:{
     ...mapMutations([
        'showMap','showData','setImport','setResult'
     ]),
      click(item){
		 if(item.name.indexOf('绘制')>-1){
			 let d=JSON.parse(localStorage.getItem('rad'))
			 if(d&&d.length>0){
				 let y=d.map(e=>e.yid);
				 y=[...new Set(y)]
				 y=y.sort((a,b)=>b-a)
				 y=y.map(e=>{
					 return{
						 name:e,
						 checked:false,
						 num:d.filter(e1=>e1.yid==e)
					 }
				 })
				 bus.$emit(item.event,y)
			 }
		 }else{
			 bus.$emit(item.event)
		 }
	  	
		
        if(item.name.indexOf('数据')>-1||item.name.indexOf('用户')>-1){
           this.showData()
        }else{
           this.showMap()
        }
        item.active='active'
        this.items.forEach(e=>{
            if(item.name!==e.name){e.active=''}
        });
  //       let nv={
  //           showIcon:this.obj.showIcon,
  //           items:item.children
  //       }
		// if(item.name.indexOf('地图')>-1){
		// 	bus.$emit('dc')
		// }else{
		// 	bus.$emit('rmDc')
		// }
		// if(item.name.indexOf('单点')>-1){
		// 	bus.$emit('showComputed')
		// }
		// if(item.name.indexOf('预测')>-1){
			
		// }
        // this.$store.commit('setSecondMenu',nv)
	   
	
      
      },
	  logout(){
		   localStorage.removeItem('u')
		   this.$router.push({path:'/login'});
		    
	  }
  },
  computed:{
	  user(){
	  		 return JSON.parse(localStorage.getItem('u'))
	  }
  }
}
</script>

<style>

</style>