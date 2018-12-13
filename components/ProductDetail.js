
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
import Share from 'react-native-share';

import {API_URL,SLOW_NETWORK_T,styles,ProjectOrderPaymentMethod,deviceid,ColorCode,shareOptions} from '../App'
import { Button,TextInput,Text,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface} from 'react-native-paper';
import { FloatingAction } from 'react-native-floating-action'; // 1.10.1
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import Drawer from 'react-native-drawer-menu'; // 0.2.5
import Lightbox from 'react-native-lightbox';
import { iOSUIKit } from 'react-native-typography';

export default class ProductDetail extends React.Component {
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

				this.setState({ product: response });
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
					<Image defaultSource={require('../noimage.jpg')}
					style={{ flex: 1 }}
					resizeMode="contain"
					source={{ uri: 'https:' + this.state.product.Image }}
					/>
				);
			}}>


			<Image defaultSource={require('../noimage.jpg')} onLoad={(e)=>this.setState({hideplaceholder:true})}
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