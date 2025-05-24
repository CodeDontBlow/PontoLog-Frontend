import { useState, useEffect, useCallback } from 'react'

// Importando Componentes e Services
import styles from './ComparisonStats.module.css'

import { fetchData, getProductByLetter } from '../../services/fetchService'

import DoubleLineChart from '../../components/Charts/DoubleLineChart'
import ColorCard from '../../components/Cards/ColorCard/ColorCard'
import BarChart from '../../components/Charts/BarChart'
import AlertCard from '../../components/Cards/AlertCard/AlertCard'
import MultiBrazilMap from '../../components/Maps/MultiBrazilMap'
import WorldMap from '../../components/Maps/WorldMap'
import Checkbox from '../../components/Buttons/Checkbox/Checkbox'
import IconTitle from '../../components/IconTitle/IconTitle'
import Dropdown from '../../components/Dropdown/Dropdown'
import TabNavigation from '../../components/Tab/TabNavigation'

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ComparisonStats = () => {

    // STATES DOS FILTROS
    const [product, setProduct] = useState('')
    const [sh, setSh] = useState('sh4');
    const [periodoUnico, setPeriodoUnico] = useState(true);
    const [initYear, setInitYear] = useState(2014)
    const [finalYear, setFinalYear] = useState(2024)
    const [perido, setPeriodo] = useState([])
    const [region, setRegion] = useState('');
    const [state, setState] = useState('');
    const [uf, setUf] = useState('');
    const [statesList, setStatesList] = useState([]);

    // Mudando a lista de estados quando um estado novo for selecionado
    useEffect(() => {
        if (state) {
            if (statesList[0] == state) {
                return
            }
            setStatesList(previewList => {
                const currentList = [...previewList] //Cópia de segurança do conteúdo da lista anterior
                // Caso a lista já tenha 2 elementos, remove o último
                if (currentList.length >= 2) {
                    currentList.pop()
                }
                // Adiciona o novo estado selecionado no BrazilMap
                let newStateObject = {
                    state: state,
                    uf: uf,
                    region: region
                }

                return [...currentList, newStateObject]
            })
        }
    }, [state])

    const removeStateByIndex = (index) => {
        setStatesList(previewList => [
            ...previewList.slice(0, index),
            ...previewList.slice(index + 1)
        ])
    }

    // Opções de descrição para o mapa do Brasil (para comparação)
    const getDescriptionText = () => {
        if (statesList.length >= 2) { //Selecionou dois estados
            return "Para desfazer a seleção de um dos estados, clique em seu nome abaixo.";
        } else if (statesList.length >= 1) { //Selecionou um estado
            return "Para selecionar o segundo estado, escolha mais uma das regiões do mapa.";
        } else if (region) { //Selecionou uma região
            return "Escolha um dos estados dessa região para analisar seus dados.";
        } else { //Não selecionou nada
            return "Para começar a comparação entre estados, escolha uma das regiões do mapa abaixo."
        }
    };

    const [opcoesDeProduto, setOpcoesDeProduto] = useState([])
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    // const [state, setState] = useState('');
    const [tradeType, setTradeType] = useState('exportacao');

    // ...existing code...

    const [statesData, setStatesData] = useState([]);

    // Função para buscar todos os dados de um estado
    const fetchStateData = async (uf, region) => {
        const [vias, urfs, vlAgregado, kgLiq, vlFob, balanca, countries] = await Promise.all([
            fetchData('via', null, initYear, tradeType, region, uf, product, sh, finalYear, periodoUnico),
            fetchData('urf', null, initYear, tradeType, region, uf, product, sh, finalYear, periodoUnico),
            fetchData('vl_agregado', null, initYear, tradeType, region, uf, product, sh, finalYear, periodoUnico),
            fetchData('kg_liquido', null, initYear, tradeType, region, uf, product, sh, finalYear, periodoUnico),
            fetchData('vl_fob', null, initYear, tradeType, region, uf, product, sh, finalYear, periodoUnico),
            fetchData('balanco', null, initYear, tradeType, region, uf, product, sh, finalYear, periodoUnico),
            fetchData('countries', null, initYear, tradeType, region, uf, product, sh, finalYear, periodoUnico),
        ]);
        return {
            estado: uf,
            vias,
            urfs,
            vlAgregado,
            kgLiq,
            vlFob,
            balanca,
            countries,
        };
    };

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedGetProductByLetter = useCallback(debounce(getProductByLetter, 50), [sh]);

    useEffect(() => {
        const currentList = [...statesList];

        const fetchAllStatesData = async () => {
            const results = await Promise.all(
                currentList.map((state) => fetchStateData(state.uf, state.region))
            );
            setStatesData(results);
        };

        if (!currentList.length <= 1) {
            fetchAllStatesData();
        } else {
            setStatesData([])
        }
    }, [product, sh, periodoUnico, initYear, finalYear, JSON.stringify(statesList), tradeType]);

    useEffect(() => {
        if (product.length > 0) {
            getProductByLetter(product, setOpcoesDeProduto, sh);
        }
    }, [product, sh]);

    useEffect(() => {
        setPeriodo([initYear, finalYear])
    }, [initYear, finalYear])

        // Criando objetos TAB
    const tab = [
        { id: 1, label: "Exportações" , tradeType: "exportacao"},
        { id: 2, label: "Importações" , tradeType: "importacao"},
    ]

    return (
        <div id={styles.statisticsPage}>

            {/* Área dos Inputs */}
            {/* Labels */}
            <section id={styles.inputArea}>
                <div className={styles.labelsContainer}>
                    <label className={styles.productLabel} htmlFor="">Produtos</label>

                    <label className={styles.periodLabel} htmlFor="">Período de Tempo</label>
                </div>

                {/* Inputs */}
                <div className={styles.inputsContainer}>

                    {/* Input do Produto */}
                    <div className={styles.productInput}>
                        {/* <Input label="Nome do Produto" type="text" placeholder="Produto" id="product"/> */}
                        <Dropdown search={true} placeholder={"Pesquisar..."} options={opcoesDeProduto} value={product} onChange={(e) => {
                            const value = e.target.value;
                            setProduct(value);
                            debouncedGetProductByLetter(value);
                        }} onSelect={(produto) => setProduct(produto)} />
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
                        <Checkbox label="Ativar busca por um período entre 2 anos" value={periodoUnico} checked={periodoUnico} onChange={() => { setPeriodoUnico(!periodoUnico) }} />
                    </div>
                </div>
            </section>

            <AlertCard variant='allInfo' icon={faCircleInfo} product="Todos os Produtos" period={perido} />

            <section id={styles.primaryInfos}>
                <div className={styles.navMap}>

                    {/* Legenda do mapa do brasil */}
                    <p className={styles.mapDescription}>{getDescriptionText()}</p>

                    {/* Nomes dos estados */}
                    <div id={styles.statesListContainer}>
                        {statesList.length >= 1 &&
                            <p className={styles.statesList}>
                                [
                                {statesList[0] && <>
                                    <span onClick={() => { removeStateByIndex(0) }} style={{ color: 'var(--base-green)' }}> <FontAwesomeIcon icon={faX} className={styles.icon} /> {statesList[0].state} </span> </>}
                                {statesList[1] && <> |
                                    <span onClick={() => { removeStateByIndex(1) }} style={{ color: 'var(--base-teal)' }}> <FontAwesomeIcon icon={faX} className={styles.icon} /> {statesList[1].state} </span> </>}
                                ]
                            </p>
                        }
                    </div>

                    {/* Exibir região selecionada */}
                    {(region && !state) && (
                        <h2 className={styles.mapCurrentState}>Região {region}</h2>
                    )}

                    <MultiBrazilMap onRegionChange={({ regiao, estado, uf }) => {
                        setRegion(`REGIAO ${regiao.toUpperCase().replace('-', ' ')}`)
                        setState(estado || '');
                        setUf(uf || '');
                    }} />
                </div>

                <section className={`${styles.infoGridVertical} infoGridVertical`}>
                    <section className="topArea">
                        <div className="gridItem">
                            <IconTitle title="Balança Comercial" variant="lineChart" />
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={statesData.map(state => state.balanca?.map(item => item.total))}
                                    dataName={statesList.map((state) => state.state)}
                                    colorPalette={["#D92B66", "#028391"]}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="midArea">
                        <AlertCard variant='comparisonInfo' icon={faCircleInfo} region={["Brasil", "São Paulo"]} />
                    </section>

                    <section className="bottomArea">
                        <ColorCard color="#D92B66" title={statesList[0] ? statesList[0].uf : 'UF 1'} region={statesList[0] ? statesList[0].state : 'Estado 1'} />
                        <ColorCard color="#028391" title={statesList[1] ? statesList[1].uf : 'UF 2'} region={statesList[1] ? statesList[1].state : 'Estado 2'} />
                    </section>
                </section>
            </section>

            <section id={styles.ExpImpInfos}>
                <TabNavigation tab={tab} onTabClick={(tabTradeType) => (setTradeType(tabTradeType))} />
                <section id={styles.mainInfosArea}>
                    {/* Estado 1 */}
                    <section className="infoGridVertical">
                        <section className="topArea">
                            <h3 className={styles.stateTitle}>{statesList[0] ? statesList[0].state : 'Estado 1'}</h3>
                        </section>
                        <section className="midArea">
                            <div className="gridItem">
                                <IconTitle variant="map" title="Principais Países" />
                                <div className="componentWrapper">
                                    <WorldMap
                                        selectedRegion="Norte"
                                        tradeType="exportacao"
                                        colorPalette={["#B81D4E", "#D92B66", "#F5A4C3", "#F1A1B5"]}
                                        countryDatas={{
                                            exportacao: statesData[0]?.countries
                                                ? statesData[0].countries.map((country) => ({
                                                    country: country.NO_PAIS,
                                                    quantidade: Number(country.TOTAL_REGISTROS),
                                                    vl: Number(country.TOTAL_VL_AGREGADO),
                                                    kg: Number(country.TOTAL_KG_LIQUIDO),
                                                }))
                                                : [],
                                        }}
                                    />
                                </div>
                            </div>
                        </section>
                        <section className="bottomArea">
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais Vias Usadas" size='textLight' />
                                <div className="componentWrapper" style={{ padding: 0 }}>
                                    <BarChart
                                        items={statesData[0]?.vias?.map(item => item.NO_VIA)}
                                        values={statesData[0]?.vias?.map(item => item.total)}
                                        colorPalette={["#D92B66"]}
                                        isQuarter={true}
                                    />
                                </div>
                            </div>
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais URF's Usadas" size='textLight' />
                                <div className="componentWrapper" style={{ padding: 0 }}>
                                    <BarChart
                                        items={statesData[0]?.urfs?.map(item => item.NO_URF)}
                                        values={statesData[0]?.urfs?.map(item => item.total)}
                                        colorPalette={["#D92B66"]}
                                        isQuarter={true}
                                    />
                                </div>
                            </div>
                        </section>
                    </section>

                    {/* Estado 2 */}
                    <section className="infoGridVertical">
                        <section className="topArea">
                            <h3 className={styles.stateTitle}> {statesList[1] ? statesList[1].state : 'Estado 2'}</h3>
                        </section>
                        <section className="midArea">
                            <div className="gridItem">
                                <IconTitle variant="map" title="Principais Países" />
                                <div className="componentWrapper">
                                    <WorldMap
                                        selectedRegion="Norte"
                                        tradeType="exportacao"
                                        colorPalette={["#16707A", "#028391", "#80B8B8", "#A0D0D0"]}
                                        countryDatas={{
                                            exportacao: statesData[1]?.countries
                                                ? statesData[1].countries.map((country) => ({
                                                    country: country.NO_PAIS,
                                                    quantidade: Number(country.TOTAL_REGISTROS),
                                                    vl: Number(country.TOTAL_VL_AGREGADO),
                                                    kg: Number(country.TOTAL_KG_LIQUIDO),
                                                }))
                                                : [],
                                        }}
                                        isQuarter={true}
                                    />
                                </div>
                            </div>
                        </section>
                        <section className="bottomArea">
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais Vias Usadas" size='textLight' />
                                <div className="componentWrapper" style={{ padding: 0 }}>
                                    <BarChart
                                        items={statesData[1]?.vias?.map(item => item.NO_VIA)}
                                        values={statesData[1]?.vias?.map(item => item.total)}
                                        colorPalette={["#028391"]}
                                        isQuarter={true}
                                    />
                                </div>
                            </div>
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais URF's Usadas" size='textLight' />
                                <div className="componentWrapper" style={{ padding: 0 }}>
                                    <BarChart
                                        items={statesData[1]?.urfs?.map(item => item.NO_URF)}
                                        values={statesData[1]?.urfs?.map(item => item.total)}
                                        colorPalette={["#028391"]}
                                        isQuarter={true}
                                    />
                                </div>
                            </div>
                        </section>
                    </section>
                </section>

                <section className="infoGridHorizontal lineChartsArea" id={styles.halfGrid}>
                    <section className="leftArea">
                        <div className="gridItem">
                            <IconTitle title="Valor Agregado" variant="lineChart" />
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={statesData.map(state => state.vlAgregado?.map(item => item.total))}
                                    dataName={statesList.map((state) => state.state)}
                                    colorPalette={["#D92B66", "#028391"]}
                                />
                            </div>
                        </div>
                    </section>
                    <section className="rightArea">
                        <div className="gridItem">
                            <IconTitle title="Quilograma Líquido" variant="lineChart" size='textLight' />
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={statesData.map(state => state.kgLiq?.map(item => item.total))}
                                    dataName={statesList.map((state) => state.state)}
                                    colorPalette={["#D92B66", "#028391"]}
                                    legends="false"
                                />
                            </div>
                        </div>
                        <div className="gridItem">
                            <IconTitle title="Valor FOB" variant="lineChart" size="textLight" />
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                    values={statesData.map(state => state.vlFob?.map(item => item.total))}
                                    dataName={statesList.map((state) => state.state)}
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