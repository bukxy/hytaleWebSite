<?php

namespace App\Services;

use App\Models\File as FileModel;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class FileUploadService
{
    /**
     * Stock file on disk and create DB record.
     *
     * @param UploadedFile $uploadedFile  Uploaded File
     * @param string $type                Ex: File::LOGO, File::REWARD_IMAGE...
     * @param int $userId                 User (creator)
     * @param string $disk                Ex: 'public' (default 'public')
     * @param string $directory           Ex: 'logos', 'rewards'... ('' = root)
     */
    public function store(
        UploadedFile $uploadedFile,
        string $type,
        int $userId,
        string $disk = 'public',
        string $directory = ''
    ): FileModel {
        $filename = Uuid::uuid4()->toString() . '.' . $uploadedFile->extension();

        $path = Storage::disk($disk)->putFileAs(
            $directory,
            $uploadedFile,
            $filename
        );

        return FileModel::create([
            'filename' => $filename,
            'path' => $path,
            'type' => $type,
            'user_id' => $userId,
        ]);
    }

    /**
     * Delete file from disk and DB record.
     */
    public function delete(FileModel $file, string $disk = 'public'): void
    {
        Storage::disk($disk)->delete($file->path);
        $file->delete();
    }
}
