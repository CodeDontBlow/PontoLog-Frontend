// Importando biblioteca de terceiros
import { useState, useEffect, useCallback } from 'react'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

// Importando componentes e Services
import { fetchData, getProductByLetter } from '../../services/fetchService'
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
import { regionColors } from '../../components/Maps/BrazilMap'

import styles from './Statistics.module.css'

const Statistics = () => {
    // STATES DOS FILTROS
    // Produto
    const [sh, setSh] = useState('sh4');
    const [product, setProduct] = useState('');

    // Período
    const [initYear, setInitYear] = useState(2014);
    const [finalYear, setFinalYear] = useState(2024);
    const [periodoUnico, setPeriodoUnico] = useState(true);
    const [period, setPeriod] = useState([initYear, finalYear]);

    // Estado
    const [region, setRegion] = useState('');
    const [state, setState] = useState('');
    const [uf , setUf] = useState('');

    const [tradeType, setTradeType] = useState('exportacao');
    
    // TROCA DINAMICA DE CORES
    // Objeto com as cores atuais
    const [pageColors , setPageColors] = useState(
        {
            700: "var(--pink-700)",
            base: "var(--base-pink)",
            500: "var(--pink-500)",
            300: "var(--pink-300)",
        }
    )

    const [hexColors , setHexColors] = useState(['#B81D4E' , '#D92B66' , '#F5A4C3' , '#F1A1B5'])

    // Mudando o objeto pageColors
    useEffect(() => {
        // Pega o nome da cor de acordo com a região || ou define como rosa
        let colorName = regionColors[region] || 'pink' 

        // Muda o objeto pageColors para a cor da região
        setPageColors(
            {
                700: `var(--${colorName}-700)`,
                base: `var(--base-${colorName})`,
                500: `var(--${colorName}-500)`,
                300: `var(--${colorName}-300)`,
            }
        )
    }, [state]);



    // Muda a variável CSS highlight, que recebe o valor da cor atual
    useEffect( () => {
        let colorName = regionColors[region] || 'pink'
        let colorsArray = []
        let arrayOrder = [700 , "base" , 500 , 300]

        let element = document.documentElement
        let computed = getComputedStyle(element)

        for(let key of arrayOrder){
            let value = pageColors[key]
            element.style.setProperty(`--highlight-${key}` , value)

            let hexCode = key == "base"
                ? computed.getPropertyValue(`--${key}-${colorName}`).trim()
                : computed.getPropertyValue(`--${colorName}-${key}`).trim()

            colorsArray.push(hexCode)
        }
    
        setHexColors(colorsArray)

    }, [pageColors])

    // state de opções dos inputs
    const [opcoesDeProduto, setOpcoesDeProduto] = useState([]);
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    // states para valores retornados pelo back
    const [fatAgregado, setFatAgregado] = useState(null)
    const [produtoPopular, setProdutoPopular] = useState('')
    const [vias, setVias] = useState([])
    const [urfs, setUrfs] = useState([])
    const [vlAgregado, setVlAgregado] = useState([])
    const [kgLiq, setKgLiq] = useState([])
    const [vlFob, setVlFob] = useState([])
    const [countries, setCountries] = useState([])

    // Opções de descrição para o mapa do Brasil (para estatísticas)
    const getDescriptionText = () => {
        if (state) { //Selecionou um estado
            return "Para desfazer a seleção de estado atual, clique no mapa abaixo.";
        } else if (region) { //Selecionou uma região
            return "Escolha um dos estados para analisar seus dados.";
        } else { //Não selecionou nada
            return "Para ver estatísticas de um estado, escolha uma das regiões do mapa abaixo.";
        }
    };
    const [balanca, setBalanca] = useState([])

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedGetProductByLetter = useCallback(debounce(getProductByLetter, 50), [sh]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                await Promise.all([
                    fetchData('fat', setFatAgregado, initYear, tradeType, region, state, product, sh, finalYear, periodoUnico),
                    fetchData(`product/no_${sh}_por`, setProdutoPopular, initYear, tradeType, region, state, product, sh, finalYear, periodoUnico),
                    fetchData('via', setVias, initYear, tradeType, region, state, product, sh, finalYear, periodoUnico),
                    fetchData('urf', setUrfs, initYear, tradeType, region, state, product, sh, finalYear, periodoUnico),
                    fetchData('vl_agregado', setVlAgregado, initYear, tradeType, region, state, product, sh, finalYear, periodoUnico),
                    fetchData('vl_fob', setVlFob, initYear, tradeType, region, state, product, sh, finalYear, periodoUnico),
                    fetchData('kg_liquido', setKgLiq, initYear, tradeType, region, state, product, sh, finalYear, periodoUnico),
                    fetchData('balanco', setBalanca, initYear, tradeType, region, state, product, sh, finalYear, periodoUnico),
                    fetchData('countries', setCountries, initYear, tradeType, region, state, product, sh, finalYear, periodoUnico),
                ]);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }
        };

        fetchAllData()
    }, [product, initYear, finalYear, tradeType, periodoUnico, sh, state]);

    useEffect(() => {
        if (product.length > 0) {
            getProductByLetter(product, setOpcoesDeProduto, sh);
        }
    }, [product, sh]);

    return (
        <div id={styles.statisticsPage} style={{color:"var(--highlight-base)"}}>

            {/* Área dos Inputs */}
            <section id={styles.inputArea}>
                {/* Input do Nome do Produto */}
                <div className={styles.productArea}>
                    {/* <Input label="Nome do Produto" type="text" placeholder="Produto" id="product"/> */}
                    <Dropdown label={"Produtos"} search={true} placeholder={"Pesquisar..."} options={opcoesDeProduto.length > 0 ? opcoesDeProduto : ['...']} value={product} onChange={(e) => {
                        const value = e.target.value;
                        setProduct(value);
                        debouncedGetProductByLetter(value);
                    }
                    }
                        onSelect={(produto) => setProduct(produto)} />
                    {/* Botões SH4 e SH6 */}
                    <div className={styles.inputOptions}>
                        {/* SH4 */}
                        <input type="radio" name="sh-selection" id="sh4" defaultChecked onClick={() => {
                            setSh('sh4');
                            setProduct('');
                            setOpcoesDeProduto([])
                        }} />
                        <label htmlFor="sh4"> SH4 </label>

                        {/* SH6 */}

                        <input type="radio" name="sh-selection" id="sh6" onClick={() => {
                            setSh('sh6');
                            setProduct('');
                            setOpcoesDeProduto('');
                        }} />
                        <label htmlFor="sh6"> SH6 </label>
                    </div>
                </div>

                {/* Input de Periodo de Tempo */}
                <div className={styles.periodArea}>
                    {/* Inputs */}
                    <label className={styles.label} > Período de tempo</label>
                    <div className={styles.periodInputs}>
                        {/* Primeiro Ano do Período */}
                        <div className={styles.firstYear}>
                            {/* <Input label="Período de Tempo" placeholder="Ano de Início" type="number" id="firstYear" /> */}
                            <Dropdown label={"Ano de Início"} options={years} placeholder={"Ano de Início"} value={initYear} onSelect={(year) => setInitYear(year)} />
                        </div>

                        {/* Último Ano do Período */}
                        <div className={styles.lastYear}>
                            {/* <Input label="..." placeholder="Ano de Término" type="Number" id="lastYear" / */}

                            <Dropdown label={"Ano de Término"} options={years} placeholder={"Ano de Término"} value={finalYear} onSelect={(year) => setFinalYear(year)} disable={periodoUnico} />
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

                    {/* Legenda do mapa do brasil */}
                    <p className={styles.mapDescription}>{getDescriptionText()}</p>

                    {/* Região/Estado selecionado */}
                    {state ? (
                    <h2 className={styles.mapCurrentState}>{state}</h2>
                    ) : region ? (
                    <h2 className={styles.mapCurrentState}>Região {region}</h2>
                    ) : null}
                    <BrazilMap onRegionChange={ ({ regiao, estado , uf }) => {
                        setRegion(regiao || ''); 
                        setState(estado || ''); 
                        setUf(uf || '');
                    }} />
                </div>

                {/* Molde de Grid Vertical Reutilizável */}
                <section className="infoGridVertical">
                    {/* Parte de Cima */}
                    <section className="topArea">
                        <div className="gridItem">
                            <IconTitle title="Balança Comercial" variant="lineChart" size='textMedium' />
                            <div className="componentWrapper">
                                {/* {balanca.length > 0 && ( */}
                                    <LineChart
                                        period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                        // values={balanca.map(bal => Number(bal.total))}
                                        values={[1,2,3,4,5,6]}
                                        dataName="Balança Comercial"
                                        colorPalette={[hexColors[1]]}
                                    />
                                {/* )} */}
                            </div>
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
                            <IconTitle variant="map" title="Principais Países" size='textMedium' />
                            <div className="componentWrapper">
                                <WorldMap
                                    selectedRegion="Norte"
                                    tradeType="exportacao"
                                    colorPalette={["#B81D4E", "#D92B66", "#F5A4C3", "#F1A1B5"]}
                                    countryDatas={{
                                        exportacao: countries.map(c => ({
                                            country: c.NO_PAIS,
                                            quantidade: Number(c.TOTAL_REGISTROS),
                                            vl: Number(c.TOTAL_VL_AGREGADO),
                                            kg: Number(c.TOTAL_KG_LIQUIDO),
                                        })),
                                        importacao: [],
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Parte da Direita */}
                    <section className="rightArea">
                        {/* Item 1 */}
                        <div className="gridItem">
                            <IconTitle variant="barChart" title="Principais Vias Usadas" size='textLight' />

                            <div className="componentWrapper">
                                <BarChart
                                    items={vias.map(via => via.NO_VIA)}
                                    values={vias.map(via => Number(via.total))}
                                    colorPalette={["#D92B66"]}
                                />
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="gridItem">
                            <IconTitle variant="barChart" title="Principais URFs" size='light' />
                            <div className="componentWrapper">
                                {urfs.length > 0 && (
                                    <BarChart
                                        items={urfs.map(urf => urf.NO_URF)}
                                        values={urfs.map(urf => Number(urf.total))}
                                        colorPalette={["#D92B66"]}
                                    />
                                )}
                            </div>
                        </div>
                    </section>
                </section>

                {/* Molde de Grid Horizontal Reutilizável */}
                <section className="infoGridHorizontal">
                    {/* Parte da Esquerda */}
                    <section className="leftArea">
                        <div className="gridItem">
                            <IconTitle title="Valor Agregado" variant="lineChart" size='textMedium' />
                            <div className="componentWrapper">
                                <LineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={vlAgregado.map(value => Number(value.total))}
                                    dataName="Balança Comercial"
                                    colorPalette={["#D92B66"]}
                                    id="bottomInfo11"
                                    group="bottomInfo1"
                                />
                            </div>
                        </div>
                    </section>
                    {/* Parte da Direita */}
                    <section className="rightArea">
                        {/* Item 1 */}
                        <div className="gridItem">
                            <IconTitle title="Quilograma Líquido" variant="lineChart" size='textLight' />
                            <div className="componentWrapper">
                                <LineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={kgLiq.map(value => Number(value.total))}
                                    dataName="kg_liquido"
                                    colorPalette={["#D92B66"]}
                                    id="bottomInfo12"
                                    group="bottomInfo1"
                                />
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="gridItem">
                            <IconTitle title="Valor FOB" variant="lineChart" size='textLight' />
                            <div className="componentWrapper">
                                <LineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={vlFob.map(value => Number(value.total))}
                                    dataName="vl_fob"
                                    colorPalette={["#D92B66"]}
                                    id="bottomInfo13"
                                    group="bottomInfo1"
                                />
                            </div>
                        </div>
                    </section>
                </section>


            </section>
        </div>
    )
}

export default Statistics;