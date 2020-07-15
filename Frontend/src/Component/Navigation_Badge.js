import React, { Component } from "react";
import { View,Text} from 'react-native';
import { Button } from "react-native-elements";

class SelectedBadge extends Component {
  handleSelect = () => {

    //console.log(this.props.val);
    
    if (this.props.val.focused) {
      return (
        <Button
          buttonStyle={{
            borderRadius: 20,
            backgroundColor:'#cc2b5e'
          }}
          containerStyle={{
            marginHorizontal: 20,
            marginTop: 15,
            minWidth: 110,
            padding:5,
            borderColor:'red'
          }}
          title={this.props.name}
        />
      );
    } else{
      return (
        <View style={{marginTop:20}}>
    <Text style={{color:'#fff'}}>{this.props.name}</Text>
        </View>
      );
    }
    //console.log("Focused")
  };

render(){
    return(
        <View>
            {this.handleSelect()}
        </View>
    )
  }
}

export default SelectedBadge;