<?php

namespace App\student;
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class studentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        DB::table('student') -> insert(
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        csrf_field();
        $student = new student;

        $student->firstname = $request->firstname;
        $student->lastname = $request->lastname;
//        $student->email - $request->email;
        $student->gender = $request->gender;
        $student->age = $request->age;
        $student->city = $request-> city;

        $student->save();

        return response() -> json([   //This automatically set in header 'content-type to application/json'
            'status' => true,
            'resCode' => 200,
            'isError' => false,
            'message' => 'Data Inserted Successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
