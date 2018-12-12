
import React, { Component } from 'react';
import {
	View,Dimensions,FlatList,ScrollView,TouchableOpacity,Keyboard,ActivityIndicator
} from 'react-native';
import HHeader from './header/HHeader'
import {API_URL,pickerSelectStyles,ColorCode} from '../App'
import DropdownAlert from 'react-native-dropdownalert';
import RNPickerSelect from 'react-native-picker-select';

import { Button,TextInput,Text,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface} from 'react-native-paper';


export default class EditAddressScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			cart: '',
			gotocart: false,
			run: false,
			tcno: '',
			vergino: '',
			vergidairesi:'',
			firmaadi:'',


			items: [],bireysel:true,kurumsal:false
		};
	}
	static navigationOptions = {
		title: 'Sepetim',
		header: null,
	};
	_keyboardDidShow(e){

		this.setState({keyboardShow:true,
			keyboardHeight: e.endCoordinates.height,

		})


	}
	_keyboardDidHide(e){
		this.setState({keyboardShow:false,keyboardHeight:0
		})

	}
	componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>this._keyboardDidShow(e));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e=>this._keyboardDidHide(e));
		//alert(this.props.navigation.state.params.secilenadres)
		this.setState(
			{
				token: this.props.navigation.state.params.token,
				paymentway: this.props.navigation.state.params.paymentway,
				secilenadres: this.props.navigation.state.params.secilenadres,
			},
			function() {
				var alladdress = [];
				this.getaddressdetails(
					this.props.navigation.state.params.secilenadres,
					alladdress
				);
			}
		);
		//alert(JSON.stringify(this.props))
		// this.stepaddress();
		//	 alert( this.teslimatadresiref.selectedItem() )
		//alert(this.props.navigation.state.params.paymentway);
		// alert(this.props.navigation.state.params.secilenadres)
	}

	stepaddress() {
		this.setState({ stepaddress: true, loading: true });
		//GET /api/parameters/list
		//
		fetch(API_URL+'/parameters/list', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: '',
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
				if (response.CustomerAddressChangeable === false) {
					this.setState({ addresschangeable: false, acdone: true }, function() {
						// this.getaddresslist();
					});
				} else {
					this.setState({ addresschangeable: true, acdone: true }, function() {
						// this.getaddresslist();
					});
				}
				this.getaddresslist();
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}

	getaddresslist() {
		fetch(API_URL+'/customeraddress/list', {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.state.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//	body: '',
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
				this.setState({ loading: false, addresslistdata: response });
				// alert(JSON.stringify(response))
				//
				var alladdress = [];
				var adresler = [];
				for (var r = 0; r < response.length; r++) {
					this.getaddressdetails(response[r].Id, alladdress);
					adresler.push({//label value0
						label: response[r].ShippingAddressId,
						value: response[r].ShippingAddressId,
					});
					//	cardsselect.push({label:response.PaymentTypes[i].Name,value:response.PaymentTypes[i].Id})

					// this.getaddressdetails(response[r].Id, alladdress)
				}
				this.setState({ adresler: adresler });
				//alert(alladdress)
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	pulltowndata(cityid) {
		fetch(
			API_URL+'/customeraddress/town/' + cityid,
			{
				method: 'GET', timeout: 20000,
				headers: {
					Authorization: 'Bearer ' + this.state.token,
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				//body: 'id='+response.ShippingTownId,
			}
		)
			.then(response => {
				const statusCode = response.status;
				if (statusCode != 200 && 1 == 2) {
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
				//	this.setState({loading:false,addressgettowndata:response,});
				var towndata = [];
				for (var i = 0; i < response.length; i++) {
					towndata.push({
						value: response[i]['Name'],
						id: response[i]['Id'],
					});
				}
				var sgh = [];
				for (var i = 0; i < response.length; i++) {
					sgh.push({ value: response[i].Id, label: response[i].Name });
				}

				//alert(JSON.stringify(response))
				// return false
				this.setState({
					loading: false,
					addressgettowndata: sgh,
					towndata: towndata,
				});
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	getaddressdetails(id, alladdress) {
		this.setState({ loading: true });
		//alert(id +'---'+alladdress)

		fetch(API_URL+'/customeraddress/get/' + id, {
			method: 'GET', timeout: 20000,
			headers: {
				Authorization: 'Bearer ' + this.props.navigation.state.params.token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			//body: 'id=',
		})
			.then(response => {
				const statusCode = response.status;
				if (statusCode != 200 && 1 == 2) {
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
				alladdress.push({ response: response });
				//alert(JSON.stringify(alladdress));
				//  return false
				this.pulltowndata(response.ShippingCityId);

				this.setState({
					addressgetdata: alladdress,
					addressgetdatadone: true,
					loading: false,
					adress: response,
					isim: response.ShippingFirstName,
					soyisim: response.ShippingLastName,
					adres1: response.ShippingAddress,
					eposta: response.ShippingEmail,
					tcno: response.ShippingTcNumber,
					ceptel: response.ShippingGsm,
					favColor: response.ShippingCityId,
					favColor2: response.ShippingTownId,
					vergino: response.ShippingTaxNumber,
					firmaadi: response.ShippingCompanyName,
					postakodu: response.ShippingPostNumber,
					vergidairesi:response.ShippingTaxOffice
					//ShippingTownId:response.ShippingTownName,ShippingCityId:response.ShippingCityName
				});

				// return;
				//alert(JSON.stringify(response))
				this.setState({ id: response.ShippingAddressId });
				//return

				fetch(API_URL+'/customeraddress/city/', {
					method: 'GET', timeout: 20000,
					headers: {
						Authorization: 'Bearer ' + this.state.token,
						'Content-Type': 'application/x-www-form-urlencoded',
					},

					//	body: '',
				})
					.then(response => {
						const statusCode = response.status;
						if (statusCode != 200 && 1 == 2) {
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
						var citydata = [];
						for (var i = 0; i < response.length; i++) {
							citydata.push({
								value: response[i]['Name'],
								id: response[i]['Id'],
							});
						}
						//	alert(JSON.stringify(response))
						// return false
						var sgh = [];
						for (var i = 0; i < response.length; i++) {
							sgh.push({ value: response[i].Id, label: response[i].Name });
						}
						this.setState({
							loading: false,
							addressgetcitydata: sgh,
							citydata: citydata,
						});
					})
					.catch(error => {
						this.props.navigation.navigate('Home');
						//alert(error);
					});
			})
			.catch(error => {
				this.props.navigation.navigate('Home');
				//alert(error);
			});
	}
	updateaddressdetails(id) {
		/*
		if (
			!this.state.isim ||
			!this.state.soyisim ||
			// !this.state.alias ||
			!this.state.adres1 ||
			!this.state.eposta ||
			!this.state.ceptel ||
			((!this.state.tcno || this.state.tcno =='' )&& (!this.state.firmaadi ||!this.state.vergidairesi ||!this.state.vergino ))
			 || !this.state.favColor ||
			!this.state.favColor2
		) {
			this.setState({ errorv: true });


			if (!this.state.isim) {
				this.setState({ errorvisim: true });
			}
			if (!this.state.soyisim) {
				this.setState({ errorvsoyisim: true });
			}
			if (!this.state.alias) {
				this.setState({ errorvalias: true });
			}
			if (!this.state.adres1) {
				this.setState({ errorvadres1: true });
			}
			if (!this.state.eposta) {
				this.setState({ errorveposta: true });
			}
			if (!this.state.ceptel) {
				this.setState({ errorvceptel: true });
			}
			if (!this.state.tcno) {
				this.setState({ tcno: '' });
			}

			if (!this.state.firmaadi) {
				this.setState({ firmaadi: '' });
			}
			if (!this.state.vergidairesi) {
				this.setState({ vergidairesi: '' });
			}

			if (!this.state.vergino) {
				this.setState({ vergino: '' });
			}
			//this.dropdown.alertWithType('error', 'Hata','Bilgilerinizi eksiksiz giriniz');


		//	return;
		}
		*/
			this.setState({ loading: true });
//alert(this.state.vergidairesi)
fetch(
	API_URL+'/customeraddress/create-update/',
	{
		method: 'POST', timeout: 20000,
		headers: {
			Authorization: 'Bearer ' + this.props.navigation.state.params.token,
			Accept: 'application/x-www-form-urlencoded',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body:
		'ShippingAddressId=' +
		(id==null?'00000000-0000-0000-0000-000000000000':id) +
		'&ShippingFirstName=' +
		this.state.isim +
		'&ShippingLastName=' +
		this.state.soyisim +
		'&ShippingName=' +
		// this.state.alias +
		'&ShippingDescription=' +
		// this.state.tanim +
		'&ShippingAddress=' +
		this.state.adres1 +
		'&ShippingPostNumber=' +
		// this.state.postakodu +
		'&ShippingEmail=' +
		this.state.eposta +
		'&ShippingGsm=' +
		this.state.ceptel +
		'' +
		(typeof this.state.tcno === undefined  || this.state.tcno == 'undefined' || !this.state.tcno ? '&ShippingTcNumber=':'&ShippingTcNumber='+this.state.tcno) +
		(typeof this.state.tcno === undefined || this.state.tcno == 'undefined' || !this.state.tcno?('&ShippingCompanyName=' +(this.state.firmaadi) +'&ShippingTaxOffice=' +(this.state.vergidairesi) +'&ShippingTaxNumber=' +(this.state.vergino)) :'') +
		'&ShippingNote=' +
		//  this.state.not +
		'&ShippingCityId=' +
		this.state.favColor +
		'&ShippingTownId=' +
		this.state.favColor2,
	}
)
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
		//this.props.navigation.pop()
		this.dropdown.alertWithType('info', 'Bilgi',JSON.stringify(response.ResultMessage));

		// alert(JSON.stringify(response));
		this.setState({ loading: false ,//done:true
		});
	})
	.catch(error => {
			this.dropdown.alertWithType('error', 'Bağlantı','Bağlantınız yavaş tekrar deneniyor...');

	//	this.props.navigation.navigate('Home');
	//	//alert(error);
	});
	}

	onChangeText(textz) {
		//alert(text)
		return;
		var sonuc = textz.split('***');
		alert(JSON.stringify(sonuc[1]));
		var alladdress = [];
		var self = this;
		//    self.getaddressdetails(JSON.stringify(sonuc[1]),alladdress);
		self.stepaddress();
	}
	_onFocus () {
		KeyboardAvoid.checkNeedScroll({
			nodeRef: this.titleInput, 		    //TextInput ref
			scrollNodeRef: this.scrollView,     //ScrollView ref
			contentOffset: this.contentOffset   //ScrollView scrollOffset.y
		}, 'scroll', 0);
	}
	render() {
		const { navigate } = this.props.navigation;
		let data = [
			{
				value: 'Banana',
			},
			{
				value: 'Mango',
			},
			{
				value: 'Pear',
			},
		];
		return (
			<View>

			<View
			style={{
				width: Dimensions.get('window').width,
					flexDirection: 'column',			}}>
			<HHeader title={this} baslik={this.props.navigation.state.params.secilenadres==null?"Yeni Adres":"Adresi Düzenle"} />
			<ScrollView style={{height:this.state.keyboardShow?Dimensions.get('window').height-this.state.keyboardHeight-70 :Dimensions.get('window').height-70}}
			>


			<View
			style={{
				borderColor:'#ccc',borderWidth:.8,
					backgroundColor: 'white',
					padding: 10,
					margin:10,
					borderRadius: 10,
			}}>
			<Title>Kişisel Bilgiler</Title>
			<TextInput
			ref="isim"
			label="İsim"
			onPress={()=>{this.refs['isim'].focus()}}
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			keyboardType="name-phone-pad"
			secureTextEntry={false}
			mode="outlined"

			value={this.state.isim}
			style={{
				//	fontSize: 16,
				//	paddingTop: 13,
				paddingHorizontal: 10,
					//	paddingBottom: 12,
					//	borderWidth: 1,
					borderColor: this.state.errorvisim ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
			}}
			onChangeText={isim => this.setState({ isim })}
			/>
			<TextInput
			label="Soy İsim"
			ref="soyisim"
			onPress={()=>{this.refs['soyisim'].focus()}}
			mode="outlined"

			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			secureTextEntry={false}
			value={this.state.soyisim}

			style={{
				//	fontSize: 16,
				//		paddingTop: 13,
				paddingHorizontal: 10,
					//		paddingBottom: 12,
					//		borderWidth: 1,
					borderColor: this.state.errorvsoyisim ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
			}}
			onChangeText={soyisim => this.setState({ soyisim })}
			/>
			<TextInput

			label="E-Posta"
			mode="outlined"
			ref="eposta"
			onPress={()=>{this.refs['eposta'].focus()}}

			underlineColorAndroid="rgba(0,0,0,0)"
			value={this.state.eposta}
			disabled={this.props.navigation.state.params.secilenadres==null?false:true}
			secureTextEntry={false}

			style={{
				//	fontSize: 16,
				//		paddingTop: 13,
				paddingHorizontal: 10,
					//		paddingBottom: 12,
					borderWidth: 1,
					borderColor: this.state.errorveposta ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
			}}
			onChangeText={eposta => this.setState({ eposta })}
			/>

			<TextInput
			label="Cep Telefonu ÖRN. 5321234567"
			mode="outlined"

			ref="ceptel"
			onPress={()=>{this.refs['ceptel'].focus()}}

			underlineColorAndroid="rgba(0,0,0,0)"
			keyboardType="number-pad"
			value={this.state.ceptel}
			secureTextEntry={false}

			style={{
				//	fontSize: 16,
				//		paddingTop: 13,
				paddingHorizontal: 10,
					//		paddingBottom: 12,
					borderWidth: 1,
					borderColor: this.state.errorvceptel ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
			}}
			onChangeText={ceptel => this.setState({ ceptel })}
			/>

			</View>
			<View
			style={{borderColor:'#ccc',borderWidth:.8,
					backgroundColor: 'white',
					padding: 10,
					borderRadius: 10,
					margin: 10,
			}}>
			<Title>Adres Detayları</Title>

			<TextInput
			ref="adres1"
			mode="outlined"

			onPress={()=>{this.refs['adres1'].focus()}}
			label="Adres"
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={this.state.addresschangeable == false ? false : true}
			multiline={true}
			value={this.state.adres1}
			secureTextEntry={false}

			style={{
				//	fontSize: 16,
				//		paddingTop: 13,
				paddingHorizontal: 10,
					//		paddingBottom: 12,
					//	borderWidth: 1,
					borderColor: this.state.errorvadres1 ? 'red' : '#f0f0f0',
					borderRadius: 4,
					color: 'black',
					height: 70,
			}}
			onChangeText={adres1 => this.setState({ adres1 })}
			/>

			{this.state.addressgetcitydata && (
				<RNPickerSelect
				disabled={this.state.addresschangeable ? true : false}
				style={{
					...pickerSelectStyles,
				}}
				placeholder={{
					label: 'İl seçiniz',
						value: null,
				}}
				items={this.state.addressgetcitydata}
				onValueChange={value => {
					if (this.state.addresschangeable === false) return;
					this.setState({
						favColor: value,
						addressgettowndata: null,
					});
					this.pulltowndata(value);
				}}
				onUpArrow={() => {}}
				onDownArrow={() => {}}
				value={this.state.favColor}
				/>
			)}

			{this.state.addressgettowndata && (
				<View>

				<RNPickerSelect
				disabled={this.state.addresschangeable ? true : false}
				style={{
					...pickerSelectStyles,
				}}
				placeholder={{
					label: 'İlçe seçiniz',
						value: null,
				}}
				items={this.state.addressgettowndata}
				onValueChange={value => {
					if (this.state.addresschangeable === false) return;

					this.setState({
						favColor2: value,
					});
				}}
				onUpArrow={() => {}}
				onDownArrow={() => {}}
				value={this.state.favColor2}
				/>
				</View>
			)}
			</View>
			<View
			style={{
				borderColor:'#ccc',borderWidth:.8,
					backgroundColor: 'white',
					padding: 10,
					borderRadius: 5,
					margin: 10,
			}}>
			<Title>Fatura Tipi</Title>

			<View style={{ flexDirection: 'row' ,backgroundColor:'white',justifyContent:'space-between',paddingLeft:10,paddingRight:10}}>

			<View style={{flexDirection:'row'}}>
			<TouchableOpacity style={{flexDirection:'row'}} onPress={() => {
				this.setState({ kurumsal: false, bireysel: true ,ShippingTaxNumber:false,ShippingTaxOffice:false,ShippingCompanyName:false })

			}} style={{width:20,height:20}}>
			{ (this.state.bireysel==false) ?
				<View style={{width:20,height:20,backgroundColor:'#ddd',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
				<View style={{width:16,height:16,backgroundColor:'white',borderRadius:8}}/>

				</View>:
				<View style={{width:20,height:20,backgroundColor: '#ddd',alignItems:'center',justifyContent:'center',borderRadius:10}}>
				<View style={{width:16,height:16,backgroundColor:ColorCode,borderRadius:8,borderColor:'white',borderWidth:3}}/>
				</View>}

			</TouchableOpacity>
			<Text  onPress={() => {
				this.setState({ kurumsal: false, bireysel: true,ShippingTaxNumber:false,ShippingTaxOffice:false,ShippingCompanyName:false })

			}} >Bireysel</Text>

			</View>
			<View style={{flexDirection:'row'}}>
			<TouchableOpacity  style={{flexDirection:'row'}} onPress={() => {
				this.setState({ kurumsal: true, bireysel: false ,ShippingTcNumber:false,tcno:false})

			}} style={{width:20,height:20}}>
			{ (this.state.kurumsal==false) ?
				<View style={{width:20,height:20,backgroundColor:'#ddd',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
				<View style={{width:16,height:16,backgroundColor:'white',borderRadius:8}}/>

				</View>:
				<View style={{width:20,height:20,backgroundColor: '#ddd',alignItems:'center',justifyContent:'center',borderRadius:10}}>
				<View style={{width:16,height:16,backgroundColor:ColorCode,borderRadius:8,borderColor:'white',borderWidth:3}}/>
				</View>}

			</TouchableOpacity>
			<Text onPress={() => {
				this.setState({ kurumsal: true, bireysel: false,ShippingTcNumber:false,tcno:false })

			}} >Kurumsal</Text>

			</View>




			</View>
			<View style={{backgroundColor:'white',borderRadius:10}}>
			{this.state.bireysel && (
				<View>
				<TextInput
				ref="tcno"
				onPress={()=>{this.refs['tcno'].focus()}}
				label="TC Kimlik No"
				underlineColorAndroid="rgba(0,0,0,0)"
				keyboardType="number-pad"
				secureTextEntry={false}
				value={this.state.tcno}
				mode="outlined"

				style={{
					//	fontSize: 16,
					//		paddingTop: 13,
					paddingHorizontal: 10,
						//		paddingBottom: 12,
						//borderWidth: 1,
						//borderColor: '#f0f0f0',
						borderRadius: 4,
						color: 'black',
				}}
				onChangeText={tcno => this.setState({ tcno })}
				/>
				</View>
			)}
			{this.state.kurumsal && (
				<View>
				<TextInput
				label="Firma Adı"
				ref="firmaadi"
				onPress={()=>{this.refs['firmaadi'].focus()}}
				mode="outlined"

				underlineColorAndroid="rgba(0,0,0,0)"
				value={this.state.firmaadi}
				secureTextEntry={false}
				style={{
					//	fontSize: 16,
					//		paddingTop: 13,
					paddingHorizontal: 10,
						//		paddingBottom: 12,
						//borderWidth: 1,
						//borderColor: '#f0f0f0',
						borderRadius: 4,
						color: 'black',
				}}
				onChangeText={firmaadi => this.setState({ firmaadi })}
				/>
				<TextInput
				label="Vergi Dairesi"
				ref="vergidairesi"
				onPress={()=>{this.refs['vergidairesi'].focus()}}
				mode="outlined"

				underlineColorAndroid="rgba(0,0,0,0)"
				value={this.state.vergidairesi}

				secureTextEntry={false}
				style={{
					//	fontSize: 16,
					//		paddingTop: 13,
					paddingHorizontal: 10,
						//		paddingBottom: 12,
						//	borderWidth: 1,
						//	borderColor: '#f0f0f0',
						borderRadius: 4,
						color: 'black',
				}}
				onChangeText={vergidairesi =>
					this.setState({ vergidairesi })
				}
				/>

				<TextInput
				ref="vergino"
				label="Vergi No"
				onPress={()=>{this.refs['vergino'].focus()}}
				mode="outlined"

				underlineColorAndroid="rgba(0,0,0,0)"
				keyboardType="number-pad"
				value={this.state.vergino}

				secureTextEntry={false}
				style={{
					//	fontSize: 16,
					//		paddingTop: 13,
					paddingHorizontal: 10,
						//		paddingBottom: 12,
						borderWidth: 1,
						borderColor: '#f0f0f0',
						borderRadius: 4,
						color: 'black',
				}}
				onChangeText={vergino => this.setState({ vergino })}
				/>
				</View>
			)}
			</View>






			<Button icon={this.state.done?"done":"save"} mode="contained" disabled={this.state.done}
			style={{margin:5,backgroundColor:ColorCode}}
			onPress={()=>
				{ 	if(!this.state.done){
					this.updateaddressdetails(this.props.navigation.state.params.secilenadres)
				}else{

				}
					return
					if(this.props.navigation.state.params.secilenadres==null){
						this.props.navigation.navigate('MyCart', {
							token: this.props.navigation.state.params.token,
							secilenadres:null
						});
						return
					}

					//this.updateaddressdetails( this.props.navigation.state.params.secilenadres)
					//this.props.navigation.pop()
				}}

			>
			{this.state.done? 'Adres Güncellendi/Eklendi':'Kaydet ve Devam et'}
			</Button>

			</View>
			</ScrollView>






			{this.state.loading && (
				<View
				style={{
					width: 50,
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: Dimensions.get('window').height / 2 - 25,
						marginLeft: Dimensions.get('window').width / 2 - 25,
						position: 'absolute',
						zIndex: 599,
						height: 50,
						borderRadius: 10,
						backgroundColor: ColorCode,
						opacity: 0.9,
						flexDirection: 'column',
				}}>
				<ActivityIndicator
				size="small"
				color="white"
				style={{ zIndex: 99 }}
				/>
				</View>
			)}
			</View>
			<DropdownAlert ref={ref => this.dropdown = ref} />

			</View>
		);
	}
}