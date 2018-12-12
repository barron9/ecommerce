/**
 * React Native App
 * https://barron.cz
 */
export var API_URL = 'https://kurumsalb2c.com/B2C/oauth/api'
export var SLOW_NETWORK_T = 20

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
//import SwiperFlatList from 'react-native-swiper-flatlist';

import uyeSchema from './components/dbschemas/uyeSchema'
import notificationSchema from './components/dbschemas/notificationSchema'
//////////////////////////////////////////sayfalar////////////////////////////////////////////////////////////////////////
import ChangeMyPasswordScreen from './components/ChangeMyPasswordScreen'
import AgreementScreen from './components/AgreementScreen'
import EditAddressScreen from './components/EditAddressesScreen'
import MainScreen from './components/MainScreen'
import BadInstagramCloneApp from './components/BadInstagramCloneApp'
import NeistersenizScreen from './components/NeistersenizScreen'
import SplashScreen from './components/SplashScreen'
import MyAccountScreen from './components/MyAccountScreen'
import MyOrdersScreen from './components/MyOrdersScreen'
import UpdateMyProfileScreen from './components/UpdateMyProfileScreen'
import HomeScreen from './components/HomeScreen'
import KvkkScreen from './components/KvkkScreen'
import RegisterScreen from './components/RegisterScreen'
import OrderDetailScreen from './components/OrderDetailScreen'
import ProductDetail from './components/ProductDetail'
import CategoryDetail from './components/CategoryDetail'
import SettingsScreen from './components/SettingsScreen'
import SearchScreen from './components/SearchScreen'
import MyCartScreen from './components/MyCartScreen'
import CheckoutScreen from './components/CheckoutScreen'
import CompletePaymentScreen from './components/CompletePaymentScreen'
import ConfirmPaymentScreen from './components/ConfirmPaymentScreen'
import PaymentSuccessScreen from './components/PaymentSuccessScreen'
import OrderSummaryScreen from './components/OrderSummaryScreen'
import ShippingDetailsScreen from './components/ShippingDetailsScreen'
import CarRentalScreen from './components/CarRentalScreen'
import ForgotScreen from './components/ForgotScreen'
import AboutScreen from './components/AboutScreen'
import HelpScreen from './components/HelpScreen'
import ReachusScreen from './components/ReachusScreen'
import CustomerSupportScreen from './components/CustomerSupportScreen'
import TermsScreen from './components/TermsScreen'
import NotificationCenterScreen from './components/NotificationCenterScreen'


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0

import EIcon from 'react-native-vector-icons/EvilIcons'; // 4.5.0
import EnIcon from 'react-native-vector-icons/Entypo'; // 4.5.0
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0

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
//ProjectParameters()
//alert(ColorCode)
export var ColorCode = "#02adef"


	 type AlertType = 'info' | 'warn' | 'error' | 'success';
	 var shareOptions = {
		 title: 'Paylaş',
		 url: 'https://kurumsalb2c.com/B2C/product/',
		 social: Share.Social.EMAIL
	 };






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
export const deviceid = DeviceInfo.getUniqueID();
export const devicename = DeviceInfo.getDeviceName();
export const devicemodel = DeviceInfo.getModel();
export const deviceosversion = DeviceInfo.getSystemVersion();
export const deviceos = DeviceInfo.getSystemName();


console.disableYellowBox = true;


export const pickerSelectStyles = StyleSheet.create({
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


		MyAccount: {
			screen: MyAccountScreen,
		},
		ChangeMyPassword:{
			screen: ChangeMyPasswordScreen,
		},
		MyOrders:{
			screen: MyOrdersScreen,
		},
		//MyAddresses:{
		//	screen: MyAddressesScreen,
		//},

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

		//MyAddress: {
		//	screen: MyAddressScreen,
		//},
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

export const styles = StyleSheet.create({
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
