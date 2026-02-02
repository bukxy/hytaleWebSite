<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoteRewardCreateEditRequest;
use App\Http\Resources\VoteRewardResource;
use App\Models\File;
use App\Models\VoteReward;
use App\Services\FileUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\MessageBag;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class VoteRewardsController extends Controller
{

    private function setBreadcrumbs(array $crumbs): void
    {
        session()->put('breadcrumbs', array_merge([
            ['title' => 'Dashboard', 'href' => route('dashboard.home')],
            ['title' => 'Vote rewards', 'href' => route('dashboard.vote-reward.add')]
        ], $crumbs));
    }

    public function add()
    {

        $this->setBreadcrumbs([
            ['title' => 'Create vote reward', 'href' => route('dashboard.vote-reward.add')],
        ]);

        return Inertia::render('dashboard/votes_rewards/add_edit', [
            'data' => null,
            'rewards' => VoteRewardResource::collection(VoteReward::with(['createdBy', 'updatedBy', 'image'])->get())
        ]);
    }


    public function addStore(VoteRewardCreateEditRequest $request, FileUploadService $fileUploadService): RedirectResponse
    {

        $errors = new MessageBag();

        try {
            DB::transaction(function () use ($fileUploadService, $errors, $request) {

                try {
                    $voteReward = VoteReward::create($request->validated());
                } catch (\Throwable $e) {
                    $errors->add('voteReward', 'Error create voteReward');
                    throw $e;
                }

                if ($request->file('image')) {
                    try {
                        $file = $fileUploadService->store(
                            $request->file('image'),
                            File::REWARD_IMAGE,
                            auth()->id()
                        );
                    } catch (\Throwable $e) {
                        $errors->add('image', 'Error upload image');
                        throw $e;
                    }

                    try {
                        $voteReward->image()->save($file);
                    } catch (\Throwable $e) {
                        $errors->add('image', 'Error create image');
                        throw $e;
                    }
                }
            });

        } catch (\Throwable $e) {
            return back()->withErrors($errors);
        }

        return to_route('dashboard.vote-reward.add')->with('success', 'Vote reward created successfully.');
    }

    public function edit(int $id)
    {
        $this->setBreadcrumbs([
            ['title' => 'Edit vote reward', 'href' => route('dashboard.vote-reward.edit', $id)],
        ]);

        return Inertia::render('dashboard/votes_rewards/add_edit', [
            'data' => VoteReward::with(['image'])->findOrFail($id)->toResource(VoteRewardResource::class),
            'rewards' => VoteRewardResource::collection(VoteReward::with(['createdBy', 'updatedBy', 'image'])->get())
        ]);
    }

    public function editStore(voteRewardCreateEditRequest $request, FileUploadService $fileUploadService, int $id): RedirectResponse
    {

        $voteReward = VoteReward::findOrFail($id);

        $errors = new MessageBag();

        try {
            DB::transaction(function () use ($fileUploadService, $voteReward, $errors, $request) {

                try {
                    $voteReward->update($request->validated());
                } catch (\Throwable $e) {
                    $errors->add('voteReward', 'Error update voteReward');
                    throw $e;
                }

                if ($request->file('image')) {
                    try {

                        if ($voteReward->image)
                            $fileUploadService->delete($voteReward->image);

                        $file = $fileUploadService->store(
                            $request->file('image'),
                            File::REWARD_IMAGE,
                            auth()->id()
                        );
                    } catch (\Throwable $e) {
                        $errors->add('image', 'Error upload image');
                        throw $e;
                    }

                    try {
                        $voteReward->image()->save($file);
                    } catch (\Throwable $e) {
                        $errors->add('image', 'Error create image');
                        throw $e;
                    }
                }
            });

        } catch (\Throwable $e) {
            if (isset($path))
                Storage::disk('public')->delete($path);

            return back()->withErrors($errors);
        }

        return to_route('dashboard.vote-reward.edit', $voteReward->id)->with('success', 'Vote reward updated successfully.');
    }

    public function deleteLogo(FileUploadService $fileUploadService, int $id): RedirectResponse
    {
        $voteReward = voteReward::findOrFail($id);

        if (!$voteReward->logo) {
            return to_route('dashboard.vote-reward.edit', $voteReward->id)->with('error', 'No Image to delete.');
        }

        $fileUploadService->delete($voteReward->logo);

        return to_route('dashboard.vote-reward.edit', $voteReward->id)->with('success', 'Image deleted.');
    }

    public function delete(FileUploadService $fileUploadService, int $id): RedirectResponse
    {
        $voteReward = voteReward::findOrFail($id);

        $fileUploadService->delete($voteReward->logo);
        $voteReward->delete();

        return to_route('dashboard.vote-reward.add')->with('success', 'Vote reward deleted successfully.');
    }
}
