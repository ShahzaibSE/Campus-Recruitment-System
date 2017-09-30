<?php

namespace App\Http\Controllers\Sample;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SampleController extends Controller
{
    public function sample() {
        $obj = [
            'status' => true,
            'resCode' => 200,
            'isError' => false,
            'message' => 'JSON sample response'
        ];
        //   print_r($obj);
        return json_encode($obj);
    }
}
