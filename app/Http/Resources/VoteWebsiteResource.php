<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class VoteWebsiteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'url' => $this->url,
            'is_enabled' => (bool) $this->is_enabled,
            'has_verification' => (bool) $this->has_verification,
            'verification_key' => $this->verification_key,

            'created_by' => $this->whenLoaded('createdBy', fn () => [
                'name' => $this->createdBy->name,
                'email' => $this->createdBy->email,
            ]),
            'created_at' => $this->created_at?->toISOString(),

            'updated_by' => $this->whenLoaded('updatedBy', fn () => [
                'name' => $this->updatedBy->name,
                'email' => $this->updatedBy->email,
            ]),
            'updated_at' => $this->updated_at?->toISOString(),

            'user_id' => $this->user_id,

            'logo' => $this->whenLoaded('logo', fn () => [
                'id' => $this->logo->id,
                'path' => Storage::url($this->logo->path),
            ]),
        ];
    }
}
