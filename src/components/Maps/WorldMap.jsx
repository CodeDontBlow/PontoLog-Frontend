import React , {useEffect} from "react";
import { Chart } from "react-google-charts";
import styles from "./Maps.module.css"

export default function WorldMap({ selectedRegion, countryDatas, tradeType, setTradeType , colorPalette}) {
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
            <div styles="background-color: red">
              <h5>${
                tradeType === "exportacao" ? "Exportação" : "Importação"
              }:</h5>
              <br/>
              <b>Quantidade: </b> <span>${item.quantidade} </span> <br/>
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
      colors: showData ? colorPalette : ["#f0f0f0", "#f0f0f0"],
      minValue: 0,
      maxValue: maxQuantidade,
    },
    datalessRegionColor: colorPalette[3],
    tooltip: { isHtml: true  },
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

      <Chart
        chartType="GeoChart"
        data={data}
        options={options}
        width="100%"
        height="100%"
      />
      </>
  );
}
