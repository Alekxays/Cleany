import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  useColorScheme,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logoSource =
    colorScheme === "dark"
      ? require("@/assets/images/logo-blue.png")
      : require("@/assets/images/logo-white.png");

  const backgroundImage =
    colorScheme === "dark"
      ? require("@/assets/images/background-grey.png")
      : require("@/assets/images/background-blue.png");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Veuillez entrer votre e-mail et votre mot de passe.");
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
      {/* Logo et texte Cleany */}
      <View className="flex-row items-center mt-20">
        <Image
          source={logoSource}
          className="w-4/12 h-24 mb-4"
          resizeMode="contain"
        />
        {colorScheme === "dark" ? (
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

      <View className="mt-8 items-center">
        <Text className="text-7xl font-inter-semibold text-slate-100 mt-28">
          Bonjour
        </Text>
        <Text className="text-base font-inter-medium text-slate-100 mt-2">
          Connectez-vous à votre compte
        </Text>
      </View>

      <View className="w-10/12 mt-10">
        <View className="flex-row items-center w-10/12 mx-auto py-3 px-4 mb-4 rounded-full bg-slate-100">
          <Ionicons
            name="mail-outline"
            size={24}
            color={colorScheme === "dark" ? "#888" : "#000"}
            className="mr-2"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#aaa"}
            className="flex-1 text-black m-1"
          />
        </View>

        <View className="flex-row items-center w-10/12 mx-auto py-3 px-4 mb-1 rounded-full bg-slate-100">
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color={colorScheme === "dark" ? "#888" : "#000"}
            className="mr-2"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#aaa"}
            className="flex-1 text-black m-1"
          />
        </View>
        <TouchableOpacity
          onPress={() => alert("Mot de passe oublié ?")}
          className="w-10/12 mx-auto"
        >
          <Text className="text-sm text-gray-500 text-right mb-6">
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          className="flex-row items-center justify-center py-3 rounded-full bg-blue-500 w-2/12 ml-auto mr-7"
        >
          <Text className="text-white text-lg font-inter-semibold">→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/signup")}
        className="absolute bottom-6 w-full items-center"
      >
        <Text className="font-inter-semibold text-white text-md">
          Pas encore de compte ? <Text className="text-blue-500">Créer</Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default HomeScreen;
