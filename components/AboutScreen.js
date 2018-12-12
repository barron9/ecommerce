
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
import {API_URL,} from '../App'

export default class AboutScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			cart: '',
			gotocart: false,
			run: false,
			itemss: false,
			paymentway: false,
		};
	}
	static navigationOptions = {
		title: 'Sepetim',
		header: null,
	};
	componentDidMount() {
		fetch(API_URL+'/content/get', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'OrderId=&Key=Hakkımızda',
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
				this.setState({ loading: false, content: response.ResultMessage });
				// alert(JSON.stringify(response));
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	render() {
		const { navigate } = this.props.navigation;

		return (
			<View
			style={{
				width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
			}}>
			<HHeader title={this} baslik="Hakkımızda" />
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
			</View>
		);
	}
}