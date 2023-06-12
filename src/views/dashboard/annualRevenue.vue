<template>
  <div class="revenue">
    <div ref="container"></div>
    <button @click="onClick">Update Data</button>
  </div>
</template>

<script setup>
import { onMounted, ref} from "vue";
import { Chart } from "@antv/g2";
import {getHomeInfo} from '@/api/dashboard'

let chart;
const container = ref(null);
// 收入明细

// let result = ref([])
onMounted(async() => {
  chart = renderBarChart(container.value);
})


// function onClick() {
//   updateBarChart(chart);
// }
// const result = ref([])

function renderBarChart(container) {
  const chart = new Chart({
    paddingLeft: 40,
    paddingBottom: 30,
    autoFit: true,
    container,
    theme: "classic",
  });

  // 声明可视化
  // chart.config({
  //   intervalWidthRatio: 0.8, // 设置柱子宽度为默认宽度的80%
  // })
  chart
    .interval() // 创建一个 Interval 标记
    .style('maxWidth', 12)
    .data({
      type: 'custom',
      callBack: async () => {
        const res = await getHomeInfo()
        console.log(res);
        const result = res.annualIncomeArray.xmonth.map((xmonth,index) => ({
          xmonth,
          title: '物业费',
          ybuilding: res.annualIncomeArray.ybuilding[index]
        }))
        const result1 = res.annualIncomeArray.xmonth.map((xmonth,index) => ({
          xmonth,
          title: '物业费',
          ybuilding: res.annualIncomeArray.ybuilding[index]
        }))
        console.log([...result,...result1])
        return [...result,...result1]
      }
    }) // 绑定数据
    .encode("x", "genre") // 编码 x 通道
    .encode("y", "sold") // 编码 y 通道
    .encode("y", "sold") // 编码 y 通道
    // .encode("key", "genre") // 指定 key
    .animate("updateDuration", 300) // 指定更新动画的时间
  chart.interaction('tooltip', {
    // render 回调方法返回一个innerHTML 或者 ReactNode
    render: (event, { title, items }) => (
      `<div class="tipe">
        <p>${title}</p>
        <p>总收入:${items[0].value}</p>
        <p>物业费:${items[0].value}</p>
        <p>行车收入:${items[0].value}</p>
       </div>`
    ),
  })

  // 渲染可视化
  chart.render();

  return chart;
}

// function updateBarChart(chart) {
//   // 获得 Interval Mark
//   const interval = chart.getNodesByType("interval")[0];

//   // 模拟并且更新 Interval 的数据
//   const newData = interval.data().map((d) => ({
//     ...d,
//     sold: Math.random() * 400 + 100,
//   }));

//   interval.data(newData);

//   // 重新渲染
//   chart.render();
// }
</script>
<style lang="less">
  .revenue {
    width: 100%;
    height: 100%;
    div {
      width: 100%;
      height: 100%;
      p {
        margin: 0 !important;
      }
    }
    button {
      display: none;
    }
    .interval  {
      width: 10px;
    }
    .g2-tooltip {
      width: auto !important;
      height: auto !important;
      line-height: 1.4 !important;
      padding: 10px !important;
      font-size: 14px !important;
      color: #1c1c1c !important;
    }
  }
</style>
