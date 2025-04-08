import Chart from "react-apexcharts"
import React , {useState} from 'react'

function LineChart({period , values , dataName}) {
    const [options] = useState(
        {
            chart:{
                id: "line-chart",
                type: "line",
                zoom : {
                    enabled: false
                }
            },
            xaxis: {
                categories: period
            },
            stroke : {
                curve: "smooth",
                colors : "#D92B66"
            }
        }
    )

    const [series] = useState([
        {
            name: dataName,
            data: values
        }   
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