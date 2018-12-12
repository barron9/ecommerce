
export var API_URL = 'https://kurumsalb2c.com/B2C/oauth/api'
export var SLOW_NETWORK_T = 20

import React, { Component } from 'react';

import {

	View,
	Text,

	Image,
	TouchableOpacity,

	Dimensions,

} from 'react-native';
import styles from '../App'
import { RNCamera, CameraManager } from 'react-native-camera';
import Permissions from 'react-native-permissions';
export default class BadInstagramCloneApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			torchMode: 'off',
			cameraType: 'back',
			showCamera: true,
		};
	}

	barcodeReceived(e) {
		console.log('Barcode: ' + e.data);
		console.log('Type: ' + e.type);
	}

	componentDidLoad() {
		Permissions.request('camera', { type: 'always' }).then(response => {
			this.setState({ locationPermission: response });
		});
	}
	_onBarCodeRead(e) {
		this.setState({ showCamera: false });
		//  alert("karekod bulundu! tip: " + e.type + "veri: " + e.data
		// );
		//
		fetch(API_URL+'/barcode/add', {
			method: 'POST', timeout: 20000,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			},

			body: 'Barcode=' + e.data,
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				alert(JSON.stringify(response.ResultMessage));

				// this.setState({ loading: false });
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
				this.setState({ loading: false });
			});

		this.props.navigation.pop();
	}
	render() {
		return (
			<View style={styles.container}>
			{this.state.showCamera && (
				<RNCamera
				style={styles.preview}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.on}
				permissionDialogTitle={'Permission to use camera'}
				permissionDialogMessage={
					'We need your permission to use your camera phone'
				}
				onBarCodeRead={this._onBarCodeRead.bind(this)}
				barcodeFinderVisible={true}
				barcodeFinderWidth={280}
				barcodeFinderHeight={220}>
				{({ camera, status }) => {
					//alert(status)
					//  if (status !== 'READY') return <PendingView />;
					return (
						<View
						style={{
							flex: 1,
								opacity: 0.4,
								backgroundColor: 'black',
								width: Dimensions.get('window').width,
								flexDirection: 'row',
								justifyContent: 'center',
						}}>
						<View
						style={{
							width: 200,
								height: 200,
								zIndex: 10,
								opacity: 0.5,
								backgroundColor: 'white',
								borderColor: 'green',
								borderWidth: 3,
								marginTop: Dimensions.get('window').height / 3,
								alignItems: 'center',
								justifyContent: 'center',
						}}>
						<Image 
						source={require('../simple.png')}
						style={{
							width: 50,
								height: 50,
								resizeMode: 'cover',
								zIndex: -1,
						}}
						/>
						<Text style={{ color: 'black', fontSize: 12 }}>
						Lütfen karekoda yaklaştırın.
						</Text>
						</View>
						<TouchableOpacity
						style={{
							position: 'absolute',
								zIndex: 20,
								bottom: 10,
								alignItems: 'center',
								justifyContent: 'center',
								width: 150,
								height: 50,
								backgroundColor: 'white',
						}}
						onPressIn={() => this.props.navigation.pop()}>
						<View>
						<Text
						style={{
							color: 'red',
								fontWeight: '800',
								fontSize: 24,
						}}>
						KAPAT
						</Text>
						</View>
						</TouchableOpacity>
						</View>
					);
				}}
				</RNCamera>
			)}
			</View>
		);
	}

	takePicture = async function() {
		if (this.camera) {
			const options = { quality: 0.5, base64: true };
			const data = await this.camera.takePictureAsync(options);
			console.log(data.uri);
		}
	};
}