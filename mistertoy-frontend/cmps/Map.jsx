import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '3em' }}>{text}</div>
const API_KEY = ""
export function Map() {
    const [coords, setCoords] = useState({ lat: 32.071035, lng: 34.779118 })
    const zoom = 11
    // const defaultProps = {
    //     center: {
    //         lat: 32.071035,
    //         lng: 34.779118
    //     },
    //     zoom: 11
    // }
    function onHandleClick({ lat, lng }) {
        setCoords({ lat, lng })
    }
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={coords}
                defaultZoom={zoom}
                onClick={onHandleClick}
            >
                <AnyReactComponent
                    lat={coords.lat}
                    lng={coords.lng}
                    text="👽"
                />
            </GoogleMapReact>
        </div>
    )
}