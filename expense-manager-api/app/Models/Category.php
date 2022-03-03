<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description'
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'category_id', 'id');
    }

    protected $visible = ['id', 'name', 'description', 'created_at', 'expenses'];

    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->format('Y-m-d');
    }
}
