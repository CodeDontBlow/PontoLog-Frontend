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
  Norte: "green",
  Nordeste: "orange",
  "Centro-Oeste": "sun",
  Sudeste: "teal",
  Sul: "purple",
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

const BrazilMap = ({ onRegionChange }) => {
  const [regions, setRegions] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedUF , setSelectedUF] = useState(null)

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

  const getSelectedStateFeature = () => {
    return Object.values(regions)
      .flat()
      .find((f) => f.properties.name === selectedState && f.properties.sigla === selectedUF);
  };

  const renderGeoJSON = () => {
    if (selectedState) {
      const feature = getSelectedStateFeature();
      const region = regionMap[parseInt(feature.properties.regiao_id)];
      const color = `var(--base-${regionColors[region]})`;

      return (
        <GeoJSON
          key={`state-${selectedState}`}
          data={feature}
          style={{
            weight: 1,
            fillColor: color,
            fillOpacity: 1,
            cursor: "pointer",
            transition: "fill 0.3s ease",
          }}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: () => {
                setSelectedRegion(null);
                setSelectedState(null);
                setSelectedUF(null)
                onRegionChange?.({ regiao: null, estado: null , uf: null }); // reset
              },
            });
            layer.bindPopup(feature.properties.name);
          }}
        />
      );
    }

    if (selectedRegion) {
      const regionColor = `var(--base-${regionColors[selectedRegion]})`;

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
            fillColor: regionColor,
            fillOpacity: 1,
            cursor: "pointer",
            transition: "fill 0.3s ease",
          }}
          onEachFeature={(feature, layer) => {
            const stateName = feature.properties.name;
            const stateSigla = feature.properties.sigla;
            layer.on({
              click: () => {
                setSelectedState(stateName);
                setSelectedUF(stateSigla);
                onRegionChange?.({ regiao: selectedRegion, estado: stateName , uf: stateSigla});
              },
            });
            layer.bindPopup(stateName);
          }}
        />
      );
    }

    return Object.entries(regions).map(([regionName, features], index) => (
      <GeoJSON
        key={index}
        data={{
          type: "FeatureCollection",
          features,
        }}
        style={{
          color: `var(--base-${regionColors[regionName]})`,
          weight: 1,
          fillColor: `var(--base-${regionColors[regionName]})`,
          fillOpacity: 1,
          cursor: "pointer",
        }}
        eventHandlers={{
          click: (e) => {
            e.originalEvent.stopPropagation();
            setSelectedRegion(regionName);
            setSelectedState(null);
            setSelectedUF(null);
            onRegionChange?.({ regiao: regionName, estado: null , uf: null }); // região selecionada
          },
        }}
        onEachFeature={(feature, layer) => {
          layer.bindPopup(regionName);
        }}
      />
    ));
  };

  const currentFeatures = selectedState
    ? [getSelectedStateFeature()]
    : selectedRegion
    ? regions[selectedRegion]
    : statesData.features;

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
        <FitBoundsToRegion features={currentFeatures} />
      </MapContainer>
    </div>
  );
};

export default BrazilMap;
