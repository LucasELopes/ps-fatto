'use client'

import { deadLineType } from "@/types/deadLine";
import dynamic from "next/dynamic";

type Props = {
  deadlines?: deadLineType
}

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const Charts = ({deadlines}: Props) => {

  const options = {
    chart: {
      id: 'donut',
    },
    labels: [ 'Tarefas perto do prazo', 'Tarefas dentro do prazo', 'Tarefas atrasadas']
  }
  
  if (deadlines) {
    const series = [deadlines.nearDeadLine, deadlines.onTime, deadlines.overdue] 
    return (
      <div>
        <Chart options={options} series={series} type="donut" height={400} width={450}/>
      </div>
    )
  }

  return (
    <div>
      <Chart options={options} series={[0, 0, 0]} type="donut" height={400} width={450}/>
    </div>
  )

}

export default Charts
