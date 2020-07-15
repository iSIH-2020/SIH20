import React, { Component } from "react";
import { View, StatusBar, Text, Dimensions, Picker, KeyboardAvoidingView, AsyncStorage } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TabView, TabBar } from "react-native-tab-view";
import { Button, Icon, Overlay, Input } from "react-native-elements";
import { ScrollView, FlatList ,TextInput, TouchableOpacity} from "react-native-gesture-handler";
import WarehouseReq_Component from '../Component/WarehouseReq_Component';
import WarehousePending_Component from "../Component/WarehousePending_Component";

import {connect} from 'react-redux';

import * as Colors from "../Assets/Colors";


class Auth_FarmerWarehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produceChoice:'',
      quantity:'',
      isVisible:true,
      searchWarehouse:'',
      isFetching:false,
      searchFilter:'warehousename',
      index: 0,
      routes: [
        { key: "home", title: "Search Warehouses" },
        { key: "request", title: "Pending Request" },
        { key: "history", title: "Warehouse Store" }
      ],
      Requestdata:[],
      RequestdataOne:null,
      Pendingdata:[],
      fid:'',
      autorecom:true,

    };
  }


  componentDidMount=()=>{

    this.setState({index:0})


    //SETTING THE REQUEST DATA ie FOR Displaying all the warehouses list
    const headers={
      'Content-type':'application/json'      
    }
    const url='http://192.168.43.36:8080';
    const data99 ={
      fid:this.props.firstName
    }

    fetch(url+'/allw',{
      method:'POST',
      headers:headers,
      body:JSON.stringify(data99)
    })
    .then((response)=>{ return response.json()})
    .then((res)=>{
      this.setState({
        Requestdata:res,
        isVisible:true
      })
      
    })
    .catch(err=>console.log(err))

    const headers22={
      'Content-type':'application/json'      
    }
    const url12='http://192.168.43.36:8080';
    const data992 ={
      fid:this.props.firstName
    }

    fetch(url12+'/allw1',{
      method:'POST',
      headers:headers22,
      body:JSON.stringify(data992)
    })
    .then((response)=>{ return response.json()})
    .then((res)=>{
      this.setState({
        RequestdataOne:res,
        isVisible:true
      })
      
    })
    .catch(err=>console.log(err))



    //GET request to get the Pending Requests of the farmer
    const header={
      'Content-type':'application/json',        

    }
    const url2='http://192.168.43.36:8080';

    fetch(url2+'/pullfreqwpa/'+this.props.firstName,{
      method:'GET',
      headers:header,
    })
    .then((response)=>{ return response.json()})
    .then((res)=>{
     // console.log(res)
      this.setState({
        Pendingdata:res,
        isVisible:true
      })
    })

    .catch(err=>console.log(err))

  }


  getApiData=()=>{
    const header={
      'Content-type':'application/json',        

    }
    const url2='http://192.168.43.36:8080';

    fetch(url2+'/pullfreqwpa/'+this.props.firstName,{
      method:'GET',
      headers:header,
    })
    .then((response)=>{ return response.json()})
    .then((res)=>{
      //console.log(res)
      this.setState({
        Pendingdata:res,
        
        isFetching:false 
      })
    })

    .catch(err=>console.log(err))


}

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.getApiData() });
 }


  

  handleCheckWarehouse=()=>{  
    

    //Handling the check warehouses Returns list of sorted warehouses based upon input
    // const headers={
    //   'Content-type':'application/json'      
    // }
    // const url='http://192.168.43.36:8080';

    // fetch(url+'/allw',{
    //   method:'GET',
    //   headers:headers
    // })
    // .then((response)=>{ return response.json()})
    // .then((res)=>{
    //   this.setState({
    //     Requestdata:res,
    //     isVisible:false
    //   })
    //   console.log(res)
      
    // })

    // .catch(err=>console.log(err))

    

  }

  updateSearch = searchWarehouse => {
    this.setState({ searchWarehouse });
  };

  _renderItemRequest = ({ item }) => {
    const produce = this.state.produceChoice;
    const quantity = this.state.quantity;
    return (
      <View style={{marginTop:15}}>
          <WarehouseReq_Component data={item} produce={produce} quantity={quantity}/>
      </View>
    );
}

