import Chart from "react-apexcharts"
import { useState } from "react";

//GRÁFICO DE BARRA
function BarChart({items , values , chartTitle , colorPalette}){

    //PROPS
    //items: Itens que estão sendo exibidos (eixo y, ex.: nomes de vias) [lista]
    //values: Valores (eixo x) [lista]
    //chartTitle: Título do Gráfico [string]
    //colorPalette: Cores das linhas do gráfico [lista || string]

    //Ex.: <BarChart items={["Rodoviária" , "Aquífera" , "Aérea"]} values={[412,213,123]} chartTitle="Principais Vias" colorPalette="#ff0011"/>

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
            title : {
                text: chartTitle,
            },
            colors: colorPalette,

            //Customização das barras
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