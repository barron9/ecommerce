
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


export default class CompletePaymentScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}
	static navigationOptions = {
		title: '',
		header: null,
	};
	componentDidMount() {
		this.setState({ loading: true });
		//	this.bringcards();
	}

	render() {
		return (
			<View
			style={{
				width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
					backgroundColor: 'white',
					paddingLeft: 40,
					paddingRight: 40,
					paddingTop: 40,
			}}>
			<View>
			<Text style={{ color: 'black', fontSize: 26 }}>Sipariş Özeti</Text>
			<TouchableOpacity
			onPressIn={() => this.props.navigation.pop()}
			style={{ zIndex: 299, position: 'absolute', top: 0, right: 10 }}>
			<Icon name="times-circle" size={30} color="red" />
			</TouchableOpacity>
			</View>

			<Text
			style={{
				color: 'gray',
					fontSize: 14,
					marginTop: 10,
					marginBottom: 10,
			}}>
			Siparişiniz Alındı
			</Text>
			<View style={{ flexDirection: 'column' }} />
			<View
			style={{
				backgroundColor: 'green',
					padding: 10,
					borderRadius: 0,
					position: 'absolute',
					width: Dimensions.get('window').width,
					bottom: 0,
					margin: 0,
					alignItems: 'center',
					justifyContent: 'center',
			}}>
			<TouchableOpacity
			onPressIn={() =>
				this.props.navigation.navigate('Proje', {
					token: this.props.navigation.state.params.token,
				})
			}>
			<Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>
			Tamam
			</Text>
			</TouchableOpacity>
			</View>
			</View>
		);
	}
}