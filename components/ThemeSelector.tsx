import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Appearance,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (theme === "system") {
      const colorScheme = Appearance.getColorScheme();
      setTheme(colorScheme || "light");

      const appearanceListener = Appearance.addChangeListener(
        ({ colorScheme }) => {
          setTheme(colorScheme || "light");
        }
      );

      return () => {
        appearanceListener.remove();
      };
    }
  }, [theme]);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    if (newTheme === "system") {
      const systemTheme = Appearance.getColorScheme() || "light";
      setTheme(systemTheme);
    } else {
      setTheme(newTheme);
    }
    setModalVisible(false);
  };

  const systemTheme = Appearance.getColorScheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const backgroundImage =
    currentTheme === "dark"
      ? require("@/assets/images/background-grey.png")
      : require("@/assets/images/background-blue.png");

  return (
    <View>
      <TouchableOpacity
        className="flex-row justify-between items-center"
        onPress={() => setModalVisible(true)}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="moon-outline"
            size={24}
            color={theme === "dark" ? "white" : "black"}
            className="mr-4"
          />
          <Text
            className="text-base ml-1"
            style={{ color: theme === "dark" ? "#fff" : "#000" }}
          >
            Thème
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <ImageBackground
            source={backgroundImage}
            className="flex-1 justify-center items-center bg-opacity-50"
            resizeMode="cover"
          >
            <View
              className={`w-11/12 rounded-lg p-6 ${
                theme === "dark" ? "bg-gray-900" : "bg-gray-600"
              }`}
            >
              <Text className="text-white text-lg font-bold mb-4">
                Choisissez un thème
              </Text>
              <TouchableOpacity
                className="flex-row items-center justify-between bg-gray-800 p-4 rounded-lg mb-2"
                onPress={() => handleThemeChange("system")}
              >
                <Text className="text-white text-base">
                  Adapté au réglage système
                </Text>
                {theme === "system" && (
                  <Ionicons name="checkmark" size={24} color="white" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-between bg-gray-800 p-4 rounded-lg mb-2"
                onPress={() => handleThemeChange("light")}
              >
                <Text className="text-white text-base">Mode Clair</Text>
                {theme === "light" && (
                  <Ionicons name="checkmark" size={24} color="white" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-between bg-gray-800 p-4 rounded-lg mb-2"
                onPress={() => handleThemeChange("dark")}
              >
                <Text className="text-white text-base">Mode Sombre</Text>
                {theme === "dark" && (
                  <Ionicons name="checkmark" size={24} color="white" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-500 p-3 rounded-lg mt-4"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-center">Fermer</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ThemeSelector;
