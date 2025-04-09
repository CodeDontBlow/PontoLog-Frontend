import Chart from "react-apexcharts"
import { useState } from "react";

function BarChart({items , values , chartTitle , colorPalette}){
    const [options] = useState (
        {
            colors: colorPalette,
            chart: {
                id: "bar-chart",
                type: "bar",
                height: "100px"
            },
            title: {
                text: chartTitle
            },
            xaxis: {
                categories: items
            },
            plotOptions: {
                bar: {
                    barHeight: "50%",
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
            name: "Ocorrências",
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