

import React, { Component } from 'react';

import {

	View,
	

	WebView,

	Dimensions,

} from 'react-native';

import {API_URL,SLOW_NETWORK_T,styles,ProjectOrderPaymentMethod,deviceid,ColorCode} from '../App'
import HHeader from './header/HHeader'



export default class KvkkScreen extends React.Component {
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
			var1: false,
			var2: false,
		};
	}
	static navigationOptions = {
		title: 'Hosgeldiniz',
		header: null,
		//headerStyle: { paddingTop: 0,backgroundColor:'yellow' }
		//
		gesturesEnabled: false,
	};
	componentDidMount(){
		fetch(API_URL+'/content/get', {
			method: 'POST', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + null,
				Accept: 'application/x-www-form-urlencoded',
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: 'OrderId=&Key=KVKK',
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
				this.setState({ loading: false, content: response.ResultMessage });
				// alert(JSON.stringify(response));
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});


	}
	render(){

		return(
			<View
			style={{
				height:Dimensions.get('window').height,       backgroundColor: 'white',
			}}>
			<HHeader title={this} baslik="KVKK Metni"/>

			{this.state.content &&
				<WebView
				scalesPageToFit={false}
				style={{
					width: Dimensions.get('window').width,
						height:  Dimensions.get('window').height,
						borderWidth: 1,
						//position:'absolute',zIndex:100
				}}
				source={{baseUrl: '',
					html:
					'<html><html lang="tr"><head><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"><META HTTP-EQUIV="Content-language" CONTENT="tr"><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=windows-1254"></head><body>' +
						this.state.content +
						'</body></html>',
				}}
				/>



			}

			</View>


		);
	}

}