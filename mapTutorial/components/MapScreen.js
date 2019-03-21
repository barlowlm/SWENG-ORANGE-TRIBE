import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView, {Polygon} from 'react-native-maps';

type Props = {};
export default class MapScreens extends Component<Props>{
  state = {
    data: ''
  }

  polygonCoordinates = () => {
    let i;
    let arr = [];
    for (i=0; i<this.state.data.features[0].geometry.coordinates[0].length; i++) {
      let LatLng = {
        latitude: this.state.data.features[0].geometry.coordinates[0][i][1],
        longitude: this.state.data.features[0].geometry.coordinates[0][i][0],
      }
    arr[i] = LatLng;
    }
    return arr;
  }

  componentDidMount = () => {
    fetch('http://sloder.netsoc.ie/server.php',{
      method: 'POST'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      console.log("test");
      this.setState({
        data: JSON.parse(responseJson)
      })
      console.log(this.state.data);
      console.log(this.polygonCoordinates());
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    
    if (this.state.data=='') {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View> 
      );
    } else {
      return (
        <MapView
          style={styles.mapStyle}
        initialRegion={{
          latitude: this.state.data.features[0].geometry.coordinates[0][0][1],
          longitude: this.state.data.features[0].geometry.coordinates[0][0][0],
          latitudeDelta: 1, //110,
          longitudeDelta: 1,//20,
          }}
        >

<Polygon
          coordinates={[
            {latitude: -0.106029551095291, longitude: 37.23769925816912},
            {latitude: -0.152315168375523, longitude: 37.30826938167124},
            {latitude: -0.42652654430798, longitude: 37.20400819630606},
            {latitude: -0.407037564698918, longitude: 37.11433039434282},
            {latitude: -0.106029551095291, longitude: 37.23769925816912},
          ]}
          fillColor = '#9ACD32'
        />
        

        </MapView>
      );
    }
  }
}

/*




          <MapView.Marker
            coordinate = {{
              latitude: this.state.data.features[0].geometry.coordinates[0][0][1],
              longitude: this.state.data.features[0].geometry.coordinates[0][0][0],
            }}
            title = {this.state.data.features[0].properties.Sublocatio}
            description = {"Province "+ this.state.data.features[0].properties.Province +  ", District " + this.state.data.features[0].properties.District + ", County " +  this.state.data.features[0].properties.County}
          /> 
          
 */

/*
<MapView
          style={styles.mapStyle}
        initialRegion={{
          latitude: 8.7832,
          longitude: 34.5085,
          latitudeDelta: 110,
          longitudeDelta: 20,
          }}this.state.data.features[0].geometry.coordinates[0]
        >

        <MapView.Marker
            coordinate = {{
              latitude: [0][1],
              longitude: this.state.data.features[0].geometry.coordinates[0][0][0],
            }}
          /> 
        
          
        </MapView> 

  ***************************


*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mapStyle: {
    flex: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});