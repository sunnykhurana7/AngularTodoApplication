(function () {
    'use strict';

    angular
        .module("myApp")
        .factory("todoProcessor",todoProcessor);

        todoProcessor.$inject = ["todoListfactory"];

        function todoProcessor(TodoBackend) {
            
            var service = {};
            service.getTodos = getTodos;


            var datacombine = {
                completebefore:[],
                incompletebefore:[],
                completeafter:[],
                incompleteafter:[]

            }

            // get current data
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();

            var currentd = dd + '-' + mm + '-' + yyyy;
            var currentvalue = currentd.split('-');
            var currentDate = new Date();

            currentDate.setFullYear(currentvalue[2],(currentvalue[1]-1),currentvalue[0]);

            return service;
            
            function processTodo () {
                return TodoBackend
                    .getTodoList()
                    .then(refineTodos);
            }
            
            function refineTodos(response) {
                return filterData(response.data);
            }
            
            function filterData(data) {

                data.forEach(function (value) {
                var entryvalue;
                entryvalue = value.date.split('-');
                var entryDate = new Date();
                entryDate.setFullYear(entryvalue[2],(entryvalue[1]-1),entryvalue[0]);

                if(entryDate<=currentDate){
                    if(value.status=="complete"){
                        datacombine.completebefore.push(value);
                    }else{
                         datacombine.incompletebefore.push(value);
                    }
                }else{
                    if(value.status=="complete"){
                        datacombine.completeafter.push(value);
                    }else{
                        datacombine.incompleteafter.push(value);
                    }
                }


                })
                
                return datacombine;
            }

            function  getTodos() {
                return processTodo();
            }
            
        }

})();