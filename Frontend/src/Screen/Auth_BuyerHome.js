import React, { Component } from 'react';
import { View, Text,StatusBar,Dimensions,FlatList,TouchableOpacity} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Icon,Header,Overlay} from 'react-native-elements';
import { TabView, TabBar } from "react-native-tab-view";
import * as Colors from '../Assets/Colors';
import FarmerReq_Component from '../Component/FarmerReq_Component'
import BuyerTrack_Component from '../Component/BuyerTrack_Component';
import BuyerPendingReq_Component from './BuyerPendingReq_Component';

const Baseurl = 'http://192.168.43.36:8080';  

class Auth_BuyerHome extends Component{

    constructor(props){
        super(props);
        this.state={
            index:0,
            bid:'',
            routes:[
                { key: "bhome", title: "Home" },
                { key: "btrack", title: "Pending Req" },                                
                { key: "baccept", title: "Track" },                                
            ],
            isFetching: false,             
            Farmerdata:[ ],


            trackData:[
                {
                    rid:1,
                    "pickupAddress" : "10 C Almora Anushaktinagar Mumbai",
                    "destinationAddress" : "16 A Dhawalgiri Anushaktinagar Mumbai",
                    "status" : "pending",
                    "produce" : "Wheat",
                    "quantity" : 222,                    

                }
            ],
            pendingData:[
                {
                    rid:1,
                    "pickupAddress" : "10 C Almora Anushaktinagar Mumbai",
                    "destinationAddress" : "16 A Dhawalgiri Anushaktinagar Mumbai",
                    "status" : "pending",
                    "produce" : "Wheat",
                    "quantity" : 222,                    

                }
                
            ]
        }
    }

    componentDidMount=()=>{

        this.setState({bid:this.props.navigation.state.params.data})



        const headers={
            'Content-type':'application/json',  
            "Accept":'application/json'
          
        }
        
        const url= Baseurl+'/pullf'

        fetch(url,{
            method:'GET',
            headers:headers
        })
        .then((response)=>{ return response.json()})
        .then((res)=>{
            //console.log(res)
            this.setState({
                Farmerdata:res
            })
        })

        .catch(err=>console.log(err))




        const header={
            'Content-type':'application/json',  
        }
        
        const url2 = 'http://192.168.43.36:8080/pullbreqbp/';        

        fetch(url2+this.props.navigation.state.params.data,{
            method:'GET',
            headers:header,
        })
        .then((response)=>{response.json()})
        .then((res)=>{
            console.log(res)
            this.setState({
                pendingData:res,
                succMsg:'Request sent successfully'
            })
            
        })

        .catch(err=>console.log(err))

    }

    getApiData=()=>{
        const headers={
            'Content-type':'application/json',            
        }
        
        const url= Baseurl+'/pullf'

        fetch(url,{
            method:'GET',
            headers:headers
        })
        .then((response)=>{ return response.json()})
        .then((res)=>{
            console.log("Idahr fetch hoga track wala data")
            this.setState({ isFetching: false })        
        })

        .catch(err=>console.log(err))

    }
    
    onRefresh() {
        this.setState({ isFetching: true }, function() { this.getApiData() });
     }
        
    _renderFarmerPending=({ item }) =>{
        return (
        <View style={{marginTop:10}}>
            <FarmerReq_Component data={item} bid ={this.state.bid}/>
        </View>  
        );
    
    }

    _renderBuyerPending = ({item})=>{
        return (
            <View style={{marginTop:10}}>
                <BuyerPendingReq_Component data={item} bid ={this.state.bid}/>
            </View>  
            );
           
    }


    _renderTrack=({item})=>{
        return(
            <View style={{marginTop:0}}>
                <BuyerTrack_Component data={item} bid ={this.state.bid}/>
            </View>
        )
    }


   

    renderTabBar = props => <TabBar 
    {...props}  
    removeClippedSubviews={true}
    style={{backgroundColor:'transparent'}}
    indicatorStyle={{ backgroundColor: 'white' }}
    labelStyle={{fontSize:12}}
    />;

    renderScene=({route})=>{
        if(route.key==="bhome"){
            return(
                <View style={[{ flex: 1 }, { backgroundColor: "#transparent" }]}>
                    <View style={{ paddingTop:5,marginHorizontal:5 }}>
                        <FlatList         
                            data={this.state.Farmerdata}
                            renderItem={this._renderFarmerPending}                    
                            keyExtractor={item=>item.fid}     
                            contentContainerStyle={{paddingBottom:50}}               
                            showsVerticalScrollIndicator={false}
                        />   
                    </View>
                </View>
            );
        }else if(route.key==="btrack"){
            return(
                
                <View style={[{ flex: 1 }, { backgroundColor: "#transparent" }]}>
                    <View style={{ paddingTop:5,marginHorizontal:5 }}>
                        <FlatList         
                            data={this.state.pendingData}
                            renderItem={this._renderBuyerPending}                    
                            keyExtractor={item=>item.bid}     
                            contentContainerStyle={{paddingBottom:50}}
                            showsVerticalScrollIndicator={false}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                        />   
                    </View>
                </View>
            );
        }else if(route.key==="baccept"){
            return(
                
                <View style={[{ flex: 1 }, { backgroundColor: "#transparent" }]}>
                    <View style={{ paddingTop:5,marginHorizontal:5 }}>
                        <FlatList                                     
                            data={this.state.trackData}
                            renderItem={this._renderTrack}                    
                            keyExtractor={item=>item.rid}     
                            contentContainerStyle={{paddingBottom:50}}
                            showsVerticalScrollIndicator={false}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                        />   
                    </View>
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
                            onIndexChange={index=>this.setState({ index })}
                            initialLayout={{ width:Dimensions.get('window').width }}
                            swipeEnabled={true}
                            renderTabBar={this.renderTabBar}
                        />
                        
                </LinearGradient>
          </View>
        )
    }


}


export default Auth_BuyerHome;