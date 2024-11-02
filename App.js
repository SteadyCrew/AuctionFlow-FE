import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MyDealsScreen from './src/screens/MyDealScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import FavScreen from './src/screens/FavScreen';
import MypageScreen from './src/screens/MypageScreen';
import SearchScreen from './src/screens/SearchScreen';
import NoteScreen from './src/screens/NoteScreen';
import Header from './src/components/Headers/Header';
import SearchHeader from './src/components/Headers/SearchHeader';
import NoteHeader from './src/components/Headers/NoteHeader';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Feather';
import { StyleSheet, Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          display: route.name === '등록' ? 'none' : 'flex',
        },
        tabBarActiveTintColor: '#5DADE2',
        tabBarInactiveTintColor: '#909090',
      })}>
      <Tab.Screen
        name="홈"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={22} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.label, { color }]}>홈</Text>
          ),
        }}
      />
      <Tab.Screen
        name="찜"
        component={FavStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="heart" size={22} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.label, { color }]}>찜</Text>
          ),
        }}
      />
      <Tab.Screen
        name="등록"
        component={RegisterStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon2 name="plus-circle" size={22} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.label, { color }]}>등록</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="내 거래"
        component={MyDealsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon2 name="shopping-bag" size={22} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.label, { color }]}>내 거래</Text>
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MypageStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon2 name="user" size={22} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.label, { color }]}>마이페이지</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ header: () => <Header /> }} 
    />
  </Stack.Navigator>
);

const MyDealsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MyDeals" component={MyDealsScreen} options={{ header: () => <Header /> }} />
  </Stack.Navigator>
);

const RegisterStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{ headerShown: false }} // 헤더 숨기기
    />
  </Stack.Navigator>
);

const FavStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Favorites" component={FavScreen} options={{ header: () => <Header /> }} />
  </Stack.Navigator>
);

const MypageStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Mypage" component={MypageScreen} options={{ header: () => <Header /> }} />
  </Stack.Navigator>
);

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }} // 탭 내비게이션 숨기기
        />
        <Stack.Screen 
          name="Note" 
          component={NoteScreen} 
          options={{ header: () => <NoteHeader /> }} 
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ header: () => <SearchHeader /> }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#ebebeb',
    height: 64,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    paddingTop: -6,
    paddingBottom: 10,
  },
});

export default AppNavigator;
