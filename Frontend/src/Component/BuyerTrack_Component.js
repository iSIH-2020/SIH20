import React, { Component } from 'react';
import { View,Text,Picker,Button,KeyboardAvoidingView } from 'react-native';
import { Icon, Overlay,Input } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';

class BuyerTrack_Component extends Component{

    constructor(props){
        super(props)
        this.state={            
        }    
    }

    render(){
        let data = this.props.data
        return(
            <View>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#aaa'}}>Pull down to refresh</Text>
                </View>
                <View style={{backgroundColor:'#fff',borderRadius:10,marginTop:5,flexDirection:'column',padding:8}}>
                    <View style={{padding:10,borderBottomWidth:1,flexDirection:'row'}}>
                        <Text>REQUEST SENT TO </Text>
                        <View style={{paddingLeft:5,paddingRight:5,paddingTop:0,borderWidth:0}}>
                            <Text> Tanmay Nale</Text>
                        </View>
                    </View>
                    
                    <View style={{paddingLeft:5,paddingRight:5,paddingTop:3,borderWidth:0}}>
                        <Text>Pickup Address : <Text style={{fontSize:12}}>{data.pickupAddress}</Text></Text>
                    </View>
                    <View style={{paddingLeft:5,paddingRight:5,paddingTop:3,borderWidth:0}}>
                        <Text>Destination Address : <Text style={{fontSize:12}}>{data.destinationAddress}</Text></Text>
                    </View>
                    <View style={{paddingLeft:5,paddingRight:5,paddingTop:3,borderWidth:0}}>
                        <Text>Produce Name : {data.produce}</Text>
                    </View>
                    <View style={{paddingLeft:5,paddingRight:5,paddingTop:3,borderWidth:0}}>
                        <Text>Quantity : {data.quantity} Quintals</Text>
                    </View>
                </View>

            </View>
        );
    }
}

export default BuyerTrack_Component;