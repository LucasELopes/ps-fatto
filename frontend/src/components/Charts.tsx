'use client'

import { deadLineType } from "@/types/deadLine";
import dynamic from "next/dynamic";

type Props = {
  deadlines: deadLineType
}

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const Charts = ({deadlines}: Props) => {

  const options = {
    chart: {
      id: 'donut',
    },
    labels: ['Tarefas dentro do prazo', 'Tarefas perto do prazo', 'Tarefas atrasadas']
  }
  
  const series = [deadlines.OnTime, deadlines.NearDeadLine, deadlines.Overdue] 

  return (
    <div>
      <Chart options={options} series={series} type="donut" height={400} width={450}/>
    </div>
  )

}

export default Charts
