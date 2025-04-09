import Chart from "react-apexcharts"
import React , {useState} from 'react'

const LineChart = ({period , values , dataName , chartTitle , colorPalette}) => {

    const [options] = useState(
        {
            colors: colorPalette,
            chart:{
                id: "line-chart",
                type: "line",
                zoom : {
                    enabled: false
                }
            },
            title:{
                text: chartTitle
            },
            xaxis: {
                categories: period
            },
            stroke : {
                curve: "smooth"
            }
        }
    )

    //Para aplicação dinâmica
    const [series] = useState([
        {
            name: dataName[0],
            data: values[0]
        },
        values.length === 2 ? { name: dataName[1], data: values[1] } : false
    ])

    return(
        <Chart
            options = {options}
            series = {series}
            type = "line"
            width = "500"
        />
    )
}

export default LineChart