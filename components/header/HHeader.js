

import React, { Component } from 'react';

import { Appbar} from 'react-native-paper';
import {Platform,
Dimensions
} from 'react-native';


export default class HHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blacked: false,
		};
	}

	static navigationOptions = {
		title: 'Hosgeldiniz',
		header: null,
		//headerStyle: { paddingTop: 0,backgroundColor:'yellow' }
		//
		gesturesEnabled: false,
	};
	dologin() {
		//	alert('UserName='+this.state.UserName+'&Password='+this.state.Password+'&grant_type=password')
		//	 DropDownHolder.alert('info', 'Giriş Yapılıyor', 'Lütfen bekleyiniz...')
		this.setState({ loading: true });
		fetch(API_URL+'/auth', {
			method: 'POST', timeout: 20000,
			headers: {

				'Content-Type': 'application/x-www-form-urlencoded'

			},

			body:'UserName='+this.state.UserName+'&Password='+this.state.Password+'&grant_type=password',
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
					setTimeout(()=>{this.props.navigation.navigate('Proje', {
						UserName: this.state.UserName,
						Password: (this.state.Password),
						token: response.access_token,
					});
					}, 3000);




				} else {
					this.dropdown.alertWithType('error', 'Hata',response.error_description);

				}
				this.setState({ loading: false });
			});
	}

	render() {
		var titleConfig = {
			title: this.props.title,
			baslik: this.props.baslik,
			side: this.props.side,

		};

		return(


			<Appbar.Header
			style={{borderBottomColor:'#ccc',borderBottomWidth:.8,backgroundColor:'white',
					zIndex:1000,width:Dimensions.get('window').width,}} dark={false} statusBarHeight={Platform.OS=='ios'?20:0}

			>
			{this.props.title.state.currentPosition!==3 &&
			<Appbar.BackAction
			onPress={()=>this.props.title.props.navigation.pop()}
			/>
			}

			<Appbar.Content
			title={this.props.baslik}        />
			</Appbar.Header>



		);



	}
}