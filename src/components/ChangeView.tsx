import { LatLngTuple } from "leaflet";
import { useMap } from "react-leaflet";

function ChangeView({ center }: { center: LatLngTuple }) {
    const map = useMap();    
    map.setView(center);
    return null;
}

export default ChangeView;