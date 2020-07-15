import React,{Component} from 'react';
import {View,Text,StatusBar, Button,Dimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Input,Icon} from 'react-native-elements';
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import * as Colors from '../Assets/Colors';
import Geocoder from 'react-native-geocoder'


// navigator.geolocation.getCurrentPosition(
//     (position) => console.log(position),
//     (err) => console.log(err),
//     { enableHighAccuracy: true, timeout: 8000, maximumAge: 10000 }
// );

const url="https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000012f71f627d3ca4fac4963e4a1ffdc87ef&format=json&state=Maharashtra&offset=0&limit=20&filters[state]=Maharashtra";



class LandKarodoMujhe extends Component{
    constructor(props){
        super(props);
        this.state={
            fname:'',
            lname:'',
            contact:'',
            address:{
                fulladdress:'',
                district:'',
                state:''
            },
            tycrop:[],
            aadhar:'',
            bankacc:'',
            mylocationaddress:'',
            mydata:[],
        }
    }
    // componentDidMount=()=>{
    //     let LAT='18.4550998';
    //     let LNG='73.8532771';

    //     fetch('https://api.opencagedata.com/geocode/v1/json?q='+LAT+'+'+'+'+LNG+'&key=078829dd1aa145308162d6c8a2c471e9')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
    //     })

    // }



    // componentDidMount(){
    //     console.log("MOUNTED")
    //     const headers = {
    //       "Content-type":"application/json",
    //       "Accept":'application/json'
    //     }
      
    //     fetch(url,{
    //       method:'GET',
    //       headers:headers
    //     })
    //       .then((response)=>{ return response.json()})
    //       .then((res)=>{
    //         this.setState({
    //             mydata:[...this.state.mydata,res]
    //         })
    //         console.log(this.state.mydata);    
            
    //       })
    //       .catch(err=>console.log(err))
    
    //     }
 
 
    onSignupPressed=()=>{
        //console.log(this.state.fname,this.state.lname,this.state.contact);
    }

    render(){
        console.log("fuck efe");
        
        return(
            <View style={{ flex: 1}} behavior="padding">
                <StatusBar barStyle="light-content" hidden={false} translucent={true}/>  
                <LinearGradient style={{ flex: 1 }} colors={[Colors.BG_GRADIENT_1, Colors.BG_GRADIENT_2]}>
                <View style={{marginTop:StatusBar.currentHeight}}></View>              
                    <View style={{marginTop:10}}>
                        <Input
                            placeholder='First Name'                        
                            inputStyle={{marginHorizontal:10}}
                            inputContainerStyle={{borderWidth:1,borderRadius:10,width:'100%',backgroundColor:'#fff'}}
                            leftIcon={<Icon name="menu" size={20}/>}
                            keyboardType='ascii-capable'
                            textContentType="name"
                            blurOnSubmit={false}
                            onChangeText={text=>this.setState({fname:text})}
                            value={this.state.fname}
                            autoCapitalize='words'
                            autoCompleteType = 'name'
                            autoFocus = {false}
                            returnKeyType='next'
                            enablesReturnKeyAutomatically = {true}
                            onSubmitEditing={()=>{this.lnameInput.focus()}}
                            maxLength={50}
                        />     
                        </View>    

                        <View style={{marginTop:10}}>
                        <Input
                            ref={(input) => { this.lnameInput = input; }}
                            placeholder='Last Name'
                            inputStyle={{marginHorizontal:10}}
                            inputContainerStyle={{borderWidth:1,borderRadius:10,width:'100%',backgroundColor:'#fff'}}
                            leftIcon={<Icon name="menu" size={20}/>}      
                            keyboardType='ascii-capable'
                            textContentType="name"
                            blurOnSubmit={false}
                            autoCapitalize='words'
                            autoCompleteType = 'name'
                            onChangeText={text=>this.setState({lname:text})}
                            value={this.state.lname}
                            autoFocus = {false}
                            clearButtonMode = 'while-editing'
                            returnKeyType='next'
                            enablesReturnKeyAutomatically = {true}
                            onSubmitEditing={()=>{this.contactInput.focus()}} 
                            maxLength={50}                     
                        />
                        </View>

                        <View style={{marginTop:10}}>
                        <Input 
                            ref={(input) => { this.contactInput = input; }}
                            placeholder='Contact'
                            inputStyle={{marginHorizontal:10}}
                            inputContainerStyle={{borderWidth:1,borderRadius:10,width:'100%',backgroundColor:'#fff'}}
                            leftIcon={<Icon name="menu" size={20}/>}
                            keyboardType='phone-pad'
                            textContentType='telephoneNumber'
                            blurOnSubmit={false}
                            autoCapitalize='none'
                            onChangeText={text=>this.setState({contact:text})}
                            value={this.state.contact}
                            autoFocus={false}
                            autoCompleteType='tel'
                            returnKeyType='next'
                            maxLength={10}
                        />                    
                        </View>
                        <Button
                            title = 'Create Account'
                            onPress={() => this.onSignupPressed()}
                        />

                </LinearGradient>
            </View>
        )
    }
}
export default LandKarodoMujhe;