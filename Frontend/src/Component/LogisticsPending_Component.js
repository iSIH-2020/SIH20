import React, { Component } from 'react';
import { View,Text, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LogisticsPending_Component extends Component{
    
    constructor(props){
        super(props);            
    }   

    render(){

        let data=this.props.data

        let ReqColor ='red';
        let ReqText = 'Cancel Request'
        if(data.status==='Pending'){ ReqColor='orange'; ReqText='Cancel Request'}
        else if(data.status==='Rejected'){ ReqColor='red'; ReqText=''}
        else if(data.status==='Accepted'){ ReqColor='green'; ReqText=''}

        return(
            <View style={{flex:1,backgroundColor:'#fff',padding:5,borderRadius:10,elevation:5,marginHorizontal:5}}> 
                <View style={{flexDirection:'column',borderWidth:0}}>
                    <View style={{borderBottomWidth:1,padding:5,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:14}}>Request Sent To- </Text>
                        <View ><Text style={{fontSize:12}}>Date : {data.requestDate}</Text></View>
                    </View>
                    <View style={{padding:5,flexDirection:'column'}}>
                        <View style={{padding:2}}>
                            <Text style={{fontSize:14}}>{data.company}</Text>
                        </View>
                        <View style={{padding:2}}>
                            <Text style={{fontSize:10}}>Pick Up Address : {data.pickupAddress}</Text>
                        </View>
                        <View style={{padding:2}}>
                            <Text style={{fontSize:10}}>Deliver To: {data.destinationAddress}</Text>
                        </View>
                    </View>
                    <View style={{borderBottomWidth:1,padding:5,flexDirection:'row'}}>
                        <Text style={{fontSize:14}}>Details:</Text>                        
                    </View>
                    <View style={{padding:5,flexDirection:'row',borderBottomWidth:1,paddingBottom:5}}>
                        <View style={{flexDirection:'column'}}>                            
                            <View style={{paddingLeft:5,paddingRight:5}}><Text style={{fontSize:12}}>Delivery Date:   {data.deliveryDate}</Text></View>
                            <View style={{paddingLeft:5,paddingRight:5}}><Text style={{fontSize:12}}>Quantity:  {data.quantity} quintals</Text></View>
                            <View style={{paddingLeft:5,paddingRight:5}}><Text style={{fontSize:12}}>Refrigerated Transportation :  {data.refreTransport===true?"Required":"Not Required"}</Text></View>                        
                        </View>
                                               
                    </View>
                    <View style={{flexDirection:'row',borderWidth:0,justifyContent:'center'}}>
                        <View style={{borderWidth:0,paddingTop:15,paddingLeft:0,paddingBottom:15,paddingRight:15}}>
                            <Text style={{fontSize:14}}>STATUS : <Text style={{color:ReqColor}}>{data.status}</Text></Text>
                        </View>
                        <View style={{borderWidth:0,alignItems:'center',justifyContent:'center',marginLeft:60,paddingTop:5}}>
                            <TouchableOpacity>
                                <View style={{padding:5,borderWidth:1,borderRadius:10}}>
                                    <Text style={{fontSize:14}}>{ReqText}</Text>
                                </View>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </View>
            </View>
        );
    }


}


export default LogisticsPending_Component;