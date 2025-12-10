<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VoteWebsiteCreateRequest extends FormRequest
{

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => $this->user()->id,
            'created_by' => $this->user()->id,
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
            'file_logo_id' => [Rule::exists('files', 'id')]
        ];
    }
}
