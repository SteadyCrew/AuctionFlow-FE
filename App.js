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
import Header from './src/components/Header';
import SearchHeader from './src/components/SearchHeader';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View } from 'react-native';
import NoteHeader from './src/components/NoteHeader';
import RegisterHeader from './src/components/RegisterHeader';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 기존 import는 그대로 유지합니다.

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#5DADE2',
        tabBarInactiveTintColor: '#909090',
      }}>
      <Tab.Screen
        name="홈"
        component={HomeStack} // HomeStack으로 변경
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
        name="내 거래"
        component={MyDealsStack} // MyDealsStack으로 변경
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
        name="등록"
        component={RegisterStack} // RegisterStack으로 변경
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
        name="찜"
        component={FavStack} // FavStack으로 변경
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
        name="마이페이지"
        component={MypageStack} // MypageStack으로 변경
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

// 스택 내비게이션을 각 탭에 추가합니다.
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => <Header /> }} />
    <Stack.Screen name="Search" component={SearchScreen} options={{ header: () => <SearchHeader /> }} />
  </Stack.Navigator>
);

const MyDealsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MyDeals" component={MyDealsScreen} options={{header: () => <Header /> }} />
    <Stack.Screen name="Note" component={NoteScreen} options={{ header: () => <NoteHeader /> }} />
  </Stack.Navigator>
);

const RegisterStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Register" component={RegisterScreen} options={{ header: () => <RegisterHeader /> }} />
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
          options={{
            header: () => <NoteHeader />, // NoteHeader 추가
            tabBarStyle: { display: 'none' }, // 탭 메뉴 숨기기
          }} 
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{
            header: () => <SearchHeader />, // SearchHeader 추가
            tabBarStyle: { display: 'none' }, // 탭 메뉴 숨기기
          }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{
            header: () => <RegisterHeader />, // RegisterHeader 추가
            tabBarStyle: { display: 'none' }, // 탭 메뉴 숨기기
          }} 
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
    marginTop: -6,
    marginBottom: 10,
  },
});

export default AppNavigator;