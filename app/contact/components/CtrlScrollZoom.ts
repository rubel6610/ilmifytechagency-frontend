import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface CtrlScrollZoomProps {
  setShowHint: (show: boolean) => void;
  isTouch: boolean;
}

function CtrlScrollZoom({ setShowHint, isTouch }: CtrlScrollZoomProps) {
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

    const onWheel = (e: WheelEvent) => {
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