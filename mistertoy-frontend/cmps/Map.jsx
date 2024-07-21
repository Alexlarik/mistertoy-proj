import React, { useState, useEffect, useRef } from "react"
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '3em' }}>{text}</div>
const API_KEY = ""
export function Map() {
    const [coords, setCoords] = useState({ lat: 32.071035, lng: 34.779118 })
    const [selectedBranch, setSelectedBranch] = useState()

    const branches = [
        {
            city: 'Khan Yunis',
            id: 101,
            zoom: 11,
            coordinates: {
                lat: 31.3462,
                lng: 34.3040,
            },
        },
        {
            city: 'Pyongyang',
            id: 102,
            zoom: 11,
            coordinates: {
                lat: 39.019444,
                lng: 125.738052,
            },
        },
        {
            city: 'Tel Aviv',
            id: 103,
            zoom: 11,
            coordinates: {
                lat: 32.071035,
                lng: 34.779118,
            },
        },
    ]

    function onSelectBranch(branch) {
        const branchToSelect = branch.id === selectedBranch?.id ? null : branch
        setSelectedBranch(branchToSelect)
    }

    function onHandleClick({ lat, lng }) {
        setCoords({ lat, lng })
    }

    const { zoom = 11, coordinates = { lat: 32.071035, lng: 34.779118, } } = selectedBranch || {}

    return (

        <div className="map-info">
            {branches.map(branch => {
                return (
                    <button
                        className={branch.id === selectedBranch?.id ? 'selected' : ''}
                        key={branch.city}
                        onClick={() => onSelectBranch(branch)}
                    >
                        {branch.city}
                    </button>
                )
            })}

            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    // defaultCenter={coordinates}
                    defaultZoom={zoom}
                    center={coordinates}
                    onClick={onHandleClick}
                >
                    <AnyReactComponent
                        lat={coords.lat}
                        lng={coords.lng}
                        text="👽"
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}