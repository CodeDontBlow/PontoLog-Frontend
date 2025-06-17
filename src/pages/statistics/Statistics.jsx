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
import TabNavigation from '../../components/Tab/TabNavigation'
import { regionColors } from '../../components/Maps/BrazilMap'

import styles from './Statistics.module.css'
import Alert from '../../components/Alert/Alert'

const Statistics = () => {
    // STATES DOS FILTROS
    // Produto
    const [sh, setSh] = useState('sh4');
    const [product, setProduct] = useState('');

    // Período
    const [initYear, setInitYear] = useState(2014);
    const [finalYear, setFinalYear] = useState(2024);
    const [periodoUnico, setPeriodoUnico] = useState(false);
    const [period, setPeriodo] = useState([initYear, finalYear]);

    // Estado
    const [region, setRegion] = useState('');
    const [state, setState] = useState('');
    const [uf, setUf] = useState('');

    const [tradeType, setTradeType] = useState('exportacao');

    // state de opções dos inputs
    const [opcoesDeProduto, setOpcoesDeProduto] = useState([]);
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const [anos, setAnos] = useState(() =>
        Array.from({ length: finalYear - initYear + 1 }, (_, i) => initYear + i)
    );

    const [balancoData, setBalancoData] = useState();
    const [exportProduct, setExportProduct] = useState();
    const [importProduct, setImportProduct] = useState();
    const [exportFat, setExportFat] = useState();
    const [importFat, setImportFat] = useState();
    const [exportData, setExportData] = useState();
    const [importData, setImportData] = useState();
    const [mainData, SetMainData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');

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
        let regiao = regiaoFormatada()
        // Pega o nome da cor de acordo com a região || ou define como rosa
        let colorName = (regiao && state) ? regionColors[regiao] : 'pink'

        // Muda o objeto pageColors para a cor da região
        setPageColors(
            {
                700: `var(--${colorName}-700)`,
                base: `var(--base-${colorName})`,
                500: `var(--${colorName}-500)`,
                300: `var(--${colorName}-300)`,
            }
        )
    }, [state , region]);

    // Muda a variável CSS highlight, que recebe o valor da cor atual
    useEffect( () => {
        let regiao = regiaoFormatada()
        let colorName = state ? regionColors[regiao] : 'pink'
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

    // reset de cor ao trocar de página
        return () => {
            for (let key of arrayOrder) {
                element.style.setProperty(`--highlight-${key}`, '');
            }
        };
    }, [pageColors]);


    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedGetProductByLetter = useCallback(debounce(getProductByLetter, 50), [sh]);

        useEffect(() => {
        if (periodoUnico && finalYear) { 
            setPeriodo([initYear, finalYear])
        } else {
            setPeriodo([initYear])
        }
    }, [initYear, finalYear, periodoUnico])


    // Filtra os anos de término para serem > initYear (se initYear existir)
    const filteredFinalYears = initYear 
        ? years.filter(year => year > initYear) 
        : years;

    // Filtra os anos de início para serem < finalYear (se finalYear existir)
    const filteredInitYears = finalYear 
        ? years.filter(year => year < finalYear) 
        : years;


    useEffect(() => {
        const controller = new AbortController();
        let isCancelled = false;

        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    initYear,
                    region,
                    uf,
                    product,
                    sh,
                    finalYear,
                    periodoUnico,
                    signal: controller.signal
                };

                const [
                    balancoData,
                    importFat,
                    exportFat,
                    exportProduct,
                    importProduct,
                    exportData,
                    importData
                ] = await Promise.all([
                    fetchData({ ...params, endpoint: 'balanco' }),
                    fetchData({ ...params, tradeType: 'exportacao', endpoint: 'fat' }),
                    fetchData({ ...params, tradeType: 'importacao', endpoint: 'fat' }),
                    fetchData({ ...params, tradeType: 'exportacao', endpoint: 'product' }),
                    fetchData({ ...params, tradeType: 'importacao', endpoint: 'product' }),
                    fetchData({ ...params, tradeType: 'exportacao' }),
                    fetchData({ ...params, tradeType: 'importacao' })
                ]);

                if (!isCancelled) {
                    setBalancoData(balancoData);
                    setExportFat(exportFat);
                    setImportFat(importFat);
                    setExportProduct(exportProduct);
                    setImportProduct(importProduct);
                    setExportData(exportData);
                    setImportData(importData);
                }
            } catch (error) {
                if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
                    console.warn('Requisições canceladas.');
                    return; // apenas ignora o erro de cancelamento
                }
                console.error('Error fetching data: ', error);
            } finally {
                if (!isCancelled) {
                    setAlertMessage(
                        `Dados atualizados! ${uf ? `Exibindo informações para ${state}. ` : ''}Os resultados refletem os parâmetros escolhidos na pesquisa.`
                    );
                    setAlertVariant('success')
                    setShowAlert(true)
                    setIsLoading(false);
                }
            }
        };

        fetchAllData();

        return () => {
            isCancelled = true; // não finaliza loading nem atualiza estado após o cancelamento
            controller.abort();
        };
    }, [product, initYear, finalYear, periodoUnico, sh, uf]);


    useEffect(() => {
        if (product.length > 0) {
            getProductByLetter(product, setOpcoesDeProduto, sh);
        }
    }, [product, sh]);

    useEffect(() => {
        if (tradeType === 'exportacao' && exportData) {
            SetMainData(exportData);
        }
    }, [tradeType, exportData]);

    useEffect(() => {
        if (tradeType === 'importacao' && importData) {
            SetMainData(importData);
        }
    }, [tradeType, importData]);

    useEffect(() => {
        console.log(periodoUnico)
    }, [periodoUnico])

    // Criando objetos TAB
    const tab = [
        { id: 1, label: "Exportações", tradeType: "exportacao" },
        { id: 2, label: "Importações", tradeType: "importacao" },
    ]

    const regiaoFormatada = () => {
        if (!region) return null

        const prefixRemoved = region.replace("REGIAO ", '');
        const finalRegionStr = prefixRemoved[0] + prefixRemoved.slice(1).toLowerCase();

        if (finalRegionStr === 'Centro oeste') return 'Centro-Oeste';

        return finalRegionStr;
    }

    return (
        <div id={styles.statisticsPage}>

            {/* Área dos Inputs */}
            <section id="inputArea">
                {/* PRODUTO */}
                <div id="productContainer">
                    {/* LABEL */}
                    <label htmlFor="" className="productLabel labels"> Produtos </label>

                    {/* INPUT */}
                    <Dropdown search={true} placeholder={"Pesquisar..."} options={opcoesDeProduto.length > 0 ? opcoesDeProduto : ['...']} value={product} onChange={(e) => {
                        const value = e.target.value;
                        setProduct(value);
                        debouncedGetProductByLetter(value);
                    }}
                        onSelect={(produto) => setProduct(produto)} />

                    {/* OPÇÕES */}
                    <div className="productOptions options">
                        {/* SH4 */}
                        <input type="radio" name="sh-selection" id="sh4" defaultChecked
                            onClick={() => {
                                setSh('sh4');
                                setProduct('');
                                setOpcoesDeProduto([])
                            }} />
                        <label htmlFor="sh4"> SH4 </label>

                        {/* SH6 */}
                        <input type="radio" name="sh-selection" id="sh6"
                            onClick={() => {
                                setSh('sh6');
                                setProduct('');
                                setOpcoesDeProduto('')
                            }} />
                        <label htmlFor="sh6"> SH6 </label>
                    </div>

                </div>

                {/* PERÍODO */}
                <div id="periodContainer">
                    {/* LABEL */}
                    <label className="periodLabel labels" htmlFor="">Período de Tempo</label>

                    {/* INPUT */}
                    <div className="periodInputs">
                        {/* Primeiro Ano do Período*/}
                        <div className="firstYear">
                            <Dropdown label={"Ano de Início"} options={filteredInitYears} placeholder={"Ano de Início"} value={initYear} onSelect={(year) => setInitYear(year)} />
                        </div>

                        {/* Último Ano do Período */}
                        {periodoUnico &&
                            <div className="lastYear">
                                <Dropdown label={"Ano de Término"} options={filteredFinalYears} placeholder={"Ano de Término"} value={finalYear} onSelect={(year) => setFinalYear(year)} />
                            </div>
                        }
                    </div>

                    {/* OPÇÕES */}
                    <div className="periodOptions options">
                        <Checkbox label="Ativar busca por um período entre 2 anos" value={periodoUnico} checked={periodoUnico} onChange={() => { setPeriodoUnico(!periodoUnico) }} />
                    </div>

                </div>

            </section>

            {/* Alerta de quais Informações estão sendo exibidas */}
            <AlertCard variant="allInfo" icon={faCircleInfo} product={product} region={state} period={period} />


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
                        <h2 className={styles.mapCurrentState}>Região {regiaoFormatada()}</h2>
                    ) : null}
                    <BrazilMap onRegionChange={({ regiao, estado, uf }) => {
                        if (regiao === null) {
                            setRegion('');
                            setState('');
                            setUf('');
                        } else {
                            setRegion(`REGIAO ${regiao.toUpperCase().replace('-', ' ')}`);
                            setState(estado || '');
                            setUf(uf || '');
                        }
                    }} 
                    />
                </div>

                {/* Molde de Grid Vertical Reutilizável */}
                <section className="infoGridVertical">
                    {/* Parte de Cima */}
                    <section className="topArea">
                        <div className="gridItem">
                            <IconTitle title="Balança Comercial" variant="lineChart" size='textMedium' color={pageColors.base}/>
                            <div className="componentWrapper">
                                <LineChart
                                    loading={isLoading}
                                    period={!periodoUnico ? meses : anos}
                                    values={balancoData?.map(bal => Number(bal.total))}
                                    dataName="Balança Comercial"
                                    colorPalette={hexColors}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Parte de Baixo */}
                    <section className="bottomArea">
                        {/* Item 1 */}
                        <InfoCard skeleton={isLoading} title="Exportação" fatorAgregado={exportFat} produto={exportProduct} />
                        {/* Item 2 */}
                        <InfoCard skeleton={isLoading} title="Importação" fatorAgregado={importFat} produto={importProduct} />
                    </section>
                </section>
            </section>

            {/* Informação completas de Exportação ou Importação */}
            <section id={styles.ExpImpInfos}>


                {/* Deve-se definir melhor o uso do tab navigation!!! */}
                <TabNavigation tab={tab} onTabClick={(tabTradeType) => (setTradeType(tabTradeType))} />


                {/* Molde de Grid Horizontal Reutilizável */}
                <section className="infoGridHorizontal">
                    {/* Parte da Esquerda (Mapa do Mundo) */}
                    <section className="leftArea">
                        <div className="gridItem">
                            <IconTitle variant="map" title="Principais Países" size='textMedium' color={pageColors.base} />
                            <div className="componentWrapper" color={pageColors.base}>
                                <WorldMap
                                    loading={isLoading}
                                    selectedRegion="Norte"
                                    tradeType="exportacao"
                                    colorPalette={hexColors}
                                    countryDatas={{
                                        exportacao: (mainData?.overallCountries ?? []).map(c => ({
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
                            <IconTitle variant="barChart" title="Principais Vias Usadas" size='textLight' color={pageColors.base}/>

                            <div className="componentWrapper">
                                <BarChart
                                    skeleton={isLoading}
                                    items={mainData?.via?.map(via => via.NO_VIA)}
                                    values={mainData?.via?.map(via => Number(via.total))}
                                    colorPalette={hexColors}
                                />
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="gridItem">
                            <IconTitle variant="barChart" title="Principais URFs" size='textLight'  color={pageColors.base}/>
                            <div className="componentWrapper">
                                <BarChart
                                    skeleton={isLoading}
                                    items={mainData?.urf?.map(urf => urf.NO_URF)}
                                    values={mainData?.urf?.map(urf => Number(urf.total))}
                                    colorPalette={hexColors}
                                />
                            </div>
                        </div>
                    </section>
                </section>

                {/* Molde de Grid Horizontal Reutilizável */}
                <section className="infoGridHorizontal">
                    {/* Parte da Esquerda */}
                    <section className="leftArea">
                        <div className="gridItem">
                            <IconTitle title="Valor Agregado" variant="lineChart" size='textMedium' color={pageColors.base} />
                            <div className="componentWrapper">
                                <LineChart
                                    loading={isLoading}
                                    period={!periodoUnico ? meses : anos}
                                    values={mainData?.vlAgregado?.map(value => Number(value.total))}
                                    dataName="Valor Agregado"
                                    colorPalette={hexColors}
                                />
                            </div>
                        </div>
                    </section>
                    {/* Parte da Direita */}
                    <section className="rightArea">
                        {/* Item 1 */}
                        <div className="gridItem">
                            <IconTitle title="Quilograma Líquido" variant="lineChart" size='textLight' color={pageColors.base} />
                            <div className="componentWrapper">
                                <LineChart
                                    loading={isLoading}
                                    period={!periodoUnico ? meses : anos}
                                    values={mainData?.kgLiquido?.map(value => Number(value.total))}
                                    dataName="kg_liquido"
                                    colorPalette={hexColors}
                                    id="bottomInfo11"
                                    group="bottomInfo1"
                                />
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="gridItem">
                            <IconTitle title="Valor FOB" variant="lineChart" size='textLight' color={pageColors.base} />
                            <div className="componentWrapper">
                                <LineChart
                                    loading={isLoading}
                                    period={!periodoUnico ? meses : anos}
                                    values={mainData?.vlFob?.map(value => Number(value.total))}
                                    dataName="vl_fob"
                                    colorPalette={hexColors}
                                    id="bottomInfo11"
                                    group="bottomInfo1"
                                />
                            </div>
                        </div>
                    </section>
                </section>
            </section>

            {showAlert &&
                (
                    <Alert
                        type={alertVariant}
                        message={alertMessage}
                        onClose={() => setShowAlert(false)}
                    />
                )
            }

        </div>
    )
}

export default Statistics;