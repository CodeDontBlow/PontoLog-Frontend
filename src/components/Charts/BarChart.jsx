import Chart from "react-apexcharts"
import { useEffect, useState } from "react";

//GRÁFICO DE BARRA
function BarChart({ items, values, chartDescription, colorPalette , isQuarter = false }) {


    //PROPS
    //items: Itens que estão sendo exibidos (eixo y, ex.: nomes de vias) [lista]
    //values: Valores (eixo x) [lista]
    //colorPalette: Cores das linhas do gráfico [lista || string]

    //Ex.: <BarChart items={["Rodoviária" , "Aquífera" , "Aérea"]} values={[412,213,123]} Vias" colorPalette="#ff0011"/>

    //Opções de customização do gráfico
    const [options, setOptions] = useState(
        {
            chart: {
                type: 'bar',
                width: "100%",
                height: '300px',
                toolbar: {
                    show: false
                },
                events: {
                    animationEnd: () => {window.dispatchEvent(new Event('resize'))},
                }

            },
            xaxis: {
                categories: items,
            },
            yaxis: {
                show: false,
            },
            title: {
                text: chartDescription,
                style: {
                    fontSize: "1rem",
                    fontWeight: "regular",
                    fontFamily: "'Roboto', sans-serif",
                    color: "var(--black-500)",
                },
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
                    fontSize: "14px",
                    colors: ["var(--white-500)"],
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                },
                formatter: function (val, opt) {
                    return "\u00A0 \u00A0" + opt.w.globals.labels[opt.dataPointIndex]
                },
            },
        }
    )

    isQuarter && (
        options["responsive"] =
        [
            {
            breakpoint: 5000,
            options: {
                chart: {
                    width: "100%"
                }
            }},

            // Telas com menos de 1300px
            {
            breakpoint: 1300,
            options: {
                chart : {
                    width: "250px",
                },
                dataLabels: {
                    style: {
                        fontSize: "12px",
                    },
                },
            }},
            
            // Telas com menos de 1250px
            {
            breakpoint: 1250,
            options : {
                chart: {
                    width: "230px"
                },
            }},
            
            // Telas com menos de 1200px
            {
            breakpoint: 1200,
            options : {
                chart: {
                    width: "225px"
                },
                dataLabels: {
                    style: {
                        fontSize: "11px",
                    },
                },
            }},
            
            // Telas com menos de 1155px
            {
            breakpoint: 1155,
            options : {
                chart: {
                    width: "220px"
                }
            }},
            
            // Telas com menos de 1135px
            {
            breakpoint: 1135,
            options : {
                chart: {
                    width: "215px"
                },
                dataLabels: {
                    style: {
                        fontSize: "10px",
                    },
                },
            }},
            
            // Telas com menos de 1115px
            {
            breakpoint: 1115,
            options : {
                chart: {
                    width: "205px"
                }
            }},
            
            // Telas com menos de 1075px
            {
            breakpoint: 1075,
            options : {
                chart: {
                    width: "200px"
                }
            }},
            
            // Telas com menos de 1065px
            {
            breakpoint: 1065,
            options : {
                chart: {
                    width: "195px",
                    height: "150px" // Altura também ajustada para manter o gráfico proporcional
                }, 
            }},
            
            // Telas com menos de 1045px
            {
            breakpoint: 1045,
            options : {
                chart: {
                    width: "190px"
                },
                dataLabels: {
                    style: {
                        fontSize: "9px", // Reduz ainda mais a fonte para evitar sobreposição
                    },
                },
            }},
            
            // Telas com menos de 1020px
            {
            breakpoint: 1020,
            options : {
                chart: {
                    width: "185px",
                    height: "140px" // Continua adaptando a altura
                }
            }},
            
            // Telas com menos de 1000px
            {
            breakpoint: 1000,
            options : {
                chart: {
                    width: "180px",
                    height: "135px",
                },
                dataLabels: {
                    style: {
                        fontSize: "8px", // Fonte mínima para manter legibilidade
                    },
                },
            }},
        ]
    )
        
    

    //Valores do gráfico
    const [series, setSeries] = useState([
        {
            name: "Ocorrências",
            data: values
        },
    ])

    useEffect(() => {
        setOptions({
            ...options,
            xaxis: {
                categories: items,
            },
        })

        setSeries([{
            name: "Ocorrências",
            data: values
        }])
    }, [values, items])

    //Componente de gráfico do ApexCharts recebendo os valores definidos acima
    return (
        <Chart
            options={options}
            series={series}
            type="bar"
            height="100%"
        />
    )
}

export default BarChart