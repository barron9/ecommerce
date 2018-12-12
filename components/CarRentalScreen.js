
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

export default class CarRentalScreen extends React.Component {
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
					<Image defaultSource={require('../noimage.jpg')}
					style={{ flex: 1 }}
					resizeMode="contain"
					source={{
						uri: 'https://img.kurumsalb2c.com/products/71150.png',
					}}
					/>
				);
			}}>
			<Image defaultSource={require('../noimage.jpg')}
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