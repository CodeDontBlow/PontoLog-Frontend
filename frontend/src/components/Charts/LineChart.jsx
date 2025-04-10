import Chart from "react-apexcharts"
import React , {useState} from 'react'

const LineChart = ({period , values , dataName , chartTitle , colorPalette , group}) => {

    const [options] = useState(
        {
            colors: colorPalette,
            chart:{
                group: group,
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
                curve: "smooth",
                width: "3"
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
        />
    )
}

export default LineChart