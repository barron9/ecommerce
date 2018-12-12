
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

export default class NotificationCenterScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}
	static navigationOptions = {
		title: 'nscreen',
		header: null,
	};

	componentDidMount() {
		FCM.setBadgeNumber(0)

		if(Platform.OS=='android'){
			SharedPreferences.getAll((values)=>{
				this.setState({sonuc:values})

				//SharedPreferences.clear();

			});

		}else{


			Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
				.then(realm => {
					//alert(JSON.stringify( notif.notification.body));
					//
					var sonuc= []
					for(var i=0; i<realm.objects('Notifications').length; i++){

						sonuc.push({key: realm.objects('Notifications')[i].notification})

					}
					this.setState({sonuc:sonuc.reverse()})

					//  alert(JSON.stringify( this.state.sonuc)); //Tüm objeleri geri dönderir.


				})


				.catch(error => {
					//alert(error);
				});
		}


	}


	render(){

		return(<View style={{flex:1}}><HHeader title={this} baslik="Bildirim Merkezi" />
			<Text style={{color:'#ccc',fontSize:12,margin:5,textAlign:'center'}}>BILDIRIM GEÇMİŞİ</Text>
			{this.state.sonuc &&
				<Text>{this.state.sonuc}</Text>
			}

			{this.state.sonuc &&
					<FlatList style={{flex:1,height:200,width:Dimensions.get('window').width}}
				data={this.state.sonuc}
				renderItem={({item}) => <Text style={{fontSize:20,paddingLeft:5,fontWeight:'100',paddingBottom:5}}>{item.key}</Text>}
					/>
			}

			</View>);
	}

}