import React from 'react';
import ReactApexChart from 'react-apexcharts'; //npm install react-apexcharts apexcharts
import br from 'apexcharts/dist/locales/pt-br.json';

export default function Grafico(props) {
  const options = {
    colors: ['#00BFFF', '#DC143C'],
    chart: {
      type: 'line',
      locales: [br],
      defaultLocale: 'pt-br',
      zoom: {
        enabled: false
      },
      animations: {
        enabled: false
      }
    },
    stroke: {
      width: [5, 5],
      curve: 'straight'
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      marker: {
        show: true, //pode retirar pq o default é true
      }
    },
    title: {
      text: `Período ${props.startDate} a ${props.endDate}`
    },
    xaxis: {
      type: 'datetime'
    },
    noData: {
      text: 'Sem lançamentos no período selecionado',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: undefined
      }
    }
  };
  
  return <ReactApexChart options={options} series={props.series} height={350} />
}

