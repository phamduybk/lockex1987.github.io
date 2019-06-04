@if (count($apps) == 0)
    <div class="text-warning">
        Không tồn tại bản ghi
    </div>
@else
    <table class="table table-hover table-striped table-bordered">
        <thead>
            <tr>
                <th class="text-right">#</th>
                <th>Mã</th>
                <th>Tên</th>
                <th>URL</th>
                <th class="text-center">Thao tác</th>
            </tr>                        
        </thead>

        <tbody>
            @foreach ($apps as $idx => $a)
                <tr>
                    <td class="text-right">{{ 1 + $idx }}</td>
                    <td>{{ $a->code }}</td>
                    <td>{{ $a->name }}</td>
                    <td>{{ $a->url }}</td>
                    <td class="text-center">
                        <span class="cursor-pointer mx-2 table-action-edit" title="Sửa" onclick="openUpdateForm({{ $a->id }})">
                            <i class="fa fa-pencil text-info"></i>
                        </span>
                        <span class="cursor-pointer mx-2 table-action-delete" data-id="{{ $a->id }}" title="Xóa">
                            <i class="fa fa-trash-o text-danger"></i>
                        </span>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endif