import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import statesData from "../../assets/geojson/brazil-states.json";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";

const regionMap = {
  1: "Norte",
  2: "Nordeste",
  3: "Sudeste",
  4: "Sul",
  5: "Centro-Oeste"
};

const regionColors = {
  "Norte": "#14A538",
  "Nordeste": "#EB641C",
  "Centro-Oeste": "#F79F44",
  "Sudeste": "#028391",
  "Sul": "#731CA5"
};

const regionColorsDark = {
  "Norte": "#0B7E28",
  "Nordeste": "#CB5110",
  "Centro-Oeste": "#D88938",
  "Sudeste": "#16707A",
  "Sul": "#541877"
};

// Componente auxiliar para ajustar o zoom e foco no mapa
const FitBoundsToBrazil = ({ features }) => {
  const map = useMap();

  useEffect(() => {
    if (features.length) {
      const geoJsonLayer = L.geoJSON(features);
      map.fitBounds(geoJsonLayer.getBounds(), {
        padding: [20, 20]
      });
    }
  }, [features, map]);

  return null;
};

const BrazilMap = () => {
  const [regions, setRegions] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

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

  const renderGeoJSON = () => {
    if (selectedRegion) {
      const regionColor = regionColors[selectedRegion];
      const regionDark = regionColorsDark[selectedRegion];

      return (
        <GeoJSON
          key={selectedRegion}
          data={{
            type: "FeatureCollection",
            features: regions[selectedRegion]
          }}
          style={(feature) => {
            const isSelected = feature.properties.name === selectedState;
            return {
              color: "#333",
              weight: 1,
              fillColor: isSelected ? regionDark : regionColor,
              fillOpacity: 1,
              cursor: "pointer"
            };
          }}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: () => {
                setSelectedState(feature.properties.name);
              }
            });
            layer.bindPopup(feature.properties.name);
          }}
        />
      );
    } else {
      return Object.entries(regions).map(([regionName, features], index) => (
        <GeoJSON
          key={index}
          data={{
            type: "FeatureCollection",
            features
          }}
          style={{
            color: regionColors[regionName],
            weight: 1,
            fillColor: regionColors[regionName],
            fillOpacity: 1,
            cursor: "pointer"
          }}
          
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation();
              setSelectedRegion(regionName);
              setSelectedState(null);
            }
          }}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(regionName);
          }}
        />
      ));
    }
  };

  const allFeatures = statesData.features;

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        border: "1px solid #eee",
        margin: "24px auto",
        maxWidth: "900px"
      }}
    >
      <MapContainer
        center={[-14.235, -51.9253]}
        zoom={4}
        style={{
          height: "380px",
          width: "100%",
          borderRadius: "12px"
        }}
        scrollWheelZoom={false}
      >

        {renderGeoJSON()}
        <FitBoundsToBrazil features={allFeatures} />
      </MapContainer>

      <div style={{ textAlign: "center", marginTop: "12px" }}>
      <p className="map-description">
        Para selecionar um estado, escolha uma das regiões do mapa acima
      </p>
    </div>
</div>
  );
};

export default BrazilMap;