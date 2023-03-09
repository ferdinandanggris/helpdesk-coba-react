<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    protected $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function index(){
        return User::select("*")->get();
    }

    public function store(Request $request){
        $request->validate([
            'name'  => 'required',
            'email' => 'required',
            'password' => 'required',
            'level' => 'required'
        ]);

        $data = $request->only([
                    'name',
                    'email',
                    'password',
                    'level'
                ]);

        try {
            // encrypt password
            $data['password'] = bcrypt($data['password']);
            User::create($data);

            return response()->json([
                'message' => 'User Berhasil dibuat!'
            ,200]);

        } catch (\Throwable $th) {
            //throw $th;
            Log::error($th->getMessage());
            return response()->json([
                'message' => $th->getMessage()
            ],422);
        }
    }

    public function show(int $id){
        $user = User::where('id', $id)->first();
        return response()->json([
            'message' => 'Data ditemukan',
            'data' => $user
        ]);
    }

    public function update(Request $request,$id){
        $request->validate([
            'name'  => 'required',
            'email' => 'required',
            'level' => 'required'
        ]);

        $user = User::find($id);

        $data = $request->only([
            'name',
            'email',
            'password',
            'level'
        ]);

        try {
            if (isset($data['password']) && !empty($data['password'])) {
                $data['password'] = bcrypt($data['password']);
            }else{
                $data['password'] = (User::find($id))->password;
            }

            $user->fill($data)->update();

            return response()->json([
                'message' => 'User berhasil diubah'
            ],200);

        } catch (\Throwable $th) {
            //throw $th;
            Log::error($th->getMessage());
            return response()->json([
                'message' => $th->getMessage()
            ],422);
        }
    }

    public function destroy($id){
        try {
            $user = User::find($id)->delete();

            return response()->json([
                'message' => 'User berhasil dihapus!'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            Log::error($th->getMessage());
            return response()->json([
                'message' => $th->getMessage()
            ]);
        }
    }


}
