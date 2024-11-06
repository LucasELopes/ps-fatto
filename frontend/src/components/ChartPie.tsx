'use client'

import { deadLineType } from "@/types/deadLine";
import dynamic from "next/dynamic";

type Props = {
  deadlines?: deadLineType
}

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const ChartPie = ({deadlines}: Props) => {

  const options = {
    chart: {
      id: 'donut',
    },
    labels: [ 'Tarefas dentro do prazo', 'Tarefas perto do prazo', 'Tarefas atrasadas'],
    colors: [ '#54d754', '#e5e552', '#d75a54']
  }
  
  if (deadlines) {
    const series = [deadlines.onTime, deadlines.nearDeadLine, deadlines.overdue] 
    return (
      <div>
        <Chart 
          className="bg-gray-100 shadow-lg p-2 min-w-[450px] max-w-[520px] m-2 rounded-md"
          options={options} 
          series={series} 
          type="donut" 
          height={400} 
          width={450}
        />
      </div>
    )
  }

  return (
    <div>
      <Chart options={options} series={[0, 0, 0]} type="donut" height={400} width={450}/>
    </div>
  )

}

export default ChartPie
