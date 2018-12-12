
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
import { Button,TextInput,Text,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface} from 'react-native-paper';
import EnIcon from 'react-native-vector-icons/Entypo'; // 4.5.0
import {API_URL} from '../App'

export default class CustomerSupportScreen extends React.Component {
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
		return(<View><HHeader title={this} baslik="Müşteri Hizmetleri"/>
<List.Section title="Size nasıl yardımcı olabiliriz?">


			<FlatList
			style={{backgroundColor:'white',marginTop:10}}
			data={this.state.menu}
			renderItem={({item}) => <List.Item onPress={()=>this.props.navigation.navigate(item.Name=='Kullanım Şartları'?'Kullanım':item.Name,{token:this.props.navigation.state.params.token,id:item.ContentId,name:item.Name})} style={{backgroundColor:'white'}}
          title={item.Name}
          right={() => <EnIcon name="chevron-thin-right" size={20} color="#ccc" />}
       />




			}
			/>



<List.Item onPress={()=>this.props.navigation.navigate('Reachus',{token:this.props.navigation.state.params.token})}style={{backgroundColor:'white'}}
          title="Bize Ulaşın"
			right={() => <EnIcon name="chevron-thin-right" size={20} color="#ccc" />}
       />






     </List.Section>




			</View>);

	}
}