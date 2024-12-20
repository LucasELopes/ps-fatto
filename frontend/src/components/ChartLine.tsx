'use client'

import { costsToDosMonthType } from "@/types/costsTodosMonth";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

function getMonthName(monthNumber: number) {
  const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  return monthNames[monthNumber - 1] || "Mês inválido";
}

type Props = {
  costsTodos: costsToDosMonthType[] | costsToDosMonthType | null
}

const ChartLine = ({costsTodos}: Props) => {

  if(costsTodos && !Array.isArray(costsTodos)) {
    costsTodos = [costsTodos]
  }

  const options = {
    chart: {
      id: 'line',
      zoom: {
        enabled: false
      }
    },

    labels: costsTodos?.map((e) => (
      getMonthName(e.month)
    )),

    title: {
      text: 'Quantidade de tarefas com data de entrega por mês no ano atual.'
    },


    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
  }
  
  if (costsTodos) {
    const series = [{
      serie: costsTodos.map((e) => e.month),
      data: costsTodos.map((e) => e.count)
    }] 
    return (
        <Chart 
          className="bg-gray-100 shadow-lg p-2 min-w-[500px] max-w-[640px] m-2 rounded-md" 
          options={options} 
          series={series} 
          type="line" 
          height={400} 
          width={620}
        />
    )
  }

  return (
    <div className="text-center text-red-500">
      Não foi possível carregar o gráfico de linhas
    </div>
  )
}

export default ChartLine
