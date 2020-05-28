<template>
	<Collapse accordion >
	        <Panel  v-for='(i,index) in items' :key='index' >
	           <span style='text-align: center;'> {{i.name}}</span>
	            <a class="btn" href="#" @click="click(j)" slot="content" v-for='(j) in i.children'  >
					{{j.name}}
				</a>
	        </Panel>
	    </Collapse>
</template>

<script>
	import bus from '../../../config/Event.js'
	import {Collapse} from 'view-design';
	export default{
		name:'MyCollapse',
		props:{
		   obj:Object
		},
		data(){
		    return{
		     // title:this.obj.title,
		     items:this.obj.items
		    }
		},
		methods:{
			click(i){
					bus.$emit('nav',i)
			}
		},
		
	}
</script>

<style>
</style>
