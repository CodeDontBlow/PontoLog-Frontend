import Chart from "react-apexcharts"
import React , {useState} from 'react'

//GRÁFICO DE DUAS LINHAS
const DoubleLineChart = ({period , values , dataName , chartTitle , colorPalette}) => {

    //PROPS
    //period: Periodo de tempo (eixo x) [lista]
    //values: Valores (eixo y) [lista]
    //dataName: Nome dos dados (ex.: Valor Agregado, Balança Comercial, etc) [string]
    //chartTitle: Título do Gráfico [string]
    //colorPalette: Cores das linhas do gráfico [lista || string]
    //id: identificador do gráfico, usado para agrupamento
    //group: grupo que o gráfico pertence (gráficos do mesmo grupo são visualmente melhor relacionados)

    //Ex.: <DoubleLineChart values={[[10,-10,10,-10,-50] , [-10,10,-10,10,50]]} period={[2014,2015,2016,2017,2018]} dataName={["Brasil" , "SP"]} chartTitle="Comparação Valor Agregado" colorPalette="#ff0011" id="id" group="grupo"/>
    
    //Opções de customização do gráfico
    const [options] = useState(
        {
            colors: colorPalette,
            chart:{
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
        <Chart
            options = {options}
            series = {series}
            type = "line"
        />
    )
}

export default DoubleLineChart