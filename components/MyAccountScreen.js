
import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	View,
	//	TextInput,
	
	//Button,
	Keyboard,
	Image,
	measure,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	PickerIOS,
	FlatList,
	Easing,
	WebView,
	PermissionsAndroid,
	StatusBar,
	Dimensions,
	KeyboardAvoidingView,
	Switch,
	Picker,
	TouchableHighlight,
	Geolocation,
	PermissionsIOS,StatusBarAlert,StatusBarIOS,
	Animated,
	BackHandler,
	Linking,Modal,AlertIOS,Alert
} from 'react-native';

import EnIcon from 'react-native-vector-icons/Entypo'; // 4.5.0
import {API_URL,SLOW_NETWORK_T,styles,ProjectOrderPaymentMethod,deviceid,ColorCode} from '../App'
import uyeSchema from './dbschemas/uyeSchema'
import notificationSchema from './dbschemas/notificationSchema'
import DropdownAlert from 'react-native-dropdownalert';
import Drawer from 'react-native-drawer-menu'; // 0.2.5
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import { FloatingAction } from 'react-native-floating-action'; // 1.10.1
import SwiperFlatList from 'react-native-swiper-flatlist';

import { Button,TextInput,Text,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface} from 'react-native-paper';
import HHeader from './header/HHeader'


export default class MyAccountScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			pager: 0,
			searchp1: 0,
			searchp2: 999,
			showfilter: false,
			searchstarted: false,
			grid:false
		};
	}
	static navigationOptions = {
		title: 'searchscreen',
		header: null,
	};

	componentDidMount() {

		fetch(API_URL+'/menu/get/', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},


		})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
				this.setState({menu:response.ResultMessage})
			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				this.setState({ loading: false });

				////alert(error);
			});

	}
	render(){
		return(<View><HHeader title={this} baslik="Hesap Ayarları"/>
<List.Section title="Hesap Bilgilerim">
        <List.Item onPress={()=>this.props.navigation.navigate('ChangeMyPassword',{token:this.props.navigation.state.params.token})} style={{backgroundColor:'white'}}
          title="Şifremi Değiştir"
          right={() => <EnIcon name="chevron-thin-right" size={20} color="#ccc" />}
       />
        <List.Item onPress={()=>this.props.navigation.navigate('UpdateMyProfile',{token:this.props.navigation.state.params.token})} style={{backgroundColor:'white'}}
          title="Bilgilerimi Güncelle"
          right={() => <EnIcon name="chevron-thin-right" size={20} color="#ccc" />}
       />


     </List.Section>
<List.Section title="Sipariş Süreci">
	<List.Item onPress={()=>this.props.navigation.navigate('MyOrders',{token:this.props.navigation.state.params.token})} style={{backgroundColor:'white'}}

          title="Siparişlerim"
          right={() => <EnIcon name="chevron-thin-right" size={20} color="#ccc" />}
       />

			  </List.Section>


			</View>);

	}
}