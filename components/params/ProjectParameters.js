
import API_URL from '../../App'
 const ProjectParameters =()=> {



    fetch(API_URL+'/parameters/list', {
        method: 'GET', timeout: 5000,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
                .then(response => {
                    const statusCode = response.status;
                    //alert(statusCode)
                    if (statusCode != 200) {
                        //alert(statusCode)
            this.setState({ loading: false ,load:false,retry:true});
    
                    } else {
                        return response.json();
                    }
                })
    
        .then(response => {
            alert(response.ColorCode)
            ProjectOrderPaymentMethod = response.ProjectOrderPaymentMethod;
            UserNameEnabled = response.UserNameEnabled;
            CustomerAddressChangeable = response.CustomerAddressChangeable;
            UserRegistrationType = response.UserRegistrationType;
            IncludingCargoPrice = response.IncludingCargoPrice;
            ColorCode = '#'+response.ColorCode;
            this.setState({c:ColorCode,loading:false,retry:false,ppm:response.ProjectOrderPaymentMethod},function(){
            Animated.timing(this.backgroundColor, {
          duration: 1000,
          toValue: 1,
        }).start();
    
    
            })
    
    
        })
        .catch(error => {
            this.setState({ loading: false ,load:false,retry:true});
    
            return
    
        });


}

module.exports = {
ProjectParameters:ProjectParameters,
ColorCode:ProjectParameters.ColorCode,
ProjectOrderPaymentMethod:ProjectParameters.ProjectOrderPaymentMethod


}