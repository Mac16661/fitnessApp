import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

// Create a new component for the onboarding screen content
const OnboardingSlide = ({ imageSource, heading, paragraph }) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={imageSource} style={styles.image} resizeMode="stretch" />
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.paragraph}>{paragraph}</Text>
    </View>
  );
};

// New component for the Welcome Screen
const WelcomeScreen = ({ onGetStarted }) => {
  return (
    <View style={styles.welcomeContainer}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/onboarding/WelcomeFrame.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* <Text style={styles.tagline}>Everybody Can Train</Text> */}
      </View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.startButton} onPress={onGetStarted}>
        <Text style={styles.startButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const slides = [
    {
      screen: (
        <WelcomeScreen
          onGetStarted={() => {
            setCurrentIndex(1); // Go to the next screen after "Get Started"
          }}
        />
      ),
    },
    {
      imageSource: require("../assets/images/onboarding/Frame1.png"),
      heading: "Explore 100+ Workouts",
      paragraph:
        "Don't worry if you have trouble determining your goals, We can help you determine your goals and track your goals",
    },
    {
      imageSource: require("../assets/images/onboarding/Frame2.png"),
      heading: "Burn calories and track",
      paragraph:
        "Let’s keep burning, to achieve yours goals, it hurts only temporarily, if you give up now you will be in pain forever",
    },
    {
      imageSource: require("../assets/images/onboarding/Frame3.png"),
      heading: "Explore Nutrition plans",
      paragraph:
        "Let's start a healthy lifestyle with us, we can determine your diet every day. healthy eating is fun",
    },
  ];

  const onNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("Welcome");
    }
  };

  // const onSkip = () => {
  //   navigation.navigate("Welcome");
  // };

  // const onPrevious = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Render the OnboardingSlide or WelcomeScreen based on the current index */}
        {currentIndex === 0 ? (
          slides[0].screen // Render the WelcomeScreen component
        ) : (
          <OnboardingSlide // Render the OnboardingSlide component
            imageSource={slides[currentIndex].imageSource}
            heading={slides[currentIndex].heading}
            paragraph={slides[currentIndex].paragraph}
          />
        )}
        {/* {currentIndex > 0 && (
          <TouchableOpacity
            style={[styles.button, styles.previousButton]}
            onPress={onPrevious}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )} */}
        {currentIndex != 0 && currentIndex < slides.length - 1 && (
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={onNext}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        )}
        {currentIndex === slides.length - 1 && (
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={onNext}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F8F8F8'
  },
  imageContainer: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: "100%",
  },
  image: {
    // flex: 1,
    width: "100%",
    height: "50%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  skipButtonText: {
    fontWeight: "bold",
    color: "#F1BE48",
  },
  button: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  nextButton: {
    bottom: 50,
    right: 50,
    backgroundColor: "#F1BE48",
    borderRadius: 10,
    backgroundColor: "#F34E3A", // Red button color
    borderRadius: 90, // Make it round
    alignItems: "center", // Center the text
    elevation: 2,
  },
  dotContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#F1BE48",
  },
  // Styles for the OnboardingSlide component
  slideContainer: {
    flex: 1,
    justifyContent: "flex-start", // changed from 'center' to 'flex-start'
    // alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 28, // Increased font size
    fontWeight: "bold",
    marginTop: 35,
    textAlign: "center",
    color: '#222222' // changed color
  },
  paragraph: {
    fontSize: 18, // increased font size
    color: "#555",
    marginHorizontal: 30,
    marginTop: 12,
    textAlign: "center",
    lineHeight: 28, // added lineHeight
  },
  // Styles for Welcome Screen
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Background color (white)
  },
  logoContainer: {
    alignItems: "center", // Center logo and tagline horizontally
  },
  logo: {
    width: 200, // Adjust as necessary
    height: 200, // Adjust as necessary
  },
  startButton: {
    backgroundColor: "#F34E3A", // Red button color
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 90, // Make it round
    width: "90%", // Make button wider
    alignItems: "center", // Center the text
    shadowColor: "#000", // Add shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    position: 'absolute', // Add this
    bottom: 35,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Onboarding;
