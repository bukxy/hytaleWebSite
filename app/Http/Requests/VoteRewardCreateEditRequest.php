<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class VoteRewardCreateEditRequest extends FormRequest
{

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge(
            $this->route('id')
                ? ['updated_by' => Auth::id()]
                : ['created_by' => Auth::id()]
        );
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('id');

        return [
            'name' => ['required', 'string', 'min:1', 'max:255', Rule::unique('votes_rewards', 'name')->ignore($id)],
            'chances' => ['required', 'integer', 'min:1', 'max:1000000'],
            'money' => ['required', 'integer', 'min:0', 'max:1000000'],
            'is_enabled' => ['required', 'boolean'],
            'is_online_required' => ['required', 'boolean'],
            'commands' => ['required', 'string', 'min:1', 'max:255'],
            'image' =>
                File::image()
                    ->min(15)
                    ->max(100 * 1024)
                    ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
        ];
    }
}
