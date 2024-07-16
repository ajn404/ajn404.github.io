import React, { useEffect } from "react";
import { Viewer, Entity, EntityDescription } from "resium";
import { Cartesian3 } from "cesium";

const CesiumComponent: React.FC = () => {
  useEffect(() => {
    import("cesium/Source/Widgets/widgets.css");
  }, []);

  return (
    <>
      <Viewer full infoBox={false}>
        {/* <Entity
                name="Tokyo"
                position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
                point={{ pixelSize: 10 }}
            >
                <EntityDescription>
                    <h1>Tokyo</h1>
                    <p>Tokyo is the capital of Japan.</p>
                </EntityDescription>
            </Entity> */}
      </Viewer>
    </>
  );
};

export default CesiumComponent;
