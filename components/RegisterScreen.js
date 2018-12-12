
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
import CheckBox from 'react-native-check-box';

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

import HHeader from './header/HHeader'



export default class RegisterScreen extends React.Component {
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
			var1: false,
			var2: false,
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
	registernew() {
		this.setState({ loading: true });
		var self = this;
		if(this.state.sifre!==this.state.sifret ){
			this.dropdown.alertWithType('error', 'Hata','Şifreler uyuşmuyor!');
			this.setState({ loading: false });

			return
		}

		if(!this.state.var2){
			this.dropdown.alertWithType('error', 'Hata','KVKK metnini onaylamanız gerekmektedir.');
			this.setState({ loading: false });

			return
		}
	    encodedString = binaryToBase64(utf8.encode(this.state.sifret));
	    // alert(encodedString)
	    this.setState({loading:true,sifret2:encodedString},function(){
		    //alert(this.state.sifret2)
		    fetch(API_URL+'/customer/register', {
			    method: 'POST', timeout: 20000,
			    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

			    //	hesap bilgilerim
			    //	siparisşlerim
			    //	şifremi degiştir
			    //	cıkıs

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
			    encodeURIComponent( this.state.sifret) +
			    '&DisplayCaptcha=true',
		    })
			    .then(response => {
				    return response.json();
			    })
			    .then(response => {
				    //alert(JSON.stringify(response))

				    if (response.ResultCode == 'OK') {
					    //this.dropdown.alertWithType('info', 'Tamam',response.ResultMessage);



					    this.dologin()
				    } else {
					    this.dropdown.alertWithType('error', 'Hata',response.ResultMessage);
				    }
				    this.setState({ loading: false });
			    })
			    .catch(error => {
				    this.props.navigation.navigate('Home');
				    //alert(error);
				    this.setState({ loading: false });
			    });})
	}
	dologin() {
		// this.dropdown.alertWithType('info', 'Giriş Yapılıyor', 'Lütfen bekleyiniz...')
		var encodedString='' ;
		//	  var text = 'foo © bar 𝌆 baz';
		//var bytes = utf8.encode(text);
		//var encoded = binaryToBase64(bytes);
		if(true){
			// this.setState({ loading: true });
			encodedString = binaryToBase64(utf8.encode(this.state.sifret));
			// alert(encodedString)
			this.setState({loading:true,sifret2:encodedString},function(){

				fetch(API_URL+'/auth', {
					method: 'POST', timeout: 20000,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

					body:'grant_type=password'+
					'&UserName=' +
					this.state.eposta +
					'&Password=' +
					encodeURIComponent(this.state.sifret)
				})
					.then(response => {
						return response.json();
					})
					.then(response => {

						if (response.LoginControl === 'Success') {

							Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
								.then(realm => {
									realm.objects('Uyeler'); //Tüm objeleri geri dönderir.

									if (
										realm
										.objects('Uyeler')
										.filtered('username="' + this.state.UserName + '"').length < 1
									) {
										//	 alert(JSON.stringify(realm.objects('Uyeler').filtered('username="'+this.state.UserName+'"')))
										Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
											.then(realm => {
												realm.write(() => {
													realm.create('Uyeler', {
														username: this.state.eposta,
														mail: this.state.eposta,
														sifre: encodeURIComponent(this.state.sifret),
														rank: 2,
														token: response.access_token,
														sepet: 0,
													});
												});
												this.props.navigation.navigate('Proje', {
													UserName: this.state.eposta,
													Password: encodeURIComponent(this.state.sifret),
													token: response.access_token,
												});
											})
											.catch(error => {
												console.log(error);
											});
									} else {
										this.props.navigation.navigate('Proje', {
											UserName: this.state.eposta,
											Password: encodeURIComponent(this.state.sifret),
											token: response.access_token,
										});
									}
									// alert(JSON.stringify(realm.objects('Uyeler').filtered('username="gokhanamal"')) )    //Username'i gokhanamal olan objeleri geri dönderir.
								})
								.catch(error => {
									console.log(error);
								});
						} else {
							this.dropdown.alertWithType('error', 'Hata',response.error_description);

							//this.setState({ Password: '' });

							//alert('hatalı giriş yaptınız');
						}
						this.setState({ loading: false });
					});





			})
			// alert(this.state.Password)


		}else{
			encodedString = encodeURIComponent(this.state.Password);

		}


	}

