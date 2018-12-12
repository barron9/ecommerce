
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

export default class CategoryDetail extends React.Component {
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
					<Image defaultSource={require('../noimage.jpg')}
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