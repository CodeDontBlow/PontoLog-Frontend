import Chart from "react-apexcharts"
import React , {useState , useEffect} from 'react'

//GRÁFICO DE LINHA
const LineChart = ({period , values , dataName , chartDescription , colorPalette , id , group}) => {

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
                zoom : {
                    enabled: false,
                },
                toolbar : {
                    show: false,
                },
                events: {
                    animationEnd: () => {window.dispatchEvent(new Event('resize'))},
                }
            },
            xaxis: {
                categories: period
            },
            title: {
                text: chartDescription,                
                style: {
                    fontSize: "1rem",
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
                },
                padding: { left: 15 , right: 0, top: 0, bottom: 0 },
            },
            stroke : {
                curve: "smooth",
                width: "3",
            },
            markers: {
                size: 3,
                colors: colorPalette,
                strokeColors: "var(--white-300)",
                strokeWidth: 2,
            }
        }
    )

    //Valores do gráfico
    const [series, setSeries] = useState([
        { 
            name:dataName, 
            data: values,
        },
    ])

    useEffect(() => {
        setSeries([
            { 
                name:dataName, 
                data: values,
            },
        ])
    }, [values])

    //Componente de gráfico do ApexCharts recebendo os valores definidos acima
    return(
        <Chart
            options = {options}
            series = {series}
            width="100%"
            height="100%"
            type = "line"
        />
    )
}

export default LineChart