
<div class="modal fade" id="formModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="frm">
                <div class="modal-header">
                    <h4 class="modal-title">
                        <i class="fa fa-user-plus"></i>
                        <span class="action-type">Thêm mới hoặc Cập nhật</span>
                        ứng dụng
                    </h4>
                </div>

                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-4 control-label required">
                                Mã
                            </label>
                            <div class="col-md-8 validate-container">
                                <input type="text" class="form-control clearable" name="code" data-validation="required" maxlength='50'>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 control-label required">
                                Tên
                            </label>
                            <div class="col-md-8 validate-container">
                                <input type="text" class="form-control clearable" name="name" data-validation="required" maxlength='100'>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 control-label required">
                                URL
                            </label>
                            <div class="col-md-8 validate-container">
                                <input type="text" class="form-control clearable" name="url" data-validation="required" maxlength='50'>
                            </div>
                        </div>
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