_renderItemPending=({ item }) =>{
  return (
    <View style={{marginTop:10}}>
      <WarehousePending_Component data={item}/>
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

  renderScene = ({ route }) => { 
    if (route.key === "home") {
      let choice = this.state.searchFilter      
      return (
        <View style={{ flex: 1, backgroundColor: "transparent" }} >
          
          <View style={{ paddingTop:5,marginHorizontal:5}}>     
            <View style={{borderRadius:15,flexDirection:'row',marginTop:5}}>
                <View style={{backgroundColor:'#fff',borderRadius:15,flexDirection:'row',alignItems:'center',marginTop:5,flex:2}}>
                    <TextInput
                        style={{padding:5,paddingLeft:20,width:"80%",backgroundColor:'#fff',borderRadius:15,borderWidth:0}}
                        multiline={false}
                        autoCompleteType="off"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Search For Warehouses"      
                        onChangeText={this.updateSearch}   
                        value={this.state.searchWarehouse}                   
                    />        
                    <View style={{flex:1,borderWidth:0}} >
                        <Icon name="cross" type="entypo" size={20} onPress={()=>{this.setState({searchWarehouse:''})}}/>                            
                    </View>                                              
                </View>  
                    <View style={{flex:1,borderWidth:0,alignItems:'center',justifyContent: 'center',marginLeft:10,paddingLeft:10,marginTop:5,backgroundColor:'#fff',borderRadius:15}} >
                        <Picker
                            style={{height:20, width: 120}}                          
                            mode="dialog"                          
                            selectedValue={this.state.searchFilter}
                            prompt="Choose a Search Filter"                          
                            onValueChange={(itemValue,itemIndex) =>{
                              this.setState({searchFilter: itemValue})
                            }
                              
                          }>
                            <Picker.Item label="Name" value="warehousename" />
                            <Picker.Item label="Address" value="warehouseAddress" />                            
                            <Picker.Item label="Produce" value="tycrops" />
                            <Picker.Item label="Storage Space Available" value="freestorage"/>


                        </Picker>
                    </View>              
              </View>
              <View style={{marginTop:5}}/>

            {
              this.state.autorecom === false ? 
             <View> 
              {/* <Button title="Show all warehouses" onPress={()=>this.setState({autorecom:false})}/>

               <FlatList                    
                data={this.state.RequestdataOne}
                renderItem={this._renderItemRequest}                    
                keyExtractor={item=>item.contact}     
                contentContainerStyle={{paddingBottom:200}}               
                showsVerticalScrollIndicator={false}
              /> */}
          </View>
          :
            (
              
                choice==='warehousename'?              
              
              <FlatList                    
                  data={this.state.Requestdata.filter(item => item.wname.toLowerCase().includes(this.state.searchWarehouse))}
                  renderItem={this._renderItemRequest}                    
                  keyExtractor={item=>item.contact}     
                  contentContainerStyle={{paddingBottom:80}}               
                  showsVerticalScrollIndicator={false}
              />: choice==='warehouseAddress'? 
              <FlatList                    
                  data={this.state.Requestdata.filter(item => item.address.fulladdress.toLowerCase().includes(this.state.searchWarehouse))}
                  renderItem={this._renderItemRequest}                    
                  keyExtractor={item=>item.contact}     
                  contentContainerStyle={{paddingBottom:80}}               
                  showsVerticalScrollIndicator={false}
              />:choice==='tycrops'?<FlatList                    
                  data={this.state.Requestdata.filter(item => item.typ.find((item)=>{return this.state.searchWarehouse===''? item : item.toLowerCase()===this.state.searchWarehouse}))}
                  renderItem={this._renderItemRequest}                    
                  keyExtractor={item=>item.contact}     
                  contentContainerStyle={{paddingBottom:80}}               
                  showsVerticalScrollIndicator={false}
              />:choice==='freestorage'?
              <FlatList                    
                  data={this.state.Requestdata.filter(item => item.stcap.toLowerCase().includes(this.state.searchWarehouse))}
                  renderItem={this._renderItemRequest}                    
                  keyExtractor={item=>item.contact}     
                  contentContainerStyle={{paddingBottom:80}}               
                  showsVerticalScrollIndicator={false}
              />:null
              
            )
            
            }


              

          </View>
        </View>
      );
    } else if (route.key === "request") {
      return (
        <View style={[{ flex: 1 }, { backgroundColor: "#transparent" }]}>
          <View style={{ paddingTop:5,marginHorizontal:5 }}>
            <FlatList         
                data={this.state.Pendingdata}
                renderItem={this._renderItemPending}                    
                keyExtractor={item=>item._id}     
                contentContainerStyle={{paddingBottom:50}}               
                showsVerticalScrollIndicator={false}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
            />   
          </View>
        </View>
      );
    }else if(route.key==="history"){
      return (
        <View style={[{ flex: 1 }, { backgroundColor: "#transparent" }]}>
          <View style={{ paddingTop:5,marginHorizontal:5 }}>
            <FlatList         
                data={this.state.Pendingdata}
                renderItem={this._renderItemPending}                    
                keyExtractor={item=>item._id}     
                contentContainerStyle={{paddingBottom:50}}               
                showsVerticalScrollIndicator={false}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
            />   
          </View>
        </View>
      );
    }


    
  };
  render() {
    
    // AsyncStorage.getItem('fid')
    //   .then((value)=>{
    //     this.setState({fid:value})      
    //   })

   // console.log(this.props.fid)
   console.log(this.props.firstName)

    return (
      <View style={{ flex: 1 }} behavior="padding">
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <LinearGradient
          style={{ flex: 1 }}
          colors={[Colors.BG_GRADIENT_1, Colors.BG_GRADIENT_2]}
        >
        <View style={{marginTop:StatusBar.currentHeight}}></View>
          {/* <Header
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomWidth: 1
            }}
          /> */}

          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get("window").width }}
            swipeEnabled={true}
            renderTabBar={this.renderTabBar}
          />
          {/* <Overlay isVisible={this.state.isVisible} >
            <View style={{paddingTop:20,flexDirection:'column'}}>
                <View style={{flex:1,alignItems:'flex-end'}} >
                 
                </View>
              <View style={{borderWidth:0,alignItems:"center",padding:10,marginTop:20}}>
                <View style={{flex:4}}><Text>Enter the details to start requesting the warehouse</Text></View>                
              </View>
              <View style={{borderWidth:0,alignItems:"center",padding:10,marginTop:30}}>
                <Text>Select Agricultural Produce</Text>
              </View>
              <View style={{borderTopWidth:1}}>
                  <Picker 
                    style={{marginLeft:20}}
                    mode="dialog"
                    selectedValue={this.state.produceChoice}
                    onValueChange={(itemValue,itemIndex) =>{
                      this.setState({produceChoice: itemValue})
                    }}  
                  >
                    <Picker.Item label="Rice" value="Rice" />
                    <Picker.Item label="Wheat" value="Wheat" />                            
                    <Picker.Item label="Grapes" value="Grapes" />
                    <Picker.Item label="Chocolate" value="Choco"/>

                  </Picker>
              </View>
              <KeyboardAvoidingView behavior="padding">
                <View style={{alignItems:'center',marginTop:20}}>
                  <Input 
                      ref={(input) => { this.contactInput = input; }}
                      placeholder={'Enter Quantity of '+this.state.produceChoice}
                      inputStyle={{marginHorizontal:20}}
                      inputContainerStyle={{borderWidth:0,borderRadius:10,backgroundColor:'#fff'}}
                      keyboardType='phone-pad'
                      textContentType='telephoneNumber'
                      blurOnSubmit={false}
                      autoCapitalize='none'
                      onChangeText={text=>this.setState({quantity:text})}
                      value={this.state.quantity}
                      autoFocus={false}
                      autoCompleteType='tel'
                      returnKeyType='next'
                      maxLength={5}
                  />
                </View>             
              </KeyboardAvoidingView>        
              <View style={{marginTop:40,padding:5,borderWidth:0}}>
                  <Button 
                    title="Check For Warehouses" 
                    onPress={()=>{this.handleCheckWarehouse()}}                    
                  />
                  <Button 
                    containerStyle={{marginTop:10}}   
                    buttonStyle={{backgroundColor:'red'}}                 
                    title="Cancel"   
                    onPress={()=>{this.setState({isVisible:false})}}                    
                  />
              </View>       
            </View>
          </Overlay> */}
        </LinearGradient>
      </View>
    );
  }
}

function mapStateToProps(state){
  return{
    firstName:state.firstName
  }
}

 
export default connect(mapStateToProps)(Auth_FarmerWarehouse)
