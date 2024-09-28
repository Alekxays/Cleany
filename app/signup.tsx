import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { Appearance } from "react-native"; // To get the system theme

const HomeScreen: React.FC = () => {
  const { theme } = useTheme(); // Use the theme from the context
  const systemTheme = Appearance.getColorScheme(); // Get the system theme (light or dark)
  const currentTheme = theme === "system" ? systemTheme : theme; // Handle system theme

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Conditionally set logo and background based on the current theme
  const logoSource =
    currentTheme === "dark"
      ? require("@/assets/images/logo-blue.png")
      : require("@/assets/images/logo-white.png");

  const backgroundImage =
    currentTheme === "dark"
      ? require("@/assets/images/background-grey.png")
      : require("@/assets/images/background-blue.png");

  const handleRegister = () => {
    if (!email || !password || !username || !phone) {
      alert("Veuillez entrer toutes les informations.");
      return;
    }
    alert(`Connexion réussie avec l'email : ${email}`);
    router.push("/dashboard");
  };

  return (
    <ImageBackground
      source={backgroundImage}
      className="flex-1 justify-start items-center"
      resizeMode="cover"
    >
      {/* Logo and text Cleany */}
      <View className="flex-row items-center mt-20">
        <Image
          source={logoSource}
          className="w-4/12 h-24 mb-4"
          resizeMode="contain"
        />
        {currentTheme === "dark" ? (
          <MaskedView
            maskElement={
              <Text className="text-3xl font-inter-semibold bg-transparent">
                Cleany®
              </Text>
            }
          >
            <LinearGradient
              colors={["#06b6d4", "#3b82f6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="w-full"
            >
              <Text className="opacity-0 text-3xl font-inter-semibold">
                Cleany®
              </Text>
            </LinearGradient>
          </MaskedView>
        ) : (
          <Text className="text-3xl font-inter-medium text-slate-100">
            Cleany®
          </Text>
        )}
      </View>

      {/* Title and intro text */}
      <View className="mt-8 items-center">
        <Text className="text-4xl font-inter-semibold text-slate-100 mt-28">
          Créez votre compte
        </Text>
        <Text className="text-base font-inter-medium text-slate-100 mt-2">
          On a hâte de vous connaitre !
        </Text>
      </View>

      {/* Input fields */}
      <View className="w-10/12 mt-10">
        <View className="flex-row items-center w-10/12 mx-auto py-3 px-4 mb-4 rounded-full bg-slate-100">
          <Ionicons
            name="person-outline"
            size={24}
            color={currentTheme === "dark" ? "#028CF3" : "#000"}
            className="mr-2"
          />
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Identifiant"
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={currentTheme === "dark" ? "#888" : "#aaa"}
            className="flex-1 text-black m-1"
          />
        </View>
        <View className="flex-row items-center w-10/12 mx-auto py-3 px-4 mb-4 rounded-full bg-slate-100">
          <Ionicons
            name="mail-outline"
            size={24}
            color={currentTheme === "dark" ? "#028CF3" : "#000"}
            className="mr-2"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={currentTheme === "dark" ? "#888" : "#aaa"}
            className="flex-1 text-black m-1"
          />
        </View>

        <View className="flex-row items-center w-10/12 mx-auto py-3 px-4 mb-4 rounded-full bg-slate-100">
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color={currentTheme === "dark" ? "#028CF3" : "#000"}
            className="mr-2"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            placeholderTextColor={currentTheme === "dark" ? "#888" : "#aaa"}
            className="flex-1 text-black m-1"
          />
        </View>

        <View className="flex-row items-center w-10/12 mx-auto py-3 px-4 rounded-full bg-slate-100">
          <Ionicons
            name="call-outline"
            size={24}
            color={currentTheme === "dark" ? "#028CF3" : "#000"}
            className="mr-2"
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Télephone"
            keyboardType="phone-pad"
            placeholderTextColor={currentTheme === "dark" ? "#888" : "#aaa"}
            className="flex-1 text-black m-1"
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleRegister}
          className="flex-row items-center justify-center py-3 rounded-full bg-blue-500 w-2/12 ml-auto mr-7 mt-6"
        >
          <Text className="text-white text-lg font-inter-semibold">→</Text>
        </TouchableOpacity>
      </View>

      {/* Login redirect link */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="absolute bottom-6 w-full items-center"
      >
        <Text className="font-inter-semibold text-white text-md">
          Vous avez déjà un compte ?{" "}
          <Text className="text-blue-500">Connectez-vous !</Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default HomeScreen;
