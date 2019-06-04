
<div class="modal fade" id="formModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="frm">
                <div class="modal-header">
                    <h4 class="modal-title">
                        <i class="fa fa-user-plus"></i>
                        <span class="action-type">Thêm mới hoặc Cập nhật</span>
                        người dùng
                    </h4>
                </div>

                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-4 control-label required">
                                Tên tài khoản
                            </label>
                            <div class="col-md-8 validate-container">
                                <input type="text" class="form-control clearable" name="name" data-validation="required" maxlength='50'>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 control-label required">
                                Tên đầy đủ
                            </label>
                            <div class="col-md-8 validate-container">
                                <input type="text" class="form-control clearable" name="fullname" data-validation="required" maxlength='100'>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 control-label required">
                                Số điện thoại
                            </label>
                            <div class="col-md-8 validate-container">
                                <input type="tel" class="form-control clearable" name="phone" data-validation="required" maxlength='50'>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 control-label required">
                                Email
                            </label>
                            <div class="col-md-8 validate-container">
                                <input type="email" class="form-control clearable" name="email" data-validation="required" maxlength='50'>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 control-label">
                                Là admin
                            </label>
                            <div class="col-md-6">
                                <input type="checkbox" class="" name="is_admin" value="1">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 control-label" id='passwordLabel'>
                                Mật khẩu
                            </label>
                            <div class="col-md-8 validate-container">
                                <input type="password" class="form-control clearable" name="password" autocomplete="new-password" maxlength='50'>
                            </div>
                        </div>
                    </div>

                    <h4 class="text-muted">Ứng dụng</h4>
                    <div>
                        @foreach ($apps as $idx => $a)
                            <div class="form-check my-2">
                                <label class="form-check-label">
                                    <input type="checkbox"
                                            class="form-check-input"
                                            name="apps[]"
                                            value="{{ $a->id }}"
                                            id="app{{ $a->id }}"/>
                                    {{ $a->code }}
                                    ({{ $a->name }})
                                <label>
                            </div>
                        @endforeach
                    </div>
                </div>


                <div class="modal-footer">
                    <input type="hidden" name="id" id="id"/>

                    <button type="button" class="btn btn-primary" onclick="saveInfo()">
                        <span class="action-type">Thêm mới hoặc Cập nhật</span>
                    </button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Đóng
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>