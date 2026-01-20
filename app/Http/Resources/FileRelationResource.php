<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class FileRelationResource extends JsonResource
{

    private string $relation;

    public function __construct($resource, string $relation)
    {
        parent::__construct($resource);
        $this->relation = $relation;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): ?array
    {
        if (! $this->resource->relationLoaded($this->relation))
            return null;

        $file = $this->resource->{$this->relation};

        if (! $file)
            return null;

        return [
            'id' => $file->id,
            'path' => Storage::url($file->path),
        ];
    }
}
