import React, { Component } from "react";
import { View, Text,StatusBar, Dimensions,TouchableOpacity,StyleSheet,AsyncStorage} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Icon,Header,Overlay} from 'react-native-elements';
import {TabView,SceneMap,TabBar} from 'react-native-tab-view'; 
import Slider from '../Component/Slider';
import { Dropdown } from 'react-native-material-dropdown';
import Animations from '../Assets/State';
//import PieChart from 'react-native-pie-chart';

import * as Colors from '../Assets/Colors';
import BuyerReq_Component from "../Component/BuyerReq_Component";
import { FlatList } from "react-native-gesture-handler";


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addName } from "../action";


const stateapi="https://indian-cities-api-nocbegfhqg.now.sh/cities";  
const url="http://192.168.43.36:8080/govdata"

const images = [  
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkrEgBWIHLu2qUwMI1_gv5Cijc151AqppcYxtZUW8zUJC5luKP",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsdEFY7G-TRKLVFxI-cs4HSPas7yv1oAgvZn_cXanow5XM9xRe",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsHKK1OpPtIu3Uq-iRu6r8lABGyyjOe8cEJKBW1Zu8fgGgCqxX",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSthOoY4z6McE0rfuYLQYD4p-tQlZCbRpGzrEeyns2bsRuDxaGY",

];

function Iitem({ item }){
  return (
    <View style={styles.listItem}>
   {/* <Image source={{ uri: item.photo }} style={{ width: 60, height: 60, borderRadius: 30 }} /> */}
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontWeight: "bold" ,color: "green"}}>{item.commodity}</Text>
        <Text style={{fontWeight:"bold"}} >{item.min_price}-{item.max_price} (Rs/Quintals) </Text>
        <Text>{item.district},{item.state} </Text>
      </View>
      <TouchableOpacity style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "green" }}>View more</Text>
      </TouchableOpacity>
    </View>
  );
}





