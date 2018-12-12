
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

export default class ShippingDetailsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}
	static navigationOptions = {
		title: 'Kargo Takip',
		// header: null,
	};

	componentDidMount() {
		this.setState({
			token: this.props.navigation.state.params.token,
			kargolink: this.props.navigation.state.params.kargolink,
		});
	}

	render() {
		return (
			<View
			style={{
				width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
			}}>
			<View
			style={{
				backgroundColor: 'white',
					height: Platform.OS === 'ios' ? 70 : 70,
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: 1,
					elevation: 1,
					shadowColor: '#ccc',
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.8,
					shadowRadius: 2,
					backgroundColor: 'white',
					paddingTop: Platform.OS === 'ios' ? 30 : 30,
					alignItems: 'center',
			}}>
			<TouchableOpacity
			activeOpacity={1}
			onPressIn={() => {drawerContent=null;this.props.navigation.pop()}}>
			<EIcon name="chevron-left" size={30} color="gray" />
			</TouchableOpacity>
			<Text
			style={{
				color: ColorCode,
					fontSize: 20,
					fontWeight: '700',
			}}>
			Kargo Takip{' '}
			</Text>

			<TouchableOpacity
			activeOpacity={1}
			onPressIn={() =>
				this.setState({ kargolink: this.state.kargolink })
			}>
			<EIcon name="refresh" size={30} color="white" />
			</TouchableOpacity>
			</View>

			<WebView
			source={{ uri: this.state.kargolink }}
			onLoadStart={() => this.setState({ loading: true })}
			onLoadEnd={() => this.setState({ loading: false })}
			style={{
				width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
			}}
			/>

			{false && (
				<View
				style={{
					width: 50,
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: Dimensions.get('window').height / 2 - 25,
						marginLeft: Dimensions.get('window').width / 2 - 25,
						position: 'absolute',
						zIndex: 599,
						height: 50,
						borderRadius: 10,
						backgroundColor: ColorCode,
						opacity: 0.9,
						flexDirection: 'column',
				}}>
				<ActivityIndicator
				size="small"
				color="white"
				style={{ zIndex: 99 }}
				/>
				</View>
			)}
			</View>
		);
	}
}