import React, { Component } from 'react';
import { View,Text,Picker,Button,KeyboardAvoidingView,SafeAreaView } from 'react-native';
import { TouchableOpacity,FlatList } from 'react-native-gesture-handler';
import { Icon, Overlay,Input } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import {connect} from 'react-redux';

const temp='Select any produce';

class FarmerReq_Component extends Component{


    constructor(props){
        super(props);
        this.state={
            quantAvail:'',
            succMsg:'',
            produceChoice:'',
            rate:'',
            overlayVisible:false
        }
    }

    componentDidMount=()=>{
        this.setState({quantAvail:temp})
        
    }

    handleAvailProd=({item})=>{
        this.setState({quantAvail:item.quantity})

    }

    handleBuyerRequest=()=>{
        const headers={
            'Content-type':'application/json',            
        }
        
        const url = 'http://192.168.43.36:8080' + '/breqf';        

        const data ={
            
            bid:this.props.bid,
            fid:this.props.data._id,
            quantity:this.state.quantity,
            rate:this.state.rate,
            croptyp:this.state.produceChoice,
            date:new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            status:'pending',
            lpstatus:'pending',


        }

        fetch(url,{
            method:'POST',
            headers:headers,
            body:JSON.stringify(data)
        })
        .then((response)=>{response.json()})
        .then((res)=>{
            console.log(res)
            this.setState({
                succMsg:'Request sent successfully'
            })
        })

        .catch(err=>console.log(err))
    }


    render(){

    console.log(this.props.firstName)
    let data = this.props.data
    return(
        <View style={{backgroundColor:'#fff',borderRadius:10,flexDirection:'column',padding:5}}>        
                <View style={{borderBottomWidth:1,padding:10,paddingTop:10,marginHorizontal:5,flexDirection:'row',justifyContent: 'space-between',}}>
                    <View style={{paddingTop:10}}>
                        <Text>Farmer Name : {data.fname} {data.lname}</Text>
                        </View>
                    <View style={{borderWidth:0,flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{this.setState({overlayVisible:true})}} >
                            <View style={{borderWidth:1,borderRadius:10,alignItems:'center',padding:8}}><Text style={{fontSize:10}}>Request</Text></View>
                        </TouchableOpacity>
                    </View>  
                </View>   
                                       
            <View style={{borderBottomWidth:0,paddingLeft:10,paddingTop:10,marginHorizontal:5,flexDirection:'row'}}>
                <View style={{padding:3}}><Text style={{fontSize:12}}>Available Produce :</Text></View>
                <View>
                    <SafeAreaView horizontal={true} style={{marginRight:20}}>
                        <FlatList
                            data={data.tycrop}
                            horizontal={true}                                        
                            renderItem={({item})=>
                                <TouchableOpacity onPress={()=>{this.handleAvailProd({item})}}>
                                <View style={{padding:2,paddingLeft:10,paddingRight:10,marginLeft:5,marginTop:2,borderRadius:10,marginBottom:5,backgroundColor:'#aaa',elevation:3}}>
                                    <Text style={{fontSize:10,padding:1}}>{item.produce}</Text>
                                </View>
                                </TouchableOpacity>
                                }

                            keyExtractor={item=>item.toString()}                                        
                        />
                    </SafeAreaView>   
                </View>

            </View> 
            <View style={{borderBottomWidth:0,paddingLeft:10,paddingTop:0,marginHorizontal:5,flexDirection:'row'}}>
                    <View style={{padding:3}}><Text style={{fontSize:12}}>Quantity Available : </Text></View>
                    <View style={{padding:3}}>
                        <Text style={{fontSize:this.state.quantAvail===temp?12:12}}>
                            {this.state.quantAvail===temp? temp:this.state.quantAvail+' quintals' }
                        </Text>
                    </View>
                
            </View> 
            <View style={{borderWidth:0,paddingLeft:10,paddingRight:10,paddingBottom:5,paddingTop:5,marginHorizontal:5}}>
                <View style={{paddingLeft:3}}>
                    <Text style={{fontSize:11}}>Address: {data.address.fulladdress}</Text>
                </View>
            </View> 
            <View style={{borderBottomWidth:0,paddingBottom:15,paddingLeft:10,paddingRight:10,marginHorizontal:5}}>
                <View style={{paddingLeft:3}}>
                    <Text style={{fontSize:11}}>Contact: {data.contact}</Text>
                </View>
            </View> 


            <Modal
                    visible={this.state.overlayVisible}
                    onTouchOutside={() => {
                    this.setState({ overlayVisible: false });
                    }}
                >
                <ModalContent>
                    <View style={{flexDirection:'column'}}>
                        <View>
                            <Text>Enter the details to request the farmer</Text>
                        </View>
                        <View style={{borderWidth:0,alignItems:"center",padding:10,marginTop:30}}>
                            <Text>Select Agricultural Produce</Text>
                        </View>
                        <View style={{borderTopWidth:1}}>
                            <Picker 
                                style={{marginLeft:20}}                                                                                                        
                                mode="dropdown"
                                selectedValue={this.state.produceChoice}
                                onValueChange={(itemValue,itemIndex) =>{
                                this.setState({produceChoice: itemValue})
                                }}  
                            >

                                {
                                        data.tycrop.map(item=>{
                                            return(
                                                <Picker.Item label={item.produce} value={item.produce} />
                                            )
                                    })
                                }                                            

                                {/* <Picker.Item label="Rice" value="Rice" />
                                
                                <Picker.Item label="Wheat" value="Wheat" />                            
                                <Picker.Item label="Grapes" value="Grapes" />
                                <Picker.Item label="Chocolate" value="Chocolate"/> */}

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
                            <View style={{borderBottomWidth:1}}><Text>Purchase Rate </Text></View>
                            <Input 
                            ref={(input) => { this.contactInput = input; }}
                            placeholder="Enter Purchase Rate"
                            inputStyle={{fontSize:14,textAlign:'center'}}
                            inputContainerStyle={{borderWidth:0,borderRadius:10,backgroundColor:'#fff'}}
                            keyboardType='phone-pad'
                            textContentType='telephoneNumber'
                            blurOnSubmit={false}
                            autoCapitalize='none'
                            onChangeText={text=>this.setState({rate:text})}
                            value={this.state.rate}
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
                            onPress={()=>{this.handleBuyerRequest()}}
                        />
                    </View>
                </ModalContent>
            </Modal>



        
        </View>
    )
}


}

function mapStateToProps(state){
    return{
      firstName:state.firstName
    }
  }
  
   
export default connect(mapStateToProps)(FarmerReq_Component)