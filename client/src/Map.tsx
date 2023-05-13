import { GlobalStyles } from "@mui/material";
import { View, Map as OlMap } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children?: ReactNode;
  onMapClick: (coordinates: number[]) => void;
}

export function Map({ children, onMapClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  /**
   * OpenLayers View: @see https://openlayers.org/en/latest/apidoc/module-ol_View-View.html
   * View's projection is defined based on the target country (area): E.g. EPSG:3067 in Finland
   */
  const [olView] = useState(() => {
    return new View({
      center: [2659167.020281517, 9632038.56757201],
      zoom: 5,
      multiWorld: false,
      enableRotation: false,
    });
  });

  /**
   * OpenLayers Map: @see https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
   * "For a map to render, a view, one or more layers, and a target container are needed" -docs
   */
  const [olMap] = useState(() => {
    return new OlMap({
      target: "",
      controls: [],
      view: olView,
      keyboardEventTarget: document,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });
  });

  /** olMap -object's initialization on startup  */
  useEffect(() => {
    olMap.setTarget(mapRef.current as HTMLElement);

    olMap.on("click", (event) => {
      onMapClick(event.coordinate);
    });
  }, [olMap]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Styles for the OpenLayers ScaleLine -component */}
      <GlobalStyles
        styles={{
          ".ol-viewport": {
            cursor: "pointer",
          },
        }}
      />
      <div
        style={{ width: "100%", height: "100%", position: "relative" }}
        ref={mapRef}
      >
        {children}
      </div>
    </div>
  );
}
