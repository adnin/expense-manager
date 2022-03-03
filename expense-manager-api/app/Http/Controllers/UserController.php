<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = User::with('roles')->get();
        $response = [
            'users' => $data
        ];

        return response($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'role' => 'required|string'
        ]);
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt('password')
        ]);
        $user->assignRole($fields['role']);
        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'role' => 'required|string'
        ]);

        if($user->roles->first() !== $fields['role']) {
            $user->removeRole($user->roles->first());
        }

        $user->update([
            'name' => $fields['name'],
            'email' => $fields['email']
        ]);

        $user->assignRole($fields['role']);
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user->roles->first() === 'admin') {
            return response([
                'message' => 'You do not have the required authorization.'
            ], 403);
        }
        return User::destroy($id);
    }
}
