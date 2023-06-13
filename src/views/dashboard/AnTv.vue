<template>
  <div class="containerBox">
    <div id="container" style="width: 100%;min-height: 384px;"></div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';
import { getHomeInfo } from '@/api/dashboard'
export default {
  mounted() {
    const chart = new Chart({
      container: 'container',
      theme: 'classic',
      autoFit: true,
    })
    chart
      .interval()
      .style('maxWidth', 18)
      .data({
        type: 'custom',
        callback: async () => {
          const res = await getHomeInfo()
          const result = res.annualIncomeArray.xmonth.map((xmonth, index) => ({
            xmonth,
            title: '物业费',
            ybuilding: res.annualIncomeArray.ybuilding[index]
          }))
          const result1 = res.annualIncomeArray.xmonth.map((xmonth, index) => ({
            xmonth,
            title: '行车收入',
            ybuilding: res.annualIncomeArray.yparking[index]
          }))
          return [...result, ...result1];
        }
      })
      .transform({ type: 'stackY' })
      .transform({ type: 'sortX' })
      .encode('x', 'xmonth')
      .encode('y', 'ybuilding')
      .encode('color', 'title')
      .style('fill', (datum) => {
        if (datum.title === '物业费') {
          return '#3656ff'
        }
        if (datum.title === '行车收入') {
          return '#cde4ff'
        }
      })
      .axis('x', {
        title: false,
        line: true,
        tick: true,
        labelSpacing: 4,
      })
      .tooltip({
        title: (d) => (`${d.xmonth}`), // 设置 title
        items: [
          'ybuilding', // 第一个 item
          'ybuilding', // 第二个 item
        ],
      })
      .legend('color', {
        layout: {
          justifyContent: 'flex-end'
        },
        style: {
          itemMarkerFill: (datum) => {
            if (datum.label === '物业费') {
              return '#3656ff'
            }
            if (datum.label === '行车收入') {
              return '#cde4ff'
            }
          }
        }
      })
      .axis('y', {
        title: false,
        labelFormatter: '~s'
      })

    chart.render();
  },
}
</script>
<style>
  .containerBox {
    min-height: 384px;
  }
</style>