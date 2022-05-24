import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import Api, { Mushroom } from '../api'
import ChangeView from './ChangeView';
import { getMushroomAverage } from './Utils'
import Layers from './Layers'

const defaultLatLng: LatLngTuple = [52.08098633333333, 5.2359029999999995];
const zoom: number = 20;

const LeafletMap: React.FC = () => {
    const [mushroomItems, setMushrooms] = useState<Mushroom[]>([])
    const [averagePos, setAverage] = useState<LatLngTuple>(defaultLatLng)

    const fetchData = async () => {      
        const mushrooms = await Api();        
        if (mushrooms.length <= 0) {
            throw new Error('Data still fetching...');
        }
        const average = getMushroomAverage(mushrooms);
        if (average.lat <= 0 || average.lng <= 0) {
            throw new Error('Doing the average...');
        }
        setMushrooms(mushrooms);
        setAverage([average.lat / mushrooms.length, average.lng / mushrooms.length])
    };

    useEffect(() => {
        fetchData()
        .catch((e) => {
            console.log(e.message);
        });
    }, [])

   return (
     <MapContainer id="mapId"
          center={averagePos}
          zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <ChangeView center={averagePos} /> 
        <Layers mushrooms={mushroomItems} />
     </MapContainer>
   )
}

export default LeafletMap;