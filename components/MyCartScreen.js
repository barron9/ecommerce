
import React, { Component } from 'react';
import {API_URL} from '../App'

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
import EnIcon from 'react-native-vector-icons/Entypo'; // 4.5.0
import Prompt from '@perrymitchell/react-native-prompt';

export default class MyCartScreen extends React.Component {
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
							<Image defaultSource={require('../noimage.jpg')}
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