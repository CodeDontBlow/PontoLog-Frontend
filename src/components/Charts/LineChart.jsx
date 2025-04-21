import Chart from "react-apexcharts"
import React , {useState} from 'react'

//GRÁFICO DE LINHA
const LineChart = ({period , values , dataName , chartTitle , colorPalette , id , group}) => {

    //PROPS
    //period: Periodo de tempo (eixo x) [lista]
    //values: Valores (eixo y) [lista]
    //dataName: Nome dos dados (ex.: Valor Agregado, Balança Comercial, etc) [string]
    //colorPalette: Cores das linhas do gráfico [lista || string]
    //id: identificador do gráfico, usado para agrupamento
    //group: grupo que o gráfico pertence (gráficos do mesmo grupo são visualmente melhor relacionados)

    //Ex.: <LineChart values={[20,10,20,10,-10]} period={[2014,2015,2016,2017,2018]} dataName={"Valor Agregado"} colorPalette="#ff0011" id="id" group="grupo"/>

    //Opções de customização do gráfico
    const [options] = useState(
        {
            colors: colorPalette,
            chart:{
                id: id,
                group: group,
                type: "line",
                width: "100%",
                height: "100%",
                zoom : {
                    enabled: false
                }
            },
            xaxis: {
                categories: period
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
            grid: {
                show: true,
                borderColor: "var(--white-700)",
                row: {
                    colors: ["#ffffff25" , "transparent"]
                }
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
            name:dataName, 
            data: values,
        },
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

export default LineChart