<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoteWebsiteCreateEditRequest;
use App\Http\Resources\VoteWebsiteResource;
use App\Models\File;
use App\Models\VoteWebsite;
use App\Services\FileUploadService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\MessageBag;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class VoteWebsiteController extends Controller
{

    public function add()
    {
        return Inertia::render('dashboard/votes_websites/add_edit', [
            'votes_websites' => VoteWebsite::with(['createdBy', 'updatedBy'])
                ->get()
                ->map(function ($vw) {
                    return [
                        'id' => $vw->id,
                        'name' => $vw->name,
                        'url' => $vw->url,
                        'created_at' => $vw->created_at,
                        'created_by' => $vw->createdBy->name,
                        'updated_at' => $vw->updated_at,
                        'updated_by' => $vw->updatedBy?->name,
                        'is_enabled' => $vw->is_enabled,
                        'has_verification' => $vw->has_verification,
                    ];
                }),
        ]);
    }

    public function addStore(VoteWebsiteCreateEditRequest $request, FileUploadService $fileUploadService): RedirectResponse
    {

        $errors = new MessageBag();

        try {
            DB::transaction(function () use ($fileUploadService, $errors, $request) {

                try {
                    $voteWebsite = VoteWebsite::create($request->validated());
                } catch (\Throwable $e) {
                    $errors->add('voteWebsite', 'Error create VoteWebsite');
                    throw $e;
                }

                if ($request->file('logo')) {
                    try {
                        $file = $fileUploadService->store(
                            $request->file('logo'),
                            File::LOGO,
                            auth()->id()
                        );
                    } catch (\Throwable $e) {
                        $errors->add('logo', 'Error upload logo');
                        throw $e;
                    }

                    try {
                        $voteWebsite->logo()->save($file);
                    } catch (\Throwable $e) {
                        $errors->add('logo', 'Error create logo');
                        throw $e;
                    }
                }
            });

        } catch (\Throwable $e) {
            if (isset($path))
                Storage::disk('public')->delete($path);

            return back()->withErrors($errors);
        }

        return to_route('dashboard.vote-website.add')->with('success', 'Vote website created successfully.');
    }

    public function edit(int $id)
    {
        $voteWebsite = VoteWebsite::with(['createdBy', 'updatedBy', 'logo'])->findOrFail($id)->toResource(VoteWebsiteResource::class);

        return Inertia::render('dashboard/votes_websites/add_edit', [
            'data' => $voteWebsite->resolve(),
            'votes_websites' => VoteWebsite::with(['createdBy', 'updatedBy'])
                ->get()
                ->map(function ($vw) {
                    return [
                        'id' => $vw->id,
                        'name' => $vw->name,
                        'url' => $vw->url,
                        'created_at' => $vw->created_at,
                        'created_by' => $vw->createdBy->name,
                        'updated_at' => $vw->updated_at,
                        'updated_by' => $vw->updatedBy?->name,
                        'is_enabled' => $vw->is_enabled,
                        'has_verification' => $vw->has_verification,
                    ];
                }),
        ]);
    }

    public function editStore(VoteWebsiteCreateEditRequest $request, FileUploadService $fileUploadService, int $id): RedirectResponse
    {

        $voteWebsite = VoteWebsite::findOrFail($id);

        $errors = new MessageBag();

        try {
            DB::transaction(function () use ($fileUploadService, $voteWebsite, $errors, $request) {

                try {
                    $voteWebsite->update($request->validated());
                } catch (\Throwable $e) {
                    $errors->add('voteWebsite', 'Error update VoteWebsite');
                    throw $e;
                }

                if ($request->file('logo')) {
                    try {

                        if ($voteWebsite->logo)
                            $fileUploadService->delete($voteWebsite->logo);

                        $file = $fileUploadService->store(
                            $request->file('logo'),
                            File::LOGO,
                            auth()->id()
                        );
                    } catch (\Throwable $e) {
                        $errors->add('logo', 'Error upload logo');
                        throw $e;
                    }

                    try {
                        $voteWebsite->logo()->save($file);
                    } catch (\Throwable $e) {
                        $errors->add('logo', 'Error create logo');
                        throw $e;
                    }
                }
            });

        } catch (\Throwable $e) {
            if (isset($path))
                Storage::disk('public')->delete($path);

            return back()->withErrors($errors);
        }

        return to_route('dashboard.vote-website.edit', $voteWebsite->id)->with('success', 'Vote website created successfully.');
    }

    public function deleteLogo(FileUploadService $fileUploadService, int $id): RedirectResponse
    {
        $voteWebsite = VoteWebsite::findOrFail($id);

        if (!$voteWebsite->logo) {
            return to_route('dashboard.vote-website.edit', $voteWebsite->id)->with('error', 'No logo to delete.');
        }

        $fileUploadService->delete($voteWebsite->logo);

        return to_route('dashboard.vote-website.edit', $voteWebsite->id)->with('success', 'Logo deleted.');
    }

    public function delete(FileUploadService $fileUploadService, int $id): RedirectResponse
    {
        $voteWebsite = VoteWebsite::findOrFail($id);

        $fileUploadService->delete($voteWebsite->logo);
        $voteWebsite->delete();

        return to_route('dashboard.vote.list')->with('success', 'Vote website deleted successfully.');
    }
}
