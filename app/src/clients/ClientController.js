

    angular
        .module('clients')
        .controller('ClientController', [
            'clientService',
            '$mdSidenav',
            '$mdBottomSheet',
            '$log',
            '$location',
            '$mdDialog',
            '$scope',
            '$clients',
            ClientController
        ]);

  //  ClientController.$inject = ['$location']; 

    function ClientController(clientService,
        $mdSidenav, $mdBottomSheet, $log,$location
 
        ,$mdDialog
        ,$scope
        ,$clients
   
        ) {

        $scope.selected = []; // hmmm into scope and into 
        $scope.selectedItems = []; // new to include .......

        $scope.filter = {
           options: {
              debounce: 7
            }
        };

        $scope.query = {
            filter: '',
            limit: '5',
            order: 'CompanyName',
            orderby: 'CompanyName desc',
            page: 1
        };

        /* jshint validthis:true */
        var vm = this;
        var self = this;
        vm.title = 'ClientController';

        self.selected = [];
        self.clients = [];
        self.selectClient = selectClient;
        self.toggleList = toggleClientsList;
        self.share = share;

        // Load all 

        clientService
              .loadAllClients()
              .then(function (clients) {
                  self.clients = [].concat(clients);
                  self.selected = clients[0];
             //   console.log("clients in array:" + clients.length);
        });



        // *********************************
        // for tabkle staff methods
        // *********************************


        var bookmark;


        function success(clients) {
        

            $scope.clients = clients;
            console.log("estaaaamossss:" + clients.length);
            console.log("estaaaamossss:" + $scope.clients.length);
        }

        $scope.onChange = function () {
            console.log("onChange...");
          
            return $clients.elementos.get($scope.query, success).$promise;
        };

        function getClients() {
            console.log("getClients...");
            $scope.deferred = $scope.onChange();
        }

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addItemController',
                
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: './src/clients/view/add-item-dialog.html',
            }).then(getClients);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: { desserts: $scope.selected },
                templateUrl: './src/clients/view/delete-dialog.html',
            }).then(getClients);
        };

        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.query.filter = '';

            if ($scope.filter.form.$dirty) {
                $scope.filter.form.$setPristine();
            }
        };

        $scope.$watch('query.filter', function (newValue, oldValue) {
            console.log("$scope.$watch...");
            if (!oldValue) {
                bookmark = $scope.query.page;
            }

            if (newValue !== oldValue) {
                $scope.query.page = 1;
            }

            if (!newValue) {
                $scope.query.page = bookmark;
            }

            getClients();
        });





        // *********************************
        // Internal methods
        // *********************************

        /**
         * Hide or Show the 'left' sideNav area
         */
        function toggleClientsList() {
            $mdSidenav('left').toggle();
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectClient(company) {
           // $log.debug("selected other.1st...");
            self.selected = angular.isNumber(company) ? $scope.clients[company] : company;
           // $log.debug("selected other...2nd.");
         //   self.toggleList();
           // $log.debug("selected other...3rd.");
        }


        /**
 * Show the bottom sheet
 */
        function share($event) {
            var client = self.selected;

            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: './src/clients/view/contactSheet.html',
                controller: ['$mdBottomSheet', ClientSheetController],
                controllerAs: "vm",
                bindToController: true,
                targetEvent: $event
            }).then(function (clickedItem) {
                $log.debug(clickedItem.name + ' clicked!');
            });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function ClientSheetController($mdBottomSheet) {
                this.client = client;
                this.items = [
                  { name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg' },
                  { name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg' },
                  { name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg' },
                  { name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg' }
                ];
                this.performAction = function (action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }


        //activate();

        //function activate() { }
    }

