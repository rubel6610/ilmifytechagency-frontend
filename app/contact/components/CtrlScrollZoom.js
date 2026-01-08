import { useEffect } from "react";
import { useMap } from "react-leaflet";

function CtrlScrollZoom({ setShowHint, isTouch }) {
  const map = useMap();

  useEffect(() => {

    if (isTouch) {
      map.scrollWheelZoom.disable();
      map.touchZoom.enable();
      return;
    }

    // Desktop behavior
    map.scrollWheelZoom.disable();

    const container = map.getContainer();

    const onWheel = (e) => {
      if (e.ctrlKey) {
        map.scrollWheelZoom.enable();
        setShowHint(false);
      } else {
        map.scrollWheelZoom.disable();
        setShowHint(true);

        setTimeout(() => setShowHint(false), 1200);
      }
    };

    container.addEventListener("wheel", onWheel);

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [map, setShowHint, isTouch]);

  return null;
}

export default CtrlScrollZoom;
