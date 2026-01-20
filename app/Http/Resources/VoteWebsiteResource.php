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

            'created' => new AuditResource([
                'at' => $this->created_at,
                'by' => $this->createdBy
            ]),
            'updated' =>  new AuditResource([
                'at' => $this->updated_at,
                'by' => $this->updatedBy
            ]),

            'logo' => new FileRelationResource($this->resource, 'logo')
        ];
    }
}
