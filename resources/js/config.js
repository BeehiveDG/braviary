const config = {

    // ------------------------------------------------------------------
    // parameters
    // ------------------------------------------------------------------

    BASE_URL: window.location.origin,
    API_BASE_URL: window.location.origin,
    HEADER: {
        headers: {
            'Content-Type': 'application/json'
        }
    },
    AUTHORIZED_HEADER: {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ''
        }
    },


    // ------------------------------------------------------------------
    // tool function
    // ------------------------------------------------------------------
    setAPI_BaseURL: function ()
    {
        switch (window.location.hostname)
        {
            case 'localhost':               this.BASE_URL = this.BASE_URL + '/';
                                            break;
            case 'braviary.test':           this.BASE_URL = this.BASE_URL + '/';
                                            break;
            case 'xlab.agriweather.online': this.BASE_URL = 'https://xlab.agriweather.online/braviary/';
                                            break;
            default:                        this.BASE_URL = 'https://xlab.agriweather.online/braviary/';
                                            break;
        }
        this.API_BASE_URL = this.BASE_URL + 'api/'
        return this.API_BASE_URL;
    },
    
    getAPI_URL: function (action, payload = {})
    {
        switch (action)
        {
            // API USER
            case 'Log_In_User':         return this.API_BASE_URL + 'auth/login';
            case 'Log_Out_User':        return this.API_BASE_URL + 'auth/logout';
            case 'Show_User_Profile':   return this.API_BASE_URL + 'me';
            // API EAGLE
            case 'Get_Eagle_List':      return this.API_BASE_URL + 'eagles';                                         // GET
            case 'Create_Eagle':        return this.API_BASE_URL + 'eagles';                                         // POST
            case 'Get_Eagle_Feathers':  return this.API_BASE_URL + 'eagles' + '/' + payload.id + '/' + 'feathers';   // GET

            default: return this.API_BASE_URL;
        }
    },

    getAuthorized_Header: function (token, params = {})
    {
        this.AUTHORIZED_HEADER.headers['Authorization'] = token;
        if(params.length > 0){
            this.AUTHORIZED_HEADER.params = params;
        }
        return this.AUTHORIZED_HEADER;
    }
}

export { config }