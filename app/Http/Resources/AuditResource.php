<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): ?array
    {
        if (empty($this['at'])) {
            return null;
        }

        return [
            'at' => $this['at'],
            'by' => $this['by']
                ? [
                    'name'  => $this['by']->name,
                    'email' => $this['by']->email,
                ]
                : null,
        ];
    }
}
