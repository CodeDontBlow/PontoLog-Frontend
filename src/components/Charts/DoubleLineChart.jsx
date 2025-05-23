import Chart from "react-apexcharts"
import React , {useState} from 'react'

//GRÁFICO DE DUAS LINHAS
const DoubleLineChart = ({period , values , dataName, chartDescription , colorPalette}) => {

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
            chart:{
                type: "line",
                zoom : {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            title: {
                text: {chartDescription},
                align: "left",
                style: {
                    fontSize: "1rem",
                    fontFamily: "roboto",
                    color: "var(--black-500)",
                }
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

    //Valores do gráfico
    const [series] = useState([
        { 
            name:dataName[0], 
            data: values[0],
        },
        {
            name: dataName[1], 
            data: values[1],
        }
    ])

    //Componente de gráfico do ApexCharts recebendo os valores definidos acima
    return(
        <div className="componentWrapper">
            <Chart
                options = {options}
                series = {series}
                type = "line"
            />
        </div>
    )
}

export default DoubleLineChart