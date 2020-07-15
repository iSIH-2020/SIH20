import React, { Component } from 'react';
import { View, Text,StatusBar, Dimensions} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Icon,Header,Overlay} from 'react-native-elements';
import * as Colors from '../Assets/Colors';



class Auth_WarehouseHome extends Component {
    

    render(){
        return(
            <View style={{ flex: 1}} behavior="padding">
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
                
                {/* <TabView
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    onIndexChange={index=>this.setState({ index })}
                    initialLayout={{ width:Dimensions.get('window').width }}
                    swipeEnabled={true}
                    renderTabBar={this.renderTabBar}
                /> */}
                    
            </LinearGradient>
          </View>
        )
    }
}

export default Auth_WarehouseHome