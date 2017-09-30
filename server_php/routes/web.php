<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/helloworld', function () {
    return 'Hello World with Laravel';
});

Route::get('/json', function () {
   $obj = [
       'status' => true,
       'resCode' => 200,
       'isError' => false,
       'message' => 'JSON sample response'
   ];
//   print_r($obj);
   return json_encode($obj);
});

Route::get('/sample','Sample\SampleController@sample');

Route::get('/redirect',function (){
    return json_encode([
        'status' => true,
        'resCode' => 200,
        'isError' => 'false',
        'message' => 'Redirection successfull'
    ]);
});

Route::redirect('','/redirect');

// Student Routes.
Route::post('/student/create','studentController@store');
Route::get('student/list', 'studentController@selectall');
Route::get('/welcome',function() {
    return view('welcome');
});
//    return response().json([
//              'status' => true,
//              'resCode' => 200,
//              'isError' => false,
//               'message' => 'Student list will be returned'
//           ]);
//});
