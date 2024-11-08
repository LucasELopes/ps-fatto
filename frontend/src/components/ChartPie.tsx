'use client'

import { costsToDosType } from "@/types/costsTodos";
import { deadLineType } from "@/types/deadLine";
import dynamic from "next/dynamic";

type Props = {
  deadlines?: deadLineType
  costTodos?: costsToDosType
  labels?: string[]
  color?: string[]
}

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const ChartPie = ({deadlines, costTodos, labels, color}: Props) => {

  const options = {
    chart: {
      id: 'donut',
    },
  }
  
  if (deadlines) {
    const series = [deadlines.onTime, deadlines.nearDeadLine, deadlines.overdue] 
    return (
      <div>
        <Chart 
          className="bg-gray-100 shadow-lg p-2 min-w-[450px] max-w-[520px] m-2 rounded-md"
          options={{...options, labels: labels, colors: color}} 
          series={series} 
          type="donut" 
          height={400} 
          width={450}
        />
      </div>
    )
  }
  else if(costTodos) {
    const series = [costTodos.below, costTodos.between, costTodos.above] 
    return (
      <div>
        <Chart 
          className="bg-gray-100 shadow-lg p-2 min-w-[450px] max-w-[520px] m-2 rounded-md"
          options={{...options, labels: labels, colors: color}} 
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
