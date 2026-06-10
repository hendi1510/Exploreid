import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home as HomeIcon, Search, History as HistoryIcon, User, Sparkles } from 'lucide-react-native';
import { COLORS } from '../theme/constants';

// Screens
import Home from '../screens/Home';
import Explore from '../screens/Explore';
import History from '../screens/History';
import Profile from '../screens/Profile';
import Detail from '../screens/Detail';
import Reservation from '../screens/Reservation';
import Chatbot from '../screens/Chatbot';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 65,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color }) => <HomeIcon size={22} color={color} />,
          tabBarLabel: 'Beranda'
        }}
      />
      <Tab.Screen 
        name="Explore" 
        component={Explore} 
        options={{
          tabBarIcon: ({ color }) => <Search size={22} color={color} />,
          tabBarLabel: 'Jelajah'
        }}
      />
      <Tab.Screen 
        name="History" 
        component={History} 
        options={{
          tabBarIcon: ({ color }) => <HistoryIcon size={22} color={color} />,
          tabBarLabel: 'Riwayat'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
          tabBarLabel: 'Profil'
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Reservation" component={Reservation} />
      <Stack.Screen name="Chatbot" component={Chatbot} />
    </Stack.Navigator>
  );
}
