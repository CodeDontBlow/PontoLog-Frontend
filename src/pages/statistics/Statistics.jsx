// Importando biblioteca de terceiros
import { useState, useEffect } from 'react'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

// Importando componentes e api
import api from '../../api/api'
import Button from '../../components/Buttons/Button/Button'
import Checkbox from '../../components/Buttons/Checkbox/Checkbox'
import LineChart from '../../components/Charts/LineChart'
import BarChart from '../../components/Charts/BarChart'
import InfoCard from '../../components/Cards/InfoCard/Card'
import AlertCard from '../../components/Cards/AlertCard/AlertCard'
import BrazilMap from '../../components/Maps/BrazilMap'
import WorldMap from '../../components/Maps/WorldMap'
import Dropdown from '../../components/Dropdown/Dropdown'
import IconTitle from '../../components/IconTitle/IconTitle'
import TabNavigation from '../../components/Tab/TabNavigation'

import styles from './Statistics.module.css'

const Statistics = () => {
    // states dos filtros
    const [sh, setSh] = useState('sh4');
    const [product, setProduct] = useState('');
    const [estado, setEstado] = useState('');
    const [tradeType, setTradeType] = useState('exportacao');
    const [region, setRegion] = useState('');
    const [initYear, setInitYear] = useState(2014);
    const [finalYear, setFinalYear] = useState(2024);
    const [periodoUnico, setPeriodoUnico] = useState(true);
    const [period, setPeriod] = useState([initYear, finalYear]);

    // state de opções dos inputs
    const [opcoesDeProduto, setOpcoesDeProduto] = useState([]);
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

    // states para valores retornados pelo back
    const [fatAgregado, setFatAgregado] = useState(null)
    const [produtoPopular, setProdutoPopular] = useState('')
    const [vias, setVias] = useState([])
    const [urfs, setUrfs] = useState([])
    const [vlAgregado, setVlAgregado] = useState([])
    const [kgLiq, setKgLiq] = useState([])
    const [vlFob, setVlFob] = useState([])
    const [countries, setCountries] = useState([])

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

    const getFat = async () => {
        try {
            let response;

            if (periodoUnico) {
                response = await api.get(`/${tradeType}/fat/${initYear}`)
            }
            else {
                response = await api.get(`/${tradeType}/fat/${initYear}?endYear=${finalYear}`)
            }

            const responseData = response.data
            const data = responseData.data

            setFatAgregado(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const getProduct = async () => {
        try {
            let response;

            if (periodoUnico) {
                response = await api.get(`/${tradeType}/product/no_${sh}_por/${initYear}`)
            }
            else {
                response = await api.get(`/${tradeType}/product/no_${sh}_por/${initYear}?endYear=${finalYear}`)
            }

            const responseData = response.data
            const data = responseData.data

            setProdutoPopular(data)
        } catch (error) {
            console.error("Error fetching data:", error)

        }
    }

    const getVia = async () => {
        try {
            let response;

            if (periodoUnico) {
                response = await api.get(`/${tradeType}/via/${initYear}`)
            }
            else {
                response = await api.get(`/${tradeType}/via/${initYear}?endYear=${finalYear}`)
            }

            const responseData = response.data
            const data = responseData.data

            setVias(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    const getUrf = async () => {
        try {
            let response;

            if (periodoUnico) {
                response = await api.get(`/${tradeType}/urf/${initYear}`)
            }
            else {
                response = await api.get(`/${tradeType}/urf/${initYear}?endYear=${finalYear}`)
            }

            const responseData = response.data
            const data = responseData.data

            setUrfs(data)
        } catch (error) {
            console.error("Error fetching data:", error)

        }
    }

    const getVlAgregado = async () => {
        try {
            let response;

            if (periodoUnico) {
                switch (true) {
                    case (region && product):
                        response = await api.get(`/${tradeType}/vl_agregado/${initYear}?region=REGIAO SUDESTE&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    case (region):
                        response = await api.get(`/${tradeType}/vl_agregado/${initYear}?region=REGIAO SUDESTE`);
                        break;
                    case (product):
                        response = await api.get(`/${tradeType}/vl_agregado/${initYear}?sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    default:
                        response = await api.get(`/${tradeType}/vl_agregado/${initYear}`);
                        break;
                }
            } else {
                switch (true) {
                    case (estado && region && product):
                        response = await api.get(`/${tradeType}/vl_agregado/${initYear}?endYear=${finalYear}&region=REGIAO SUDESTE&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    case (estado && region):
                        response = await api.get(`/${tradeType}/vl_agregado/${initYear}?endYear=${finalYear}&region=REGIAO SUDESTE`);
                        break;
                    case (product):
                        response = await api.get(`/${tradeType}/vl_agregado/${initYear}?endYear=${finalYear}&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    default:
                        response = await api.get(`/${tradeType}/vl_agregado/${initYear}?endYear=${finalYear}`);
                        break;
                }
            }

            const responseData = response.data
            const data = responseData.data
            setVlAgregado(data)
        } catch (error) {
            console.error("Error fetching data:", error)

        }
    }


    const getVlFob = async () => {
        try {
            let response;

            if (periodoUnico) {
                switch (true) {
                    case (region && product):
                        response = await api.get(`/${tradeType}/vl_fob/${initYear}?region=REGIAO SUDESTE&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    case (region):
                        response = await api.get(`/${tradeType}/vl_fob/${initYear}?region=REGIAO SUDESTE`);
                        break;
                    case (product):
                        response = await api.get(`/${tradeType}/vl_fob/${initYear}?sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    default:
                        response = await api.get(`/${tradeType}/vl_fob/${initYear}`);
                        break;
                }
            } else {
                switch (true) {
                    case (region && product):
                        response = await api.get(`/${tradeType}/vl_fob/${initYear}?endYear=${finalYear}&region=REGIAO SUDESTE&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    case (region):
                        response = await api.get(`/${tradeType}/vl_fob/${initYear}?endYear=${finalYear}&region=REGIAO SUDESTE`);
                        break;
                    case (product):
                        response = await api.get(`/${tradeType}/vl_fob/${initYear}?endYear=${finalYear}&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    default:
                        response = await api.get(`/${tradeType}/vl_fob/${initYear}?endYear=${finalYear}`);
                        break;
                }
            }

            const responseData = response.data
            const data = responseData.data

            setVlFob(data)
        } catch (error) {
            console.error("Error fetching data:", error)

        }
    }

    const getKgLiq = async () => {
        try {
            let response;

            if (periodoUnico) {
                switch (true) {
                    case (region && product):
                        response = await api.get(`/${tradeType}/kg_liquido/${initYear}?region=REGIAO SUDESTE&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    case (region):
                        response = await api.get(`/${tradeType}/kg_liquido/${initYear}?region=REGIAO SUDESTE`);
                        break;
                    case (product):
                        response = await api.get(`/${tradeType}/kg_liquido/${initYear}?sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    default:
                        response = await api.get(`/${tradeType}/kg_liquido/${initYear}`);
                        break;
                }
            } else {
                switch (true) {
                    case (region && product):
                        response = await api.get(`/${tradeType}/kg_liquido/${initYear}?endYear=${finalYear}&region=REGIAO SUDESTE&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    case (region):
                        response = await api.get(`/${tradeType}/kg_liquido/${initYear}?endYear=${finalYear}&region=REGIAO SUDESTE`);
                        break;
                    case (product):
                        response = await api.get(`/${tradeType}/kg_liquido/${initYear}?endYear=${finalYear}&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    default:
                        response = await api.get(`/${tradeType}/kg_liquido/${initYear}?endYear=${finalYear}`);
                        break;
                }
            }

            const responseData = response.data
            const data = responseData.data
            setKgLiq(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const getOverallCountries = async () => {
        try {
            let response;

            if (periodoUnico) {
                switch (true) {
                    case (region && product):
                        response = await api.get(`/${tradeType}/countries/${initYear}?region=REGIAO SUDESTE&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    case (region):
                        response = await api.get(`/${tradeType}/countries/${initYear}?region=REGIAO SUDESTE`);
                        break;
                    case (product):
                        response = await api.get(`/${tradeType}/countries/${initYear}?sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    default:
                        response = await api.get(`/${tradeType}/countries/${initYear}`);
                        break;
                }

            } else {
                switch (true) {
                    case (region && product):
                        response = await api.get(`/${tradeType}/countries/${initYear}?endYear=${finalYear}&region=REGIAO SUDESTE&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    case (region):
                        response = await api.get(`/${tradeType}/countries/${initYear}?endYear=${finalYear}&region=REGIAO SUDESTE`);
                        break;
                    case (product):
                        response = await api.get(`/${tradeType}/countries/${initYear}?endYear=${finalYear}&sh=no_${sh}_por&productName=Cenouras e nabos, frescos ou refrigerados`);
                        break;
                    default:
                        response = await api.get(`/${tradeType}/countries/${initYear}?endYear=${finalYear}`);
                        break;
                }
            }

            const responseData = response.data
            const data = responseData.data

            setCountries(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            console.time("fetchData");
            try {
                await Promise.all([
                    getFat(),
                    getProduct(),
                    getVia(),
                    getUrf(),
                    getVlAgregado(),
                    getVlFob(),
                    getKgLiq(),
                    getOverallCountries(),
                ]);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            } finally {
                console.timeEnd("fetchData");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setProduct(product ? product[0].toUpperCase() + product.slice(1).toLowerCase() : product)

        console.log(product)

        if (product.length > 0) {
            getProductByLetter()
        }

    }, [product])

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

    return (
        <div id={styles.statisticsPage}>

            {/* Área dos Inputs */}
            <section id={styles.inputArea}>
                {/* Input do Nome do Produto */}
                <div className={styles.productArea}>
                    {/* <Input label="Nome do Produto" type="text" placeholder="Produto" id="product"/> */}
                    <Dropdown label={"Produtos"} search={true} placeholder={"Pesquisar..."} options={opcoesDeProduto} value={product} onChange={(e) => setProduct(e.target.value)} onSelect={(produto) => setProduct(produto)} />
                    {/* Botões SH4 e SH6 */}
                    <div className={styles.inputOptions}>
                        {/* SH4 */}
                        <input type="radio" name="sh-selection" id="sh4" defaultChecked onClick={() => setSh('sh4')} />
                        <label htmlFor="sh4"> SH4 </label>

                        {/* SH6 */}

                        <input type="radio" name="sh-selection" id="sh6" onClick={() => setSh('sh6')} />
                        <label htmlFor="sh6"> SH6 </label>
                    </div>
                </div>

                {/* Input de Periodo de Tempo */}
                <div className={styles.periodArea}>
                    {/* Inputs */}
                    <div className={styles.periodInputs}>
                        <label className={styles.label} > Período de tempo</label>
                        {/* Primeiro Ano do Período */}
                        <div className={styles.firstYear}>
                            {/* <Input label="Período de Tempo" placeholder="Ano de Início" type="number" id="firstYear" /> */}
                            <Dropdown label={"Ano de Início"} options={years} placeholder={"Ano de Início"} value={initYear} onSelect={(year) => setInitYear(year)} />
                        </div>

                        {/* Último Ano do Período */}
                        <div className={styles.lastYear}>
                            {/* <Input label="..." placeholder="Ano de Término" type="Number" id="lastYear" / */}
                            {!periodoUnico && <Dropdown label={"Ano de Início"} options={years} placeholder={"Ano de Início"} value={finalYear} onSelect={(year) => setFinalYear(year)} />}
                        </div>
                    </div>

                    {/* Checkbox (Decidir se iremos utilizar)*/}
                    <div className={styles.inputOptions}>
                        <Checkbox label="Ativar busca somente para um ano" value={periodoUnico} checked={periodoUnico} onChange={() => { setPeriodoUnico(!periodoUnico) }} />
                    </div>
                </div>
            </section>



            {/* Alerta de quais Informações estão sendo exibidas */}
            <AlertCard variant="allInfo" icon={faCircleInfo} product="Todos os Produtos" region="Brasil" period={period} />



            {/* Primeiras Informações da Página + mapa do brasil */}
            <section id={styles.primaryInfos}>
                {/* Mapa do Brasil */}
                <div className={styles.navMap}>
                    <BrazilMap />
                </div>

                {/* Molde de Grid Vertical Reutilizável */}
                <section className="infoGridVertical">
                    {/* Parte de Cima */}
                    <section className="topArea">
                        <div className="gridItem">
                            <IconTitle title="Balança Comercial" variant="lineChart" size='medium' />
                            <LineChart
                                period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                values={[35, -12, 48, 5, -27, 100, 22, -40, 10, 55, -18, 30]}
                                dataName="Balança Comercial"
                                colorPalette={["#D92B66"]}
                            />
                        </div>
                    </section>

                    {/* Parte de Baixo */}
                    <section className="bottomArea">
                        {/* Item 1 */}
                        <InfoCard title="Exportação" fatorAgregado={fatAgregado} produto={produtoPopular} />
                        {/* Item 2 */}
                        <InfoCard title="Importação" fatorAgregado="Pouco manufaturado" produto="Grãos de Arroz" />
                    </section>
                </section>
            </section>


            {/* Deve-se definir melhor o uso do tab navigation!!! */}
            {/* <TabNavigation tab={tabs} contents={contents} /> */}



            {/* Informação completas de Exportação ou Importação */}
            <section id={styles.ExpImpInfos}>
                {/* Molde de Grid Horizontal Reutilizável */}
                <section className="infoGridHorizontal">
                    {/* Parte da Esquerda (Mapa do Mundo) */}
                    <section className="leftArea">
                        <div className="gridItem">
                            <IconTitle variant="map" title="Principais Países" size='medium' />
                            <WorldMap
                                selectedRegion="Norte"
                                tradeType="exportacao"
                                countryDatas={dadosTeste}
                            />
                        </div>
                    </section>

                    {/* Parte da Direita */}
                    <section className="rightArea">
                        {/* Item 1 */}
                        <div className="gridItem">
                            <IconTitle variant="barChart" title="Principais Vias Usadas" size='light' />

                            {vias.length > 0 && (
                                <BarChart
                                    items={vias.map(via => via.NO_VIA)}
                                    values={vias.map(via => Number(via.total))}
                                    colorPalette={["#D92B66"]}
                                />
                            )}
                        </div>
                        {/* Item 2 */}
                        <div className="gridItem">
                            <IconTitle variant="barChart" title="Principais URFs" size='light' />
                            {urfs.length > 0 && (
                                <BarChart
                                    items={urfs.map(urf => urf.NO_URF)}
                                    values={vias.map(urf => Number(urf.total))}
                                    colorPalette={["#D92B66"]}
                                />
                            )}
                        </div>
                    </section>
                </section>

                {/* Molde de Grid Horizontal Reutilizável */}
                <section className="infoGridHorizontal">
                    {/* Parte da Esquerda */}
                    <section className="leftArea">
                        <div className="gridItem">
                            <IconTitle title="Valor Agregado" variant="lineChart" size='medium' />
                            {vlAgregado.length > 0 && (
                                <LineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={vlAgregado.map(value => Number(value.total))}
                                    dataName="Balança Comercial"
                                    colorPalette={["#D92B66"]}
                                    id="bottomInfo11"
                                    group="bottomInfo1"
                                />
                            )
                            }
                        </div>
                    </section>
                    {/* Parte da Direita */}
                    <section className="rightArea">
                        {/* Item 1 */}
                        <div className="gridItem">
                            <IconTitle title="Quilograma Líquido" variant="lineChart" size='light' />
                            {kgLiq.length > 0 && (
                                <LineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={kgLiq.map(value => Number(value.total))}
                                    dataName="kg_liquido"
                                    colorPalette={["#D92B66"]}
                                    id="bottomInfo12"
                                    group="bottomInfo1"
                                />
                            )
                            }
                        </div>
                        {/* Item 2 */}
                        <div className="gridItem">
                            <IconTitle title="Valor FOB" variant="lineChart" size="light" />

                            {vlFob.length > 0 && (
                                <LineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={vlFob.map(value => Number(value.total))}
                                    dataName="vl_fob"
                                    colorPalette={["#D92B66"]}
                                    id="bottomInfo13"
                                    group="bottomInfo1"
                                />
                            )
                            }
                        </div>
                    </section>
                </section>


            </section>
        </div>
    )
}

export default Statistics;