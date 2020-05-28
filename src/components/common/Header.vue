<template>
	<header>
		<h2>{{obj.title}}</h2>
	</header>
</template>

<script>
	export default{
		props:{
			obj:Object
		},
		
	}
</script>

<style scoped="scoped">
	header{
		font-family:"courier new";
		text-align: center;
		background: url(../../assets/bg.png) no-repeat;
		padding: 1% 0;
		color: white;
	}
</style>
