import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductHeader from '../components/Headers/ProductHeader';
import MyDealsScreen from '../screens/MyDealScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FavScreen from '../screens/FavScreen';
import MypageScreen from '../screens/MypageScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import NoteScreen from '../screens/NoteScreen';
import Header from '../components/Headers/Header';
import NoteHeader from '../components/Headers/NoteHeader';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Feather';
import {StyleSheet, Text} from 'react-native';
import RegisterHeader from '../components/Headers/RegisterHeader';
import {AuthContext} from '../components/Auth/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import LogInScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AddressScreen from '../screens/AddressScreen';
import AddressHeader from '../components/Headers/AddressHeader';
import AddressSearchScreen from '../screens/AddressSearchScreen';
import SearchHeader from '../components/Headers/SearchHeader';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          display: route.name === '등록' ? 'none' : 'flex',
        },
        tabBarActiveTintColor: '#5DADE2',
        tabBarInactiveTintColor: '#000',
      })}>
      <Tab.Screen
        name="홈"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />,
          tabBarLabel: ({color}) => (
            <Text style={[styles.label, {color}]}>홈</Text>
          ),
        }}
      />
      <Tab.Screen
        name="찜"
        component={FavStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="heart" size={20} color={color} />
          ),
          tabBarLabel: ({color}) => (
            <Text style={[styles.label, {color}]}>찜</Text>
          ),
        }}
      />
      <Tab.Screen
        name="등록"
        component={RegisterStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon2 name="plus-circle" size={22} color={color} />
          ),
          tabBarLabel: ({color}) => (
            <Text style={[styles.label, {color}]}>등록</Text>
          ),
        }}
      />
      <Tab.Screen
        name="내 거래"
        component={MyDealsStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon2 name="shopping-bag" size={20} color={color} />
          ),
          tabBarLabel: ({color}) => (
            <Text style={[styles.label, {color}]}>내 거래</Text>
          ),
        }}
      />
      <Tab.Screen
        name="마이 페이지"
        component={MypageStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon2 name="user" size={20} color={color} />
          ),
          tabBarLabel: ({color}) => (
            <Text style={[styles.label, {color}]}>마이페이지</Text>
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
      options={{header: () => <Header />}}
    />
  </Stack.Navigator>
);

const MyDealsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyDeals"
      component={MyDealsScreen}
      options={{header: () => <Header />}}
    />
  </Stack.Navigator>
);

const RegisterStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const FavStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorites"
      component={FavScreen}
      options={{header: () => <Header />}}
    />
  </Stack.Navigator>
);

const MypageStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Mypage"
      component={MypageScreen}
      options={{header: () => <Header />}}
    />
  </Stack.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="LogIn"
      component={LogInScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

function AppNavigator() {
  const {isLoggedIn} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : !isLoggedIn ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Note"
              component={NoteScreen}
              options={{
                header: () => <NoteHeader />, // NoteHeader 추가
                tabBarStyle: {display: 'none'}, // 탭 메뉴 숨기기
              }}
            />
            <Stack.Screen
              name="AddressScreen"
              component={AddressScreen}
              options={{
                header: () => <AddressHeader />,  // AddressScreen에만 별도의 헤더 사용
                tabBarStyle: { display: 'none' },  // 탭 메뉴 숨기기
              }}
            />
            <Stack.Screen
              name="AddressSearch"
              component={AddressSearchScreen}
              options={{
                header: () => <AddressHeader />,
                tabBarStyle: { display: 'none' }, // 탭 메뉴 숨기기
              }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                header: () => <SearchHeader />, // SearchHeader 추가
                tabBarStyle: {display: 'none'}, // 탭 메뉴 숨기기
              }}
            />
            {/* ProductScreen 별도 관리 */}
            <Stack.Screen
              name="Product"
              component={ProductScreen}
              options={{
                header: () => <ProductHeader />,
                tabBarStyle: {display: 'none'}, // 탭 바 숨기기
              }}
            />
          </>
        )}
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
    paddingBottom: 10,
  },
});

export default AppNavigator;
