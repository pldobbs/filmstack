app.factory("UserFactory", ['$resource', function($resource) {
    return $resource("/api/users/:id", {id: "@id"}, 
    {
        "update": {method: "PUT"}
    });
}]);


// old code using hard-coded paths

// app.factory("UserFactory", ['$resource', function($resource) {
//         return $resource("http://localhost:3000/api/users/:id", {id: "@id"}, 
//         {
//             "update": {method: "PUT"}
//         });
//     }]);

