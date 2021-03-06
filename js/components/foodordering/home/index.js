import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, Image, View, TouchableOpacity, ScrollView, InteractionManager } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { ShoppingCart2 } from "../../../common/";
import { fetchCuisines, fetchRestaurant, fetchBestInTown, fectchBanners } from '../../../actions/homepage';
import { setActiveHomepage } from '../../../actions/tab';
import Cuisines from '../cuisines';
import NewAndHot from '../newandhot';
import BestInTown from '../bestintown';
import Banner from '../banner';
import Search from '../search/';
import styles from './styles';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      location: '',
      showSearch: false,
      number:0
    }
  }
  //
  // Before the component mounts
  //
  componentDidMount(){
    this.setState({
      number: this.props.cartSize
    })
    if(this.props.navigation.state.routeName === 'FoodHome' || 'FoodOrdering') {
      this.props.setActiveHomepage("food");
    }

    InteractionManager.runAfterInteractions(() => {
      this.props.fectchBanners();
      this.props.fetchBestInTown();
      this.props.fetchRestaurant();
      this.props.fetchCuisines();
    });
  }

  //
  // Deals with component receiving props, i.e state changes
  //
  componentWillReceiveProps(props){
    if (props.cartSize > 0 ) {
      this.setState({
        number: props.cartSize
      })
    }
    else if (props.cartSize === 0) {
      this.setState({
        number:0
      })
    }
    if (props.location) {
      const locationText = props.location.name.split(',')
      const locationConcatText = locationText[0]+','+locationText[1];
      if (locationConcatText.length < 26) {
        this.setState({
          location:locationConcatText  ,
        })
      }else {
        this.setState({
          location:locationConcatText.slice(0, 25)+' ...' ,
        })
      }
    }
  }

  //
  // Goto BestInTown
  //
  gotoBestInTownHome(id, title){
    this.props.navigation.navigate('BestInTown', {
      bestId:id,
      title:title
    })
  }


  //
  // Go to menu list
  //
  gotoRestroHome(id,name,menu,img,status){
    this.props.navigation.navigate('RestroHome', {
      restroId:id,
      name: name,
      menuId:menu,
      img:img,
      status:status,
    })
  }
  //
  // Go to list of cuines
  //
  gotoCuisineHome(id,cuisine){
    this.props.navigation.navigate('Cuisine', {
      cuisineId:id,
      cuisine:cuisine
    })
  }

  gotoRestroList(){
    this.props.navigation.navigate('AllRestro', {
      title: 'List of restaurants'
    })
  }


  renderCart(){
    return(
      <ShoppingCart2
      onCartClick={()=>this.props.navigation.navigate('FoodCart')}
      tab={this.props.tab}
      numberOfItemsInCart={this.state.number}/>);
  }


  renderTopbarIcon(){
    return (
      <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('DrawerOpen')}
        style={styles.leftTopbar}
      >
        <Icon style={styles.menuIcon} name="menu" size={24} />
      </TouchableOpacity>
    );
  }


  //
  // Render Swiper
  //
  renderSwiper(){
    const dotStyle = <View style={styles.dotStyle} />
    const dotActiveStyle = <View style={styles.dotActiveStyle} />
    return(
      <Banner
        data={this.props.banners}
        dotStyle={dotStyle}
        dotActiveStyle={dotActiveStyle}
        />
    );
  }

  //
  // Render main section
  //
  renderMainSection(){
    return(
      <View>
        { this.renderSwiper() }
        <BestInTown
          gotoBestInTownHome={(id, title)=>this.gotoBestInTownHome(id, title)}
          data={this.props.bestintown}
          />
        <View style={styles.cardsHeader}>
          <Text style={styles.cardsHeaderText}>NEW & HOT</Text>
        </View>
        <NewAndHot
          restaurant={this.props.restaurant}
          gotoRestroList={()=>this.gotoRestroList()}
          gotoRestroHome={(id,name,menu,img,status)=>this.gotoRestroHome(id,name,menu,img,status)}
          />
        <View style={styles.cardsHeader}>
          <Text style={styles.cardsHeaderText}>CATEGORIES</Text>
        </View>
        <Cuisines
          cuisine={this.props.cuisine}
          gotoCuisineHome={(menu,cuisineName)=>this.gotoCuisineHome(menu, cuisineName)}
          />
      </View>
    );
  }


  //
  // Main render fn
  //
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          {
            this.renderTopbarIcon()
          }
          <View style={styles.searchBox}>
            <TouchableOpacity
              style={styles.searchInput}
              onPress={() => this.props.navigation.navigate('Search')}
              >
                <Icon name="search" style={styles.searchIcon} />
                <Text style={styles.searchBoxText}>Search cuisines, restaurants</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.rightTopbar]}>
            <View>
                { this.renderCart() }
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollbar}>
          {
            this.renderMainSection()
          }
        </ScrollView>
      </View>
    );
  }


}
function mapStateToProps (state) {
  return {
    banners: state.banners,
    bestintown: state.homepage.bestintown,
    restaurant: state.homepage.restaurant,
    cuisine: state.homepage.cuisine,
    location: state.location.activeLocation,
    cartSize:state.cart.size,
    cart:state.cart,
    tab: state.tab.activeHomepage,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setActiveHomepage: (homepage)=> dispatch(setActiveHomepage(homepage)),
    fetchCuisines:()=>dispatch(fetchCuisines()),
    fetchRestaurant:()=>dispatch(fetchRestaurant()),
    fetchBestInTown:()=>dispatch(fetchBestInTown()),
    fectchBanners:()=>dispatch(fectchBanners()),
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);
