<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToDo\StoreToDoRequest;
use App\Http\Requests\ToDo\UpdateToDoRequest;
use App\Http\Resources\DeadLineResource;
use App\Http\Resources\ToDoResource;
use App\Models\ToDo;

use Carbon\Carbon;
use Date;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB; // Certifique-se de importar a classe DB
class ToDoController extends Controller
{

    protected $toDo;

    public function __construct(ToDo $toDo) {
        $this->toDo = $toDo;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $toDos = $this->toDo->orderBy('order', 'desc')->get();

        return response()->json(ToDoResource::collection($toDos), Response::HTTP_OK);
    }

    public function deadLine(): JsonResponse  {

        $deadline = [
            'onTime' => 0, 
            'nearDeadLine' => 0, 
            'overdue' => 0
        ];

        $toDos = $this->toDo->all();

        $dateCurrent = date('Y-m-d', strtotime('now'));

        foreach ($toDos as $toDo) {
            if($toDo['due_date'] >= $dateCurrent) {
                if(date('Y-m-d', 
                strtotime('-1 week', strtotime($toDo['due_date']))) == $dateCurrent) 
                {
                    $deadline['nearDeadLine']++;
                }
                else {
                    $deadline['onTime']++;
                }
            }
            else {
                $deadline['overdue']++;
            }
        }

        return response()->json($deadline, Response::HTTP_OK);
    }

    public function costsToDos(): JsonResponse {
        $year = date('Y', strtotime('now'));
    
        // Obtenha a contagem de tarefas por mês do ano atual
        $todoCounts = $this->toDo
            ->selectRaw('MONTH(due_date) as month, COUNT(*) as count')
            ->whereYear('due_date', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();
    
        return response()->json($todoCounts, Response::HTTP_OK);
    }
    
    public function getOnTime(): JsonResponse {

        $toDo = $this->toDo->where('due_date', 
            '>=', 
            date('Y-m-d', strtotime('+1 week', strtotime('now')))
        )->get();

        return response()->json(ToDoResource::collection( $toDo ), Response::HTTP_OK);
    }    

    public function getOverdue() {
        $toDo = $this->toDo->where('due_date', 
            '<', 
            date('Y-m-d', strtotime('now'))
        )->get();

        // return response()->json(ToDoResource::collection( $toDo ), Response::HTTP_OK);
        return $toDo->count();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreToDoRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['order'] = date('Y-m-d H:i:s', strtotime('now'));
        $toDo = $this->toDo->create($data);

        return response()->json($data, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $toDo = $this->toDo->find($id);

        if(!$toDo) {
            return response()->json(null, Response::HTTP_NOT_FOUND);
        }

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
