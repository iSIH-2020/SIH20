import React, { Component } from "react";
import { View, Text ,KeyboardAvoidingView ,StatusBar,Dimensions} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from 'react-native-elements';
import {TabView,SceneMap,TabBar} from 'react-native-tab-view'; 

import * as Colors from '../Assets/Colors';

class Auth_LogisticsReq extends Component {
    constructor(props){
        super(props);
        this.state={

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


        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

export default Auth_LogisticsReq;
