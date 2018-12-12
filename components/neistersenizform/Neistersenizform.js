
import React, { Component } from 'react';

import {
	View,

	Dimensions,

} from 'react-native';
import { TextInput} from 'react-native-paper';

export default class Neistersenizform extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const status = this.props
		return (
			<View
			style={{ flexDirection: 'column',alignItems:'center',justifyContent:'center' }}>
			<View style={{ width: Dimensions.get('window').width -20 }}>
			<TextInput
			mode="outlined"
disabled={this.props.status}
			underlineColorAndroid="rgba(0,0,0,0)"
			underlineColorAndroid="rgba(0,0,0,0)"
			style={{
				//	height: 40,
				//		borderColor: 'gray',
				//		borderWidth: 1,
					paddingLeft: 10,
					color: 'black',

			}}
			onChangeText={cins => this.setState({ cins })}
			label={'Cins (Led Tv)'}
			/>
			</View>
			<View style={{ width: Dimensions.get('window').width -20 }}>
			<TextInput
			mode="outlined"
			disabled={this.props.status}

			underlineColorAndroid="rgba(0,0,0,0)"
			underlineColorAndroid="rgba(0,0,0,0)"
			style={{
				//	height: 40,
				//		borderColor: 'gray',
				//		borderWidth: 1,
					paddingLeft: 10,
					color: 'black',

			}}
			label={'Marka (Sony)'}
			onChangeText={marka => this.setState({ marka })}
			/>
			</View>
			<View style={{ width: Dimensions.get('window').width -20 }}>
			<TextInput
			mode="outlined"
			disabled={this.props.status}

			underlineColorAndroid="rgba(0,0,0,0)"
			underlineColorAndroid="rgba(0,0,0,0)"
			style={{
				//	height: 40,
				//		borderColor: 'gray',
				//		borderWidth: 1,
					color: 'black',
					paddingLeft: 10,
			}}
			onChangeText={model => this.setState({ model })}
			label={'Model (46",3D)'}
			/>
			</View>
			<View style={{ width: Dimensions.get('window').width-20 }}>
			<TextInput
			mode="outlined"
			disabled={this.props.status}

			underlineColorAndroid="rgba(0,0,0,0)"
			underlineColorAndroid="rgba(0,0,0,0)"
			style={{
				//	height: 40,
				//		borderColor: 'gray',
				//		borderWidth: 1,
					color: 'black',
					paddingLeft: 10,
			}}
			onChangeText={adet => this.setState({ adet })}
			label={'Miktar 2'}
			/>
			</View>
			</View>
		);
	}
}