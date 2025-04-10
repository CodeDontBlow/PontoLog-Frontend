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

const regionColors = {
  Norte: "#14A538",
  Nordeste: "#EB641C",
  "Centro-Oeste": "#F79F44",
  Sudeste: "#028391",
  Sul: "#731CA5",
};

const regionColorsDark = {
  Norte: "#0B7E28",
  Nordeste: "#CB5110",
  "Centro-Oeste": "#D88938",
  Sudeste: "#16707A",
  Sul: "#541877",
};

const FitBoundsToRegion = ({ features }) => {
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
          key={`${selectedRegion}-${selectedState || "all"}`}
          data={{
            type: "FeatureCollection",
            features: regions[selectedRegion],
          }}
          style={(feature) => {
            const isSelected = feature.properties.name === selectedState;
            return {
              color: "#000",
              weight: 1,
              fillColor: isSelected ? regionDark : regionColor,
              fillOpacity: 1,
              cursor: "pointer",
              transition: "fill 0.3s ease",
            };
          }}
          onEachFeature={(feature, layer) => {
            const stateName = feature.properties.name;

            layer.on({
              click: () => {
                if (stateName === selectedState) {
                  setSelectedRegion(null);
                  setSelectedState(null);
                } else {
                  setSelectedState(stateName);
                }
              },
            });

            layer.bindPopup(stateName);
          }}
        />
      );
    } else {
      return Object.entries(regions).map(([regionName, features], index) => (
        <GeoJSON
          key={index}
          data={{
            type: "FeatureCollection",
            features,
          }}
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
              setSelectedRegion(regionName);
              setSelectedState(null);
            },
          }}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(regionName);
          }}
        />
      ));
    }
  };

  return (
    <div className="brazil-map-container">
      <MapContainer
        center={[-14.235, -51.9253]}
        zoom={4}
        style={{
          height: "380px",
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

        <FitBoundsToRegion
          features={
            selectedRegion ? regions[selectedRegion] : statesData.features
          }
        />
      </MapContainer>

      <div className="map-info">
        {selectedState ? (
          <h2>Estado selecionado: {selectedState}</h2>
        ) : selectedRegion ? (
          <h2>Região selecionada: {selectedRegion}</h2>
        ) : null}
        <p className="map-description">
          Para selecionar um estado, escolha uma das regiões do mapa acima
        </p>
      </div>
    </div>
  );
};

export default BrazilMap;
