@extends('layouts.app')

@section('breadcrumbTitle', 'Ứng dụng')

@section('content')
    <div class="text-right mb-2">
        <button type="button" class="btn btn-primary" onclick="openCreateForm()">
            Thêm mới
        </button>
    </div>

    <div id="searchResult"></div>

    @include('apps.form')
@endsection

@section('script')
    <script src="/js/apps.js"></script>
@endsection