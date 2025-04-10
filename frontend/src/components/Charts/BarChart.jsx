import Chart from "react-apexcharts"
import { useState } from "react";

function BarChart({items , values , chartTitle , colorPalette}){
    const [options] = useState (
        {
            chart: {
                type: 'bar',
                height: "100%"
            },
            xaxis: {
                categories: items
            },
            title : {
                text: chartTitle,
            },
            colors: colorPalette,
            plotOptions: {
                bar: {
                    barHeight: '90%',
                    horizontal: true,
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                textAnchor: 'end'
            },
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
        />
    )
}

export default BarChart