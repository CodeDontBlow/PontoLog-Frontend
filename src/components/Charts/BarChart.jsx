import styles from "./Charts.module.css"
import Chart from "react-apexcharts"
import { useState } from "react";

//GRÁFICO DE BARRA
function BarChart({items , values , chartTitle , colorPalette}){

    //PROPS
    //items: Itens que estão sendo exibidos (eixo y, ex.: nomes de vias) [lista]
    //values: Valores (eixo x) [lista]
    //colorPalette: Cores das linhas do gráfico [lista || string]

    //Ex.: <BarChart items={["Rodoviária" , "Aquífera" , "Aérea"]} values={[412,213,123]} Vias" colorPalette="#ff0011"/>

    //Opções de customização do gráfico
    const [options] = useState (
        {
            chart: {
                type: 'bar',
                height: "100%"
            },
            xaxis: {
                categories: items
            },
            yaxis: {
                show: false
            },
            title: {
                text: chartTitle,                
                style: {
                    fontSize: "16px",
                    fontWeight: "regular",
                    fontFamily: "'Roboto', sans-serif",
                    color: "var(--black-500)",
                }
            },
            colors: colorPalette,

            //Customização das barras
            plotOptions: {
                bar: {
                    barHeight: '100%',
                    horizontal: true,
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    dataLabels: {
                        position: "bottom",
                        hideOverflowingLabels: true,
                        maxItems: 3,
                    },
                }
            },
            stroke: {
                width: 1,
                colors: ["var(--white-700)"],
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                    colors: ["var(--white-500)"],
                },
                formatter: function (val, opt) {
                  return "\u00A0 \u00A0" + opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                },
            },
        }
    )

    //Valores do gráfico
    const [series] = useState([
        {
            name: "Ocorrências",
            data: values
        }
    ])

    //Componente de gráfico do ApexCharts recebendo os valores definidos acima
    return(
        <Chart
            options = {options}
            series = {series}
            type = "bar"
        />
    )
}

export default BarChart