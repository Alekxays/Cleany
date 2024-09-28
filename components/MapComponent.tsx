import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useTheme } from "../context/ThemeContext"; // Import your theme context

const MapComponent = forwardRef((props, ref) => {
  const { theme } = useTheme(); // Access the theme context
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [compostMarkers, setCompostMarkers] = useState([]);
  const mapRef = useRef<MapView | null>(null);

  useImperativeHandle(ref, () => ({
    centerOnUserLocation: () => {
      if (location && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    },
    goToNearestCompost: async () => {
      if (!location) return;
      const nearestCompost = findNearestCompost(location, compostMarkers);
      if (nearestCompost && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: nearestCompost.geo_point_2d.lat,
          longitude: nearestCompost.geo_point_2d.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    },
  }));

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      const response = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/dechets-menagers-points-dapport-volontaire-composteurs/records?limit=30"
      );
      const data = await response.json();
      const composts = data.results.map((record) => ({
        operateur: record.operateur,
        adresse: record.adresse,
        geo_point_2d: {
          lat: record.geo_point_2d.lat,
          lon: record.geo_point_2d.lon,
        },
      }));
      setCompostMarkers(composts);
    })();
  }, []);

  const findNearestCompost = (userLocation, composts) => {
    let minDistance = Infinity;
    let nearestCompost = null;

    composts.forEach((compost) => {
      const compostLat = compost.geo_point_2d.lat;
      const compostLon = compost.geo_point_2d.lon;

      const distance = getDistanceFromLatLonInKm(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        compostLat,
        compostLon
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestCompost = compost;
      }
    });

    return nearestCompost;
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <View className={`flex-1 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <MapView
        ref={mapRef}
        className="w-full h-full"
        showsUserLocation={true}
        zoomEnabled={true}
        scrollEnabled={true}
        userInterfaceStyle={theme} // Add dynamic map styling based on the theme
      >
        {compostMarkers.map((compost, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: compost.geo_point_2d.lat,
              longitude: compost.geo_point_2d.lon,
            }}
            title={compost.operateur}
            description={compost.adresse}
            image={require("../assets/images/ping_composte.png")} // You can change this to a themed image if required
          />
        ))}
      </MapView>
    </View>
  );
});

export default MapComponent;
