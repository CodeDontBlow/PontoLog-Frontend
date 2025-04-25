import React , {useEffect} from "react";
import { Chart } from "react-google-charts";
import styles from "./Maps.module.css"
import { tooltip } from "leaflet";

export default function WorldMap({ selectedRegion, countryDatas, tradeType, setTradeType}) {
  const regionColor = ["#F1A1B5","#D92B66" ,"#B81D4E"];
  const showData = Boolean(selectedRegion);

  const dadosSelecionados = countryDatas[tradeType];

  const maxQuantidade = Math.max(
    ...dadosSelecionados.map((item) => item.quantidade)
  );

  const data = showData
    ? [
        [
          "Country",
          tradeType === "exportacao" ? "Exportação" : "Importação",
          { role: "tooltip", type: "string", p: { html: true } },
        ],
        ...dadosSelecionados.map((item) => {
          const tooltip = `
            <div>
              <h5>${
                tradeType === "exportacao" ? "Exportação" : "Importação"
              }:</h5>
              <br/>
              <b>Quantidade: </b> ${item.quantidade}<br/>
              <b>Valor Agregado: </b> R$ ${item.vl.toLocaleString()}<br/>
              <b>Quilograma Líquido: </b>${item.kg.toLocaleString()} kg
            </div>
          `;
          return [item.country, item.quantidade, tooltip];
        }),
      ]
    : [
        [
          "Country",
          tradeType === "exportacao" ? "Exportação" : "Importação",
          { role: "tooltip", type: "string", p: { html: true } },
        ],
      ];

  const options = {
    colorAxis: {
      colors: showData ? regionColor : ["#f0f0f0", "#f0f0f0"],
      minValue: 0,
      maxValue: maxQuantidade,
    },
    datalessRegionColor: regionColor[0],
    tooltip: {
      isHtml: true 
    },
    legend: "none",
  };

  return (
    <div className="componentWrapper">
        {/* <button //botão apenas para vizualizar imp e exp separados
          onClick={() =>
            setTradeType((prev) =>
              prev === "exportacao" ? "importacao" : "exportacao"
            )
          }
        >
          Ver {tradeType === "exportacao" ? "Importação" : "Exportação"}
        </button> */}

      <Chart
        chartType="GeoChart"
        data={data}
        options={options}
        width="100%"
        height="100%"
      />
    </div>
  );
}
