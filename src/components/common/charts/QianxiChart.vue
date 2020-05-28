<template>
	<div id="qianxi">
		
	</div>
</template>

<script>
	// import bus from '../../../config/Event.js'
	export default{
		created() {
			
		},
		mounted() {
			this.qianXi()
		},
		methods:{
			//迁徙图
			qianXi(){
					  var mapBoxEchart = this.$echarts.init(this.$el);
					        var geoCoordMap = { //可以在地图上显示的城市的坐标信息
					            '成都': [103.9526, 30.7617],
					            '拉萨': [91.1865, 30.1465],
					            '天津': [117.4219, 39.4189],
					            '合肥': [117.29, 32.0581],
					            
					        };
					        var HFData = [ // 数据中name的城市名称必须与geoCoordMap中城市名称一致, 不然关联不上，合肥到各地区的线路
					            [{name: '合肥'}, {name: '成都',value: 66}],
					            [{name: '合肥'}, {name: '拉萨',value: 66}],
					            [{name: '合肥'}, {name: '天津',value: 66}],
					        ];
					        var planePath = 'arrow'; // 箭头的svg
					        // push进去线路开始-结束地点-经纬度
					        var convertData = function(data) {
					            var res = [];
					            for (var i = 0; i < data.length; i++) {
					                var dataItem = data[i];
					                var fromCoord = geoCoordMap[dataItem[0].name];
					                var toCoord = geoCoordMap[dataItem[1].name];
					                if (fromCoord && toCoord) {
					                    res.push([{
					                        coord: fromCoord
					                    }, {
					                        coord: toCoord
					                    }]);
					                }
					            }
					            return res;
					        };
					        var color = ['#fff', '#FFFFA8', '#46bee9']; //圆圈和字的颜色，线的颜色，箭头颜色
					        // 数据
							let echarts=this.$echarts;
					        var series = [];
					        // 遍历由合肥到其他城市的线路
					        [
					            ['合肥', HFData]
					        ].forEach(function(item, i) {
					            // 配置
					            series.push({
					                // 系列名称，用于tooltip的显示
					                name: item[0],
					                type: 'lines',
					                zlevel: 1, // 用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中
					                // effect出发到目的地 的白色尾巴线条
					                // 线特效的配置
					                effect: {
					                    show: true,
					                    period: 6, // 特效动画的时间，单位为 s
					                    trailLength: 0.1, // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
					                    color: '#46bee9', // 移动箭头颜色
					                    symbol: planePath,
					                    symbolSize: 6 // 特效标记的大小
					                },
					                // lineStyle出发到目的地 的线条颜色
					                lineStyle: {
					                    normal: {
					                        color: color[i],
					                        width: 0,
					                        curveness: 0.2 //幅度
					                    }
					                },
					                data: convertData(item[1]) //开始到结束数据
					            }, {
					                //出发地信息
					                name: item[0],
					                type: 'lines',
					                zlevel: 2,
					                effect: {
					                    show: true,
					                    period: 6,
					                    trailLength: 0,
					                    symbol: planePath,
					                    symbolSize: 6
					                },
					                lineStyle: {
					                    normal: {
					                        color: new  echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                            offset: 0,
					                            color: '#FFFFA8' // 出发
					                        }, {
					                            offset: 1,
					                            color: '#58B3CC ' // 结束 颜色
					                        }], false),
					                        width: 1.5,
					                        opacity: 0.4,
					                        curveness: 0.2
					                    }
					                },
					                data: convertData(item[1])
					            }, {
					                // 目的地信息
					                name: item[0],
					                type: 'effectScatter',
					                coordinateSystem: 'geo',
					                zlevel: 2,
					                rippleEffect: {
					                    brushType: 'stroke'
					                },
					                label: {
					                    normal: {
					                        show: true,
					                        position: 'right',
					                        formatter: '{b}'
					                    }
					                },
					                symbolSize: function(val) {
					                    return val[2] / 8;
					                },
					                itemStyle: {
					                    normal: {
					                        color: color[i]
					                    }
					                },
					                data: item[1].map(function(dataItem) {
					                    return {
					                        name: dataItem[1].name,
					                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
					                    };
					                })
					            });
					        });
					 
					        // 指定相关的配置项和数据
					        var mapBoxOption = {
					            geo: {
					                map: 'china',
					                roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
					                aspectScale: 0.75,
					                zoom: 1.20,
					                label: {
					                    normal: {
					                        show: false,
					                        textStyle: {
					                            color: '#00a0c9'
					                        }
					                    },
					                    emphasis: { // 对应的鼠标悬浮效果
					                        show: false,
					                        textStyle: {
					                            color: "#00a0c9"
					                        }
					                    }
					                },
					                itemStyle: {
					                    normal: {
					                        areaColor: 'rgba(0, 0, 0, 0.5)',
					                        borderColor: '#0066ba'
					                    },
					                    emphasis: {
					                        borderWidth: 0,
					                        borderColor: '#0066ba',
					                        areaColor: "rgba(0, 0, 0, 0.5)",
					                        shadowColor: 'rgba(0, 0, 0, 0.5)'
					                    }
					                }
					            },
					            series: series
					        };
					        // 使用制定的配置项和数据显示图表
					        mapBoxEchart.setOption(mapBoxOption); 
			},
			
		}
	}
</script>
<style scoped="scoped">
	div{
		width: 100%;
		height: 500px;
		/* border: 1px solid  red; */
	}
</style>
