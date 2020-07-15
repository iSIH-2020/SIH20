import React, { Component } from "react";
import { View, KeyboardAvoidingView, StatusBar, Button,Picker,StyleSheet } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import {Input,Icon} from 'react-native-elements';


import * as Colors from '../Assets/Colors';

class Auth_Login extends Component {

    constructor(props){
      super(props)
      this.state={
        contact:null,
        passsword:"",
        fid:'',
        bid:'',
        PickerValue:'f',
      }
    }

    onLoginPressed=()=>{
        //console.log("yeh chal gaya");

        const headers={
          'Content-type':'application/json'      
        }
        
        const tempdata ={
          contact:this.state.contact,
          password:this.state.passsword,
        }

        const url='http://192.168.43.36:8080';
    

        if(this.state.PickerValue==='f'){
          fetch(url+'/flogin',{
            method:'POST',
            headers:headers,
            body:JSON.stringify(tempdata)
          })
          .then((response)=>{ return response.json()})
          .then((res)=>{          
            //console.log(res) 
                  
            this.setState({fid:res})         
            this.props.navigation.navigate('Home', {navigatedFrom: 'AL', data: this.state.fid});          
          })
          .catch(err=>console.log(err))
        }else if(this.state.PickerValue==='b'){

          fetch(url+'/blogin',{
            method:'POST',
            headers:headers,
            body:JSON.stringify(tempdata)
          })
          .then((response)=>{ return response.json()})
          .then((res)=>{          
            //console.log(res) 
                  
            this.setState({bid:res})         
            this.props.navigation.navigate('BuyerHome', {navigatedFrom: 'AL', data: this.state.bid});          
          })
          .catch(err=>console.log(err))

        }
        else if(this.state.PickerValue==='w'){

          fetch(url+'/wlogin',{
            method:'POST',
            headers:headers,
            body:JSON.stringify(tempdata)
          })
          .then((response)=>{ return response.json()})
          .then((res)=>{          
            //console.log(res) 
                  
            this.setState({bid:res})         
            this.props.navigation.navigate('WarehouseHome', {navigatedFrom: 'AL', data: this.state.bid});          
          })
          .catch(err=>console.log(err))

        }
        else if(this.state.PickerValue==='l'){

          fetch(url+'/llogin',{
            method:'POST',
            headers:headers,
            body:JSON.stringify(tempdata)
          })
          .then((response)=>{ return response.json()})
          .then((res)=>{          
            //console.log(res) 
                  
            this.setState({bid:res})         
            this.props.navigation.navigate('LogisticsHome', {navigatedFrom: 'AL', data: this.state.bid});          
          })
          .catch(err=>console.log(err))

        }


          


        
        //Possible Routes: 
        // Home : Farmer Home page
        // WarehouseHome : Warehouse Manager Home page
        // LogisticsHome : Logistics Home Page
        // BuyerHome : Buyer Home Page 
        
    }

  render() {
    console.log(this.state.PickerValue)
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <LinearGradient style={{flex:1}} colors={[Colors.BG_GRADIENT_1,Colors.BG_GRADIENT_2]}>
        <View style={{marginTop:StatusBar.currentHeight}}></View>
        <View style={{marginTop:180}}>
        <Picker
              style={styles.pickerstyle}
                selectedValue={this.state.PickerValue}
                onValueChange={(value)=>{
                    this.setState({PickerValue:value});
                }}
            >
            <Picker.Item label="FARMER" value="f" />
            <Picker.Item label="BUYER" value="b" />
            <Picker.Item label="WAREHOUSE MANAGER" value="w" />
            <Picker.Item label="LOGISTICS PROVIDER" value="l" />
          </Picker>

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
          <View style={{marginTop:30}}>
            <Input 
                ref={(input) => { this.contactInput = input; }}
                placeholder='******'
                inputStyle={{marginHorizontal:10}}
                inputContainerStyle={{borderWidth:1,borderRadius:10,width:'100%',backgroundColor:'#fff'}}
                leftIcon={<Icon name="lock" type="fontawesome" size={20}/>}
                keyboardType='ascii-capable'
                textContentType='password'
                blurOnSubmit={false}
                autoCapitalize='none'
                onChangeText={text=>this.setState({passsword:text})}
                value={this.state.password}
                autoFocus={false}
                autoCompleteType='password'
                returnKeyType='next'
                maxLength={10}
                secureTextEntry={true}
            />                    
          </View>
          <View style={{marginTop:60,marginLeft:30,marginRight:30}}>
          <Button
              title = 'Login '              
              onPress={() => this.onLoginPressed()}
          /></View>
        </LinearGradient>            
      </KeyboardAvoidingView>
    );
  }
}

export default Auth_Login;

const styles = StyleSheet.create({
  pickerstyle:{
    height:50,
    color:"#fff",
      borderRadius:25,
      borderWidth:0.5,
      marginHorizontal:20,
      paddingLeft:10,
      marginVertical:5,
      borderColor:'rgba(0,0,0,0.2)',
      width:'80%',
  },
});