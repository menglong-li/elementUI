<template>
    <div class="home">
        <el-row :gutter="20" class="home_li">
            <el-col :span="6" :xs="12">
                <div>
                    <div><i class="el-icon-user-solid"></i></div>
                    <div>
                        <div>会员量</div>
                        <span>321</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" :xs="12">
                <div>
                    <div><i class="el-icon-s-goods"></i></div>
                    <div>
                        <div>今日订单</div>
                        <span>321</span>
                    </div>
                </div>

            </el-col>
            <el-col :span="6" :xs="12">
                <div>
                    <div><i class="el-icon-star-on"></i></div>
                    <div>
                        <div>空置</div>
                        <span>321</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" :xs="12">
                <div>
                    <div><i class="el-icon-s-opportunity"></i></div>
                    <div>
                        <div>空置</div>
                        <span>321</span>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div id="myChart" :style="{width: '100%', height: '300px',marginTop:'20px'}"></div>
    </div>

</template>

<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {

            }
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '' },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: ["一月", "二月", "三月", "四月", "五月", "六月","七月","八月","九月","十月","十一月","十二月"]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 20,23,32,11,43,55,99,101]
                    }]
                });
            }
        }
    }
</script>

<style scoped>
    .home_li .el-col>div:nth-child(1) {
        display: flex;
        padding: 15px;
    }

    .home_li .el-col>div:nth-child(1)>div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .home_li .el-col>div:nth-child(1)>div:first-child i {
        align-items: center;
        font-size: 50px;
    }

    .home_li .el-col>div:nth-child(1)>div:last-child {
        flex: 1;
        text-align: right;
    }

    .home_li .el-col>div:nth-child(1)>div:last-child div {
        font-size: 16px;
    }

    .home_li .el-col>div:nth-child(1)>div:last-child span {
        font-size: 20px;
        font-weight: bold;
    }

    .el-col:nth-child(1)>div {
        background: #40c9c6;
        color: #ffffff;
    }

    .el-col:nth-child(2)>div {
        background: #36a3f7;
        color: #ffffff;
    }

    .el-col:nth-child(3)>div {
        background: #f4516c;
        color: #ffffff;
    }

    .el-col:nth-child(4)>div {
        background: #FFBC11;
        color: #ffffff;
    }
</style>