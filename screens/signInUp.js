import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../components/firebaseConfig";

export default function SignInUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigation.navigate("MainApp");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, navigation]);

  // Authentication function
  const handleAuthentication = async () => {
    try {
      if (user) {
        // Logout
        await signOut(auth);
        setEmail("");
        setPassword("");
        Alert.alert("Success", "You have been logged out.");
      } else {
        // Login or Signup
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          Alert.alert("Welcome", "You are now logged in!");
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          Alert.alert("Welcome", "Account created successfully!");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <Image source={require("../assets/login.png")} style={styles.logo} />
      <ScrollView contentContainerStyle={styles.container}>
        {!user ? (
          // Show sign-in or sign-up form
          <View style={styles.authContainer}>
            <Text style={styles.header}>{isLogin ? "Sign In" : "Sign Up"}</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={24}
                  color="#777"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAuthentication}
            >
              <Text style={styles.buttonText}>
                {isLogin ? "Sign In" : "Sign Up"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsLogin((prevState) => !prevState)}
            >
              <Text style={styles.toggleText}>
                {isLogin
                  ? "New here? Sign up"
                  : "Already have an account? Sign in"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Show authenticated screen with logout option
          <View style={styles.authContainer}>
            <Text style={styles.header}>Welcome</Text>
            <Text style={styles.emailText}>{user.email}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAuthentication}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
// ********************* Styles ********************** //
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    top: "10%",
    left: 85,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  authContainer: {
    top: "0%",
    width: "80%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 16,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
    marginTop: 12,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
