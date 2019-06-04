@if (count($users) == 0)
    <div class="text-warning">
        Không tồn tại bản ghi
    </div>
@else
    <table class="table table-hover table-striped table-bordered">
        <thead>
            <tr>
                <th class="text-right">#</th>
                <th>Tên tài khoản</th>
                <th>Tên đầy đủ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th class="text-center">Là admin</th>
                <th>Ứng dụng</th>
                <th class="text-center">Thao tác</th>
            </tr>                        
        </thead>

        <tbody>
            @foreach ($users as $idx => $u)
                <tr>
                    <td class="text-right">{{ $users->firstItem() + $idx }}</td>
                    <td>{{ $u->name }}</td>
                    <td>{{ $u->fullname }}</td>
                    <td>{{ $u->phone }}</td>
                    <td>{{ $u->email }}</td>
                    <td class="text-center">
                        @if ($u->is_admin)
                            <i class="fa fa-check text-success"></i>
                        @endif
                    </td>
                    <td>
                        @foreach ($u->apps as $a)
                            {{ $a->name }},
                        @endforeach
                    </td>
                    <td class="text-center">
                        <span class="cursor-pointer mx-2 table-action-edit" title="Sửa" onclick="openUpdateForm({{ $u->id }})">
                            <i class="fa fa-pencil text-info"></i>
                        </span>
                        <span class="cursor-pointer mx-2 table-action-delete" data-id="{{ $u->id }}" title="Xóa">
                            <i class="fa fa-trash-o text-danger"></i>
                        </span>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="d-flex justify-content-between">
        <div class="text-muted">
            Tìm thấy {{ $users->total() }} bản ghi,
            hiển thị từ {{ $users->firstItem() }} đến {{ $users->lastItem() }}
        </div>

        <div>
            {{ $users->appends(['search' => $search])->links() }}
        </div>
    </div>
@endif