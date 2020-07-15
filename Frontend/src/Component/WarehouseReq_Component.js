import React, { Component } from 'react';
import { View,Text, SafeAreaView, Image, Linking,Picker, KeyboardAvoidingView, Button,ToastAndroid, AsyncStorage } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Input } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';

import {connect} from 'react-redux';


class WarehouseReq_Component extends Component{

    constructor(props){
        super(props);
        this.state={
            overlayVisible:false,
            produceChoice:'',
            quantity:'',
            duration:'',
            duraError:'',
            quanError:'',
            availableStorage:'',
            isSelected:false,
            selectedName:'',
            fid:'',
        }
    }

    componentDidMount=()=>{
        // console.log(this.props.navigation.state.params.data)
        this.setState({
            produceChoice:this.props.produce,
            quantity:this.props.quantity,
            availableStorage:this.props.data.stcap
        })
    }
    handleAgriProduce=({item})=>{
        this.setState({availableStorage:item.pstorage,isSelected:true,selectedName:item.produce})
    }

    handleSubmit=()=>{

     

        //Post request to make request to the Warehouse 
        const data = {
            fid:this.props.firstName,
            wid : this.props.data._id,
            croptyp:this.state.produceChoice,            
            quantity:this.state.quantity,
            duration:this.state.duration,            
            date:new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            status:'pending',            
        }

        console.log(data)

        const headers={
            'Content-type':'application/json'      
          }
          const url='http://192.168.43.36:8080';

          fetch(url+'/freqw',{
            method:'POST',
            headers:headers,
            body:JSON.stringify(data)
          })
          .then((response)=>{ return response.json()})
          .then((res)=>{
            console.log(res)
            this.setState({overlayVisible:false})            
            // ToastAndroid.show('Request Sent Successfully', ToastAndroid.SHORT);

          })
      
          .catch(err=>console.log(err))
      

    }



