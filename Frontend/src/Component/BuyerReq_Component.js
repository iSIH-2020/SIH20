import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class BuyerReq_Component extends Component{
render(){

    let data = this.props.data
    return(
        <View style={{backgroundColor:'#fff',borderRadius:10,flexDirection:'column',padding:5}}>
            <View style={{borderBottomWidth:1,padding:10,paddingTop:10,marginHorizontal:5}}>
                <Text>Buyer Name : {data.buyerName}</Text>
            </View>            
            <View style={{borderBottomWidth:0,paddingLeft:10,paddingTop:5,marginHorizontal:5}}>
                <Text style={{fontSize:12}}>Request For : {data.produce}</Text>
            </View> 
            <View style={{borderBottomWidth:0,paddingLeft:10,paddingTop:0,marginHorizontal:5}}>
                <Text style={{fontSize:12}}>Quantity Required : {data.quantity}</Text>
            </View> 
            <View style={{borderBottomWidth:0,padding:10,marginHorizontal:5}}>
                <Text style={{fontSize:10}}>Address: {data.address}</Text>
            </View> 
            <View style={{borderBottomWidth:1,paddingBottom:10,paddingTop:0,paddingLeft:10,paddingRight:10,marginHorizontal:5}}>
                <Text style={{fontSize:10}}>Contact: {data.contact}</Text>
            </View>           
            <View style={{flexDirection:'row'}}>
                <View style={{borderWidth:0,padding:10,flex:1,justifyContent:'center'}}>
                    {/* <Text>Refrigerated Transport : {transport}</Text> */}
                </View>            
                <View style={{borderWidth:0,padding:5,paddingLeft:20,flexDirection:'row'}}>
                    <TouchableOpacity >
                        <View style={{borderWidth:1,borderRadius:10,alignItems:'center',padding:8,backgroundColor:'green'}}><Text style={{fontSize:10}}>Accept</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:10,marginRight:10}}>
                        <View style={{borderWidth:1,borderRadius:10,alignItems:'center',padding:8}}><Text style={{fontSize:10}}>Reject</Text></View>
                    </TouchableOpacity>
                </View>            
            </View>
        </View>
    )
}


}


export default BuyerReq_Component;