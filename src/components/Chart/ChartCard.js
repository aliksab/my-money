import React from 'react'
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

function Chartsed({ children, title }) {
  return (
    <div className="min-w-0 w-4/5 p-4 bg-white rounded-lg text-center shadow-xs dark:bg-gray-800">
      <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">{title}</p>
      {children}
    </div>
  )
}

export default Chartsed
