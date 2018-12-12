
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
import {API_URL,pickerSelectStyles} from '../App'
import RNPickerSelect from 'react-native-picker-select';
import DropdownAlert from 'react-native-dropdownalert';


export default class ReachusScreen extends React.Component {
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
	componentDidMount() {}
	send() {
		if (
			!this.state.konu ||
			!this.state.isim ||
			!this.state.telefon ||
			!this.state.eposta ||
			!this.state.mesaj
		) {
			this.dropdown.alertWithType('error', 'Hata',"Lütfen Bilgileri eksiksiz doldurun");

			return;
		}
		fetch(API_URL+'/support/contactus', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body:
			'Header=' +
			this.state.konu +
			'&FullName=' +
			this.state.isim +
			'&Email=' +
			this.state.eposta +
			'&Gsm=' +
			this.state.telefon +
			'&Message=' +
			this.state.mesaj,
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
				this.setState({ loading: false });
				this.dropdown.alertWithType('success', 'İşlem tamam',response.ResultMessage);

			})
			.catch(error => {
				//this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	render() {
		const { navigate } = this.props.navigation;

		return (
			<ScrollView style={{backgroundColor:'white'}}>
			<View>
			<HHeader title={this} baslik="İletişim" />
			<View style={{ margin: 20 }}>
			<View style={{flexDirection:'column',marginBottom:10}}>
			<Text style={{ color: 'black', paddingLeft: 10 ,marginRight:20,fontWeight:'800'}}>Konu seçiniz</Text>

			<RNPickerSelect
			disabled={ false}
			style={{
				...pickerSelectStyles,
			}}
			label={{
				label: 'Seçiniz',
					value: null,
			}}

			items={[
				{ label: 'Görüş', value: 'Görüş' },
				{ label: 'Öneri', value: 'Öneri' },
				{ label: 'Şikayet', value: 'Şikayet' }
			]}
			onValueChange={value => {
				this.setState({
					konu: value,
				});
			}}
			onUpArrow={() => {}}
			onDownArrow={() => {}}
			/>



			</View>

			<View>

			<TextInput mode="outlined" label="İsim Soyisim"
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			keyboardType="name-phone-pad"
			secureTextEntry={false}
			value={this.state.isim}
			style={{
				fontSize: 16,
					//	paddingTop: 13,
					paddingHorizontal: 10,
					//	paddingBottom: 12,
					//	borderWidth: 1,
									color: 'black',
			}}
			onChangeText={isim => this.setState({ isim })}
			/>


			</View>
			<View>

			<TextInput mode="outlined" label="Eposta"
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			keyboardType="name-phone-pad"
			secureTextEntry={false}
			value={this.state.eposta}
			style={{
				fontSize: 16,
					//	paddingTop: 13,
					paddingHorizontal: 10,
					//	paddingBottom: 12,
					//	borderWidth: 1,
									color: 'black',
			}}
			onChangeText={isim => this.setState({ eposta })}
			/>
			</View>
			<View>

			<TextInput mode="outlined"
			label="Telefon"
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			keyboardType="name-phone-pad"
			secureTextEntry={false}
			value={this.state.telefon}
			style={{
				fontSize: 16,
					//	paddingTop: 13,
					paddingHorizontal: 10,
					//	paddingBottom: 12,
					//	borderWidth: 1,
									color: 'black',
			}}
			onChangeText={isim => this.setState({ telefon })}
			/>

			</View>
			<View>

			<TextInput mode="outlined"
			label="Mesaj"
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			keyboardType="name-phone-pad"
			secureTextEntry={false}
			value={this.state.mesaj}
			style={{
				fontSize: 16,
					paddingHorizontal: 10,
					color: 'black',
			}}
			onChangeText={isim => this.setState({ mesaj })}
			/>
			</View>
			</View>

			<Button
			onPress={() => this.send()}
			>Gönder</Button>

			<Text style={{padding:10,color:'#333',textAlign:'center'}}>  {'Çalışma saatlerimiz hafta içi 09:00 – 18:00 saatleri arasındadır.\n\nDestek Hattı: 05xx xxx xx xx\n\nDestek Hesabı: destek@promoclub.com.tr'}</Text>
			<DropdownAlert ref={ref => this.dropdown = ref} />

			</View>
			</ScrollView>
		);
	}
}