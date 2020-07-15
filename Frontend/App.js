import React, { Component } from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { ApplicationProvider } from "react-native-ui-kitten";
import { mapping, light as lightTheme } from "@eva-design/eva";
import {View} from 'react-native'
import Auth_Login from "./src/Screen/Auth_Login";
import Auth_FarmerHome from "./src/Screen/Auth_FarmerHome";
import Auth_FarmerWarehouse from "./src/Screen/Auth_FarmerWarehouse";
import LandKarodoMujhe from "./src/Component/LandKaradoMujhe";
import SelectedBadge from "./src/Component/Navigation_Badge";
import Auth_FarmerLogistics from "./src/Screen/Auth_FarmerLogistics";
import Auth_WarehouseHome from "./src/Screen/Auth_WarehouseHome";
import Auth_WarehouseRequest from "./src/Screen/Auth_WarehouseRequest";

import { Colors } from "./src/Assets/Colors";
import Auth_BuyerHome from "./src/Screen/Auth_BuyerHome";
import Auth_LogisticsHome from "./src/Screen/Auth_LogisticsHome";
import Auth_LogisticsReq from "./src/Screen/Auth_LogisticsReq";

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { rootReducer } from './src/reducer/name';


const store = createStore(rootReducer)




console.disableYellowBox = true;
const mainNavigator = createBottomTabNavigator({

  //SignUp and Login
  auth: createBottomTabNavigator(
    {
      // test: { screen: LandKarodoMujhe, navigationOptions: { tabBarVisible: false } },

      auth_login: {
        screen: Auth_Login,
        navigationOptions: { tabBarVisible: false }
      }
    },
    {
      navigationOptions: {
        tabBarVisible: false
      }
    }
  ),

  //Farmer Login
  farmer: createBottomTabNavigator(
    {
      Home: {
        screen: Auth_FarmerHome,
        navigationOptions: {
          tabBarLabel: '',
          tabBarIcon: focused => {
            return <SelectedBadge val={focused} name="Home"></SelectedBadge>;
          }
        }
      },
      Warehouse: {
        screen: Auth_FarmerWarehouse,
        navigationOptions: {
          tabBarVisible: true,
          tabBarIcon: focused => {
            return <SelectedBadge val={focused} name="Warehouse"></SelectedBadge>;
          }
        }
      },
      Logistics: {
        screen: Auth_FarmerLogistics,
        navigationOptions: {
          tabBarVisible: true,
          tabBarIcon: focused => {
           return (
          
             <SelectedBadge val={focused} name="Logistics"></SelectedBadge>
          
           );
          }
        }
      }
    },
    {
      navigationOptions: {
        tabBarVisible: false,      
      },
      labeled: false,
      initialRouteName:'Home',
      activeColor: "green",
      inactiveColor: "blue",      
      tabBarOptions: {
        style: { paddingBottom: 20,backgroundColor:'#3a6073' },
        showLabel:false,
        
      }
      
    }
  ),

  //Warehouse Login
  warehouse: createBottomTabNavigator(
    {
      WarehouseHome: {
        screen: Auth_WarehouseHome,
        navigationOptions: {
          tabBarIcon: focused => {
            return  <SelectedBadge val={focused} name="Home"></SelectedBadge>;
          }
        }
      },

      WarehouseRequest: {
        screen: Auth_WarehouseRequest,
        navigationOptions: {
          tabBarVisible: true,
          tabBarIcon: focused => {
            return  <SelectedBadge val={focused} name="Warehouse"></SelectedBadge>;
          },
          
        }
      }
    },
    {
      navigationOptions: {
        tabBarVisible: false
      },
      labeled: false,
      activeColor: "green",
      inactiveColor: "blue",
      tabBarOptions: {
        style: { paddingBottom: 20 }
      }
    }
  ),

  //Logistics Login

  logistics: createBottomTabNavigator(
    {
      LogisticsHome: {
        screen: Auth_LogisticsHome,
        navigationOptions: {
          tabBarIcon: focused => {
            return  <SelectedBadge val={focused} name="Home"></SelectedBadge>;
          }
        }
      },
      LogisticsReq:{
        screen: Auth_LogisticsReq,
        navigationOptions: {
          tabBarVisible: true,
          tabBarIcon: focused => {
            return  <SelectedBadge val={focused} name="Warehouse"></SelectedBadge>;
          }
        }
      },
    },
    {
      navigationOptions: {
        tabBarVisible: false
      },
      labeled: false,
      activeColor: "red",
      inactiveColor: "blue",
      tabBarOptions: {
        style: { paddingBottom: 20,backgroundColor:'#3a6073' },
        showLabel:false,

      }
    }
  ),

    //Buyer Login

  buyer: createBottomTabNavigator(
    {
      BuyerHome: {
        screen: Auth_BuyerHome,
        navigationOptions: {
          tabBarIcon: focused => {
            <SelectedBadge val={focused} name="Home"></SelectedBadge>;
          }
        }
      },

      // BuyerRequest: {
      //   screen: Auth_WarehouseRequest,
      //   navigationOptions: {
      //     tabBarVisible: true,
      //     tabBarIcon: focused => {
      //       <SelectedBadge val={focused} name="Warehouse"></SelectedBadge>;
      //     }
      //   }
      // }
    },
    {
      navigationOptions: {
        tabBarVisible: false
      },
      labeled: false,
      activeColor: "#6a0dad",
      inactiveColor: "blue",
      tabBarOptions: {
        style: { paddingBottom: 20 }
      }
    }
  )
});

const Navigator = createAppContainer(mainNavigator);

export default class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>

    );
  }
}
