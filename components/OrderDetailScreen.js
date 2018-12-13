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
import HHeader from './header/HHeader'
import { Button,TextInput,Text,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface} from 'react-native-paper';

export default class OrderDetailScreen extends React.Component {
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

	componentDidMount() {
//alert(JSON.stringify(this.props.navigation.state.params.data))

	}
	render(){
		return(<ScrollView ><HHeader title={this} baslik= {"Sipariş No: "+ this.props.navigation.state.params.siparisno}/>
			{false &&<Paragraph>{JSON.stringify(this.props.navigation.state.params.data)}</Paragraph>}

<View style={{margin:10}}>


			<List.Section style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10}}>
			<Title>Sepet Detayı</Title>
			<Text>Ürün adedi: {this.props.navigation.state.params.data.Items.length}</Text>
			{this.props.navigation.state.params.data.ShoppingCart.Cash>0 &&
			<Text >Ödenen Miktar: {this.props.navigation.state.params.data.ShoppingCart.Cash>0?this.props.navigation.state.params.data.ShoppingCart.Cash:''} {this.props.navigation.state.params.data.ShoppingCart.Cash>0 ? 'TL':''}</Text>
			}
			<Text>Toplam: {this.props.navigation.state.params.data.ShoppingCart.Total} Puan</Text>



				<FlatList
			data={this.props.navigation.state.params.data.Items}
			renderItem={(item)=><View style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10,flexDirection:'row'}}>
					<Image defaultSource={require('../noimage.jpg')}
				source={{ uri: 'https:' + item.item.ProductImage }}
				style={{ width: 50, height: 50 }}
				/>

<View>
				<Text>{(item.item.ProductName)}</Text>
				<Text>Adet: {(item.item.Quantity)}</Text>
				<Text>Fiyat: {(item.item.Price)}</Text>

				<Text>Sipariş Durumu: {(item.item.OrderState)}</Text>
				</View>

				</View>}


			/>

			</List.Section>

			 <List.Section style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10}}>
			<Title>Teslimat Bilgileri</Title>

			<Text>İsim: {this.props.navigation.state.params.data.ShippingPerson}</Text>
			<Text>Adres: {this.props.navigation.state.params.data.ShippingAddress} {this.props.navigation.state.params.data.ShippingCity} {this.props.navigation.state.params.data.ShippingTown} {this.props.navigation.state.params.data.ShippingCountry}</Text>

			</List.Section>
 <List.Section style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10}}>
			<Title>Fatura Bilgileri</Title>

			<Text>İsim: {this.props.navigation.state.params.data.BillingPerson}</Text>
			<Text>Adres: {this.props.navigation.state.params.data.BillingAddress} {this.props.navigation.state.params.data.BillingCity} {this.props.navigation.state.params.data.BillingTown} {this.props.navigation.state.params.data.BillingCountry}</Text>

			</List.Section>
<List.Section  style={{margin:5,elevation:1,borderRadius:5,backgroundColor:'white',padding:10}}>
			<Title>Kargo Bağlantısı</Title>

			<Text onPress={()=>{if(this.props.navigation.state.params.data.CargoLink==null)return;
				Linking.openURL(this.props.navigation.state.params.data.CargoLink).catch(err => alert('hata oluştu'+err))}}>Kargo Linki: {this.props.navigation.state.params.data.CargoLink!==null?this.props.navigation.state.params.data.CargoLink:'Kargo takip linkiniz henüz oluşmadı'}</Text>

			</List.Section>

		</View>

			</ScrollView>);

	}
}