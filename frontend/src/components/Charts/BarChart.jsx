import Chart from "react-apexcharts"
import { useState } from "react";

function BarChart({items , values}){
    const [options] = useState (
        {
            char: {
                id: "bar-chart",
                type: "bar"
            },
            fill: {
                colors : "#D92B66"
            },
            xaxis: {
                categories: items
            },
            plotOptions: {
                bar: {
                    borderRadius: 3,
                    borderRadiusApplication: "end",
                    horizontal: true,
                    dataLabels : {
                        position: "top",
                    }
                }
            }
        }
    )

    const [series] = useState([
        {
            data: values
        }
    ])

    return(
        <Chart
            options = {options}
            series = {series}
            type = "bar"
            width = "500"
        />
    )
}

export default BarChart