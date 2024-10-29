<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToDo\StoreToDoRequest;
use App\Http\Requests\ToDo\UpdateToDoRequest;
use App\Http\Resources\ToDoResource;
use App\Models\ToDo;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ToDoController extends Controller
{

    protected $toDo;

    public function __construct(ToDo $toDo) {
        $this->toDo = $toDo;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $toDo = $this->toDo->orderBy('order', 'desc')->get();

        return response()->json(ToDoResource::collection($toDo), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreToDoRequest $request): JsonResponse
    {
        $data = $request->validated();

        $toDo = $this->toDo->create($data);

        return response()->json(ToDoResource::make($toDo), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $toDo = $this->toDo->findOrFail($id);

        return response()->json(ToDoResource::make($toDo), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateToDoRequest $request, $id): JsonResponse
    {
        $data = $request->validated();
        
        $toDo = $this->toDo->findOrFail($id);

        $toDo->update($data);

        return response()->json(ToDoResource::make($toDo), Response::HTTP_OK);        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $toDo = $this->toDo->findOrFail($id);
        $toDo->delete();
        
        return response()->json(ToDoResource::make($toDo), Response::HTTP_OK);        
    }
}
