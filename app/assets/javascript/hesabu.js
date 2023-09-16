(function (Hesabu,window,undefined){

  Hesabu = function() {
		this.config = {
      boundEvents: false
    };
  };


  Hesabu.prototype.InitInterface = function()
  {
    console.log('Hesabu Initializing');
    if(this.config['boundEvents'] == false){
      window.Hesabu.bindEvents();
    }
  };

  Hesabu.prototype.bindEvents = function()
  {
    // $('.quote-wrapper').off('change','.pricing-customer-type');
    // $('.quote-wrapper').on(
    //   'change',
    //   '.pricing-customer-type',
    //    window.Hesabu.onChangePricingCustomerType
    // );

    $('body').off('click','a.logout-link');
    $('body').on(
      'click',
      'a.logout-link',
       window.Hesabu.onClickLogout
    );

  };

  Hesabu.prototype.onClickLogout = function(e)
  {
    e.preventDefault();
    console.log("logout link clicked");
    window.Hesabu.ForceLogout();
  };

  Hesabu.prototype.ForceLogout = function()
  {
    var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
    console.log("Logging out....see ya!");

    $.ajax({
        url: '/users/sign_out',
        data: {
            authenticity_token: AUTH_TOKEN
        },
        context: $(document),
        cache: false,
        type: 'DELETE',
        dataType: 'json',
        error: function (jqXHR,str)
        {
          console.log("ERROR: ", str);
        },
        success: function(data,textStatus,jqXHR)
        {
          window.location.href = window.location.href;
        }
      });
  };



  window.Hesabu = new Hesabu();

  window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    console.log("Hesabu MODULE LOADED");
    window.Hesabu.InitInterface();
  },false);

})(window.Hesabu=window.Hesabu||{},window);

  



    