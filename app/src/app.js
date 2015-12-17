(function () {
    'use strict';

    angular.module('app', [
        // Angular modules
       // 'ngAnimate',
         //  ,'ngRoute'

        // Custom modules
        'clients',

        // 3rd Party Modules

         'ngMaterial'

               
       
     //   'ngResource'
        
    ])
    //      .config(function ($mdIconProvider) {
        .config(['$mdIconProvider', '$compileProvider'
            , '$mdThemingProvider'
            , function ($mdIconProvider, $compileProvider
                , $mdThemingProvider
                ) {

            $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg",128)
            .icon("share", "./assets/svg/share.svg", 24)
             .icon("phone", "./assets/svg/share.svg", 24)
             .icon("twitter", "./assets/svg/share.svg", 24)
             .icon("google_plus", "./assets/svg/share.svg", 24)
             .icon("hangouts", "./assets/svg/share.svg", 24);

            $compileProvider.debugInfoEnabled(false);
    
            $mdThemingProvider.theme('default')
            .primaryPalette('blue')
              .accentPalette('pink');
            

        }])


    .run(function ($log) {

        $log.debug("starting app")
    }

    );
})();
