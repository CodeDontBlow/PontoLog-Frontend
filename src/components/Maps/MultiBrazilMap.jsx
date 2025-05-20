import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import statesData from "../../assets/geojson/brazil-states.json";
import { useState, useEffect } from "react";
import L from "leaflet";
import "./../../App.css";

const regionMap = {
  1: "Norte",
  2: "Nordeste",
  3: "Sudeste",
  4: "Sul",
  5: "Centro-Oeste",
};

export const regionColors = {
  Norte: "#14A538",
  Nordeste: "#EB641C",
  "Centro-Oeste": "#F79F44",
  Sudeste: "#028391",
  Sul: "#731CA5",
};

// Componente que ajusta o zoom automaticamente
const FitBounds = ({ features }) => {
  const map = useMap();

  useEffect(() => {
    if (features?.length) {
      const geoJsonLayer = L.geoJSON(features);
      map.fitBounds(geoJsonLayer.getBounds(), {
        padding: [20, 20],
      });
    }
  }, [features, map]);

  return null;
};

const BrazilMap = ({ onRegionChange }) => {
  const [regions, setRegions] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [zoomToBrazil, setZoomToBrazil] = useState(false);

  useEffect(() => {
    const grouped = {};
    statesData.features.forEach((feature) => {
      const regiaoId = parseInt(feature.properties.regiao_id);
      const regiaoNome = regionMap[regiaoId];
      if (!grouped[regiaoNome]) grouped[regiaoNome] = [];
      grouped[regiaoNome].push(feature);
    });
    setRegions(grouped);
  }, []);

  const getSelectedRegionFeatures = () => {
    return selectedRegion ? regions[selectedRegion] : statesData.features;
  };

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
    setZoomToBrazil(false);
    onRegionChange?.({ regiao: regionName, estado: null });
  };

  const handleStateClick = (stateFeature) => {
    const regionName = regionMap[parseInt(stateFeature.properties.regiao_id)];
    const stateName = stateFeature.properties.name;

    // Passa os dados
    onRegionChange?.({ regiao: regionName, estado: stateName });

    // Reseta seleção e ativa zoom pro Brasil
    setSelectedRegion(null);
    setZoomToBrazil(true);
  };

  const renderGeoJSON = () => {
    // Se nenhuma região selecionada → mostra o Brasil
    if (!selectedRegion) {
      return Object.entries(regions).map(([regionName, features], index) => (
        <GeoJSON
          key={index}
          data={{ type: "FeatureCollection", features }}
          style={{
            color: regionColors[regionName],
            weight: 1,
            fillColor: regionColors[regionName],
            fillOpacity: 1,
            cursor: "pointer",
          }}
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation();
              handleRegionClick(regionName);
            },
          }}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(regionName);
          }}
        />
      ));
    }

    // Se uma região estiver selecionada → mostra só os estados dela
    return (
      <GeoJSON
        key={`region-${selectedRegion}`}
        data={{
          type: "FeatureCollection",
          features: regions[selectedRegion],
        }}
        style={{
          color: "var(--white-500)",
          weight: 2,
          fillColor: regionColors[selectedRegion],
          fillOpacity: 1,
          cursor: "pointer",
        }}
        onEachFeature={(feature, layer) => {
          const stateName = feature.properties.name;
          layer.on({
            click: () => handleStateClick(feature),
          });
          layer.bindPopup(stateName);
        }}
      />
    );
  };

  const currentFeatures = zoomToBrazil
    ? statesData.features // força zoom no Brasil todo
    : getSelectedRegionFeatures(); // região ou tudo

  return (
    <div className="brazil-map-container">
      <MapContainer
        center={[-14.235, -51.9253]}
        zoomSnap={0.1}
        zoom={6}
        style={{
          height: "40em",
          width: "100%",
          borderRadius: "12px",
        }}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
      >
        {renderGeoJSON()}
        <FitBounds features={currentFeatures} />
      </MapContainer>
    </div>
  );
};

export default BrazilMap;
