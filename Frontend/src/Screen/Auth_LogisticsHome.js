import React, { Component } from "react";
import { View, Text ,KeyboardAvoidingView ,StatusBar,Dimensions} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from 'react-native-elements';
import {TabView,SceneMap,TabBar} from 'react-native-tab-view'; 

import * as Colors from '../Assets/Colors';

class Auth_LogisticsHome extends Component {
    constructor(props){
        super(props);
        this.state={
            index:0,
            routes:[
                {key:'pending',title:"My Requests"},                
            ]
        }
    }
    renderTabBar= props => <TabBar {...props}  />

    renderScene=({route})=>{
        if(route.key==='pending'){
            return(
                <View>

                </View>
            )
        }
    }
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <LinearGradient style={{ flex: 1 }} colors={[Colors.BG_GRADIENT_1, Colors.BG_GRADIENT_2]}>
        <Header 
                containerStyle={{backgroundColor:'transparent',borderBottomWidth:1}} 
                // leftComponent={
                //     <TouchableOpacity style={{marginTop:20}}>
                //         <Icon name="menu"/>
                //     </TouchableOpacity>
                // }               
        
            />

        <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                onIndexChange={index=>this.setState({ index })}
                initialLayout={{ width:Dimensions.get('window').width }}
                swipeEnabled={true}
                renderTabBar={this.renderTabBar}
            />


        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

export default Auth_LogisticsHome;
