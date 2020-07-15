import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LogisticsReq_Component extends Component{
render(){

    let data = this.props.data
    let transport = data.refrigTransport===true? "Available":"Unavailable"

    return(
        <View style={{backgroundColor:'#fff',borderRadius:10,flexDirection:'column',padding:5}}>
            <View style={{borderBottomWidth:1,padding:10,paddingTop:20,marginHorizontal:5}}>
                <Text>{data.logisticsName}</Text>
            </View>            
            <View style={{borderBottomWidth:0,padding:10,marginHorizontal:5}}>
                <Text>Address: {data.address.fulladdress}</Text>
            </View> 
            <View style={{borderBottomWidth:1,paddingBottom:10,paddingTop:0,paddingLeft:10,paddingRight:10,marginHorizontal:5}}>
                <Text>Contact: {data.contact}</Text>
            </View>           
            <View style={{flexDirection:'row'}}>
                <View style={{borderWidth:0,padding:10,flex:1,justifyContent:'center'}}>
                    <Text>Refrigerated Transport : {transport}</Text>
                </View>            
                <View style={{borderWidth:0,padding:10,paddingLeft:20}}>
                    <TouchableOpacity>
                        <View style={{borderWidth:1,borderRadius:10,alignItems:'center',padding:10}}><Text style={{fontSize:12}}>Request</Text></View>
                    </TouchableOpacity>
                </View>            
            </View>
        </View>
    )
}


}


export default LogisticsReq_Component;