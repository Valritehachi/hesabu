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
      'change',
      'a.logout-link',
       window.Hesabu.onClickLogout
    );

  };

  Hesabu.prototype.onClickLogout = function(e)
  {
    e.preventDefault();
    console.log("logout link clicked");
  };

  window.Hesabu = new Hesabu();

  window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    console.log("Hesabu MODULE LOADED");
    window.Hesabu.InitInterface();
  },false);

})(window.Hesabu=window.Hesabu||{},window);

  



    