// Importando biblioteca de terceiros
import { useState } from 'react'

// Importando componentes e api
import api from '../../api/api'
import Button from '../../components/Buttons/Button/Button'

// Importando CSS e Componentes
import styles from './Statistics.module.css'
import LineChart from '../../components/Charts/LineChart'
import BarChart from '../../components/Charts/BarChart'
import InfoCard from '../../components/Cards/InfoCard/Card'
import AlertCard from '../../components/Cards/AlertCard/AlertCard'
import BrazilMap from '../../components/Maps/BrazilMap'
import WorldMap from '../../components/Maps/WorldMap'
import Input from '../../components/Input/Input'
import IconTitle from '../../components/IconTitle/IconTitle'
import TabNavigation from '../../components/Tab/TabNavigation'

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

const Statistics = () => {
    // ESTADO YEAR(ANO) EXEMPLO PARA TESTE
    const [year, setYear] = useState(null)

    // MÉTODO QUE DISPARA A REQUISIÇÃO PARA O BACKEND
    const getByYear = async (year) => {
        try {
            const response = await api.get(`/exportacao/vl_agregado/${year}`)

            const data = response.data

            console.log(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

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
            <AlertCard icon={faCircleInfo} product="Todos os Produtos" region="Brasil" period={[2019 , 2020]}/>



        {/* Primeiras Informações da Página + mapa do brasil */}
        <section id={styles.primaryInfos}>
            {/* Mapa do Brasil */}
            <div className={styles.navMap}>
                <BrazilMap/>
            </div>
            
            {/* Molde de Grid Vertical Reutilizável */}
            <section className="infoGridVertical">
                {/* Parte de Cima */}
                <section className="topArea">
                    <div className="gridItem">
                        <IconTitle title="Balança Comercial" variant="lineChart" size='medium'/>
                        <LineChart
                            period={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun" , "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                            values={[35, -12, 48, 5, -27, 100, 22, -40, 10, 55, -18, 30]}
                            dataName="Balança Comercial"
                            colorPalette={["#D92B66"]}
                        />
                    </div>
                </section>

                {/* Parte de Baixo */}
                <section className="bottomArea">
                    {/* Item 1 */}
                    <InfoCard title="Exportação" fatorAgregado="Muito manufaturado" produto="Grãos de Soja"/>
                    {/* Item 2 */}
                    <InfoCard title="Importação" fatorAgregado="Pouco manufaturado" produto="Grãos de Arroz"/>
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
                        <IconTitle variant="map" title="Principais Países" size='medium'/>
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
                        <IconTitle variant="barChart" title="Principais Vias Usadas" size='light'/>
                        <BarChart
                            items={["Via Aquífera" , "Via Rodoviária" , "Via Aérea"]}
                            values={[512, 485, 271]}
                            colorPalette={["#D92B66"]}
                        />
                    </div>
                    {/* Item 2 */}
                    <div className="gridItem">
                        <IconTitle variant="barChart" title="Principais Vias Usadas" size='light'/>
                        <BarChart
                            items={["Porto 123" , "Rodovia 123" , "Aeroporto 123"]}
                            values={[52, 45, 21]}
                            colorPalette={["#D92B66"]}
                        />
                    </div>
                </section>
            </section>

                {/* Molde de Grid Horizontal Reutilizável */}
                <section className="infoGridHorizontal">
                    {/* Parte da Esquerda */}
                    <section className="leftArea">
                        <div className="gridItem">
                            <IconTitle title="Valor Agregado" variant="lineChart" size='medium'/>
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
                            <IconTitle title="Quilograma Líquido" variant="lineChart" size='light'/>
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
                            <IconTitle title="Valor FOB" variant="lineChart" size="light"/>
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

export default Statistics