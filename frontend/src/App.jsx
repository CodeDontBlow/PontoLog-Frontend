import React, { useState } from "react";
import BrazilMap from "./components/Maps/BrazilMap";
import WorldMap from "./components/Maps/WorldMap";

function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [tradeType, setTradeType] = useState("exportacao");

  return (
    <div className="p-6 space-y-8">
      <BrazilMap onRegionChange={setSelectedRegion} />

      <WorldMap
        selectedRegion={selectedRegion}
        tradeType={tradeType}
        setTradeType={setTradeType}
      />
    </div>
  );
}

export default App;
