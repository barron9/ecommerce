
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
import VersionNumber from 'react-native-version-number';
var utf8 = require('utf8');
var binaryToBase64 = require('binaryToBase64');
import EnIcon from 'react-native-vector-icons/Entypo'; // 4.5.0
import {API_URL,
    SLOW_NETWORK_T,
    styles,
    ProjectOrderPaymentMethod,
    ColorCode,
    deviceid,devicename,devicemodel,deviceosversion,deviceos
    
} from '../App'
import uyeSchema from './dbschemas/uyeSchema'
import notificationSchema from './dbschemas/notificationSchema'
import DropdownAlert from 'react-native-dropdownalert';
import Drawer from 'react-native-drawer-menu'; // 0.2.5
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import { FloatingAction } from 'react-native-floating-action'; // 1.10.1
import SwiperFlatList from 'react-native-swiper-flatlist';

import { Button,TextInput,Text,TouchableRipple,FAB,Appbar ,Searchbar,RadioButton,Title,Divider,List,Paragraph,Surface} from 'react-native-paper';




export default class HomeScreen extends React.Component {
	loadingComponent: Promise<React.Element<*>>;
	loadingComponent1: Promise<*>;
	constructor(props) {
		super(props);
		this.spinValue = new Animated.Value(0);
        
		this.state = {
			isShowingText: false,
			UserName: '',
			Password: '',
			loading: false,
			index: 0,
			routes: [
				{ key: 'first', title: 'First' },
				{ key: 'second', title: 'Second' },
			],
		};
	}
	static navigationOptions = {
		//title: 'MAINSCREEN',
		header: null,
	};
	onPressInLearnMore() {
		alert('oturumm ac');
		this.setState(previousState => {
			return { isShowingText: !previousState.isShowingText };
		});
	}
    
