
import React, { Component } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import {
	View,Dimensions
} from 'react-native';
import { Button,TextInput} from 'react-native-paper';
import HHeader from './header/HHeader'
import {ColorCode,API_URL} from '../App'

export default class ChangeMyPasswordScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			pager: 0,
			searchp1: 0,
			searchp2: 999,
			showfilter: false,
			searchstarted: false,
			grid:false
		};
	}
	static navigationOptions = {
		title: 'searchscreen',
		header: null,
	};
	changepass() {
		this.setState({ loading: true });
		var self = this;
		if(this.state.newpass !== this.state.newpass1){
			this.dropdown.alertWithType('error', 'Hata','Yeni şifreniz uyuşmuyor!');
			return;
		}
			
			fetch(API_URL+'/customer/changepassword', {
				method: 'POST', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				
				
				body: 'OldPassword=' + this.state.oldpass + '&NewPassword='+this.state.newpass1,
			})
			.then(response => {
				return response.json();
			})
			.then(response => {
				// alert(JSON.stringify(response));
				
				if (response.ResultCode == 'OK') {
					this.dropdown.alertWithType('info', 'Tamam',response.ResultMessage);
					
					//  this.props.navigation.navigate('Home');
				} else {
					this.dropdown.alertWithType('error', 'Hata',response.ResultMessage);
				}
				this.setState({ loading: false });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
				this.setState({ loading: false });
			});
		}
		componentDidMount() {
			fetch(API_URL+'/menu/get/', {
				method: 'GET', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.props.navigation.state.params.token,
					Accept: 'application/x-www-form-urlencoded',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				
				
			})
			.then(response => {
				const statusCode = response.status;
				return response.json();
			})
			.then(response => {
				this.setState({menu:response.ResultMessage})
			})
			.catch(error => {
				//this.props.navigation.navigate('Home')
				this.setState({ loading: false });
				
				////alert(error);
			});
			
		}
		render(){
			return(<View style={{backgroundColor:'white'}}><HHeader title={this} baslik="Şifremi Değiştir"/>
			
			<TextInput
			label={
				"Şuanki Şifreniz"			}
				style={{
					width: Dimensions.get('window').width -20,
					margin:10,
					borderRadius: 5,
					color: 'black',
				}}
				mode="outlined"
				secureTextEntry
				onChangeText={oldpass => this.setState({ oldpass })}
				value={this.state.oldpass}
				/>
				<TextInput
				secureTextEntry
				label={
					"Yeni Şifreniz"			}
					style={{
						width: Dimensions.get('window').width -20,
						margin:10,
						borderRadius: 5,
						color: 'black',
					}}
					mode="outlined"
					
					onChangeText={newpass => this.setState({ newpass })}
					value={this.state.newpass}
					/>
					<TextInput
					secureTextEntry
					label={
						"Tekrar"			}
						style={{
							width: Dimensions.get('window').width -20,
							margin:10,
							borderRadius: 5,
							color: 'black',
						}}
						mode="outlined"
						
						onChangeText={newpass1 => this.setState({ newpass1 })}
						value={this.state.newpass1}
						/>
						
						
						<Button mode="contained" onPress={()=> this.changepass(this.state.eposta)} color={ColorCode} dark compact>Şifremi Değiştir</Button>
						<DropdownAlert ref={ref => this.dropdown = ref} />
						
						</View>);
						
					}
				}