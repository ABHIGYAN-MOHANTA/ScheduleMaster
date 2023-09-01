import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  PanResponder,
  Modal,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import Daily from "./screens/Daily";
import Monthly from "./screens/Monthly";
import Yearly from "./screens/Yearly";

const Tab = createBottomTabNavigator();

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_, gestureState) =>
      gestureState.numberActiveTouches === 2,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 50 && modalVisible === false) {
        setModalVisible(true);
      }
    },
    onPanResponderRelease: () => {
      setModalVisible(false);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container} {...panResponder.panHandlers}>
        <StatusBar hidden />
        <Text style={styles.title}>ScheduleMaster</Text>
        <Text style={styles.headerMiddle}>
          Make a Plan(Don't Wake up like an Accident)
        </Text>
        <Text style={styles.header}>
          Manage Frustrations and Minimize Regrets when you sometimes fail to
          meet the Schedule!T=0
        </Text>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#1E1E1E",
              tabBarInactiveTintColor: "#D3D3D3",
              tabBarActiveBackgroundColor: "#D3D3D3",
              tabBarInactiveBackgroundColor: "#1E1E1E",
              headerStyle: {
                backgroundColor: "#1E1E1E",
              },
              headerTitleStFocusedyle: {
                color: "#D3D3D3",
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
          >
            <Tab.Screen
              name="Daily"
              component={Daily}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Fontisto
                    name="day-haze"
                    size={24}
                    color={focused ? "#1E1E1E" : "#D3D3D3"}
                  />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Monthly"
              component={Monthly}
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome
                    name="calendar"
                    size={22}
                    color={focused ? "#1E1E1E" : "#D3D3D3"}
                  />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Yearly"
              component={Yearly}
              options={{
                tabBarIcon: ({ focused }) => (
                  <SimpleLineIcons
                    name="globe-alt"
                    size={24}
                    color={focused ? "#1E1E1E" : "#D3D3D3"}
                  />
                ),
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Winners win, Losers lose</Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#1E1E1E",
    textAlign: "center",
    fontStyle: "italic",
    color: "#D3D3D3",
    paddingBottom: 20,
  },
  headerMiddle: {
    backgroundColor: "#1E1E1E",
    textAlign: "center",
    fontVariant: "bold",
    color: "#D3D3D3",
    paddingBottom: 2,
  },
  title: {
    backgroundColor: "#1E1E1E",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#D3D3D3",
    paddingTop: 30,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});
