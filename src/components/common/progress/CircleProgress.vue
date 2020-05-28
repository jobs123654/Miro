<template>
		<div class="panel panel-default">
			<i-circle v-if='progressValue' :percent="progressValue">
			    <span class="demo-Circle-inner" style="font-size:24px">{{progressValue}}%</span>
			</i-circle>
		</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {Circle} from 'view-design';
	export default{
		name:'CircleProgress',
		mounted() {
		
		},
	      computed:{
			...mapState({
				'progressValue':'progressValue'
			})
		}
	}
</script>

<style>
</style>
