<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class VoteRewardResource extends JsonResource
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
            'chances' => $this->chances,
            'money' => $this->money,
            'commands' => $this->commands,
            'is_enabled' => $this->is_enabled,
            'is_online_required' => $this->is_online_required,
            'created' => new AuditResource([
                'at' => $this->created_at,
                'by' => $this->createdBy
            ]),
            'updated' => $this->updated_at ? new AuditResource([
                'at' => $this->updated_at,
                'by' => $this->updatedBy
            ]) : null,
            'image' => new FileRelationResource($this->resource, 'image')
        ];
    }
}
