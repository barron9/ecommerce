
import React, { Component } from 'react';

import {
	Platform,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	Easing,
	StatusBar,
	Dimensions,
	TouchableHighlight,
	PermissionsIOS,StatusBarAlert,StatusBarIOS,
	Animated,
	BackHandler,
	Linking,Modal,AlertIOS,Alert
} from 'react-native';

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



var ll=0;
var llc=0;
export default class MainScreen extends React.Component {
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
				isim: response.FirstName,
				soyisim: response.LastName,
				eposta: response.Email,
				ceptel: response.Gsm,
			});
		})
		.catch(error => {
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
			<EnIcon name="grid" onPress={()=>this.setState({grid:!this.state.grid})} size={25} color="#02adef" />
		}
		{this.state.grid&& this.state.campaignnames &&
				<EnIcon name="text" onPress={()=>this.setState({grid:!this.state.grid})} size={25} color="#02adef" />
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