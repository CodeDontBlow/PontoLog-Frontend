import React from "react";
import { Chart } from "react-google-charts";
import { regionColors } from "./BrazilMap";

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
  ],
  importacao: [
    {
      country: "India",
      quantidade: 6000,
      vl: 4200000,
      kg: 1300000,
    },
    {
      country: "Italy",
      quantidade: 5000,
      vl: 3600000,
      kg: 1100000,
    },
    {
      country: "Mexico",
      quantidade: 3200,
      vl: 1900000,
      kg: 700000,
    },
    {
      country: "Argentina",
      quantidade: 2800,
      vl: 1700000,
      kg: 600000,
    },
  ],
};

export default function WorldMap({ selectedRegion, tradeType, setTradeType }) {
  const regionColor = regionColors[selectedRegion] || "#888888";
  const showData = Boolean(selectedRegion);

  const dadosSelecionados = dadosTeste[tradeType];

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
      colors: showData ? ["#eeeeee", regionColor] : ["#f0f0f0", "#f0f0f0"],
      minValue: 0,
      maxValue: maxQuantidade,
    },
    backgroundColor: "#f8fafd",
    datalessRegionColor: "#f0f0f0",
    tooltip: { isHtml: true },
    legend: "none",
  };

  return (
    <div className="map-card">
      <div style={{ textAlign: "right" }}>
        <button //botão apenas para vizualizar imp e exp separados
          onClick={() =>
            setTradeType((prev) =>
              prev === "exportacao" ? "importacao" : "exportacao"
            )
          }
        >
          Ver {tradeType === "exportacao" ? "Importação" : "Exportação"}
        </button>
      </div>

      <h2 className="map-title">
        Principais países{" "}
        {tradeType === "exportacao" ? "Exportadores" : "Importadores"}
      </h2>

      <p className="map-subtitle">
        {showData
          ? "Passe o mouse sobre um país para ver os detalhes"
          : "Selecione uma região no mapa do Brasil para visualizar os dados"}
      </p>

      <Chart
        chartType="GeoChart"
        data={data}
        options={options}
        width="100%"
        height="500px"
      />
    </div>
  );
}