    render(){
        // AsyncStorage.getItem('fid').then((value)=>{
        //     this.setState({fid:value})
        // })

        let data=this.props.data
        //console.log(this.props.produce,this.props.quantity)
        return(           
            <View style={{flex:1,borderWidth:0,backgroundColor:'#fff',padding:5,borderRadius:10,elevation:5,marginHorizontal:5}}> 
                <View style={{flexDirection:'row',marginTop:5}}>
                    <View style={{flex:4,flexDirection:'column'}}>                        
                        <View style={{paddingTop:10,paddingLeft:10,paddingRight:10,paddingBottom:5,flex:1,borderWidth:0,borderBottomWidth:1}} >
                            <Text style={{fontSize:14}}>{data.wname}</Text>    
                        </View>                        
                        <View style={{paddingTop:5,paddingLeft:10,paddingRight:5,flex:1,borderWidth:0}} >
                            <Text style={{fontSize:12}}>Warehouse Manager : {data.fname} {data.lname}</Text>    
                        </View>                                                
                        <View style={{paddingLeft:10,paddingRight:5,paddingBottom:5,paddingTop:5,flex:1,borderBottomWidth:0}} >
                            <Text style={{fontSize:12,color:'#000'}}>Address : <Text style={{color:'#000'}}>{data.address.fulladdress}</Text></Text>    
                        </View> 
                        <View style={{paddingLeft:10,paddingRight:5,paddingTop:5,paddingBottom:5,flex:1,borderBottomWidth:1,flexDirection:'column'}} >
                            <View>
                                <Text style={{fontSize:12}}>Agricultural Produce that can be stored :</Text>
                            </View>   
                            <View style={{flexDirection:'row'}}>
                                <SafeAreaView horizontal={true} style={{marginRight:20,marginTop:5}}>
                                   <FlatList
                                        data={data.typ}
                                        horizontal={true}                                        
                                        renderItem={({item})=>
                                            <TouchableOpacity onPress={()=>{this.handleAgriProduce({item})}}>
                                            <View style={{padding:3,marginLeft:5,borderRadius:10,marginTop:5,marginBottom:5,backgroundColor:'#aaa',elevation:3}}>
                                                <Text style={{fontSize:10,padding:1}}>{item.produce}</Text>
                                            </View>
                                            </TouchableOpacity>
                                            }

                                        keyExtractor={item=>item.toString()}                                        
                                   />
                                </SafeAreaView>                                
                            </View>   
                        </View> 
                        <View style={{paddingLeft:10,paddingRight:5,paddingBottom:5,paddingTop:5,flex:1,flexDirection:'row',marginBottom:5}} >
                            <View style={{flex:1,flexDirection:'column',paddingTop:5}}>
                                <View>
                                    <Text style={{fontSize:12}}>{ this.state.isSelected===false ?"Storage Available : ":this.state.selectedName+" Storage Available : "} {this.state.availableStorage} quintal</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{paddingTop:5}}><Text style={{fontSize:12}}>Cold Storage Available</Text></View>
                                    <View style={{marginTop:8,marginLeft:5}}><Icon name="check-circle" type='font-awesome' size={12}/></View>
                                </View>                            
                            </View>                        
                        </View>                                                
                    </View>
                    <View style={{flex:2,borderWidth:0,flexDirection:'column'}}>                        
                        <View style={{borderWidth:1,marginTop:10,borderRadius:10,elevation:10,height:82,width:107}}> 
                            <Image style={{height:80,width:105,borderRadius:10}} source={require('../Assets/download.jpeg')}/>                    
                        </View>                        
                        <View style={{flexDirection:'column',borderWidth:0,marginTop:0,justifyContent:'center'}}>
                            <View style={{borderWidth:0,alignItems:'center',marginTop:0,flexDirection:'row',marginTop:10}}>
                                {/* <View style={{paddingLeft:15}} ><Icon name="truck" type='font-awesome' size={12}/></View> */}
                                <View style={{paddingLeft:5}}><Text style={{fontSize:12}}></Text></View>
                            </View>
                            <View style={{marginTop:40,padding:5,borderWidth:0}}>
                                <TouchableOpacity onPress={()=>{Linking.openURL('tel:9969108722');}}>
                                    <View style={{borderWidth:1,borderRadius:10,alignItems:'center',padding:5}}><Text style={{fontSize:12}}>Contact Us</Text></View>
                                </TouchableOpacity>
                            </View>

                            <View style={{marginTop:0,padding:5,borderWidth:0}}>
                                <TouchableOpacity onPress={() => {this.setState({overlayVisible:true})}}>
                                    <View style={{borderWidth:1,borderRadius:10,alignItems:'center',padding:5}}><Text style={{fontSize:12}}>Request</Text></View>
                                </TouchableOpacity>
                                  
                                  <Modal
                                        visible={this.state.overlayVisible}
                                        onTouchOutside={() => {
                                        this.setState({ overlayVisible: false });
                                        }}
                                    >
                                    <ModalContent>
                                        <View style={{flexDirection:'column'}}>
                                            <View>
                                                <Text>Enter the details to request the warehouse</Text>
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

                                                {
                                                    data.typ.map(item=>{
                                                        return(
                                                            <Picker.Item label={item.produce} value={item.produce} />
                                                        )
                                                    })
                                                }                                            

                                                </Picker>
                                            </View>
                                        </View>
                                        <KeyboardAvoidingView behavior="padding">
                                            <View style={{alignItems:'center',marginTop:20}}>
                                            <View style={{borderBottomWidth:1}}><Text>Quantity </Text></View>
                                                <Input 
                                                    ref={(input) => { this.contactInput = input; }}
                                                    placeholder={'Enter Quantity '+this.state.produceChoice}
                                                    inputStyle={{fontSize:14,textAlign:'center'}}
                                                    inputContainerStyle={{borderWidth:0,borderRadius:10,backgroundColor:'#fff'}}
                                                    containerStyle={{alignItems:'center'}}
                                                    keyboardType='phone-pad'                                                
                                                    textContentType='telephoneNumber'
                                                    blurOnSubmit={false}
                                                    autoCapitalize='none'
                                                    onChangeText={text=>this.setState({quantity:text})}
                                                    value={this.state.quantity}
                                                    autoFocus={false}
                                                    autoCompleteType='tel'
                                                    returnKeyType='next'
                                                    errorMessage={this.state.quanError}
                                                    errorStyle = {{marginHorizontal: 20, paddingHorizontal: 5}}
                                                    maxLength={4}                                                    
                                                />
                                            </View> 
                                            <View style={{alignItems:'center',marginTop:20}}>
                                                <View style={{borderBottomWidth:1}}><Text>Duration </Text></View>
                                                <Input 
                                                ref={(input) => { this.contactInput = input; }}
                                                placeholder="6 months"
                                                inputStyle={{fontSize:14,textAlign:'center'}}
                                                inputContainerStyle={{borderWidth:0,borderRadius:10,backgroundColor:'#fff'}}
                                                keyboardType='phone-pad'
                                                textContentType='telephoneNumber'
                                                blurOnSubmit={false}
                                                autoCapitalize='none'
                                                onChangeText={text=>this.setState({duration:text})}
                                                value={this.state.duration}
                                                autoFocus={false}
                                                autoCompleteType='tel'
                                                returnKeyType='next'
                                                errorMessage={this.state.duraError}
                                                maxLength={1}
                                                
                                                />
                                            </View>             
                                        </KeyboardAvoidingView> 
                                        <View style={{marginLeft:40,marginRight:40,marginTop:20}}>
                                            {/* <TouchableOpacity onPress={()=>{this.handleSubmit()}}>
                                                <View style={{borderWidth:1,borderRadius:15,alignItems:"center",padding:5}}><Text>REQUEST</Text></View>
                                            </TouchableOpacity> */}
                                            <Button
                                                title="Request Now"
                                                onPress={()=>{this.handleSubmit()}}
                                            />
                                        </View>
                                    </ModalContent>
                                </Modal>

                            </View>
                          
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state){
    return{
      firstName:state.firstName
    }
  }
  
   
export default connect(mapStateToProps)(WarehouseReq_Component)

