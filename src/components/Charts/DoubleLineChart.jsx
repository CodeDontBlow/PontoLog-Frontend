import Chart from "react-apexcharts"
import React, { useState, useEffect} from 'react'

//GRÁFICO DE DUAS LINHAS
const DoubleLineChart = ({ period, values, dataName, chartDescription, colorPalette, legends = true }) => {

    let showLegends
    legends == "false" ? showLegends = false : showLegends = true

    //PROPS
    //period: Periodo de tempo (eixo x) [lista]
    //values: Valores (eixo y) [lista]
    //dataName: Nome dos dados (ex.: Valor Agregado, Balança Comercial, etc) [string]
    //colorPalette: Cores das linhas do gráfico [lista || string]
    //id: identificador do gráfico, usado para agrupamento
    //group: grupo que o gráfico pertence (gráficos do mesmo grupo são visualmente melhor relacionados)

    //Ex.: <DoubleLineChart values={[[10,-10,10,-10,-50] , [-10,10,-10,10,50]]} period={[2014,2015,2016,2017,2018]} dataName={["Brasil" , "SP"]} colorPalette="#ff0011" id="id" group="grupo"/>

    //Opções de customização do gráfico
    const [options] = useState(
        {
            colors: colorPalette,
            chart: {
                type: "line",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
                events: {
                    animationEnd: () => { window.dispatchEvent(new Event('resize')) },
                }
            },
            title: {
                text: { chartDescription },
                align: "left",
                style: {
                    fontSize: "1rem",
                    fontFamily: "roboto",
                    color: "var(--black-500)",
                }
            },
            yaxis: {
                labels: {
                    //Formatação para resumir os números
                    formatter: function (items){
                        if((Math.abs(items) / 10**9) >= 1 ){
                            return(items / 10**9) + "B"
                        }
                        else if((Math.abs(items) / 10**6) >= 1 ){
                            return(items / 10**6) + "M"
                        }
                        else if ((Math.abs(items) / 1000) >= 1){
                            return (items / 1000) + "k"
                        }
                        else{
                            return items
                        }
                    },
                },
            },
            xaxis: {
                categories: period
            },
            stroke: {
                curve: "smooth",
                width: "3"
            },
            markers: {
                size: 3,
                colors: colorPalette,
                strokeColors: "var(--white-300)",
                strokeWidth: 2,
            },
            legend: {
                show: showLegends,
                position: "bottom",
                horizontalAlign: "left",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "15px",
                offsetX: 0,
                markers: {
                    size: 8.5,
                    shape: "square",
                },
                labels: {
                    colors: colorPalette
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 7,
                },
            }
        }
    )

    //Valores do gráfico
    const [series, setSeries] = useState([
        {
            name: dataName[0],
            data: values[0],
        },
        {
            name: dataName[1],
            data: values[1],
        }
    ])

    useEffect(() => {
        setSeries([
            {
                name: dataName[0],
                data: values[0],
            },
            {
                name: dataName[1],
                data: values[1],
            }
        ])
    }, [values, dataName])

    //Componente de gráfico do ApexCharts recebendo os valores definidos acima
    return (
        <Chart
            options={options}
            series={series}
            type="line"
            height="100%"
        />
    )
}

export default DoubleLineChart