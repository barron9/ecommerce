
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
import {API_URL,pickerSelectStyles} from '../App'
import CheckBox from 'react-native-check-box';
import RNPickerSelect from 'react-native-picker-select';
import { Button,TextInput,Text,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface} from 'react-native-paper';
import HHeader from './header/HHeader'
import StepIndicator from 'react-native-step-indicator';
import DropdownAlert from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import {StackActions,
	StackNavigator,
	TabNavigator,
	NavigationActions,
	addNavigationHelpers,NavigationEvents,//createStackNavigator,createAppContainer,AppNavigator
} from 'react-navigation'; // 1.1.2
var kupons
export default class CheckoutScreen extends React.Component {
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
							<Image defaultSource={require('../noimage.jpg')}
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

									<Image defaultSource={require('../noimage.jpg')}
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


												<Image defaultSource={require('../noimage.jpg')}
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


												<Image defaultSource={require('../noimage.jpg')}
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
								<Image defaultSource={require('../noimage.jpg')}
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
								<Image defaultSource={require('../noimage.jpg')}
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
												<Image defaultSource={require('../noimage.jpg')}
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


												<Image defaultSource={require('../noimage.jpg')}
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


												<Image defaultSource={require('../noimage.jpg')}
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