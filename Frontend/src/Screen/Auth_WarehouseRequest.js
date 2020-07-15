import React, { Component } from 'react';
import { View, Text,StatusBar, Dimensions,TouchableOpacity,StyleSheet} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Icon,Header,Overlay} from 'react-native-elements';
import * as Colors from '../Assets/Colors';
import { TabView, TabBar } from "react-native-tab-view";

class Auth_WarehouseRequest extends Component{
    
    constructor(props){
        super(props)
        this.state={
            index: 0,
            routes: [
                { key: "pending", title: "Pending Request" },
                { key: "storage", title: "Warehouse Storage" },
            ],
        }
    }


    renderTabBar = props => <TabBar {...props} />;
    
    renderScene = ({ route }) => { 
        if(route.key==='pending'){
            return(
                <View>
                    <Text>Yaha progress bar aayega</Text>
                </View>
            );
        }else if(route.key==='storage'){
            return(
                <View>
                    <Text>Yaha Pending Rquests</Text>
                </View>
            );
        }
    }

    render(){
        return(
            <View style={{ flex: 1}} behavior="padding">
            <StatusBar barStyle="light-content" hidden={false} translucent={true} />
            <LinearGradient style={{ flex: 1 }} colors={[Colors.BG_GRADIENT_1, Colors.BG_GRADIENT_2]}>
            <View style={{marginTop:StatusBar.currentHeight}}></View>                  
               <TabView
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get("window").width }}
                    swipeEnabled={true}
                    renderTabBar={this.renderTabBar}
                />                        
            </LinearGradient>
          </View>
        )
    }
}

export default Auth_WarehouseRequest;