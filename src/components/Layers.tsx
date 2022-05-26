import React from 'react';
import { LayersControl, useMapEvents } from 'react-leaflet';
import { Color, Mushroom, Spots } from '../api';
import { getColorName, getSpotName, generateLayer } from './Utils';

const Layers = ({mushrooms}: { mushrooms: Mushroom[] }) => {
    const colorLayer: React.ReactElement[] = [];
    const spotLayer: React.ReactElement[] = [];

    const initLayer = () => {
        const layerColorsList: { color: Color, id: number }[] = [];
        const layerSpotsList: { spots: Spots, id: number }[] = [];

        mushrooms.forEach(mushroom => {
            if (layerColorsList.findIndex((el) => el.color === mushroom.color) === -1) {                
                const id = colorLayer.push(generateLayer('color', getColorName, mushroom, mushrooms, colorLayer)) - 1;
                layerColorsList.push({ color: mushroom.color, id });
            }
            if (layerSpotsList.findIndex((el) => el.spots === mushroom.spots) === -1) {
                const id = spotLayer.push(generateLayer('spots', getSpotName, mushroom, mushrooms, spotLayer)) - 1;
                layerSpotsList.push({ spots: mushroom.spots, id });
            }
        })
    }

    initLayer();
    useMapEvents({
        layeradd: (e) => {
            //Catch event to add every layer needed
        },
        layerremove: (e) => {
            //Catch event to remove every layer needed
        }
    });

    return (
        <>
            <LayersControl position='topright'>
                {spotLayer}
            </LayersControl>
            <LayersControl position='topright'>
                {colorLayer}
            </LayersControl>
        </>
    );
}

export default Layers;