
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

export default class ConfirmPaymentScreen extends React.Component {
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
			<ScrollView
			style={{
				width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
					backgroundColor: 'white',
			}}>
			<View style={{ alignItems: 'center', marginTop: 100 }}>
			<EnIcon name="thumbs-up" size={130} color="#eee" />
			</View>

			<View style={{ backgroundColor: 'white', flex: 1, padding: 40 }}>
			<View
			style={{
				backgroundColor: '#FFFFFF',
					height: Dimensions.get('window').height,
					padding: 10,
			}}>
			<Text
			style={{
				color: 'black',
					fontWeight: '100',
					fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,
			}}>
			{this.props.navigation.state.params.message}
			</Text>

			<Text
			style={{
				color: ColorCode,
					fontWeight: '100',

					fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,

					marginTop: 50,
			}}
			onPress={() =>
				this.props.navigation.navigate('Proje', {
					token: this.props.navigation.state.params.token,
				})
			}>
			Ana Sayfaya dön
			</Text>
			</View>
			</View>
			</ScrollView>
		);
	}
}