	componentDidMount() {
		if (Platform.OS == 'ios') {
			this.setState({
				eposta: this.props.navigation.state.params.eposta,
			});
		}


		fetch(API_URL+'/content/get', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + null,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'OrderId=&Key=KVKK',
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

			<KeyboardAvoidingView behaviour = "padding"
			style={{backgroundColor:'white',
					height: Dimensions.get('window').height,
			}}>


			<HHeader title={this} baslik="Üyelik Formu"/>
			<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
			<TextInput
			label="İsim"
			mode="outlined"

			style={{margin:2,
					//	height: 55,
					width: Dimensions.get('window').width/2 - 10,
					// backgroundColor: '#ddd',
					//	opacity: 0.8,
					//	padding: 10,
					borderRadius: 5,
					color: 'black',
			}}
			onChangeText={isim => this.setState({ isim })}
			/>
			<TextInput
			label="Soyİsim"
			mode="outlined"
			style={{margin:2,
					//	height: 55,
					width: Dimensions.get('window').width/2 - 10,
					// backgroundColor: '#ddd',
					//	opacity: 0.8,
					//	padding: 10,
					color: 'black',
			}}
			onChangeText={soyisim => this.setState({ soyisim })}
			/>
			</View>
			<TextInput
			mode="outlined"

			label="Cep Telefonu ÖRN. 5321234567"
			style={{margin:2,
					//	height: 55,
					width: Dimensions.get('window').width  - 10,
					// backgroundColor: '#ddd',
					//	opacity: 0.8,
					//	padding: 10,
					color: 'black',
			}}
			onChangeText={ceptel => this.setState({ ceptel })}
			/>
			<TextInput
			mode="outlined"

			label="E-Posta"
			style={{margin:2,
					//	height: 55,
					width: Dimensions.get('window').width  - 10,
					// backgroundColor: '#ddd',
					opacity: 0.8,
					//	padding: 10,
					borderRadius: 5,
					color: 'black',
			}}
			onChangeText={eposta => this.setState({ eposta })}
			value={this.state.eposta}
			/>

			<View style={{flexDirection:'row',justifyContent:'space-between'}}>

			<TextInput
			mode="outlined"

			secureTextEntry={true}
			label="Şifre"
			style={{margin:2,
					//	height: 55,
					width: Dimensions.get('window').width/2  - 10,
					// backgroundColor: '#ddd',
					//	opacity: 0.8,
					//	padding: 10,
					borderRadius: 5,
					color: 'black',
			}}
			onChangeText={sifre => this.setState({ sifre })}
			/>
			<TextInput
			mode="outlined"

			label="Şifre Tekrar"
			style={{margin:2,
					//	height: 55,
					width: Dimensions.get('window').width/2 - 10,
					// backgroundColor: '#ddd',
					//	opacity: 0.8,
					//	padding: 10,
					borderRadius: 5,
					//	borderColor: '#ddd',
					color: 'black',
			}}
			onChangeText={sifret => this.setState({ sifret })}
			value={this.state.sifret}
			secureTextEntry={true}
			/>
			</View>
			<View style={{ flexDirection: 'row',margin:10 }}>
			<CheckBox
			isChecked={this.state.var2}
			onClick={() => this.setState({
				var2 : !this.state.var2
			})}
			/>
			<TouchableOpacity onPressIn={() => {this.setState({ kvkk: true,var2:true });this.props.navigation.navigate('Kvkk',{content:this.state.content})}}>
			<Text style={{ color: '#333' ,fontWeight:'100',textDecorationLine
					:'underline'}}>
			Kişisel verilerin gizliliği(KVKK) metnini onaylıyorum.
			</Text>
			</TouchableOpacity>
			</View>

			<Button mode="contained" dark
			onPress={() => this.registernew()}
			style={{ backgroundColor:ColorCode,width:Dimensions.get('window').width/2,marginLeft:20}}>

			Kayıt Ol


			</Button>


			<DropdownAlert ref={ref => this.dropdown = ref} />

			</KeyboardAvoidingView>

		);
	}
}
