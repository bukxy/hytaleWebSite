<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class VoteWebsiteCreateRequest extends FormRequest
{

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => Auth::id(),
            'created_by' => Auth::id(),
            'is_enabled' => $this->has('is_enabled'),
            'has_verification' => $this->has('has_verification')
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:1', 'max:255', Rule::unique('votes_websites', 'name')],
            'url' => ['required', 'string', 'lowercase', 'min:3', 'max:255'],
            'is_enabled' => ['required', 'boolean'],
            'verification_key' => ['string', 'max:255'],
            'has_verification' => ['required', 'boolean'],
            'created_by' => ['required', Rule::exists('users', 'id')],
            'user_id' => ['required', Rule::exists('users', 'id')],
            'logo' => [
                File::image()
                    ->min(15)
                    ->max(100 * 1024)
                    ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
            ]
        ];
    }
}
