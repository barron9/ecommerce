import React, { Component } from 'react';
import {
	View,Dimensions,WebView
} from 'react-native';
import HHeader from './header/HHeader'




export default class AgreementScreen extends React.Component {
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


	render(){
		return(<View style={{flex:1}}><HHeader title={this} baslik="Satış Sözleşmesi"/>
							
		
	<WebView
				scalesPageToFit={false}
				style={{
					width: Dimensions.get('window').width,
						height:  Dimensions.get('window').height,
						//position:'absolute',zIndex:100
				}}
				source={{baseUrl: '',
					html:
					'<html><html lang="tr"><head><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"><META HTTP-EQUIV="Content-language" CONTENT="tr"><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=windows-1254"></head><body>' +
						this.props.navigation.state.params.data +
						'</body></html>',
				}}
				/>

			</View>);

	}
}