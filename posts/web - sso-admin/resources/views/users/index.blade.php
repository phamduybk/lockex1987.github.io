@extends('layouts.app')

@section('breadcrumbTitle', 'Người dùng')

@section('content')
    <div class="d-flex justify-content-between mb-2">
        <div>
            <label>
                <input type="text"
                        class="form-control d-inline w-auto"
                        placeholder="Tìm kiếm"
                        autocomplete="off"
                        id="search">
            </label>
        </div>

        <div>
            <button type="button" class="btn btn-primary" onclick="openCreateForm()">
                Thêm mới
            </button>
        </div>
    </div>

    <div id="searchResult"></div>

    @include('users.form')
@endsection

@section('script')
    <script src="/js/users.js"></script>
@endsection