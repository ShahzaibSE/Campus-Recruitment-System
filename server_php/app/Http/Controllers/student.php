<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class student extends Controller
{
    public function store(Request $request){
        $request -> input('firstname');
        $request -> input('lasttname');
        $request -> input('age');
        $request -> input('gender');
        $request -> input('city');
        $request -> input('createdAt');

        DB::table('student_info') -> insert(
            [
                'firstname' => $request -> input('firstname'),
                'lastname' =>  $request -> input('lastname'),
                'age' =>  $request -> input('age'),
                'gender' =>  $request -> input('gender'),
                'city' =>  $request -> input('city'),
                'createdAt' =>  $request -> input('createdAt'),
            ]
        );

        return response() -> json([   //This automatically set in header 'content-type to application/json'
            'status' => true,
            'resCode' => 200,
            'isError' => false,
            'message' => 'Data Inserted Successfully'
        ]);
    }

    public function selectall() {
        $data = DB::table('student_info').select().get();

        if($data){
            return response().json([
                    'status' => true,
                    'resCode' => 200,
                    'isError' => false,
                    'message' => 'Data found successfully',
                    'data' => $data
                ]);
        }else if(!$data) {
            return response().json([
                    'status' => false,
                    'resCode' => 404,
                    'isError' => false,
                    'message' => 'Data not found'
//                    'data' => $data
                ]);
        }
    }
}
