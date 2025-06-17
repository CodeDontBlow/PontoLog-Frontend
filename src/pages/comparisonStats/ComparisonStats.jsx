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
import Alert from '../../components/Alert/Alert'

import { regionColors } from '../../components/Maps/BrazilMap'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ComparisonStats = () => {

    // STATES DOS FILTROS
    const [product, setProduct] = useState('')
    const [sh, setSh] = useState('sh4');
    const [periodoUnico, setPeriodoUnico] = useState(false);
    const [initYear, setInitYear] = useState(2014)
    const [finalYear, setFinalYear] = useState(2024)
    const [period, setPeriodo] = useState([initYear, finalYear])
    const [region, setRegion] = useState('');
    const [state, setState] = useState('');
    const [uf, setUf] = useState('');
    const [statesList, setStatesList] = useState([
        {
            state: "São Paulo",
            uf: "SP",
            region: "REGIAO SUDESTE"
        },
        {
            state: "Distrito Federal",
            uf: "DF",
            region: "REGIAO CENTRO OESTE"
        }
    ]);
    // Variável usada para display dos estados
    const [statesDisplay , setStatesDisplay] = useState([
        { 
            state:'São Paulo', 
            uf:'SP' 
        },
        { 
            state:'Distrito Federal', 
            uf:'DF' 
        }
    ])
    const [mainData, SetMainData] = useState('exportData')
    const [opcoesDeProduto, setOpcoesDeProduto] = useState([])
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    const [tradeType, setTradeType] = useState('exportacao');
    const [statesData, setStatesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // states do alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const [anos, setAnos] = useState(() =>
        Array.from({ length: finalYear - initYear + 1 }, (_, i) => initYear + i)
    );

    // Mudando a lista de estados quando um estado novo for selecionado
    useEffect(() => {
        // Se o estado 2 for igual ao estado 1, retorna como erro
        if (state) {
            if (statesList[0]?.state == state) {
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
    
    // Muda a variável que exibe os estados selecionados atualmente (somente para interface)
    useEffect(() => {
        if (statesList.length === 2){
            setStatesDisplay([
                {
                    state: statesList[0].state,
                    uf: statesList[0].uf
                },
                {
                    state: statesList[1].state,
                    uf: statesList[1].uf
                }
            ])
        }
    }, [statesList])

    useEffect(() => {
        console.log(isLoading)
    }, [isLoading])

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

     // TROCA DINAMICA DE CORES
    // Lista com o código das cores atuais
    const [hexColors , setHexColors] = useState([
        // Teal para SP
        {
            state: 'São Paulo',
            700: '#16707A',
            main: '#028391',
            base: '#028391',
            500: '#80B8B8',
            300: '#A0D0D0',
        },
        // Sun para o DF
        {
            state: 'Distrito Federal',
            700: '#D88938',
            main: '#F79F44',
            base: '#F79F44',
            500: '#FDD080',
            300: '#EBD29B',
        }
    ])

    // Muda o array HexColors, que recebe os valores das cores atuais
    useEffect(() => {

        if (statesList.length === 2) {
            const computed = getComputedStyle(document.documentElement);
            const objectKeys = [700, "base", 500, 300];

            const updatedHexColors = statesList.map((stateObj , index) => {
                let regiao = regiaoFormatada(stateObj.region)
                let colorName = regionColors[regiao]
                
                let colorsObject = {state: stateObj.state}
                for(let key of objectKeys){
                    let hexCode = key === 'base' 
                    ? computed.getPropertyValue(`--base-${colorName}`)
                    : computed.getPropertyValue(`--${colorName}-${key}`)

                    colorsObject[key] = hexCode
                }

                if(statesList[0].region === statesList[1].region){
                    if(index === 0){
                        colorsObject.main = colorsObject[700]
                    }
                    else{
                        colorsObject.main = colorsObject[500]
                    }
                }
                else{
                    colorsObject.main = colorsObject.base
                }
                return colorsObject
            })

            setHexColors(updatedHexColors);
        }
    }, [statesList]);

    

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedGetProductByLetter = useCallback(debounce(getProductByLetter, 50), [sh]);

    useEffect(() => {
        const controller = new AbortController();
        let isCancelled = false;

        const fetchStateData = async (uf, region) => {
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
                    exportData,
                    importData
                ] = await Promise.all([
                    fetchData({ ...params, endpoint: 'balanco' }),
                    fetchData({ ...params, tradeType: 'exportacao' }),
                    fetchData({ ...params, tradeType: 'importacao' })
                ]);

                return {
                    estado: uf,
                    balancoData,
                    exportData,
                    importData
                };
            } catch (error) {
                if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
                    console.warn(`Requisições do estado ${uf} canceladas.`);
                    return;
                }
                console.error('Error fetching data: ', error);
            }
        };

        const fetchAllStatesData = async () => {
            setIsLoading(true);
            try {
                const results = await Promise.all(
                    statesList.map((state) => fetchStateData(state.uf, state.region))
                );
                if (!isCancelled) {
                    setStatesData(results);
                }
            } finally {
                if (!isCancelled) {
                    setAlertMessage(
                        `Dados atualizados para ${statesList[0]?.state || 'Estado 1'} e ${statesList[1]?.state || 'Estado 2'} estão sendo exibidos conforme os parâmetros selecionados.`
                    )
                    setAlertVariant('success')
                    setShowAlert(true)
                    setIsLoading(false);
                }
            }
        };

        if (statesList.length > 1) {
            fetchAllStatesData();
        } else {
            setIsLoading(true)
            setAlertMessage("Por favor, selecione dois estados para visualizar os dados. Caso seja necessário visualizar apenas um, utilize a página de estatísticas.")
            setAlertVariant('warning')
            setShowAlert(true)
            setStatesData([]);
        }

        return () => {
            isCancelled = true;
            controller.abort();
        };
    }, [product, sh, periodoUnico, initYear, finalYear, statesList]);


    useEffect(() => {
        {
            if (tradeType === 'exportacao') {
                SetMainData('exportData');
            } else {
                SetMainData('importData');
            }
        }
    }, [tradeType, statesData]);

    useEffect(() => {
        console.log(statesList)
    }, [statesList])

    useEffect(() => {
        if (product.length > 0) {
            getProductByLetter(product, setOpcoesDeProduto, sh);
        }
    }, [product, sh]);

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

    
    // Criando objetos TAB
    const tab = [
        { id: 1, label: "Exportações", tradeType: "exportacao" },
        { id: 2, label: "Importações", tradeType: "importacao" },
    ]

    const regiaoFormatada = (r) => {
        const prefixRemoved = r.replace("REGIAO ", '');

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
                                <Dropdown label={"Ano de Término"} options={filteredFinalYears} placeholder={"Ano de Término"} value={finalYear} onSelect={(year) => setFinalYear(year)}/>
                            </div>
                        }
                    </div>

                    {/* OPÇÕES */}
                    <div className="periodOptions options">
                        <Checkbox label="Ativar busca por um período entre 2 anos" value={periodoUnico} checked={periodoUnico} onChange={() => { setPeriodoUnico(!periodoUnico) }} />
                    </div>

                </div>

            </section>

            <AlertCard variant='allInfoComparacao' icon={faCircleInfo} product={product} period={period} />

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
                                    <span 
                                        onClick={() => { removeStateByIndex(0) }} 
                                        style={{color : statesList.length === 2 ? hexColors[0]?.main : 'var(--black-300)'}}> 
                                        <FontAwesomeIcon icon={faX} className={styles.icon} /> {statesList[0].state} 
                                    </span> </>
                                }
                                {statesList[1] && <> |
                                    <span 
                                        onClick={() => { removeStateByIndex(1) }}
                                        style={{ color: hexColors[1]?.main}}> 
                                        <FontAwesomeIcon icon={faX} className={styles.icon} /> {statesList[1].state}
                                    </span> </>
                                }]
                            </p>
                        }
                    </div>

                    {/* Exibir região selecionada */}
                    {(region && !state) &&

                        (
                            <h2 className={styles.mapCurrentState}>Região {regiaoFormatada(region)}</h2>
                        )}

                    <MultiBrazilMap onRegionChange={({ regiao, estado, uf }) => {
                        setRegion(`REGIAO ${regiao.toUpperCase().replace('-', ' ')}`)
                        setState(estado || '');
                        setUf(uf || '');
                    }} />
                </div>

                <section className={`${styles.infoGridVertical} infoGridVertical`}>
                    <section className="topArea">
                        <div className="gridItem" style={{color:`var(--base-pink)`}}>
                            <IconTitle title="Balança Comercial" variant="lineChart" color='var(--base-pink)'/>
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    loading={isLoading}
                                     period={!periodoUnico ? meses : anos}
                                    values={statesData.map(state => state.balancoData?.map(item => item.total))}
                                    dataName={statesList.map((state) => state.state)}
                                    colorPalette={[hexColors[0].main , hexColors[1].main]}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="midArea">
                        <AlertCard variant='comparisonInfo' icon={faCircleInfo} region={[
                            statesDisplay[0]?.state, 
                            statesDisplay[1]?.state
                        ]} 
                        colorPalette={[
                            hexColors[0].base, 
                            hexColors[1].base
                            ]}/>
                    </section>

                    <section className="bottomArea">
                        <ColorCard 
                            color= { hexColors [0]?.main }  
                            title= { statesDisplay[0]?.uf } 
                            region={ statesDisplay[0]?.state } 
                        />
                        <ColorCard 
                            color= { hexColors [1]?.main}  
                            title= { statesDisplay[1]?.uf } 
                            region={ statesDisplay[1]?.state } 
                        />
                    </section>
                </section>
            </section>

            <section id={styles.ExpImpInfos}>
                <TabNavigation tab={tab} onTabClick={(tabTradeType) => (setTradeType(tabTradeType))} />
                <section id={styles.mainInfosArea}>

                    {/* Estado 1 */}
                    <section className="infoGridVertical" style={{color: hexColors[0].main}}>
                        <section className="topArea">
                            <h3 className={styles.stateTitle}>{statesList[0] ? statesList[0].state : 'Estado 1'}</h3>
                        </section>
                        <section className="midArea">
                            <div className="gridItem">
                                <IconTitle variant="map" title="Principais Países" />
                                <div className="componentWrapper">
                                    <WorldMap
                                        loading={isLoading}
                                        selectedRegion="Norte"
                                        tradeType="exportacao"
                                        colorPalette={[
                                            hexColors[0][700],
                                            hexColors[0]['base'],
                                            hexColors[0][500],
                                            hexColors[0][300],
                                        ]}
                                        countryDatas={{
                                            exportacao: statesData[0]?.[mainData]
                                                ? statesData[0][mainData]
                                                    .overallCountries
                                                    .map((country) => ({
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
                                        skeleton={isLoading}
                                        items={statesData[0]?.[mainData]?.via?.map(item => item.NO_VIA)}
                                        values={statesData[0]?.exportData?.via?.map(item => item.total)}
                                        colorPalette={[
                                            hexColors[0]['main']
                                        ]}
                                        isQuarter={true}
                                    />
                                </div>
                            </div>
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais URF's Usadas" size='textLight' />
                                <div className="componentWrapper" style={{ padding: 0 }}>
                                    <BarChart
                                        skeleton={isLoading}
                                        items={statesData[0]?.[mainData]?.urf?.map(item => item.NO_URF)}
                                        values={statesData[0]?.[mainData]?.urf?.map(item => item.total)}
                                        colorPalette={[
                                            hexColors[0]['main']
                                        ]}
                                        isQuarter={true}
                                    />
                                </div>
                            </div>
                        </section>
                    </section>

                    {/* Estado 2 */}
                    <section className="infoGridVertical" style={{color: hexColors[1].main}}>
                        <section className="topArea">
                            <h3 className={styles.stateTitle}> {statesList[1] ? statesList[1].state : 'Estado 2'} </h3>
                        </section>
                        <section className="midArea">
                            <div className="gridItem">
                                <IconTitle variant="map" title="Principais Países" />
                                <div className="componentWrapper">
                                    <WorldMap
                                        loading={isLoading}
                                        selectedRegion="Norte"
                                        tradeType="exportacao"
                                        colorPalette={[
                                            hexColors[1][700],
                                            hexColors[1]['base'],
                                            hexColors[1][500],
                                            hexColors[1][300],
                                        ]}
                                        countryDatas={{
                                            exportacao: statesData[1]?.[mainData]
                                                ? statesData[1][mainData]
                                                    .overallCountries
                                                    .map((country) => ({
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
                                        skeleton={isLoading}
                                        items={statesData[1]?.[mainData]?.via?.map(item => item.NO_VIA)}
                                        values={statesData[1]?.[mainData]?.via?.map(item => item.total)}
                                        colorPalette={[
                                            hexColors[1]['main']
                                        ]}
                                        isQuarter={true}
                                    />
                                </div>
                            </div>
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais URF's Usadas" size='textLight' />
                                <div className="componentWrapper" style={{ padding: 0 }}>
                                    <BarChart
                                        skeleton={isLoading}
                                        items={statesData[1]?.[mainData]?.urf?.map(item => item.NO_URF)}
                                        values={statesData[1]?.[mainData]?.urf?.map(item => item.total)}
                                        colorPalette={[
                                            hexColors[1]['main']
                                        ]}
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
                            <IconTitle title="Valor Agregado" variant="lineChart" color='var(--base-pink)'/>
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    loading={isLoading}
                                     period={!periodoUnico ? meses : anos}
                                    values={statesData.map(state => state[mainData]?.vlAgregado?.map(item => item.total))}
                                    dataName={statesList.map((state) => state.state)}
                                    colorPalette={ [hexColors[0].main , hexColors[1].main] }
                                />
                            </div>
                        </div>
                    </section>
                    <section className="rightArea">
                        <div className="gridItem">
                            <IconTitle title="Quilograma Líquido" variant="lineChart" size='textLight' color='var(--base-pink)'/>
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    loading={isLoading}
                                     period={!periodoUnico ? meses : anos}
                                    values={statesData.map(state => state[mainData]?.kgLiquido?.map(item => item.total))}
                                    dataName={statesList.map((state) => state.state)}
                                    colorPalette={ [hexColors[0].main , hexColors[1].main] }
                                    legends="false"
                                />
                            </div>
                        </div>
                        <div className="gridItem">
                            <IconTitle title="Valor FOB" variant="lineChart" size="textLight" color='var(--base-pink)' />
                            <div className="componentWrapper">
                                <DoubleLineChart
                                    loading={isLoading}
                                     period={!periodoUnico ? meses : anos}
                                    values={statesData.map(state => state[mainData]?.vlFob?.map(item => item.total))}
                                    dataName={statesList.map((state) => state.state)}
                                    colorPalette={ [hexColors[0].main , hexColors[1].main] }
                                    legends="false"
                                />
                            </div>
                        </div>
                    </section>
                </section>
            </section>

            {showAlert &&
                <Alert
                    type={alertVariant}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                />
            }

        </div>
    );
};

export default ComparisonStats;