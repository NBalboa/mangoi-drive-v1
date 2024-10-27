<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{

    public function create()
    {
        return Inertia::render('Admin/CategoryCreate');
    }


    public function store(CategoryRequest $request)
    {

        Category::create([
            'name' => $request->input('name')
        ]);

        return redirect()->route("categories.create");
    }
}
