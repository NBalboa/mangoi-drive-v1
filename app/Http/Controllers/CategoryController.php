<?php

namespace App\Http\Controllers;

use App\Enums\IsDeleted;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{


    public function index(Request $request) {
        $categories = Category::select('id','name');


        if($request->input('search')){
            $search   = $request->input('search');
            $categories = $categories->where('name', 'like', "%$search%");
        }


        $categories = $categories->isNotDeleted()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Categories', [
            'categories' => $categories
        ]);
    }
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


    public function edit(Category $category){

        return Inertia::render('Admin/CategoryEdit', [
            'category' => $category
        ]);
    }



    public function update(UpdateCategoryRequest $request, Category $category){
        $validated  = $request->validated();
        $category->name = $validated['name'];
        $category->save();


        return redirect()->route('categories.index');
    }


    public function delete(Category $category){
        $category->is_deleted = IsDeleted::YES->value;
        $category->save();

        return redirect()->route('categories.index');
    }
}
