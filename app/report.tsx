import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  Appearance,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../context/ThemeContext";

const SignalementPage: React.FC = () => {
  const { theme } = useTheme();
  const [address, setAddress] = useState("");
  const [comments, setComments] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation();

  const systemTheme = Appearance.getColorScheme(); // Get the system theme (light or dark)
  const currentTheme = theme === "system" ? systemTheme : theme; // Handle system theme

  const [isTagChecked, setIsTagChecked] = useState(false);
  const [isWasteChecked, setIsWasteChecked] = useState(false);
  const [isOtherChecked, setIsOtherChecked] = useState(false);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "La permission de localisation est nécessaire."
        );
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
        timeout: 5000,
      });
      const { latitude, longitude } = userLocation.coords;

      if (address) {
        return;
      }

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const { street, name, city, postalCode, country } = reverseGeocode[0];
        const formattedAddress = `${
          name || street
        }, ${city}, ${postalCode}, ${country}`;
        setAddress(formattedAddress);
      } else {
        Alert.alert("Erreur", "Impossible de récupérer l'adresse.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Échec de la récupération de la localisation.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!address || !selectedImage) {
      Alert.alert(
        "Erreur",
        "Veuillez renseigner l'adresse et sélectionner une photo."
      );
      return;
    }
    Alert.alert("Signalement envoyé !");
  };

  const backgroundImage =
    theme === "dark"
      ? require("@/assets/images/background-grey.png")
      : require("@/assets/images/background-blue.png");

  return (
    <ImageBackground
      source={backgroundImage}
      className="flex-1 justify-center items-center"
      resizeMode="cover"
    >
      <View className="flex-1 px-6 py-10">
        {/* Header */}
        <TouchableOpacity
          className="mb-4 mt-4 -ml-6"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Title */}
        <View className="mb-4">
          <Text
            className={`text-4xl font-bold text-center ${
              theme === "dark" ? "text-blue-500" : "text-white"
            }`}
          >
            SIGNALEMENT
          </Text>

          {/* White Separator Bar */}
          <View
            className={`w-64 h-1 rounded-full mx-auto mt-2 ${
              theme === "dark" ? "bg-slate-400" : "bg-white"
            }`}
          />
        </View>

        {/* Checkbox Section */}
        <View className="mb-8">
          <Text className="text-base text-black dark:text-white mb-4 mx-4">
            Que souhaitez-vous signaler ? :
          </Text>

          {/* Tag Checkbox */}
          <View className="flex-row items-center mb-2 mx-4">
            <Checkbox
              value={isTagChecked}
              onValueChange={setIsTagChecked}
              color={isTagChecked ? "#028CF3" : undefined}
            />
            <Text className="text-black dark:text-white ml-2">Un tag</Text>
          </View>

          {/* Waste Checkbox */}
          <View className="flex-row items-center mb-2 mx-4">
            <Checkbox
              value={isWasteChecked}
              onValueChange={setIsWasteChecked}
              color={isWasteChecked ? "#028CF3" : undefined}
            />
            <Text className="text-black dark:text-white ml-2">Des déchets</Text>
          </View>

          {/* Other Checkbox */}
          <View className="flex-row items-center mx-4">
            <Checkbox
              value={isOtherChecked}
              onValueChange={setIsOtherChecked}
              color={isOtherChecked ? "#028CF3" : undefined}
            />
            <Text className="text-black dark:text-white ml-2">Autre</Text>
          </View>
        </View>

        {/* Address Input */}
        <View className="mb-4">
          <Text className="text-black dark:text-white mb-4 mx-4">
            Adresse :
          </Text>

          {/* Input and Location Icon */}
          <View
            className={`flex-row items-center rounded-lg px-3 ${
              theme === "dark" ? "bg-slate-600" : "bg-slate-700"
            }`}
          >
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Veuillez renseigner l'adresse"
              placeholderTextColor="#FFFFFF"
              className="flex-1 py-3 text-black dark:text-white"
            />

            {/* Icon Button */}
            <TouchableOpacity onPress={getLocation} className="ml-2">
              <Ionicons name="location-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Upload */}
        <View className="mb-4">
          <Text className="text-black dark:text-white mb-4 mx-4">Photo :</Text>
          <TouchableOpacity
            onPress={pickImage}
            className="w-full h-40 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg flex items-center justify-center"
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <View className="flex items-center justify-center">
                <Ionicons
                  name="image-outline"
                  size={50}
                  color={currentTheme === "dark" ? "#028CF3" : "#FFFFFF"}
                />
                <Text
                  className={`${
                    theme === "dark" ? "text-gray-500" : "text-white"
                  }`}
                >
                  Déposez votre image ici, ou parcourez
                </Text>
                <Text
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-500" : "text-white"
                  }`}
                >
                  Supporté : JPG, JPEG, PNG
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Comments */}
        <View className="mb-6">
          <Text className="text-white mb-2 mx-4">
            Souhaitez-vous ajouter quelque chose ? :
          </Text>
          <TextInput
            value={comments}
            onChangeText={setComments}
            placeholder="Votre texte ici..."
            placeholderTextColor="#888"
            className={`w-full h-20 py-3 px-4 rounded-lg ${
              theme === "dark" ? "bg-slate-600" : "bg-slate-700"
            } text-white`}
            multiline
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="flex-row items-center justify-center py-4 rounded-full bg-blue-500"
        >
          <Text className="text-white text-lg font-semibold mr-2">
            Signaler
          </Text>
          <Ionicons name="arrow-forward-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignalementPage;
