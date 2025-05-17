import { useState , useEffect } from 'react'
import api from '../../api/api'

// Importando CSS e Componentes
import styles from './ComparisonStats.module.css'
import DoubleLineChart from '../../components/Charts/DoubleLineChart'
import ColorCard from '../../components/Cards/ColorCard/ColorCard'
import BarChart from '../../components/Charts/BarChart'
import AlertCard from '../../components/Cards/AlertCard/AlertCard'
import BrazilMap from '../../components/Maps/BrazilMap'
import WorldMap from '../../components/Maps/WorldMap'
import Checkbox from '../../components/Buttons/Checkbox/Checkbox'
import IconTitle from '../../components/IconTitle/IconTitle'
import Dropdown from '../../components/Dropdown/Dropdown'

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

const ComparisonStats = () => {
    // TESTE ATUALIZAÇÃO DO ESTADO YEAR
    const dadosTeste = {
      exportacao: [
        {
            country: "United States",
            quantidade: 8000,
            vl: 5000000,
            kg: 1500000,
        },
        {
            country: "China",
            quantidade: 6500,
            vl: 4800000,
            kg: 1400000,
        },
        {
            country: "Germany",
            quantidade: 4500,
            vl: 3000000,
            kg: 900000,
        },
        {
            country: "Spain",
            quantidade: 3000,
            vl: 2000000,
            kg: 800000,
        },
        {
            country: "Japan",
            quantidade: 4000,
            vl: 3500000,
            kg: 950000,
        },
        {
            country: "Brazil",
            quantidade: 3500,
            vl: 1800000,
            kg: 700000,
        },
        {
            country: "India",
            quantidade: 5000,
            vl: 2200000,
            kg: 850000,
        },
        {
            country: "France",
            quantidade: 3800,
            vl: 2800000,
            kg: 750000,
        },
        {
            country: "United Kingdom",
            quantidade: 4200,
            vl: 3200000,
            kg: 880000,
        },
        {
            country: "Italy",
            quantidade: 3200,
            vl: 2100000,
            kg: 650000,
        },
        {
            country: "Canada",
            quantidade: 2900,
            vl: 1900000,
            kg: 600000,
        },
        {
            country: "South Korea",
            quantidade: 3600,
            vl: 2400000,
            kg: 720000,
        },
        {
            country: "Mexico",
            quantidade: 2800,
            vl: 1500000,
            kg: 550000,
        },
        {
            country: "Australia",
            quantidade: 2500,
            vl: 1700000,
            kg: 500000,
        },
        {
            country: "Netherlands",
            quantidade: 2200,
            vl: 1600000,
            kg: 480000,
        },
        {
            country: "Russia",
            quantidade: 3000,
            vl: 2000000,
            kg: 750000,
        },
        {
            country: "Switzerland",
            quantidade: 1800,
            vl: 1400000,
            kg: 400000,
        },
        {
            country: "Turkey",
            quantidade: 2700,
            vl: 1300000,
            kg: 520000,
        },
        {
            country: "Saudi Arabia",
            quantidade: 2300,
            vl: 1200000,
            kg: 450000,
        },
        {
            country: "Argentina",
            quantidade: 2000,
            vl: 900000,
            kg: 380000,
        },
      ]
    };

    
    // Variáveis para os inputs
    const [product , setProduct] = useState('')
    const [sh, setSh] = useState('sh4');

    const [periodoUnico, setPeriodoUnico] = useState(true);
    const [initYear , setInitYear] = useState(2014)
    const [finalYear , setFinalYear] = useState(2024)

    const opcoesDeProduto = ["Abacaxi" , "Cenoura"];
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    
    const getProductByLetter = async () => {
        if (product.length > 0) {
            try {
                const response = await api.get(`/product/no_${sh}_por/${product}`)

                const responseData = response.data
                const data = responseData.data

                setOpcoesDeProduto(data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
    }

    
    useEffect(() => {
        setProduct(product ? product[0].toUpperCase() + product.slice(1).toLowerCase() : product)

        console.log(product)

        if (product.length > 0) {
            getProductByLetter()
        }

    }, [product])
    
    
    
    return (
        <div id={styles.statisticsPage} style={{color:"var(--base-highlight)"}}>


        {/* Área dos Inputs */}
            <section id={styles.inputArea}>
                {/* Labels */}
                <div className={styles.labelsContainer}>
                    <label className={styles.productLabel} htmlFor="">Produtos</label>

                    <label className={styles.periodLabel} htmlFor="">Período de Tempo</label>
                </div>

                {/* Inputs */}
                <div className={styles.inputsContainer}>

                    {/* Input do Produto */}
                    <div className={styles.productInput}>
                    {/* <Input label="Nome do Produto" type="text" placeholder="Produto" id="product"/> */}
                    <Dropdown search={true} placeholder={"Pesquisar..."} options={opcoesDeProduto} value={product} onChange={(e) => setProduct(e.target.value)} onSelect={(produto) => setProduct(produto)} />
                    </div>

                    {/* Input dos Anos */}
                    <div className={styles.periodInputs}>
                        <div className={styles.firstYear}>
                            {/* <Input label="Período de Tempo" placeholder="Ano de Início" type="number" id="firstYear" /> */}
                            <Dropdown label={"Ano de Início"} options={years} placeholder={"Ano de Início"} value={initYear} onSelect={(year) => setInitYear(year)} />
                        </div>

                        {/* Último Ano do Período */}
                        {periodoUnico &&
                            <div className={styles.lastYear}>
                            {/* <Input label="..." placeholder="Ano de Término" type="Number" id="lastYear" / */}
                                <Dropdown label={"Ano de Início"} options={years} placeholder={"Ano de Início"} value={finalYear} onSelect={(year) => setFinalYear(year)} />
                            </div>
                        }
                    </div>
                </div>

                {/* Opções */}
                <div className={styles.optionsContainer}>
                    {/* Botões SH's */}
                    <div className={styles.productOptions}>
                        {/* SH4 */}
                        <input type="radio" name="sh-selection" id="sh4" defaultChecked onClick={() => setSh('sh4')} />
                        <label htmlFor="sh4"> SH4 </label>
                        
                        {/* SH6 */}
                        <input type="radio" name="sh-selection" id="sh6" onClick={() => setSh('sh6')} />
                        <label htmlFor="sh6"> SH6 </label>
                    </div>

                    {/* Checkbox Período de Tempo */}
                    <div className={styles.periodOptions}>
                        <Checkbox label="Ativar busca somente para um ano" value={periodoUnico} checked={periodoUnico} onChange={() => { setPeriodoUnico(!periodoUnico) }} />
                    </div>
                </div>
            </section>



            <AlertCard variant='allInfo' icon={faCircleInfo} product="Todos os Produtos" period={[2019 , 2020]}/>



            <section id={styles.primaryInfos}>
                <div className={styles.navMap}>
                    <BrazilMap/>
                </div>

                <section className={`${styles.infoGridVertical} infoGridVertical`}>
                    <section className="topArea">
                        <div className="gridItem">
                            <IconTitle title="Balança Comercial" variant="lineChart"/>
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={[[12, 8, 5, 37, -82, 29, 45, 13, 45, 45, 73 , -3], [35, -12, 48, 5, -27, 100, 22, -40, 10, 55, 28, 30]]}
                                    dataName={["Estado 1", "Estado 2"]}
                                    colorPalette={["#D92B66", "#028391"]}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="midArea">
                        <AlertCard variant='comparisonInfo' icon={faCircleInfo} region={["Brasil" , "São Paulo"]}/>
                    </section>

                    <section className="bottomArea">
                        <ColorCard color="#D92B66" title="BR" region="Brasil"/>
                        <ColorCard color="#028391" title="SP" region="São Paulo"/>
                    </section>
                </section>
            </section>

            <section id={styles.ExpImpInfos}>
                <section id={styles.mainInfosArea}>
                    {/* Estado 1 */}
                    <section className="infoGridVertical">
                        <section className="topArea">
                            <h3 className={styles.stateTitle}>Brasil</h3>
                        </section>
                        <section className="midArea">
                            <div className="gridItem">
                                <IconTitle variant="map" title="Principais Países"/>
                                <div className="componentWrapper">
                                    <WorldMap
                                        selectedRegion="Norte"
                                        tradeType="exportacao"
                                        colorPalette={["#B81D4E","#D92B66" ,"#F5A4C3" , "#F1A1B5"]}
                                        countryDatas={dadosTeste}
                                    />
                                </div>
                            </div>
                        </section>
                        <section className="bottomArea">
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais Vias Usadas" size='textLight'/>
                                <div className="componentWrapper" style={{padding:0}}>
                                    <BarChart
                                        items={["Via Aquífera", "Via Rodoviária", "Via Aérea"]}
                                        values={[512, 485, 271]}
                                        colorPalette={["#D92B66"]}
                                    />
                                </div>
                            </div>
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais URF's Usadas" size='textLight'/>
                                <div className="componentWrapper" style={{padding:0}}>
                                    <BarChart
                                        items={["Porto 123", "Rodovia 123", "Aeroporto 123"]}
                                        values={[52, 45, 21]}
                                        colorPalette={["#D92B66"]}
                                    />
                                </div>
                            </div>
                        </section>
                    </section>

                    {/* Estado 2 */}
                    <section className="infoGridVertical" style={{color:"var(--base-teal)"}}>
                        <section className="topArea">
                            <h3 className={styles.stateTitle}>São Paulo</h3>
                        </section>
                        <section className="midArea">
                            <div className="gridItem">
                                <IconTitle variant="map" title="Principais Países" color="currentColor"/>
                                <div className="componentWrapper">
                                    <WorldMap
                                        selectedRegion="Norte"
                                        tradeType="exportacao"
                                        colorPalette={["#16707A","#028391" ,"#80B8B8" , "#A0D0D0"]}
                                        countryDatas={dadosTeste}
                                    />
                                </div>
                            </div>
                        </section>
                        <section className="bottomArea">
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais Vias Usadas" size='textLight'/>
                                <div className="componentWrapper" style={{padding:0}}>
                                    <BarChart
                                        items={["Via Aquífera", "Via Rodoviária", "Via Aérea"]}
                                        values={[512, 485, 271]}
                                        colorPalette={["#028391"]}
                                    />
                                </div>
                            </div>
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais URF's Usadas" size='textLight'/>
                                <div className="componentWrapper" style={{padding:0}}>
                                    <BarChart
                                        items={["Porto 123", "Rodovia 123", "Aeroporto 123"]}
                                        values={[52, 45, 21]}
                                        colorPalette={["#028391"]}
                                    />
                                </div>
                            </div>
                        </section>
                    </section>
                </section>









                <section className="infoGridHorizontal lineChartsArea">
                    <section className="leftArea">
                        <div className="gridItem" style={{}}>
                            <IconTitle title="Valor Agregado" variant="lineChart"/>
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={[[12, 8, 5, 37, -82, 29, 45, 13, 45, 45, 73 , -3], [35, -12, 48, 5, -27, 100, 22, -40, 10, 55, 28, 30]]}
                                    dataName={["Estado 1", "Estado 2"]}
                                    colorPalette={["#D92B66", "#028391"]}
                                />
                            </div>
                        </div>
                    </section>
                    <section className="rightArea">
                        <div className="gridItem">
                            <IconTitle title="Quilograma Líquido" variant="lineChart" size='textLight'/>
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={[[12, 8, 5, 37, -82, 29, 45, 13, 45, 45, 73 , -3], [35, -12, 48, 5, -27, 100, 22, -40, 10, 55, 28, 30]]}
                                    dataName={["Estado 1", "Estado 2"]}
                                    colorPalette={["#D92B66", "#028391"]}
                                    legends="false"
                                />
                            </div>
                        </div>
                        <div className="gridItem">
                            <IconTitle title="Valor FOB" variant="lineChart" size="textLight"/>
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={[[12, 8, 5, 37, -82, 29, 45, 13, 45, 45, 73 , -3], [35, -12, 48, 5, -27, 100, 22, -40, 10, 55, 28, 30]]}
                                    dataName={["Estado 1", "Estado 2"]}
                                    colorPalette={["#D92B66", "#028391"]}
                                    legends="false"
                                />
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </div>
    );
};

export default ComparisonStats;