
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

export default class ForgotScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingText: false,
			UserName: '',
			Password: '',
			isim: '',
			soyisim: '',
			ceptel: '',
			sifre: '',
			sifret: '',
			eposta: '',
			loading: false,
		};
	}
	static navigationOptions = {
		title: 'Hosgeldiniz',
		header: null,
		//headerStyle: { paddingTop: 0,backgroundColor:'yellow' }
		//
		gesturesEnabled: false,
	};
	onPressInLearnMore() {
		alert('oturumm ac');
		this.setState(previousState => {
			return { isShowingText: !previousState.isShowingText };
		});
	}
	unuttum() {
		alert('sifre unuutm');
	}
	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	neisterseniz() {
		this.setState({ loading: true });
		var self = this;

		if (!this.validateEmail(this.state.eposta)) {
			this.dropdown.alertWithType('error', 'error','Hatalı eposta adresi');

			this.setState({ loading: false });
			return;
		}
		fetch(API_URL+'/customer/password-recovery', {
			method: 'POST', timeout: 20000,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

			body: 'Email=' + this.state.eposta,
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				//   alert(JSON.stringify(response));

				if (response.ResultCode == 'OK') {
					this.dropdown.alertWithType('info', 'info',response.ResultMessage);

					// alert('Şifre isteğiniz alındı.Lütfen Epostanızı kontrol ediniz.');
					//  this.props.navigation.navigate('Home');
				} else {
					// alert(response.ResultMessage);
				}
				this.setState({ loading: false });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
				this.setState({ loading: false });
			});
	}

	forgotpass() {
		this.setState({ loading: true });
		var self = this;

		if (!this.validateEmail(this.state.eposta)) {
			this.dropdown.alertWithType('error', 'Hata','Hatalı Eposta adresi!');

			this.setState({ loading: false });
			return;
		}
		fetch(API_URL+'/customer/password-recovery', {
			method: 'POST', timeout: 20000,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

			body: 'Email=' + this.state.eposta,
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				// alert(JSON.stringify(response));

				if (response.ResultCode == 'OK') {
					this.dropdown.alertWithType('info', 'Tamam',response.ResultMessage);

					//  this.props.navigation.navigate('Home');
				} else {
					this.dropdown.alertWithType('error', 'Hata',response.ResultMessage);
				}
				this.setState({ loading: false });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
				this.setState({ loading: false });
			});
	}
	registernew() {
		this.setState({ loading: true });
		var self = this;
		this.dropdown.alertWithType('info', 'Bilgi','Eposta gönderiliyor...');



		encodedString = binaryToBase64(utf8.encode(this.state.sifret));
		// alert(encodedString)
		this.setState({loading:true,sifret2:encodedString},function(){



			fetch(API_URL+'/customer/register', {
				method: 'POST', timeout: 20000,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body:
				'FirstName=' +
				this.state.isim +
				'&LastName=' +
				this.state.soyisim +
				'&Email=' +
				this.state.eposta +
				'&Gsm=' +
				this.state.ceptel +
				'&Username=' +
				this.state.UserName +
				'&Password=' +
				encodeURIComponent(this.state.sifret) +
				'&DisplayCaptcha=true',
			})
				.then(response => {
					return response.json();
				})
				.then(response => {
					//alert(JSON.stringify(response))

					if (response.ResultCode == 'OK') {
						this.dropdown.alertWithType('info', 'Bilgi',response.ResultMessage);

						//this.props.navigation.navigate('Home');
					} else {
						this.dropdown.alertWithType('error', 'Hata',response.ResultMessage);

					}
					this.setState({ loading: false });
				})
				.catch(error => {
					this.props.navigation.navigate('Home');
					//alert(error);
					this.setState({ loading: false });
				});
		})
	}

	componentDidMount() {
		fetch(API_URL+'/parameters/list', {
			method: 'GET', timeout: 20000,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				// alert(JSON.stringify(response))
				this.setState({ urt: response.UserRegistrationType });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
				this.setState({ loading: false });
			});
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<ScrollView
			contentContainerStyle={{}}
			style={{
				backgroundColor: 'white',
					height: Dimensions.get('window').height,
			}}>
			<View
			style={{
				flex: 1,
					height: Dimensions.get('window').height,
			}}>

			<HHeader title={this} baslik="Şifremi Unuttum" />

			<TextInput
			mode="outlined"

			label={
				this.state.urt && this.state.urt == 1
				? 'E-posta'
				: 'Kullanıcı adı'
			}
			style={{
				//	height: 55,
				width: Dimensions.get('window').width -20,
					margin:10,
					// backgroundColor: '#ddd',
					//	opacity: 0.8,
					//	padding: 10,
					borderRadius: 5,
					color: 'black',
			}}
			onChangeText={eposta => this.setState({ eposta })}
			value={this.state.eposta}
			/>


			<View style={{ height: 20 }} />



			<Button mode="contained" onPress={()=> this.forgotpass(this.state.eposta)} style={{width:Dimensions.get('window').width/2,marginLeft:20}} color={ColorCode} dark compact>Şifremi Hatırlat</Button>
			</View>

			<DropdownAlert ref={ref => this.dropdown = ref} style={{height:250}} />

			</ScrollView>
		);
	}
}