import Chart from "react-apexcharts"
import React , {useState , useEffect} from 'react'

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

    useEffect(() => {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        },100);
    }, []);

    //Opções de customização do gráfico
    const [options] = useState(
        {
            colors: colorPalette,
            chart:{
                id: id,
                group: group,
                type: "line",
                animations: {
                    enabled: true,
                    speed: 500,
                },
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
                },
                padding: { left: 15 , right: 0, top: 0, bottom: 0 },
            },
            stroke : {
                curve: "smooth",
                width: "3",
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
        <div className="componentWrapper">
            <Chart
                options = {options}
                series = {series}
                width="100%"
                height="100%"
                type = "line"
            />
        </div>
    )
}

export default LineChart