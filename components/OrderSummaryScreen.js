
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

export default class OrderSummaryScreen extends React.Component {
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