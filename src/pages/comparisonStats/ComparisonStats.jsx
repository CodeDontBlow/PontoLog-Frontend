// Importando CSS e Componentes
import styles from './ComparisonStats.module.css'
import LineChart from '../../components/Charts/LineChart'
import DoubleLineChart from '../../components/Charts/DoubleLineChart'
import ColorCard from '../../components/Cards/ColorCard/ColorCard'

import BarChart from '../../components/Charts/BarChart'
import AlertCard from '../../components/Cards/AlertCard/AlertCard'
import BrazilMap from '../../components/Maps/BrazilMap'
import WorldMap from '../../components/Maps/WorldMap'
import Input from '../../components/Input/Input'
import IconTitle from '../../components/IconTitle/IconTitle'

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
    
    return (
        <div id={styles.statisticsPage}>

            {/* TESTE DA REQUISIÇÃO */}
            {/* <input type="text" onChange={(e) => setYear(e.target.value)} />
            <Button label={'get'} onClick={() => getByYear(year)} /> */}

            {/* Área dos Inputs */}
            <section id={styles.inputArea}>
                {/* Input do Nome do Produto */}
                <div className={styles.productArea}>
                    <Input label="Nome do Produto" type="text" placeholder="Produto" id="product"/>
                    {/* Botões SH4 e SH6 */}
                    <div className={styles.inputOptions}>
                        {/* SH4 */}
                        <input type="radio" name="sh-selection" id="sh4" defaultChecked />
                        <label htmlFor="sh4"> SH4 </label>

                        {/* SH6 */}
                        <input type="radio" name="sh-selection" id="sh6" />
                        <label htmlFor="sh6"> SH6 </label>
                    </div>
                </div>

                {/* Input de Periodo de Tempo */}
                <div className={styles.periodArea}>
                    {/* Inputs */}
                    <div className={styles.periodInputs}>
                        {/* Primeiro Ano do Período */}
                        <div className={styles.firstYear}>
                            <Input label="Período de Tempo" placeholder="Ano de Início" type="number" id="firstYear"/>
                        </div>

                        {/* Último Ano do Período */}
                        <div className={styles.lastYear}>
                            <Input label="..." placeholder="Ano de Término" type="Number" id="lastYear"/>
                        </div>
                    </div>

                    {/* Checkbox (Decidir se iremos utilizar)*/}
                    {/* <div className={styles.inputOptions}> </div> */}
                </div>
            </section>



            {/* Alerta de quais Informações estão sendo exibidas */}
            <AlertCard variant='allInfo' icon={faCircleInfo} product="Todos os Produtos" period={[2019 , 2020]}/>



        {/* Primeiras Informações da Página + mapa do brasil */}
        <section id={styles.primaryInfos}>
            {/* Mapa do Brasil */}
            <div className={styles.navMap}>
                <BrazilMap/>
            </div>
            
            {/* Molde de Grid Vertical Reutilizável */}
            <section className={`${styles.infoGridVertical} infoGridVertical`}>
                {/* Parte de Cima */}
                <section className="topArea">
                    <div className="gridItem">
                        <IconTitle title="Balança Comercial" variant="lineChart"/>
                        <DoubleLineChart
                            period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                            values={[[12, 8, 5, 37, -82, 29, 45, 13, 45, 45, 73 , -3] , [35, -12, 48, 5, -27, 100, 22, -40, 10, 55, 28, 30]]}
                            dataName={["Estado 1" , "Estado 2"]}
                            colorPalette={["#D92B66" , "#028391"]}
                        />
                    </div>
                </section>

                <section className="midArea">
                    <AlertCard variant='comparisonInfo' icon={faCircleInfo} region={["Brasil" , "São Paulo"]}/>
                </section>

                {/* Parte de Baixo */}
                <section className="bottomArea">
                    {/* Item 1 */}
                    <ColorCard color="#D92B66" title="BR" region="Brasil"/>
                    {/* Item 2 */}
                    <ColorCard color="#028391" title="SP" region="São Paulo"/>
                </section>
            </section>
        </section>


        {/* Deve-se definir melhor o uso do tab navigation!!! */}
        {/* <TabNavigation tab={tabs} contents={contents} /> */}



        {/* Informação completas de Exportação ou Importação */}
        <section id={styles.ExpImpInfos}>

            {/* Dados sobre os principais (principais países, vias e URFs) */}
            <section id={styles.mainInfosArea}>
                {/*Estado 1 */}
                <section className="infoGridVertical">
                    {/* Parte de Cima (Mapa) */}
                    <section className="topArea">
                        <div className="gridItem">
                            <IconTitle variant="map" title="Principais Países"/>
                            <WorldMap
                                selectedRegion="Norte"
                                tradeType="exportacao"
                                countryDatas={dadosTeste}
                            />
                        </div>
                    </section>

                    {/* Parte de Baixo (Gráficos de Barra) */}
                    <section className="bottomArea">
                        {/* Item 1 (Principais Vias)*/}
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais Vias Usadas" size='textLight'/>
                                <BarChart
                                    items={["Via Aquífera" , "Via Rodoviária" , "Via Aérea"]}
                                    values={[512, 485, 271]}
                                    colorPalette={["#D92B66"]}
                                />
                            </div>
                        {/* Item 2 (Principais URFs) */}
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais URF's Usadas" size='textLight'/>
                                <BarChart
                                    items={["Porto 123" , "Rodovia 123" , "Aeroporto 123"]}
                                    values={[52, 45, 21]}
                                    colorPalette={["#D92B66"]}
                                />
                            </div>
                    </section>
                </section>

                {/* Estado 2 */}
                <section className="infoGridVertical">
                    {/* Parte de Cima (Mapa) */}
                    <section className="topArea">
                        <div className="gridItem">
                            <IconTitle variant="map" title="Principais Países"/>
                            <WorldMap
                                selectedRegion="Norte"
                                tradeType="exportacao"
                                countryDatas={dadosTeste}
                            />
                        </div>
                    </section>

                    {/* Parte de Baixo (Gráficos de Barra) */}
                    <section className="bottomArea">
                        {/* Item 1 (Principais Vias)*/}
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais Vias Usadas" size='textLight'/>
                                <BarChart
                                    items={["Via Aquífera" , "Via Rodoviária" , "Via Aérea"]}
                                    values={[512, 485, 271]}
                                    colorPalette={["#D92B66"]}
                                />
                            </div>
                        {/* Item 2 (Principais URFs) */}
                            <div className="gridItem">
                                <IconTitle variant="barChart" title="Principais URF's Usadas" size='textLight'/>
                                <BarChart
                                    items={["Porto 123" , "Rodovia 123" , "Aeroporto 123"]}
                                    values={[52, 45, 21]}
                                    colorPalette={["#D92B66"]}
                                />
                            </div>
                    </section>
                </section>
            </section>












                {/* Molde de Grid Horizontal Reutilizável */}
                <section className="infoGridHorizontal">
                    {/* Parte da Esquerda */}
                    <section className="leftArea">
                        <div className="gridItem">
                            <IconTitle title="Valor Agregado" variant="lineChart"/>
                            <LineChart
                                period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                values={[35, -12, 48, 5, -27, 100, 22, -40, 10, 55, -18, 30]}
                                chartTitle="Valor Agregado"
                                dataName="Balança Comercial"
                                colorPalette={["#D92B66"]}
                                id="bottomInfo11"
                                group="bottomInfo1"
                            />
                        </div>
                    </section>
                    {/* Parte da Direita */}
                    <section className="rightArea">
                        {/* Item 1 */}
                        <div className="gridItem">
                            <IconTitle title="Quilograma Líquido" variant="lineChart" size='textLight'/>
                            <LineChart
                                period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                values={[35, -12, 48, 5, -27, 100, 22, -40, 10, 55, -18, 30]}
                                dataName="kg_liquido"
                                colorPalette={["#D92B66"]}
                                id="bottomInfo12"
                                group="bottomInfo1" 
                            />
                        </div>
                        {/* Item 2 */}
                        <div className="gridItem">
                            <IconTitle title="Valor FOB" variant="lineChart" size="textLight"/>
                            <LineChart
                                period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                values={[35, -12, 48, 5, -27, 100, 22, -40, 10, 55, -18, 30]}
                                dataName="vl_fob"
                                colorPalette={["#D92B66"]}
                                id="bottomInfo13"
                                group="bottomInfo1"
                            />
                        </div>
                    </section>
                </section>


            </section>
        </div>
    )
}

export default ComparisonStats