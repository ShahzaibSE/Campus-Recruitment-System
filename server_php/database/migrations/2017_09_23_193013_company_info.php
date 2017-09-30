<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CompanyInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Writing company's migration structure
        Schema::create('company_info',function(Blueprint $table){
           $table -> increments('Id');
           $table -> strings('name');
           $table -> string('CEO');
           $table -> string('country');
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
