

import React, { Component } from 'react';

import {
	Platform,
	View,

	Image,
Animated,
	ActivityIndicator,
	ScrollView,

	Dimensions,
	KeyboardAvoidingView,

} from 'react-native';
import uyeSchema from './dbschemas/uyeSchema'
import notificationSchema from './dbschemas/notificationSchema'
import {API_URL} from '../App'
import { Button,Text} from 'react-native-paper';
import DropdownAlert from 'react-native-dropdownalert';
import Realm from 'realm';


export default class SplashScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state ={c:null,backgroundColor:new Animated.Value(0)}
  this.backgroundColor = new Animated.Value(0)

	}
	static navigationOptions = {
		title: '',
		header: null,
		gesturesEnabled: false,
	};
componentDidMount(){

this.retry()
}
	retry(){
		this.setState({ loading: true,load:true,retry:false });

		fetch(API_URL+'/parameters/list', {
	method: 'GET', timeout: 5000,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
			.then(response => {
				const statusCode = response.status;
				//alert(statusCode)
				if (statusCode != 200) {
					//alert(statusCode)
		this.setState({ loading: false ,load:false,retry:true});

				} else {
					return response.json();
				}
			})

	.then(response => {
		ProjectOrderPaymentMethod = response.ProjectOrderPaymentMethod;
		UserNameEnabled = response.UserNameEnabled;
		CustomerAddressChangeable = response.CustomerAddressChangeable;
		UserRegistrationType = response.UserRegistrationType;
		IncludingCargoPrice = response.IncludingCargoPrice;
		ColorCode = '#'+response.ColorCode;
		this.setState({c:ColorCode,loading:false,retry:false,ppm:response.ProjectOrderPaymentMethod},function(){
		Animated.timing(this.backgroundColor, {
      duration: 1000,
      toValue: 1,
    }).start();


		})


	})
	.catch(error => {
		this.setState({ loading: false ,load:false,retry:true});

		return

	});


		this.setState({ load: true });


		if(true){
			Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
				.then(realm => {
					realm.objects('Uyeler');

					if (realm.objects('Uyeler').length < 1) {
		this.setState({ load: false });

					} else {

						this.dologin(realm.objects('Uyeler')[0].username,realm.objects('Uyeler')[0].sifre)
						return
				
					}

				})
				.catch(error => {
				//	console.log(error);
				});



		}


	}
	dologin(user,pass) {
		this.setState({ loading: true });
		fetch(API_URL+'/auth', {
			method: 'POST', timeout: 20000,
			headers: {

				'Content-Type': 'application/x-www-form-urlencoded'

			},

			body:'UserName='+user+'&Password='+pass+'&grant_type=password',
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				//this.props.navigation.navigate('Proje', {
				//  UserName: this.state.UserName,
				//  Password: this.state.Password,
				//});
				//alert(JSON.stringify(response))
				if (response.LoginControl == 'Success') {

					this.setState({load:true})
					setTimeout(()=>{
						this.props.navigation.navigate('Proje', {
						UserName: user,
						Password: pass,
                        token: response.access_token,
                        ColorCode:ColorCode
					});
					}, 2000);




				} else {
					this.dropdown.alertWithType('error', 'Hata',response.error_description);

				}
				this.setState({ loading: false });
			});
	}


	render() {
		let borderBottomColor = this.backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['gray', '#02adef']
    });
			let asd = this.backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['gray', 'yellow']
    });

		//this.state.x = 0;

		const { navigate } = this.props.navigation;
		return (
			<Animated.View
			style={{
				flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					backgroundColor:  (this.state.c!==null?borderBottomColor:'gray'),

					height: 800,

			}}>




			<Animated.View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,flexDirection:'column',bottom:Platform.OS=='ios'?0:0,alignItems:'center',justifyContent:'center',zIndex:2,
					backgroundColor:(borderBottomColor),
				// backgroundColor: ,
					borderRadius:Platform.OS=='ios'?0:10}}>
			{true&&  <Image

				source={require('../bg.jpg')} style={{position:'absolute',top:0,left:0,zIndex:0,opacity:.2,height:Dimensions.get('window').height+40,width:Dimensions.get('window').width}}
				/>}

<Animated.View style={{backgroundColor:	asd,paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5,
		//borderBottomWidth:10,borderRightWidth:10,borderBottomColor:'#ccc',borderRightColor:'#ddd'
}}>
			<Text
			style={{
				color:  'black',
					fontWeight: '800',
					fontSize: 32,
					margin: 5,
					zIndex: 2,
					fontFamily: Platform.OS == 'android' ? 'Roboto-Thin' : null,

			}}>
			PromoClub
			</Text>
</Animated.View>
			{this.state.retry &&
			<Button mode="contained" dark style={{backgroundColor:'red',marginTop:10}} onPress={()=>{
			//this.dropdown.alertWithType('error', 'Bağlantı','Bağlantınız yavaş tekrar deneniyor...');
				this.props.navigation.navigate('Splash')


			}}>Tekrar Bağlanmayı dene</Button>
			}
<View style={{height:50}}>
			{Platform.OS=='ios' && this.state.load ?<ActivityIndicator
				size="small"
				color="white"
				style={{ zIndex: 99,padding:20 }}
				/>
				:<View/> }
			{Platform.OS=='android' && this.state.load ?
					<ActivityIndicator
                    animating={true}

				size="small"
				color="white"
				style={{ zIndex: 99,padding:20 }}
					/>

					:<View/> }
			{this.state.loading && !this.state.load ?
					<ActivityIndicator
                    animating={true}

				size="small"
				color="black"
				style={{ zIndex: 99,padding:20 }}
					/>

					:<View/> }
</View>

			<View
			style={{
				position:'absolute',
					flexDirection: 'row',
					bottom: 80,
					zIndex: 2,
					height:this.state.load?0:null
			}}>



			{ !this.state.load ?

				<Button  mode="contained" dark

				style={{
					opacity: 1,
						//	padding: 10,
						width: 130,borderRadius:0,

						backgroundColor:'#333',
						//height:40,

				}}
				onPress={() => this.props.navigation.navigate('Home')}

				>
				Giriş Yap

				</Button>


				:<View/>
			}
			{!this.state.load ?

					<Button  mode="contained" dark

				style={{
					opacity: 1,borderRadius:0,
						//	padding: 10,
						width: 130,
					backgroundColor:(this.state.c!==null?this.state.c:'gray'),

						//height:40,
				}}
				onPress={() =>
					this.props.navigation.navigate('Register', { eposta: null })
				}

					>
					Kayıt Ol

					</Button>




					:<View/>

			}

			</View>
			{!this.state.load ?
				<Text style={{fontWeight: '100',color:'#eee',textAlign:'center',fontSize:12,
						position:'absolute',bottom:40

				}}
				onPress={() => this.props.navigation.navigate('Forgot')}


				>Şifremi Unuttum</Text>:<View/>
			}




			{ this.state.update&&
					<Text style={{color:'red'}} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.interlink.b2cbeta')}>Güncelleme Bulundu. İndir!</Text>
			}
			</Animated.View>

			<DropdownAlert ref={ref => this.dropdown = ref} />

			</Animated.View>);
	}
}

