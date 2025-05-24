import React , {useEffect} from "react";
import { Chart } from "react-google-charts";
import styles from "./Maps.module.css"

export default function WorldMap({ selectedRegion, countryDatas, tradeType, setTradeType , colorPalette}) {
  const showData = Boolean(selectedRegion);

  let colors = colorPalette.slice(0).reverse()

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
              <b>Quantidade: </b> ${item.quantidade}<br/>
              <b>Valor Agregado: </b> R$ ${item.vl.toLocaleString()}<br/>
              <b>Quilograma Líquido: </b>${item.kg.toLocaleString()}
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
      colors: showData ? colors.slice(1,4) : ["#f0f0f0", "#f0f0f0"],
      minValue: 0,
      maxValue: maxQuantidade,
    },
    datalessRegionColor: colors[0],
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
