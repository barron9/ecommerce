
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
import HHeader from './header/HHeader'
import { Button,TextInput,Text,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface} from 'react-native-paper';


export default class MyOrdersScreen extends React.Component {
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

this.showallorders()

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




showallorders() {
	var self = this;
	this.setState({ loading: true });
	this.setState({ showorders: true });
	//alert(this.state.token)
	fetch(API_URL+'/customer/orders', {
		method: 'GET', timeout: 20000,
		headers: {
			Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then(response => {
			const statusCode = response.status;
			if (statusCode != 200) {
				//alert('oturum süresi dolmuştur.');
				self.setState({ loading: false });
				const resetAction = NavigationActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ routeName: 'Splash' })],
				});

				self.props.navigation.dispatch(resetAction);
				self.props.navigation.navigate('Splash');
			} else {
				return response.json();
			}
		})
		.then(response => {
			//	alert(response)
			// <D-d>alert(JSON.stringify(response))
			self.setState({ loading: false, orders: response });
		})
		.catch(error => {
			this.props.navigation.navigate('Home');
			//alert(error);
			self.setState({ loading: false });
		});
}
showorderdetails(orderid,number) {
	var self = this;
	this.setState({ loading: true });
	//	this.setState({showorders:true})
	//alert(this.state.token)
	fetch(
		API_URL+'/customer/orders-detail/' + orderid,
		{
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body:'id='+orderid,
		}
	)
		.then(response => {
			const statusCode = response.status;
			if (statusCode != 200) {
				//alert('oturum süresi dolmuştur.');
				self.setState({ loading: false });
				const resetAction = NavigationActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ routeName: 'Splash' })],
				});

				self.props.navigation.dispatch(resetAction);
				self.props.navigation.navigate('Splash');
			} else {
				return response.json();
			}
		})
		.then(response => {
			//		alert(orderid)
			//	alert(JSON.stringify(response))
			this.props.navigation.navigate('OrderDetail',{token:this.props.navigation.state.params.token,data:response,siparisno:number})

			self.setState({
				loading: false,
				orderdetails: response,
				showorderdetails: true,
			});
		})
		.catch(error => {
			this.props.navigation.navigate('Home');
			//alert(error);
			self.setState({ loading: false });
		});
}



	render(){
		return(<View style={{flex:1}}><HHeader title={this} baslik="Siparişlerim"/>
							 <List.Section title="Siparişlerinizi takip edebilirsiniz">

	<FlatList data={this.state.orders} renderItem={({ item }) => (
		<View>
		<List.Item style={{marginTop:10,marginLeft:10,marginRight:10,elevation:2,borderTopLeftRadius:10,borderTopRightRadius:10,backgroundColor:'white',justifyContent:'center'}} onPress={()=>this.showorderdetails(item.OrderId,item.OrderNumber)} title={'Sipariş No: ' + item.OrderNumber }  right={() => <Icon name="angle-right" size={20}
 color="gray"/>}>
			</List.Item>
		<View style={{backgroundColor:'gray',marginLeft:10,marginRight:10}}><Text style={{fontSize:12,color:'white',fontWeight:'800',paddingLeft:15}}>Tarih: {item.OrderDate.split('T')[0] + ' Saat: ' + item.OrderDate.split('T')[1].split('.')[0]}</Text></View>

		</View>



	)}/>

			</List.Section>


			</View>);

	}
}
