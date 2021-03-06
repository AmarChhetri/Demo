import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, Image, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { logout } from '../../actions/login';
import LoginView from './LoginView';
import EditDetails from './EditDetails';
import { setActiveTab } from '../../actions';
import { fetchUserSavedAddresses, deleteAddress } from '../../actions/user';
import styles from './styles';

class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      showLoginView:false,
      editableUserDetails:false,
      showUpdateButton:false,
      // showSignUpView:false
    }
  }

  //
  // Relating to components update and rendering
  //
  componentWillMount(){
    const userobj = this.props.user
    if (userobj.user !== undefined ) {
      this.props.fetchUserSavedAddresses();
      this.setState({
        username:userobj.user.username,
        email: userobj.user.email,
        phone:userobj.user.phn
      })
    }
  }
  componentWillReceiveProps(nextProps){
    // console.log("The nextProps is",nextProps.user);
    if (nextProps.user.user) {
      this.setState({
        showLoginView:false,
        username:nextProps.user.user.username,
        email: nextProps.user.user.email,
      })
    }
  }

  renderTopbarIcon(){
    return (
      <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('DrawerOpen')}
        style={styles.leftTopbar}
      >
        <MaterialIcon style={styles.menuIcon} name="menu" size={24} />
      </TouchableOpacity>
    );
  }

  render(){
    if (this.state.showLoginView) {
      return <LoginView hideLoginView={()=>this.setState({showLoginView:false})}/>
    }
    return(
      <View style={styles.container}>
        <View style={styles.topbar}>
          {
            this.renderTopbarIcon()
          }
          <View style={styles.title}>
            <Text style={styles.titleText}>Profile</Text>
          </View>
          <View style={styles.clearFix}>

          </View>
        </View>
        <ScrollView style={styles.mainBlock}>
          {this.renderProfile()}
        </ScrollView>
      </View>
    );
  }
  //
  // Go to login View
  //

  hideLoginView(){
    this.setState({
      showLoginView:false
    })
  }

  editAddress(address){
    this.props.navigator.push({
      id:'edit-address',
      address: address
    })
  }
  renderAddress(item, index){
    return (
      <View key={index}>
        <View style={styles.savedaddress}>
          <View style={styles.leftSavedAddress}>
            <Text style={styles.addressHeader}>{item.address_type.toUpperCase()}</Text>
            <View style={styles.addressBody}>
              <Text style={styles.addressText}>{item.address_line_1}, {item.address_line_2}, {item.city}, {item.state}, {item.zip}</Text>
            </View>
          </View>
            <TouchableOpacity
              onPress={()=>this.editAddress(item)}
              style={styles.editAddressButton}
            >
              <Text style={styles.editAddressButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.props.deleteAddress(item.id)}
              >
              <Icon name="times" style={{paddingLeft:20, fontSize:18, color:"rgba(255,0,0,0.3)"}}/>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
  //
  // Render saved address
  //
  renderDeliveryAddress(address){
    if (address === undefined || address.length === 0) {
      return null
    }
    return address.map((item, index)=>{
      return this.renderAddress(item,index);
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //
  // Render Profile
  //
  renderProfile(){
    // console.log("The nextProps in login", this.props.user);
    const user = this.props.user.user;
    const address = this.props.user.saved_address;
    if ( !user || user === undefined) {
      //
      // Guest Profile View
      //
      return(
        <View style={styles.profile}>
          <View style={[styles.topGuest, {paddingTop:50}]}>
            <Image
              style={{width:200, height: 200}}
              // style={styles.userPicStyle}
              source={require('../../assets/not-logged-in.png')}
              />
            <Text style={styles.guestOopsText}>Oops! You are not logged in</Text>
          </View>
          <View style={styles.middleGuest}>
            <Text style={styles.guestAdviceText}>TO ORDER YOU MUST HAVE AN ACCOUNT</Text>
          </View>
          <View style={styles.bottomGuest}>
             <TouchableOpacity
              onPress={()=>this.setState({showLoginView:true})}
              style={[styles.guestButton,{marginRight:20, borderColor:'#7f8c8d', borderWidth: 1}]}>
              <Text style={[styles.guestButtonText,{fontFamily: 'Helvetica', color: "#7f8c8d"}]}>SIGN UP</Text>
            </TouchableOpacity>
            <View style={styles.guestButtonSeperator}></View>
            <TouchableOpacity
              onPress={()=>this.setState({showLoginView:true})}
              style={[styles.guestButton,{marginLeft:20, backgroundColor: '#6bdbfd',}]}>
              <Text style={[styles.guestButtonText,{color: '#fff', fontFamily: 'Helvetica',  fontWeight: 'bold' }]}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    //
    // Host Profile View
    //
    return(
     <View style={styles.profileView}>
        <View style={styles.topHost}>
          <View style={styles.userPicView}>
            <Text style={styles.userInitial}>{this.state.username.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.userInfo}>
              <Text style={styles.welcomeText}>Welcome {this.capitalizeFirstLetter(this.state.username.split(' ')[0])}</Text>
              <Text style={styles.userPhone}>+{this.state.phone}</Text>
          </View>
          <TouchableOpacity
            style={styles.editProfile}
            onPress={() => this.props.navigation.navigate('EditProfile')}
          >
            <MaterialIcon style={styles.editIcon} name="edit" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.manageAddress}
          onPress={() => this.props.navigation.navigate('SavedAddr')}
        >
          <MaterialIcon style={styles.manageIcon} name="home" />
          <Text style={styles.manageText}>Manage Addresses</Text>
          <MaterialIcon style={styles.manageIcon}name="chevron-right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.manageAddress}
          onPress={() => this.props.navigation.navigate('Location')}
        >
          <MaterialIcon style={styles.manageIcon} name="location-on" />
          <Text style={styles.manageText}>Change Location</Text>
          <MaterialIcon style={styles.manageIcon}name="chevron-right" />
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.signOutBlock}
            onPress={()=>this.props.logout()}
            >
            <Text style={styles.signOutText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }

}
function mapStateToProps (state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setActiveTab:(tab)=>dispatch(setActiveTab(tab)),
    logout: () => dispatch(logout()),
    deleteAddress: (id) => dispatch(deleteAddress(id)),
    fetchUserSavedAddresses: () => dispatch(fetchUserSavedAddresses())
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Profile);
