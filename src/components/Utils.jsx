const { LayersControl, Marker, Popup, LayerGroup } = require('react-leaflet');
const images = ["https://ichef.bbci.co.uk/images/ic/1920x1080/p098l739.jpg", "https://cms.bbcearth.com/sites/default/files/2021-02/shroom.png", "https://i.guim.co.uk/img/media/49d39f74035f02a33b2453ea33bea48f57b9bc9b/0_62_4288_2573/master/4288.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=5c3833988fe8336a188953baa0683c5b"]

// Not working because of CORS (Mime type is set to Text/html)
// const images = new Array(9).fill('').map((a, i) => `https://www.ukgardening.co.uk/images/photogallery/wmarkmed/mushroom-${i}.jpg`);

const getMushroomAverage = (mushrooms) => {
    return mushrooms.reduce((total, next) => {
        const [lat, lng] = next.latlng;
        total.lat += lat;
        total.lng += lng;
        return total;
    }, { lat: 0, lng: 0})
}

const getColorName = (id) => {
    const colors = ['Red', 'Green', 'Yellow', 'Blue'];
    return colors[id];
}

const getSpotName = (id) => {
    const spots = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
    return spots[id];
}

const getRandomImage = () => {
    return images[(Math.random() * images.length) | 0];
}

const generateLayer = (filter, getName, mushroom, mushrooms, layer, checked = true) => {
    return  <LayersControl.Overlay name={getName(mushroom[filter])} key={layer.length} checked={checked}>
                <LayerGroup>
                    {mushrooms.filter((el) => el[filter] === mushroom[filter]).map((el, index) => {                        
                        return  <Marker key={index} position={el.latlng}>
                            <Popup>
                                <b>{el.name}</b>
                                <br /> Spots: {getSpotName(el.spots)}
                                <br /> Color: {getColorName(el.color)}
                                <img width="100%" height="100%" alt="mushroom" src={getRandomImage()} />
                            </Popup>
                        </Marker>
                    })}
                </LayerGroup>
            </LayersControl.Overlay>
}

export {
    getMushroomAverage,
    getColorName,
    getSpotName,
    generateLayer
};