class Auth_FarmerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
        index:0,
        routes:[
            {key:'home',title:'Home'},
            {key:'request',title:'Buyer Requests'},
            {key:'history',title:'My History'},
        ],
        data:[
          {
            "buyerId":"B122343243",
            "buyerName":"Tanmay",
            "address":"9/A C-103, Shri Krishna Apartment, Opposite Prince Mangal Karyalaya, Gultekdi, Gultekdi, Pune, Maharashtra 411037",
            "contact":9969108722,
            "produce":"wheat",
            "quantity":"200",            
          }
      ],
      inAnimation: '',
      outAnimation: '',
      produceAnimation:'',
      animation: 'pulse',
      duration: '300',
      cropsinfo:[],
      mydata2:[],
      statesdata:[],
      districtinfo:[],
      fid:'',
      finalstate:[],
      
    }
  }
  componentDidMount(){
    //console.log("tnkoc")

    this.setState({fid:this.props.navigation.state.params.data})
  
    //console.log(this.props.ffid)

    const headers = {
      "Content-type":"application/json",
    }
    
    const data={
      fid:this.props.navigation.state.params.data,
      state:this.state.inAnimation,
      district:this.state.outAnimation,
      commodity:''
    }
    
    fetch(url,{
      method:'POST',
      headers:headers,
      body:JSON.stringify(data)
    })
      .then((response)=>{ return response.json()})
      .then((res)=>{
        this.setState({ 
          cropsinfo:[...this.state.cropsinfo,res ] ,
          
        })
    
             
      })
      .catch(err=>console.log(err))


      const header= {
        "Content-type":"application/json",
      }
      const url2 = "http://192.168.43.36:8080/getstates";
 
      fetch(url2,{
        method:'GET',
        headers:header,
      })
        .then((response)=>{ return response.json()})
        .then((res)=>{
          this.setState({ 
            statesdata:res ,
          })        
               
        })
        
        .catch(err=>console.log(err))


        const header2= {
          "Content-type":"application/json",
        }
        
        const url3 = "http://192.168.43.36:8080/getdistricts";

        const data1 ={state:this.state.inAnimation}
        console.log(data1)        
        fetch(url3,{
          method:'POST',
          headers:header2,
          body:JSON.stringify(data1)
        })
          .then((response)=>{ return response.json()})
          .then((res)=>{
            console.log(res)
            this.setState({ 
              districtinfo:res ,
            })        
                 
          })
          
          .catch(err=>console.log(err))
  


  }
  


  //This is used to call the Fetch api again after change state

  componentDidUpdate(prevProps, prevState) { 
    if (prevState.inAnimation !== this.state.inAnimation) {
      const headers = {
        "Content-type":"application/json",
      }
      const url = "http://192.168.43.36:8080/govdata";
      
       const data={
         state:this.state.inAnimation
       }
  
        fetch(url,{
          method:'POST',
          headers:headers,
          body:JSON.stringify(data)
        })
          .then((response)=>{ return response.json()})
          .then((res)=>{
            this.setState({ 
              cropsinfo:res ,              
            })
             //console.log(this.state.cropsinfo)
                 
          })
          .catch(err=>console.log(err))
    }
    if(prevState.fid!==this.state.fid){
      this.props.addName({
        firstName: this.state.fid
      });
    }
  }
  
  _renderItemRequestBuyer=({ item }) =>{
    return (
      <View style={{marginTop:10}}>
        <BuyerReq_Component data={item}/>
      </View>  
    );
  }



  renderTabBar= props => <TabBar 
      {...props}  
      removeClippedSubviews={true}
      style={{backgroundColor:'transparent'}}
      indicatorStyle={{ backgroundColor: 'white' }}
      labelStyle={{fontSize:12}}

  />

  renderScene=({route})=>{
      if(route.key==='home'){
            return(
              <View style={{flex:1,alignItems: "center",backgroundColor: "transparent",flexDirection:'column'}}>
                  <View style={{paddingTop:0,borderWidth:1,flex:1}}>
                    <Slider images={images} />
                  </View>
              <View style={{ flexDirection: 'row', width: '100%',marginBottom:-10,backgroundColor:'#fff' }}>              
                <View style={{width:'33.33%',paddingLeft:10,paddingRight:5}}>
                  <Dropdown
                    label='Choose State'
                    labelFontSize={12}   
                    data={this.state.statesdata.map(function(item){

                      return {'value':item}
            
                    }
                    )}
                    fontSize={12}    
                    inputContainerStyle={{borderBottomColor:'transparent'}}
                    value={this.state.inAnimation}
                    onChangeText={inAnimation=>{this.setState({inAnimation})}}

                    //  const districts=this.state.statesdata[0].filter(function(item){
                      

                    //   if(item.State===inAnimation) { console.log(item.District);return{value:item.District} }
                    //  })
                    //  this.setState({districtinfo:districts})
                    //  console.log(districts)
                    //  const dis=this.state.districts.map(function(item){
                    //    return {value:item.District}
                    //  })
                    //  console.log(dis)
                
                  
                  />
                </View>
                <View style={{width:'33.33%',paddingLeft:5,paddingRight:5}}>
                  <Dropdown
                    label='Choose District'
                    labelFontSize={12}   
                    data={this.state.districtinfo.map(function(item){

                      return {'value':item}
            
                    }
                    )}
                    fontSize={12}    
                    inputContainerStyle={{borderBottomColor:'transparent',marginBottom:10}}
                    value={this.state.outAnimation}
                    onChangeText={outAnimation => { this.setState({ outAnimation }) }}
                  />
                </View>
                <View style={{width:'33.33%',paddingLeft:5,paddingRight:5}}>
                  <Dropdown
                    label='Choose Produce'
                    labelFontSize={12}   
                    data={Animations}
                    fontSize={12}                  
                    inputContainerStyle={{borderBottomColor:'transparent'}}  
                    value={this.state.produceAnimation}
                    onChangeText={produceAnimation => { this.setState({ produceAnimation }) }}
                  />
                </View>

          </View>

          <View style={styles.container}>
            {
                this.state.inAnimation===''?
                <FlatList
              style={{ flex: 1 }}
              data={this.state.cropsinfo[0]}
              renderItem={({ item }) => <Iitem item={item} />}
             // keyExtractor={item => item.email}
            />:<FlatList
            style={{ flex: 1 }}
            data={this.state.cropsinfo}
            renderItem={({ item }) => <Iitem item={item} />}
           // keyExtractor={item => item.email}
          />
            } 
              
            
          </View>
          </View>
                
            );
      }else if(route.key==='request'){
            return(
              <View style={[{ flex: 1 }, { backgroundColor: "#transparent" }]}>
                <View style={{ paddingTop:5,marginHorizontal:5 }}>
                  <FlatList   
                      data={this.state.data}
                      renderItem={this._renderItemRequestBuyer}                    
                      keyExtractor={item=>item.buyerId}     
                      contentContainerStyle={{paddingBottom:50}}               
                      showsVerticalScrollIndicator={false}
                  />   
                </View>
            </View>
          );
      }else if(route.key==='history'){
         return(
              <View style={[{ flex: 1 }, { backgroundColor: "#transparent" }]}>
                <View style={{ paddingTop:5,marginHorizontal:5 }}>
                  <FlatList   
                      data={this.state.data}
                      renderItem={this._renderItemRequestBuyer}                    
                      keyExtractor={item=>item.buyerId}     
                      contentContainerStyle={{paddingBottom:50}}               
                      showsVerticalScrollIndicator={false}
                  />   
                </View>
            </View>
          );

      }

  };

  render() {  
    
    return (
      <View style={{ flex: 1}} behavior="padding">
        <StatusBar backgroundColor="red" barStyle="light-content" hidden={false} translucent={true} />
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
    );
  }
}
const styles = StyleSheet.create({
  dropdownContainer: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    //  borderColor:'green',


  },
  dropdownContainer2: {
    margin: 3,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    //  borderColor:'green',
    //  borderWidth:3

  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 10,
    // borderColor:'blue',
    // borderWidth:3,
    width: '100%',
    // backgroundColor:'blue'

  },
  listItem: {
    margin: 2,
    padding: 10,
    backgroundColor: "#FFF",
    width: "100%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
    // borderColor:'green',
    // borderWidth:3
  }

});



function mapStateToProps(state) {
  return {
    firstName: state.firstName
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addName: bindActionCreators(addName, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth_FarmerHome);