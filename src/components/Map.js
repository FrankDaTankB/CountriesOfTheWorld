import React from 'react';
import H from "@here/maps-api-for-javascript";
import onResize from 'simple-element-resize-detector';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        // the reference to the container
        this.ref = React.createRef();
        // reference to the map
        this.map = null;
        this.state = {
            clng: this.props.clng,
            clat: this.props.clat
        }
    }

    handleMapViewChange = (ev) => {
        const {
            onMapViewChange
        } = this.props;
        if (ev.newValue && ev.newValue.lookAt) {
            const lookAt = ev.newValue.lookAt;
            // adjust precision
            const lat = Math.trunc(lookAt.position.lat * 1E7) / 1E7;
            const lng = Math.trunc(lookAt.position.lng * 1E7) / 1E7;
            const zoom = Math.trunc(lookAt.zoom * 1E2) / 1E2;
            onMapViewChange(zoom, lat, lng);
        }
    }

    componentDidMount() {
        if (!this.map) {
            // instantiate a platform, default layers and a map as usual
            const platform = new H.service.Platform({
                apikey: 'gDPx4IzF0YVNrJiBfYh0xhwRlbvc0Oskes3nG8mBj-o'
            });
            const layers = platform.createDefaultLayers();
            const map = new H.Map(
                this.ref.current,
                layers.vector.normal.map,
                {
                    pixelRatio: window.devicePixelRatio,
                    center: { lat: this.state.clat, lng: this.state.clng },
                    zoom: 5,
                },
            );
            let countryMarker = new H.map.Marker({ lat: this.state.clat, lng: this.state.clng });
            map.addObject(countryMarker)
            // MapEvents enables the event system
            // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
            new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

            // Create the default UI components
            H.ui.UI.createDefault(map, layers);

            map.addEventListener('mapviewchange', this.handleMapViewChange);
            // add the interactive behaviour to the map
            onResize(this.ref.current, () => {
                map.getViewPort().resize();
            });
            this.map = map;
        }
    }

    componentWillUnmount() {
        if (this.map) {
            this.map.removeEventListener('mapviewchange', this.handleMapViewChange);
        }
    }

    render() {
        return (
            <div
                className='map' 
                ref={this.ref}
            />
        )
    }
}
