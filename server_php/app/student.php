<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class student extends Model
{
    protected $fillable = ['firstname', 'lastname', 'email', 'gender', 'age', 'city'];
}
