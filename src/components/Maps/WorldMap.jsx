import React from "react";
import { Chart } from "react-google-charts";
import styles from "./Maps.module.css"

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
              <u>${
                tradeType === "exportacao" ? "Exportação" : "Importação"
              }:</u><br/>
              Quantidade: ${item.quantidade}<br/>
              VL_AGREGADO: R$ ${item.vl.toLocaleString()}<br/>
              KG_LIQUIDO: ${item.kg.toLocaleString()} kg
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
    tooltip: { isHtml: true },
    legend: "none",
  };

  return (
    <>
        {/* <button //botão apenas para vizualizar imp e exp separados
          onClick={() =>
            setTradeType((prev) =>
              prev === "exportacao" ? "importacao" : "exportacao"
            )
          }
        >
          Ver {tradeType === "exportacao" ? "Importação" : "Exportação"}
        </button> */}

      <h2 className="map-title">
        Principais países{" "}
        {tradeType === "exportacao" ? "Exportadores" : "Importadores"}
      </h2>

      <p className="map-subtitle">
      </p>

      <Chart
        chartType="GeoChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
      />
    </>
  );
}
