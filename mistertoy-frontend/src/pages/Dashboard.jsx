import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Pie, Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

function getData(labelCounts) {
    return {
        labels: Object.keys(labelCounts),
        datasets: [
            {
                label: '# of Toys',
                data: Object.values(labelCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(128, 128, 128, 0.2)',
                    'rgba(0, 255, 128, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(128, 128, 128, 1)',
                    'rgba(0, 128, 0, 1)',
                ],
                borderWidth: 1,
                hoverOffset: 30,
            },
        ],
    }
}

export function Dashboard() {

    const toys = useSelector(state => state.x.toys)

    if (toys.length === 0) {
        return <div className='warning-dashboard'>No toys available yet,add some toys!!!</div>
    }

    const labelCountsMap = {}
    toys.forEach(toy => {
        labelCountsMap[toy.label] = (labelCountsMap[toy.label] || 0) + 1
    })

    const data = getData(labelCountsMap)

    return (
        <>
            <section className='dashboard'>
                <Pie data={data} />
                <Line data={data} />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, veritatis.</p>
            </section>
        </>
    )
}