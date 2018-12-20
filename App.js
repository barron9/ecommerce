/**
 * React Native App
 * https://barron.cz
 */
var API_URL = 'https://kurumsalb2c.com/B2C/oauth/api'
var SLOW_NETWORK_T = 20

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	View,
	//	TextInput,
	Text,
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
import SwiperFlatList from 'react-native-swiper-flatlist';

import LinearGradient from 'react-native-linear-gradient';
/*
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
*/
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import StepIndicator from 'react-native-step-indicator';
import KeyboardAvoid from 'react-native-keyboard-avoid';
import { Button,TextInput,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface} from 'react-native-paper';

import Realm from 'realm';
var SharedPreferences = require('react-native-shared-preferences');
import { Rating, AirbnbRating } from 'react-native-ratings';
import DropdownAlert from 'react-native-dropdownalert';
import { iOSUIKit } from 'react-native-typography';
import ScrollableTabView, {
	DefaultTabBar,
} from 'react-native-scrollable-tab-view';
var utf8 = require('utf8');
var binaryToBase64 = require('binaryToBase64');
import {
	Table,
	TableWrapper,
	Row,
	Rows,
	Col,
	Cols,
	Cell,
} from 'react-native-table-component';
import Prompt from '@perrymitchell/react-native-prompt';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Share from 'react-native-share';

import Video from 'react-native-video';

//...
var ProgressBar = require('ProgressBarAndroid');
import CheckBox from 'react-native-check-box';
import RNPickerSelect from 'react-native-picker-select';
import Permissions from 'react-native-permissions';
import { RNCamera, CameraManager } from 'react-native-camera';
//import BarcodeScanner from 'react-native-barcode-scanner-google';

import VersionNumber from 'react-native-version-number';
import { Dropdown } from 'react-native-material-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import { getAppstoreAppVersion } from "react-native-appstore-version-checker";

import {StackActions,
	StackNavigator,
	TabNavigator,
	NavigationActions,
	addNavigationHelpers,NavigationEvents,//createStackNavigator,createAppContainer,AppNavigator
} from 'react-navigation'; // 1.1.2
//import Search from 'react-native-search-box'; // 0.0.13
import { FloatingAction } from 'react-native-floating-action'; // 1.10.1

import {
	CreditCardInput,
	LiteCreditCardInput,
} from 'react-native-credit-card-input';
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0

import EIcon from 'react-native-vector-icons/EvilIcons'; // 4.5.0
import EnIcon from 'react-native-vector-icons/Entypo'; // 4.5.0

import FCM, { FCMEvent, NotificationActionType } from 'react-native-fcm';
import firebaseClient from './FirebaseClient';
//import firebase from 'react-native-firebase';
//import type { RemoteMessage } from 'react-native-firebase';
var DeviceInfo = require('react-native-device-info');

import { registerKilledListener, registerAppListener } from './Listeners';
//import RNLocalNotifications from 'react-native-local-notifications';
/* Permissions.check('location').then(response => {
// Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
    })


 Permissions.check('camera').then(response => {
	 // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    alert(JSON.stringify(response))})
	Permissions.request('camera', { type: 'always' }).then(response => {
  this.setState({ locationPermission: response })
})
*/
	 type AlertType = 'info' | 'warn' | 'error' | 'success';
	 var shareOptions = {
		 title: 'Paylaş',
		 url: 'https://kurumsalb2c.com/B2C/product/',
		 social: Share.Social.EMAIL
	 };
const uyeSchema = {
	name: 'Uyeler',
	properties: {
		username: 'string',
		mail: 'string',
		sifre: 'string',
		rank: { type: 'int', default: 0 },
		token: 'string',
		sepet: { type: 'int', default: 0 }
	},
};
const notificationSchema = {
	name: 'Notifications',
	properties: {
		id: 'string',
		notification: 'string',
		time: 'string',
	},



}





export type DropdownType = {
	alertWithType: (type: AlertType, title: string, message: string) => void,
};

export class DropDownHolder {
	static dropDown: DropdownType;

	static setDropDown(dropDown: DropdownType) {
		this.dropDown = dropDown;
	}

	static alert(type: AlertType, title: string, message: string) {
		this.dropDown.alertWithType(type, title, message);

	}
}
registerKilledListener();
//  registerAppListener();

FCM.subscribeToTopic('default');

FCM.createNotificationChannel({
	id: 'default',
	name: 'Default',
	description: 'used for example',
	priority: 'high',
});

FCM.getInitialNotification().then(notif => {
	this.setState({
		initNotif: notif,
	});
	if (notif && notif.targetScreen === 'detail') {
		setTimeout(() => {
			this.props.navigation.navigate('Detail');
		}, 500);
	}
});
var token;
registertoken();

export function registertoken() {
	FCM.getFCMToken().then(token_ => {
		token = token_;
		//	alert(token);
		this.setState({ token: token_ || '' });
		if (!token_) {
			registertoken();
		}
	});
}

try {
	let result = FCM.requestPermissions({
		badge: false,
		sound: true,
		alert: true,
	});
} catch (e) {
	console.error(e);
}
//import firebase from 'react-native-firebase';

import Lightbox from 'react-native-lightbox';
import {
	PlaceholderContainer,
	Placeholder
} from 'react-native-loading-placeholder';
//import Carousel from 'react-native-snap-carousel'; // 3.6.0
import Drawer from 'react-native-drawer-menu'; // 0.2.5
//import Video from 'react-native-video';
var genelhata = 'Genel bir hata oluştu. Lütfen tekrar deneyin';
//const devbrand = DeviceInfo.getBrand();
const deviceid = DeviceInfo.getUniqueID();
const devicename = DeviceInfo.getDeviceName();
const devicemodel = DeviceInfo.getModel();
const deviceosversion = DeviceInfo.getSystemVersion();
const deviceos = DeviceInfo.getSystemName();
//Platform.OS
//Platform.Version
type Props = {};


//  console.log('Hello from a background task')
// BackgroundTask.finish()
//










var { heightw, widthw } = Dimensions.get('screen');
console.disableYellowBox = true;

var ENTRIES1 = [];
var ProjectOrderPaymentMethod;
var UserNameEnabled;
var CustomerAddressChangeable;
var UserRegistrationType;
var IncludingCargoPrice;
var ColorCode='gray';
//PROJECT PARAMETERS
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//------------------
class BarcodeApp extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
			<BarcodeScanner
			style={{ flex: 1 }}
			onBarcodeRead={({ data, type }) => {
				// handle your scanned barcodes here!
				// as an example, we show an alert:
				Alert.alert(`Barcode '${data}' of type '${type}' was scanned.`);
			}}
			/>
			</View>
		);
	}
}

const PendingView = () => (
	<View
	style={{
		flex: 1,
			backgroundColor: 'lightgreen',
			justifyContent: 'center',
			alignItems: 'center',
	}}>
	<Text>Waiting</Text>
	</View>
);

class BadInstagramCloneApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			torchMode: 'off',
			cameraType: 'back',
			showCamera: true,
		};
	}

	barcodeReceived(e) {
		console.log('Barcode: ' + e.data);
		console.log('Type: ' + e.type);
	}

	componentDidLoad() {
		Permissions.request('camera', { type: 'always' }).then(response => {
			this.setState({ locationPermission: response });
		});
	}
	_onBarCodeRead(e) {
		this.setState({ showCamera: false });
		//  alert("karekod bulundu! tip: " + e.type + "veri: " + e.data
		// );
		//
		fetch(API_URL+'/barcode/add', {
			method: 'POST', timeout: 20000,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			},

			body: 'Barcode=' + e.data,
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				//alert(JSON.stringify(response.ResultMessage));

				// this.setState({ loading: false });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
				this.setState({ loading: false });
			});

		this.props.navigation.pop();
	}
	render() {
		return (
			<View style={styles.container}>
			{this.state.showCamera && (
				<RNCamera
				style={styles.preview}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.on}
				permissionDialogTitle={'Permission to use camera'}
				permissionDialogMessage={
					'We need your permission to use your camera phone'
				}
				onBarCodeRead={this._onBarCodeRead.bind(this)}
				barcodeFinderVisible={true}
				barcodeFinderWidth={280}
				barcodeFinderHeight={220}>
				{({ camera, status }) => {
					//alert(status)
					//  if (status !== 'READY') return <PendingView />;
					return (
						<View
						style={{
							flex: 1,
								opacity: 0.4,
								backgroundColor: 'black',
								width: Dimensions.get('window').width,
								flexDirection: 'row',
								justifyContent: 'center',
						}}>
						<View
						style={{
							width: 200,
								height: 200,
								zIndex: 10,
								opacity: 0.5,
								backgroundColor: 'white',
								borderColor: 'green',
								borderWidth: 3,
								marginTop: Dimensions.get('window').height / 3,
								alignItems: 'center',
								justifyContent: 'center',
						}}>
						<Image defaultSource={require('./noimage.jpg')}
						source={require('./simple.png')}
						style={{
							width: 50,
								height: 50,
								resizeMode: 'cover',
								zIndex: -1,
						}}
						/>
						<Text style={{ color: 'black', fontSize: 12 }}>
						Lütfen karekoda yaklaştırın.
						</Text>
						</View>
						<TouchableOpacity
						style={{
							position: 'absolute',
								zIndex: 20,
								bottom: 10,
								alignItems: 'center',
								justifyContent: 'center',
								width: 150,
								height: 50,
								backgroundColor: 'white',
						}}
						onPressIn={() => this.props.navigation.pop()}>
						<View>
						<Text
						style={{
							color: 'red',
								fontWeight: '800',
								fontSize: 24,
						}}>
						KAPAT
						</Text>
						</View>
						</TouchableOpacity>
						</View>
					);
				}}
				</RNCamera>
			)}
			</View>
		);
	}

	takePicture = async function() {
		if (this.camera) {
			const options = { quality: 0.5, base64: true };
			const data = await this.camera.takePictureAsync(options);
			console.log(data.uri);
		}
	};
}
class HHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blacked: false,
		};
	}

	static navigationOptions = {
		title: 'Hosgeldiniz',
		header: null,
		//headerStyle: { paddingTop: 0,backgroundColor:'yellow' }
		//
		gesturesEnabled: false,
	};
	dologin() {
		//	alert('UserName='+this.state.UserName+'&Password='+this.state.Password+'&grant_type=password')
		//	 DropDownHolder.alert('info', 'Giriş Yapılıyor', 'Lütfen bekleyiniz...')
		this.setState({ loading: true });
		fetch(API_URL+'/auth', {
			method: 'POST', timeout: 20000,
			headers: {

				'Content-Type': 'application/x-www-form-urlencoded'

			},

			body:'UserName='+this.state.UserName+'&Password='+this.state.Password+'&grant_type=password',
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				//this.props.navigation.navigate('Proje', {
				//  UserName: this.state.UserName,
				//  Password: this.state.Password,
				//});
				//alert(JSON.stringify(response))
				if (response.LoginControl == 'Success') {

					this.setState({load:true})
					setTimeout(()=>{this.props.navigation.navigate('Proje', {
						UserName: this.state.UserName,
						Password: (this.state.Password),
						token: response.access_token,
					});
					}, 3000);




				} else {
					this.dropdown.alertWithType('error', 'Hata',response.error_description);

				}
				this.setState({ loading: false });
			});
	}

	render() {
		var titleConfig = {
			title: this.props.title,
			baslik: this.props.baslik,
			side: this.props.side,

		};

		return(


			<Appbar.Header
			style={{borderBottomColor:'#ccc',borderBottomWidth:.8,backgroundColor:'white',
					zIndex:1000,width:Dimensions.get('window').width,}} dark={false} statusBarHeight={Platform.OS=='ios'?20:0}

			>
			{this.props.title.state.currentPosition!==3 &&
			<Appbar.BackAction
			onPress={()=>this.props.title.props.navigation.pop()}
			/>
			}

			<Appbar.Content
			title={this.props.baslik}        />
			</Appbar.Header>



		);



	}
}

class Neistersenizform extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const status = this.props
		return (
			<View
			style={{ flexDirection: 'column',alignItems:'center',justifyContent:'center' }}>
			<View style={{ width: Dimensions.get('window').width -20 }}>
			<TextInput
			mode="outlined"
disabled={this.props.status}
			underlineColorAndroid="rgba(0,0,0,0)"
			underlineColorAndroid="rgba(0,0,0,0)"
			style={{
				//	height: 40,
				//		borderColor: 'gray',
				//		borderWidth: 1,
					paddingLeft: 10,
					color: 'black',

			}}
			onChangeText={cins => this.setState({ cins })}
			label={'Cins (Led Tv)'}
			/>
			</View>
			<View style={{ width: Dimensions.get('window').width -20 }}>
			<TextInput
			mode="outlined"
			disabled={this.props.status}

			underlineColorAndroid="rgba(0,0,0,0)"
			underlineColorAndroid="rgba(0,0,0,0)"
			style={{
				//	height: 40,
				//		borderColor: 'gray',
				//		borderWidth: 1,
					paddingLeft: 10,
					color: 'black',

			}}
			label={'Marka (Sony)'}
			onChangeText={marka => this.setState({ marka })}
			/>
			</View>
			<View style={{ width: Dimensions.get('window').width -20 }}>
			<TextInput
			mode="outlined"
			disabled={this.props.status}

			underlineColorAndroid="rgba(0,0,0,0)"
			underlineColorAndroid="rgba(0,0,0,0)"
			style={{
				//	height: 40,
				//		borderColor: 'gray',
				//		borderWidth: 1,
					color: 'black',
					paddingLeft: 10,
			}}
			onChangeText={model => this.setState({ model })}
			label={'Model (46",3D)'}
			/>
			</View>
			<View style={{ width: Dimensions.get('window').width-20 }}>
			<TextInput
			mode="outlined"
			disabled={this.props.status}

			underlineColorAndroid="rgba(0,0,0,0)"
			underlineColorAndroid="rgba(0,0,0,0)"
			style={{
				//	height: 40,
				//		borderColor: 'gray',
				//		borderWidth: 1,
					color: 'black',
					paddingLeft: 10,
			}}
			onChangeText={adet => this.setState({ adet })}
			label={'Miktar 2'}
			/>
			</View>
			</View>
		);
	}
}
class NeistersenizScreen extends React.Component {
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
			done:false
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
	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	neisterseniz() {
		if (
			!this.refs.firstComponentRef.state.cins ||
			!this.refs.firstComponentRef.state.marka ||
			!this.refs.firstComponentRef.state.model ||
			!this.refs.firstComponentRef.state.adet
		) {
			this.dropdown.alertWithType('error', 'Hata','Lütfen istek giriniz.');

		//	Alert.alert('Hata','Lütfen istek giriniz.');
			return;
		}
		var formdata = [
			{
				Type: this.refs.firstComponentRef.state.cins,
				Brand: this.refs.firstComponentRef.state.marka,
				Model: this.refs.firstComponentRef.state.model,
				Quantity: this.refs.firstComponentRef.state.adet,
			},
			/*
			{
				Type: this.refs.secondComponentRef.state.cins,
				Brand: this.refs.secondComponentRef.state.marka,
				Model: this.refs.secondComponentRef.state.model,
				Quantity: this.refs.secondComponentRef.state.adet,
			},
			{
				Type: this.refs.thirdComponentRef.state.cins,
				Brand: this.refs.thirdComponentRef.state.marka,
				Model: this.refs.thirdComponentRef.state.model,
				Quantity: this.refs.thirdComponentRef.state.adet,
			},
			*/
		];
		this.setState({ loading: true });
		var self = this;
		//	alert(JSON.stringify(formdata))
		fetch(API_URL+'/support/what-ever', {
			method: 'POST', timeout: 20000,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			},

			body: JSON.stringify(formdata),
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				//alert(JSON.stringify(response))
				this.setState({
					done:true,loading:false
				},function(){
					this.dropdown.alertWithType('info', 'İşlem Tamamlandı','İsteğiniz Alındı');

				//	Alert.alert('İşlem Tamamlandı','İsteğiniz Alındı');


				})

			})
			.catch(error => {
							});
	}
	musterigetir() {
		this.setState({ loading: true });
		var self = this;

		//alert(this.props.navigation.state.params.token)
		fetch(API_URL+'/customer/myaccount', {
			method: 'GET', timeout: 20000,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			},
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				// alert(JSON.stringify(response))

				this.setState({ loading: false, userdata: response });
			})
			.catch(error => {
							});
	}

	componentDidMount() {
		this.musterigetir();
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View
			style={{
				backgroundColor: '#fff',flex:1,
			}}>
			<HHeader title={this} baslik="Ne İsterseniz" />

			{Platform.OS=='ios<D-r>s'&&  <Image
				resizeMode="repeat"
				source={require('./bg.jpg')} style={{position:'absolute',top:0,left:0,zIndex:0,opacity:.2}}
				/>}

		<View>




			<KeyboardAvoidingView behavior="padding">

			<Neistersenizform ref="firstComponentRef" status={this.state.done}/>



			<Button onPress={() => this.neisterseniz()} mode="contained" dark disabled={this.state.done}
			style={{marginTop:5,marginLeft:20,marginRight:20}}>
			Gönder
			</Button>

			</KeyboardAvoidingView>
	<ScrollView style={{height:150}}>
			<Text
			style={{
				fontWeight: '100',
					color: 'black',
					margin: 20,
					fontSize: 12,
			}}>
			Değerli Promo Club Üyesi,{'\n'}
			{'\n'}
			Promo Club da bulunan 2000 den fazla ürün arasında aradığınızı
			bulamadığınızda bile, istediğiniz ürünü sizin için tedarik
			ediyoruz.
			{'\n'}
			{'\n'}
			Ne İsterseniz modülü; Promo Club ile işte bu kadar kolay!
			{'\n'}
			{'\n'}
			Talebinizi aşağıdaki form üzerinden hemen bize iletebilirsiniz!
			{'\n'}
			{'\n'}
			Kimler Katılabilir{'\n'}
			Bu fırsattan sadece Promo Club üyeleri yararlanabilir.{'\n'}
			Talebiniz için aşağıdaki formu doldurarak gönderdiğiniz takdirde
			hemen değerlendirilecek ve 2 iş günü içinde size e-mail ile dönüş
			yapılacaktır.{'\n'}
			Talep ettiğiniz ürünün birim bedeli 2000 TL ve üstü olmalıdır.
			Ancak aynı üründen olmak şartı ile o üründen birden fazla adedinin
			toplam bedeli 2000 TL ise; işleme alınabilir.{'\n'}
			Kullanım Şartları{'\n'}
			Bu kapsamda talep edilen ürünlerin hasarlı olması dışında iadesi
			kabul edilemez.{'\n'}
			Talebinize istinaden olumlu dönüş yapılan tekliflerin geçerlilik
			süresi 3 iş günüdür.{'\n'}
			Ne İsterseniz modülünü 1 ay içinde 3 kez ürün satın almak için
			kullanabilirsiniz. Üye; hizmetten 1 ay içinde sınırsız
			faydalanmakla birlikte 3 talebinde de ürün satın almamışsa 1 ay
			beklemek zorundadır. Eğer ilgili ay içinde satın alma yaptıysa 3
			hak tekrar başlar.{'\n'}
			Gıda, sigara, içki, ilaç, altın, akaryakıt dâhil bütün hediye
			çekleri Ne İsterseniz modülünden talep edilemez.{'\n'}
			</Text>


			{this.state.userdata && (
				<Text
				style={{
					fontWeight: '100',
						color: 'black',
						margin: 20,
						fontSize: 12,
				}}>
				İsim: {this.state.userdata.FirstName} {'\n'}
				Soyisim:{this.state.userdata.LastName} {'\n'}
				Eposta:{this.state.userdata.Email} {'\n'}
				GSM:{this.state.userdata.Gsm} {'\n'}
				</Text>
			)}

			</ScrollView>

						</View>

			{this.state.loading && (
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
			<DropdownAlert ref={ref => this.dropdown = ref} />

			</View>
	);
	}
}

class SplashScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state ={c:null,backgroundColor:new Animated.Value(0)}
  this.backgroundColor = new Animated.Value(0)

	}
	static navigationOptions = {
		title: '',
		header: null,
		gesturesEnabled: false,
	};
componentDidMount(){

this.retry()
}
	retry(){
		this.setState({ loading: true,load:true,retry:false });

		fetch(API_URL+'/parameters/list', {
	method: 'GET', timeout: 5000,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
			.then(response => {
				const statusCode = response.status;
				//alert(statusCode)
				if (statusCode != 200) {
					//alert(statusCode)
		this.setState({ loading: false ,load:false,retry:true});

				} else {
					return response.json();
				}
			})

	.then(response => {
		ProjectOrderPaymentMethod = response.ProjectOrderPaymentMethod;
		UserNameEnabled = response.UserNameEnabled;
		CustomerAddressChangeable = response.CustomerAddressChangeable;
		UserRegistrationType = response.UserRegistrationType;
		IncludingCargoPrice = response.IncludingCargoPrice;
		ColorCode = '#'+response.ColorCode;
		this.setState({c:ColorCode,loading:false,retry:false,ppm:response.ProjectOrderPaymentMethod},function(){
		Animated.timing(this.backgroundColor, {
      duration: 1000,
      toValue: 1,
    }).start();


		})


	})
	.catch(error => {
	//	alert('as')
		this.setState({ loading: false ,load:false,retry:true});

		return
	//	this.props.navigation.navigate('Splash');
	//	alert(genelhata);
	//	this.setState({ loading: false ,load:false,retry:true});
	});


		this.setState({ load: true });


		if(true){
			Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
				.then(realm => {
					realm.objects('Uyeler');

					if (realm.objects('Uyeler').length < 1) {
		this.setState({ load: false });

					} else {

						this.dologin(realm.objects('Uyeler')[0].username,realm.objects('Uyeler')[0].sifre)
						return
						this.setState(
							{
								UserName: realm.objects('Uyeler')[0].username,
								Password: realm.objects('Uyeler')[0].sifre,
							},
							function() {
								this.dologin();
							}
						);
					}

				})
				.catch(error => {
				//	console.log(error);
				});



		}


	}
	dologin(user,pass) {
		this.setState({ loading: true });
		fetch(API_URL+'/auth', {
			method: 'POST', timeout: 20000,
			headers: {

				'Content-Type': 'application/x-www-form-urlencoded'

			},

			body:'UserName='+user+'&Password='+pass+'&grant_type=password',
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				//this.props.navigation.navigate('Proje', {
				//  UserName: this.state.UserName,
				//  Password: this.state.Password,
				//});
				//alert(JSON.stringify(response))
				if (response.LoginControl == 'Success') {

					this.setState({load:true})
					setTimeout(()=>{
						this.props.navigation.navigate('Proje', {
						UserName: user,
						Password: pass,
						token: response.access_token,
					});
					}, 2000);




				} else {
					this.dropdown.alertWithType('error', 'Hata',response.error_description);

				}
				this.setState({ loading: false });
			});
	}


	render() {
		let borderBottomColor = this.backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['gray', '#02adef']
    });
			let asd = this.backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['gray', 'yellow']
    });

		//this.state.x = 0;

		const { navigate } = this.props.navigation;
		return (
			<Animated.View
			style={{
				flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					backgroundColor:  (this.state.c!==null?borderBottomColor:'gray'),

					height: 800,

			}}>




			<Animated.View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,flexDirection:'column',bottom:Platform.OS=='ios'?0:0,alignItems:'center',justifyContent:'center',zIndex:2,
					backgroundColor:(borderBottomColor),
				// backgroundColor: ,
					borderRadius:Platform.OS=='ios'?0:10}}>
			{true&&  <Image

				source={require('./bg.jpg')} style={{position:'absolute',top:0,left:0,zIndex:0,opacity:.2,height:Dimensions.get('window').height+40,width:Dimensions.get('window').width}}
				/>}

<Animated.View style={{backgroundColor:	asd,paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5,
		//borderBottomWidth:10,borderRightWidth:10,borderBottomColor:'#ccc',borderRightColor:'#ddd'
}}>
			<Text
			style={{
				color:  'black',
					fontWeight: '800',
					fontSize: 32,
					margin: 5,
					zIndex: 2,
					fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,

			}}>
			PromoClub
			</Text>
</Animated.View>
			{this.state.retry &&
			<Button mode="contained" dark style={{backgroundColor:'red',marginTop:10}} onPress={()=>{
			//this.dropdown.alertWithType('error', 'Bağlantı','Bağlantınız yavaş tekrar deneniyor...');
				this.props.navigation.navigate('Splash')


			}}>Tekrar Bağlanmayı dene</Button>
			}
<View style={{height:50}}>
			{Platform.OS=='ios' && this.state.load ?<ActivityIndicator
				size="small"
				color="white"
				style={{ zIndex: 99,padding:20 }}
				/>
				:<View/> }
			{Platform.OS=='android' && this.state.load ?
					<ActivityIndicator
                    animating={true}

				size="small"
				color="white"
				style={{ zIndex: 99,padding:20 }}
					/>

					:<View/> }
			{this.state.loading && !this.state.load ?
					<ActivityIndicator
                    animating={true}

				size="small"
				color="black"
				style={{ zIndex: 99,padding:20 }}
					/>

					:<View/> }
</View>

			<View
			style={{
				position:'absolute',
					flexDirection: 'row',
					bottom: 80,
					zIndex: 2,
					height:this.state.load?0:null
			}}>



			{ !this.state.load ?

				<Button  mode="contained" dark

				style={{
					opacity: 1,
						//	padding: 10,
						width: 130,borderRadius:0,

						backgroundColor:'#333',
						//height:40,

				}}
				onPress={() => this.props.navigation.navigate('Home')}

				>
				Giriş Yap

				</Button>


				:<View/>
			}
			{!this.state.load ?

					<Button  mode="contained" dark

				style={{
					opacity: 1,borderRadius:0,
						//	padding: 10,
						width: 130,
					backgroundColor:(this.state.c!==null?this.state.c:'gray'),

						//height:40,
				}}
				onPress={() =>
					this.props.navigation.navigate('Register', { eposta: null })
				}

					>
					Kayıt Ol

					</Button>




					:<View/>

			}

			</View>
			{!this.state.load ?
				<Text style={{fontWeight: '100',color:'#eee',textAlign:'center',fontSize:12,
						position:'absolute',bottom:40

				}}
				onPress={() => this.props.navigation.navigate('Forgot')}


				>Şifremi Unuttum</Text>:<View/>
			}




			{ this.state.update&&
					<Text style={{color:'red'}} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.interlink.b2cbeta')}>Güncelleme Bulundu. İndir!</Text>
			}
			</Animated.View>

			<DropdownAlert ref={ref => this.dropdown = ref} />

			</Animated.View>);
	}
}
class ForgotScreen extends React.Component {
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
class KvkkScreen extends React.Component {
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
	componentDidMount(){
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
	render(){

		return(
			<View
			style={{
				height:Dimensions.get('window').height,       backgroundColor: 'white',
			}}>
			<HHeader title={this} baslik="KVKK Metni"/>

			{this.state.content &&
				<WebView
				scalesPageToFit={false}
				style={{
					width: Dimensions.get('window').width,
						height:  Dimensions.get('window').height,
						borderWidth: 1,
						//position:'absolute',zIndex:100
				}}
				source={{baseUrl: '',
					html:
					'<html><html lang="tr"><head><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"><META HTTP-EQUIV="Content-language" CONTENT="tr"><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=windows-1254"></head><body>' +
						this.state.content +
						'</body></html>',
				}}
				/>



			}

			</View>


		);
	}

}
class RegisterScreen extends React.Component {
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
const FirstRoute = () => (
	<View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
	<View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);
class BannerScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
				};
	}
	static navigationOptions = {
		title: '',
		header: null,
	};

render(){

return(<View>

	</View>)

}
}

class HomeScreen extends React.Component {
	loadingComponent: Promise<React.Element<*>>;
	loadingComponent1: Promise<*>;
	constructor(props) {
		super(props);
		this.spinValue = new Animated.Value(0);

		this.state = {
			isShowingText: false,
			UserName: '',
			Password: '',
			loading: false,
			index: 0,
			routes: [
				{ key: 'first', title: 'First' },
				{ key: 'second', title: 'Second' },
			],
		};
	}
	static navigationOptions = {
		//title: 'MAINSCREEN',
		header: null,
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
	updategps(authtoken) {
		navigator.geolocation.requestAuthorization();

		navigator.geolocation.getCurrentPosition(
			position => {
				//  alert(JSON.stringify(position))
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null,
				});

				fetch(
					API_URL+'/device/setDeviceLocation',
					{
						method: 'POST', timeout: 20000, timeout: 20000,
						headers: {
							Authorization: 'Bearer ' + authtoken,
							'Content-Type': 'application/x-www-form-urlencoded',
						},

						body:
						'DeviceId=' +
						deviceid +
						'&Latitude=' +
						position.coords.latitude +
						'&Longitude=' +
						position.coords.longitude,
					}
				)
					.then(response => {
						return response.json();
					})
					.then(response => {

						this.setState({ loading: false });
					})
					.catch(error => {
						//  alert(JSON.stringify(error))
			this.dropdown.alertWithType('error', 'Bağlantı','Bağlantınız yavaş tekrar deneniyor...');

						//this.props.navigation.navigate('Home');
						// alert(genelhata);
						this.setState({ loading: false });
					});
			},
			error => {
				this.setState({ error: error.message }),

					this.dropdown.alertWithType('error', 'Hata', JSON.stringify(error))


			},
			{ enableHighAccuracy: false, timeout: 20000 }
		);
	}

	updatedevicefirebasetoken(fbtoken, authtoken) {
		fetch(API_URL+'/device/setDeviceInfo', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + authtoken,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body:
			'DeviceId=' +
			deviceid +
			'&PushId=' +
			fbtoken +
			'&Name=' +
			devicename +
			'&Model=' +
			devicemodel +
			'&OSType=' +
			deviceos +
			'&OSVersion=' +
			deviceosversion +
			'&AppVersion=' +
			VersionNumber.buildVersion +
			'&Debug=',
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
					this.setState({ loading: false });
			})
			.catch(error => {
				this.dropdown.alertWithType('error', 'Bağlantı','Bağlantınız yavaş tekrar deneniyor...');

				this.setState({ loading: false });
			});
	}
	sendRemoteData(token) {
		let body = {
			to: '/topics/default',
			data: {
				custom_notification: {
					body: 'test body',
					title: 'test title',
					color: '#00ACD4',
					priority: 'high',
					icon: 'ic_launcher',
					sound: 'default',
					show_in_foreground: true,
				},
				aps: {
					badge: 1,
				},
			},
		};

		body = {
			data: {
				title: 'PromoClub kazandırıyor',
				body: 'Süpriz hediyeler indirimli ürünler...',
				url: 'mydsaasdurl',
			},
			notification: {
				title: 'PromoClub kazandırıyor',
				body: 'Süpriz hediyeler indirimli ürünler...',
				sound: 'default',
				badge: 1,
			},
			to: '/topics/default',
			content_available: true,
			priority: 'high',
		};

		firebaseClient.send(JSON.stringify(body), 'data');
	}

	navigate = url => {
		// E
		const { navigate } = this.props.navigation;
		const route = url.replace(/.*?:\/\//g, '');
		const id = route.match(/\/([^\/]+)\/?$/)[1];
		const routeName = route.split('/')[0];

		if (routeName === 'people') {
			navigate('Proje', { id, name: 'chris' });
		}
	};
	async componentDidMount() {
		this.loadingComponent = new Promise(resolve => {
			setTimeout(() => {
				resolve(
					<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
					>
					<Text>Resolved</Text>
					</View>
				);
			}, 6000);
		});
		this.loadingComponent1 = new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 8000);
		});




		var color = this.state.colorAnim.interpolate({
			inputRange: [0, 1],
			outputRange: ['#858a91', '#ffffff'],
		});
		this.refs.eposta.focus()

		if (Platform.OS === 'android') {
			Linking.getInitialURL().then(url => {
				const { navigate } = this.props.navigation;
				const route = url.replace(/.*?:\/\//g, '');
				const id = route.match(/\/([^\/]+)\/?$/)[1];
				const routeName = route.split('/')[0];
				this.props.navigation.navigate('ProductDetail', {
					name: id,
					token: this.state.token,
				});
				//  alert(id)
			});
		}
		//registerAppListener(this.props.navigation);
		//
		if (Platform.OS === 'ios') {
			FCM.getAPNSToken().then(tokens => {
				// alert("APNS TOKEN (getFCMToken): "+ JSON.stringify(tokens));
			});
		}
		FCM.getFCMToken().then(token_ => {
			alert(token_);
			//  this.updatedevicefirebasetoken(token_,deviceid)
			token = token_;
			this.setState({ tokenx: token_ || '' });
		});

		Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
			.then(realm => {
				realm.objects('Uyeler'); //Tüm objeleri geri dönderir.
				// alert(realm.objects('Uyeler').filtered('username="'+this.state.UserName+'"').length)

				if (realm.objects('Uyeler').length < 1) {
				} else {
					// alert(JSON.stringify(realm.objects('Uyeler')[0].username))

					this.setState(
						{
							UserName: realm.objects('Uyeler')[0].username,
							Password: realm.objects('Uyeler')[0].sifre,
						},
						function() {
							this.dologin();

						}
					);
				}
			})
			.catch(error => {
				console.log(error);
			});

		this.spin();

		//sendRemoteData(token)
		return;
		this.setState({ loading: true });

		fetch(API_URL+'/parameters/list', {
			method: 'GET', timeout: 20000,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				alert(JSON.stringify(response));

				this.setState({ loading: false, projectsettings: response });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				alert(genelhata);
				this.setState({ loading: false });
			});
	}
	dologin() {
		this.dropdown.alertWithType('info', 'Giriş Yapılıyor', 'Lütfen bekleyiniz...')



		var encodedString='' ;
		//	  var text = 'foo © bar 𝌆 baz';
		//var bytes = utf8.encode(text);
		//var encoded = binaryToBase64(bytes);
		if(true){
			// this.setState({ loading: true });
			encodedString = binaryToBase64(utf8.encode(this.state.Password));
			// alert(encodedString)
			this.setState({loading:true,Password2:encodedString},function(){

				fetch(API_URL+'/auth', {
					method: 'POST', timeout: 20000,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

					body:'grant_type=password'+
					'&UserName=' +
					this.state.UserName +
					'&Password=' +
					encodeURIComponent(this.state.Password)
				})
					.then(response => {
						return response.json();
					})
					.then(response => {
//alert(JSON.stringify(response))
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
														username: this.state.UserName,
														mail: this.state.UserName,
														sifre: encodeURIComponent(this.state.Password),
														rank: 2,
														token: response.access_token,
														sepet: 0,
													});
												});
												this.props.navigation.navigate('Proje', {
													UserName: this.state.UserName,
													Password: encodeURIComponent(this.state.Password
													),
													token: response.access_token,
												});
											})
											.catch(error => {
												console.log(error);
											});
									} else {



				const resetAction = NavigationActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ routeName: 'Proje',params:{
					UserName: this.state.UserName,
					Password: encodeURIComponent(this.state.Password),
					token: response.access_token,


					} })],
				});

				this.props.navigation.dispatch(resetAction);

									}
								})
								.catch(error => {
			this.dropdown.alertWithType('error', 'Bağlantı','Bağlantı Hatası oluştu...');

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
			encodedString = this.state.Password;

		}


	}
	spin() {
		this.spinValue.setValue(0);

		Animated.loop(
			Animated.timing(this.spinValue, {
				toValue: 360,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
			{
				iterations: 3,
			}
		).start(event => {
			this.spin();
			if (event.finished) {
				console.log('finished');
			}
		});
	}
	render() {
		const { navigate } = this.props.navigation;
		if (this.state.isShowingText) {
			return (
				<View
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>




				<ActivityIndicator size="large" color="green" />
				</View>
			);
		} else {
			const resizeMode = 'cover';
			const initialLayout = {
				height: 130,
				width: Dimensions.get('window').width,
			};
			const spin = this.spinValue.interpolate({
				inputRange: [0, 1],
				outputRange: ['0deg', '360deg'],
			});
			return (
				<KeyboardAvoidingView behavior="padding" style={{ height: Dimensions.get('window').height,backgroundColor:'white' }}>
				<HHeader title={this} baslik="Giriş yap" side="login"/>
					<View
				style={{
					zIndex: 11,
						alignItems: 'center',
						paddingTop: 0,
						justifyContent: 'center',
				}}>
				{false&&
					<Image defaultSource={require('./noimage.jpg')}
					source={require('./yatay.png')}
					style={{
						width: 200,
							zIndex: 20,
							marginTop: 60,
							height: 100,
							resizeMode: 'cover',
							opacity: 0.9,
					}}
					/>}
				<View style={{ height: 5 }} />
				{true && (
					<View>

					<View
					style={{
						padding: 20,
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
					}}>
					<TextInput
					mode="outlined"
					underlineColorAndroid="rgba(0,0,0,0)"
					underlineColorAndroid="rgba(0,0,0,0)"
					label="E-Posta"
					ref="epostaios"
					style={{
						//height: 40,fontSize:16,
						width: Dimensions.get('window').width - 20,
							// backgroundColor: '#ddd',
							//opacity: 0.8,
							//	padding: 10,
							borderRadius: 5,
							marginBottom: 5,
							//	borderColor: '#ddd',
							color: 'black',
							//	borderBottomWidth: 1,
							//	borderBottomColor: '#ddd',
					}}
					onChangeText={UserName => this.setState({ UserName })}
					value={this.state.UserName}
					/>

					<TextInput
					mode="outlined"

					underlineColorAndroid="rgba(0,0,0,0)"
					underlineColorAndroid="rgba(0,0,0,0)"
					label="Parola"
					style={{
						//	height: 40,fontSize:16,
						width: Dimensions.get('window').width - 20,
							// backgroundColor: '#ddd',
							//	opacity: 0.8,
							//	padding: 10,
							borderRadius: 5,
							//	borderColor: '#ddd',
							color: 'black',
							//	borderBottomWidth: 1,
							borderBottomColor: '#ddd',
					}}
					onChangeText={Password => this.setState({ Password })}
					value={this.state.Password}
					secureTextEntry={true}
					/>
					</View>
					<View
					style={{
					}}>



					</View>
				<Button mode="contained" onPress={()=>this.dologin()} style={{marginTop:10,marginLeft:20,marginRight:20,width:Dimensions.get('window').width-40}} dark>Giriş yap</Button>

					<View style={{flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',marginLeft:30,marginRight:30,marginTop:40}}>

	<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Forgot')}
					style={{ marginLeft: 20,marginBottom:20 }}>
					<Text
					style={{
						color: ColorCode,
							textDecorationLine: 'underline',
							fontWeight: '100',fontSize:16,
							fontFamily:
						Platform.OS == 'android' ? 'Roboto-Thin' : null,
					}}
					textDecorationLine={'underline line-through'}>
					Şifremi Unuttum
					</Text>
					</TouchableOpacity>


					<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate('Register', {
							eposta: this.state.eposta,
						})
					}

					style={{ marginLeft:20, }}>
					<Text
					style={{
						color: ColorCode,
							textDecorationLine: 'underline',
							fontWeight: '100',fontSize:16,
							fontFamily:
						Platform.OS == 'android' ? 'Roboto-Thin' : null,
					}}
					textDecorationLine={'underline line-through'}>
					Hesabınız yok mu? Kayıt Olun.
					</Text>
					</TouchableOpacity>



					</View>



					</View>
				)}
				</View>

				<Text
				style={{
					marginTop: 0,
						color: 'red',
						fontWeight: '100',
						position: 'absolute',
						bottom: Platform.OS == 'ios' ? 0 : 0,
						left: 0,
						zIndex: 200,
						fontSize: 8,
				}}>
				appVersion {VersionNumber.appVersion}
				{'\n'}
				buildVersion {VersionNumber.buildVersion}
				</Text>
				<DropdownAlert ref={ref => this.dropdown = ref} />

				</KeyboardAvoidingView>
			);
		}
	}
}
var nots=[]
var ll=0;
var llc=0;
class MainScreen extends React.Component {
	scroll = new Animated.Value(0);
	headerY;

	constructor(props) {
		super(props);
		this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, 70), -1);

		var banner;


		this.state = {
			ll:true,llc:true,
			data: [],
			ddd: '',
			banner: '',
			loading: false,
			token: '',
			dddc: '',
			showsifredegistir: false,
			showuseraccount: false,
			showorders: false,
			selectedcat: '51c77591-df99-4e25-95c0-a58c00f40df3',
			showuserpanel: false,
			loading: false,
			cart: [],
			sclocked: true,
			addressgetdata: [{ key: 'a' }],
			addressgetdatadone: false,
			selectedtab: 0,
			grid:false,
			setModalVisible:false
		};
        this.viewabilityConfig = {viewAreaCoveragePercentThreshold: 50}

		this._rendercItem = this._rendercItem.bind(this)
	}
	handleViewableItemsChanged(info) {
        console.log(info)
    }
	onNavigatorEvent(event) {
		switch (event.id) {
			case 'willAppear':
				alert('rerender');
				break;
			case 'didAppear':
				alert('rerender');
				break;
			case 'willDisappear':
				alert('rerender');
				break;
			case 'didDisappear':
				alert('rerender');
				break;
			case 'willCommitPreview':
				alert('rerender');
				break;
		}
	}



	updategps(authtoken) {
		if (Platform.OS === 'ios') {
			navigator.geolocation.requestAuthorization();
		}
		//navigator.geolocation.requestAuthorization();

		navigator.geolocation.getCurrentPosition(
			position => {
				//  alert(JSON.stringify(position))
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null,
				});

				fetch(
					API_URL+'/device/setDeviceLocation',
					{
						method: 'POST', timeout: 20000,
						headers: {
							Authorization: 'Bearer ' + authtoken,
							'Content-Type': 'application/x-www-form-urlencoded',
						},

						body:
						'DeviceId=' +
						deviceid +
						'&Latitude=' +
						position.coords.latitude +
						'&Longitude=' +
						position.coords.longitude,
					}
				)
					.then(response => {
						return response.json();
					})
					.then(response => {
						this.setState({ loading: false });
					})
					.catch(error => {
						// alert(JSON.stringify(error))

						//this.props.navigation.navigate('Home');
						// alert(genelhata);
						this.setState({ loading: false });
					});
			},
			error => {
				this.setState({ error: error.message });
				//alert(JSON.stringify(error)
			},
			{ enableHighAccuracy: false, timeout: 20000 }
		);
	}
	componentWillUnmount() {
		// C
		Linking.removeEventListener('url', this.handleOpenURL);
	}

	navigate = url => {
		// E
		const { navigate } = this.props.navigation;
		const route = url.replace(/.*?:\/\//g, '');
		const id = route.match(/\/([^\/]+)\/?$/)[1];
		const routeName = route.split('/')[0];

		if (routeName === 'people') {
			navigate('People', { id, name: 'chris' });
		}
	};
	handleOpenURL(event) {
		alert(event.url);
		this.props.navigation.navigate('ProductDetail', {
			name: event.url,
			token: this.state.token,
		});
		const route = event.url.replace(/.*?:\/\//g, '');
		// do something with the url, in our case navigate(route)
	}

componentDidMount() {

this.trythis()
}

	trythis() {
		var a=0
		setInterval( () => {
			a++
			if(a<SLOW_NETWORK_T+2){a++;

		 this.setState({
	      appstart:a
      })

		}else{


		}

        },1000)
				const didBlurSubscriptionproduct = this.props.navigation.addListener(
			'didFocus',
			payload => {
//this.trythis()

				//alert('didFocus');
				this.productcount()
			}
		);

		BackHandler.addEventListener('hardwareBackPress', () => {
			if(this.state.showuserpanel || this.state.showorders || this.state.showorderdetails || this.state.showsifredegistir || this.state.showuseraccount ){
				this.setState({showuserpanel:false,showorders:false,showorderdetails:false,showsifredegistir:false,showuseraccount:false,sclocked:true})
				return true
			}
		});
		var nots=[]



		Realm.open({schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
			.then(realm => {

				var helloEverySecond= setInterval(()=>{
					//	 alert( realm.objects('Uyeler')[0].sepet)
					if(typeof realm !=='undefined' && typeof realm.objects('Uyeler')!=='undefined' && typeof realm.objects('Uyeler')[0]!=='undefined' && typeof realm.objects('Uyeler')[0].sepet !== 'undefined' ){
						this.setState({productcount:  realm.objects('Uyeler')[0].sepet})
					}


				},1000)

				FCM.on(FCMEvent.Notification, async (notif) => {

					FCM.setBadgeNumber(1)
					realm.write(() => {


						realm.create('Notifications', {
							id:'asd',
							notification: notif.body + ' ',
							time: '',

						});


					});

				})



			})



		if (Platform.OS === 'android') {
		Linking.getInitialURL().then(url => {
			this.navigate(url);
		});
	} else {
		Linking.addEventListener('url', this.handleOpenURL.bind(this));
	}
		this.setState({ loading: true,banner:false,campaignproducts:false,monthlyproducts:false,featuredproducts:false,shopcaselist:false });

		var fruits = [];
		var fruitsc = [];
		var desc = [];

		var params = {
			UserName: this.props.navigation.state.params.UserName,
			Password: this.props.navigation.state.params.Password,
			grant_type: 'password',
		};


		var formData = new FormData();

		for (var k in params) {
			formData.append(k, params[k]);
		}
		//	alert('asd')
		fetch(API_URL+'/auth', {
			method: 'POST', timeout: 20000,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

			body:
			'UserName=' +
			this.props.navigation.state.params.UserName +
			'&Password=' +
			encodeURIComponent( this.props.navigation.state.params.Password) +
			'&grant_type=password',
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				//	alert(JSON.stringify(response ))
				// alert(JSON.stringify(response.access_token ))
				// alert(JSON.stringify(response.token_type ))
				//var token = response.access_token;
				var token = this.props.navigation.state.params.token;
				this.updategps(token);
				this.setState({ token: token });
				//this.props.navigation.navigate('Neisterseniz',{token:token})

			fetch(API_URL+'/customer/TotalPoint', {
			method: 'GET', timeout: 1000,
			headers: {
				Authorization: 'Bearer ' +token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body:'id='+orderid,
		})	.then(response => {
						return response.json();
					})

			.then(response => {
				this.setState({ totalpoint: response.ResultMessage });
			})

			fetch(API_URL+'/customer/myaccount', {
			method: 'GET', timeout: 1000,
			headers: {
				Authorization: 'Bearer ' +token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body:'id='+orderid,
		})	.then(response => {
						return response.json();
					})

			.then(response => {
				this.setState({ name: response.FirstName + ' ' + response.LastName  });
			})

				fetch(API_URL+'/banner/list/Popup', {
					method: 'POST', timeout: 20000,
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/x-www-form-urlencoded',
					},

					body: '',
				})
					.then(response => {
						return response.json();
					})
					.then(response => {
							//alert(JSON.stringify(response))
						if(response.length>0){
							this.setState({ popup: response,setModalVisible:false });}
						else{
							this.setState({ popup: false ,setModalVisible:false});}


						//   this.showuseraccountpre2();
						//	alert(JSON.stringify(this.state.banner))
					})
					.catch(error => {
					//	this.props.navigation.navigate('Splash');
						// //alert(error);
				return
											Alert.alert(
  'Bağlantı',
  'Bağlantınız çok yavaş, lütfen bağlantınızı kontrol edin.',
  [
    {text: 'Tekrar Dene', onPress: () => this.props.navigation.navigate('Splash')},

  ],
  { cancelable: true }
)


					});




				fetch(API_URL+'/banner/list/Slider', {
					method: 'POST', timeout: 20000,
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/x-www-form-urlencoded',
					},

					body: '',
				})
					.then(response => {
						return response.json();
					})
					.then(response => {
						//	alert(JSON.stringify(response))
						for (var i = 0; i < response.length; i++) {
							desc.push({
								uri: response[i].Url,
								rtype: response[i].RedirectType,
								Description: response[i].Description,
								Image: response[i].Image,
							});
						}

						this.setState({ banner: desc });
						this.showuseraccountpre2();
						//	alert(JSON.stringify(desc))
					})
					.catch(error => {
					//	this.props.navigation.navigate('Splash');
						// //alert(error);
					});
					fetch(API_URL+'/shopcase/list', {
							method: 'POST', timeout: 20000,
							headers: {
								Authorization: 'Bearer ' + this.props.navigation.state.params.token,
								'Content-Type': 'application/x-www-form-urlencoded',
							},

						})
					.then(response => {
						return response.json();
					})
					.then(response => {
						banner=response
						var campaignnames = [];
						var campaignproducts = [];
						//alert(JSON.stringify(response))
						for (var i = 0; i < response.length; i++) {
							//campaignnames [i] =response[i].Name
							campaignnames.push({
								name: response[i].Name,
								count: parseInt(i),
							});

							for (var j = 0; j < response[0].Products.length; j++) {
								//campaignproducts [j]= response[i].Products[j]
								if(campaignproducts.includes(
									{
										productname: response[0].Products[j].Name,
										productprice: response[0].Products[j].Price,
										marketprice: response[0].Products[j].MarketPrice,
										supportprice: response[0].Products[j].SupportPrice,
										productimage: response[0].Products[j].Image,
										productbrand: response[0].Products[j].Brand,
										productmodel: response[0].Products[j].Model,

										productid: response[0].Products[j].Id,
									}

								))return

								campaignproducts.push({
									productname: response[0].Products[j].Name,
									productprice: response[0].Products[j].Price,
									marketprice: response[0].Products[j].MarketPrice,
									supportprice: response[0].Products[j].SupportPrice,
									productimage: response[0].Products[j].Image,
									productbrand: response[0].Products[j].Brand,
									productmodel: response[0].Products[j].Model,

									productid: response[0].Products[j].Id,
								});
							}
						}
						this.setState({
							shopcaselist: response,
							featuredproducts: response[1],
							monthlyproducts: response[0],
							campaignnames: campaignnames,
							campaignproducts: campaignproducts,
						});
						this.settab(0)
					})
					.catch(error => {
					//	this.props.navigation.navigate('Splash');
						// //alert(error);
					});

				fetch(API_URL+'/catalog/list/', {
					method: 'POST', timeout: 20000,
					headers: {
						Authorization: 'Bearer ' + this.props.navigation.state.params.token,
						'Content-Type': 'application/x-www-form-urlencoded',
					},

					body: 'Id=',
				})
					.then(response => {
						return response.json();
					})
					.then(response => {
						var categories = [];
						var subcategories = [];

						for (var i = 0; i < response.length; i++) {
							fruitsc.push({
								ParentCategory: response[i].ParentCategory.Id,
								Name: response[i].ParentCategory.Name,
								Category: response[i].Category,
							});
						}

						this.setState({ dddc: fruitsc });
						return
						})
					.catch(error => {
					//	this.props.navigation.navigate('Splash');
						////alert(error);
					});
			})
			.catch(error => {
				this.props.navigation.navigate('Splash');
				// //alert(error);
			});
}

settab(a) {
	//fill the products
	//
	this.setState({
		loading: true,
		selectedtab: parseInt(a),
		campaignnames: false,
		campaignproducts: false,
	});

	if(banner.length>1){
		var campaignnames = [];
		var campaignproducts = [];

		for (var i = 0; i < banner.length; i++) {
			//campaignnames [i] =response[i].Name
			campaignnames.push({ name: banner[i].Name, count: i });
		}

		for (var j = 0; j < banner[a].Products.length; j++) {
			//campaignproducts [j]= response[i].Products[j]
			campaignproducts.push({
				productname: banner[a].Products[j].Name,
				productprice: banner[a].Products[j].Price,
				marketprice: banner[a].Products[j].MarketPrice,
				supportprice: banner[a].Products[j].SupportPrice,
				productmodel: banner[a].Products[j].Model,

				productimage: banner[a].Products[j].Image,
				productbrand: banner[a].Products[j].Brand,
				productid: banner[a].Products[j].Id,
			});
		}

		//alert(JSON.stringify(campaignproducts))
		this.setState({
			loading: false,
			campaignproducts: campaignproducts,
			campaignnames: campaignnames,
		});

		return

	}
	this.setState({
		loading: true,
		selectedtab: parseInt(a),
		campaignnames: false,
		campaignproducts: false,
	});
	fetch(API_URL+'/shopcase/list', {
		method: 'POST', timeout: 20000,
		headers: {
			Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			'Content-Type': 'application/x-www-form-urlencoded',
		},

		//body: 'Id=',
	})
		.then(response => {
			return response.json();
		})
		.then(response => {
			var campaignnames = [];
			var campaignproducts = [];

			for (var i = 0; i < response.length; i++) {
				//campaignnames [i] =response[i].Name
				campaignnames.push({ name: response[i].Name, count: i });
			}

			for (var j = 0; j < response[a].Products.length; j++) {
				//campaignproducts [j]= response[i].Products[j]
				campaignproducts.push({
					productname: response[a].Products[j].Name,
					productprice: response[a].Products[j].Price,
					marketprice: response[a].Products[j].MarketPrice,
					supportprice: response[a].Products[j].SupportPrice,
					productmodel: response[a].Products[j].Model,

					productimage: response[a].Products[j].Image,
					productbrand: response[a].Products[j].Brand,
					productid: response[a].Products[j].Id,
				});
			}

			//alert(JSON.stringify(campaignproducts))
			this.setState({
				loading: false,
				campaignproducts: campaignproducts,
				campaignnames: campaignnames,
			});
		})
		.catch(error => {
		//	this.props.navigation.navigate('Home');
			// //alert(error);
		});
}

setcat(a, b) {
	var self = this;
	const { navigate } = self.props.navigation;

	//	alert(a)
	this.drawer.closeDrawer();
	//
	self.setState({ selectedcat: a, loading: true });
	var fruitsc = [];
	var fruits = [];
	fetch(API_URL+'/catalog/list/', {
		method: 'POST', timeout: 20000,
		headers: {
			Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: 'Id=' + a,
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
			//alert(JSON.stringify(response))
			for (var i = 0; i < response.length; i++) {
				fruitsc.push({ Id: response[i].Id, Name: response[i].Name });
			}
			if (response.length > 0) {
				//	this.setState({ dddc: fruitsc })
			} else {
				this.drawer.closeDrawer();
			}

			fetch(API_URL+'/product/list/', {
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				body:
				'CategoryId=' +
				a +
				'&Keywords=&OrderBy=0&BrandName=&PriceMin=&PriceMax=&P1=0&P2=100',
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
					//alert(this.state.ddd[0].Id),
					//	alert(JSON.stringify(response))
					//alert('asdasdadsad')
					fruits = [];
					for (var i = 0; i < response.Products.length; i++) {
						fruits.push({
							Idd: response.Products[i].Id,
							Id: response.Products[i].Image,
							Name: response.Products[i].Name,
							Price: response.Products[i].Price,
							Brand: response.Products[i].Brand,
							Model:response.Products[i].Model,
						});
					}
					//	alert(fruits)
					this.setState({ ddd: fruits, loading: false });
					this.props.navigation.navigate('CategoryDetail', {
						token: this.state.token,
						categorydata: fruits,
						categoryname: b,
						categoryid: a,
						token: this.state.token,
						selectedcat: a,
						brands:response.Brands
					});
				})
				.catch(error => {
				//	this.props.navigation.navigate('Home');
					//	 //alert(error);
				});
		})
		.catch(error => {
		//	this.props.navigation.navigate('Home');
			//	 //alert(error);
		});
}
openDriver() {
	this.drawer.openDrawer();
}
static navigationOptions = {
	title: 'Oturum',
	header: null,
	gesturesEnabled: false,

	headerStyle: { paddingTop: 0, backgroundColor: '#371777', color: 'white' },
};
resetfunc() {
	var fruitsc = [];
	fetch(API_URL+'/catalog/list/', {
		method: 'POST', timeout: 20000,
		headers: {
			Authorization: 'Bearer ' + this.state.token,
			'Content-Type': 'application/x-www-form-urlencoded',
		},

		body: 'Id=',
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
			//	alert(JSON.stringify(response))
			for (var i = 0; i < response.length; i++) {
				fruitsc.push({ Id: response[i].Id, Name: response[i].Name });
			}
			this.setState({ dddc: fruitsc });
		})
		.catch(error => {
		//	this.props.navigation.navigate('Home');
			////alert(error);
		});
}

showuserpanel() {
	fetch(API_URL+'/customer/myaccount', {
		method: 'GET', timeout: 20000,
		headers: {
			Authorization: 'Bearer ' + this.state.token,
			'Content-Type': 'application/x-www-form-urlencoded',
		},

		//	body: '',
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
			//alert(JSON.stringify(response))
			//	alert(JSON.stringify(response))

			this.setState({
				loading: false,
				isim: response.FirstName,
				soyisim: response.LastName,
				eposta: response.Email,
				ceptel: response.Gsm,
			});
		})
		.catch(error => {
		//	this.props.navigation.navigate('Home');
			////alert(error);
		});
	fetch(API_URL+'/customer/TotalPoint', {
		method: 'GET', timeout: 20000,
		headers: {
			Authorization: 'Bearer ' + this.state.token,
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
			//alert(JSON.stringify(response))
			//	alert(JSON.stringify(response))

			this.setState({
				loading: false,
				totalpoint: response.ResultMessage,
			});
		})
		.catch(error => {
			//this.props.navigation.navigate('Home');
			////alert(error);
		});

	if (this.state.showuserpanel == false) {
		this.setState({ showuserpanel: true, sclocked: false });
	} else {
		this.setState({ showuserpanel: false, sclocked: true });
	}
}




outrun(uri) {
	//alert(uri);
	if (uri === undefined) {
		return;
	}
	//alert(uri)
	if(uri.indexOf("product") >-1){
		var ripl = uri.replace('/product/', '');
		this.props.navigation.navigate('ProductDetail', {
			name: ripl,
			token: this.state.token,
		});
	}
	if(uri.indexOf('catalog')>-1){

		var ripl = uri.replace('/catalog/category/', '');
		//	alert(ripl)
		this.setcat(ripl, null)
	}


}
_rendercItem({ item, index }) {
	var self = this;

	return (
<View>
<TouchableOpacity
		onPress={() => this.outrun(item.uri)}
		style={{
			height: 170,
			flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				elevation: 4,
				shadowColor: '#ccc',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.8,
				shadowRadius: 2,elevation: 4,
		}}>
		<Image
		onLoadEnd={()=>{llc++ ; if(llc>2){this.setState({llc:true})}}}

		style={{ width: Dimensions.get('window').width, height: 150,

				elevation: 5,


 }}
		resizeMode={'contain'}
		source={{ uri:'https:'+ item.Image }}
		/>
		<Text
		style={{alignItems:'center',bottom:0,backgroundColor:'white',zIndex:100,//elevation:6,
			fontSize: 18,
			color: 'black',
				fontWeight: '800',
				left: 0,
		}}>
		{item.Description}
		</Text>
		</TouchableOpacity>

			</View>




		);
}

productcount() {
	fetch(API_URL+'/shoppingcart/cart-count/', {
		method: 'GET', timeout: 20000,
		headers: {
			Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then(response => {
			const statusCode = response.status;
			return response.json();
		})
		.then(response => {
			this.setState({ productcount: response.CartCount });
			// alert(JSON.stringify(response))
			Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 }).then(realm => {
				//alert("Language is: "+lange);
				let updt = realm.objects('Uyeler');
				realm.write(() => {
					updt[0].sepet = response.CartCount;
				});

			});
		})
		.catch(error => {

return
Alert.alert(
  'Bağlantı',
  'Bağlantınız çok yavaş, lütfen bağlantınızı kontrol edin.',
  [
    {text: 'Tekrar Dene', onPress: () => {

    	    const resetAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Proje',params:{token:this.props.navigation.state.params.token} })],
					});

					this.props.navigation.dispatch(resetAction);

    }},

  ],
  { cancelable: true }
)

			});
}




render() {
	if(this.state.ll==true && this.state.llc==true && this.state.loaderr==true){
	this.setState({loaderr:false,appstart:0})
		}

	if(this.state.appstart >SLOW_NETWORK_T && (this.state.ll==false || this.state.llc==false)){
	this.setState({loaderr:true,appstart:0})
	}
	var drawerContent = (
		<View
		style={{
			backgroundColor: '#222222',
				flex: 1,
				zIndex: 300,
				marginTop:
			Platform.OS == 'android' && this.state.blacked == true ? 0 : 0,
		}}>

		<View style={{}} />
		<View style={{}}>
		<View>
		<TouchableOpacity style={{ marginTop: 30, paddingLeft: 15, position: 'absolute' }}>
		<Text
		style={{ color: ColorCode, fontSize: 20, fontWeight: '400' }}>
		Tüm Kategoriler
		</Text>
		</TouchableOpacity>
		</View>
		<View>
		<TouchableOpacity
		style={{ marginTop: 60, paddingLeft: 20, position: 'absolute' }}
		onPressIn={() =>
			this.props.navigation.navigate('Neisterseniz', {
				token: this.state.token,
			})
		}>
		<Text style={{ color: ColorCode, fontWeight: '400' }}>
		Ne İsterseniz
		</Text>
		</TouchableOpacity>
		</View>
		<View>
		<TouchableOpacity
		style={{ marginTop: 80, paddingLeft: 20, position: 'absolute' }}
		onPressIn={() =>{//alert(this.state.totalpoint)
			this.props.navigation.navigate('Search', {
				token: this.state.token,
				setmax: this.state.totalpoint,
				setmin: 0,
			})}
		}>
		<Text style={{ color: ColorCode, fontWeight: '400' }}>
		Puanıma Uygun Ürünler
		</Text>
		</TouchableOpacity>
		</View>

		<View style={{ marginTop: 100 }}>
		<FlatList
		style={{ marginBottom: 20 }}
		data={this.state.dddc}
		renderItem={({ item }) => (
			<View>
			<TouchableHighlight
			style={{ margin: 1, padding: 3 }}
			underlayColor={ColorCode}
			onPress={() => {
				if (item.Name == 'Araç Kiralama') {
					this.props.navigation.navigate('CarRental', {
						token: this.state.token,
					});
					return;
				}
				if (item.Category.length == 0) {
					this.setcat(item.ParentCategory, item.Name);
					return;
				}

				this.setState({
					[item.ParentCategory]: !this.state[item.ParentCategory],
					ac: false,
					[item.ParentCategory + 'cm']:
					item.ParentCategory.length *
					(Platform.OS == 'ios' ? 25 : 30),
				});
			}}>
			<View
			style={{
				flexDirection: 'row',
					justifyContent: 'space-between',
			}}>
			<Text
			style={{
				color: '#fdfdfd',
					fontWeight: '400',
					paddingLeft: 15,
			}}>
			{item.Name}
			</Text>
			{item.Category.length > 0 && (
				<Icon
				name="angle-down"
				size={20}
				color="gray"
				style={{ marginRight: 15 }}
				/>
			)}
			</View>
			</TouchableHighlight>
			<View>
			{this.state[item.ParentCategory] && (
				<FlatList
				data={item.Category}
				style={{ marginBottom: 0 }}
				renderItem={({ item }) => (
					<View style={{ marginLeft: 10 }}>
					<TouchableHighlight
					style={{ margin: 1, padding: 3 }}
					underlayColor={ColorCode}
					onPress={() => {
						if (item.SubCategory.length > 0) {
							this.setState({
								[item.SubCategory]: !this.state[
									item.SubCategory
								],
								ac: true,
								uzunluk:
								item.SubCategory.length *
								(Platform.OS == 'ios' ? 25 : 30),
							});
						} else {
							this.setcat(item.Id, item.Name);
						}
					}}>
					<View>
					<View
					style={{
						flexDirection: 'row',
							justifyContent: 'space-between',
					}}>
					<Text
					style={{
						color: '#fdfdfd',
							//fontSize: 20,
							fontWeight: '400',
							paddingLeft: 15,
					}}>
					{item.Name}
					</Text>
					{item.SubCategory.length > 0 && (
						<Icon
						name="angle-down"
						size={20}
						color="gray"
						style={{ marginRight: 15 }}
						/>
					)}
					</View>
					<View>
					{item.SubCategory && (
						<View
						style={{
							height:
							item.SubCategory.length > 0 &&
								this.state.ac &&
								this.state[item.SubCategory]
								? item.SubCategory.length *
								(Platform.OS == 'ios' ? 25 : 30)
								: 0,
						}}>
						<FlatList
						style={{ marginBottom: 0 }}
						data={
							item.SubCategory
							? item.SubCategory
							: null
						}
						renderItem={({ item }) => (
							<View style={{ marginLeft: 10 }}>
							<TouchableHighlight
							style={{ margin: 1, padding: 3 }}
							underlayColor={ColorCode}
							onPress={() =>
								this.setcat(item.Id, item.Name)
							}>
							<View
							style={{
								flexDirection: 'row',
									justifyContent:
								'space-between',
							}}>
							<Text
							style={{
								color: '#fdfdfd',
									//fontSize: 20,
									fontWeight: '400',
									paddingLeft: 15,
							}}>
							{item.Name}
							</Text>
							{false && (
								<Icon
								name="angle-right"
								size={20}
								color="gray"
								style={{ marginRight: 15 }}
								/>
							)}
							</View>
							</TouchableHighlight>
							<View />
							</View>
						)}
						/>
						</View>
					)}
					</View>
					</View>
					</TouchableHighlight>
					<View />
					</View>
				)}
				/>
			)}
			</View>
			</View>
		)}
		/>
		</View>
		</View>
		</View>
	);

	const items = [
		{
			name: 'Fruits',
			id: 0,
			children: [
				{
					name: 'Apple',
					id: 10,
				},
				{
					name: 'Strawberry',
					id: 17,
				},
				{
					name: 'Pineapple',
					id: 13,
				},
				{
					name: 'Banana',
					id: 14,
				},
				{
					name: 'Watermelon',
					id: 15,
				},
				{
					name: 'Kiwi fruit',
					id: 16,
				},
			],
		},
		{
			name: 'Gems',
			id: 1,
			children: [
				{
					name: 'Quartz',
					id: 20,
				},
				{
					name: 'Zircon',
					id: 21,
				},
				{
					name: 'Sapphire',
					id: 22,
				},
				{
					name: 'Topaz',
					id: 23,
				},
			],
		},
		{
			name: 'Plants',
			id: 2,
			children: [
				{
					name: "Mother In Law's Tongue",
					id: 30,
				},
				{
					name: 'Yucca',
					id: 31,
				},
				{
					name: 'Monsteria',
					id: 32,
				},
				{
					name: 'Palm',
					id: 33,
				},
			],
		},
	];
	var customStyles = {
		drawer: {
			shadowColor: '#000',
			shadowOpacity: 0.4,
			shadowRadius: 10,
		},
		mask: {},
		main: {},
	};
	const actions = [];
	const { navigate } = this.props.navigation;
	const tabY = Animated.add(this.scroll, this.headerY);

	return (
		<Drawer
		style={{ zIndex: 200 }}
		drawerWidth={250}
		drawerContent={drawerContent}
		type={Drawer.types.Default}
		customStyles={{ drawer: styles.drawer }}
		drawerPosition={Drawer.positions.Left}
		onDrawerOpen={() => {
			console.log('Drawer is opened');
		}}
		onDrawerClose={() => {
			console.log('Drawer is closed');
		}}
		easingFunc={Easing.ease}
		ref={ref => (this.drawer = ref)}>
		{this.state.loaderr&&

			<View

			style={{backgroundColor:'red',opacity:.9,width:Dimensions.get('window').width,height:Platform.OS=='ios'?100:null,position:'absolute',elevation:100,zIndex:1000,padding:20,top:Dimensions.get('window').height/2 - 50}}>

	  <Text style={{color:'white',fontSize:20,fontWeight:'800',textAlign:'center',marginBottom:10}}>Bağlantınız yavaş, Tekrar deneniyor...</Text><Button mode="contained" color="gray" onPress={()=>{

		const resetAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Proje',params:{token:this.props.navigation.state.params.token} })],
					});

					this.props.navigation.dispatch(resetAction);



		}}>Tekrar Bağlan</Button>

	  </View>

					}



{this.state.popup && this.state.popup.length!==0 &&	this.state.hosgeldiniz&&	<Modal
			animationType="fade"
			transparent={true}
			visible={this.state.popup}
			onRequestClose={() => {
				//alert('Modal has been closed.');
			}}>
			<View style={{flex:1,alignItems:'center',justifyContent:'center',zIndex:80,width:this.state.resimyuklendi?Dimensions.get('window').width:0,height:this.state.resimyuklendi?Dimensions.get('window').height:0}}>
<TouchableOpacity style={{zIndex:900,elevation:10,flexDirection:'row',width:180,height:30,borderRadius:15,margin:0,position:'absolute',bottom:100,right:10,backgroundColor:'#ccc',alignItems:'center',justifyContent:'center'}} onPress={() => this.setState({setModalVisible:false,resimyuklendi:false,hosgeldiniz:false}) }
	       >
			<Text style={{color:'white',fontWeight:'800',marginRight:10}}>İlgilenmiyorum</Text>
<Icon 			name="close"
			size={20}
			color="white"
			/>


		</TouchableOpacity>

			<View style={{width:Dimensions.get('window').width,height:200,zIndex:100}}>




			<TouchableOpacity onPress={()=>{
				this.setState({setModalVisible:false,hosgeldiniz:false});this.props.navigation.navigate('ProductDetail', {
					name: this.state.popup[0].Url.replace('product/',''),
					token: this.state.token,
				})}
			} >
			{this.state.popup &&
				<Image onLoadStart={(e) => this.setState({loading: true})} onLoadEnd={(e) => {this.setState({loading: false,setModalVisible:true,resimyuklendi:true});}}
				source={{uri:'https:'+this.state.popup[0].Image}} style={{width:Dimensions.get('window').width,height:200,zIndex:100}}/>}
			</TouchableOpacity>


			</View>
			</View>
			</Modal>
		}



		<Appbar.Header
		style={{backgroundColor:'white',
				zIndex:1000,width:Dimensions.get('window').width,}} dark={false} statusBarHeight={Platform.OS=='ios'?20:0}

		>
		<Appbar.Action icon="menu" onPress={() => this.drawer.openDrawer()} />

		<Appbar.Content
		title="PromoClub"
		/>
		<Appbar.Action icon="search" onPress={()=>this.props.navigation.navigate('Search',{token:this.props.navigation.state.params.token})} />
		<Appbar.Action icon="person-outline" onPress={()=>this.setState({showuserpanel:!this.state.showuserpanel})} />
		</Appbar.Header>



		{this.state.setModalVisible&&<View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,opacity:.7,backgroundColor:'black',position:'absolute',zIndex:100}}></View>}


	{this.state.showuserpanel && (<View style={{
				width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
					position: 'absolute',
					backgroundColor: ColorCode,
				opacity: 0.9,elevation:50,
					zIndex: 99,
					// marginTop: 0,
					padding: 20,
					flexDirection: 'column',
					//	marginTop:100
			}}>

<List.Section style={{marginTop:50}}>

               <TouchableOpacity style={{flexDirection:'row',margin:15,justifyContent:'center',alignItems:'center'}} onPress={() => this.props.navigation.navigate('MyCart', {
					token: this.state.token,
				})
}
	       ><Icon style={{position:'absolute',left:20,top:1}}
			name="shopping-cart"
			size={20}
			color="white"
			/>
<Text style={{color:'white',fontWeight:'800',fontSize:20}}>Sepetim</Text>


		</TouchableOpacity>
		<Divider/>


		<TouchableOpacity style={{flexDirection:'row',margin:15,alignItems:'center',justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('MyAccount',{token: this.state.token})}}

       >
		<Icon style={{position:'absolute',left:20,top:1}}
			name="user"
			size={20}
			color="white"
			/>
<Text style={{color:'white',fontWeight:'800',fontSize:20,marginLeft:10}}>Hesabım</Text>
		</TouchableOpacity>
<Divider/>

        <TouchableOpacity style={{flexDirection:'row',margin:15,justifyContent:'center',alignItems:'center'}} onPress={() =>
				this.props.navigation.navigate('BadInstagramCloneApp', {
					token: this.state.token
				})
			}
	       >
		<Icon style={{position:'absolute',left:20,top:1}}
			name="barcode"
			size={20}
			color="white"
			/>
<Text style={{color:'white',fontWeight:'800',fontSize:20,marginLeft:10}}>Puan Barkod Oku</Text>

		</TouchableOpacity>
<Divider/>
		<TouchableOpacity style={{flexDirection:'row',margin:15,justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('CustomerSupport', {
					token: this.state.token})}
			}
		       >
		<Icon style={{position:'absolute',left:20,top:1}}
			name="info"
			size={20}
			color="white"
			/>
<Text style={{color:'white',fontWeight:'800',fontSize:20,marginLeft:10}}>Müşteri Hizmetleri</Text>

		</TouchableOpacity>
<Divider/>
<TouchableOpacity style={{flexDirection:'row',margin:15,justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Splash');
	Realm.open({schema: [uyeSchema,notificationSchema],schemaVersion: 5,}).then(realm => {realm.write(() => {realm.deleteAll();});});}}
	       >

	<Icon  style={{position:'absolute',left:20,top:1}}
			name="close"
			size={20}
			color="white"
			/>
<Text style={{color:'white',fontWeight:'800',fontSize:20,marginLeft:10}}>Çıkış</Text>


		</TouchableOpacity>




	

</List.Section>
	<TouchableOpacity style={{flexDirection:'row',width:100,height:30,borderRadius:15,margin:0,position:'absolute',top:30,right:20,backgroundColor:'red',alignItems:'center',justifyContent:'center'}} onPress={() => this.setState({showuserpanel:false}) }
	       >
		<Text style={{color:'white',fontWeight:'800',marginRight:10}}>Kapat</Text>
<Icon 			name="close"
			size={20}
			color="white"
			/>


		</TouchableOpacity>


	<TouchableOpacity style={{position:'absolute',bottom:30,width:Dimensions.get('window').width-50,flexDirection:'row',margin:15,justifyContent:'center',alignItems:'center',textAlign:'center'}} onPress={() => {	Linking.canOpenURL(
						'https://promoclub.now.sh' 
					).then(supported => {
						if (supported) {
							Linking.openURL(
								'https://promoclub.now.sh' 
							);
						} else {
							//alert('hata');
						}
					});

	}}
	       >
<Text style={{color:'blue',fontWeight:'800',fontSize:12,textDecorationLine:'underline'}}>Hata Bildir</Text>


		</TouchableOpacity>


	</View>)
	}




		{true&&
				<StatusBar
			backgroundColor={'white'}
			translucent={false}
			barStyle="dark-content"
				/>
		}

		<Animated.ScrollView
		contentContainerStyle={{paddingTop: null
		}}

		scrollEventThrottle={1}
		bounces={false}
		showsVerticalScrollIndicator={false}
		overScrollMode={'never'}
		scrollEnabled={this.state.sclocked}
		scrollEventThrottle={1}


		>




		<View
		style={{paddingBottom: 10,
		}}>

<View style={{ alignItems: 'center',backgroundColor:'white' }}>
		<Text style={{ color: 'gray',fontWeight:'800',
				fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,

		}}>
		Hoşgeldiniz {this.state.name} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?
				('Puanınız: '+  (this.state.totalpoint?this.state.totalpoint:'')):''}</Text>
{this.state.puan && this.state.popup.length!==0 &&
<TouchableOpacity onPress={()=>this.setState({hosgeldiniz:true})} style={{flexDirection:'row',backgroundColor:'#7ac143',justifyContent:'center',padding:5,borderRadius:5,marginBottom:4}}>


<Text style={{ color: 'white',fontWeight:'800',marginLeft:10,marginRight:10,
				fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,

		}}>
		Size Özel 1 yeni fırsatınız var!
		</Text>
	</TouchableOpacity>
	}


				</View>

	<View style={{backgroundColor:'white',borderBottomLeftRadius:25,borderBottomRightRadius:25,height:175,}}>
	{!this.state.llc && <PlaceholderExampleslider/>}

<View style={{height:this.state.llc?null:0}}>
	<SwiperFlatList data={this.state.banner?this.state.banner:[{Description:'',uri:'',},{Description:'',uri:'',}]} renderItem={this._rendercItem} autoplay autoplayDelay={2} autoplayLoop  showPagination={false}/>

</View>

</View>


		<View
		style={{ backgroundColor: 'transparent', elevation: 0, marginTop: 10 }}>
		<View style={{flexDirection:'row',height:40}}>
		{this.state.campaignnames && (
			<FlatList
			showsHorizontalScrollIndicator={false}

			horizontal={true}
			data={this.state.campaignnames}
			style={{flex:.85}}
			renderItem={({ item }) => (
				<TouchableOpacity

				activeOpacity={1}
				activeOpacity={1}
				style={{
					backgroundColor:
					parseInt(item.count) !==
						parseInt(this.state.selectedtab)
						? '#ccc'
						: 'white',

						// width: Dimensions.get('window').width / 3,
						padding: 10,
						flexDirection: 'row',
						justifyContent: 'space-between',
						borderTopLeftRadius:10,borderTopRightRadius:10,marginLeft:4
				}}
				onPress={() => this.settab(item.count)}
				>

				<View
				>
				<Text
				style={{
					color:
					parseInt(item.count) !==
						parseInt(this.state.selectedtab)
						? 'white'
						: 'gray',
						fontWeight:
					parseInt(item.count) !==
						parseInt(this.state.selectedtab)
						? '100'
						: '100',
				}}>
				{item.name}
				</Text>
				</View>
				</TouchableOpacity>

			)}
			/>
		)}
		<View style={{flex:.15,alignItems:'center',justifyContent:'center'}}>
		{!this.state.grid&& this.state.campaignnames &&
			<EnIcon name="grid" onPress={()=>this.setState({grid:!this.state.grid})} size={25} color={ColorCode} />
		}
		{this.state.grid&& this.state.campaignnames &&
				<EnIcon name="text" onPress={()=>this.setState({grid:!this.state.grid})} size={25} color={ColorCode} />
		}

		</View>
		</View>

		{this.state.campaignproducts && this.state.grid &&
			!this.state.showuserpanel && (
				<View style={{flex:1,backgroundColor:'transparent'}}>

				<FlatList
				showsHorizontalScrollIndicator={false}
				style={{backgroundColor:'white'}}
				numColumns={2}
				data={this.state.campaignproducts}
				renderItem={({ item }) => (
					<TouchableOpacity
					style={{width:Dimensions.get('window').width/2 - 5, backgroundColor:'white'}}
					onPress={() =>
						this.props.navigation.navigate('ProductDetail', {
							name: item.productid,
							token: this.state.token,
						})
					}>
					<View
					style={{
						margin: 10,
							flexDirection: 'column',
							alignItems: 'center',

							margin: 1,
							backgroundColor: 'transparent',
					}}>
					<Image //defaultSource={require('./noimage.jpg')}
					style={{
						flex: .8,
							height: 180,
							width: Dimensions.get('window').width,
					}}
					resizeMode={'contain'}
					source={{ uri: 'https:' + item.productimage }}
					/>

					<View
					style={{
						backgroundColor:ColorCode,borderRadius:5,
							flexDirection: 'row',marginTop:-15,
							alignItems: 'center',marginLeft:15,padding:5,
							zIndex:100
					}}>
					<Text
					style={{
						fontSize: 14,
							fontWeight: '100',
							color: 'white',
					}}>
					{item.productprice} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
					</Text>

					</View>


					<View
					style={{
						flex: 0.5,
							flexDirection: 'column',
							padding: 10,
							justifyContent: 'center',
							// textAlign: 'left',
					}}>
					<Text
					numberOfLines={2}
					style={{
						// fontSize: 16,
						fontWeight: 'bold',
							textAlign: 'left',
					}}>
					{item.productname} {item.productmodel}{' '}
					{item.Model}
					</Text>
					<Text style={{ fontSize: 12, fontWeight: '100' }}>
					{item.productbrand}
					</Text>

					<View
					style={{
						backgroundColor: 'white',
							width: 115,
							height: 15,
							borderRadius: 5,
							alignItems: 'center',
							justifyContent: 'center',
					}}
					/>
					</View>
					</View>
					</TouchableOpacity>
				)}
				/>
				</View>

			)}



		{this.state.campaignproducts && !this.state.grid &&
				!this.state.showuserpanel && (
					<FlatList
					onViewableItemsChanged={()=>alert('asd')}
					style={{backgroundColor: 'white',
					}}
onViewableItemsChanged={this.handleViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
					data={this.state.campaignproducts}
					renderItem={({ item }) => (<View>
						{!this.state.ll&&<PlaceholderExamplemain/>}
						<TouchableHighlight style={{height:this.state.ll?null:0}}
						onPress={() =>
							this.props.navigation.navigate('ProductDetail', {
								name: item.productid,
								token: this.state.token,
							})
						}>
						<View
						style={{height:this.state.ll?null:0,
							flexDirection: 'row',
								alignItems: 'center',
								backgroundColor: 'white',


						}}>
						<Image
						style={{height:this.state.ll?100:1,bottom:this.state.ll?null:-1111,
								position:this.state.ll?null:'absolute',
							flex: 0.4,
								width: Dimensions.get('window').width,
						}}
						onLoadEnd={()=>{ll++;if(ll==this.state.campaignproducts.length){//alert(ll);
							this.setState({ll:true,lls:ll})}}}
						resizeMode={'contain'}
						source={{ uri: 'https:' + item.productimage }}
						/>
						<View
						style={{height:this.state.ll?null:0,
							flex: 0.6,
								flexDirection: 'column',
								padding: 10,
								justifyContent: 'center',
								// textAlign: 'left',
						}}>
						<Text
						style={{height:this.state.ll?null:0,
							// fontSize: 16,
							fontFamily: Platform.OS == 'android' ? 'Roboto' : null,

								fontWeight: '100',
								textAlign: 'left',
						}}>
						{item.productname} {item.productmodel}{' '}

						</Text>
						<Text style={{ fontSize: 12, fontWeight: '100',height:this.state.ll?null:0,
								fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,
						}}>
						{item.productbrand}
						</Text>
						<View
						style={{height:this.state.ll?null:0,
							flexDirection: 'row',
								alignItems: 'center',
						}}>
						<Text
						style={{height:this.state.ll?null:0,
							// fontSize: 16,
							//  fontWeight: '100',
							//   color: ColorCode,
							fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,
								fontWeight: '800',
								fontSize: 20,

						}}>
						{item.productprice} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
						</Text>

						<Text
						style={{height:this.state.ll?null:0,
							//fontSize: 20,
							fontWeight: '800',
								color: ColorCode,
						}}
						/>
						</View>

						<View
						style={{height:this.state.ll?null:15,
							backgroundColor: 'white',
								width: 115,
								borderRadius: 5,
								alignItems: 'center',
								justifyContent: 'center',
						}}
						/>
						</View>
						</View>


						</TouchableHighlight>
						</View>
					)}
					/>
				)}
{this.state.campaignnames &&
		<View style={{ backgroundColor: 'transparent', height: 50 }}>
		<Text
		style={{
			fontSize: 10,
				fontWeight: '100',
				alignItems: 'center',
				textAlign: 'center',
				fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,
		}}>
		© 2018 Interlink All Rights Reserved.{'\n'}Powered by
		Interlink
		</Text>
		</View>
}
		</View>
		</View>






		</Animated.ScrollView>
		{true && (
			<FloatingAction
			style={{ zIndex: 20 }}
			position="right"
			actions={actions}
			ref={ref => {
				this.floatingAction = ref;
			}}
			onPressMain={() =>
				this.props.navigation.navigate('MyCart', {
					token: this.state.token,
				})
			}
			showBackground={false}
			floatingIcon={
				<View
				style={{
					backgroundColor: 'transparent',
						width: 50,
						height: 50,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
				}}>

				<Icon
				name="shopping-cart"
				size={30}
				style={{ marginRight: 1, marginBottom: 1 }}
				color="white"
				/>
				{this.state.productcount>0&&
				<View
				style={{
					backgroundColor: 'white',
						borderRadius: 9,
						width: 18,
						height: 18,
						alignItems: 'center',
						justifyContent: 'center',
						padding: 1,
						position: 'absolute',
						right: 1,
						bottom: 3,
						borderColor: ColorCode,
						borderWidth: 1,
				}}>
				<Text
				style={{
					color: 'black',
						padding: 1,
						fontSize: this.state.productcount > 9 ? 8 : 10,
				}}>
				{this.state.productcount}
				</Text>
				</View>}
				</View>
			}
			color={this.state.productcount>0? ColorCode:'gray'}
			onPressInItem={name => {
				console.log(`selected button: ${name}`);
			}}
			/>
		)}
		<DropdownAlert ref={ref => this.dropdown = ref} zIndex={999} style={{zIndex:999}} />

		</Drawer>
	);
}
}

class MAINSTORE extends React.Component {
	constructor(props) {
		super(props);
		this.state = { product: '' };
	}
	static navigationOptions = {
		title: 'STORE',
		header: null,
		//headerStyle: { paddingTop: 0,backgroundColor:'yellow' }
	};

	render() {
		const { navigate } = this.props.navigation;
		return <View />;
	}
}
class MYCART extends React.Component {
	constructor(props) {
		super(props);
	}
	static navigationOptions = {
		title: 'CART',
		header: null,
		//headerStyle: { paddingTop: 0,backgroundColor:'yellow' }
	};

	render() {
		const { navigate } = this.props.navigation;
		return <View />;
	}
}

class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}
	static navigationOptions = {
		title: '',
		header: null,
	};
	componentDidMount() {}

	render() {}
}

var kupons = [];

//taksit seçiniz
var kupon = [];
var kupontoplam = 0;
class CheckoutScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			secilenadres:null,
			devamet: true,
			kupon: false,
			amountx: false,
			secilenadres:false,
			form:[],
			currentPosition: 0,
			paymentactivated: false,
			agreementapproved: 2,
			odemeyionayla: 'Sipariş Özeti',asdf:false,cek:false,hediyeceki:false,odemekatman:0,bankid:null,installmentid:null


		};
		var kupons
this.confirmorder = this.confirmorder.bind(this);
this.confirmpaymentid = this.confirmpaymentid.bind(this);

		this._bindFunctions();

	}
	static navigationOptions = {
		title: '',
		header: null,
	};

	componentDidMount() {
		this.setState({
			loading: true,
		});
		this.bringcards();
		this.bringsummary();
		this.getaddresslist()
		this.showcart();

		}

	bondrecalc(kupons) {
		var badi;
		if (kupons == null) {
			badi =
				'SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&PaymentMethodId=&Codes=';
		} else {
			badi =
				'SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&PaymentMethodId=&Codes=' +
				kupons;
		}
		this.state = { loading: true };
		fetch(
			API_URL+'/checkout/paymentInformation-paymentmethod',
			{
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				body: badi,
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
				// this.setState({ loading: false, cards: response.PaymentTypes });
				//alert(JSON.stringify(response));
				this.setState({
					odemebilgileri: response,
					kupon: response.BondList,
					orderpaymenttypeid: response.OrderPaymentTypeId,
					kupontoplam: response.BondTotal,
				});
				// alert(JSON.stringify(this.state.kupon));

				// kupon = [];
				kupons = [];
				//if(response.ResultCode!=='OK')return
				for (var i = 0; i < response.BondList.length; i++) {
					var ind = kupon.indexOf({
						code: response.BondList[i].Code,
						price: response.BondList[i].Price,
					});
					var dsf = kupons.indexOf(response.BondList[i].Code);
					//	  alert(ind)
					if (dsf > -1) {
						return;
					} else {
						kupons.push(response.BondList[i].Code);
						var strArray = kupons.join(',');
						// alert(JSON.stringify(strArray))

						kupon.push({
							code: response.BondList[i].Code,
							price: response.BondList[i].Price,
						});
						//  kupontoplam+=response.BondList[i].Price;
					}
				}
				//  alert(this.state.kupon)

				//  alert(JSON.stringify(this.state.kupon));
				//this.showcart()
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
			});

		this.setState({ loading: false });
	}
	bondcontrol(id) {
		var badi;
		badi = 'Code=' + id;
		this.setState({
			loading:true})

		// this.setState({ kupon: id });
		fetch(API_URL+'/checkout/bond-control', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'Code=' + id,
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
				//alert(JSON.stringify(response));
				if (response.ResultCode == 'Error') {
					//alert(response.ResultMessage);
					return;
				}
				if (kupons.indexOf(id) == -1) {
					kupons.push(id);
				} else {
					return;
				}

				fetch(
					API_URL+'/checkout/paymentInformation-paymentmethod',
					{
						method: 'POST', timeout: 20000,
						headers: {
							Authorization:
							'Bearer ' + this.props.navigation.state.params.token,
							Accept: 'application/x-www-form-urlencoded',
							'Content-Type': 'application/x-www-form-urlencoded',
						},

						body:
						'SelectedPaymentMethod=' +
						ProjectOrderPaymentMethod +
						'&PaymentMethodId=&Codes=' +
						kupons,
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
						// this.setState({ loading: false, cards: response.PaymentTypes });
						//alert(JSON.stringify(response));
						this.setState({
							loading:false,
							odemebilgileri: response,
							kupon: response.BondList,
							orderpaymenttypeid: response.OrderPaymentTypeId,
							kupontoplam: response.BondTotal,
						});
						// alert(JSON.stringify(this.state.kupon));

						// kupon = [];
						//if(response.ResultCode!=='OK')return
						for (var i = 0; i < response.BondList.length; i++) {
							var ind = kupon.indexOf({
								code: response.BondList[i].Code,
								price: response.BondList[i].Price,
							});
							var dsf = kupons.indexOf(response.BondList[i].Code);
							//	  alert(ind)
							if (dsf > -1) {
								return;
							} else {
								kupons.push(response.BondList[i].Code);
								var strArray = kupons.join(',');
								// alert(JSON.stringify(strArray))

								kupon.push({
									code: response.BondList[i].Code,
									price: response.BondList[i].Price,
								});
								//  kupontoplam+=response.BondList[i].Price;
							}
						}
						//  alert(this.state.kupon)

						//  alert(JSON.stringify(this.state.kupon));
						//this.showcart()
					})
					.catch(error => {
						this.props.navigation.navigate('Home');
						//alert(error);
					});

				this.setState({ loading: false });
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
				this.setState({ loading: false });
			});
	}

	bringcards() {
		this.state = { loading: true };
		fetch(API_URL+'/checkout/paymentInformation', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'SelectedPaymentMethod=' + ProjectOrderPaymentMethod,
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
				var cardsselect=[]
//alert(JSON.stringify(response))
				for(var i=0; i<response.PaymentTypes.length; i++){
					cardsselect.push({label:response.PaymentTypes[i].Name,value:response.PaymentTypes[i].Id,logo:response.PaymentTypes[i].Logo})

				}
				this.setState({ loading: false, cards: response.PaymentTypes,cardsselect:cardsselect });

				// alert(JSON.stringify(response.PaymentTypes));
				//this.showcart()
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	bringsummary() {
		this.state = { loading: true, bringoff: false };
		fetch(
			API_URL+'/checkout/paymentInformation-paymentmethod',
			{
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				body:
				'SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&PaymentMethodId=&Codes=' +
				kupons,
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
				// this.setState({ loading: false, cards: response.PaymentTypes });
				//
				//  alert(JSON.stringify(response));
				// alert(JSON.stringify(response))
				this.setState({
					odemebilgileri: response,
					kupon: response.BondList,
					paymenttypeid: response.PaymentMethodId,
					orderpaymenttypeid: response.OrderPaymentTypeId,
					bringoff: true,
				});
				var kupon = [];
				for (var i = 0; i < response.BondList.length; i++) {
					kupon.push(response.BondList[i].Code);
				}
				this.setState({ kupon: kupon });
				//  alert(kupon)
				//this.showcart()
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	kuponsil(k) {
		var yeni = [];
		for (var i = 0; i < this.state.kupon.length; i++) {
			yeni.push(this.state.kupon[i].Code);
		}
		var strArray = yeni.join(',');
		// alert(strArray)
		if (this.state.kupon.length == 1) {
			// alert(1)
			kupons = [];
			this.setState({ kupon: false, kupontoplam: 0 });
			this.bondrecalc(null);
		} else {
			yeni.splice(yeni.indexOf(k), 1);
			kupons = yeni;
			// alert(yeni)

			strArray = yeni.join(',');

			//alert(2)
			this.bondrecalc(strArray);
		}
	}
	completeorder(bank) {
		this.setState({ loading: true });
		if (bank) {
			var bodyparse =
				'OrderId=' +
				this.state.completeorderid +
				'&Codes=' +
				kupons +
				'&BankPosId=' +
				'&SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&BankId=' +
				this.state.bankid;
		} else {
			var bodyparse =
				'OrderId=' +
				this.state.completeorderid +
				'&Codes=' +
				kupons +
				'&BankPosId=&SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod;
				}

		fetch(API_URL+'/checkout/complete-order', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: bodyparse,
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
				//alert(JSON.stringify(response));
				//this.showcart()
				this.props.navigation.navigate('ConfirmPayment', {
					message: response.ResultMessage,
				});
				//	this.completeorderaftergateway(response.ResultMessage)
				//this.gatewayapi(response.ResultMessage);
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	runwirepayment() {
		//redirect to ORDERSUMMARYSCREEN
		this.props.navigation.navigate('OrderSummary', {
			token: this.props.navigation.state.params.token,
			bankid: this.state.bankid,
			havaledetails: this.state.havaledetails,
				kupon: kupons,
			kupontoplam: this.state.kupontoplam,
			secilenadres: this.state.secilenadres,
		});
	}

	getaddresslist() {
		this.setState({loading:true})
		fetch(API_URL+'/customeraddress/list', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: '',
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
				this.setState({
					loading: false,
					addresslistdata: response,
					addressgetdatadone: true,
					//	adresler: response,
				});
				//	alert(JSON.stringify(response))
				//
				var alladdress = [];
				var adresler = [];
				for (var r = 0; r < response.length; r++) {
					//	 this.getaddressdetails(response[r].ShippingAddressId, alladdress);
					//	return
					adresler.push({
						//	label: response[r].ShippingName + '('+response[r].ShippingCreatedDate+')',
						//	value: response[r].ShippingAddressId,
						ShippingAddressId:response[r].ShippingAddressId,
						ShippingName:response[r].ShippingName,
						ShippingAddress:response[r].ShippingAddress,
						ShippingEmail:response[r].ShippingEmail,
						ShippingGsm:response[r].ShippingGsm,
						ShippingCityName:response[r].ShippingCityName,
						ShippingTownName:response[r].ShippingTownName,
						ShippingFirstName:response[r].ShippingFirstName,
						ShippingLastName:response[r].ShippingLastName,






					});
					// this.getaddressdetails(response[r].Id, alladdress)
				}
				// this.setState({ adresler: response });
				if(adresler.length==0){this.setState({adresyok:true,secilenadres:null});return}
				this.setState({ adresler: adresler,secilenadresd:adresler[0].ShippingAddressId,secilenadres:adresler[0].ShippingAddressId,secilenadresdata:adresler[0],adresyok:false });
				//alert(alladdress)
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
			});
	}


	bringinstallments(id, name) {
		///api/checkout/paymentInformation-installment
		//  alert(id+'-'+name)
		//
		var self = this;
		var srt = self.state.kupon;

		this.state = { loading: true, paymentmethodid: id };

		if (name == 'Havale' || id=='b700504a-7f87-4f97-a4aa-18182afb3381') {
			fetch(API_URL+'/checkout/bank-list', {
				method: 'GET', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					Accept: 'application/x-www-form-urlencoded',
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
					//  alert(JSON.stringify(response))
					this.setState({
						loading: false,
						installments: false,
						selectedpaymenttype: 3,
						paymentmethodid: id,
						havaledetails: response,
						//  bankid: response[0].Id,
						// installmentid: response.id,
						devamet: true,
						havale: true,
					});
					//  alert(response[0].Id)
					//	alert(JSON.stringify(response))
					//this.showcart()
				})
				.catch(error => {
				//	this.props.navigation.navigate('Home');
					//alert(error);
				});

			return;
		}
		this.setState({ havale: false });
		fetch(
			API_URL+'/checkout/paymentInformation-installment',
			{
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				body:
				'SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&PaymentMethodId=' +
				id +
				'&Codes=' +
				kupons,
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
				this.setState({
					loading: false,
					installments: response,
					selectedpaymenttype: 3,
					paymentmethodid: id,
					bankid: null,
				});
				//	alert(JSON.stringify(response))
				//this.showcart()
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	_onChange = formdata => {this.setState({ form: formdata })};

	installmentclick(id, amount, iamount) {
		this.setState({
			installmentid: id,
			devamet: false,
			amountx: amount,
			activeinstallment: id,
			vadefarki: iamount,
		});
	}
	_renderDotIndicator() {
		return <PagerDotIndicator pageCount={3} />;
	}


	completeorder() {
		this.setState({ loading: true });

		if (this.state.bankid) {
			var bodyparse =
				'&BankId=' +
				this.state.bankid +
				'OrderId=' +
				this.state.orderid +
				//'PaymentMethodId=' +this.state.orderpaymenttypeid+
				'&Codes=' +
				kupons +
				// '&InstallmentId='+this.props.navigation.state.params.installmentid +

				'&SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod;
			// '&OrderId=00000000-0000-0000-0000-000000000000'+
			//'&BankPosId=00000000-0000-0000-0000-000000000000',
			//  '&BankId=00000000-0000-0000-0000-000000000000'

			bodyparse=	'OrderId=' +
				this.state.orderid +
				'&Codes=' +
				kupons +
				'&BankPosId=' +
				'&SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				// '&OrderId=00000000-0000-0000-0000-000000000000'+
				//'&InstallmentId=00000000-0000-0000-0000-000000000000' +
				'&BankId=' +
				this.state.bankid;


			//	alert(bodyparse)
		} else {
			var bodyparse =
				'OrderId=' +
				this.state.orderid +
				//'PaymentMethodId=' +this.state.orderpaymenttypeid+
				'&Codes=' +
				kupons+
				// '&InstallmentId='+this.props.navigation.state.params.installmentid +

				'&SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod;

		}
		//alert(bodyparse)
		fetch(API_URL+'/checkout/complete-order', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: bodyparse,
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
				this.setState({ loading: false ,currentPosition:3,havalesonuc:response});
				return
						})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	confirmorder() {
		var insid = this.state.installmentid
		if (!this.state.cvc  || typeof this.state.cvc == undefined ) {

			var bodyparse =
				'PaymentMethodId=' +
				this.state.paymentmethodid +
				'&InstallmentId=' +
				insid +
				'&BankId=00000000-0000-0000-0000-000000000000' +
				//	+this.props.navigation.state.params.bankid+
				'&SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&CardHolderName=' +
				'&CardNumber=' +
				'&Month=' +
				'&Year=' +
				'&SecureCode=' +
				'&CardType=' +
				'&Codes=' +
				kupons;


		}
		else{


			var bodyparse =
				'PaymentMethodId=' +
				this.state.paymentmethodid +
				'&InstallmentId=' +
				insid +
				'&BankId=00000000-0000-0000-0000-000000000000' +
				//	+this.props.navigation.state.params.bankid+
				'&SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&CardHolderName=' +
				// this.state.form.values.name +
				'&CardNumber=' +
				this.state.kartno.replace(/\s/g, '') +
				'&Month=' +
				this.state.skt.split('/')[0] +
				'&Year=' +
				this.state.skt.split('/')[1] +
				'&SecureCode=' +
				this.state.cvc +
				'&CardType=MASTERCARD' +

				'&Codes=' +
				kupons;



		}
		//	alert(bodyparse)

		this.setState({ loading: true });

		fetch(API_URL+'/checkout/confirm-order', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: bodyparse,
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

					this.setState({orderid:response.ResultMessage,
				//	currentPosition:2//orderid:response.ResultMessage

					},function(){
					this.showcart();
					this.confirmpaymentid(response.ResultMessage, false,insid);

				})

//return

				if (
					this.state.agreementapproved == 1 ||true ||
					this.state.agreementapproved == 2
				) {
					//  alert(this.state.orderid);
					fetch(API_URL+'/content/get', {
						method: 'POST', timeout: 20000,
						headers: {
							Authorization:
							'Bearer ' + this.props.navigation.state.params.token,
							Accept: 'application/x-www-form-urlencoded',
							'Content-Type': 'application/x-www-form-urlencoded',
						},

						body: 'OrderId=' + response.ResultMessage + '&key=Satış Sözleşmesi',
					})
						.then(response => {
							const statusCode = response.status;
							if (statusCode != 200) {
								this.dropdown.alertWithType('error', 'Hata','oturum süresi dolmuştur');

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
							this.setState({agreementapproved: 1,
								htmlcontent: response.ResultMessage,

								loading: false,
							//	currentPosition:2//orderid:response.ResultMessage
							},function(){

						//this.showcart();

							});
						//	//	this.setState({currentPosition:2,installmentid:this.state.installmentid})
					//	this.showcart();

						})
						.catch(error => {
						//	this.props.navigation.navigate('Splash');
							//alert(error);
						});

					return;
				}




				//	alert(JSON.stringify(response))
				this.setState({
					loading: false,
					orderid: response.ResultMessage,
				},function(){

					//alert(this.state.orderid)
				});
			})
			.catch(error => {
			//	this.props.navigation.navigate('Splash');
				//alert(error);
			});
	}

	gatewayapi(orderid) {
		this.setState({ loading: true });
		this.setState({ orderid: orderid });
		fetch(API_URL+'/checkout/gateway', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body:
			'OrderId=' +
			orderid +
			'&InstallmentId=' +
			this.state.installmentid +
			'&CardNumber=' +
			this.state.kartno.replace(/\s/g, '') +
			'&Month=' +
			this.state.skt.split('/')[0] +
			'&Year=20' +
			this.state.skt.split('/')[1] +
			'&SecureCode=' +
			this.state.cvc +
			'&CardType=MASTERCARD', //+this.state.form.values.type.toUpperCase(),
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
				//	alert(orderid+JSON.stringify(response));
				//this.setState({paymenturi:response.ResultMessage,paymentactivated:true})
				this.setState({
					paymenturi: response.ResultMessage,
					paymentactivated: true,
				});

				//this.showcart()
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	completeorderaftergateway(orderid, x) {
		var bonds = ['TEST31', 'TEST32'];
		this.setState({ loading: true });
		//	alert(JSON.stringify(this.state.form))

		fetch(API_URL+'/checkout/complete-order', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body:
			'OrderId=' +
			orderid +
			'&InstallmentId=' +
			this.state.installmentid +
			'&SelectedPaymentMethod=' +
			ProjectOrderPaymentMethod +
			'&IsPaymentSuccess=' +
			x +
			'&Codes=' +
			kupons,
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
				this.setState({
					loading: false,
					passmessagetoconfirmation: response.ResultMessage,
					currentPosition:3

				});

			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	confirmpaymentid(id, boole,insid) {
		//self =this
		var bonds = this.state.kupon;
		//alert(this.props.navigation.state.params.installmentid)
		this.state = { loading: true };
	//	alert(insid)
		fetch(
			API_URL+'/checkout/paymentInformation-paymentmethod',
			{
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				body:
			//	'InstallmentId=' +
			//	this.state.installmentid +
				'SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&PaymentMethodId=' +
				insid+
				'&Codes=' +
				kupons,
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
				this.setState({ loading: false, jun6patch: response,currentPosition:2 },function(){//alert('tamam')
				});

			})
			.catch(error => {
			//	this.props.navigation.navigate('Splash');
				//alert(error);
			});
	}
/*
	bondcontrol(id) {
		fetch(API_URL+'/checkout/bond-control', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'Code=' + id,
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
				this.dropdown.alertWithType('info', 'Bilgi',JSON.stringify(response.ResultMessage));
if(response.ResultCode == 'OK' ){

this.setState({kupon:this.state.hediyeceki})

}

				this.setState({ loading: false ,});
			})
			.catch(error => {
			//	this.props.navigation.navigate('Splash');
				//alert(error);
			//	this.setState({ loading: false });
			});
	}
	*/
	bondcontrol(id) {
		var badi;
		badi = 'Code=' + id;
		this.setState({
			loading:true})

		// this.setState({ kupon: id });
		fetch(API_URL+'/checkout/bond-control', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'Code=' + id,
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
				//alert(JSON.stringify(response));
				if (response.ResultCode == 'Error') {
					this.setState({loading:false})
					Alert.alert(response.ResultMessage);
					return;
				}
				if (kupons.indexOf(id) == -1) {
					kupons=id+','
					//kupons.push(id);
					//kupons=
				} else {
					kupons=kupons+id+','

					//return;
				}
				this.setState({loading:false})
					Alert.alert(response.ResultMessage);
//alert(kupons)
				fetch(
					API_URL+'/checkout/paymentInformation-paymentmethod',
					{
						method: 'POST', timeout: 20000,
						headers: {
							Authorization:
							'Bearer ' + this.props.navigation.state.params.token,
							Accept: 'application/x-www-form-urlencoded',
							'Content-Type': 'application/x-www-form-urlencoded',
						},

						body:
						'SelectedPaymentMethod=' +
						ProjectOrderPaymentMethod +
						'&PaymentMethodId=&Codes=' +
						kupons,
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
						//alert(kupons)
						// this.setState({ loading: false, cards: response.PaymentTypes });
						//alert(JSON.stringify(response));
						this.setState({
							loading:false,
							odemebilgileri: response,
							kupon: kupons,
							orderpaymenttypeid: response.OrderPaymentTypeId,
							kupontoplam: response.BondTotal,
						});
						// alert(JSON.stringify(this.state.kupon));

						// kupon = [];
						//if(response.ResultCode!=='OK')return
						/*
						for (var i = 0; i < response.BondList.length; i++) {
							var ind = kupon.indexOf({
								code: response.BondList[i].Code,
								price: response.BondList[i].Price,
							});
							var dsf = kupons.indexOf(response.BondList[i].Code);
							//	  alert(ind)
							if (dsf > -1) {
								return;
							} else {
								kupons.push(response.BondList[i].Code);
								var strArray = kupons.join(',');
								// alert(JSON.stringify(strArray))

								kupon.push({
									code: response.BondList[i].Code,
									price: response.BondList[i].Price,
								});
								//  kupontoplam+=response.BondList[i].Price;
							}
						}
						*/
						//  alert(this.state.kupon)

						//  alert(JSON.stringify(this.state.kupon));
						//this.showcart()
					})
					.catch(error => {
						this.props.navigation.navigate('Home');
						//alert(error);
					});

				this.setState({ loading: false });
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
				//alert(error);
				this.setState({ loading: false });
			});
	}
	handleMessage(message) {
		this.dropdown.alertWithType('info', 'Bilgi',message.nativeEvent.data);


	}
	_bindFunctions() {
		this._onHookMessage = this._onHookMessage.bind(this);
	}

	_onHookMessage(msg) {
		alert(`msg incoming [${msg.length}] -> ${msg}`);
	}

	_onMessage(data) {
		//	return

		if (data == 'OK') {
			this.setState({ paymentactivated: false });
			this.completeorderaftergateway(this.state.orderid, true);
		} else {
			// alert(data);
			this.setState({ paymentactivated: false });
			this.dropdown.alertWithType('error', 'Hata',data);

			//this.completeorderaftergateway(this.state.orderid, false);
		}
	}
	injectjs() {
		let jsCode = `
		setInterval(function() {
			//	alert(document.getElementById('result').html());
			this.dropdown.alertWithType('info', 'Bilgi',document.getElementById('result').html());

		}, 1500)`;

		return jsCode;
	}
	pulladdress(id) {
		fetch(API_URL+'/customeraddress/get/' + id, {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body: 'id=',
		})
			.then(response => {
				return response.json();
			})

			.then(response => {
				// alert(JSON.stringify( response))
				this.setState({ adres: response });
			});
	}
	showcart() {
		var self = this;
		self.setState({ loading: true, gotocart: true });
		//	this.setState({showorders:true})
		//alert(this.state.token)
		fetch(API_URL+'/shoppingcart/list/', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body:'id='+orderid,
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
				// alert(JSON.stringify(response));

				self.setState({ loading: false, cart: response, run: true });
				var itemss = self.state.cart.Items;
				//	var Warnings = this.state.cart.Warnings.replace('***', '\n');
				var Warnings = self.state.cart.Warnings;

				self.setState({ Warnings: Warnings, itemss: itemss });
				if (itemss.length < 1) {
					self.setState({ itemss: false });
				}
			})
			.catch(error => {
			//	self.props.navigation.navigate('Splash');
				////alert(error);
				self.setState({ loading: false });
			});
	}



	render() {
		const didBlurSubscription = this.props.navigation.addListener(
			'didFocus',
			payload => {
				//alert('didFocus');
				this.getaddresslist()
			}
		);

		//let isFocused = this.props.navigation.isFocused()

		const jsCode0 =
			"window.postMessage(document.getElementById('result').innerHTML,'*')";
		const jsCode =
			"setInterval(function() {window.postMessage(document.getElementById('result').innerHTML);}, 500)";


		const labelss = ["Adres Bilgileri","Ödeme Bilgileri","Sepet Özeti","Sipariş Tamamlandı"];
		const customStyless = {
			backgroundColor:'white',
			stepIndicatorSize: 25,
			currentStepIndicatorSize:30,
			separatorStrokeWidth: 1,
			currentStepStrokeWidth: 1,
			stepStrokeCurrentColor: '#fe7013',
			stepStrokeWidth: 1,
			stepStrokeFinishedColor: '#fe7013',
			stepStrokeUnFinishedColor: '#aaaaaa',
			separatorFinishedColor: '#fe7013',
			separatorUnFinishedColor: '#aaaaaa',
			stepIndicatorFinishedColor: '#fe7013',
			stepIndicatorUnFinishedColor: '#ffffff',
			stepIndicatorCurrentColor: '#ffffff',
			stepIndicatorLabelFontSize: 13,
			currentStepIndicatorLabelFontSize: 13,
			stepIndicatorLabelCurrentColor: '#fe7013',
			stepIndicatorLabelFinishedColor: '#ffffff',
			stepIndicatorLabelUnFinishedColor: '#aaaaaa',
			labelColor: '#999999',
			labelSize: 10,
			currentStepLabelColor: '#fe7013'
		}

		// prepare your drawer content
		var drawerContent = (
			<View style={{ backgroundColor: '#222222', flex: 1 }}>
			<View style={{}} />
			<View style={{}}>
			<View>
			<TouchableOpacity
			style={{ marginTop: 60, paddingLeft: 15, position: 'absolute' }}
			onPressIn={() => this.resetfunc()}>
			<Text
			style={{ color: ColorCode, fontSize: 20, fontWeight: '400' }}>
			Tüm Kategoriler
			</Text>
			</TouchableOpacity>
			</View>
			<View style={{ marginTop: 100 }}>
			<FlatList
			style={{ marginBottom: 20 }}
			data={this.state.dddc}
			renderItem={({ item }) => (
				<TouchableOpacity
				style={{ margin: 1, padding: 3 }}
				underlayColor={ColorCode}
				onPressIn={() => this.setcat(item.Id)}>
				<View
				style={{
					flexDirection: 'row',
						justifyContent: 'space-between',
				}}>
				<Text
				style={{
					color: '#fdfdfd',
						fontSize: 20,
						fontWeight: '400',
						paddingLeft: 15,
				}}>
				{item.Name}
				</Text>
				<EIcon
				name="angle-right"
				size={20}
				color="gray"
				style={{ marginRight: 15 }}
				/>
				</View>
				</TouchableOpacity>
			)}
			/>
			</View>
			</View>
			</View>
		);
		// customize drawer's style (Optional)
		var customStyles = {
			drawer: {
				shadowColor: '#000',
				shadowOpacity: 0.4,
				shadowRadius: 10,
			},
			mask: {}, // style of mask if it is enabled
			main: {}, // style of main board<D-0><D==
		};

		return (
			<View style={{ flex: 1,backgroundColor:null }}>




			{true&&
				<HHeader title={this} baslik="Yeni Sipariş" />
			}

	{true&&
				<StatusBar
			backgroundColor={'white'}
			translucent={false}
			barStyle="dark-content"
				/>
		}
			{this.state.paymentactivated && (
				<View
				style={{
					alignItems: 'center',
						justifyContent: 'center',
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').height,
						padding: 100,
						margin:10,borderColor:'gray',borderWidth:.5,
						zIndex:1000,elevation:40,backgroundColor:'white'
				}}>
				<TouchableOpacity
				onPressIn={() => this.setState({ paymentactivated: false })}
				style={{
					zIndex: 299,
						position: 'absolute',
						top: 10,
						right: 10,
				}}>
				<Icon name="times-circle" size={30} color="red" />
				</TouchableOpacity>
				<WebView
				scalesPageToFit={true}
				style={{
					width: Dimensions.get('window').width,
						height: Dimensions.get('window').height,
				}}
				javaScriptEnabled={true}
				injectedJavaScript={jsCode}
				source={{ uri: this.state.paymenturi }} //this.state.paymenturi
				onMessage={event => this._onMessage(event.nativeEvent.data)}
				/>
				</View>
			)}


			{this.state.showagreement && (
				<View
				style={{
					height: Dimensions.get('window').height,
						width: Dimensions.get('window').width,

						marginTop: 0,
						alignItems: 'center',
						zIndex:1000,elevation:40,backgroundColor:'white'

				}}>
				<TouchableOpacity
				style={{ backgroundColor: 'red',borderRadius:10 ,margin:3}}
				onPressIn={() => this.setState({ showagreement: false })}>
				<Text style={{color:'white',fontWeight:'800',margin:5}}>KAPAT</Text>
				</TouchableOpacity>

				<WebView
				scalesPageToFit={false}
				style={{
					width: Dimensions.get('window').width,
						height: Dimensions.get('window').height-100,
						//borderWidth: 1,
						//position:'absolute',zIndex:100
				}}
				source={{baseUrl: '',
					html:
					'<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"></head><body>' +
						this.state.htmlcontent +
						'</body></html>',
				}}
				/>
				</View>
			)}

			<View style={{height:15}}/>
			{this.state.currentPosition !== 3 &&

			<StepIndicator
				onPress={(position)=>{
				if(position<this.state.currentPosition){
				this.setState({currentPosition:position})
				}else{
				return
				}


				}}
			customStyles={customStyless}
			currentPosition={this.state.currentPosition}
			labels={labelss}
			direction={"horizontal"}
			stepCount={4}
			/>
			}
			<ScrollView
			//ref="sc0"
			ref={(ref) => this.sc0 = ref}
			style={{
				width: Dimensions.get('window').width,
					height: Dimensions.get('window').height ,
					paddingLeft: 0,
					paddingRight: 0,
					paddingTop: 10,

					flexDirection: 'column',
			}}>











			{this.state.odemetipi &&
				this.state.odemebilgileri &&
				this.state.odemebilgileri.Cash > 0 ? (
					<ScrollView
					//ref="sc"
					ref={(ref) => this.sc = ref}
									style={{
						padding: 20,
							borderRadius: 5,
							paddingBottom: 20,
							margin: 0,
							position:'absolute',
							width: Dimensions.get('window').width,
							zIndex: 200,
					}}>



					<TouchableOpacity
					onPressIn={() => this.setState({ odemetipi: false })}
					style={{ zIndex: 200 }}>
					<Text style={{ color: ColorCode }}>Ödeme özetine dön</Text>
					</TouchableOpacity>

					<Text
					style={{
						color: 'gray',
							fontSize: 14,
							marginTop: 10,
							marginBottom: 10,
					}}>
					Taksit seçeneklerini görmek için ödeme yapacağınız kartınızı
					seçiniz
					</Text>
					<View
					style={{
						flexDirection: 'column',
							height: Dimensions.get('window').height * 3,
							// alignItems: 'center',
							//justifyContent: 'center',
					}}>
					{this.state.cards &&
						<View style={{height:45,height:this.state.sopen?this.state.cards.length*45:45}}>
						<FlatList style={{ padding: 0,height:this.state.sopen?this.state.cards.length*45:45,width:Dimensions.get('window').width/1.3,borderColor:'#ccc',borderWidth:.6,borderRadius:10 }}
						data={this.state.cards}
						renderItem={({ item }) => (
							<View style={{ padding: 1 ,height:45}}>
							<TouchableOpacity style={{height:45}}
							onPressIn={() => {
								this.setState({ secilenodeme: item.Id,sopen:!this.state.sopen,secilenresim:item.Logo,secilenkart:item.Name });
								this.bringinstallments(item.Id, item.Name);
							}}>
							<View
							style={{
								flexDirection: 'row',
									alignItems:'center',
									backgroundColor:
								this.state.secilenodeme == item.Id
									? '#c4dff6'
									: 'white',
									width: Dimensions.get('window').width,
									height: 45,
							}}>
							<Image defaultSource={require('./noimage.jpg')}
							source={{
								uri: item.Logo,
									headers: {
										Pragma: 'no-cache',
									},
							}}
							style={{
								width: 60,
									height: 40,
							}}
							/>
							<Text style={{fontWeight:'100'}}>{item.Name}</Text>
							</View>
							</TouchableOpacity>
							</View>
						)}
						/>
						</View>
					}
					{this.state.installments &&
							<View style={{height:45,height:this.state.sopeni?null:60}}>

							<FlatList
						style={{ padding: 0,height:this.state.sopeni?null:60,width:Dimensions.get('window').width/1.3,borderColor:'#ccc',borderWidth:.6,borderRadius:10 }}

						data={this.state.installments}
						renderItem={({ item }) => (
							<View
							style={{
								margin: 9,
									padding: 5,

									backgroundColor:
								this.state.activeinstallment === item.InstallmentId
									? '#c4dff6'
									: '#fdfdfd',
							}}>
							<TouchableOpacity
							onPressIn={() =>{//this.setState({sopeni:!this.state.sopeni})
								this.installmentclick(
									item.InstallmentId,
									item.InstallmentTotal,
									item.InstallmentAmount
								)
							}}>
							<Text style={{ fontWeight: '800' }}>
							Taksit sayısı: {item.Installment}{' '}
							</Text>
							<Text>
							Ödenecek Tutar: {item.InstallmentTotal} TL
							{'\n'}
							Vade Farkı:
							{item.InstallmentAmount} TL{' '}
							</Text>
							</TouchableOpacity>
							</View>
						)}
							/>
							</View>
					}
					{this.state.havale &&
							this.state.havaledetails && (
								<FlatList
								data={this.state.havaledetails}
								renderItem={({ item }) => (
									<View
									style={{
										margin: 3,
											padding: 5,

											borderColor:

										this.state.activeinstallment === item.Id
											? '#c4dff6'
											: '#ddd',
											backgroundColor:
										this.state.activeinstallment === item.Id
											? '#c4dff6'
											: 'white',
									}}>
										<TouchableOpacity
									onPressIn={() => {
										this.installmentclick(
											item.Id,
											item.InstallmentTotal,
											item.InstallmentAmount
										);
										this.setState({ bankid: item.Id });
									}}>

									<Image defaultSource={require('./noimage.jpg')}
									style={{
										width: 100,
											resizeMode: 'contain',
											backgroundColor: 'white',
									}}
									source={{ uri: item.Logo }}
									/>
																	<Text style={{ fontWeight: '800' }}>
									{item.Name}
									{'\n'}
									{item.BranchOffice}
									{'\n'}
									{item.IbanNumber}
									{'\n'}
									{item.AccountNumber}{' '}
									</Text>
									</TouchableOpacity>
									</View>
								)}
								/>
							)}
					</View>
					</ScrollView>
				) : (
					<View />
				)}
			{this.state.kuponkullan && (
				<View
				style={{
					margin: 0,
						width: Dimensions.get('window').width,
						backgroundColor: 'white',
						zIndex: 100,
						borderRadius: 5,
						padding: 20,
						position: 'absolute',
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').height,
				}}>
				<TouchableOpacity
				onPressIn={() => this.setState({ kuponkullan: false })}
				style={{ zIndex: 200 }}>
				<Text style={{ color: ColorCode }}>Ödeme özetine dön</Text>
				</TouchableOpacity>

				<Text
				style={{
					color: 'black',
						// fontSize: 18,
						marginBottom: 7,
						marginTop: 5,
				}}>
				Kupon kodunuz:
				</Text>

				<TextInput
				underlineColorAndroid="rgba(0,0,0,0)"
				style={{
					height: Platform.OS == 'ios' ? 30 : 40,

						backgroundColor: '#ccc',
						paddingLeft: 5,
						marginRight: 20,
						marginBottom: 5,
						// fontSize: 24,
				}}
				onChangeText={texta => this.setState({ texta })}
				autoCapitalize={false}
				value={this.state.texta}
				/>

				<TouchableOpacity
				onPressIn={() => {
					this.bondcontrol(this.state.texta);
					this.setState({ texta: '' });
				}}
				style={{
					backgroundColor: 'white',
						alignItems: 'center',
						justifyContent: 'center',
						borderWidth: 0.5,
						borderColor: ColorCode,
						borderRadius: 20,
						//height: 20,
						width: Dimensions.get('window').width / 3,
						padding: 5,
				}}>
				<Text style={{ color: ColorCode }}>Ekle</Text>
				</TouchableOpacity>

				{this.state.kupon && (
					<FlatList
					data={this.state.kupon}
					renderItem={({ item }) => (
						<TouchableOpacity
						onPressIn={() => this.kuponsil(item.Code)}
						style={{
							padding: 5,
								fontWeight: '700',
								flexDirection: 'row',
								width: Dimensions.get('window').width / 2,
						}}>
						<EIcon name="close-o" style={{}} size={25} color="red" />

						<Text
						style={{
							color: 'green',
								fontWeight: '100',
								fontSize: 18,
						}}>
						{' '}
						{item.Code} - {item.Price} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
						</Text>
						</TouchableOpacity>
					)}
					/>
				)}
				</View>
			)}
			{this.state.loading && (
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













			{this.state.odemebilgileri &&  (
				<View
				style={{alignItems:'center',
						flexDirection: 'column',
						margin: 0,
				}}>
				{this.state.currentPosition==0 &&


					<View style={{ borderColor:'#ccc',borderWidth:.8,backgroundColor:'white',alignItems:'center',justifyContent:'space-between',borderRadius:5,width:Dimensions.get('window').width-20,height:40,flexDirection:'row',margin:5,padding:5}}>
					<Text style={{fontWeight:'800',color:ColorCode,fontSize:20,textAlign:'left'}}>Teslimat Adresim</Text>
					<Text style={{fontWeight:'100',color:ColorCode,fontSize:14,textAlign:'right'}} onPress={()=>{
						this.props.navigation.navigate('EditAddress', {
							secilenadres: null,
							token: this.props.navigation.state.params.token,
						})



					}}>+ Yeni Adres</Text>


					</View>



				}


				{this.state.currentPosition==0 && this.state.adresler && !this.state.showmoreaddress &&


						<View style={{borderColor:'#ccc',borderWidth:.8,justifyContent:'flex-start',flexDirection:'row',alignItems:'center',backgroundColor:'white',width:Dimensions.get('window').width-20,borderRadius:5,margin:5,padding:5}}>
						<TouchableOpacity onPress={() => {
							if(this.state.secilenadresd!== this.state.adresler[0].ShippingAddressId ||this.state.secilenadres!== this.state.adresler[0].ShippingAddressId ){
								this.setState({ secilenadresd: this.state.adresler[0].ShippingAddressId,secilenadres:this.state.adresler[0].ShippingAddressId },function(){
								});
							}else{

								this.setState({ secilenadresd: null,secilenadres:null },function(){
								});

							}

						}} style={{width:20,height:20}}>
						{ (this.state.secilenadresd!== this.state.adresler[0].ShippingAddressId) ?
							<View style={{width:20,height:20,backgroundColor:'#ddd',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
							<View style={{width:16,height:16,backgroundColor:'white',borderRadius:8}}/>

							</View>:
							<View style={{width:20,height:20,backgroundColor: '#ddd',alignItems:'center',justifyContent:'center',borderRadius:10}}>
							<View style={{width:16,height:16,backgroundColor:ColorCode,borderRadius:8,borderColor:'white',borderWidth:3}}/>
							</View>}

						</TouchableOpacity>

						<View style={{justifyContent:'center',margin:5,padding:4,flexDirection:'column'}}>
						<Text style={{fontWeight:'800',marginBottom:5}}>{this.state.adresler[0].ShippingName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{this.state.adresler[0].ShippingAddress} {this.state.adresler[0].ShippingTownName} - {this.state.adresler[0].ShippingCityName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{this.state.adresler[0].ShippingFirstName} {this.state.adresler[0].ShippingLastName} - {this.state.adresler[0].ShippingGsm}</Text>
						<Text style={{fontWeight:'800',marginTop:5}} onPress={()=>{
							this.props.navigation.navigate('EditAddress', {
								secilenadres: this.state.secilenadres,
								token: this.props.navigation.state.params.token,
							})


						}}>Düzenle</Text>


						</View>


						</View>

				}




				{this.state.currentPosition==0 && this.state.adresler && this.state.showmoreaddress &&

						<FlatList style={{borderColor:'#ccc',borderWidth:.8,backgroundColor:'white',borderRadius:5,width:Dimensions.get('window').width-20,margin:5,padding:5,height:this.state.showmoreaddress?null:100}}
					data={this.state.adresler}
					renderItem={(item) => <TouchableOpacity onPress={() => {
							if(this.state.secilenadresd!== item.item.ShippingAddressId ||this.state.secilenadres!== item.item.ShippingAddressId ){
								this.setState({ secilenadresd: item.item.ShippingAddressId,secilenadres:item.item.ShippingAddressId,secilenadresdata:item.item },function(){
								});
							}else{

								this.setState({ secilenadresd: null,secilenadres:null },function(){
								});

							}

						}}
						style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
						<TouchableOpacity onPress={() => {
							if(this.state.secilenadresd!== item.item.ShippingAddressId ||this.state.secilenadres!== item.item.ShippingAddressId ){
								this.setState({ secilenadresd: item.item.ShippingAddressId,secilenadres:item.item.ShippingAddressId,secilenadresdata:item.item },function(){
								});
							}else{

								this.setState({ secilenadresd: null,secilenadres:null },function(){
								});

							}

						}} style={{width:20,height:20}}>
						{ (this.state.secilenadresd!== item.item.ShippingAddressId) ?
							<View style={{width:20,height:20,backgroundColor:'#ddd',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
							<View style={{width:16,height:16,backgroundColor:'white',borderRadius:8}}/>

							</View>:
							<View style={{width:20,height:20,backgroundColor: '#ddd',alignItems:'center',justifyContent:'center',borderRadius:10}}>
							<View style={{width:16,height:16,backgroundColor:ColorCode,borderRadius:8,borderColor:'white',borderWidth:3}}/>
							</View>}

						</TouchableOpacity>

						<View style={{justifyContent:'center',margin:5,padding:4,flexDirection:'column'}}>
						<Text style={{fontWeight:'800',marginBottom:5}}>{item.item.ShippingName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{item.item.ShippingAddress} {item.item.ShippingTownName} - {item.item.ShippingCityName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{item.item.ShippingFirstName} {item.item.ShippingLastName} - {item.item.ShippingGsm}</Text>
						<Text style={{fontWeight:'800',marginTop:5}} onPress={()=>{
							//alert(this.state.secilenadres);
							this.props.navigation.navigate('EditAddress', {
								secilenadres: item.item.ShippingAddressId,
								token: this.props.navigation.state.params.token,
							})


						}}>Düzenle</Text>


						</View>


						</TouchableOpacity>


					}

						/>




				}


				{this.state.currentPosition==0 &&
						<TouchableOpacity style={{margin:10}} onPress={()=>this.setState({showmoreaddress:!this.state.showmoreaddress})}><Text style={{color:ColorCode,textAlign:'left'}}>Daha fazla göster</Text></TouchableOpacity>

				}


				{this.state.currentPosition==0 &&


						<TouchableOpacity style={{ backgroundColor:ColorCode,alignItems:'center',justifyContent:'center',borderRadius:5,width:Dimensions.get('window').width-20,height:40,flexDirection:'row',margin:5,padding:5}} onPress={()=>{
					this.sc0.scrollTo(0);

							if(this.state.secilenadres==null){

								this.dropdown.alertWithType('error', 'Hata','Lütfen öncelikle adres bilgilerinizi seçiniz.');

								return
							}else{
								this.setState({currentPosition:1})
							}

						}}>
						<Text style={{fontWeight:'800',color:'white',fontSize:14,textAlign:'center'}}>Ödeme Seçenekleri</Text>


						</TouchableOpacity>



				}


				<View style={{ flexDirection: this.state.currentPosition==2?'column':(this.state.currentPosition==0?'row':'column'),
				}}>

				{this.state.currentPosition==1 &&
					<View  style={{}}>





					{ this.state.odemebilgileri && this.state.odemebilgileri.Cash == 0 &&

						<Text style={{fontWeight:'800',color:'#ccc',fontSize:12,textAlign:'center',marginTop:20}}>Puanla ödeme: Herhangibir ödeme yapmanız gerekmemektedir. </Text>

					}

					{ this.state.odemebilgileri && this.state.odemebilgileri.Cash > 0 &&

							<View style={{ flexDirection: 'column',justifyContent:'space-between',marginTop:5,marginBottom:5}}>
							<View >

							<View style={{
							}}>



							<View style={{ borderColor:'#ccc',borderWidth:.8,backgroundColor:'white',alignItems:'center',justifyContent:'space-between',borderRadius:5,width:Dimensions.get('window').width-20,height:40,flexDirection:'row',marginBottom:10,padding:5}}>
							<Text style={{fontWeight:'800',color:ColorCode,fontSize:20,textAlign:'left'}}>Ödeme Bilgileri</Text>
							<Text style={{fontWeight:'100',color:ColorCode,fontSize:14,textAlign:'right'}}></Text>


							</View>




							{true &&
								<View style={{borderColor:'#ccc',borderRadius:5,borderWidth:.8,backgroundColor:'white',width:Dimensions.get('window').width-20,padding:5}}>







								{this.state.cardsselect &&
									<View style={{padding:5}}>
									<RNPickerSelect

									disabled={ false}
									style={{

										...pickerSelectStyles,


									}}
									placeholderTextColor="black"
									placeholder={{
										label: this.state.odemekatman!==0?this.state.cardsselect[this.state.odemekatman-1]['label']:'Ödeme Tipini seçiniz',
											value: null,
									}}
									items={this.state.cardsselect}
									onValueChange={(value,index)=> {
										//	alert(index)
										this.setState({odemekatman:index,skt:null,cvc:null,kartno:null,
											//	devamet:true,
											odemetipivalue:value,//logo:this.state.cardsselect[this.state.odemekatman-1]['logo']
										});

										if(value==null){
											this.setState({
												//	devamet:true,
												odemetipivalue:value
											});
											return}
										else{
										}
										this.bringinstallments(value,null);

									}}
									onUpArrow={() => {}}
									onDownArrow={() => {}}
									value={this.state.odemetipivalue}
									/>
									</View>

								}
								{this.state.havale &&
										this.state.havaledetails && !this.state.bankselected && (
											<FlatList
											data={this.state.havaledetails}
											renderItem={({ item }) => (<TouchableOpacity
												 onPress={() => {this.setState({ bankselected:item,bankid: item.Id,bankname:item.Name,banksube:item.BranchOffice,bankiban:item.IbanNumber,bankhesap:item.AccountNumber },function(){this.installmentclick(item.Id,item.InstallmentTotal,item.InstallmentAmount);})}}>
												<View style={{flexDirection: 'column',
														//borderRadius:5,borderWidth:Platform.OS=='ios'?.5:0,
														//borderColor:'#ccc',
														justifyContent: 'flex-start',alignItems:'flex-start',padding:5,margin:5}}

												>
												<View style={{flexDirection:'row'}} >


												<Image defaultSource={require('./noimage.jpg')}
												style={{alignItems:'center',
														width: 100,height:50,
														resizeMode: 'contain',
												}}
												source={{ uri: item.Logo }}
												/>


												<Text style={{padding:5,width:160, fontWeight: '100',fontSize:12 ,color: 'black'}}>

												{item.BranchOffice}

												{'\n'}
												{'Hesap No :'+item.AccountNumber}{' '}

												</Text>


												</View>
												<Text style={{padding:5, fontWeight: '100',fontSize:12 ,color:'black'}}>

												{'IBAN :'+item.IbanNumber}{' '}
												</Text>
												</View>
												<Divider/>
												</TouchableOpacity>

											)}
											/>
										)}

								{this.state.bankselected && this.state.havale &&

								<View>
								<TouchableOpacity
											 >
												<View style={{flexDirection: 'column',backgroundColor:'#eee',borderRadius:5,borderWidth:Platform.OS=='ios'?.5:0,borderColor:'#eee',justifyContent: 'flex-start',alignItems:'flex-start',padding:5,margin:5}}

												>
												<View style={{flexDirection:'row'}} >


												<Image defaultSource={require('./noimage.jpg')}
												style={{alignItems:'center',
														width: 100,height:50,
														resizeMode: 'contain',
												}}
												source={{ uri: this.state.bankselected.Logo }}
												/>


												<Text style={{padding:5,width:160, fontWeight: '100',fontSize:12 ,color: 'black'}}>

												{this.state.bankselected.BranchOffice}

												{'\n'}
												{'Hesap No :'+this.state.bankselected.AccountNumber}{' '}

												</Text>


												</View>
												<Text style={{padding:5, fontWeight: '100',fontSize:12 ,color: 'black'}}>

												{'IBAN :'+this.state.bankselected.IbanNumber}{' '}
												</Text>
												</View>
												</TouchableOpacity>
										<Text style={{color:'blue'}} onPress={()=>this.setState({bankselected:false})}>Bankayı Değiştir</Text>

								</View>
								}

								{this.state.installments &&

										<View style={{ flexDirection: 'column' ,justifyContent:'space-between',width:Dimensions.get('window').width-20,

												marginBottom:this.state.installments ? 5:0 }}>



										{this.state.installments &&
											<View style={{}}>

											<FlatList
											numColumns={2}

											style={{ padding: 0 }}

											data={this.state.installments}
											renderItem={({ item }) => (
												<View
												style={{borderColor:'#ccc',borderWidth:Platform.OS=='ios'?0:0,borderRadius:5,margin:1,
														width:Dimensions.get('window').width/2 - 20,
														padding: 5,
														backgroundColor:
													this.state.activeinstallment === item.InstallmentId
														? '#c4dff6'
														: '#fdfdfd',
												}}>
												<TouchableOpacity
												onPress={() =>{
													this.installmentclick(
														item.InstallmentId,
														item.InstallmentTotal,
														item.InstallmentAmount
													)
													if(typeof this.state.cvc == undefined || typeof this.state.kartno == undefined || typeof this.state.skt == undefined)return
													this.setState({sopeni:!this.state.sopeni,
														//	currentPosition:2
													})
													//	this.refs.sc1.scrollTo(0);


												}}>
												<Text style={{ fontWeight: '800',fontSize:12 }}>
												{item.Installment =='Peşin'? item.Installment:  'Taksit sayısı:'+ item.Installment}
												</Text>
												<Text style={{fontSize:10}}>
												Ödenecek Tutar: {item.InstallmentTotal} TL
												{'\n'}
												Vade Farkı:
												{item.InstallmentAmount} TL{' '}
												</Text>
												</TouchableOpacity>
												</View>
											)}
											/>

											</View>
										}






									{this.state.installments&&
											<View>
											<TextInput keyboardType='number-pad' mode="outlined" label="Kart numarası" style={{borderRadius:5,marginTop:3,fontWeight:'800',width:Dimensions.get('window').width-70}}
										ref='kartno'
										onChangeText={(kartno) => {

												this.setState({kartno})
											return


											if(kartno.length==16){
											this.setState({kartno:kartno.substring(0,4)+" "+kartno.substring(4,8) +" "+ kartno.substring(8,12)+" "+kartno.substring(12,16)})


											}else{
												this.setState({kartno})
											}

										//	return
											if(kartno.length == 19){
												Keyboard.dismiss
												this.refs['kartno'].blur()
												this.refs['skt'].focus()

											}

											if(kartno.length>19){
												this.setState({karterror:true})

											}
											else{
												this.setState({karterror:false})

											}
											if(kartno.length==4 ||kartno.length==9 || kartno.length==14 ){
												this.setState({kartno:kartno+" "})

											}else{
												this.setState({kartno})
											}


										}}
										value={this.state.kartno==''?null:this.state.kartno}


											/>
											<View style={{flexDirection:'row',}}>

											<TextInput keyboardType='number-pad' mode="outlined" label="Ay" style={{

													//borderColor: ColorCode,borderBottomWidth:.5,
													borderRadius:5,marginTop:3,marginBottom:3,fontWeight:'800',width:100}}

										ref="ay"

										onChangeText={(ay) => {
											if(ay.length >2)return

												this.setState({ay:ay,skt:ay+'/'+this.state.yil})
return



										}}
										value={this.state.ay==''?null:this.state.ay}


											/>

	<TextInput keyboardType='number-pad' mode="outlined" label="Yıl" style={{

													//borderColor: ColorCode,borderBottomWidth:.5,
													borderRadius:5,marginTop:3,marginBottom:3,fontWeight:'800',width:100,marginLeft:5}}

										ref="yil"

										onChangeText={(yil) => {
											if(yil.length >2)return
												this.setState({yil:yil,skt:this.state.ay+'/'+yil})
return
return



										}}
										value={this.state.yil==''?null:this.state.yil}


											/>




											<TextInput keyboardType='number-pad' mode="outlined" label="CVC " style={{
													//borderColor: ColorCode,borderBottomWidth:.5,
													borderRadius:5,marginTop:3,marginBottom:3,fontWeight:'800',width:100,marginLeft:5}}

										ref="cvc"

										onChangeText={(cvc) => {
											if(cvc.length>5)return
												this.setState({cvc})
											return

										//		if(cvc.length==3){
											this.setState({cvc:cvc })
												Keyboard.dismiss


										//	}
											//else{
											//	this.setState({kartno})
											//}
											return

											if(cvc.length == 3){
												//this.setState({currentPosition:2})
												//this.refs.sc1.scrollTo(Dimensions.get('window').height);
												Keyboard.dismiss
												this.refs['cvc'].blur()
											}

											if(cvc.length>3){
												this.setState({cvcerror:true})

											}
											else{
												this.setState({cvcerror:false})

											}
											this.setState({cvc})


										}}
										value={this.state.cvc==''?null:this.state.cvc}


											/>
											{false &&
											<View style={{alignItems:'center',justifyContent:'center'}}>
								<Image defaultSource={require('./noimage.jpg')}
												style={{alignItems:'center',
														width: 100,height:50,
														resizeMode: 'contain',
												}}
												source={{ uri: this.state.cardsselect[this.state.odemekatman-1]['logo'] }}
												/>
											<Text style={{color:'blue',margin:2}} onPress={()=>this.setState({skt:'',cvc:'',kartno:'',
})}>Temizle</Text>
</View>
}

											</View>


											</View>
									}



										</View>
								}


								</View>}







							</View>


							</View>

							<TouchableOpacity style={{borderColor:'#ccc',borderWidth:.8,width:Dimensions.get('window').width-20,backgroundColor:'white',justifyContent:'space-between',alignItems:'center',flexDirection:'row',padding:10,marginTop:10,borderRadius:5}} onPress={()=>{this.setState({cek:!this.state.cek});}}>

							<Text style={{textAlign:'left',marginLeft:10,fontWeight:'800',fontSize:16,color:ColorCode}}>Hediye Çeki Kullan</Text>

							<Icon name="chevron-down" size={16} color="#02adef"  />

							</TouchableOpacity>

							{this.state.cek&&
								<View style={{backgroundColor:'white',justifyContent:'space-between',alignItems:'center',flexDirection:'row',padding:10,marginTop:0}}>

								<TextInput
								ref="cek"
								label="Hediye çeki"
								onPress={()=>{this.refs['cek'].focus()}}
								underlineColorAndroid="rgba(0,0,0,0)"
								keyboardType="name-phone-pad"
								secureTextEntry={false}
								mode="outlined"
								style={{flex:.7}}

								value={this.state.hediyeceki}

								onChangeText={hediyeceki => this.setState({ hediyeceki })}
								/>

								<Text style={{color:this.state.hediyeceki ? ColorCode:'gray',flex:.3,textAlign:'center'}} disabled={this.state.hediyeceki.length<1?true:false} onPress={()=>{
									if(this.state.hediyeceki.length<1){return}else{
										this.bondcontrol(this.state.hediyeceki)


									}
								}}>Kullan</Text>



								</View>


							}

							</View>
					}

					<View style={{ flexDirection: 'column' ,width:Dimensions.get('window').width-20,justifyContent:'space-between',marginBottom:this.state.havale || this.state.installments ? 5:0 }}>








					</View>
					</View>}




			
				{this.state.currentPosition==1 &&
					<View style={{borderColor:'#ccc',borderWidth:.8,backgroundColor:'white',padding:10,width:Dimensions.get('window').width-20,borderRadius:5}}>
					{this.state.kupon && this.state.kupon.length>0&&	
					<View style={{ flexDirection: 'row',justifyContent:'space-between' ,marginBottom:5,
							height:this.state.currentPosition==1?null:0,
					}}>

					<Text style={{ fontWeight: '700', color: ColorCode }}>
					Kupon Değeri:
					</Text>
					<Text>{this.state.kupontoplam} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}</Text>


					</View>
					}
					
					
					
					
					
					<View style={{ flexDirection: 'row',justifyContent:'space-between' ,marginBottom:5,
							height:this.state.currentPosition==1?null:0,
					}}>

					<Text style={{ fontWeight: '700', color: ColorCode }}>
					Sepet toplamı:
					</Text>
					<Text>{this.state.odemebilgileri.Total} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}</Text>


					</View>
					<View style={{ flexDirection: 'row',justifyContent:'space-between' ,marginBottom:5,
							height:this.state.currentPosition==1?null:0,}}>

					<Text style={{ fontWeight: '700', color: ColorCode }}>
					Hediye {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'} Değeri:
					</Text>
					<Text>{this.state.odemebilgileri.PointTotal} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}</Text>


					</View>
					<View style={{ flexDirection: 'row' ,justifyContent:'space-between' ,marginBottom:5,				height:this.state.currentPosition==1?null:0,}}>

					{//!this.state.amountx&&
						true && (
							<Text style={{ fontWeight: '700', color: ColorCode }}>
							Ödenecek Miktar:
							</Text>
						)}
					{this.state.amountx && false&&
							!this.state.havale && (
								<Text style={{ fontWeight: '700', color: ColorCode }}>
								Taksitli Fiyatı:
								</Text>
							)}


					{!this.state.amountx &&
							!this.state.havale && (
								<Text>{this.state.odemebilgileri.Cash} TL</Text>
							)}
					{this.state.amountx &&
							!this.state.havale && <Text>{this.state.amountx} TL</Text>}
					{this.state.havale && (
						<Text>{this.state.odemebilgileri.Cash} TL</Text>
					)}



					</View>

					{this.state.hasvale && (
						<Text style={{ fontWeight: '700', color: ColorCode }}>
						Toplam Fiyat:
						</Text>
					)}
					</View>
				}
				</View>


				{this.state.currentPosition==1 &&


					<TouchableOpacity style={{ backgroundColor:ColorCode,alignItems:'center',justifyContent:'center',borderRadius:5,width:Dimensions.get('window').width-20,height:40,flexDirection:'row',margin:5,padding:5}} onPress={()=>{
						if(this.state.secilenadres==null){

							this.dropdown.alertWithType('error', 'Hata','Lütfen öncelikle adres bilgilerinizi seçiniz.');

							return
						}else{
							if(this.state.bankid){

								this.setState({currentPosition:2})
							}
							else if(this.state.cvc && this.state.kartno && this.state.skt){
								this.setState({currentPosition:2})


							}
							else if(!this.state.bankid && !this.state.cvc && !this.state.kartno && !this.state.skt){
								this.setState({currentPosition:2})

							}

						}

					}}


					onPress={()=>{
						if( this.state.odemebilgileri && this.state.odemebilgileri.Cash == 0 ){
						this.confirmorder()
						this.sc0.scrollTo(0);

						return

						}else{

						if(this.state.odemekatman==0){
							this.dropdown.alertWithType('error', 'Hata','Lütfen ödeme yönteminizi seçiniz.');
							return
						}

						if(this.state.secilenadres &&((this.state.kartno && this.state.cvc &&this.state.skt)||this.state.bankid) ){
							this.confirmorder()
						}else{
							this.dropdown.alertWithType('error', 'Hata','Lütfen ödeme yönteminizi seçiniz.');
							return
						}
						}
					this.sc0.scrollTo(0);
					}}




					>
					<Text style={{fontWeight:'800',color:'white',fontSize:14,textAlign:'center'}}>Sonraki Adım</Text>


					</TouchableOpacity>



				}

				</View>
			)}





			{this.state.currentPosition==2&&




					//const jsCode= "function waitForBridge() {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);}else {window.postMessage('abc');}}window.onload = waitForBridge;"


					<View
				style={{
					width: Dimensions.get('window').width,
						//	backgroundColor: 'white',
						paddingLeft: 0,
						paddingRight: 0,
						paddingTop: 0,

				}}>

					<View style={{ borderColor:'#ccc',borderWidth:.8,backgroundColor:'white',alignItems:'center',justifyContent:'space-between',borderRadius:5,width:Dimensions.get('window').width-20,height:40,flexDirection:'row',marginBottom:10,padding:5,marginLeft:10}}>
					<Text style={{fontWeight:'800',color:ColorCode,fontSize:20,textAlign:'left'}}>Sepet Özeti</Text>
					<Text style={{fontWeight:'100',color:ColorCode,fontSize:14,textAlign:'right'}}></Text>


					</View>


					{ true ? (
						<View
						style={{
							//alignItems: 'center',
							//justifyContent: 'center',
							// position: 'absolute',
							//	backgroundColor: 'white',

							width: Dimensions.get('window').width,
								marginBottom:10,
								//padding: 100,
						}}>

						{!this.state.itemss && (
							<View style={{ borderColor:'#ccc',borderWidth:.8,flexDirection: 'column', alignItems: 'center' }}>
							<EnIcon name="emoji-neutral" size={130} color="#eee" />
							<Text
							style={{ textAlign: 'center', color: '#888', margin: 20 }}>
							Sepetinizde ürün bulunmamaktadır.
							</Text>
							</View>
						)}
						{!!this.state.cart && (
							<FlatList
							style={{ borderColor:'#ccc',borderWidth:.8, marginTop: 0,backgroundColor:'white',marginLeft:10,marginRight:10 }}
							data={this.state.cart.Items}
							renderItem={({ item }) => (
								<View>
								<View
								style={{
									flexDirection: 'column',
										marginTop: 0,
										padding: 5,
										marginBottom: 2,
								}}>
								<View
								style={{
									flexDirection: 'row',
										alignItems: 'center',
								}}>
								<Image defaultSource={require('./noimage.jpg')}
								style={{ width: 70, height: 70 }}
								source={{
									uri: 'https:' + item.ProductImage,
										headers: {
											Pragma: 'no-cache',
										},
								}}
								/>
								<TouchableOpacity
								onPress={() =>
									this.props.navigation.navigate('ProductDetail', {
										name: item.ProductId,
										token: this.props.navigation.state.params.token,
									})
								}
								style={{ marginLeft: 10 }}>
								<Text style={{ color: 'black', fontSize: 14 }}>
								{item.Brand} {item.Model}
								</Text>
								<Text style={{ color: 'black', fontSize: 14 }}>
								{item.Name}
								</Text>
								</TouchableOpacity>
								</View>
								<View style={{ flexDirection: 'row', flex: 1 }}>
								<View
								style={{
									flexDirection: 'row',
										borderRadius: 10,
										width: 23,
										height: 23,
										backgroundColor: '#dede',
										alignItems: 'center',
										justifyContent: 'center',
								}}>
								<Text
								style={{
									color: 'black',
								}}>
								x{item.Quantity}
								</Text>
								</View>
								<TouchableOpacity
								style={{
									position: 'absolute',
										bottom: 0,
										right: 5,
								}}>
								<Text
								style={{
									//fontSize: 20,
									fontWeight: '200',
										color: 'gray',
								}}>
								Puanı: {item.Price} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
								</Text>
								</TouchableOpacity>
								</View>
								</View>

								</View>
							)}
							/>
						)}

						{this.state.jun6patch&&this.state.secilenadres &&
								this.state.itemss !== false &&
								this.state.cart && (
									<View
									style={{ padding: 10, flex: 0.2}}>
									<View
									style={{borderColor:'#ccc',borderWidth:.8,
										padding: 5,
											backgroundColor:'white',
											flexDirection: 'row',
											marginTop:10,marginBottom:10

									}}>
									<View style={{ flex: 0.3, flexDirection: 'column',backgroundColor:'white' }} />
									<View style={{ flex: 0.3, flexDirection: 'column',backgroundColor:'white' }}>
									<Text
									style={{
										fontSize: 12,
											color: 'gray',
											textAlign: 'right',
									}}>
									Sepet Toplam:
									</Text>
									<Text
									style={{
										fontSize: 12,
											color: 'gray',
											textAlign: 'right',
									}}>
									Kargo Bedeli:
									</Text>
									<Text
									style={{
										fontSize: 12,
											color: 'gray',
											textAlign: 'right',
									}}>
									İndirim:
									</Text>
									{this.state.bankid &&
									<Text
									style={{
										fontSize: 12,
											color: 'gray',
											textAlign: 'right',
									}}>
									Toplam:
									</Text>
									}

									{this.state.cvc && (
										<View>
										<Text
										style={{
											fontSize: 12,
												color: 'gray',
												textAlign: 'right',
										}}>
										Vade Farkı:
										</Text>

										<Text
										style={{
											fontSize: 12,
												color: 'gray',
												textAlign: 'right',
										}}>
										Toplam:
										</Text>
										</View>
									)}
									</View>
									<View style={{ flex: 0.3 }}>
									<Text
									style={{
										fontSize: 12,
											color: ColorCode,
											textAlign: 'right',
									}}>
									{this.state.jun6patch.SubTotal} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
									</Text>

									<Text
									style={{
										fontSize: 12,
											color: ColorCode,
											textAlign: 'right',
									}}>
									{this.state.jun6patch.CargoTotal} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
									</Text>

									<Text
									style={{
										fontSize: 12,
											color: ColorCode,
											textAlign: 'right',
									}}>
									{this.state.jun6patch.Discount} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
									</Text>
									{this.state.bankid &&
										<Text
										style={{
											fontSize: 12,
												color: ColorCode,
												textAlign: 'right',
										}}>
										{this.state.jun6patch.Cash} TL
										</Text>
									}

									{this.state.cvc ? (
										<View>
										<Text
										style={{
											fontSize: 12,
												color: ColorCode,
												textAlign: 'right',
										}}>
										{this.state.vadefarki} TL
										</Text>

										<Text
										style={{
											fontSize: 12,
												color: ColorCode,
												textAlign: 'right',
										}}>
										{this.state.jun6patch.Cash} TL
										</Text>
										</View>
									) : (
										<View />
									)}
									</View>
									</View>
									{false&&
									<View style={{marginTop:10,marginBottom:10,backgroundColor:'white',padding:5}}>
									<Text style={{ fontWeight: '800' }}>Teslimat Adresi:</Text>

									<Text
									style={{
										fontSize: 12,
											color: 'gray',
									}}>
									{this.state.adres.ShippingFirstName}{' '}
									{this.state.adres.ShippingLastName}
									</Text>
									<Text
									style={{
										fontSize: 12,
											color: 'gray',
									}}>
									{this.state.adres.ShippingAddress}
									</Text>
									<Text
									style={{
										fontSize: 12,
											color: 'gray',
									}}>
									{this.state.adres.ShippingCityName} /{' '}
									{this.state.adres.ShippingTownName}
									</Text>
									</View>
									}
									{this.state.odemekatman!==6 &&  this.state.odemebilgileri && this.state.odemebilgileri.Cash !== 0  ?
										<View style={{borderColor:'#ccc',borderWidth:.8,marginTop:10,marginBottom:10,backgroundColor:'white',padding:5}}>
										<Title>Ödeme Bilgileri</Title>


<View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#eee',borderRadius:5}}>
											<View style={{flexDirection:'column'}}>
												<Image defaultSource={require('./noimage.jpg')}
												style={{alignItems:'center',
														width: 100,height:50,
														resizeMode: 'contain',
												}}
												source={{ uri: this.state.cardsselect[this.state.odemekatman-1]['logo'] }}
												/>

											<Text>{this.state.cardsselect[this.state.odemekatman-1]['Label']}</Text>
											</View>
<View>
											<Text
										style={{
											fontSize: 12,
												color: 'gray',
										}}>
										Kart Numarası:{'\n'}
										{this.state.kartno?this.state.kartno.substring(0, 4) + " **** **** " + this.state.kartno.substring(this.state.kartno.length-5,this.state.kartno.length):''

										}
										</Text>
										<Text
										style={{
											fontSize: 12,
												color: 'gray',
										}}>
										SKT:{'\n'}
										{this.state.skt?this.state.skt:''}
										</Text>

										<Text
										style={{
											fontSize: 12,
												color: 'gray',
										}}>
										CVC:{'\n'}
										{this.state.cvc?'***':''}
										</Text>
											</View>
											<View style={{alignItems:'center',justifyContent:'center'}}>
<Text onPress={()=>this.setState({currentPosition:1})}
										style={{
											fontSize: 12,
												color: 'blue',fontWeight:'100'
										}}>
											Ödemeyi{'\n'}düzenle
											</Text>


											</View>


</View>



<Title>Teslimat Bilgileri</Title>


											{this.state.secilenadresdata &&


					<View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',backgroundColor:'#eee',borderRadius:5}}>

						<View style={{justifyContent:'center',margin:5,padding:4,flexDirection:'column'}}>
						<Text style={{fontWeight:'800',marginBottom:5}}>{this.state.secilenadresdata.ShippingName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{this.state.secilenadresdata.ShippingAddress} {this.state.secilenadresdata.ShippingTownName} - {this.state.secilenadresdata.ShippingCityName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{this.state.secilenadresdata.ShippingFirstName} {this.state.secilenadresdata.ShippingLastName} - {this.state.secilenadresdata.ShippingGsm}</Text>

<Text style={{fontWeight:'100',marginTop:5,color:'blue'}} onPress={()=>{
							//alert(this.state.secilenadres);
							this.props.navigation.navigate('EditAddress', {
								secilenadres: this.state.secilenadresdata.ShippingAddressId,
								token: this.props.navigation.state.params.token,
							})


						}}>Adresi Düzenle</Text>

						</View>


						</View>






					}





										</View>:
										<View style={{borderColor:'#ccc',borderWidth:.8,marginTop:10,marginBottom:10,backgroundColor:'white',padding:5}}>
										<Title>Ödeme Bilgileri</Title>
					{ this.state.odemebilgileri && this.state.odemebilgileri.Cash == 0 &&
						<Text style={{color:'red'}}>Puan ile Ödeme</Text>

					}
					{ this.state.odemebilgileri && this.state.odemebilgileri.Cash !== 0 && this.state.bankselected &&
										<Text style={{color:'red'}}>Havale ile Ödeme</Text>
					}


								{this.state.bankselected &&

								<View>
								<TouchableOpacity
											 >
												<View style={{flexDirection: 'column',backgroundColor:'#eee',borderRadius:5,borderWidth:Platform.OS=='ios'?.5:0,borderColor:'#eee',justifyContent: 'flex-start',alignItems:'flex-start',padding:5,margin:5}}

												>
												<View style={{flexDirection:'row'}} >


												<Image defaultSource={require('./noimage.jpg')}
												style={{alignItems:'center',
														width: 100,height:50,
														resizeMode: 'contain',
												}}
												source={{ uri: this.state.bankselected.Logo }}
												/>


												<Text style={{padding:5,width:160, fontWeight: '100',fontSize:12 ,color: 'black'}}>

												{this.state.bankselected.BranchOffice}

												{'\n'}
												{'Hesap No :'+this.state.bankselected.AccountNumber}{' '}

												</Text>


												</View>
										<Text style={{color:'blue',fontWeight:'100'}} onPress={()=>this.setState({bankselected:false,currentPosition:1})}>Bankayı Değiştir</Text>

												<Text style={{padding:5, fontWeight: '100',fontSize:12 ,color: 'black'}}>

												{'IBAN :'+this.state.bankselected.IbanNumber}{' '}
												</Text>
												</View>
												</TouchableOpacity>

								</View>
								}
										<Title>Teslimat Bilgileri</Title>


											{this.state.secilenadresdata &&


					<View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',backgroundColor:'#eee',borderRadius:5}}>

						<View style={{justifyContent:'center',margin:5,padding:4,flexDirection:'column'}}>
						<Text style={{fontWeight:'800',marginBottom:5}}>{this.state.secilenadresdata.ShippingName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{this.state.secilenadresdata.ShippingAddress} {this.state.secilenadresdata.ShippingTownName} - {this.state.secilenadresdata.ShippingCityName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{this.state.secilenadresdata.ShippingFirstName} {this.state.secilenadresdata.ShippingLastName} - {this.state.secilenadresdata.ShippingGsm}</Text>

<Text style={{fontWeight:'100',marginTop:5,color:'blue'}} onPress={()=>{
							//alert(this.state.secilenadres);
							this.props.navigation.navigate('EditAddress', {
								secilenadres: this.state.secilenadresdata.ShippingAddressId,
								token: this.props.navigation.state.params.token,
							})


						}}>Adresi Düzenle</Text>

						</View>


						</View>






					}



										</View>

									}

									</View>
								)}

						{true&&
								<View
							style={{
								flexDirection: 'row',
									borderColor:'#ccc',borderWidth:.8,
									padding: 5,
									backgroundColor: 'white',
									height:50,marginLeft:10,marginRight:10,alignItems:'center',justifyContent:'center'
							}}>
								{Platform.OS == 'ios' ? (
									<TouchableOpacity
									activeOpacity={1}
									onPress={() => {
										this.props.navigation.navigate('Agreement',{data:this.state.htmlcontent})
										return
										if (this.state.showagreement) {
											this.setState({ showagreement: false });
										} else {
											this.setState({ showagreement: true });
										}
									}}>
									<View
									style={{
										flexDirection: 'row',
											justifyContent: 'flex-start',
											alignItems: 'center',
											paddingLeft: 5,
									}}>

									<Switch
									onValueChange={val =>{


										this.setState({
											agreementapproved: this.state.agreementapproved==1?2:1,
											odemeyionayla: 'Ödemeyi Onayla',
											cek:!this.state.cek
										})
									}
									}
									value={this.state.cek}
									/>
									<Text style={{ color: 'blue',marginleft:5 }}>
									Satış Sözleşmesini okudum, onaylıyorum.
									</Text>

									</View>
									</TouchableOpacity>
								) : (<TouchableOpacity 	onPress={() => {
										this.props.navigation.navigate('Agreement',{data:this.state.htmlcontent})
										return

										if (this.state.showagreement) {
											this.setState({ showagreement: false });
										} else {
											this.setState({ showagreement: true });
										}
									}}
									style={{flexDirection:'row'}}>
									<CheckBox
									isChecked={this.state.cek}

									value={this.state.cek}


									onClick={() =>{

										this.setState({asdf:!this.state.asdf,
											cek:!this.state.cek,

											agreementapproved: this.state.agreementapproved==1?2:1,
											odemeyionayla: 'Ödemeyi Onayla',
										})


									}}
									/>
									<Text style={{ color: 'blue' }}>
									Satış Sözleşmesini okudum, onaylıyorum.
									</Text>

									</TouchableOpacity>
								)}

							{false&&
									<TouchableOpacity style={{margin:0,alignItems:'center',justifyContent:'center'}}
								activeOpacity={1}
								activeOpacity={1}
								onPressIn={() => {
									if (this.state.showagreement) {
										this.setState({ showagreement: false });
									} else {
										this.setState({ showagreement: true });
									}
								}}>
									<Text style={{ color: 'blue' }}>
									Satış Sözleşmesini okudum, onaylıyorum.
									</Text>
									</TouchableOpacity>}

								</View>
						}
						</View>
					) : (
						<View />
					)}
					<DropdownAlert ref={ref => this.dropdown = ref} />

					</View>









			}
			{this.state.currentPosition==2&&
					<View style={{margin:10,borderRadius:5,padding:5

					}}>

					{false &&
						<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',paddingBottom:5,width:Dimensions.get('window').width-30}}>
						<Text style={{color:'gray',fontSize:10,textAlign:'left'}}>Hediye çekleri tek kullanımlıktır.Hediye çeklerinizi birleştirerek de sipariş verebilirsiniz. Hediye çeki kullanarak sipariş verebildiğiniz gibi hediye çeki + para kullanarak sipariş verebilmektesiniz.</Text>
						<View style={{width:150,height:1,backgroundColor:'#fff',margin:9}}/>

						<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

						<TextInput label="Kod giriniz" style={{backgroundColor:'#eee',width:Dimensions.get('window').width/2,textAlign:'center',fontWeight:'100',
						}}   value={this.state.texta} onChangeText={(texta)=>this.setState({texta:texta})}
						onSubmitEditing={()=> {this.bondcontrol(this.state.texta);
							this.setState({ texta: '' });}
						}
						/>
						<Text style={{ fontWeight: '700', color: ColorCode,paddingLeft:5 }} onPress={()=> {this.bondcontrol(this.state.texta);
							this.setState({ texta: '' });}
						}
						>
						Ekle
						</Text>
						</View>
						<View style={{width:150,height:1,backgroundColor:'#fff',margin:9}}/>


						{this.state.kupon && (
							<FlatList
							data={this.state.kupon}
							renderItem={({ item }) => (
								<TouchableOpacity
								onPressIn={() => this.kuponsil(item.Code)}
								style={{
									padding: 5,
										fontWeight: '100',
										flexDirection: 'row',
										width: Dimensions.get('window').width / 2,
								}}>

								<Text
								style={{
									color: 'black',
										fontWeight: '800',
										fontSize: 12,
								}}>
								{' '}
								{item.Code} - {item.Price} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
								</Text>
								<EIcon name="close-o" style={{}} size={20} color="red" />

								</TouchableOpacity>
							)}
							/>
						)}




						</View>	}


				{this.state.hediyecekiformu &&

						<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.hediyecekiformu}
					onRequestClose={() => {
					}}>

						<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',paddingBottom:5,paddingTop:Dimensions.get('window').height/4,width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
						<View style={{backgroundColor:'#fff',margin:10,padding:10}}>
						<TouchableHighlight style={{backgroundColor:'red',borderRadius:20,position:'absolute',alignItems:'center',justifyContent:'center',top:10,right:10,zIndex:102,width:35,height:35}}
					onPress={() => { this.setState({hediyecekiformu:false})
						// this.setModalVisible(!this.state.SmodalVisible);
					}}>
						<EIcon name="close" style={{}} size={35} color="white" />

						</TouchableHighlight>




						<Text style={{color:'black',fontSize:20,textAlign:'center',fontWeight:'800',marginTop:10}}>Yeni Hediye çeki</Text>

						<Text style={{color:'gray',fontSize:10,textAlign:'center',marginTop:15}}>Hediye çekleri tek kullanımlıktır.Hediye çeklerinizi birleştirerek de sipariş verebilirsiniz. Hediye çeki kullanarak sipariş verebildiğiniz gibi hediye çeki + para kullanarak sipariş verebilmektesiniz.</Text>



						<TextInput label="Kod giriniz" style={{backgroundColor:'#eee',textAlign:'center',marginTop:15,width:Dimensions.get('window').width,textAlign:'center',fontWeight:'100',
						}}   value={this.state.texta} onChangeText={(texta)=>this.setState({texta:texta})}
					onSubmitEditing={()=> {this.bondcontrol(this.state.texta);
						this.setState({ texta: '' });}
					}
						/>
						<Button style={{backgroundColor:ColorCode,color:'white',marginTop:15}} onPress={()=> {this.bondcontrol(this.state.texta);
							this.setState({ texta: '' });}
						}
						>
						Ekle
						</Button>
						</View>



						{this.state.kupon && (
							<FlatList
							data={this.state.kupon}
							renderItem={({ item }) => (
								<TouchableOpacity
								onPressIn={() => this.kuponsil(item.Code)}
								style={{
									padding: 5,
										fontWeight: '100',
										flexDirection: 'row',
										width: Dimensions.get('window').width / 2,
								}}>

								<Text
								style={{
									color: 'black<D-r>',
										fontWeight: '800',
										fontSize: 12,
								}}>
								{' '}
								{item.Code} - {item.Price} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}

								</Text>
								<EIcon name="close-o" style={{}} size={20} color="red" />

								</TouchableOpacity>
							)}
							/>
						)}




						</View>





						</Modal>





				}


					</View>
			}
			{this.state.currentPosition==2&&


					<Button  icon="check" mode="contained" disabled={!this.state.cek}
				style={{backgroundColor:ColorCode,color:'white',textAlign:'center'}} onPress={() => {
					//this.sc.scrollTo(0);
					this.sc0.scrollTo(0);
					if (this.state.odemekatman==6){
						this.completeorder();

						return}else{
							if ( (typeof this.state.cvc !== undefined || this.state.cvc !=='') &&  this.state.odemebilgileri && this.state.odemebilgileri.Cash !== 0 ){
								if (this.state.cvc.length!==3) {

									this.completeorder();
								}else{//alert(this.state.orderid)

									this.gatewayapi(this.state.orderid);

								}
									this.setState({paymentactivated:true},function(){
								if(	!!this.state.cek)return
								//	this.confirmorder()

							})

							}else{

								this.setState({paymentactivated:false},function(){
									this.completeorder();

								})

							}


												}	}}> Ödemeyi Tamamla</Button>

			}

			{this.state.currentPosition==3 &&
					<View style={{alignItems:'center',jsutifyContent:'center'}}>

					<View style={{padding:10,flexDirection:'row',alingItems:'center',justifyContent:'center',flex:1}}>
					<View style={{margin:10,flex:.2}}>
			<Icon name="check" size={30} color="green" />

					</View>

					<View style={{flex:.8}}>
					<Text style={{fontSize:14,color:'black',fontWeight:'800'}}>Siparişiniz alındı</Text>

					<Text style={{fontSize:14,color:'black',fontWeight:'100'}}>{this.state.passmessagetoconfirmation}</Text>

					<Text style={{fontSize:14,color:'black',fontWeight:'100'}}>{(this.state.havalesonuc.ResultMessage)}</Text>
					</View>
					</View>
					<View style={{borderColor:'#ccc',borderWidth:.8,elevation:4,margin:20,backgroundColor:'white',borderRadius:5,padding:10,justifyContent:'center'}}>

						<Title>Adres Bilgileri</Title>
					{this.state.secilenadresdata &&


					<View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',backgroundColor:'#eee',borderRadius:5}}>

						<View style={{justifyContent:'center',margin:5,padding:4,flexDirection:'column'}}>
						<Text style={{fontWeight:'800',marginBottom:5}}>{this.state.secilenadresdata.ShippingName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{this.state.secilenadresdata.ShippingAddress} {this.state.secilenadresdata.ShippingTownName} - {this.state.secilenadresdata.ShippingCityName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{this.state.secilenadresdata.ShippingFirstName} {this.state.secilenadresdata.ShippingLastName} - {this.state.secilenadresdata.ShippingGsm}</Text>


						</View>


						</View>






					}

					{this.state.havalesonuc &&
					<Text style={{fontSize:14,color:'black',fontWeight:'800',marginBottom:10,marginTop:10}}>Sipariş numarası : {this.state.havalesonuc.ResultMessage.split(" ")[0].replace("Siparişinizin" , "")}</Text>
					}
				<Text style={{color:'blue',textAlign:'right',margin:3}} onPress={()=>this.props.navigation.navigate('MyOrders',{token:this.props.navigation.state.params.token})}>Siparişlerime git</Text>
<Divider  />

					<Text style={{fontSize:14,color:'black',fontWeight:'800',marginBottom:10,marginTop:10}}>Sepetteki ürün adedi : {(this.state.cart.Items.length)}</Text>
<Divider  />

					<Text style={{fontSize:14,color:'black',fontWeight:'800',marginBottom:10,marginTop:10}}>Toplam : {JSON.stringify(this.state.cart.Total)} TL</Text>
<Divider   />

					<Text style={{fontSize:14,color:'black',fontWeight:'800',marginBottom:10,marginTop:10}}>Ödeme Tipi : {this.state.odemebilgileri && this.state.odemebilgileri.Cash == 0 ? 'Puanla Ödeme':(this.state.odemekatman!==6?'Kredi/Banka Kartı':'Havale')}</Text>
<Divider   />



					{this.state.odemekatman == 6 &&
						<View >
						<Title>Banka Bilgileri</Title>
						<Divider />

							<TouchableOpacity
											 >
												<View style={{flexDirection: 'column',backgroundColor:'#eee',borderRadius:5,borderWidth:Platform.OS=='ios'?.5:0,borderColor:'#eee',justifyContent: 'flex-start',alignItems:'flex-start',padding:5,margin:5}}

												>
												<View style={{flexDirection:'row'}} >


												<Image defaultSource={require('./noimage.jpg')}
												style={{alignItems:'center',
														width: 100,height:50,
														resizeMode: 'contain',
												}}
												source={{ uri: this.state.bankselected.Logo }}
												/>


												<Text style={{padding:5,width:160, fontWeight: '100',fontSize:12 ,color: 'black'}}>

												{this.state.bankselected.BranchOffice}

												{'\n'}
												{'Hesap No :'+this.state.bankselected.AccountNumber}{' '}

												</Text>


												</View>
												<Text style={{padding:5, fontWeight: '100',fontSize:12 ,color: 'black'}}>

												{'IBAN :'+this.state.bankselected.IbanNumber}{' '}
												</Text>
												</View>
												</TouchableOpacity>


						</View>
					}


					</View>
					<Button mode="contained" icon="done" onPress={()=>{

	const resetAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Proje',params:{
						token: this.props.navigation.state.params.token,
						} })],
					});

					this.props.navigation.dispatch(resetAction);


					return
						this.props.navigation.navigate('Proje', {
						token: this.props.navigation.state.params.token,
					})


					}} style={{backgroundColor:ColorCode,width:Dimensions.get('window').width-80}}>Alışverişe Devam Et</Button>
					</View>


			}




			{false&&
					<Text style={{color:'#ccc',fontWeight:'100',textAlign:'center',margin:3}}>Devam etmek için ödeme tipini ve adresinizi seçiniz.{'\n'}Kredi Kartıyla olan ödemelerinizde Taksit sayısını, havale ile ödemelerde banka bilgilerini seçmeniz gerekmektedir.</Text>}

			<View style={{ height: 200 }} />



			</ScrollView>
			{this.state.odemebilgileri && false && this.state.odemebilgileri.Cash < -1 ? (
				<TouchableOpacity
				// onPressIn={() => this.confirmorder(false)}
				onPressIn={() =>
					this.props.navigation.navigate('OrderSummary', {
						token: this.props.navigation.state.params.token,
						kupon: kupons,
						kupontoplam: this.state.kupontoplam,
						puan: this.state.odemebilgileri.PointTotal,
						cash: 'noneed',
						vadefarki: this.state.vadefarki,
						secilenadres: this.props.navigation.state.params.secilenadres,
					})
				}
				style={{
					height: 40,
						position: 'absolute',
						bottom: 0,

						backgroundColor: ColorCode,
						width: Dimensions.get('window').width,
						justifyContent: 'center',
				}}>
				<Text
				style={{
					textAlign: 'center',
						color: 'white',
						fontSize: 24,
						fontWeight: '100',
				}}>
				Devam et
				</Text>
				</TouchableOpacity>
			) : (
				<View />
			)}


			<DropdownAlert ref={ref => this.dropdown = ref} />

			</View>
		);
//this.props.navigation.navigate('CardProcess',{token:this.props.navigation.state.params.token})
//this.sendpayment()
}
}

import TearLines from 'react-native-tear-lines';

class ConfirmPaymentScreen extends React.Component {
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

class CompletePaymentScreen extends React.Component {
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
class CategoryDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = { product: '', loading: false,siralad:'',filtreled:'',categoryname:false };
	}
	static navigationOptions = {
		title: 'CategoryDetail',
		header: null,
	};

	componentDidMount() {
		//	  alert(JSON.stringify(this.props.navigation.state.params.brands))
		this.setState({brands:this.props.navigation.state.params.brands,
			selectedcat:this.props.navigation.state.params.selectedcat,

			token: this.props.navigation.state.params.token,
			categorydata: this.props.navigation.state.params.categorydata,
			fruits: [],
			fruitsc: [],
			newcatset: false,
			pager: 0,
		});
		this.categorylist()
		return;
		var fruits = [];
		var fruitsc = [];
		fetch(API_URL+'/catalog/list/', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: 'Id=' + this.props.navigation.state.params.selectedcat,
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
				//	alert(JSON.stringify(response))
				for (var i = 0; i < response.length; i++) {
					fruitsc.push({ Id: response[i].Id, Name: response[i].Name });
				}
				this.setState({ dddc: fruitsc });
				fetch(API_URL+'/product/list/', {
					method: 'POST', timeout: 20000,
					headers: {
						Authorization: 'Bearer ' + this.props.navigation.state.params.token,
						'Content-Type': 'application/x-www-form-urlencoded',
					},

					body:
					'CategoryId=' +
					this.props.navigation.state.params.selectedcat +
					'&Keywords=&OrderBy='+this.state.siralad+'&BrandName='+this.state.filtreled+'&PriceMin=0&PriceMax=1000&P1=0&P2=20',
				})
					.then(response => {
						const statusCode = response.status;
						if (statusCode != 200) {
							alert('sayfa hatasi');
						} else {
							return response.json();
						}
					})
					.then(response => {
						alert(JSON.stringify(response.Brands)),
							//alert('asdasdadsad')
							fruits = [];
						for (var i = 0; i < response.Products.length; i++) {
							fruits.push({
								Idd: response.Products[i].Id,
								Id: response.Products[i].Image,
								Name: response.Products[i].Name,
								Price: response.Products[i].Price,
								MarketPrice: response.Products[i].MarketPrice,

								SupportPrice: response.Products[i].SupportPrice,

								Brand: response.Products[i].Brand,
								Model: response.Products[i].Model,
							});
						}
						alert(JSON.stringify(fruits));

						this.setState({ categorydata: fruits, loading: false});
					})
					.catch(error => {
						//alert(error);
						this.props.navigation.navigate('Home');
						// //alert(error);
						this.setState({ loading: false });
					});
			})
			.catch(error => {
				//alert(error);
				this.props.navigation.navigate('Home');
				this.setState({ loading: false });

				// //alert(error);
			});
	}


	categorylist(){

		fetch(API_URL+'/catalog/list/', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'Id=',
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				//	alert(JSON.stringify(response))
				var categories = [];
				var subcategories = [];
				var fruitsc=[]

				for (var i = 0; i < response.length; i++) {
					fruitsc.push({
						ParentCategory: response[i].ParentCategory.Id,
						Name: response[i].ParentCategory.Name,
						Category: response[i].Category,
					});
				}
				//   alert(JSON.stringify(fruitsc))

				this.setState({ dddc: fruitsc });
			})



	}

	resetfunc() {
		var fruitsc = [];
		fetch(API_URL+'/catalog/list/', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'Id=',
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
				//	alert(JSON.stringify(response))
				for (var i = 0; i < response.length; i++) {
					fruitsc.push({ Id: response[i].Id, Name: response[i].Name });
				}
				this.setState({ dddc: fruitsc });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				this.setState({ loading: false });

				////alert(error);
			});
	}

	workerforpager(a) {
		this.setState({ loading: true, pager: a + 1 });

		var p1 = 20 * a;
		var p2 = 20 * (a + 1);
		fetch(API_URL+'/product/list/', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body:
			'CategoryId=' +
			this.state.selectedcat +
			'&Keywords=&OrderBy='+this.state.siralad+'&BrandName='+encodeURIComponent(this.state.filtreled)+'&PriceMin=0&PriceMax=&P1=' +
			p1 +
			'&P2=' +
			p2,
		})
			.then(response => {
				return response.json();
			})
			.then(response => {

				var fruits = this.state.categorydata;
				for (var i = 0; i < response.Products.length; i++) {
					fruits.push({
						Idd: response.Products[i].Id,
						Id: response.Products[i].Image,
						Name: response.Products[i].Name,
						Price: response.Products[i].Price,
						MarketPrice: response.Products[i].MarketPrice,

						SupportPrice: response.Products[i].SupportPrice,

						Brand: response.Products[i].Brand,
						Model: response.Products[i].Model,
					});
				}
				this.setState({ categorydata: fruits, loading: false });
			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				this.setState({ loading: false });

				////alert(error);
			});
	}

	setcat(a, b) {
		var self = this;
		self.setState({  loading: true ,categorydata:false,categoryname:b,sirala:false,filtrele:false});
		var fruitsc = [];
		var fruits = [];
		fetch(API_URL+'/catalog/list/', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: 'Id=' + this.state.selectedcat,
		})
			.then(response => {
				const statusCode = response.status;
				if (statusCode != 200) {
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
				for (var i = 0; i < response.length; i++) {
					fruitsc.push({ Id: response[i].Id, Name: response[i].Name });
				}
				if (response.length > 0) {
					this.setState({ dddcs: fruitsc });
				} else {
					this.drawer.closeDrawer();
				}
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				this.setState({ loading: false });

			});



		fetch(API_URL+'/product/list/', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body:
			'CategoryId=' +
			this.state.selectedcat+
			'&Keywords=&OrderBy='+this.state.siralad+'&BrandName='+encodeURIComponent(this.state.filtreled)+'&PriceMin=&PriceMax=&P1=0&P2=20',
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
				//alert(this.state.ddd[0].Id),
				//	alert(JSON.stringify(response))
				//alert('asdasdadsad')
				fruits = [];
				for (var i = 0; i < response.Products.length; i++) {
					fruits.push({
						Idd: response.Products[i].Id,
						Id: response.Products[i].Image,
						Name: response.Products[i].Name,
						Price: response.Products[i].Price,
						MarketPrice: response.Products[i].MarketPrice,
						SupportPrice: response.Products[i].SupportPrice,
						Model: response.Products[i].Model,

						Brand: response.Products[i].Brand,
					});
				}
				this.setState({ categorydata: fruits, loading: false,brands:response.Brands });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				this.setState({ loading: false });

			});
	}

	render() {


		var drawerContent = (
			<View
			style={{
				backgroundColor: '#222222',
					flex: 1,
					zIndex: 300,
					marginTop:
				Platform.OS == 'android' && this.state.blacked == true ? 0 : 0,
			}}>
			<View style={{}} />
			<View style={{}}>
			<View>
			<TouchableOpacity onPress={()=>this.props.navigation.navigate('Proje', {
				token: this.state.token,
			})
			}
			style={{ marginTop: 50, paddingLeft: 15, position: 'absolute' }}>
			<Text
			style={{ color: ColorCode, fontSize: 20, fontWeight: '400' }}>
			AnaSayfa
			</Text>
			</TouchableOpacity>
			</View>
			<View>
			<TouchableOpacity
			style={{ marginTop: 80, paddingLeft: 20, position: 'absolute' }}
			onPressIn={() =>
				this.props.navigation.navigate('Neisterseniz', {
					token: this.state.token,
				})
			}>
			<Text style={{ color: ColorCode, fontWeight: '400' }}>
			Ne İsterseniz
			</Text>
			</TouchableOpacity>
			</View>
			<View>
			<TouchableOpacity
			style={{ marginTop: 100, paddingLeft: 20, position: 'absolute' }}
			onPressIn={() =>
				this.props.navigation.navigate('Search', {
					token: this.state.token,
					setmax: '100,0',// this.state.totalpoint,
					setmin: 0,
				})
			}>
			<Text style={{ color: ColorCode, fontWeight: '400' }}>
			Puanıma Uygun Ürünler
			</Text>
			</TouchableOpacity>
			</View>

			<View style={{ marginTop: 130 }}>
			<FlatList
			style={{ marginBottom: 20 }}
			data={this.state.dddc}
			renderItem={({ item }) => (
				<View>
				<TouchableHighlight
				style={{ margin: 1, padding: 3 }}
				underlayColor={ColorCode}
				onPress={() => {
					if (item.Name == 'Araç Kiralama') {
						this.props.navigation.navigate('CarRental', {
							token: this.state.token,
						});
						return;
					}
					if (item.Category.length == 0) {
						this.setState({selectedcat:item.ParentCategory,filtreled:''},()=>{
							this.drawer.closeDrawer();

							this.setcat(item.ParentCategory, item.Name)}

						);
						return;
					}
					//	  if(this.state[item.ParentCategory])return;
					//  alert(item.ParentCategory.length)

					this.setState({
						[item.ParentCategory]: !this.state[item.ParentCategory],
						ac: false, //[item.ParentCategory+'cm']:0,
						[item.ParentCategory + 'cm']:
						item.ParentCategory.length *
						(Platform.OS == 'ios' ? 25 : 30),
					});
				}}>
				<View
				style={{
					flexDirection: 'row',
						justifyContent: 'space-between',
				}}>
				<Text
				style={{
					color: '#fdfdfd',
						//fontSize: 20,
						fontWeight: '400',
						paddingLeft: 15,
				}}>
				{item.Name}
				</Text>
				{item.Category.length > 0 && (
					<Icon
					name="angle-down"
					size={20}
					color="gray"
					style={{ marginRight: 15 }}
					/>
				)}
				</View>
				</TouchableHighlight>
				<View>
				{this.state[item.ParentCategory] && (
					<FlatList
					data={item.Category}
					style={{ marginBottom: 0 }}
					renderItem={({ item }) => (
						<View style={{ marginLeft: 10 }}>
						<TouchableHighlight
						style={{ margin: 1, padding: 3 }}
						underlayColor={ColorCode}
						onPress={() => {
							if (item.SubCategory.length > 0) {
								this.setState({
									[item.SubCategory]: !this.state[
										item.SubCategory
									],
									ac: true,
									uzunluk:
									item.SubCategory.length *
									(Platform.OS == 'ios' ? 25 : 30),
								});
							} else {
								this.setState({selectedcat:item.Id,filtreled:''},function(){
									this.drawer.closeDrawer();

									this.setcat(item.Id, item.Name)});

							}
						}}>
						<View>
						<View
						style={{
							flexDirection: 'row',
								justifyContent: 'space-between',
						}}>
						<Text
						style={{
							color: '#fdfdfd',
								//fontSize: 20,
								fontWeight: '400',
								paddingLeft: 15,
						}}>
						{item.Name}
						</Text>
						{item.SubCategory.length > 0 && (
							<Icon
							name="angle-down"
							size={20}
							color="gray"
							style={{ marginRight: 15 }}
							/>
						)}
						</View>
						<View>
						{item.SubCategory && (
							<View
							style={{
								height:
								item.SubCategory.length > 0 &&
									this.state.ac &&
									this.state[item.SubCategory]
									? item.SubCategory.length *
									(Platform.OS == 'ios' ? 25 : 30)
									: 0,
							}}>
							<FlatList
							style={{ marginBottom: 0 }}
							data={
								item.SubCategory
								? item.SubCategory
								: null
							}
							renderItem={({ item }) => (
								<View style={{ marginLeft: 10 }}>
								<TouchableHighlight
								style={{ margin: 1, padding: 3 }}
								underlayColor={ColorCode}
								onPress={() =>
									this.setcat(item.Id, item.Name)
								}>
								<View
								style={{
									flexDirection: 'row',
										justifyContent:
									'space-between',
								}}>
								<Text
								style={{
									color: '#fdfdfd',
										//fontSize: 20,
										fontWeight: '400',
										paddingLeft: 15,
								}}>
								{item.Name}
								</Text>
								{false && (
									<Icon
									name="angle-right"
									size={20}
									color="gray"
									style={{ marginRight: 15 }}
									/>
								)}
								</View>
								</TouchableHighlight>
								<View />
								</View>
							)}
							/>
							</View>
						)}
						</View>
						</View>
						</TouchableHighlight>
						<View />
						</View>
					)}
					/>
				)}
				</View>
				</View>
			)}
			/>
			</View>
			</View>
			</View>
		);
		var customStyles = {
			drawer: {
				shadowColor: '#000',
				shadowOpacity: 0.4,
				shadowRadius: 10,
			},
			mask: {}, // style of mask if it is enabled
			main: {}, // style of main board<D-0><D==
		};






		const { navigate } = this.props.navigation;
		let {xPosition} =this.state;
		return (

			<Drawer
			style={{ zIndex: 200 }}
			drawerWidth={250}
			drawerContent={drawerContent}
			type={Drawer.types.Default}
			customStyles={{ drawer: styles.drawer }}
			drawerPosition={Drawer.positions.Left}
			onDrawerOpen={() => {
				console.log('Drawer is opened');
			}}
			onDrawerClose={() => {
				console.log('Drawer is closed');
			}}
			easingFunc={Easing.ease}
			ref={ref => (this.drawer = ref)}>

			<View>


			<Appbar.Header dark={false}
			style={{
				zIndex:1000,width:Dimensions.get('window').width,marginTop:Platform.OS=='ios'?0:0,backgroundColor:'white'}}

			>
			<Appbar.BackAction
			onPress={()=>this.props.navigation.pop()}
			/>
			<Appbar.Action icon="menu" onPress={() => this.drawer.openDrawer()} />

			<Appbar.Content
			title="Kategori"
			subtitle={this.state.categoryname?this.state.categoryname:this.props.navigation.state.params.categoryname}
			/>
			<Appbar.Action icon="search" onPress={()=>this.props.navigation.navigate('Search',{token:this.props.navigation.state.params.token})} />
			<Appbar.Action icon="more-vert" onPress={()=>this.setState({showmore:!this.state.showmore})} />
			</Appbar.Header>

			{!this.state.sirala && !this.state.filtrele && !this.state.gorunum &&this.state.showmore&&
					<View style={{backgroundColor:'#eee', width:Dimensions.get('window').width,height:this.state.showmore?50:0,justifyContent:'space-between',flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:0,zIndex:999}}>

					<TouchableOpacity onPress={()=>this.setState({sirala:true})}  style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
					<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

					<EnIcon name="archive" style={{}} size={20} color="orange" />
					<Text style={{color:ColorCode,fontSize:12}}>Sırala</Text>

					{this.state.siralad==3&&
						<View style={{backgroundColor:'#333',padding:5,borderRadius:10,position: Platform.OS=='ios'?'absolute':null,left:Platform.OS=='ios'?0:0,bottom:Platform.OS=='ios'?-30:null,zIndex:1000,marginLeft:5}}><Text style={{color:ColorCode,fontSize:10}}>(A-Z)</Text></View>
					}
				{this.state.siralad==4&&
						<View style={{backgroundColor:'#333',padding:5,borderRadius:10,position: Platform.OS=='ios'?'absolute':null,left:Platform.OS=='ios'?0:0,bottom:Platform.OS=='ios'?-30:null,zIndex:1000,marginLeft:5}}><Text style={{color:ColorCode,fontSize:10}}>(Z-A)</Text></View>
				}
				{this.state.siralad==1&&
						<View style={{backgroundColor:'#333',padding:5,borderRadius:10,position: Platform.OS=='ios'?'absolute':null,left:Platform.OS=='ios'?0:0,bottom:Platform.OS=='ios'?-30:null,zIndex:1000,marginLeft:5}}><Text style={{color:ColorCode,fontSize:10}}>(Fiyat Artan)</Text></View>
				}
				{this.state.siralad==2&&
						<View style={{backgroundColor:'#333',padding:5,borderRadius:10,position: Platform.OS=='ios'?'absolute':null,left:Platform.OS=='ios'?0:0,bottom:Platform.OS=='ios'?-30:null,zIndex:1000,marginLeft:5}}><Text style={{color:ColorCode,fontSize:10}}>(Fiyat Azalan)</Text></View>
				}



					</View>
					</TouchableOpacity>




					<TouchableOpacity onPress={()=>{this.setState({filtrele:true})}}  style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

					<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

					<EnIcon name="sound-mix" style={{}} size={20} color="orange" />
					<Text style={{color:ColorCode,fontSize:12}}>Filtrele</Text>


					{this.state.filtreled !=='' &&
						<View style={{backgroundColor:'#333',padding:5,borderRadius:10,position: Platform.OS=='ios'?'absolute':null,right:Platform.OS=='ios'?0:0,bottom:Platform.OS=='ios'?-30:null,zIndex:1000,marginLeft:5}}><Text style={{color:ColorCode,fontSize:10}}>{this.state.filtreled}</Text></View>


					}
					</View>
					</TouchableOpacity>
					</View>
			}

			{this.state.sirala &&
					<View style={{backgroundColor:'#333', width:Dimensions.get('window').width,height:50,justifyContent:'space-between',flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:0}}>

					<TouchableOpacity onPress={()=>this.setState({sirala:false})} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginRight:10}}>

					<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
					<EnIcon name="chevron-left" style={{}} size={20} color="orange" />

					</View>
					</TouchableOpacity>


					<TouchableOpacity onPress={()=>{this.setState({sirala:false,siralad:3},function(){ this.setcat(this.props.navigation.state.params.selectedcat,null)})}}  style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
					<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

					<EnIcon name="text" style={{}} size={20} color="orange" />
					<Text style={{color:ColorCode,fontSize:12}}>A-Z</Text>
					</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={()=>{this.setState({sirala:false,siralad:4},function(){this.setcat(this.props.navigation.state.params.selectedcat,null)})}}   style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

					<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

					<EnIcon name="text" style={{}} size={20} color="orange" />
					<Text style={{color:ColorCode,fontSize:12}}>Z-A</Text>
					</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>{this.setState({sirala:false,siralad:2},function(){this.setcat(this.props.navigation.state.params.selectedcat,null)})}}  style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

					<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
					<EnIcon name="text" style={{}} size={20} color="orange" />
					<Text style={{color:ColorCode,fontSize:12}}>Fiyat Azalan</Text>
					</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={()=>{this.setState({sirala:false,siralad:1}, function(){this.setcat(this.props.navigation.state.params.selectedcat,null)})}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

					<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
					<EnIcon name="text" style={{}} size={20} color="orange" />
					<Text style={{color:ColorCode,fontSize:12}}>Fiyat Artan</Text>
					</View>
					</TouchableOpacity>



					</View>

			}

			{this.state.filtrele && this.state.brands &&
					<View style={{backgroundColor:'#333', width:Dimensions.get('window').width,height:50,justifyContent:'space-between',flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:0}}>

					<TouchableOpacity onPress={()=>this.setState({filtrele:false})} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginRight:10}}>

					<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
					<EnIcon name="chevron-left" style={{}} size={20} color="orange" />

					</View>
					</TouchableOpacity>

					<FlatList
				horizontal={true}
				onEndReachedThreshold={1}
				data={this.state.brands}
				renderItem={({ item }) => (

					<TouchableOpacity onPress={()=>this.setState({filtrele:true,filtreled: this.state.filtreled.indexOf(item)>-1 ? (
						this.state.filtreled.replace(item+',', '') ): (this.state.filtreled += item+','),[item]:!this.state[item] },function(){ this.setcat('a',null)})} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginRight:10}}>

					<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',fontWeight:this.state[item]?'800':null}}>
					<Text style={{color:ColorCode,fontSize:12,fontWeight:this.state[item]?'800':null}}>{item}</Text>
					</View>
					</TouchableOpacity>


				)}
					/>


					</View>

			}
			{this.state.gorunum &&
					<View style={{backgroundColor:'#eee', width:Dimensions.get('window').width,height:50,justifyContent:'space-between',flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:0}}>


					</View>

			}





			{this.state.categorydata && (
				<FlatList

				onEndReachedThreshold={1}
				style={{ height: Dimensions.get('window').height - 70 }}
				onEndReached={({ distanceFromEnd }) =>
					this.workerforpager(this.state.pager + 1)
				}
				data={this.state.categorydata}
				// style={{height:Dimensions.get('window').height}}
				renderItem={({ item }) => (
					<TouchableOpacity
					style={{ alignItems: 'center' }}
					onPress={() =>
						this.setState({loading:false},function(){
							this.props.navigation.navigate('ProductDetail', {
								name: item.Idd,
								token: this.state.token,
							});


						})
					}>
					<View
					style={{
						flexDirection: 'row',
							alignItems: 'center',
							textAlign: 'left',
							backgroundColor: 'white',
					}}>
					<Image defaultSource={require('./noimage.jpg')}
					style={{
						flex: 0.3,
							height: 100,
							width: Dimensions.get('window').width,
					}}
					resizeMode={'contain'}
					source={{ uri: 'https:' + item.Id }}
					/>
					<View
					style={{
						flex: 0.7,
						backgroundColor: 'white',
							flexDirection: 'column',
							padding: 10,
							justifyContent: 'center',
							textAlign: 'left',
					}}>
					<Text
					style={{
						//fontSize: 16,
						fontWeight: 'bold',
							textAlign: 'left',
					}}>
					 {item.Name} {item.Model}
					</Text>
					<Text style={{ fontSize: 12, fontWeight: '100' }}>
					{item.Brand}
					</Text>
					<Text
					style={{
						fontFamily:
						Platform.OS == 'android' ? 'Roboto-Thin' : null,
							fontSize: 20,
							fontWeight: '800',
							color: '#888',
					}}>
					{item.Price} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
					</Text>

					<View
					style={{
						backgroundColor: 'white',
							width: 115,
							height: 25,
							borderRadius: 5,
							alignItems: 'center',
							justifyContent: 'center',
					}}
					/>
					<Text style={{ fontWeight: '200' }} />
					</View>
					</View>
					</TouchableOpacity>
				)}
				/>
			)}

			{this.state.loading && (
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

			<View style={{ height: 50 }}>
			<Text
			style={{
				fontSize: 10,
					fontWeight: '100',
					alignItems: 'center',
					textAlign: 'center',
					fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,
			}}>
			© 2018 Interlink All Rights Reserved.{'\n'}Powered by Interlink
			</Text>
			</View>
			</View>
			</Drawer>
		);
	}
}

class CarRentalScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: '',
			loading: false,
			showurun: true,
			urunozellikleri: true,
		};
	}
	static navigationOptions = {
		title: 'ProductDetail',
		//header: null,
		//headerStyle: { paddingTop: 0,backgroundColor:'yellow' }
	};
	componentDidMount() {
		fetch(API_URL+'/customer/CustomerId', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: 'CategoryId='+this.state.ddd[0].Id+'&Keywords=&OrderBy=&BrandName=&PriceMin=0&PriceMax=1000&P1=0&P2=100',
		})
			.then(response => {
				const statusCode = response.status;
				// alert(statusCode)
				return response.json();
			})
			.then(response => {
				this.setState({ loading: false, userid: response.ResultMessage });
			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				// //alert(error);
			});
	}
	render() {
		const { navigate } = this.props.navigation;
		//	alert(JSON.stringify(this.props.navigation.state.params.name))
		return (
			<View
			style={{
				flexDirection: 'column',
					backgroundColor: 'white',
					width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
			}}>
			<ScrollView
			style={{
				width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
			}}>
			{this.state.loading && (
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
			<View
			style={{
				flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
			}}>
			<TouchableOpacity
			style={{ marginTop: 30, width: 40, height: 40 }}
			onPressIn={() => this.props.navigation.pop()}>
			<EIcon name="chevron-left" size={30} color="black" />
			</TouchableOpacity>

			<View
			style={{
				width: Dimensions.get('window').width / 1.3,
					justifyContent: 'center',
					alignItems: 'center',
			}}>
			<Text
			style={[
				iOSUIKit.bodyEmphasized,
				{ marginTop: 30, fontSize: 16, textAlign: 'left' },
			]}>
			Enterprise Araç Kiralama
			</Text>
			</View>
			</View>

			<View
			style={{
				alignItems: 'center',
					backgroundColor: 'white',
					justifyContent: 'center',
			}}>
			<Lightbox
			swipeToDismiss={true}
			underlayColor="white"
			backgroundColor="white"
			renderHeader={() => {
				return (
					<Text style={{ padding: 5, textAlign: 'center' }}>
					kapatmak için kaydırın
					</Text>
				);
			}}
			renderContent={() => {
				return (
					<Image defaultSource={require('./noimage.jpg')}
					style={{ flex: 1 }}
					resizeMode="contain"
					source={{
						uri: 'https://img.kurumsalb2c.com/products/71150.png',
					}}
					/>
				);
			}}>
			<Image defaultSource={require('./noimage.jpg')}
			source={{
				uri: 'https://img.kurumsalb2c.com/products/71150.png',
			}}
			style={{ width: 200, height: 200, margin: 10 }}
			resizeMode={'cover'}
			/>
			</Lightbox>
			<Text
			style={{
				fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,
					fontWeight: '100',
					fontSize: 20,
					color: 'black',
					// paddingLeft: 30,
					textAlign: 'left',
					paddingBottom: 20,
			}}
			/>
			</View>

			{this.state.product.ProductOptions === null ? (
				<View />
			) : (
				<View
				style={{
					backgroundColor: 'white',
						marginLeft: 10,
						marginRight: 10,
						marginTop: 0,
						height: 100,
						width: 200,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 5,
				}}>
				<View style={{ flexDirection: 'column', height: 0 }}>
				<Text
				style={{
					fontWeight: '100',
						fontSize: 18,
						// paddingRight: 30,
						textAlign: 'left',
						color: 'black',
				}}>
				Ürün seçenekleri
				</Text>

				{this.state.product.ProductOptions && ( //#ffc845
					<FlatList
					horizontal
					data={this.state.product.ProductOptions.Options}
					renderItem={({ item }) => (
						<TouchableOpacity
						onPressIn={() =>
							this.props.navigation.navigate('ProductDetail', {
								token: this.props.navigation.state.params.token,
								name: item.ProductId,
							})
						}
						underlayColor="#02adef"
						style={{
							borderColor: ColorCode,
								borderWidth: 2,
								borderRadius: 5,
								alignItems: 'center',
								justifyContent: 'center',
								paddingLeft: 20,
								paddingRight: 20,
								margin: 9,
								backgroundColor:
							this.state.product.ProductOptions.Options[0]
								.OptionName === item.OptionName
								? ColorCode
								: 'white',
						}}>
						<View
						style={{
							alignItems: 'center',
								justifyContent: 'center',
						}}>
						<Text
						style={{
							color:
							this.state.product.ProductOptions.Options[0]
								.OptionName === item.OptionName
								? 'white'
								: ColorCode,
						}}>
						{item.OptionName}
						</Text>
						</View>
						</TouchableOpacity>
					)}
					/>
				)}
				</View>
				</View>
			)}

			<View
			style={{
				flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 0,
					marginLeft: 2,
					marginRight: 2,
			}}>
			<TouchableOpacity
			onPressIn={() =>
				this.setState({
					showurun: true,
					showtaksit: false,
					urunozellikleri: true,
					taksitsecenekleri: false,
				})
			}
			style={{
				backgroundColor:
				this.state.urunozellikleri == true ? 'white' : 'white',
					flex: 1,
					borderTopLeftRadius: 5,
					alignItems: 'center',
					justifyContent: 'center',
					padding: 6,
			}}>
			<Text
			style={{
				fontWeight: '100',
					color: 'black',
					justifyContent: 'center',
					fontSize: 18,
			}}>
			Ürün Özellikleri
			</Text>
			</TouchableOpacity>
			{this.state.taksitsecenekleri && (
				<TouchableOpacity
				onPressIn={() =>
					this.setState({
						showurun: false,
						showtaksit: true,
						urunozellikleri: false,
						taksitsecenekleri: true,
					})
				}
				style={{
					flex: 0.5,
						backgroundColor:
					this.state.taksitsecenekleri == true ? ColorCode : 'white',
						borderTopRightRadius: 5,
						alignItems: 'center',
						justifyContent: 'center',
						padding: 6,
				}}>
				<Text
				style={{
					fontWeight: '700',
						color: 'black',
						justifyContent: 'center',
				}}>
				Taksit seçenekleri
				</Text>
				</TouchableOpacity>
			)}
			</View>
			{this.state.showurun && (
				<View
				style={{
					backgroundColor: 'white',
						marginLeft: 2,
						marginRight: 2,
				}}>
				<Text
				style={[
					iOSUIKit.caption2,
					{ paddingLeft: 20, fontWeight: '200', color: 'black' },
				]}>
				Dünyanın en büyük araç kiralama şirketi Enterprise'ın
				Türkiye'deki tüm araçlarını ücretsiz olarak hediye puanlarınızla
				kiralayabilirsiniz.
				</Text>
				</View>
			)}

			{this.state.showtaksit && (
				<FlatList
				style={{
					marginLeft: 20,
						backgroundColor: 'white',
						marginLeft: 2,
						marginRight: 2,
						padding: 20,
				}}
				data={this.state.product.Installments}
				renderItem={({ item }) => (
					<View
					style={{
						flexDirection: 'column',
							borderWidth: 0.5,
							borderColor: '#ddd',
							margin: 2,
					}}>
					<Text style={{ fontWeight: '100', padding: 10 }}>
					{item.Bank}
					</Text>

					<View style={{ flexDirection: 'column' }}>
					<View
					style={{
						flexDirection: 'row',
							justifyContent: 'space-between',
					}}>
					<Text
					style={{
						fontSize: 10,
							fontWeight: '800',
							color: ColorCode,
					}}>
					Taksit sayısı:
					</Text>
					<Text
					style={{
						fontSize: 10,
							paddingRight: 15,
							fontWeight: '800',
							color: ColorCode,
					}}>
					Taksit miktarı:
					</Text>
					<Text
					style={{
						fontSize: 10,
							fontWeight: '800',
							color: ColorCode,
					}}>
					Toplam:
					</Text>
					</View>
					<FlatList
					data={item.Options}
					renderItem={({ item }) => (
						<View
						style={{
							flexDirection: 'row',
								justifyContent: 'space-between',
								paddingTop: 11,
						}}>
						<Text style={{ fontSize: 10, paddingLeft: 15 }}>
						{item.Installment}{' '}
						</Text>
						<Text style={{ fontSize: 10, paddingLeft: 15 }}>
						{item.Amount} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}{' '}
						</Text>
						<Text style={{ fontSize: 10 }}>
						{item.Total} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
						</Text>
						</View>
					)}
					/>
					</View>
					</View>
				)}
				/>
			)}

			<View style={{ height: 100 }} />
			</ScrollView>
			{this.state.userid && (
				<View
				style={{
					height: this.state.product.ProductOptions === null ? 50 : 50, //değişti 50:80di
						width: Dimensions.get('window').width,
						backgroundColor: ColorCode,
						borderTopWidth: 0.5,
						borderColor: ColorCode,
						marginBottom: Platform.OS === 'ios' ? 0 : 0,
						bottom: 0,
						position: 'absolute',
						//opacity:0.8
				}}>
				<TouchableOpacity
				underlayColor="black"
				onPress={() => {
					Linking.canOpenURL(
						'http://kurumsalb2c.com/enterprise/home/index/b2cL8t82ku2e/' +
						this.state.userid
					).then(supported => {
						if (supported) {
							Linking.openURL(
								'http://kurumsalb2c.com/enterprise/home/index/b2cL8t82ku2e/' +
								this.state.userid
							);
						} else {
							alert('hata');
						}
					});
				}}
				style={{ height: 50, width: Dimensions.get('window').width }}>
				<View
				style={{
					flexDirection: 'row',
						backgroundColor: '#00a98f',
						height: 50,
						alignItems: 'center',
						justifyContent: 'center',
				}}>
				<View
				style={{
					backgroundColor: '#00a98f',
						paddingRight: 20,
						paddingLeft: 20,
				}}
				/>

				<View style={{ flexDirection: 'row', paddingRight: 20 }}>
				<Text
				style={{ fontWeight: '400', color: 'white', padding: 5 }}>
				Araç Kirala
				</Text>
				</View>
				</View>
				</TouchableOpacity>
				</View>
			)}
			</View>
		);
	}
}

class ProductDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: '',
			loading: false,
			showurun: true,
			urunozellikleri: true,
			drawerheight:null,puant:true,hideplaceholder:true
		};
	}
	static navigationOptions = {
		title: 'ProductDetail',
		//header: null,
		//headerStyle: { paddingTop: 0,backgroundColor:'yellow' }
	};
	_configureTransition(transitionProps, prevTransitionProps) {
		return {
			// duration in milliseconds, default: 250
			duration: 2500,
			// An easing function from `Easing`, default: Easing.inOut(Easing.ease)
			easing: Easing.bounce,
		}
	}
	categorylist(){

		fetch(API_URL+'/catalog/list/', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'Id=',
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				//	alert(JSON.stringify(response))
				var categories = [];
				var subcategories = [];
				var fruitsc=[]

				for (var i = 0; i < response.length; i++) {
					fruitsc.push({
						ParentCategory: response[i].ParentCategory.Id,
						Name: response[i].ParentCategory.Name,
						Category: response[i].Category,
					});
				}
				//   alert(JSON.stringify(fruitsc))

				this.setState({ dddc: fruitsc });
			})



	}

	componentDidMount() {
			var a=0
		setInterval( () => {
			a++
			if(a<SLOW_NETWORK_T+2){a++;

		 this.setState({
	      appstart:a
      })

		}else{


		}

        },1000)

				const didBlurSubscriptionproduct = this.props.navigation.addListener(
			'didFocus',
			payload => {
				//alert('didFocus');
				this.productcount()
			}
		);

		this.setState({ loading: true,token:this.props.navigation.state.params.token });
		//this.productcount();
		this.categorylist()
		fetch(
			API_URL+'/product/detail/' +
			this.props.navigation.state.params.name,
			{
				method: 'GET', timeout: 1000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					'Content-Type': 'application/x-www-form-urlencoded',
				},

			}
		)
			.then(response => {
				const statusCode = response.status;
				// alert(statusCode)
				return response.json();
			})
			.then(response => {
			//	alert(JSON.stringify(response))

				this.setState({ product: response ,options:response.ProductOptions});
				var fruits = [];
				this.setState({ loading: false });
			})
			.catch(error => {
			//	this.props.navigation.navigate('Splash')
			});
	}

	setcat(a, b) {
		var self = this;
		const { navigate } = self.props.navigation;

		//	alert(a)
		this.drawer.closeDrawer();
		//
		self.setState({ selectedcat: a, loading: true });
		var fruitsc = [];
		var fruits = [];
		fetch(API_URL+'/catalog/list/', {
			method: 'POST', timeout: 1000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: 'Id=' + a,
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
				//alert(JSON.stringify(response))
				for (var i = 0; i < response.length; i++) {
					fruitsc.push({ Id: response[i].Id, Name: response[i].Name });
				}
				if (response.length > 0) {
					//	this.setState({ dddc: fruitsc })
				} else {
					this.drawer.closeDrawer();
				}

				fetch(API_URL+'/product/list/', {
					method: 'POST', timeout: 20000,
					headers: {
						Authorization: 'Bearer ' + this.props.navigation.state.params.token,
						'Content-Type': 'application/x-www-form-urlencoded',
					},

					body:
					'CategoryId=' +
					a +
					'&Keywords=&OrderBy=0&BrandName=&PriceMin=&PriceMax=&P1=0&P2=100',
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
						//alert(this.state.ddd[0].Id),
						//	alert(JSON.stringify(response))
						//alert('asdasdadsad')
						fruits = [];
						for (var i = 0; i < response.Products.length; i++) {
							fruits.push({
								Idd: response.Products[i].Id,
								Id: response.Products[i].Image,
								Name: response.Products[i].Name,
								Price: response.Products[i].Price,
								Brand: response.Products[i].Brand,
								Model:response.Products[i].Model,
							});
						}
						//	alert(fruits)
						this.setState({ ddd: fruits, loading: false });
						this.props.navigation.navigate('CategoryDetail', {
							token: this.state.token,
							categorydata: fruits,
							categoryname: b,
							categoryid: a,
							token: this.state.token,
							selectedcat: a,
						});
					})
					.catch(error => {
			//	this.props.navigation.navigate('Splash')

						// //alert(error);
					});
			})
			.catch(error => {
			//	this.props.navigation.navigate('Splash')

				// //alert(error);
			});
	}

	addtocart() {
		this.setState({ loading: true });

		fetch(
			API_URL+'/shoppingcart/add-item/' +
			this.props.navigation.state.params.name,
			{
				method: 'POST', timeout: 1000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				//	body: 'CategoryId='+this.state.ddd[0].Id+'&Keywords=&OrderBy=&BrandName=&PriceMin=0&PriceMax=1000&P1=0&P2=100',
			}
		)
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
				Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 }).then(realm => {
					//alert("Language is: "+lange);
					let updt = realm.objects('Uyeler');
					realm.write(() => {
						updt[0].sepet = updt[0].sepet + 1;
					});

					//  alert("Language is: "+updt[0].sepet);
				});

				// alert(response.ResultMessage);
				this.setState({ loading: false });
				this.props.navigation.navigate('MyCart', {
					token: this.props.navigation.state.params.token,
				});
			})
			.catch(error => {
			//	this.props.navigation.navigate('Splash')
				////alert(error);
			});
	}

	productcount() {
		fetch(API_URL+'/shoppingcart/cart-count/', {
			method: 'GET', timeout: 1000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
				Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 }).then(realm => {
					//alert("Language is: "+lange);
					let updt = realm.objects('Uyeler');
					realm.write(() => {
						updt[0].sepet = response.CartCount;
					});

					//  alert("Language is: "+updt[0].Language);
				});

				this.setState({ productcount: response.CartCount });
				if(response.ResultMessage=='No Authorization'){
					const resetAction = NavigationActions.reset({
									index: 0,
									actions: [NavigationActions.navigate({ routeName: 'Home' })],
								});

								this.props.navigation.dispatch(resetAction);
					return
				}
				//alert(JSON.stringify(response.ResultMessage))
			})
			.catch(error => {
				const resetAction = NavigationActions.reset({
								index: 0,
								actions: [NavigationActions.navigate({ routeName: 'Home' })],
							});

							this.props.navigation.dispatch(resetAction);
				return
						Alert.alert(
  'Bağlantı',
  'Bağlantınız çok yavaş, lütfen bağlantınızı kontrol edin.',
  [
    {text: 'Tekrar Dene', onPress: () => {
    const resetAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Splash' })],
					});

					this.props.navigation.dispatch(resetAction);

    }},

  ],
  { cancelable: true }
)

				//this.props.navigation.navigate('Splash');
				});
	}

	render() {
			if(this.state.hideplaceholder==true&&  this.state.loaderr==true){
	this.setState({loaderr:false,appstart:0})
		}

	if(this.state.appstart >SLOW_NETWORK_T && this.state.hideplaceholder==false){
	this.setState({loaderr:true,appstart:0})
	}


		var drawerContent = (
			<View
			style={{
				backgroundColor: '#222222',
					flex: 1,
					zIndex: 300,
					marginTop:
				Platform.OS == 'android' && this.state.blacked == true ? 0 : 0,
			}}>
			<View style={{}} />
			<View style={{}}>
			<View>
			<TouchableHighlight  onPress={()=>{drawerContent=null;
				this.props.navigation.navigate('Proje', {
					token:this.props.navigation.state.params.token,
				})

			}
			}
			style={{ marginTop: 50, paddingLeft: 15, position: 'absolute' }}>
			<Text
			style={{ color: ColorCode, fontSize: 20, fontWeight: '400' }}>
			AnaSayfa
			</Text>
			</TouchableHighlight>
			</View>

			<View>
			<TouchableHighlight
			style={{ marginTop: 80, paddingLeft: 20, position: 'absolute' }}
			onPressIn={() =>
				this.props.navigation.navigate('Neisterseniz', {
					token: this.state.token,
				})
			}>
			<Text style={{ color: ColorCode, fontWeight: '400' }}>
			Ne İsterseniz
			</Text>
			</TouchableHighlight>
			</View>
			<View>
			<TouchableHighlight
			style={{ marginTop: 100, paddingLeft: 20, position: 'absolute' }}
			onPressIn={() =>
				this.props.navigation.navigate('Search', {
					token: this.state.token,
					setmax: this.state.totalpoint,
					setmin: 0,
				})
			}>
			<Text style={{ color: ColorCode, fontWeight: '400' }}>
			Puanıma Uygun Ürünler
			</Text>
			</TouchableHighlight>
			</View>

			<View style={{ marginTop: 130 }}>
			<FlatList
			style={{ marginBottom: 20 }}
			data={this.state.dddc}
			renderItem={({ item }) => (
				<View>
				<TouchableHighlight underlayColor="orange"
				style={{ margin: 1, padding: 3 }}
				underlayColor={ColorCode}
				onPress={() => {
					if (item.Name == 'Araç Kiralama') {
						this.props.navigation.navigate('CarRental', {
							token: this.state.token,
						});
						return;
					}
					if (item.Category.length == 0) {
						this.setcat(item.ParentCategory, item.Name);
						return;
					}
					//	  if(this.state[item.ParentCategory])return;
					//  alert(item.ParentCategory.length)

					this.setState({
						[item.ParentCategory]: !this.state[item.ParentCategory],
						ac: false, //[item.ParentCategory+'cm']:0,
						[item.ParentCategory + 'cm']:
						item.ParentCategory.length *
						(Platform.OS == 'ios' ? 25 : 30),
					});
				}}>
				<View
				style={{
					flexDirection: 'row',
						justifyContent: 'space-between',
				}}>
				<Text
				style={{
					color: '#fdfdfd',
						//fontSize: 20,
						fontWeight: '400',
						paddingLeft: 15,
				}}>
				{item.Name}
				</Text>
				{item.Category.length > 0 && (
					<Icon
					name="angle-down"
					size={20}
					color="gray"
					style={{ marginRight: 15 }}
					/>
				)}
				</View>
				</TouchableHighlight>
				<View>
				{this.state[item.ParentCategory] && (
					<FlatList
					data={item.Category}
					style={{ marginBottom: 0 }}
					renderItem={({ item }) => (
						<View style={{ marginLeft: 10 }}>
						<TouchableHighlight underlayColor="orange"
						style={{ margin: 1, padding: 3 }}
						underlayColor={ColorCode}
						onPress={() => {
							if (item.SubCategory.length > 0) {
								this.setState({
									[item.SubCategory]: !this.state[
										item.SubCategory
									],
									ac: true,
									uzunluk:
									item.SubCategory.length *
									(Platform.OS == 'ios' ? 25 : 30),
								});
							} else {
								this.setcat(item.Id, item.Name);
							}
						}}>
						<View>
						<View
						style={{
							flexDirection: 'row',
								justifyContent: 'space-between',
						}}>
						<Text
						style={{
							color: '#fdfdfd',
								//fontSize: 20,
								fontWeight: '400',
								paddingLeft: 15,
						}}>
						{item.Name}
						</Text>
						{item.SubCategory.length > 0 && (
							<Icon
							name="angle-down"
							size={20}
							color="gray"
							style={{ marginRight: 15 }}
							/>
						)}
						</View>
						<View>
						{item.SubCategory && (
							<View
							style={{
								height:
								item.SubCategory.length > 0 &&
									this.state.ac &&
									this.state[item.SubCategory]
									? item.SubCategory.length *
									(Platform.OS == 'ios' ? 25 : 30)
									: 0,
							}}>
							<FlatList
							style={{ marginBottom: 0 }}
							data={
								item.SubCategory
								? item.SubCategory
								: null
							}
							renderItem={({ item }) => (
								<View style={{ marginLeft: 10 }}>
								<TouchableHighlight underlayColor="orange"
								style={{ margin: 1, padding: 3 }}
								underlayColor={ColorCode}
								onPress={() =>
									this.setcat(item.Id, item.Name)
								}>
								<View
								style={{
									flexDirection: 'row',
										justifyContent:
									'space-between',
								}}>
								<Text
								style={{
									color: '#fdfdfd',
										//fontSize: 20,
										fontWeight: '400',
										paddingLeft: 15,
								}}>
								{item.Name}
								</Text>
								{false && (
									<Icon
									name="angle-right"
									size={20}
									color="gray"
									style={{ marginRight: 15 }}
									/>
								)}
								</View>
								</TouchableHighlight>
								<View />
								</View>
							)}
							/>
							</View>
						)}
						</View>
						</View>
						</TouchableHighlight>
						<View />
						</View>
					)}
					/>
				)}
				</View>
				</View>
			)}
			/>
			</View>
			</View>
			</View>
		);
		var customStyles = {
			drawer: {
				shadowColor: '#000',
				shadowOpacity: 0.4,
				shadowRadius: 10,
			},
			mask: {}, // style of mask if it is enabled
			main: {}, // style of main board<D-0><D==
		};




		const { navigate } = this.props.navigation;
		//	alert(JSON.stringify(this.props.navigation.state.params.name))
		//
		//

		return (
			<View
			style={{
				flexDirection: 'column',
					backgroundColor: 'white',
					width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
			}}>
			{true&&
				<StatusBar
				backgroundColor={'black'}
				translucent={false}
				barStyle="light-content"
				/>
			}

			{this.state.puant&&false&&
					<KeyboardAvoidingView behavior="padding" style={{margin:5,position:'absolute',zIndex:100,borderRadius:50,bottom:100,borderColor:'#333',height:150,width:Dimensions.get('window').width,backgroundColor:'#00a4e4',elevation:2,alignItems:'center',justifyContent:'center',width:Dimensions.get('window').width-20,elevation:2,alignItems:'center',justifyContent:'center'}}>

					<Text style={{color:'white'}}>Uygulamamızı değerlendirmek ister misiniz?</Text>

					<TextInput label="görüş ve önerileriniz.." style={{width:Dimensions.get('window').width-20,color:'white'}}
					/><View style={{flexDirection:'row'}}>

					<Text style={{color:'white'}} onPress={()=>this.setState({puant:false})}>Hayır, Daha sonra...</Text>
					<Text style={{color:'white',marginLeft:10}} onPress={()=>this.setState({puant:false})}>Gönder</Text>
					</View>
					</KeyboardAvoidingView>



			}


			<Drawer
			disabled={this.state.drawerdisabled}
			style={{ zIndex: 200,height:this.state.drawerheight }}
			drawerWidth={250}
			drawerContent={drawerContent}
			type={Drawer.types.Default}
			customStyles={{ drawer: styles.drawer }}
			drawerPosition={Drawer.positions.Left}
			onDrawerOpen={() => {
				console.log('Drawer is opened');
			}}
			onDrawerClose={() => {
				console.log('Drawer is closed');
			}}
			easingFunc={Easing.ease}
			ref={ref => (this.drawer = ref)}>
	{this.state.loaderr&&<View style={{backgroundColor:'red',opacity:.9,width:Dimensions.get('window').width,height:Platform.OS=='ios'?100:null,position:'absolute',elevation:100,zIndex:1000,padding:20,top:Dimensions.get('window').height/2 - 50}}><Text style={{color:'white',fontSize:20,fontWeight:'800',textAlign:'center',marginBottom:10}}>Bağlantınız yavaş, Tekrar deneniyor...</Text><Button mode="contained" color="gray" onPress={()=>{

this.props.navigation.navigate('ProductDetail',{name:this.props.navigation.state.params.name,token:this.props.navigation.state.params.token})



		}}>Tekrar Bağlan</Button></View>}


			{false&&


				<Button icon={this.state.eklendi==true ?"check":"add"} mode="contained"

				style={{position:'absolute',bottom:40,width:Dimensions.get('window').width-40,backgroundColor:this.state.eklendi==true ? '#7ac143':ColorCode,zIndex:300,left:20}}
				onPress={() => {this.addtocart();this.setState({eklendi:true})}}>{this.state.eklendi==true ? 'Eklendi':'Sepete Ekle'}</Button>





			}






			<Appbar.Header style={{backgroundColor:'black',zIndex:1000,width:Dimensions.get('window').width,}} dark={true} statusBarHeight={Platform.OS=='ios'?20:0} >
			<Appbar.BackAction onPress={()=>this.props.navigation.pop()}/>

			<Appbar.Action icon="menu" onPress={()=>this.drawer.openDrawer()} />

			<Appbar.Content title="Ürün" subtitle={typeof this.state.product.Brand !== 'undefined' && this.state.product.Brand +
				' ' +
				this.state.product.Model +
				' ' +
				this.state.product.Name}/>

			<Appbar.Action icon="share" onPress={()=>{setTimeout(() => {Share.open(Object.assign(shareOptions, {"title": 'Paylaş',"url": 'https://kurumsalb2c.com/B2C/product/'+this.state.product.Id,"social": Share.Social.EMAIL}))},300)}}  />

			</Appbar.Header>
	{!this.state.hideplaceholder &&<PlaceholderExample/>}

			<ScrollView
			onScrollBeginDrag={() => this.setState({ setorange: true })}
			style={{
				width: Dimensions.get('window').width,
					height: this.state.hideplaceholder?Dimensions.get('window').height:0,
			}}>


<View style={{position:this.state.hideplaceholder?null:'absolute',bottom:this.state.hideplaceholder?null:-1000,
					height: this.state.hideplaceholder?null:0,
}}>









			<View
			style={{
				alignItems: 'center',
					backgroundColor: 'white',
					justifyContent: 'center',
			}}>
			{typeof this.state.product.Brand !== 'undefined' && (
				<View
				style={{
					width: Dimensions.get('window').width / 1.5,
						justifyContent: 'center',
						alignItems: 'center',
				}}>
				<Text numberOfLines={3}
				style={[
					iOSUIKit.bodyEmphasized,
					{ marginTop: Platform.OS=='ios'?10:5, fontSize: Platform.OS==='ios'?20:20, textAlign: 'left',color:'black' },
				]}>
				{this.state.product.Brand +
					' ' +
					this.state.product.Model +
					' ' +
					this.state.product.Name}
				</Text>
				</View>
			)}

			<Lightbox
			swipeToDismiss={true}
			underlayColor="white"
			backgroundColor="white"
			renderHeader={() => {
				return (
					<Text style={{ padding: 5, textAlign: 'center' }}>
					kapatmak için kaydırın
					</Text>
				);
			}}
			renderContent={() => {
				return (
					<Image defaultSource={require('./noimage.jpg')}
					style={{ flex: 1 }}
					resizeMode="contain"
					source={{ uri: 'https:' + this.state.product.Image }}
					/>
				);
			}}>


			<Image defaultSource={require('./noimage.jpg')} onLoad={(e)=>this.setState({hideplaceholder:true})}
			source={{ uri: 'https:' + this.state.product.Image }}
			style={{ width: 200, height: 200, margin: 10 }}
			resizeMode={'cover'}
			/>
			</Lightbox>
			<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

			<View style={{width:150}}>
			<Text
			style={{
				fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,
					fontWeight: '100',
					fontSize: 14,
					color: 'black',
					// paddingLeft: 30,
					textAlign: 'left',
					paddingBottom: 0,
			}}>
			{ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Size Özel Puanı:':'PromoClub Fiyatı'}</Text>

			<Text
			style={{
				fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,
					fontWeight: '800',
					fontSize: 20,
					color: 'black',
					// paddingLeft: 30,
					textAlign: 'left',
					paddingBottom: 0,
			}}>{this.state.product.Price} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}</Text>
			</View>




	{true&&


				<Button icon={this.state.eklendi==true ?"check":"add"} mode="contained"

				style={{width:150,backgroundColor:this.state.eklendi==true ? '#7ac143':ColorCode,zIndex:300,}}
				onPress={() => {this.addtocart();this.setState({eklendi:true})}}>{this.state.eklendi==true ?  'Eklendi':'Sepete Ekle'}</Button>





			}

					</View>

	{!this.state.product.ProductOptions  || !this.state.product ? (
				<View />
			) : (<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>

			<FlatList    numColumns={3}
style={{marginLeft:10}} data={this.state.product.ProductOptions.Options}
		renderItem={({item})=>(
			<View style={{flexDirection:'row',margin:10}}>
			<TouchableOpacity style={{flexDirection:'row'}} onPress={() => {
this.props.navigation.navigate('ProductDetail', {
	name: item.ProductId,
	token: this.state.token,
})
			}} >
			{ (item.ProductId!==this.props.navigation.state.params.name) ?
				<View style={{width:100,height:45,borderRadius:5,alignItems:'center',borderWidth:1,justifyContent:'center',borderColor:'gray'}}>
<Text style={{marginLeft:2}} onPress={() => {
this.props.navigation.navigate('ProductDetail', {
	name: item.ProductId,
	token: this.state.token,
})
			}} >{item.OptionName}</Text>
				</View>:
				<View style={{width:100,height:45,alignItems:'center',justifyContent:'center',borderWidth:2,borderRadius:5,borderColor:'black'}}>
				<Text style={{marginLeft:2}} onPress={() => {
this.props.navigation.navigate('ProductDetail', {
	name: item.ProductId,
	token: this.state.token,
})
			}} >{item.OptionName}</Text>
				</View>}

			</TouchableOpacity>
			

			</View>


		)}	 
		/>	
			</View>)}


			</View>

		

			<View
			style={{
				flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 0,
					marginLeft: 0,
					marginRight: 0,
			}}>
			<TouchableOpacity
			onPressIn={() =>
				this.setState({
					showurun: true,
					showtaksit: false,
					urunozellikleri: true,
					taksitsecenekleri: false,
				})
			}
			style={{
				backgroundColor:
				this.state.urunozellikleri == true ? 'white' : 'white',
					flex: 1,
					borderTopLeftRadius: 5,
					alignItems: 'center',
					justifyContent: 'center',
					padding: 6,
			}}>
			<Title
			>
			Ürün Özellikleri
			</Title>
			</TouchableOpacity>
			{this.state.taksitsecenekleri && (
				<TouchableOpacity
				onPressIn={() =>
					this.setState({
						showurun: false,
						showtaksit: true,
						urunozellikleri: false,
						taksitsecenekleri: true,
					})
				}
				style={{
					flex: 0.5,
						backgroundColor:
					this.state.taksitsecenekleri == true ? ColorCode : 'white',
						borderTopRightRadius: 5,
						alignItems: 'center',
						justifyContent: 'center',
						padding: 6,
				}}>
				<Text
				style={{
					fontWeight: '700',
						color: 'black',
						justifyContent: 'center',
				}}>
				Taksit seçenekleri
				</Text>
				</TouchableOpacity>
			)}
			</View>
			{this.state.showurun && (
				<View
				style={{
					backgroundColor: '#EEE',
						marginLeft: 0,
						marginRight: 0,
				}}>
				<Paragraph style={{borderColor:'#dddd',borderWidth:.8,margin:0,padding:5,color:'black',}}>
				{this.state.product.Description}
				</Paragraph>
				</View>
			)}

			{this.state.showtaksit && (
				<FlatList
				style={{
					marginLeft: 20,
						backgroundColor: 'white',
						marginLeft: 2,
						marginRight: 2,
						padding: 20,
				}}
				data={this.state.product.Installments}
				renderItem={({ item }) => (
					<View
					style={{
						flexDirection: 'column',
							borderWidth: 0.5,
							borderColor: '#ddd',
							margin: 2,
					}}>
					<Text style={{ fontWeight: '100', padding: 10 }}>
					{item.Bank}
					</Text>

					<View style={{ flexDirection: 'column' }}>
					<View
					style={{
						flexDirection: 'row',
							justifyContent: 'space-between',
					}}>
					<Text
					style={{
						fontSize: 10,
							fontWeight: '800',
							color: ColorCode,
					}}>
					Taksit sayısı:
					</Text>
					<Text
					style={{
						fontSize: 10,
							paddingRight: 15,
							fontWeight: '800',
							color: ColorCode,
					}}>
					Taksit miktarı:
					</Text>
					<Text
					style={{
						fontSize: 10,
							fontWeight: '800',
							color: ColorCode,
					}}>
					Toplam:
					</Text>
					</View>
					<FlatList
					data={item.Options}
					renderItem={({ item }) => (
						<View
						style={{
							flexDirection: 'row',
								justifyContent: 'space-between',
								paddingTop: 11,
						}}>
						<Text style={{ fontSize: 10, paddingLeft: 15 }}>
						{item.Installment}{' '}
						</Text>
						<Text style={{ fontSize: 10, paddingLeft: 15 }}>
						{item.Amount} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}{' '}
						</Text>
						<Text style={{ fontSize: 10 }}>
						{item.Total} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
						</Text>
						</View>
					)}
					/>
					</View>
					</View>
				)}
				/>
			)}

			<View style={{ height: 20 }} />




</View>


			</ScrollView>

			</Drawer>


		{true && (
			<FloatingAction
			style={{ zIndex: 20 }}
			position="right"
			actions={[]}
			ref={ref => {
				this.floatingAction = ref;
			}}
			onPressMain={() =>
				this.props.navigation.navigate('MyCart', {
					token: this.state.token,
				})
			}
			showBackground={false}
			floatingIcon={
				<View
				style={{
					backgroundColor: 'transparent',
						width: 50,
						height: 50,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
				}}>

				<Icon
				name="shopping-cart"
				size={30}
				style={{ marginRight: 1, marginBottom: 1 }}
				color="white"
				/>
				{this.state.productcount>0&&
				<View
				style={{
					backgroundColor: 'white',
						borderRadius: 9,
						width: 18,
						height: 18,
						alignItems: 'center',
						justifyContent: 'center',
						padding: 1,
						position: 'absolute',
						right: 1,
						bottom: 3,
						borderColor: ColorCode,
						borderWidth: 1,
				}}>
				<Text
				style={{
					color: 'black',
						padding: 1,
						fontSize: this.state.productcount > 9 ? 8 : 10,
				}}>
				{this.state.productcount}
				</Text>
				</View>}
				</View>
			}
			color={this.state.productcount>0? ColorCode:'gray'}
			onPressInItem={name => {
				console.log(`selected button: ${name}`);
			}}
			/>
		)}

			</View>
		);
	}
}

class EditAddressScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			cart: '',
			gotocart: false,
			run: false,
			tcno: '',
			vergino: '',
			vergidairesi:'',
			firmaadi:'',


			items: [],bireysel:true,kurumsal:false
		};
	}
	static navigationOptions = {
		title: 'Sepetim',
		header: null,
	};
	_keyboardDidShow(e){

		this.setState({keyboardShow:true,
			keyboardHeight: e.endCoordinates.height,

		})


	}
	_keyboardDidHide(e){
		this.setState({keyboardShow:false,keyboardHeight:0
		})

	}
	componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>this._keyboardDidShow(e));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e=>this._keyboardDidHide(e));
		//alert(this.props.navigation.state.params.secilenadres)
		this.setState(
			{
				token: this.props.navigation.state.params.token,
				paymentway: this.props.navigation.state.params.paymentway,
				secilenadres: this.props.navigation.state.params.secilenadres,
			},
			function() {
				var alladdress = [];
				this.getaddressdetails(
					this.props.navigation.state.params.secilenadres,
					alladdress
				);
			}
		);
		//alert(JSON.stringify(this.props))
		// this.stepaddress();
		//	 alert( this.teslimatadresiref.selectedItem() )
		//alert(this.props.navigation.state.params.paymentway);
		// alert(this.props.navigation.state.params.secilenadres)
	}

	stepaddress() {
		this.setState({ stepaddress: true, loading: true });
		//GET /api/parameters/list
		//
		fetch(API_URL+'/parameters/list', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: '',
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
				if (response.CustomerAddressChangeable === false) {
					this.setState({ addresschangeable: false, acdone: true }, function() {
						// this.getaddresslist();
					});
				} else {
					this.setState({ addresschangeable: true, acdone: true }, function() {
						// this.getaddresslist();
					});
				}
				this.getaddresslist();
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	getaddresslist() {
		fetch(API_URL+'/customeraddress/list', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: '',
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
				this.setState({ loading: false, addresslistdata: response });
				// alert(JSON.stringify(response))
				//
				var alladdress = [];
				var adresler = [];
				for (var r = 0; r < response.length; r++) {
					this.getaddressdetails(response[r].Id, alladdress);
					adresler.push({//label value0
						label: response[r].ShippingAddressId,
						value: response[r].ShippingAddressId,
					});
					//	cardsselect.push({label:response.PaymentTypes[i].Name,value:response.PaymentTypes[i].Id})

					// this.getaddressdetails(response[r].Id, alladdress)
				}
				this.setState({ adresler: adresler });
				//alert(alladdress)
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	pulltowndata(cityid) {
		fetch(
			API_URL+'/customeraddress/town/' + cityid,
			{
				method: 'GET', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.state.token,
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				//body: 'id='+response.ShippingTownId,
			}
		)
			.then(response => {
				const statusCode = response.status;
				if (statusCode != 200 && 1 == 2) {
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
				//	this.setState({loading:false,addressgettowndata:response,});
				var towndata = [];
				for (var i = 0; i < response.length; i++) {
					towndata.push({
						value: response[i]['Name'],
						id: response[i]['Id'],
					});
				}
				var sgh = [];
				for (var i = 0; i < response.length; i++) {
					sgh.push({ value: response[i].Id, label: response[i].Name });
				}

				//alert(JSON.stringify(response))
				// return false
				this.setState({
					loading: false,
					addressgettowndata: sgh,
					towndata: towndata,
				});
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	getaddressdetails(id, alladdress) {
		this.setState({ loading: true });
		//alert(id +'---'+alladdress)

		fetch(API_URL+'/customeraddress/get/' + id, {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body: 'id=',
		})
			.then(response => {
				const statusCode = response.status;
				if (statusCode != 200 && 1 == 2) {
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
				alladdress.push({ response: response });
				//alert(JSON.stringify(alladdress));
				//  return false
				this.pulltowndata(response.ShippingCityId);

				this.setState({
					addressgetdata: alladdress,
					addressgetdatadone: true,
					loading: false,
					adress: response,
					isim: response.ShippingFirstName,
					soyisim: response.ShippingLastName,
					adres1: response.ShippingAddress,
					eposta: response.ShippingEmail,
					tcno: response.ShippingTcNumber,
					ceptel: response.ShippingGsm,
					favColor: response.ShippingCityId,
					favColor2: response.ShippingTownId,
					vergino: response.ShippingTaxNumber,
					firmaadi: response.ShippingCompanyName,
					postakodu: response.ShippingPostNumber,
					vergidairesi:response.ShippingTaxOffice
					//ShippingTownId:response.ShippingTownName,ShippingCityId:response.ShippingCityName
				});

				// return;
				//alert(JSON.stringify(response))
				this.setState({ id: response.ShippingAddressId });
				//return

				fetch(API_URL+'/customeraddress/city/', {
					method: 'GET', timeout: 20000,
					headers: {
						Authorization: 'Bearer ' + this.state.token,
						'Content-Type': 'application/x-www-form-urlencoded',
					},

					//	body: '',
				})
					.then(response => {
						const statusCode = response.status;
						if (statusCode != 200 && 1 == 2) {
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
						var citydata = [];
						for (var i = 0; i < response.length; i++) {
							citydata.push({
								value: response[i]['Name'],
								id: response[i]['Id'],
							});
						}
						//	alert(JSON.stringify(response))
						// return false
						var sgh = [];
						for (var i = 0; i < response.length; i++) {
							sgh.push({ value: response[i].Id, label: response[i].Name });
						}
						this.setState({
							loading: false,
							addressgetcitydata: sgh,
							citydata: citydata,
						});
					})
					.catch(error => {
						this.props.navigation.navigate('Home');
						//alert(error);
					});
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	updateaddressdetails(id) {
		/*
		if (
			!this.state.isim ||
			!this.state.soyisim ||
			// !this.state.alias ||
			!this.state.adres1 ||
			!this.state.eposta ||
			!this.state.ceptel ||
			((!this.state.tcno || this.state.tcno =='' )&& (!this.state.firmaadi ||!this.state.vergidairesi ||!this.state.vergino ))
			 || !this.state.favColor ||
			!this.state.favColor2
		) {
			this.setState({ errorv: true });


			if (!this.state.isim) {
				this.setState({ errorvisim: true });
			}
			if (!this.state.soyisim) {
				this.setState({ errorvsoyisim: true });
			}
			if (!this.state.alias) {
				this.setState({ errorvalias: true });
			}
			if (!this.state.adres1) {
				this.setState({ errorvadres1: true });
			}
			if (!this.state.eposta) {
				this.setState({ errorveposta: true });
			}
			if (!this.state.ceptel) {
				this.setState({ errorvceptel: true });
			}
			if (!this.state.tcno) {
				this.setState({ tcno: '' });
			}

			if (!this.state.firmaadi) {
				this.setState({ firmaadi: '' });
			}
			if (!this.state.vergidairesi) {
				this.setState({ vergidairesi: '' });
			}

			if (!this.state.vergino) {
				this.setState({ vergino: '' });
			}
			//this.dropdown.alertWithType('error', 'Hata','Bilgilerinizi eksiksiz giriniz');


		//	return;
		}
		*/
			this.setState({ loading: true });
//alert(this.state.vergidairesi)
fetch(
	API_URL+'/customeraddress/create-update/',
	{
		method: 'POST', timeout: 20000,
		headers: {
			Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			Accept: 'application/x-www-form-urlencoded',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body:
		'ShippingAddressId=' +
		(id==null?'00000000-0000-0000-0000-000000000000':id) +
		'&ShippingFirstName=' +
		this.state.isim +
		'&ShippingLastName=' +
		this.state.soyisim +
		'&ShippingName=' +
		// this.state.alias +
		'&ShippingDescription=' +
		// this.state.tanim +
		'&ShippingAddress=' +
		this.state.adres1 +
		'&ShippingPostNumber=' +
		// this.state.postakodu +
		'&ShippingEmail=' +
		this.state.eposta +
		'&ShippingGsm=' +
		this.state.ceptel +
		'' +
		(typeof this.state.tcno === undefined  || this.state.tcno == 'undefined' || !this.state.tcno ? '&ShippingTcNumber=':'&ShippingTcNumber='+this.state.tcno) +
		(typeof this.state.tcno === undefined || this.state.tcno == 'undefined' || !this.state.tcno?('&ShippingCompanyName=' +(this.state.firmaadi) +'&ShippingTaxOffice=' +(this.state.vergidairesi) +'&ShippingTaxNumber=' +(this.state.vergino)) :'') +
		'&ShippingNote=' +
		//  this.state.not +
		'&ShippingCityId=' +
		this.state.favColor +
		'&ShippingTownId=' +
		this.state.favColor2,
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
		//this.props.navigation.pop()
		this.dropdown.alertWithType('info', 'Bilgi',(response.ResultMessage));

		// alert(JSON.stringify(response));
		this.setState({ loading: false ,//done:true
		});
	})
	.catch(error => {
			this.dropdown.alertWithType('error', 'Bağlantı','Bağlantınız yavaş tekrar deneniyor...');

	//	this.props.navigation.navigate('Home');
	//	//alert(error);
	});
	}

	onChangeText(textz) {
		//alert(text)
		return;
		var sonuc = textz.split('***');
		alert(JSON.stringify(sonuc[1]));
		var alladdress = [];
		var self = this;
		//    self.getaddressdetails(JSON.stringify(sonuc[1]),alladdress);
		self.stepaddress();
	}
	_onFocus () {
		KeyboardAvoid.checkNeedScroll({
			nodeRef: this.titleInput, 		    //TextInput ref
			scrollNodeRef: this.scrollView,     //ScrollView ref
			contentOffset: this.contentOffset   //ScrollView scrollOffset.y
		}, 'scroll', 0);
	}
	render() {
		const { navigate } = this.props.navigation;
		let data = [
			{
				value: 'Banana',
			},
			{
				value: 'Mango',
			},
			{
				value: 'Pear',
			},
		];
		return (
			<View>

			<View
			style={{
				width: Dimensions.get('window').width,
					flexDirection: 'column',			}}>
			<HHeader title={this} baslik={this.props.navigation.state.params.secilenadres==null?"Yeni Adres":"Adresi Düzenle"} />
			<ScrollView style={{height:this.state.keyboardShow?Dimensions.get('window').height-this.state.keyboardHeight-70 :Dimensions.get('window').height-70}}
			>


			<View
			style={{
				borderColor:'#ccc',borderWidth:.8,
					backgroundColor: 'white',
					padding: 10,
					margin:10,
					borderRadius: 10,
			}}>
			<Title>Kişisel Bilgiler</Title>
			<TextInput
			ref="isim"
			label="İsim"
			onPress={()=>{this.refs['isim'].focus()}}
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			keyboardType="name-phone-pad"
			secureTextEntry={false}
			mode="outlined"

			value={this.state.isim}
			style={{
				//	fontSize: 16,
				//	paddingTop: 13,
				paddingHorizontal: 10,
					//	paddingBottom: 12,
					//	borderWidth: 1,
					borderColor: this.state.errorvisim ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
			}}
			onChangeText={isim => this.setState({ isim })}
			/>
			<TextInput
			label="Soy İsim"
			ref="soyisim"
			onPress={()=>{this.refs['soyisim'].focus()}}
			mode="outlined"

			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			secureTextEntry={false}
			value={this.state.soyisim}

			style={{
				//	fontSize: 16,
				//		paddingTop: 13,
				paddingHorizontal: 10,
					//		paddingBottom: 12,
					//		borderWidth: 1,
					borderColor: this.state.errorvsoyisim ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
			}}
			onChangeText={soyisim => this.setState({ soyisim })}
			/>
			<TextInput

			label="E-Posta"
			mode="outlined"
			ref="eposta"
			onPress={()=>{this.refs['eposta'].focus()}}

			underlineColorAndroid="rgba(0,0,0,0)"
			value={this.state.eposta}
			disabled={this.props.navigation.state.params.secilenadres==null?false:true}
			secureTextEntry={false}

			style={{
				//	fontSize: 16,
				//		paddingTop: 13,
				paddingHorizontal: 10,
					//		paddingBottom: 12,
					borderWidth: 1,
					borderColor: this.state.errorveposta ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
			}}
			onChangeText={eposta => this.setState({ eposta })}
			/>

			<TextInput
			label="Cep Telefonu ÖRN. 5321234567"
			mode="outlined"

			ref="ceptel"
			onPress={()=>{this.refs['ceptel'].focus()}}

			underlineColorAndroid="rgba(0,0,0,0)"
			keyboardType="number-pad"
			value={this.state.ceptel}
			secureTextEntry={false}

			style={{
				//	fontSize: 16,
				//		paddingTop: 13,
				paddingHorizontal: 10,
					//		paddingBottom: 12,
					borderWidth: 1,
					borderColor: this.state.errorvceptel ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
			}}
			onChangeText={ceptel => this.setState({ ceptel })}
			/>

			</View>
			<View
			style={{borderColor:'#ccc',borderWidth:.8,
					backgroundColor: 'white',
					padding: 10,
					borderRadius: 10,
					margin: 10,
			}}>
			<Title>Adres Detayları</Title>

			<TextInput
			ref="adres1"
			mode="outlined"

			onPress={()=>{this.refs['adres1'].focus()}}
			label="Adres"
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			multiline={true}
			value={this.state.adres1}
			secureTextEntry={false}

			style={{
				//	fontSize: 16,
				//		paddingTop: 13,
				paddingHorizontal: 10,
					//		paddingBottom: 12,
					//	borderWidth: 1,
					borderColor: this.state.errorvadres1 ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
					height: 70,
			}}
			onChangeText={adres1 => this.setState({ adres1 })}
			/>

			{this.state.addressgetcitydata && (
				<RNPickerSelect
				disabled={this.state.addresschangeable ? true : false}
				style={{
					...pickerSelectStyles,
				}}
				placeholder={{
					label: 'İl seçiniz',
						value: null,
				}}
				items={this.state.addressgetcitydata}
				onValueChange={value => {
					if (this.state.addresschangeable === false) return;
					this.setState({
						favColor: value,
						addressgettowndata: null,
					});
					this.pulltowndata(value);
				}}
				onUpArrow={() => {}}
				onDownArrow={() => {}}
				value={this.state.favColor}
				/>
			)}

			{this.state.addressgettowndata && (
				<View>

				<RNPickerSelect
				disabled={this.state.addresschangeable ? true : false}
				style={{
					...pickerSelectStyles,
				}}
				placeholder={{
					label: 'İlçe seçiniz',
						value: null,
				}}
				items={this.state.addressgettowndata}
				onValueChange={value => {
					if (this.state.addresschangeable === false) return;

					this.setState({
						favColor2: value,
					});
				}}
				onUpArrow={() => {}}
				onDownArrow={() => {}}
				value={this.state.favColor2}
				/>
				</View>
			)}
			</View>
			<View
			style={{
				borderColor:'#ccc',borderWidth:.8,
					backgroundColor: 'white',
					padding: 10,
					borderRadius: 5,
					margin: 10,
			}}>
			<Title>Fatura Tipi</Title>

			<View style={{ flexDirection: 'row' ,backgroundColor:'white',justifyContent:'space-between',paddingLeft:10,paddingRight:10}}>

			<View style={{flexDirection:'row'}}>
			<TouchableOpacity style={{flexDirection:'row'}} onPress={() => {
				this.setState({ kurumsal: false, bireysel: true ,ShippingTaxNumber:false,ShippingTaxOffice:false,ShippingCompanyName:false })

			}} style={{width:20,height:20}}>
			{ (this.state.bireysel==false) ?
				<View style={{width:20,height:20,backgroundColor:'#ddd',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
				<View style={{width:16,height:16,backgroundColor:'white',borderRadius:8}}/>

				</View>:
				<View style={{width:20,height:20,backgroundColor: '#ddd',alignItems:'center',justifyContent:'center',borderRadius:10}}>
				<View style={{width:16,height:16,backgroundColor:ColorCode,borderRadius:8,borderColor:'white',borderWidth:3}}/>
				</View>}

			</TouchableOpacity>
			<Text  onPress={() => {
				this.setState({ kurumsal: false, bireysel: true,ShippingTaxNumber:false,ShippingTaxOffice:false,ShippingCompanyName:false })

			}} >Bireysel</Text>

			</View>
			<View style={{flexDirection:'row'}}>
			<TouchableOpacity  style={{flexDirection:'row'}} onPress={() => {
				this.setState({ kurumsal: true, bireysel: false ,ShippingTcNumber:false,tcno:false})

			}} style={{width:20,height:20}}>
			{ (this.state.kurumsal==false) ?
				<View style={{width:20,height:20,backgroundColor:'#ddd',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
				<View style={{width:16,height:16,backgroundColor:'white',borderRadius:8}}/>

				</View>:
				<View style={{width:20,height:20,backgroundColor: '#ddd',alignItems:'center',justifyContent:'center',borderRadius:10}}>
				<View style={{width:16,height:16,backgroundColor:ColorCode,borderRadius:8,borderColor:'white',borderWidth:3}}/>
				</View>}

			</TouchableOpacity>
			<Text onPress={() => {
				this.setState({ kurumsal: true, bireysel: false,ShippingTcNumber:false,tcno:false })

			}} >Kurumsal</Text>

			</View>




			</View>
			<View style={{backgroundColor:'white',borderRadius:10}}>
			{this.state.bireysel && (
				<View>
				<TextInput
				ref="tcno"
				onPress={()=>{this.refs['tcno'].focus()}}
				label="TC Kimlik No"
				underlineColorAndroid="rgba(0,0,0,0)"
				keyboardType="number-pad"
				secureTextEntry={false}
				value={this.state.tcno}
				mode="outlined"

				style={{
					//	fontSize: 16,
					//		paddingTop: 13,
					paddingHorizontal: 10,
						//		paddingBottom: 12,
						//borderWidth: 1,
						//borderColor: '#f0f0f0',
						borderRadius: 4,
						color: 'black',
				}}
				onChangeText={tcno => this.setState({ tcno })}
				/>
				</View>
			)}
			{this.state.kurumsal && (
				<View>
				<TextInput
				label="Firma Adı"
				ref="firmaadi"
				onPress={()=>{this.refs['firmaadi'].focus()}}
				mode="outlined"

				underlineColorAndroid="rgba(0,0,0,0)"
				value={this.state.firmaadi}
				secureTextEntry={false}
				style={{
					//	fontSize: 16,
					//		paddingTop: 13,
					paddingHorizontal: 10,
						//		paddingBottom: 12,
						//borderWidth: 1,
						//borderColor: '#f0f0f0',
						borderRadius: 4,
						color: 'black',
				}}
				onChangeText={firmaadi => this.setState({ firmaadi })}
				/>
				<TextInput
				label="Vergi Dairesi"
				ref="vergidairesi"
				onPress={()=>{this.refs['vergidairesi'].focus()}}
				mode="outlined"

				underlineColorAndroid="rgba(0,0,0,0)"
				value={this.state.vergidairesi}

				secureTextEntry={false}
				style={{
					//	fontSize: 16,
					//		paddingTop: 13,
					paddingHorizontal: 10,
						//		paddingBottom: 12,
						//	borderWidth: 1,
						//	borderColor: '#f0f0f0',
						borderRadius: 4,
						color: 'black',
				}}
				onChangeText={vergidairesi =>
					this.setState({ vergidairesi })
				}
				/>

				<TextInput
				ref="vergino"
				label="Vergi No"
				onPress={()=>{this.refs['vergino'].focus()}}
				mode="outlined"

				underlineColorAndroid="rgba(0,0,0,0)"
				keyboardType="number-pad"
				value={this.state.vergino}

				secureTextEntry={false}
				style={{
					//	fontSize: 16,
					//		paddingTop: 13,
					paddingHorizontal: 10,
						//		paddingBottom: 12,
						borderWidth: 1,
						borderColor: '#f0f0f0',
						borderRadius: 4,
						color: 'black',
				}}
				onChangeText={vergino => this.setState({ vergino })}
				/>
				</View>
			)}
			</View>






			<Button icon={this.state.done?"done":"save"} mode="contained" disabled={this.state.done}
			style={{margin:5,backgroundColor:ColorCode}}
			onPress={()=>
				{ 	if(!this.state.done){
					this.updateaddressdetails(this.props.navigation.state.params.secilenadres)
				}else{

				}
					return
					if(this.props.navigation.state.params.secilenadres==null){
						this.props.navigation.navigate('MyCart', {
							token: this.props.navigation.state.params.token,
							secilenadres:null
						});
						return
					}

					//this.updateaddressdetails( this.props.navigation.state.params.secilenadres)
					//this.props.navigation.pop()
				}}

			>
			{this.state.done? 'Adres Güncellendi/Eklendi':'Kaydet ve Devam et'}
			</Button>

			</View>
			</ScrollView>






			{this.state.loading && (
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
			<DropdownAlert ref={ref => this.dropdown = ref} />

			</View>
		);
	}
}
const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginTop:5,
		fontSize: 16,
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
		//borderWidth: 1,
		//borderColor: '#f0f0f0',
		//borderRadius: 4,
		color: 'black',
		width:Dimensions.get('window').width-50
	},
});
var radio_props = [
	{ label: 'Para ile ödeme', value: 0 },
	{ label: 'Para ve Puan ile ödeme', value: 1 },
];

class MyAddressScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false, cart: '', gotocart: false, run: false };
	}
	static navigationOptions = {
		title: 'Sepetim',
		header: null,
	};
	componentDidMount() {
		this.setState({
			token: this.props.navigation.state.params.token,
			paymentway: this.props.navigation.state.params.paymentway,
		});
		//alert(JSON.stringify(this.props))
		this.stepaddress();
		//	 alert( this.teslimatadresiref.selectedItem() )
		//alert(this.props.navigation.state.params.paymentway);
	}

	stepaddress() {
		this.setState({ stepaddress: true, loading: true });
		//GET /api/parameters/list
		//
		fetch(API_URL+'/parameters/list', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: '',
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
				if (response.CustomerAddressChangeable === false) {
					this.setState({ addresschangeable: false });
				} else {
					this.setState({ addresschangeable: true });
				}
				this.getaddresslist();
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	getaddresslist() {
		fetch(API_URL+'/customeraddress/list', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: '',
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
				this.setState({
					loading: false,
					addresslistdata: response,
					addressgetdatadone: true,
					//adresler: response,
				});
				// alert(JSON.stringify(response))
				//
				var alladdress = [];
				var adresler = [];
				for (var r = 0; r < response.length; r++) {
					// this.getaddressdetails(response[r].Id, alladdress);
					adresler.push({ //label value0 idi
						label: response[r].ShippingName,
						value: response[r].ShippingAddressId,
					});
					// this.getaddressdetails(response[r].Id, alladdress)
				}
				// this.setState({ adresler: response });

				this.setState({ adresler: adresler });
				//alert(alladdress)
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	getaddressdetails(id, alladdress) {
		this.setState({ loading: true });
		//alert(id +'---'+alladdress)
		fetch(API_URL+'/customeraddress/get/' + id, {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: '',
		})
			.then(response => {
				const statusCode = response.status;
				if (statusCode != 200 && 1 == 2) {
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
				alladdress.push({ response: response });
				// alert(JSON.stringify(alladdress));
				//  return false

				this.setState({
					addressgetdata: alladdress,
					addressgetdatadone: true,
					loading: false,
					//ShippingTownId:response.ShippingTownName,ShippingCityId:response.ShippingCityName
				});

				return;
				//	alert(JSON.stringify(this.state.addressgetdata))

				fetch(
					API_URL+'/customeraddress/town/' +
					response.ShippingCityId,
					{
						method: 'GET', timeout: 20000,
						headers: {
							Authorization: 'Bearer ' + this.state.token,
							'Content-Type': 'application/x-www-form-urlencoded',
						},

						//body: 'id='+response.ShippingTownId,
					}
				)
					.then(response => {
						const statusCode = response.status;
						if (statusCode != 200 && 1 == 2) {
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
						//	this.setState({loading:false,addressgettowndata:response,});
						var towndata = [];
						for (var i = 0; i < response.length; i++) {
							towndata.push({
								value: response[i]['Name'],
								id: response[i]['Id'],
							});
						}
						//alert(JSON.stringify(response))
						// return false
						this.setState({
							loading: false,
							addressgettowndata: response,
							towndata: towndata,
						});
					})
					.catch(error => {
						this.props.navigation.navigate('Home');
						//alert(error);
					});

				fetch(API_URL+'/customeraddress/city/', {
					method: 'GET', timeout: 20000,
					headers: {
						Authorization: 'Bearer ' + this.state.token,
						'Content-Type': 'application/x-www-form-urlencoded',
					},

					//	body: '',
				})
					.then(response => {
						const statusCode = response.status;
						if (statusCode != 200 && 1 == 2) {
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
						var citydata = [];
						for (var i = 0; i < response.length; i++) {
							citydata.push({
								value: response[i]['Name'],
								id: response[i]['Id'],
							});
						}
						//	alert(JSON.stringify(response))
						// return false
						this.setState({
							loading: false,
							addressgetcitydata: response,
							citydata: citydata,
						});
					})
					.catch(error => {
						this.props.navigation.navigate('Home');
						//alert(error);
					});
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	updateaddressdetails(id) {

		this.setState({ loading: true });

		fetch(
			API_URL+'/customeraddress/create-update/',
			{
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.state.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body:
				'ShippingAddressId=' +
				id +
				'&ShippingFirstName=' +
				this.state.t7 +
				'&ShippingLastName=' +
				this.state.t8 +
				'&ShippingName=' +
				this.state.t1 +
				'&ShippingDescription=' +
				this.state.t2 +
				'&ShippingAddress=' +
				this.state.t9 +
				'&ShippingPostNumber=' +
				this.state.t10 +
				'&ShippingEmail=' +
				this.state.t11 +
				'&ShippingGsm=' +
				this.state.t12 +
				'&ShippingTcNumber=' +
				this.state.t3 +
				'&ShippingCompanyName=' +
				this.state.t4 +
				'&ShippingTaxOffice=' +
				this.state.t5 +
				'&ShippingTaxNumber=' +
				this.state.t6 +
				'&ShippingNote=' +
				this.state.t15 +
				'&ShippingCityId=' +
				this.state.t13 +
				'&ShippingTownId=' +
				this.state.t14,
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
				//   alert(JSON.stringify(response));
				this.setState({ loading: false });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	adressec(data) {
		//alert(data)
		this.setState({ secilenadres: data }, function() {
			// alert(this.state.secilenadres);

			this.props.navigation.navigate('CheckoutPage', {
				token: this.state.token,
				paymentway: this.props.navigation.state.params.paymentway,
				secilenadres: this.state.secilenadres,
			});
		});
	}
	onChangeText(textz) {
		//alert(text)
		return;
		var sonuc = textz.split('***');
		//    alert(JSON.stringify(sonuc[1]));
		var alladdress = [];
		var self = this;
		//    self.getaddressdetails(JSON.stringify(sonuc[1]),alladdress);
		self.stepaddress();
	}
	render() {
		const { navigate } = this.props.navigation;
		let data = [
			{
				value: 'Banana',
			},
			{
				value: 'Mango',
			},
			{
				value: 'Pear',
			},
		];
		return (
			<View>
			{this.state.addressgetdatadone && (
				<View
				style={{
					backgroundColor: 'white',
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').height,
						zIndex: 199,
						position: 'absolute',
						padding: 0,
						flexDirection: 'column',
				}}>
				<HHeader title={this} baslik="Adres Bilgileri" />

				{this.state.addresschangeable === true ? (
					<TouchableOpacity
					onPressIn={() => {
						//	if(this.state.ShippingPostNumber!=null || this.state.ShippingPostNumber!='' )return;
						this.props.navigation.navigate('EditAddress', {
							token: this.props.navigation.state.params.token,
							paymentway: this.props.navigation.state.params.paymentway,
							secilenadres: null,
						});
					}}>
					<View
					style={{
						backgroundColor: 'white',
							alignItems: 'center',
							justifyContent: 'center',
							padding: 5,
							marginRight: 4,
					}}>
					<Text style={{ color: 'white' }}>Yeni ekle</Text>
					</View>
					</TouchableOpacity>
				) : (
					<View />
				)}

				<Text style={{color:'#ccc',fontWeight:'100',textAlign:'center',margin:3}}>Devam etmek için adresinizi seçiniz.</Text>

				<FlatList
				data={this.state.adresler}
				renderItem={({ item }) => (
					<View style={{ flexDirection: 'row' }}>
					<View
					style={{
						flexDirection: 'column',
							flex: 1,
							marginTop: 10,
							marginLeft: 10,
							marginRight: 10,
							paddingBottom: 5,
							backgroundColor: 'white',
							padding: 20,
					}}>
					<View style={{ flexDirection: 'row', flex: 0.4 }}>
					<Text
					style={{
						fontWeight: '800',
							fontSize: 16,
							marginBottom: 5,
					}}>
					{item.ShippingName}
					</Text>
					</View>
					<Text
					style={{
						marginLeft: 0,
							color: 'gray',
							fontSize: 12,
							flex: 0.4,
					}}>
					{item.ShippingFirstName} {item.ShippingLastName}
					</Text>
					<Text
					style={{
						marginLeft: 0,
							flex: 0.4,
							color: 'gray',
							fontSize: 12,
					}}>
					{item.ShippingAddress}
					</Text>
					<Text
					style={{
						marginLeft: 0,
							flex: 0.4,
							color: 'gray',
							fontSize: 12,
					}}>
					{item.ShippingTownName}
					</Text>
					<Text
					style={{
						marginLeft: 0,
							flex: 0.4,
							color: 'gray',
							fontSize: 12,
					}}>
					{item.ShippingCityName}
					</Text>
					<View style={{ flexDirection: 'row' }}>
					{this.state.secilenadres&&
						<TouchableOpacity
						activeOpacity={1}
						style={{
							backgroundColor: 'white',
								justifyContent: 'center',
								marginTop: 5,
						}}
						onPressIn={() =>
							this.props.navigation.navigate('EditAddress', {
								token: this.state.token,
								paymentway: this.props.navigation.state.params
								.paymentway,
								secilenadres: item.ShippingAddressId,
							})
						}>
						<Text style={{ color: 'black', fontWeight: '800' }}>
						Düzenle
						</Text>
						</TouchableOpacity>}

					<TouchableOpacity
					activeOpacity={1}
					style={{
						backgroundColor: 'white',
							marginLeft: 20,
							marginTop: 5,
							justifyContent: 'center',
					}}
					onPressIn={() => {
						this.setState(
							{ secilenadres: item.ShippingAddressId },
							function() {
								this.adressec(item.ShippingAddressId);
							}
						);
					}}>
					<Text style={{ color: 'black', fontWeight: '800' }}>
					Bu adresi seç ve devam et
					</Text>
					</TouchableOpacity>
					</View>
					</View>
					</View>
				)}
				/>



				</View>
			)}

			{this.state.loading && (
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

			<Text style={{color:'#ccc',fontWeight:'100',textAlign:'center',margin:3}}>Devam etmek için adresinizi seçiniz.</Text>

			</View>
		);
	}
}
var radio_props = [
	{ label: 'Para ile ödeme', value: 0 },
	{ label: 'Para ve Puan ile ödeme', value: 1 },
];

class AboutScreen extends React.Component {
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
class ReachusScreen extends React.Component {
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
class HelpScreen extends React.Component {
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

			body: 'OrderId=1&key=Sıkça Sorulan Sorular',
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
				//alert(JSON.stringify(response));
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				////alert(error);
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
			<HHeader title={this} baslik="Yardım"/>
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

class MyCartScreen extends React.Component {
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
		this.setState({ token: this.props.navigation.state.params.token });
		//alert(JSON.stringify(this.props))
		this.showcart();
		this.totalpoint();


	}


	productcount() {
		fetch(API_URL+'/shoppingcart/cart-count/', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
				this.setState({ productcount: response.CartCount });
				// alert(JSON.stringify(response))
				Realm.open({ schema: [uyeSchema], schemaVersion: 5 }).then(realm => {
					//alert("Language is: "+lange);
					let updt = realm.objects('Uyeler');
					realm.write(() => {
						updt[0].sepet = response.CartCount;
					});

					//  alert("Language is: "+updt[0].Language);
				});
			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				////alert(error);
			});
	}

	refresh() {
		this.setState({ token: this.props.navigation.state.params.token });
		//alert(JSON.stringify(this.props))
		this.showcart();
		this.productcount()
	}
	urunsil(id) {
		fetch(API_URL+'/shoppingcart/update-item', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'ProductId=' + id + '&Quantity=0',
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
				this.setState({ loading: false, addressgetcitydata: response });
				//  alert(JSON.stringify(response.ResultMessage));
				this.showcart();
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
			//	//alert(error);
			});
	}
	urunarttir(id, q) {
		fetch(API_URL+'/shoppingcart/update-item', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'ProductId=' + id + '&Quantity=' + q,
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
				this.setState({ loading: false, addressgetcitydata: response });
				// alert(JSON.stringify(response.ResultMessage));
				this.showcart();
			})
			.catch(error => {
				//this.props.navigation.navigate('Home');
				////alert(error);
			});
	}

	urunazalt(id, q) {
		fetch(API_URL+'/shoppingcart/update-item', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'ProductId=' + id + '&Quantity=' + q,
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
				this.setState({ loading: false, addressgetcitydata: response });
				// alert(JSON.stringify(response.ResultMessage));
				this.showcart();
			})
			.catch(error => {
			//	this.props.navigation.navigate('Home');
			//	//alert(error);
			});
	}
	totalpoint() {
		var self = this;
		self.setState({ loading: true });
		fetch(API_URL+'/customer/TotalPoint', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body:'id='+orderid,
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
				self.setState({ loading: false, totalpoint: response.ResultMessage });
			})
			.catch(error => {
			//	self.props.navigation.navigate('Splash');
				////alert(error);
				self.setState({ loading: false });
			//	self.props.navigation.navigate('Splash');
			});
	}

	showcart() {
		var self = this;
		self.setState({ loading: true, gotocart: true });
		//	this.setState({showorders:true})
		//alert(this.state.token)
		fetch(API_URL+'/shoppingcart/list/', {
			method: 'GET', timeout: 5000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body:'id='+orderid,
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
				//   alert(JSON.stringify(response))

				self.setState({ loading: false, cart: response, run: true });
				var itemss = self.state.cart.Items;
				//	var Warnings = this.state.cart.Warnings.replace('***', '\n');
				var Warnings = self.state.cart.Warnings;

				self.setState({ Warnings: Warnings, itemss: itemss });
				if (itemss.length < 1) {
					self.setState({ itemss: false });
				}
			})
			.catch(error => {
				return
						Alert.alert(
  'Bağlantı',
  'Bağlantınız çok yavaş, lütfen bağlantınızı kontrol edin.',
  [
    {text: 'Tekrar Dene', onPress: () =>{

    const resetAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Splash' })],
					});

					this.props.navigation.dispatch(resetAction);

    }},

  ],
  { cancelable: true }
)


				self.setState({ loading: false });
			});
	}

	render() {
		return (
			<View
			style={{
				flex: 1,
					flexDirection: 'column',
					backgroundColor: 'white',
			}}>
			<HHeader title={this} baslik="Sepetim" />
	{true&&
				<StatusBar
			backgroundColor={'white'}
			translucent={false}
			barStyle="dark-content"
				/>
		}
			<View
			style={{
				padding: 5,
					margin: 10,
			}}>
			<Text style={{ textAlign: 'right' ,fontWeight:'800'}}>
			{ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ? 'Puanım: '+(this.state.totalpoint?this.state.totalpoint :''): ''}{' '}
			</Text>
			</View>
			<ScrollView
			style={{
				height: Dimensions.get('window').height,
					backgroundColor: 'white',
					opacity: 1,
					zIndex: 99,
					marginTop: 0,
					padding: 0,
			}}>
			{!!this.state.Warnings && (
				<View
				style={{
					backgroundColor: 'white',
						margin: 5,
						borderRadius: 5,
						borderLeftWidth: 5,
						borderLeftColor: ColorCode,
						borderColor: '#ddd',
						borderWidth: 0.5,
						padding: 10,
						flexDirection: 'column',
				}}>
				<Text style={{ color: 'red', fontWeight: '200' }}>
				{this.state.Warnings}
				</Text>
				</View>
			)}
			<Surface
			style={{ backgroundColor: 'white', borderRadius: 5, margin: 5, }}>
			{!this.state.itemss && (
				<View style={{ flexDirection: 'column', alignItems: 'center' }}>
				<EnIcon name="shopping-cart" size={130} color="#eee" />
				<Text
				style={{ textAlign: 'center', color: '#888', margin: 20 }}>
				Sepetinizde ürün bulunmamaktadır.
				</Text>
				</View>
			)}
			{!!this.state.cart && (
				<FlatList
				data={this.state.cart.Items}
				renderItem={({ item }) => (
					<View>
					<View
					style={{
						flexDirection: 'column',
							marginTop: 0,
							padding: 5,
							marginBottom: 2,
					}}>
					<View
					style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image defaultSource={require('./noimage.jpg')}
					style={{ width: 70, height: 70 }}
					source={{
						uri: 'https:' + item.ProductImage,
							headers: {
								Pragma: 'no-cache',
							},
					}}
					/>
					<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate('ProductDetail', {
							name: item.ProductId,
							token: this.state.token,
						})}
					style={{ marginLeft: 10 }}>
					<Text style={{ color: 'black', fontSize: 14 }}>
					{item.Brand} {item.Model}{' '}
					</Text>
					<Text style={{ color: 'black', fontSize: 14 }}>
					{item.Name}
					</Text>
					</TouchableOpacity>
					</View>
					<View style={{ flexDirection: 'row', flex: 1 }}>



					<View
					style={{
						backgroundColor: 'white',

							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							margin: 4,
					}}>

	<Text style={{ textAlign:'left',
			color:'gray',textAlign:'center',fontWeight:'800' ,fontSize:18}}>
					{item.Price} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
					</Text>

					<TouchableOpacity style={{alignItems:'center',justifyContent:'flex-end'}}
					onPress={() => this.urunsil(item.ProductId)}>
					<Text style={{ color: 'gray',fontSize:12 }}>Ürünü Sil</Text>
					</TouchableOpacity>


					</View>

					</View>
					</View>


					<View style={{ position: 'absolute', bottom: 10, right: 5,alignItems:'flex-end',justifyContent:'flex-end' }}>



	<View style={{ flexDirection: 'row', backgroundColor:'#ddd',height:36 ,justifyContent:'center',borderRadius:3}}>
					<TouchableOpacity
					style={{
						backgroundColor: '#ddd',
							width: 30,
							height: 30,
							alignItems: 'center',
							justifyContent:'center'
					}}
					onPress={() =>
						this.urunazalt(
							item.ProductId,
							item.Quantity - 1
						)
					}>
					<Text style={{ fontSize: 20, color: '#333' }}>
					-
					</Text>
					</TouchableOpacity>
					<TouchableOpacity
					onPress={() =>
						this.setState({
							promptVisible: true,
							pid: item.ProductId,
						})
					}>
					<View style={{height:30,width:30,marginTop:3,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
					<Text
					style={{
						color: 'black',
							fontSize: 14,
							}}>
					{item.Quantity}
					</Text>
					</View>
					</TouchableOpacity>

					<TouchableOpacity
					style={{
						backgroundColor: '#ddd',
						//	borderRadius: 10,
							width: 30,
							height: 30,
							alignItems: 'center',
							justifyContent:'center'

					}}
					onPress={() =>
						this.urunarttir(
							item.ProductId,
							item.Quantity + 1
						)
					}>
					<Text style={{ fontSize: 20, color: '#333' }}>
					+
					</Text>
					</TouchableOpacity>
					</View>




					</View>
			<Divider/>

					</View>
				)}
				/>
			)}
			<Prompt
			title="Miktar giriniz"
			label="0-250 arası miktar giriniz"
			defaultValue=""
			visible={this.state.promptVisible}
			onCancel={() =>
				this.setState({
					promptVisible: false,
					message: 'You cancelled',
				})
			}
			onSubmit={value => {
				this.setState({
					promptVisible: false,
					message: `You said "${value}"`,
				});
				if (value > 250) return;
				this.urunarttir(this.state.pid, value);
			}}
			/>

			</Surface>
			{this.state.itemss !== false ? (
				<View
				style={{
					backgroundColor: 'white',
						margin: 5,
						padding: 10,
						flex: 1,
						flexDirection: 'row',
						marginTop: 10,
						marginBottom: 10,
				}}>
				<View style={{ flex: 0.1, flexDirection: 'column' }} />
				<View style={{ flex: 0.5, flexDirection: 'column' }}>
				<Text
				style={{ fontSize: 14, color: 'gray', textAlign: 'right' }}>
				Ürünlerin Toplamı:
				</Text>
				<Text
				style={{ fontSize: 14, color: 'gray', textAlign: 'right' }}>
				Kargo Bedeli:
				</Text>
				<Text
				style={{ fontSize: 14, color: 'gray', textAlign: 'right' }}>
				Toplam:
				</Text>
				</View>
				<View style={{ flex: 0.3 }}>
				<Text
				style={{
					fontSize: 14,
						fontWeight:'800',
						color: ColorCode,
						textAlign: 'right',
				}}>
				{this.state.cart.SubTotal} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
				</Text>
				<Text
				style={{
					fontSize: 14,
						fontWeight:'800',
						
						color: ColorCode,
						textAlign: 'right',
				}}>
				{this.state.cart.CargoTotal} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
				</Text>
				<Text
				style={{
					fontSize: 14,
						fontWeight:'800',
						
						color: ColorCode,
						textAlign: 'right',
				}}>
				{this.state.cart.Total} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
				</Text>
				</View>






				</View>
			) : (
				<View />
			)}


			<View style={{height:70}}/>


			{this.state.cart && this.state.cart.Promotions &&
				this.state.cart.Promotions.length > 0 &&
				this.state.cart.Items &&
				this.state.cart.Items.length > 0 ? (
					<View
					style={{
						backgroundColor: 'white',
							margin: 5,
							borderRadius: 5,
							padding: 10,
					}}>
					<Text style={{ fontSize: 20, marginLeft: 15 }}>
					Promosyon Ürünler
					</Text>

					<FlatList
					horizontal={false}
					data={this.state.cart.Promotions}
					renderItem={({ item }) => (
						<View>
						<View
						style={{
							flexDirection: 'row',
								marginTop: 0,
								padding: 5,
								marginBottom: 2,
						}}>
						<View
						style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image defaultSource={require('./noimage.jpg')}
						style={{ width: 70, height: 70 }}
						source={{
							uri: 'https:' + item.ProductImage,
								headers: {
									Pragma: 'no-cache',
								},
						}}
						/>
						<TouchableOpacity
						onPressIn={() =>
							this.props.navigation.navigate('ProductDetail', {
								name: item.ProductId,
								token: this.state.token,
							})
						}
						style={{ marginLeft: 10 }}>
						<View>
						<Text style={{ color: 'black' }}>
						{item.Brand} {item.Model}
						</Text>

						<Text style={{ color: 'black' }}>{item.Name}</Text>
						</View>
						</TouchableOpacity>
						</View>

						<View style={{ flexDirection: 'row', flex: 1 }} />
						</View>

						<View style={{ flexDirection: 'row' }}>
						<View style={{ flexDirection: 'column', marginLeft: 75 }}>
						<Text
						style={{
							color: 'gray',
								textDecorationLine: 'line-through',
								fontSize: 14,
								textAlign: 'left',
								marginLeft: 9,
						}}>
						{item.MarketPrice} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}{' '}
						</Text>

						<Text
						style={{
							color: 'blue',
								fontSize: 14,
								textAlign: 'left',
								marginLeft: 9,
						}}>
						{item.Price} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
						</Text>
						</View>
						<TouchableOpacity
						onPressIn={() =>
							this.props.navigation.navigate('ProductDetail', {
								name: item.ProductId,
								token: this.state.token,
							})
						}
						style={{
							height: 25,
								width: 83,
								borderColor: ColorCode,
								borderWidth: 0.8,
								borderRadius: 5,
								padding: 3,
								alignItems: 'center',
								justifyContent: 'center',
								position: 'absolute',
								right: 10,
								bottom: 5,
						}}>
						<Text style={{ color: ColorCode, fontSize: 13 }}>
						Sepete ekle
						</Text>
						</TouchableOpacity>
						</View>
						</View>
					)}
					/>
					</View>
				) : (
					<View />
				)}

			{this.state.cart && this.state.cart.RelatedProducts &&
					this.state.cart.RelatedProducts.length > 0 &&
					this.state.cart.Items &&
					this.state.cart.Items.length > 0 ? (
						<View
						style={{
							backgroundColor: 'white',
								margin: 5,
								borderRadius: 5,
								padding: 10,
						}}>
						<Text style={{ fontSize: 20, marginLeft: 15 }}>
						Benzer Ürünler
						</Text>

						<FlatList
						horizontal={false}
						data={this.state.cart.RelatedProducts}
						renderItem={({ item }) => (
							<View>
							<View
							style={{
								flexDirection: 'row',
									marginTop: 0,
									padding: 5,
									marginBottom: 2,
							}}>
							<View
							style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Image defaultSource={require('./noimage.jpg')}
							style={{ width: 70, height: 70 }}
							source={{
								uri: 'https:' + item.Image,
									headers: {
										Pragma: 'no-cache',
									},
							}}
							/>
							<TouchableOpacity
							onPressIn={() =>
								this.props.navigation.navigate('ProductDetail', {
									name: item.ProductId,
									token: this.state.token,
								})
							}
							style={{ marginLeft: 10 }}>
							<View>
							<Text style={{ color: 'black' }}>
							{item.Brand} {item.Model}
							</Text>

							<Text style={{ color: 'black' }}>{item.Name}</Text>
							</View>
							</TouchableOpacity>
							</View>

							<View style={{ flexDirection: 'row', flex: 1 }} />
							</View>

							<View style={{ flexDirection: 'row' }}>
							<View style={{ flexDirection: 'column', marginLeft: 75 }}>
							<Text
							style={{
								color: 'gray',
									textDecorationLine: 'line-through',
									fontSize: 14,
									textAlign: 'left',
									marginLeft: 9,
							}}>
							{item.MarketPrice} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}{' '}
							</Text>

							<Text
							style={{
								color: 'blue',
									fontSize: 14,
									textAlign: 'left',
									marginLeft: 9,
							}}>
							{item.Price} {ProjectOrderPaymentMethod ==2 || ProjectOrderPaymentMethod ==4 ?'Puan':'TL'}
							</Text>
							</View>
							<View
							style={{
								height: 25,
									width: 83,
									borderColor: ColorCode,
									borderWidth: 0.8,
									borderRadius: 5,
									padding: 3,
									alignItems: 'center',
									justifyContent: 'center',
									position: 'absolute',
									right: 10,
									bottom: 5,
							}}>
							<Text style={{ color: ColorCode, fontSize: 13 }}>
							Sepete ekle
							</Text>
							</View>
							</View>
							</View>
						)}
						/>
						</View>
					) : (
						<View />
					)}


		
					</ScrollView>
			{this.state.cart && this.state.cart.Warnings !== true && !!this.state.itemss ? (




				<Button icon="check" mode="contained"

				style={{position:'absolute',bottom:0,margin:5,width:Dimensions.get('window').width-10,backgroundColor:ColorCode,zIndex:300}}
				onPress={() => {
					if (this.state.cart && this.state.cart.Warnings) {
						Alert.alert('Hata','Hatalar sebebiyle devam edilemiyor');
						return;
					}


					this.props.navigation.navigate('CheckoutPage', {
						token: this.state.token,
						paymentway: this.props.navigation.state.params.paymentway,
						secilenadres: this.state.secilenadres,
					});


					return
				}}


				>
				Alışverişi Tamamla

				</Button>



			) : (
				<View />
			)}
				{this.state.loading && true&& (
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

class PaymentSuccessScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}
	static navigationOptions = {
		title: 'Siparişiniz Alındı',
		header: null,

		//header: null,
	};

	componentDidMount() {
		this.setState({ token: this.props.navigation.state.params.token });
		//alert(JSON.stringify(this.props))
		//this.showcart()
	}

	render() {
		return <View />;
	}
}

class ShippingDetailsScreen extends React.Component {
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

class OrderSummaryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}
	static navigationOptions = {
		title: 'Sipariş Özeti',
		header: null,
	};

	componentDidMount() {
		this.setState({ token: this.props.navigation.state.params.token });
		this.showcart();
		this.totalpoint();
		if (this.props.navigation.state.params.bankid) {
			this.confirmorder(true);
		} else {
			this.confirmorder(false);
		}

		this.pulladdress(this.props.navigation.state.params.secilenadres);
		var kods = [];
		var strr;
		for (var i = 0; i < this.props.navigation.state.params.kupon; i++) {
			kods.push(this.props.navigation.state.params.kupon[i]['Code']);
		}
		if (this.props.navigation.state.params.kupon.length > 1) {
			strr = kods.join(',');
		} else {
			strr = kods[0];
		}
		fetch(
			API_URL+'/checkout/paymentInformation-paymentmethod',
			{
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				body:
				'SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&Codes=' +
				this.props.navigation.state.params.kupon,
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
				// this.setState({ loading: false, cards: response.PaymentTypes });
				// alert(JSON.stringify(response));
				//  alert(JSON.stringify(response))
				this.setState({
					odemebilgileri: response,
					kupon: response.BondList,
					paymenttypeid: response.PaymentMethodId,
					orderpaymenttypeid: response.OrderPaymentTypeId,
					thiscash: response.Cash,
					bringoff: true,
				});
			});
	}
	pulladdress(id) {
		fetch(API_URL+'/customeraddress/get/' + id, {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body: 'id=',
		})
			.then(response => {
				return response.json();
			})

			.then(response => {
				// alert(JSON.stringify( response))
				this.setState({ adres: response });
			});
	}

	completeorder(bank) {
		this.setState({ loading: true });
		if (bank) {
			var bodyparse =
				'OrderId=' +
				this.state.completeorderid +
				'&Codes=' +
				this.props.navigation.state.params.kupon +
				'&BankPosId=' +
				'&SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				// '&OrderId=00000000-0000-0000-0000-000000000000'+
				//'&InstallmentId=00000000-0000-0000-0000-000000000000' +
				'&BankId=' +
				this.state.bankid;

			// alert(bodyparse);
		} else {
			var bodyparse =
				'OrderId=' +
				this.state.completeorderid +
				'&Codes=' +
				this.props.navigation.state.params.kupon +
				'&BankPosId=' +
				'&SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod;
			// '&OrderId=00000000-0000-0000-0000-000000000000'+
			//'&InstallmentId=00000000-0000-0000-0000-000000000000' +
			//'&BankId=00000000-0000-0000-0000-000000000000'
		}

		fetch(API_URL+'/checkout/complete-order', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: bodyparse,
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
				// alert(JSON.stringify(response));
				//this.showcart()
				this.props.navigation.navigate('ConfirmPayment', {
					message: response.ResultMessage,
					token: this.props.navigation.state.params.token,
				});
				//	this.completeorderaftergateway(response.ResultMessage)
				//this.gatewayapi(response.ResultMessage);
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	confirmorder(bank) {
		//this.props.navigation.navigate('ConfirmPayment')
		//return
		var bonds = ['TEST31', 'TEST32'];

		this.setState({ loading: true });
		//	alert(JSON.stringify(this.state.form))
		//
		//

		fetch(
			API_URL+'/checkout/paymentInformation-paymentmethod',
			{
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				body:
				'SelectedPaymentMethod=' +
				ProjectOrderPaymentMethod +
				'&Codes=' +
				this.props.navigation.state.params.kupon,
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
				// this.setState({ loading: false, cards: response.PaymentTypes });
				//    alert(JSON.stringify(response));
				//  alert(JSON.stringify(response))
				this.setState({
					odemebilgileri: response,
					kupon: response.BondList,
					paymenttypeid: response.PaymentMethodId,
					orderpaymenttypeid: response.OrderPaymentTypeId,
					thiscash: response.Cash,
					bringoff: true,
				});
				var kupon = [];
				for (var i = 0; i < response.BondList.length; i++) {
					kupon.push(response.BondList[i].Code);
				}
				this.setState({ kupon: kupon });
					var bodyparse;
				if (bank) {
						bodyparse = //'PaymentMethodId=' + response.OrderPaymentTypeId	//	+
						// this.state.orderpaymenttypeid +
						'Codes=' +
						this.props.navigation.state.params.kupon +
						'&SelectedPaymentMethod=' +
						ProjectOrderPaymentMethod +

						'&BankId=' +
						this.props.navigation.state.params.bankid;
				} else {
						bodyparse =
						'PaymentMethodId=' +
						response.OrderPaymentTypeId +
						'&BankId=00000000-0000-0000-0000-000000000000' +
						'&Codes=' +
						this.props.navigation.state.params.kupon +
						'&SelectedPaymentMethod=' +
						ProjectOrderPaymentMethod;
								}
				if (this.props.navigation.state.params.cash == 'noneed') {
					bodyparse =
						'PaymentMethodId=' +
						response.OrderPaymentTypeId +
						'&BankId=00000000-0000-0000-0000-000000000000' +
						'&Codes=' +
						this.props.navigation.state.params.kupon +
						'&SelectedPaymentMethod=' +
						ProjectOrderPaymentMethod;
				}
				fetch(API_URL+'/checkout/confirm-order', {
					method: 'POST', timeout: 20000,
					headers: {
						Authorization: 'Bearer ' + this.props.navigation.state.params.token,
						Accept: 'application/x-www-form-urlencoded',
						'Content-Type': 'application/x-www-form-urlencoded',
					},

					body: bodyparse,
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

						this.setState({ completeorderid: response.ResultMessage });

						fetch(API_URL+'/content/get', {
							method: 'POST', timeout: 20000,
							headers: {
								Authorization:
								'Bearer ' + this.props.navigation.state.params.token,
								Accept: 'application/x-www-form-urlencoded',
								'Content-Type': 'application/x-www-form-urlencoded',
							},

							body:
							'OrderId=' + response.ResultMessage + '&key=Satış Sözleşmesi',
						})
							.then(response => {
								const statusCode = response.status;
								if (statusCode != 200) {
									//alert('oturum süresi dolmuştur.');
									self.setState({ loading: false });
									const resetAction = NavigationActions.reset({
										index: 0,
										actions: [
											NavigationActions.navigate({ routeName: 'Home' }),
										],
									});

									self.props.navigation.dispatch(resetAction);
									self.props.navigation.navigate('Splash');
								} else {
									return response.json();
								}
							})
							.then(response => {
								this.setState({
									loading: false,
								});

								this.setState({
									htmlcontent: response.ResultMessage,
									loading: false,
								});
								this.setState({ agreementapproved: 1 });
								// alert(response.ResultMessage)
							})
							.catch(error => {
								this.props.navigation.navigate('Home');
								//alert(error);
							});
					})
					.catch(error => {
						this.props.navigation.navigate('Home');
						//alert(error);
					});
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	totalpoint() {
		var self = this;
		self.setState({ loading: true });
		fetch(API_URL+'/customer/TotalPoint', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body:'id='+orderid,
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
				self.setState({
					loading: false,
					totalpoint: parseFloat(response.ResultMessage) * 1000,
				});
				// alert(parseFloat(response.ResultMessage)*1000)
			})
			.catch(error => {
				self.props.navigation.navigate('Splash');
				////alert(error);
				self.setState({ loading: false });
				self.props.navigation.navigate('Splash');
			});
	}

	showcart() {
		var self = this;
		self.setState({ loading: true, gotocart: true });
		//	this.setState({showorders:true})
		//alert(this.state.token)
		fetch(API_URL+'/shoppingcart/list/', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body:'id='+orderid,
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
				//  alert(JSON.stringify(response));

				self.setState({ loading: false, cart: response, run: true });
				var itemss = self.state.cart.Items;
				//	var Warnings = this.state.cart.Warnings.replace('***', '\n');
				var Warnings = self.state.cart.Warnings;

				self.setState({ Warnings: Warnings, itemss: itemss });
				if (itemss.length < 1) {
					self.setState({ itemss: false });
				}
			})
			.catch(error => {
				self.props.navigation.navigate('Splash');
				////alert(error);
				self.setState({ loading: false });
				self.props.navigation.navigate('Splash');
			});
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
			<View
			style={{
				height: Platform.OS === 'ios' ? 70 : 70,
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: 1,
					borderBottomWidth: 0.5,
					borderColor: '#ccc',
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
			Sipariş Özeti{' '}
			</Text>

			<TouchableOpacity activeOpacity={1} onPressIn={() => alert('yenile')}>
			<EIcon name="refresh" size={30} color="white" />
			</TouchableOpacity>
			</View>
			<ScrollView style={{ flex: 1 }}>
			{!this.state.itemss && (
				<View style={{ flexDirection: 'column', alignItems: 'center' }}>
				<EnIcon name="emoji-neutral" size={130} color="#eee" />
				<Text style={{ textAlign: 'center', color: '#888', margin: 20 }}>
				Sepetinizde ürün bulunmamaktadır.
				</Text>
				</View>
			)}
			{!!this.state.cart && (
				<FlatList
				style={{ backgroundColor: 'white' }}
				data={this.state.cart.Items}
				renderItem={({ item }) => (
					<View>
					<View
					style={{
						flexDirection: 'column',
							marginTop: 0,
							padding: 5,
							marginBottom: 2,
					}}>
					<View
					style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image defaultSource={require('./noimage.jpg')}
					style={{ width: 70, height: 70 }}
					source={{
						uri: 'https:' + item.ProductImage,
							headers: {
								Pragma: 'no-cache',
							},
					}}
					/>
					<TouchableOpacity
					onPressIn={() =>
						this.props.navigation.navigate('ProductDetail', {
							name: item.ProductId,
							token: this.state.token,
						})
					}
					style={{ marginLeft: 10 }}>
					<Text style={{ color: 'black', fontSize: 14 }}>
					{item.Brand} {item.Model}
					</Text>

					<Text style={{ color: 'black', fontSize: 14 }}>
					{item.Name}
					</Text>
					</TouchableOpacity>
					</View>
					<View style={{ flexDirection: 'row', flex: 1 }}>
					<View
					style={{
						flexDirection: 'row',
							borderRadius: 10,
							width: 23,
							height: 23,
							backgroundColor: '#dede',
							alignItems: 'center',
							justifyContent: 'center',
					}}>
					<Text
					style={{
						color: 'black',
					}}>
					x{item.Quantity}
					</Text>
					</View>
					<TouchableOpacity
					style={{ position: 'absolute', bottom: 0, right: 5 }}>
					<View>
					<Text style={{ color: 'gray' }}>Birim Fiyatı:</Text>
					<Text style={{ color: 'black' }}>
					{item.Price} Puan
					</Text>
					</View>
					</TouchableOpacity>
					</View>
					</View>
					<View
					style={{
						height: 1,
							backgroundColor: 'white',
							width: Dimensions.get('window').width,
							margin: 10,
					}}
					/>
					</View>
				)}
				/>
			)}
			</ScrollView>

			{this.state.adres &&
				this.state.odemebilgileri &&
				this.state.itemss !== false &&
				this.state.cart && (
					<ScrollView
					style={{
						borderColor: '#ccc',
							backgroundColor: 'white',
							padding: 10,
							flex: 0.2,
					}}>
					<View
					style={{
						backgroundColor: 'white',
							padding: 5,
							flex: 1,
							flexDirection: 'row',
							flex: 0.2,
					}}>
					<View style={{ flex: 0.3, flexDirection: 'column' }} />
					<View style={{ flex: 0.3, flexDirection: 'column' }}>
					{this.props.navigation.state.params.kupon &&
						this.props.navigation.state.params.kupon.length > 0 &&
						false && (
							<Text
							style={{
								fontSize: 12,
									color: 'gray',
									textAlign: 'right',
							}}>
							Kupon toplamı:
							</Text>
						)}
					<Text
					style={{
						fontSize: 12,
							color: 'gray',
							textAlign: 'right',
					}}>
					Sepet Toplam:
					</Text>
					<Text
					style={{
						fontSize: 12,
							color: 'gray',
							textAlign: 'right',
					}}>
					Kargo Bedeli:
					</Text>
					<Text
					style={{
						fontSize: 12,
							color: 'gray',
							textAlign: 'right',
					}}>
					İndirim:
					</Text>
					{this.state.cvc && (
						<Text
						style={{
							fontSize: 12,
								color: 'gray',
								textAlign: 'right',
						}}>
						Vade Farkı:
						</Text>
					)}

					<Text
					style={{
						fontSize: 12,
							color: 'gray',
							textAlign: 'right',
					}}>
					Ödenecek Miktar:
					</Text>
					</View>
					<View style={{ flex: 0.3 }}>
					{this.props.navigation.state.params.kupon &&
						this.props.navigation.state.params.kupon.length > 0 &&
						false && (
							<Text
							style={{
								fontSize: 12,
									color: ColorCode,
									textAlign: 'right',
							}}>
							{this.props.navigation.state.params.kupontoplam} Puan
							</Text>
						)}
					<Text
					style={{
						fontSize: 12,
							color: ColorCode,
							textAlign: 'right',
					}}>
					{this.state.odemebilgileri.SubTotal} Puan
					</Text>
					<Text
					style={{
						fontSize: 12,
							color: ColorCode,
							textAlign: 'right',
					}}>
					{this.state.odemebilgileri.CargoTotal} Puan
					</Text>
					<Text
					style={{
						fontSize: 12,
							color: ColorCode,
							textAlign: 'right',
					}}>
					{this.state.odemebilgileri.Discount} Puan
					</Text>
					{this.state.cvc && (
						<Text
						style={{
							fontSize: 12,
								color: ColorCode,
								textAlign: 'right',
						}}>
						{this.props.navigation.state.params.vadefarki} TL
						</Text>
					)}
					<Text
					style={{
						fontSize: 12,
							color: ColorCode,
							textAlign: 'right',
					}}>
					{this.state.odemebilgileri.Cash} TL
					</Text>
					</View>
					</View>

					<View>
					<Text style={{ fontWeight: '800' }}>Teslimat Adresi:</Text>

					<Text
					style={{
						fontSize: 12,
							color: 'gray',
					}}>
					{this.state.adres.ShippingFirstName}{' '}
					{this.state.adres.ShippingLastName}
					</Text>
					<Text
					style={{
						fontSize: 12,
							color: 'gray',
					}}>
					{this.state.adres.ShippingAddress}
					</Text>
					<Text
					style={{
						fontSize: 12,
							color: 'gray',
					}}>
					{this.state.adres.ShippingCityName} /{' '}
					{this.state.adres.ShippingTownName}
					</Text>
					</View>

					<View>
					<Text style={{ fontWeight: '800' }}>Ödeme Bilgileri:</Text>
					{this.state.isim ? (
						<View>
						<Text
						style={{
							fontSize: 12,
								color: 'gray',
						}}>
						Kart Sahibi:{'\n'}
						{this.state.isim}
						</Text>
						<Text
						style={{
							fontSize: 12,
								color: 'gray',
						}}>
						Kart Numarası:{'\n'}
						{this.state.kartno}
						</Text>
						<Text
						style={{
							fontSize: 12,
								color: 'gray',
						}}>
						SKT:{'\n'}
						{this.state.skt}
						</Text>

						<Text
						style={{
							fontSize: 12,
								color: 'gray',
						}}>
						CVC:{'\n'}
						{this.state.cvc}
						</Text>
						</View>
					) : (
						<View />
					)}

					{this.state.havale ? (
						<View>
						<Text>Havale ile ödeme</Text>
						</View>
					) : (
						<View />
					)}
					{!this.props.navigation.state.params.bankid &&
							!this.state.isim && (
								<View>
								<Text>Sadece Puan ile ödeme</Text>
								</View>
							)}
					{this.props.navigation.state.params.bankid && (
						<View style={{ marginBottom: 30 }}>
						<Text style={{ fontSize: 12, color: 'gray' }}>
						Transfer için Banka Detayları {'\n'}Banka Adı:{JSON.stringify(
							this.props.navigation.state.params.havaledetails[0].Name
						)}
						</Text>
						<Text style={{ fontSize: 12, color: 'gray' }}>
						Şube Adı:{
							this.props.navigation.state.params.havaledetails[0]
								.BranchOffice
						}
						</Text>
						<Text style={{ fontSize: 12, color: 'gray' }}>
						Şube Kodu:{
							this.props.navigation.state.params.havaledetails[0]
								.OfficeNumber
						}
						</Text>
						<Text style={{ fontSize: 12, color: 'gray' }}>
						Hesap No:{
							this.props.navigation.state.params.havaledetails[0]
								.AccountNumber
						}
						</Text>
						<Text style={{ fontSize: 12, color: 'gray' }}>
						IBAN:{
							this.props.navigation.state.params.havaledetails[0]
								.IbanNumber
						}
						</Text>
						</View>
					)}
					</View>
					</ScrollView>
				)}

			{this.state.showagreement && (
				<View
				style={{
					height: Dimensions.get('window').height-StatusBar.currentHeight,
						position: 'absolute',
						marginBottom: 0,
						zIndex: 199,
						marginTop: Platform.OS=='ios'?30:StatusBar.currentHeight,
				}}>
				<TouchableOpacity
				style={{
					backgroundColor: 'red',
						alignItems: 'center',
						justifyContent: 'center',
				}}
				onPressIn={() => this.setState({ showagreement: false })}>
				<Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
				KAPAT
				</Text>
				</TouchableOpacity>

				<WebView
				scalesPageToFit={false}
				style={{
					width: Dimensions.get('window').width,
						height: 100,
						borderWidth: 1,
						//position:'absolute',zIndex:100
				}}
				source={{baseUrl: '',
					html:
					'<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"><meta charset="ISO-8859-1"><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=windows-1254"><META HTTP-EQUIV="Content-language" CONTENT="tr"></head><body>' +
						this.state.htmlcontent +
						'</body></html>',
				}}
				/>
				</View>
			)}
			<View
			style={{
				flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: 20,
					backgroundColor: 'white',
			}}>
			{Platform.OS == 'ios' ? (
				<TouchableOpacity
				activeOpacity={1}
				onPressIn={() => {
					if (this.state.showagreement) {
						this.setState({ showagreement: false });
					} else {
						this.setState({ showagreement: true });
					}
				}}>
				<View
				style={{
					flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center',
						paddingLeft: 5,
						borderTopWidth: 0.5,
						borderTopColor: '#ccc',
				}}>
				<Switch
				onValueChange={val => {
					if (this.state.checkval) {
						this.setState({ checkval: false });
					} else {
						this.setState({ checkval: true });
					}
					this.setState({
						agreementapproved: 2,
						odemeyionayla: 'Ödemeyi Onayla',
					});
				}}
				value={this.state.checkval}
				/>
				</View>
				</TouchableOpacity>
			) : (
				<CheckBox
				onClick={() => {
					if (this.state.checkval) {
						this.setState({ checkval: false });
					} else {
						this.setState({ checkval: true });
					}
					this.setState({
						agreementapproved: 2,
						odemeyionayla: 'Ödemeyi Onayla',
					});
				}}
				value={this.state.checkval}
				/>
			)}
			<TouchableOpacity
			activeOpacity={1}
			onPress={() => {
					this.props.navigation.navigate('Agreement',{data:this.state.htmlcontent})
										return

				if (this.state.showagreement) {
					this.setState({ showagreement: false });
				} else {
					this.setState({ showagreement: true });
				}
			}}>
			<Text style={{ color: 'blue', textAlign: 'left' }}>
			Satış Sözleşmesini okudum, onaylıyorum.
			</Text>
			</TouchableOpacity>
			</View>
			{this.state.completeorderidss && (
				<Text style={{ color: 'red', fontSize: 10 }}>
				Sipariş oluşturuldu. {this.state.completeorderid}
				</Text>
			)}
			<TouchableOpacity
			disabled={!this.state.checkval}
			onPressIn={() => {
				if (this.props.navigation.state.params.bankid) {
					this.completeorder(true);
				} else {
					this.completeorder(false);
					// alert('bankid yok');
				}
			}}>
			<View
			style={{
				height: 50,
					backgroundColor: this.state.checkval == true ? ColorCode : 'gray',
					alignItems: 'center',
					justifyContent: 'center',
			}}>
			<Text style={{ color: 'white', fontSize: 20 }}>
			Siparişi Onayla
			</Text>
			</View>
			</TouchableOpacity>
			</View>
		);
	}
}
class CustomerSupportScreen extends React.Component {
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



class TermsScreen extends React.Component {
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


class NotificationCenterScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}
	static navigationOptions = {
		title: 'nscreen',
		header: null,
	};

	componentDidMount() {
		FCM.setBadgeNumber(0)

		if(Platform.OS=='android'){
			SharedPreferences.getAll((values)=>{
				this.setState({sonuc:values})

				//SharedPreferences.clear();

			});

		}else{


			Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
				.then(realm => {
					//alert(JSON.stringify( notif.notification.body));
					//
					var sonuc= []
					for(var i=0; i<realm.objects('Notifications').length; i++){

						sonuc.push({key: realm.objects('Notifications')[i].notification})

					}
					this.setState({sonuc:sonuc.reverse()})

					//  alert(JSON.stringify( this.state.sonuc)); //Tüm objeleri geri dönderir.


				})


				.catch(error => {
					//alert(error);
				});
		}


	}


	render(){

		return(<View style={{flex:1}}><HHeader title={this} baslik="Bildirim Merkezi" />
			<Text style={{color:'#ccc',fontSize:12,margin:5,textAlign:'center'}}>BILDIRIM GEÇMİŞİ</Text>
			{this.state.sonuc &&
				<Text>{this.state.sonuc}</Text>
			}

			{this.state.sonuc &&
					<FlatList style={{flex:1,height:200,width:Dimensions.get('window').width}}
				data={this.state.sonuc}
				renderItem={({item}) => <Text style={{fontSize:20,paddingLeft:5,fontWeight:'100',paddingBottom:5}}>{item.key}</Text>}
					/>
			}

			</View>);
	}

}
class SearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			pager: 0,
			searchp1: '',
			searchp2: '',
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
		this.setState({
			token: this.props.navigation.state.params.token,
			searchkey: this.props.navigation.state.params.searchkey,
			setmin: 0,
			setmax: this.props.navigation.state.params.setmax,
		});
		if (this.state.searchtext == '') {
			this.setState({ searchresult: false, loading: false });
		}
		if (this.props.navigation.state.params.searchkey) {
			this.setState(
				{
					searchstarted: true,
					searchtext: this.props.navigation.state.params.searchkey,
					loading: true,
					pager: 0,
					searchresult: false,
				},
				function() {
					this.searchaction(
						this.props.navigation.state.params.searchkey,
						0,
						null
					);
				}
			);
		}
		if (this.props.navigation.state.params.setmax) {
			//  alert(
			//     parseInt(this.props.navigation.state.params.setmax.replace('.','').replace(',','.'))

			//)
			this.setState(
				{
					searchstarted: true,
					searchtext: '',
					loading: true,
					pager: 0,
					searchresult: false,
				},
				function() {
					this.searchaction(
						'',
						0,
						parseInt(this.props.navigation.state.params.setmax.replace('.','').replace(',','.'))
					);
				}
			);
		}
	}

	workerforpager(a, kw) {
		// alert('.çö')
		this.setState({ loading: true, pager: a + 1 });
		//alert(this.state.pager)
		var p1 = 20 * a;
		var p2 = 20 * (a + 1);
		fetch(API_URL+'/product/list/', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body:
			'Keywords=' +
			kw +
			'&OrderBy=&BrandName=&PriceMin=' +
			this.state.searchp1 +
			'&PriceMax=' +
			this.state.searchp2 +
			'&P1=' +
			p1 +
			'&P2=' +
			p2,
		})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
				//alert(this.state.ddd[0].Id),
				//	alert(JSON.stringify(response))
				//alert('asdasdadsad')

				var fruits = this.state.searchresult;
				// alert(JSON.stringify(response))

				for (var i = 0; i < response.Products.length; i++) {
					fruits.push({
						Id: response.Products[i].Id,
						Image: response.Products[i].Image,
						Name: response.Products[i].Name,
						Price: response.Products[i].Price,
						Brand: response.Products[i].Brand,
						Model: response.Products[i].Model,
					});
				}
				//alert(JSON.stringify(fruits.length))
				this.setState({ searchresult: fruits, loading: false });
			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				this.setState({ loading: false });

				////alert(error);
			});
	}

	searchaction(text, price1, price2) {
		//alert(JSON.stringify(text))
		if (typeof text === 'undefined') {
			text = '';
		}
		//alert(price1 + ' - ' + price2 )
		if(typeof price2 =='undefined' && typeof price1 == 'undefined' ){
			price1=''
			price2=''
			this.setState({searchp1:price1,searchp2:price2})

		}
		if(price2 && price1==''){
			price1=0
			this.setState({searchp1:price1,searchp2:price2})
		}

		// alert(price1 + ' - ' + price2 )


		this.setState({
			searchtext: text,
			loading: true,
			pager: 0,
			searchresult: false,
		});
		if (text || 1 == 1) {
			fetch(API_URL+'/product/list/', {
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.state.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				body:
				'Keywords=' +
				text +
				'&P1=0&P2=20&PriceMin=' +
				price1  +
				'&PriceMax=' +
				price2 ,
			})
				.then(response => {
					return response.json();
				})
				.then(response => {
					this.setState({ loading: false, searchresult: response.Products });
					// alert(JSON.stringify(response).substr(0,200));
				})
				.catch(error => {
					this.props.navigation.navigate('Home');
					//alert(error);
				});
		} else {
			alert('geçersiz anahtar kelime');
			this.setState({ loading: false });
			return;
		}
	}
	render() {
		return (
			<View style={{ backgroundColor: 'white', flex: 1 }}>

			<Appbar.Header
			style={{backgroundColor:'white',
					zIndex:1000,width:Dimensions.get('window').width,}} dark={false} statusBarHeight={Platform.OS=='ios'?20:0}

			>
			<Appbar.BackAction
			onPress={()=>this.props.navigation.pop()}
			/>


			<Appbar.Content
			title="Arama"
			subtitle={this.state.searchtext?this.state.searchtext:''}        />

			<Appbar.Action icon="sort" onPress={()=>this.setState({aralik:!this.state.aralik})} />

			</Appbar.Header>
			{false&&
			<Searchbar
			placeholder="Ürün, Kategori giriniz."
			onChangeText={searchtext =>
				this.setState({ searchtext: searchtext })
			}
			value={null}
			onSubmitEditing={() => {
				this.searchaction(
					this.state.searchtext,
					this.state.searchp1,
					this.state.searchp2
				);
				this.setState({ searchstarted: true });
			}}
			/>
		}<View style={{flexDirection:'row',width:Dimensions.get('window').width}}>
		<TextInput placeholder="Ürün, Kategori giriniz."  style={{width:Dimensions.get('window').width-50}} 
		onChangeText={searchtext =>
			this.setState({ searchtext: searchtext })
		}
			/>
			{true&&
			<View style={{justifyContent:'center',alignItems:'center',backgroundColor:ColorCode,width:50}}><Text style={{fontWeight:'800',color:'white'}} onPress={() => {
				this.searchaction(
					this.state.searchtext,
					this.state.searchp1,
					this.state.searchp2
				);
				this.setState({ searchstarted: true });
			}}>Ara</Text>
			</View>
			
		}
		</View>






			<View
			style={{
				backgroundColor: 'white',
					marginTop: Platform.OS == 'ios' ? 0 : 0,
					width: Dimensions.get('window').width,
					justifyContent: 'center',
					flexDirection: 'row',
					alignItems: 'center',
			}}>
			{this.state.searchstartedxxx && (
				<TouchableOpacity
				onPressIn={() =>
					this.setState({ searchresult: false, searchtext: false })
				}>
				<EIcon
				name="close-o"
				style={{ marginRight: 4 }}
				size={20}
				color="red"
				/>
				</TouchableOpacity>
			)}
			</View>
			{this.state.aralik && (
				<View style={{ flexDirection: 'row' }}>
				<View
				style={{
					flexDirection: 'row',
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'white',
				}}>
				<TextInput
				underlineColorAndroid="rgba(0,0,0,0)"
				style={{

						//	borderWidth: 0.8,

						//	borderColor: ColorCode,
						//	borderWidth: 0.8,
						textAlign: 'center',
						width: Dimensions.get('window').width / 3,
						//height: Platform.OS == 'ios' ? 30 : 40,
						margin: 5,
						flex: 0.5,
				}}
				label={'Min:0'}
				onChangeText={searchp1 => {
					this.setState({ searchp1: searchp1 });
				}}
				value={this.state.searchp1}
				/>

				<TextInput
				underlineColorAndroid="rgba(0,0,0,0)"
				style={{

						//	borderWidth: 0.8,

						width: Dimensions.get('window').width / 3,
						//height: Platform.OS == 'ios' ? 30 : 40,
						flex: 0.5,
						textAlign: 'center',
						margin: 5,
						//	borderColor: ColorCode,
						//	borderWidth: 0.8,
				}}
				label={
					this.props.navigation.state.params.setmax
					? 'Max:' + this.props.navigation.state.params.setmax
					: 'Max:9999'
				}
				onChangeText={searchp2 => {
					this.setState({ searchp2: searchp2 });
				}}
				value={this.state.searchp2}
				/>

				{!this.state.grid&&false&&
					<EnIcon name="grid" onPress={()=>this.setState({grid:!this.state.grid})} size={25} color="black" />
				}
				{this.state.grid&&false&&
						<EnIcon name="text" onPress={()=>this.setState({grid:!this.state.grid})} size={25} color="black" />
				}
{false&&<Text style={{margin:2}} onPress={() => {
				this.searchaction(
					this.state.searchtext,
					this.state.searchp1,
					this.state.searchp2
				);
				this.setState({ searchstarted: true });
			}}>Ara</Text>
		}
				</View>



				</View>
			)}
			{false && (
				<View
				style={{
					justifyContent: 'flex-end',
						alignItems: 'center',
						flexDirection: 'row',
						paddingRight: 10,
				}}>
				<TouchableHighlight
				onPressIn={() => {
					this.setState({ showfilter: true });
				}}>
				<Text style={{ color: 'blue', marginRight: 5 }}>Filtre ekle</Text>
				</TouchableHighlight>
				</View>
			)}
			<View
			style={{
				backgroundColor: 'white',
					alignItems: 'center',
					paddingTop: 5,
					flex: 1,
					width: Dimensions.get('window').width,
			}}>
			{!this.state.searchresult && (
				<EIcon
				name="search"
				style={{ margin: 40, opacity: 0.7 }}
				size={130}
				color="#888"
				/>
			)}
			{this.state.searchresult && (
				<View style={{ flex: 1 }}>
				<Text
				style={{
					fontWeight: '800',
						color: 'gray',
						margin: 3,
						textAlign: 'center',
						backgroundColor: '#efefef',
						borderRadius: 2,
				}}>
				Arama Sonuçları
				</Text>




				{this.state.searchresult && this.state.grid &&(
					<View style={{flex:1}}>
					<FlatList
					onEndReachedThreshold={1}
					onEndReached={({ distanceFromEnd }) => {
						// alert(this.state.pager)
						this.workerforpager(
							this.state.pager + 1,
							this.state.searchtext
						);
						//alert('asd')
					}}
					numColumns={2}

					style={{ flex: 1, width: Dimensions.get('window').width }}
					data={this.state.searchresult}
					renderItem={({ item }) => (
						<TouchableOpacity
						style={{ alignItems: 'center',width:Dimensions.get('window').width/2 - 5 }}
						onPress={() => {
							//alert(item.Id);
							this.props.navigation.navigate('ProductDetail', {
								name: item.Id,
								token: this.props.navigation.state.params.token,
							});
						}}>
						<View
						style={{
							flexDirection: 'column',
								alignItems: 'center',
								textAlign: 'left',
								backgroundColor: 'white',
						}}>
						<Image defaultSource={require('./noimage.jpg')}
						style={{
							height: 180,
								width: Dimensions.get('window').width/2 - 5,
						}}
						resizeMode={'contain'}
						source={{ uri: 'https:' + item.Image }}
						/>
						<View
						style={{
							backgroundColor: '#FFFFFF',
								flexDirection: 'column',
								padding: 10,
								justifyContent: 'center',
								textAlign: 'left',
						}}>
						<Text
						numberOfLines={2}
						style={{
							//fontSize: 16,
							fontWeight: 'bold',
								textAlign: 'left',
						}}>
						{item.Brand} {item.Name} {item.Model}
						</Text>
						<Text style={{ fontSize: 12, fontWeight: '100' }}>
						{item.Brand}
						</Text>

						<Text
						style={{
							//fontSize: 20,
							fontWeight: '100',
								color: ColorCode,
						}}>
						{item.Price} Puan
						</Text>

						</View>
						</View>
						</TouchableOpacity>
					)}
					/>
					</View>  )}



				{this.state.searchresult && !this.state.grid&& (
					<FlatList
					onEndReachedThreshold={1}
					onEndReached={({ distanceFromEnd }) => {
						// alert(this.state.pager)
						this.workerforpager(
							this.state.pager + 1,
							this.state.searchtext
						);
						//alert('asd')
					}}
					style={{ flex: 1, width: Dimensions.get('window').width }}
					data={this.state.searchresult}
					renderItem={({ item }) => (
						<TouchableOpacity
						style={{ alignItems: 'center' }}
						onPress={() => {
							//alert(item.Id);
							this.props.navigation.navigate('ProductDetail', {
								name: item.Id,
								token: this.props.navigation.state.params.token,
							});
						}}>
						<View
						style={{
							flexDirection: 'row',
								alignItems: 'center',
								textAlign: 'left',
								backgroundColor: 'white',
						}}>
						<Image defaultSource={require('./noimage.jpg')}
						style={{
							flex: 0.3,
								height: 100,
								width: 100,
						}}
						resizeMode={'contain'}
						source={{ uri: 'https:' + item.Image }}
						/>
						<View
						style={{
							flex: 0.7,
								backgroundColor: '#FFFFFF',
								flexDirection: 'column',
								padding: 10,
								justifyContent: 'center',
								textAlign: 'left',
						}}>
						<Text
						style={{
							fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,

								//fontSize: 16,
								fontWeight: '100',
								textAlign: 'left',
						}}>
						{item.Brand} {item.Name} {item.Model}
						</Text>
						<Text style={{ fontSize: 12, fontWeight: '100' }}>
						{item.Brand}
						</Text>

						<Text
						style={{
							//fontSize: 20,
							//  fontWeight: '100',
							//  color: ColorCode,
							fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,
								fontWeight: '800',
								fontSize: 20,

						}}>
						{item.Price} Puan
						</Text>

						<View
						style={{
							backgroundColor: 'white',
								width: 115,
								height: 25,
								borderRadius: 5,
								alignItems: 'center',
								justifyContent: 'center',
						}}
						/>
						<Text style={{ fontWeight: '200' }} />
						</View>
						</View>
						</TouchableOpacity>
					)}
					/>
				)}
				</View>
			)}
			</View>

			{this.state.loading && (
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


class OrderDetailScreen extends React.Component {
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
//alert(JSON.stringify(this.props.navigation.state.params.data))

	}
	render(){
		return(<ScrollView ><HHeader title={this} baslik= {"Sipariş No: "+ this.props.navigation.state.params.siparisno}/>
			{false &&<Paragraph>{JSON.stringify(this.props.navigation.state.params.data)}</Paragraph>}

<View style={{margin:10}}>


			<List.Section style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10}}>
			<Title>Sepet Detayı</Title>
			<Text>Ürün adedi: {this.props.navigation.state.params.data.Items.length}</Text>
			{this.props.navigation.state.params.data.ShoppingCart.Cash>0 &&
			<Text >Ödenen Miktar: {this.props.navigation.state.params.data.ShoppingCart.Cash>0?this.props.navigation.state.params.data.ShoppingCart.Cash:''} {this.props.navigation.state.params.data.ShoppingCart.Cash>0 ? 'TL':''}</Text>
			}
			<Text>Toplam: {this.props.navigation.state.params.data.ShoppingCart.Total} Puan</Text>



				<FlatList
			data={this.props.navigation.state.params.data.Items}
			renderItem={(item)=><View style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10,flexDirection:'row'}}>
					<Image defaultSource={require('./noimage.jpg')}
				source={{ uri: 'https:' + item.item.ProductImage }}
				style={{ width: 50, height: 50 }}
				/>

<View>
				<Text>{(item.item.ProductName)}</Text>
				<Text>Adet: {(item.item.Quantity)}</Text>
				<Text>Fiyat: {(item.item.Price)}</Text>

				<Text>Sipariş Durumu: {(item.item.OrderState)}</Text>
				</View>

				</View>}


			/>

			</List.Section>

			 <List.Section style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10}}>
			<Title>Teslimat Bilgileri</Title>

			<Text>İsim: {this.props.navigation.state.params.data.ShippingPerson}</Text>
			<Text>Adres: {this.props.navigation.state.params.data.ShippingAddress} {this.props.navigation.state.params.data.ShippingCity} {this.props.navigation.state.params.data.ShippingTown} {this.props.navigation.state.params.data.ShippingCountry}</Text>

			</List.Section>
 <List.Section style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10}}>
			<Title>Fatura Bilgileri</Title>

			<Text>İsim: {this.props.navigation.state.params.data.BillingPerson}</Text>
			<Text>Adres: {this.props.navigation.state.params.data.BillingAddress} {this.props.navigation.state.params.data.BillingCity} {this.props.navigation.state.params.data.BillingTown} {this.props.navigation.state.params.data.BillingCountry}</Text>

			</List.Section>
			{this.props.navigation.state.params.data.CargoLink!==null &&
<List.Section  style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10}}>
			<Title>Kargo Bağlantısı</Title>

			<Text onPress={()=>{if(this.props.navigation.state.params.data.CargoLink==null)return;
				Linking.openURL(this.props.navigation.state.params.data.CargoLink).catch(err => alert('hata oluştu'+err))}}>Kargo Linki: {this.props.navigation.state.params.data.CargoLink!==null?this.props.navigation.state.params.data.CargoLink:'Kargo takip linkiniz henüz oluşmadı'}</Text>

			</List.Section>
			}

		</View>

			</ScrollView>);

	}
}


class MyAccountScreen extends React.Component {
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
		return(<View><HHeader title={this} baslik="Hesap Ayarları"/>
<List.Section title="Hesap Bilgilerim">
        <List.Item onPress={()=>this.props.navigation.navigate('ChangeMyPassword',{token:this.props.navigation.state.params.token})} style={{backgroundColor:'white'}}
          title="Şifremi Değiştir"
          right={() => <EnIcon name="chevron-thin-right" size={20} color="#ccc" />}
       />
        <List.Item onPress={()=>this.props.navigation.navigate('UpdateMyProfile',{token:this.props.navigation.state.params.token})} style={{backgroundColor:'white'}}
          title="Bilgilerimi Güncelle"
          right={() => <EnIcon name="chevron-thin-right" size={20} color="#ccc" />}
       />


     </List.Section>
<List.Section title="Sipariş Süreci">
	<List.Item onPress={()=>this.props.navigation.navigate('MyOrders',{token:this.props.navigation.state.params.token})} style={{backgroundColor:'white'}}

          title="Siparişlerim"
          right={() => <EnIcon name="chevron-thin-right" size={20} color="#ccc" />}
       />

			  </List.Section>


			</View>);

	}
}


class ChangeMyPasswordScreen extends React.Component {
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
	changepass() {
		this.setState({ loading: true });
		var self = this;
if(this.state.newpass !== this.state.newpass1){
	this.dropdown.alertWithType('error', 'Hata','Yeni şifreniz uyuşmuyor!');
	return;}

				fetch(API_URL+'/customer/changepassword', {
			method: 'POST', timeout: 20000,
headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},


			body: 'OldPassword=' + this.state.oldpass + '&NewPassword='+this.state.newpass1,
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
		return(<View style={{backgroundColor:'white'}}><HHeader title={this} baslik="Şifremi Değiştir"/>

			<TextInput
			label={
				"Şuanki Şifreniz"			}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"
			secureTextEntry
			onChangeText={oldpass => this.setState({ oldpass })}
			value={this.state.oldpass}
			/>
				<TextInput
			secureTextEntry
			label={
				"Yeni Şifreniz"			}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"

			onChangeText={newpass => this.setState({ newpass })}
			value={this.state.newpass}
			/>
	<TextInput
			secureTextEntry
			label={
				"Tekrar"			}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"

			onChangeText={newpass1 => this.setState({ newpass1 })}
			value={this.state.newpass1}
			/>


			<Button mode="contained" onPress={()=> this.changepass(this.state.eposta)} color={ColorCode} dark compact>Şifremi Değiştir</Button>
			<DropdownAlert ref={ref => this.dropdown = ref} />

			</View>);

	}
}


class AgreementScreen extends React.Component {
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


		}







	render(){
		return(<View style={{flex:1}}><HHeader title={this} baslik="Satış Sözleşmesi"/>
							
		
	<WebView
				scalesPageToFit={false}
				style={{
					width: Dimensions.get('window').width,
						height:  Dimensions.get('window').height,
						//position:'absolute',zIndex:100
				}}
				source={{baseUrl: '',
					html:
					'<html><html lang="tr"><head><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"><META HTTP-EQUIV="Content-language" CONTENT="tr"><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=windows-1254"></head><body>' +
						this.props.navigation.state.params.data +
						'</body></html>',
				}}
				/>

			</View>);

	}
}


class MyOrdersScreen extends React.Component {
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



class UpdateMyProfileScreen extends React.Component {
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
updateprofile(){


	fetch(API_URL+'/customer/myaccount-update', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		body:'FirstName='+this.state.isim+'&LastName='+this.state.soy+'&Gsm='+this.state.gsm+'&Email='+this.state.email


		})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
			//	this.setState({menu:response.ResultMessage})
					if (response.ResultCode == 'OK') {
					this.dropdown.alertWithType('info', 'Tamam',response.ResultMessage);

					//  this.props.navigation.navigate('Home');
				} else {
					this.dropdown.alertWithType('error', 'Hata',response.ResultMessage);
				}


			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				this.setState({ loading: false });

				////alert(error);
			});




}
	componentDidMount() {
fetch(API_URL+'/customer/myaccount', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
	//	body:'FirstName='+this.state.isim+'&LastName='+this.state.soy+'&Gsm='+this.state.gsm+'&Email='+this.state.email


		})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
			//	alert(JSON.stringify(response))
				this.setState({isim:response.FirstName,soy:response.LastName,gsm:response.Gsm,email:response.Email})
			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				this.setState({ loading: false });

				////alert(error);
			});



	}
	render(){
		return(<ScrollView style={{backgroundColor:'white'}}><HHeader title={this} baslik="Bilgilerimi Güncelle"/>
	<TextInput
			label={"İsim"}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"

			onChangeText={isim => this.setState({ isim })}
			value={this.state.isim}
			/>
			<TextInput
			label={"Soyİsim"}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"

			onChangeText={soy => this.setState({ soy })}
			value={this.state.soy}
			/>
<TextInput
			label={"Email"}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"
			disabled
			onChangeText={email => this.setState({ email })}
			value={this.state.email}
			/>
<TextInput
			label={"Telefon Numarası"}
			style={{
				width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
			}}
			mode="outlined"

			onChangeText={gsm => this.setState({ gsm })}
			value={this.state.gsm}
			/>



			<Button mode="contained" onPress={()=> this.updateprofile()} color={ColorCode} dark compact>Bilgilerimi Güncelle</Button>
			<DropdownAlert ref={ref => this.dropdown = ref} />

			</ScrollView>);

	}
}



class MyAddressesScreen extends React.Component {
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
this.getaddresslist()

	}
		getaddresslist() {
		this.setState({loading:true})
		fetch(API_URL+'/customeraddress/list', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: '',
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
				this.setState({
					loading: false,
					addresslistdata: response,
					addressgetdatadone: true,
					//	adresler: response,
				});
				//	alert(JSON.stringify(response))
				//
				var alladdress = [];
				var adresler = [];
				for (var r = 0; r < response.length; r++) {
					//	 this.getaddressdetails(response[r].ShippingAddressId, alladdress);
					//	return
					adresler.push({
						//	label: response[r].ShippingName + '('+response[r].ShippingCreatedDate+')',
						//	value: response[r].ShippingAddressId,
						ShippingAddressId:response[r].ShippingAddressId,
						ShippingName:response[r].ShippingName,
						ShippingAddress:response[r].ShippingAddress,
						ShippingEmail:response[r].ShippingEmail,
						ShippingGsm:response[r].ShippingGsm,
						ShippingCityName:response[r].ShippingCityName,
						ShippingTownName:response[r].ShippingTownName,
						ShippingFirstName:response[r].ShippingFirstName,
						ShippingLastName:response[r].ShippingLastName,






					});
					// this.getaddressdetails(response[r].Id, alladdress)
				}
				// this.setState({ adresler: response });
				if(adresler.length==0){this.setState({adresyok:true,secilenadres:null});return}
				this.setState({ adresler: adresler,secilenadresd:adresler[0].ShippingAddressId,secilenadres:adresler[0].ShippingAddressId,adresyok:false });
			//	alert(this.state.adresler)
			})
			.catch(error => {
			this.dropdown.alertWithType('error', 'Hata','Bağlantınız yavaş tekrar deneniyor...');
			//	this.dologin()
				this.getaddresslist()
			//	this.props.navigation.navigate('Home');
			//	//alert(error);
			});
	}

	render(){
		return(<ScrollView style={{backgroundColor:'white'}}><HHeader title={this} baslik="Adreslerim"/>

<View style={{borderColor:'#ccc',borderWidth:.8,backgroundColor:'white',alignItems:'center',justifyContent:'space-between',borderRadius:5,width:Dimensions.get('window').width-20,height:40,flexDirection:'row',marginBottom:10,padding:5}}>
					<Text style={{fontWeight:'800',color:ColorCode,fontSize:20,textAlign:'left'}}>Teslimat Adresim</Text>
					<Text style={{fontWeight:'100',color:ColorCode,fontSize:14,textAlign:'right'}} onPress={()=>{
						this.props.navigation.navigate('EditAddress', {
							secilenadres: null,
							token: this.props.navigation.state.params.token,
						})



					}}>+ Yeni Adres</Text>


					</View>

				{ this.state.adresler &&

						<FlatList style={{backgroundColor:'white',borderRadius:5,width:Dimensions.get('window').width-20,margin:5,padding:5}}
					data={this.state.adresler}
					renderItem={(item) => <TouchableOpacity onPress={() => {
							if(this.state.secilenadresd!== item.item.ShippingAddressId ||this.state.secilenadres!== item.item.ShippingAddressId ){
								this.setState({ secilenadresd: item.item.ShippingAddressId,secilenadres:item.item.ShippingAddressId },function(){
								});
							}else{

								this.setState({ secilenadresd: null,secilenadres:null },function(){
								});

							}

						}} style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
						<TouchableOpacity onPress={() => {
							if(this.state.secilenadresd!== item.item.ShippingAddressId ||this.state.secilenadres!== item.item.ShippingAddressId ){
								this.setState({ secilenadresd: item.item.ShippingAddressId,secilenadres:item.item.ShippingAddressId },function(){
								});
							}else{

								this.setState({ secilenadresd: null,secilenadres:null },function(){
								});

							}

						}} style={{width:20,height:20}}>
						{ (this.state.secilenadresd!== item.item.ShippingAddressId) ?
							<View style={{width:20,height:20,backgroundColor:'#ddd',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
							<View style={{width:16,height:16,backgroundColor:'white',borderRadius:8}}/>

							</View>:
							<View style={{width:20,height:20,backgroundColor: '#ddd',alignItems:'center',justifyContent:'center',borderRadius:10}}>
							<View style={{width:16,height:16,backgroundColor:ColorCode,borderRadius:8,borderColor:'white',borderWidth:3}}/>
							</View>}

						</TouchableOpacity>

						<View style={{justifyContent:'center',margin:5,padding:4,flexDirection:'column'}}>
						<Text style={{fontWeight:'800',marginBottom:5}}>{item.item.ShippingName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{item.item.ShippingAddress} {item.item.ShippingTownName} - {item.item.ShippingCityName}</Text>
						<Text style={{width:Dimensions.get('window').width-80}}>{item.item.ShippingFirstName} {item.item.ShippingLastName} - {item.item.ShippingGsm}</Text>
						<Text style={{fontWeight:'800',marginTop:5}} onPress={()=>{
							//alert(this.state.secilenadres);
							this.props.navigation.navigate('EditAddress', {
								secilenadres: item.item.ShippingAddressId,
								token: this.props.navigation.state.params.token,
							})


						}}>Düzenle</Text>


						</View>


						</TouchableOpacity>


					}

						/>




				}



				<DropdownAlert ref={ref => this.dropdown = ref} />

			</ScrollView>);

	}
}
export default class App extends React.Component {
	render() {
		return (

			<RootStack
			uriPrefix={prefix}
			onNavigationStateChange={(prevState, currentState, action) => {
				this.currentRouteName =
					currentState.routes[currentState.index].routeName;
			}}
			/>
		);
	}
}
const StackNavigatorConfig = {
	headerMode:'none',
	transitionConfig : () => ({
		transitionSpec: {
			duration: 0,
			timing: Animated.timing,
			easing: Easing.step0,
		},
	}),
}

const prefix =
	Platform.OS == 'android' ? 'promoclub://promoclub/' : 'promoclub://';

const RootStack = StackNavigator(
	{
		Splash: {
			screen: SplashScreen,
		},

		Home: {
			screen: HomeScreen,
		},

		Proje: {
			screen: MainScreen,
		},
		Banner: {
			screen: BannerScreen,
		},

		MyAccount: {
			screen: MyAccountScreen,
		},
		ChangeMyPassword:{
			screen: ChangeMyPasswordScreen,
		},
		MyOrders:{
			screen: MyOrdersScreen,
		},
		MyAddresses:{
			screen: MyAddressesScreen,
		},

		OrderDetail:{
			screen:OrderDetailScreen,
		},
		UpdateMyProfile:{
			screen:UpdateMyProfileScreen,
		},

		Agreement:{
			screen:AgreementScreen,
		},


		ProductDetail: {
			screen: ProductDetail,
			path: 'promoclub/:promoclub',
		},
		CategoryDetail: {
			screen: CategoryDetail,
		},
		Register: {
			screen: RegisterScreen,
		},
		Settings: {
			screen: SettingsScreen,
		},
		Search: {
			screen: SearchScreen,
		},
		MyCart: {
			screen: MyCartScreen,
		},
		MyAccount: {
			screen: MyAccountScreen,
		},
		MyOrders: {
			screen: MyOrdersScreen,
		},
		MyAddress: {
			screen: MyAddressScreen,
		},
		EditAddress: {
			screen: EditAddressScreen,
		},

		CheckoutPage: {
			screen: CheckoutScreen,
		},
	/*	CardProcess: {
			screen: CardProcessScreen,
		},
		*/
		CompletePayment: {
			screen: CompletePaymentScreen,
		},
		ConfirmPayment: {
			screen: ConfirmPaymentScreen,
		},
		PaymentSuccess: {
			screen: PaymentSuccessScreen,
		},
		BarcodeApp: {
			screen: BarcodeApp,
		},
		BadInstagramCloneApp: {
			screen: BadInstagramCloneApp,
		},
		OrderSummary: {
			screen: OrderSummaryScreen,
		},
		Neisterseniz: {
			screen: NeistersenizScreen,
		},
		ShippingDetails: {
			screen: ShippingDetailsScreen,
		},
		CarRental: {
			screen: CarRentalScreen,
		},
		Forgot: {
			screen: ForgotScreen,
		},
		Hakkımızda: {
			screen: AboutScreen,
		},
		Yardım: {
			screen: HelpScreen,
		},
		Reachus: {
			screen: ReachusScreen,
		},
		CustomerSupport: {
			screen: CustomerSupportScreen,
		},
		Kullanım: {
			screen: TermsScreen,
		},
		NotificationCenter: {
			screen: NotificationCenterScreen,
		},

		Kvkk:{
			screen:KvkkScreen

		}



	},
	StackNavigatorConfig

);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20,
	},
	placeholderContainer: {
		width: Dimensions.get('window').width,
		backgroundColor: '#fff',
		height: 500
	},
	placeholder: {
		height: 8,
		marginTop: 6,
		marginLeft: 15,
		alignSelf: 'center',
		justifyContent: 'center',
		backgroundColor: '#eeeeee'
	},
	row: {
		flexDirection: 'row',
		width: '100%'
	}
});
const Gradient = (): React.Element<*> => {
	return (
		<LinearGradient
		colors={['#eeeeee', '#dddddd', '#eeeeee']}
		start={{ x: 1.0, y: 0.0 }}
		end={{ x: 0.0, y: 0.0 }}
		style={{
			flex: 1,
				width: 120
		}}
		/>
	);
};

const PlaceholderExample = ({
	loader
}: {
	loader: Promise<*>
}): React.Element<*> => {
	return (
		<PlaceholderContainer
		style={styles.placeholderContainer}
		animatedComponent={<Gradient />}
		duration={1000}
		delay={1000}
		loader={loader}
		>
		<View style={{ flexDirection: 'column',alignItems:'center',justifyContent:'center' }}>
<View style={{height:20}}/>

			<Placeholder
		style={[
			styles.placeholder,
			{
				width: '70%',
				height: 24
			}
		]}
		/>
<View style={{height:50}}/>
		<Placeholder style={[styles.placeholder, { width: 150, height: 150 }]} />
<View style={{height:50}}/>

		<View
		style={{
			flexDirection: 'column',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center'
		}}
		>
		<Placeholder
		style={[
			styles.placeholder,
			{
				width: '60%',
				height: 15
			}
		]}
		/>
		<Placeholder
		style={[
			styles.placeholder,
			{
				width: '45%',
				height: 7
			}
		]}
		/>
			<Placeholder
		style={[
			styles.placeholder,
			{
				width: '30%',
				height: 7
			}
		]}
		/>
	<Placeholder
		style={[
			styles.placeholder,
			{
				width: '25%',
				height: 7
			}
		]}
		/>
	<Placeholder
		style={[
			styles.placeholder,
			{
				width: '30%',
				height: 7
			}
		]}
		/>
	<Placeholder
		style={[
			styles.placeholder,
			{
				width: '35%',
				height: 5
			}
		]}
		/>
	<Placeholder
		style={[
			styles.placeholder,
			{
				width: '35%',
				height: 5
			}
		]}
		/>
	<Placeholder
		style={[
			styles.placeholder,
			{
				width: '35%',
				height: 5
			}
		]}
		/>

		</View>

		</View>

		</PlaceholderContainer>
	);
};

const PlaceholderExample1 = ({
	loader
}: {
	loader: Promise<*>
}): React.Element<*> => {
	return (
		<PlaceholderContainer
		style={styles.placeholderContainer}
		animatedComponent={<Gradient />}
		duration={1000}
		delay={1000}
		loader={loader}
		replace={true}
		>
		<View style={{ flexDirection: 'column' }}>
		<View style={styles.row}>
		<Placeholder
		style={[
			styles.placeholder,
			{
				width: '50%',
				height: 10
			}
		]}
		>
		</Placeholder>

		</View>

		<View style={{ flexDirection: 'row' }}>
		<View style={styles.row}>
		<Text style={{ width: '20%', textAlign: 'center' }}>Age</Text>
		<Placeholder
		style={[
			styles.placeholder,
			{
				width: '15%',
				height: 10
			}
		]}
		>
		<Text>47</Text>
		</Placeholder>
		</View>
		</View>
		</View>
		</PlaceholderContainer>
	);
};
const PlaceholderExamplemain = ({
  loader
}: {
  loader: Promise<*>
}): React.Element<*> => {
  return (
    <PlaceholderContainer
      style={{height:100,padding:10}}
      animatedComponent={<Gradient />}
      duration={500}
      delay={500}
      loader={loader}
    >
      <View style={{ flexDirection: 'row' }}>
        <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '50%',
                height: 10
              }
            ]}
          />
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '35%',
                height: 7
              }
            ]}
          />
        </View>
      </View>

      </PlaceholderContainer>
  );
};

const PlaceholderExampleslider = ({
  loader
}: {
  loader: Promise<*>
}): React.Element<*> => {
  return (
    <PlaceholderContainer
      style={{height:140, width:Dimensions.get('window').width, paddingBottom:10}}
      animatedComponent={<Gradient />}
      duration={500}
      delay={500}
      loader={loader}
    >
      <View style={{ flexDirection: 'column' }}>
        <Placeholder style={[null, {backgroundColor: '#eeeeee', width: Dimensions.get('window').width, height: 130 }]} />
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Placeholder
            style={[
              styles.placeholder,
              {position:'absolute',bottom:-10,backgroundColor:'#dede',
                width: '50%',
                height: 18
              }
            ]}
          />
           </View>
      </View>

      </PlaceholderContainer>
  );
};
const PlaceholderExampleloaderr = ({
  loader
}: {
  loader: Promise<*>
}): React.Element<*> => {
  return (


<PlaceholderContainer
			animatedComponent={<Gradient />}
		duration={1000}
		delay={1000}
      loader={loader}

			style={{backgroundColor:'red',opacity:.9,width:Dimensions.get('window').width,height:100,position:'absolute',elevation:100,zIndex:1000,padding:20,top:Dimensions.get('window').height/2 - 50}}>
        <Placeholder style={[null, {backgroundColor: 'red', width: Dimensions.get('window').width }]} >

	  <Text style={{color:'white',fontSize:20,fontWeight:'800',textAlign:'center',marginBottom:10}}>Bağlantınız yavaş, Tekrar deneniyor...</Text><Button mode="contained" color="gray" onPress={()=>{

		const resetAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Proje',params:{token:this.props.navigation.state.params.token} })],
					});

					this.props.navigation.dispatch(resetAction);



		}}>Tekrar Bağlan</Button>

	  </Placeholder >
	  </PlaceholderContainer>
  );
};
