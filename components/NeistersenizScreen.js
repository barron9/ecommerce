import React, {
	Component
} from 'react';

import {
	Platform,
	View,

	Image,

	ActivityIndicator,
	ScrollView,

	Dimensions,
	KeyboardAvoidingView
} from 'react-native';
import HHeader from './header/HHeader'
import {
	API_URL,
	ColorCode
} from '../App'
import Neistersenizform from './neistersenizform/Neistersenizform'
import {
	Button,
	Text
} from 'react-native-paper';
import DropdownAlert from 'react-native-dropdownalert';

export default class NeistersenizScreen extends React.Component {
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
				done: false
			};
		}
		static navigationOptions = {
			title: 'Hosgeldiniz',
			header: null,
			//headerStyle: { paddingTop: 0,backgroundColor:'yellow' }
			//
			gesturesEnabled: false
		};
		onPressInLearnMore() {
			alert('oturumm ac');
			this.setState(previousState => {
				return {
					isShowingText: !previousState.isShowingText
				};
			});
		}
		validateEmail(email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}

		neisterseniz() {
			if (!this.refs.firstComponentRef.state.cins || !this.refs.firstComponentRef.state.marka || !this.refs.firstComponentRef.state.model || !this.refs.firstComponentRef.state.adet) {
				this
					.dropdown
					.alertWithType('error', 'Hata', 'Lütfen istek giriniz.');

				//	Alert.alert('Hata','Lütfen istek giriniz.');
				return;
			}
			var formdata = [{
					Type: this.refs.firstComponentRef.state.cins,
					Brand: this.refs.firstComponentRef.state.marka,
					Model: this.refs.firstComponentRef.state.model,
					Quantity: this.refs.firstComponentRef.state.adet
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
			this.setState({
				loading: true
			});
			var self = this;
			//	alert(JSON.stringify(formdata))
			fetch(API_URL + '/support/what-ever', {
				method: 'POST',
				timeout: 20000,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.props.navigation.state.params.token
				},

				body: JSON.stringify(formdata)
			}).then(response => {
				return response.json();
			}).then(response => {
				//alert(JSON.stringify(response))
				this
					.setState({
						done: true,
						loading: false
					}, function () {
						this
							.dropdown
							.alertWithType('info', 'İşlem Tamamlandı', 'İsteğiniz Alındı');

						//	Alert.alert('İşlem Tamamlandı','İsteğiniz Alındı');

					})

			}).catch(error => {});
		}
		musterigetir() {
			this.setState({
				loading: true
			});
			var self = this;

			//alert(this.props.navigation.state.params.token)
			fetch(API_URL + '/customer/myaccount', {
				method: 'GET',
				timeout: 20000,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Bearer ' + this.props.navigation.state.params.token
				}
			}).then(response => {
				return response.json();
			}).then(response => {
				// alert(JSON.stringify(response))

				this.setState({
					loading: false,
					userdata: response
				});
			}).catch(error => {});
		}

		componentDidMount() {
			this.musterigetir();
		}

		render() {
			const {
				navigate
			} = this.props.navigation;
			return ( <View style = {
					{
						backgroundColor: '#fff',
						flex: 1
					}
				} >
				<HHeader title = {
					this
				}
				baslik = "Ne İsterseniz" /> {
					Platform.OS == 'ios<D-r>s' && < Image
					resizeMode = "repeat"
					source = {
						require('../bg.jpg')
					}
					style = {
						{
							position: 'absolute',
							top: 0,
							left: 0,
							zIndex: 0,
							opacity: .2
						}
					}
					/>}

					<View >

					<KeyboardAvoidingView behavior = "padding" >

					<
					Neistersenizform ref = "firstComponentRef"
					status = {
						this.state.done
					}
					/>

					<Button onPress = {
						() => this.neisterseniz()
					}
					mode = "contained"
					dark
					disabled = {
						this.state.done
					}
					style = {
						{
							marginTop: 5,
							marginLeft: 20,
							marginRight: 20
						}
					} >
					Gönder <
					/Button>

					<
					/KeyboardAvoidingView> <ScrollView style = {
						{
							height: 150
						}
					} >
					<Text
					style = {
						{
							fontWeight: '100',
							color: 'black',
							margin: 20,
							fontSize: 12
						}
					} >
					Değerli Promo Club Üyesi,
					{
						'\n'
					} {
						'\n'
					}
					Promo Club da bulunan 2000 den fazla ürün arasında aradığınızı bulamadığınızda
					bile,
					istediğiniz ürünü sizin için tedarik ediyoruz. {
						'\n'
					} {
						'\n'
					}
					Ne İsterseniz modülü;Promo Club ile işte bu kadar kolay!{
						'\n'
					} {
						'\n'
					}
					Talebinizi aşağıdaki form üzerinden hemen bize iletebilirsiniz!{
						'\n'
					} {
						'\n'
					}
					Kimler Katılabilir {'\n'}
					Bu fırsattan sadece Promo Club üyeleri yararlanabilir. {
						'\n'
					}
					Talebiniz için aşağıdaki formu doldurarak gönderdiğiniz takdirde hemen
					değerlendirilecek ve 2 iş günü içinde size e - mail ile dönüş yapılacaktır. {
						'\n'
					}
					Talep ettiğiniz ürünün birim bedeli 2000 TL ve üstü olmalıdır.Ancak aynı
					üründen olmak şartı ile o üründen birden fazla adedinin toplam bedeli 2000 TL
					ise;işleme alınabilir. {
						'\n'
					}
					Kullanım Şartları {
						'\n'
					}
					Bu kapsamda talep edilen ürünlerin hasarlı olması dışında iadesi kabul edilemez. {
						'\n'
					}
					Talebinize istinaden olumlu dönüş yapılan tekliflerin geçerlilik süresi 3 iş
					günüdür. {
						'\n'
					}
					Ne İsterseniz modülünü 1 ay içinde 3 kez ürün satın almak için
					kullanabilirsiniz.Üye;hizmetten 1 ay içinde sınırsız faydalanmakla birlikte 3
					talebinde de ürün satın almamışsa 1 ay beklemek zorundadır.Eğer ilgili ay
					içinde satın alma yaptıysa 3 hak tekrar başlar. {
						'\n'
					}
					Gıda,
					sigara,
					içki,
					ilaç,
					altın,
					akaryakıt dâhil bütün hediye çekleri Ne
					İsterseniz modülünden talep edilemez. {
						'\n'
					} <
					/Text>

					{
						this.state.userdata && ( <
							Text style = {
								{
									fontWeight: '100',
									color: 'black',
									margin: 20,
									fontSize: 12
								}
							} >
							İsim: {
								this.state.userdata.FirstName
							} {
								'\n'
							}
							Soyisim: {
								this.state.userdata.LastName
							} {
								'\n'
							}
							Eposta: {
								this.state.userdata.Email
							} {
								'\n'
							}
							GSM: {
								this.state.userdata.Gsm
							} {
								'\n'
							} <
							/Text>
						)
					}

					<
					/ScrollView>

					</View>

					{
						this.state.loading && ( <View style = {
								{
									width: 50,
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: Dimensions
										.get('window')
										.height / 2 - 25,
									marginLeft: Dimensions
										.get('window')
										.width / 2 - 25,
									position: 'absolute',
									zIndex: 599,
									height: 50,
									borderRadius: 10,
									backgroundColor: ColorCode,
									opacity: 0.9,
									flexDirection: 'column'
								}
							} >
							<
							ActivityIndicator size = "small"
							color = "white"
							style = {
								{
									zIndex: 99
								}
							}
							/> </View>
						)
					} <
					DropdownAlert ref = {
						ref => this.dropdown = ref
					}
					/>

					<
					/View>
				);
			}
		}