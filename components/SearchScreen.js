
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
import { Button,TextInput,Text,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface,IconButton
} from 'react-native-paper';
import EIcon from 'react-native-vector-icons/EvilIcons'; // 4.5.0
import {API_URL} from '../App'
import EnIcon from 'react-native-vector-icons/Entypo'; // 4.5.0

export default class SearchScreen extends React.Component {
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

			<Appbar.Action icon="more-vert" onPress={()=>this.setState({aralik:!this.state.aralik})} />

			</Appbar.Header>
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
			 <IconButton
    icon="add-a-photo"
    color="red"
    size={20}
    onPress={() => console.log('Pressed')}
  />






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
			{!this.state.aralik && (
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
					backgroundColor: 'white',

						//	borderWidth: 0.8,

						color: 'black',
						fontWeight: '100',
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

				onSubmitEditing={() => {
					this.searchaction(
						this.state.searchtext,
						this.state.searchp1,
						this.state.searchp2
					);
					this.setState({ searchstarted: true });
				}}
				/>

				<TextInput
				underlineColorAndroid="rgba(0,0,0,0)"
				style={{
					backgroundColor: 'white',

						//	borderWidth: 0.8,

						color: 'black',
						fontWeight: '100',
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
				onSubmitEditing={() => {
					this.searchaction(
						this.state.searchtext,
						this.state.searchp1,
						this.state.searchp2
					);
					this.setState({ searchstarted: true });
				}}
				/>

				{!this.state.grid&&
					<EnIcon name="grid" onPress={()=>this.setState({grid:!this.state.grid})} size={25} color="black" />
				}
				{this.state.grid&&
						<EnIcon name="text" onPress={()=>this.setState({grid:!this.state.grid})} size={25} color="black" />
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
						<Image defaultSource={require('../noimage.jpg')}
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
						<Image defaultSource={require('../noimage.jpg')}
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