import React, { Component } from 'react';
import { View,Text,StatusBar,Dimensions,Picker } from 'react-native';
import { TabView, TabBar } from "react-native-tab-view";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView,FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SearchBar, Icon } from 'react-native-elements';


import * as Colors from '../Assets/Colors';
import LogisticsReq_Component from '../Component/LogisticsReq_Component';
import LogisticsPending_Component from '../Component/LogisticsPending_Component';

class Auth_FarmerLogistics extends Component{
    constructor(props){
        super(props)
        this.state={
            search: '',
            searchFilter:'logisticsName',
            index:0,
            routes:[
                { key: "home", title: "Search Logistics" },
                { key: "request", title: "Pending Request" },
                { key: "track", title: "Track" }
            ],
            Requestdata:[
                {            
                "logisticsName":"Agarwal Packers & Movers Ltd.",
                "address":{
                    "fulladdress":"Sawant Corner Building, Katraj, Mumbai Pune Bypass Rd, Santosh Nagar, Ambegaon BK, Pune, Maharashtra 411046",
                    "district":"Pune",
                    "state":"Maharashtra"            
                },
                "contact":9969108722,
                "refrigTransport":true
            },
            {            
                "logisticsName":"Tanmay Packers & Movers Ltd.",
                "address":{
                    "fulladdress":"Vishrant Corner Building, Katraj, Mumbai Pune Bypass Rd, Santosh Nagar, Ambegaon BK, Pune, Maharashtra 411046",
                    "district":"Pune",
                    "state":"Maharashtra"            
                },
                "contact":9969108722,
                "refrigTransport":true
            },
            
            
        ],
            Pendingdata:[
                {
                    "company":"Agarwal Packers & Movers Ltd.",
                    "requestDate":"07/01/2020",
                    "deliveryDate":"10/01/2020",
                    "pickupAddress":"9/A C-103, Shri Krishna Apartment, Opposite Prince Mangal Karyalaya, Gultekdi, Gultekdi, Pune, Maharashtra 411037",
                    "destinationAddress":"9/A C-103, Shri Krishna Apartment, Opposite Prince Mangal Karyalaya, Gultekdi, Gultekdi, Pune, Maharashtra 411037",
                    "produce":"Rice",
                    "quantity":200,
                    "status":"Pending",
                    "refrigTransport":true,
                }
            ]
        }
    }

    updateSearch = search => {
        this.setState({ search });
      };

    _renderItemRequest = ({ item }) => {
        return (
            <View style={{marginTop:10}}>
                <LogisticsReq_Component data={item}/>
            </View>
        );
    }

    _renderItemPending = ({ item }) => {
        return (
            <View style={{marginTop:10}}>
                <LogisticsPending_Component data={item}/>
            </View>
        );
    }


    renderTabBar = props => <TabBar 
    {...props}
    
    removeClippedSubviews={true}
    style={{backgroundColor:'transparent'}}
    indicatorStyle={{ backgroundColor: 'white', }}
    labelStyle={{fontSize:12}}
     />;

    renderScene=({route})=>{
        if(route.key==="home"){
            let choice = this.state.searchFilter      

            return(
                <View style={{flex:1,backgroundColor:'transparent'}}>
                    <View style={{ marginTop:10,marginHorizontal:5,borderWidth:0 ,flexDirection:'column'}}> 
                        <View style={{borderRadius:15,flexDirection:'row',marginTop:5}}>
                            <View style={{backgroundColor:'#fff',borderRadius:15,flexDirection:'row',alignItems:'center',flex:2}}>
                                 <TextInput
                                    style={{padding:5,paddingLeft:20,width:"80%",backgroundColor:'#fff',borderRadius:15,borderWidth:0}}
                                    multiline={false}
                                    autoCompleteType="off"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="Search For Logistics"      
                                    onChangeText={this.updateSearch}   
                                    value={this.state.search}                   
                                />        
                                <View style={{flex:1}} >
                                    <Icon name="cross" type="entypo" size={20} onPress={()=>{this.setState({search:''})}}/>      
                                </View>                             
                            </View>  
                            <View style={{flex:1,borderWidth:0,alignItems:'center',justifyContent: 'center',marginLeft:10,paddingLeft:10,marginTop:0,backgroundColor:'#fff',borderRadius:15}} >
                                <Picker
                                style={{height:20, width: 120}}                          
                                mode="dialog"                          
                                selectedValue={this.state.searchFilter}
                                prompt="Choose a Search Filter"                          
                                onValueChange={(itemValue,itemIndex) =>{
                                this.setState({searchFilter: itemValue})
                                }
                                
                            }>
                                <Picker.Item label="Name" value="logisticsName" />
                                <Picker.Item label="Address" value="address" />                            
                                {/* <Picker.Item label="Refrigerated Transport" value="refrigTransport" /> */}

                            </Picker>
                        </View>
                        </View>
                        <View style={{marginTop:5}}/>                      
                         {
                            choice==='logisticsName'?                                      
                        <FlatList                    
                            data={this.state.Requestdata.filter(item => item.logisticsName.toLowerCase().includes(this.state.search))}
                            renderItem={this._renderItemRequest}                    
                            keyExtractor={item=>item.logisticsName}     
                            contentContainerStyle={{paddingBottom:80}}               
                            showsVerticalScrollIndicator={false}
                        />: choice==='address'? 
                        <FlatList                    
                            data={this.state.Requestdata.filter(item => item.address.fulladdress.toLowerCase().includes(this.state.search))}
                            renderItem={this._renderItemRequest}                    
                            keyExtractor={item=>item.warehouseId}     
                            contentContainerStyle={{paddingBottom:80}}               
                            showsVerticalScrollIndicator={false}
                        />:null
                        }   
                            
                    </View>
                </View>
            );
            
        }else if(route.key=="request"){
            return(
                <View style={{flex:1,backgroundColor:'transparent'}}>
                <View style={{ marginTop:10,marginHorizontal:5,borderWidth:0 }}>
                    <FlatList                    
                            data={this.state.Pendingdata}
                            renderItem={this._renderItemPending}                    
                            keyExtractor={item=>item.warehousename}     
                            contentContainerStyle={{paddingBottom:50}}               
                            showsVerticalScrollIndicator={false}
                        />          
                </View>
            </View>
            );
        }else if(route.key==="track"){
            return(
                <View style={{flex:1,backgroundColor:'transparent'}}>
                <View style={{ marginTop:10,marginHorizontal:5,borderWidth:0 }}>
                    <FlatList                    
                            data={this.state.Pendingdata}
                            renderItem={this._renderItemPending}                    
                            keyExtractor={item=>item.warehousename}     
                            contentContainerStyle={{paddingBottom:50}}               
                            showsVerticalScrollIndicator={false}
                        />          
                </View>
            </View>
            );
        }

    }

    render(){
        return(
            <View style={{ flex: 1 }} behavior="padding">
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
        );
    }

}

export default Auth_FarmerLogistics;