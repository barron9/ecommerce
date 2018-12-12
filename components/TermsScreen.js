
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
import {API_URL} from '../App'
export default class TermsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			pager: 0,
			searchp1: 0,
			searchp2: 999,
			showfilter: false,
			searchstarted: false,
			grid:true
		};
	}
	static navigationOptions = {
		title: 'searchscreen',
		header: null,
	};

	componentDidMount() {

		fetch(API_URL+'/content/get/', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body:'OrderId='+this.props.navigation.state.params.id+'&Key='+this.props.navigation.state.params.name,

		})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
				alert(JSON.stringify(response))
				this.setState({content:response.ResultMessage})
			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				this.setState({ loading: false });

				////alert(error);
			});

	}
	render(){
		return(<View><HHeader title={this} baslik="Kullanım Şartları"/>

			{this.state.content && (
				<WebView
				source={{baseUrl: '',
					html:
					'<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"></head><body>' +
						this.state.content +
						'</body></html>',
				}}
				style={{
					marginTop: 10,
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').height - 20,
				}}
				/>
			)}

			</View>);

	}
}
