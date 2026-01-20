<?php

namespace Database\Seeders;

use App\Models\File;
use App\Models\Vote;
use App\Models\VoteReward;
use App\Models\VoteWebsite;
use App\Services\FileUploadService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class VoteRewardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $service = app(FileUploadService::class);

        $vr = VoteReward::firstOrCreate(
            ['name' => 'say Hello Reward'],
            array(
                'name' => 'say Hello Reward',
                'chances' => 100,
                'is_enabled' => true,
                'is_online_required' => true,
                'money' => 50,
                'commands' => 'say pouet',
                'created_by' => 1,
                'updated_by' => 1,
            )
        );

        $filePath = storage_path('app/seeders/120x120.jpg');

        if (!file_exists($filePath))
            return;

        $uploaded = new UploadedFile(
            $filePath,
            'reward_image.jpg',
            mime_content_type($filePath) ?: 'image/jpeg',
            null,
            true
        );

        $fileModel = $service->store(
            $uploaded,
            File::REWARD_IMAGE,
            1
        );

        if ($fileModel instanceof File) {
            $vr->image()->save($fileModel);
        }
    }
}
