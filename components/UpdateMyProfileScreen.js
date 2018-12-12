
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
import HHeader from './header/HHeader'

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



export default class UpdateMyProfileScreen extends React.Component {
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
updateprofile(){


	fetch(API_URL+'/customer/myaccount-update', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		body:'FirstName='+this.state.isim+'&LastName='+this.state.soy+'&Gsm='+this.state.gsm+'&Email='+this.state.email


		})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
			//	this.setState({menu:response.ResultMessage})
					if (response.ResultCode == 'OK') {
					this.dropdown.alertWithType('info', 'Tamam',response.ResultMessage);

					//  this.props.navigation.navigate('Home');
				} else {
					this.dropdown.alertWithType('error', 'Hata',response.ResultMessage);
				}


			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				this.setState({ loading: false });

				////alert(error);
			});




}
	componentDidMount() {
fetch(API_URL+'/customer/myaccount', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
	//	body:'FirstName='+this.state.isim+'&LastName='+this.state.soy+'&Gsm='+this.state.gsm+'&Email='+this.state.email


		})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
			//	alert(JSON.stringify(response))
				this.setState({isim:response.FirstName,soy:response.LastName,gsm:response.Gsm,email:response.Email})
			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				this.setState({ loading: false });

				////alert(error);
			});



	}
	render(){
		return(<ScrollView style={{backgroundColor:'white'}}><HHeader title={this} baslik="Bilgilerimi Güncelle"/>
	<TextInput
			label={"İsim"}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"

			onChangeText={isim => this.setState({ isim })}
			value={this.state.isim}
			/>
			<TextInput
			label={"Soyİsim"}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"

			onChangeText={soy => this.setState({ soy })}
			value={this.state.soy}
			/>
<TextInput
			label={"Email"}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"
			disabled
			onChangeText={email => this.setState({ email })}
			value={this.state.email}
			/>
<TextInput
			label={"Telefon Numarası"}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"

			onChangeText={gsm => this.setState({ gsm })}
			value={this.state.gsm}
			/>



			<Button mode="contained" onPress={()=> this.updateprofile()} color={ColorCode} dark compact>Bilgilerimi Güncelle</Button>
			<DropdownAlert ref={ref => this.dropdown = ref} />

			</ScrollView>);

	}
}
