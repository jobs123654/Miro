/* 电磁辐射功率密度 
*p 电磁辐射功率
*g 天线辐射水平方向最大增益
*d 距离天线直线距离
* pdb 规定的功率密度限值
*/
let getPdb=(p,g,d)=>{
	let s=(100*p*g/(4*Math.PI*d*d))
	return s.toFixed(2)
};
let getDb=(p,pdb,g)=>{
	let s=Math.sqrt(100*p*g/(4*Math.PI*pdb))
	return s.toFixed(2)
}
export default {getDb}