<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Writing migration structure.
        Schema::create('student_info',function(Blueprint $table){
            $table -> increaments('Id');
            $table -> string('firstname');
            $table -> string('lastname');
            $table -> integer('age');
            $table -> string('gender');
            $table -> string('city');
            $table -> bigInteger('batch');
            $table -> date('createdAt');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
