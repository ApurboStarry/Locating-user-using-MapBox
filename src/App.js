import React, { Component } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import "./App.css";
import locationPinIcon from "./icons/iconmonstr-location-3.svg";

class App extends React.Component {
  state = {
    viewport: {
      width: "100vw",
      height: "90vh",
      latitude: 42.430472,
      longitude: -123.334102,
      zoom: 16,
    },
    userLocation: {},
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let setUserLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      let newViewport = {
        height: "90vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 16,
      };
      this.setState({
        viewport: newViewport,
        userLocation: setUserLocation,
      });
    });
  };

  useCurrentLocation = () => {
    console.log(this.state.viewport.latitude, this.state.viewport.longitude);
    this.setState({
      userLocation: {
        latitude: this.state.viewport.latitude,
        longitude: this.state.viewport.longitude
      }
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.setUserLocation}>Locate me</button>
        <div className="locationPickerDiv">
          <ReactMapGL
            {...this.state.viewport}
            mapStyle="mapbox://styles/mapbox/outdoors-v11"
            onViewportChange={(viewport) => this.setState({ viewport })}
            mapboxApiAccessToken="pk.eyJ1IjoiaGFzaW4tYXB1cmJvIiwiYSI6ImNrdzQ5aGJtazAzeTgycXFsaGsxMmRsYW0ifQ.W_VPy0mSu_nQgj6ZFuSYKw"
          >
            {Object.keys(this.state.userLocation).length !== 0 ? (
              <Marker
                latitude={this.state.userLocation.latitude}
                longitude={this.state.userLocation.longitude}
              >
                {console.log("HERE")}
                <div>
                  <img className="locationPinIcon" src={locationPinIcon} />
                </div>
              </Marker>
            ) : (
              <Marker
                latitude={this.state.viewport.latitude}
                longitude={this.state.viewport.longitude}
              >
                <div>
                  <img className="locationPinIcon" src={locationPinIcon} />
                </div>
              </Marker>
            )}
          </ReactMapGL>
        </div>
        <button onClick={this.useCurrentLocation}>Use current location</button>
      </div>
    );
  }
}
 
export default App;