	unuttum() {
		alert('sifre unuutm');
	}
	updategps(authtoken) {
		navigator.geolocation.requestAuthorization();
        
		navigator.geolocation.getCurrentPosition(
			position => {
				//  alert(JSON.stringify(position))
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null,
				});
                
				fetch(
					API_URL+'/device/setDeviceLocation',
					{
						method: 'POST', timeout: 20000, timeout: 20000,
						headers: {
							Authorization: 'Bearer ' + authtoken,
							'Content-Type': 'application/x-www-form-urlencoded',
						},
                        
						body:
						'DeviceId=' +
						deviceid +
						'&Latitude=' +
						position.coords.latitude +
						'&Longitude=' +
						position.coords.longitude,
					}
                    )
					.then(response => {
						return response.json();
					})
					.then(response => {
                        
						this.setState({ loading: false });
					})
					.catch(error => {
						//  alert(JSON.stringify(error))
                        this.dropdown.alertWithType('error', 'Bağlantı','Bağlantınız yavaş tekrar deneniyor...');
                        
						//this.props.navigation.navigate('Home');
						// alert(genelhata);
						this.setState({ loading: false });
					});
                },
                error => {
                    this.setState({ error: error.message }),
                    
					this.dropdown.alertWithType('error', 'Hata', JSON.stringify(error))
                    
                    
                },
                { enableHighAccuracy: false, timeout: 20000 }
                );
            }
            
            updatedevicefirebasetoken(fbtoken, authtoken) {
                fetch(API_URL+'/device/setDeviceInfo', {
                    method: 'POST', timeout: 20000,
                    headers: {
                        Authorization: 'Bearer ' + authtoken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    
                    body:
                    'DeviceId=' +
                    deviceid +
                    '&PushId=' +
                    fbtoken +
                    '&Name=' +
                    devicename +
                    '&Model=' +
                    devicemodel +
                    '&OSType=' +
                    deviceos +
                    '&OSVersion=' +
                    deviceosversion +
                    '&AppVersion=' +
                    VersionNumber.buildVersion +
                    '&Debug=',
                })
                .then(response => {
                    return response.json();
                })
                .then(response => {
					this.setState({ loading: false });
                })
                .catch(error => {
                    this.dropdown.alertWithType('error', 'Bağlantı','Bağlantınız yavaş tekrar deneniyor...');
                    
                    this.setState({ loading: false });
                });
            }
            sendRemoteData(token) {
                let body = {
                    to: '/topics/default',
                    data: {
                        custom_notification: {
                            body: 'test body',
                            title: 'test title',
                            color: '#00ACD4',
                            priority: 'high',
                            icon: 'ic_launcher',
                            sound: 'default',
                            show_in_foreground: true,
                        },
                        aps: {
                            badge: 1,
                        },
                    },
                };
                
                body = {
                    data: {
                        title: 'PromoClub kazandırıyor',
                        body: 'Süpriz hediyeler indirimli ürünler...',
                        url: 'mydsaasdurl',
                    },
                    notification: {
                        title: 'PromoClub kazandırıyor',
                        body: 'Süpriz hediyeler indirimli ürünler...',
                        sound: 'default',
                        badge: 1,
                    },
                    to: '/topics/default',
                    content_available: true,
                    priority: 'high',
                };
                
                firebaseClient.send(JSON.stringify(body), 'data');
            }
            
            navigate = url => {
                // E
                const { navigate } = this.props.navigation;
                const route = url.replace(/.*?:\/\//g, '');
                const id = route.match(/\/([^\/]+)\/?$/)[1];
                const routeName = route.split('/')[0];
                
                if (routeName === 'people') {
                    navigate('Proje', { id, name: 'chris' });
                }
            };
            async componentDidMount() {
                this.loadingComponent = new Promise(resolve => {
                    setTimeout(() => {
                        resolve(
                            <View
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                            >
                            <Text>Resolved</Text>
                            </View>
                            );
                        }, 6000);
                    });
                    this.loadingComponent1 = new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                        }, 8000);
                    });
                    
                    
                    
                    
                    var color = this.state.colorAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#858a91', '#ffffff'],
                    });
                    this.refs.eposta.focus()
                    
                    if (Platform.OS === 'android') {
                        Linking.getInitialURL().then(url => {
                            const { navigate } = this.props.navigation;
                            const route = url.replace(/.*?:\/\//g, '');
                            const id = route.match(/\/([^\/]+)\/?$/)[1];
                            const routeName = route.split('/')[0];
                            this.props.navigation.navigate('ProductDetail', {
                                name: id,
                                token: this.state.token,
                            });
                            //  alert(id)
                        });
                    }
                    //registerAppListener(this.props.navigation);
                    //
                    if (Platform.OS === 'ios') {
                        FCM.getAPNSToken().then(tokens => {
                            // alert("APNS TOKEN (getFCMToken): "+ JSON.stringify(tokens));
                        });
                    }
                    FCM.getFCMToken().then(token_ => {
                        alert(token_);
                        //  this.updatedevicefirebasetoken(token_,deviceid)
                        token = token_;
                        this.setState({ tokenx: token_ || '' });
                    });
                    
                    Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
                    .then(realm => {
                        realm.objects('Uyeler'); //Tüm objeleri geri dönderir.
                        // alert(realm.objects('Uyeler').filtered('username="'+this.state.UserName+'"').length)
                        
                        if (realm.objects('Uyeler').length < 1) {
                        } else {
                            // alert(JSON.stringify(realm.objects('Uyeler')[0].username))
                            
                            this.setState(
                                {
                                    UserName: realm.objects('Uyeler')[0].username,
                                    Password: realm.objects('Uyeler')[0].sifre,
                                },
                                function() {
                                    this.dologin();
                                    
                                }
                                );
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                        
                        this.spin();
                        
                        //sendRemoteData(token)
                        return;
                        this.setState({ loading: true });
                        
                        fetch(API_URL+'/parameters/list', {
                            method: 'GET', timeout: 20000,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        })
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            alert(JSON.stringify(response));
                            
                            this.setState({ loading: false, projectsettings: response });
                        })
                        .catch(error => {
                            this.props.navigation.navigate('Home');
                            alert(genelhata);
                            this.setState({ loading: false });
                        });
                    }
                    dologin() {
                        this.dropdown.alertWithType('info', 'Giriş Yapılıyor', 'Lütfen bekleyiniz...')
                        
                        
                        
                        var encodedString='' ;
                        //	  var text = 'foo © bar 𝌆 baz';
                        //var bytes = utf8.encode(text);
                        //var encoded = binaryToBase64(bytes);
                        if(true){
                            // this.setState({ loading: true });
                            encodedString = binaryToBase64(utf8.encode(this.state.Password));
                            // alert(encodedString)
                            this.setState({loading:true,Password2:encodedString},function(){
                                
                                fetch(API_URL+'/auth', {
                                    method: 'POST', timeout: 20000,
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    
                                    body:'grant_type=password'+
                                    '&UserName=' +
                                    this.state.UserName +
                                    '&Password=' +
                                    encodeURIComponent(this.state.Password)
                                })
                                .then(response => {
                                    return response.json();
                                })
                                .then(response => {
                                    //alert(JSON.stringify(response))
                                    if (response.LoginControl === 'Success') {
                                        
                                        Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
                                        .then(realm => {
                                            realm.objects('Uyeler'); //Tüm objeleri geri dönderir.
                                            
                                            if (
                                                realm
                                                .objects('Uyeler')
                                                .filtered('username="' + this.state.UserName + '"').length < 1
                                                ) {
                                                    //	 alert(JSON.stringify(realm.objects('Uyeler').filtered('username="'+this.state.UserName+'"')))
                                                    Realm.open({ schema: [uyeSchema,notificationSchema], schemaVersion: 5 })
                                                    .then(realm => {
                                                        realm.write(() => {
                                                            realm.create('Uyeler', {
                                                                username: this.state.UserName,
                                                                mail: this.state.UserName,
                                                                sifre: encodeURIComponent(this.state.Password),
                                                                rank: 2,
                                                                token: response.access_token,
                                                                sepet: 0,
                                                            });
                                                        });
                                                        this.props.navigation.navigate('Proje', {
                                                            UserName: this.state.UserName,
                                                            Password: encodeURIComponent(this.state.Password
                                                                ),
                                                                token: response.access_token,
                                                            });
                                                        })
                                                        .catch(error => {
                                                            console.log(error);
                                                        });
                                                    } else {
                                                        
                                                        
                                                        
                                                        const resetAction = NavigationActions.reset({
                                                            index: 0,
                                                            actions: [NavigationActions.navigate({ routeName: 'Proje',params:{
                                                                UserName: this.state.UserName,
                                                                Password: encodeURIComponent(this.state.Password),
                                                                token: response.access_token,
                                                                
                                                                
                                                            } })],
                                                        });
                                                        
                                                        this.props.navigation.dispatch(resetAction);
                                                        
                                                    }
                                                })
                                                .catch(error => {
                                                    this.dropdown.alertWithType('error', 'Bağlantı','Bağlantı Hatası oluştu...');
                                                    
                                                    console.log(error);
                                                });
                                            } else {
                                                this.dropdown.alertWithType('error', 'Hata',response.error_description);
                                                
                                                //this.setState({ Password: '' });
                                                
                                                //alert('hatalı giriş yaptınız');
                                            }
                                            this.setState({ loading: false });
                                        });
                                        
                                        
                                        
                                        
                                        
                                    })
                                    // alert(this.state.Password)
                                    
                                    
                                }else{
                                    encodedString = this.state.Password;
                                    
                                }
                                
                                
                            }
                            spin() {
                                this.spinValue.setValue(0);
                                
                                Animated.loop(
                                    Animated.timing(this.spinValue, {
                                        toValue: 360,
                                        duration: 1000,
                                        easing: Easing.linear,
                                        useNativeDriver: true,
                                    }),
                                    {
                                        iterations: 3,
                                    }
                                    ).start(event => {
                                        this.spin();
                                        if (event.finished) {
                                            console.log('finished');
                                        }
                                    });
                                }
                                render() {
                                    const { navigate } = this.props.navigation;
                                    if (this.state.isShowingText) {
                                        return (
                                            <View
                                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            
                                            
                                            
                                            
                                            <ActivityIndicator size="large" color="green" />
                                            </View>
                                            );
                                        } else {
                                            const resizeMode = 'cover';
                                            const initialLayout = {
                                                height: 130,
                                                width: Dimensions.get('window').width,
                                            };
                                            const spin = this.spinValue.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '360deg'],
                                            });
                                            return (
                                                <KeyboardAvoidingView behavior="padding" style={{ height: Dimensions.get('window').height,backgroundColor:'white' }}>
                                                <HHeader title={this} baslik="Giriş yap" side="login"/>
                                                <View
                                                style={{
                                                    zIndex: 11,
                                                    alignItems: 'center',
                                                    paddingTop: 0,
                                                    justifyContent: 'center',
                                                }}>
                                                
                                                <View style={{ height: 5 }} />
                                                {true && (
                                                    <View>
                                                    
                                                    <View
                                                    style={{
                                                        padding: 20,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                    }}>
                                                    <TextInput
                                                    mode="outlined"
                                                    underlineColorAndroid="rgba(0,0,0,0)"
                                                    underlineColorAndroid="rgba(0,0,0,0)"
                                                    label="E-Posta"
                                                    ref="epostaios"
                                                    style={{
                                                        //height: 40,fontSize:16,
                                                        width: Dimensions.get('window').width - 20,
                                                        // backgroundColor: '#ddd',
                                                        //opacity: 0.8,
                                                        //	padding: 10,
                                                        borderRadius: 5,
                                                        marginBottom: 5,
                                                        //	borderColor: '#ddd',
                                                        color: 'black',
                                                        //	borderBottomWidth: 1,
                                                        //	borderBottomColor: '#ddd',
                                                    }}
                                                    onChangeText={UserName => this.setState({ UserName })}
                                                    value={this.state.UserName}
                                                    />
                                                    
                                                    <TextInput
                                                    mode="outlined"
                                                    
                                                    underlineColorAndroid="rgba(0,0,0,0)"
                                                    underlineColorAndroid="rgba(0,0,0,0)"
                                                    label="Parola"
                                                    style={{
                                                        //	height: 40,fontSize:16,
                                                        width: Dimensions.get('window').width - 20,
                                                        // backgroundColor: '#ddd',
                                                        //	opacity: 0.8,
                                                        //	padding: 10,
                                                        borderRadius: 5,
                                                        //	borderColor: '#ddd',
                                                        color: 'black',
                                                        //	borderBottomWidth: 1,
                                                        borderBottomColor: '#ddd',
                                                    }}
                                                    onChangeText={Password => this.setState({ Password })}
                                                    value={this.state.Password}
                                                    secureTextEntry={true}
                                                    />
                                                    </View>
                                                    <View
                                                    style={{
                                                    }}>
                                                    
                                                    
                                                    
                                                    </View>
                                                    <Button mode="contained" onPress={()=>this.dologin()} style={{marginTop:10,marginLeft:20,marginRight:20,width:Dimensions.get('window').width-40}} dark>Giriş yap</Button>
                                                    
                                                    <View style={{flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',marginLeft:30,marginRight:30,marginTop:40}}>
                                                    
                                                    <TouchableOpacity
                                                    onPress={() => this.props.navigation.navigate('Forgot')}
                                                    style={{ marginLeft: 20,marginBottom:20 }}>
                                                    <Text
                                                    style={{
                                                        color: ColorCode,
                                                        textDecorationLine: 'underline',
                                                        fontWeight: '100',fontSize:16,
                                                        fontFamily:
                                                        Platform.OS == 'android' ? 'Roboto-Thin' : null,
                                                    }}
                                                    textDecorationLine={'underline line-through'}>
                                                    Şifremi Unuttum
                                                    </Text>
                                                    </TouchableOpacity>
                                                    
                                                    
                                                    <TouchableOpacity
                                                    onPress={() =>
                                                        this.props.navigation.navigate('Register', {
                                                            eposta: this.state.eposta,
                                                        })
                                                    }
                                                    
                                                    style={{ marginLeft:20, }}>
                                                    <Text
                                                    style={{
                                                        color: ColorCode,
                                                        textDecorationLine: 'underline',
                                                        fontWeight: '100',fontSize:16,
                                                        fontFamily:
                                                        Platform.OS == 'android' ? 'Roboto-Thin' : null,
                                                    }}
                                                    textDecorationLine={'underline line-through'}>
                                                    Hesabınız yok mu? Kayıt Olun.
                                                    </Text>
                                                    </TouchableOpacity>
                                                    
                                                    
                                                    
                                                    </View>
                                                    
                                                    
                                                    
                                                    </View>
                                                    )}
                                                    </View>
                                                    
                                                    <Text
                                                    style={{
                                                        marginTop: 0,
                                                        color: 'red',
                                                        fontWeight: '100',
                                                        position: 'absolute',
                                                        bottom: Platform.OS == 'ios' ? 0 : 0,
                                                        left: 0,
                                                        zIndex: 200,
                                                        fontSize: 8,
                                                    }}>
                                                    appVersion {VersionNumber.appVersion}
                                                    {'\n'}
                                                    buildVersion {VersionNumber.buildVersion}
                                                    </Text>
                                                    <DropdownAlert ref={ref => this.dropdown = ref} />
                                                    
                                                    </KeyboardAvoidingView>
                                                    );
                                                }
                                            }
                                        }