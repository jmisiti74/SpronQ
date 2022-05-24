const { LayersControl, Marker, Popup, LayerGroup } = require('react-leaflet');
const images = ["https://pixabay.com/get/ge29c15257e5da50b90de76fdb4cd380584dcafb987cda3259c1fa869b384cd6ecb5bc04d3e8b247cc863e2a54f2d59c6c6f8e68ac0976363594dc6e88241e3ed_640.jpg", "https://pixabay.com/get/gdf9e6f5ba040f994adf8a0d4eaf2ca88c0c2e9525c403e7ff04d2313127c089cdf3cc38e4d7f034203fca13d4fd4f02864983d515eda4ccf845862daa69456a5_640.jpg", "https://pixabay.com/get/gf0aa4f42c80349ce694505245aa429f0d97719c36e8a8cb75b6f679a024c15362615e5d9f832ea0b5ea485f79c6b8993_640.jpg", "https://pixabay.com/get/g5b799adcbe6c6b51067612ecebf2017639c4832a4d616b971acefbae09ad645e2186c7a088206bc0c6c294941c81cf12_640.jpg", "https://pixabay.com/get/g0fcfc97af1b5c8af383405c7ed0126f36cd299958865e331930bbd2cbd4576df74685fba1a517d212a188c0b722314166115ba1524d8d326f5bf991c4b7aa8b3_640.jpg", "https://pixabay.com/get/g6d5468c56da452a11c6ac421098c1b351c479d1c19906a9e87b11bad3dc6489c8acc16c7c0d90bbccdf406b7fa190b26_640.jpg", "https://pixabay.com/get/gec6e7c9c37abd52609ea1d7e93fa1b0d29d5d56082de11431d975549c7539fb286d9d5cb8022c54d76257b36ff61becbd1623bbfb9c57f6bdb4e9025594299bd_640.jpg", "https://pixabay.com/get/gc4a90704673d44c5b6930521abd143914af4ef6f88e4b3f08cac90aa5f37d8d8a4726154a2bef392509834f2f004567b06113318ce245ca6d445f6cce8edd1a6_640.jpg"];

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

const generateLayer = (filter, getName, mushroom, mushrooms, layer) => {
    return  <LayersControl.Overlay name={getName(mushroom[filter])} key={layer.length} checked>
                <LayerGroup>
                    {mushrooms.filter((el) => el[filter] === mushroom[filter]).map((el, index) => {                        
                        return  <Marker key={index} position={el.latlng}>
                            <Popup>
                                {el.name} - {el.spots}
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