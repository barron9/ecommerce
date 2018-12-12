import React, { Component } from 'react';


export default class PaymentSuccessScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}
	static navigationOptions = {
		title: 'Siparişiniz Alındı',
		header: null,

		//header: null,
	};

	componentDidMount() {
		this.setState({ token: this.props.navigation.state.params.token });
		//alert(JSON.stringify(this.props))
		//this.showcart()
	}

	render() {
		return <View />;
	}
}