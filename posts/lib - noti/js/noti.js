/**
 * == noti.js ==
 */
var noti = (function() {

    function notify(text, options) {
        // Tùy chọn mặc định
        var defaultOptions = {
            'cssClass'     : "",       // CSS class, quy định màu sắc
            'icon'         : null,     // class of the icon to show before the alert text
            'duration'     : 5000,     // thời gian hiển thị thông báo, tính bằng ms, mặc định 5 giây
            'autoClose'    : true,     // tự động đóng thông báo
            'fade-duration': 'fast',   // duration of the fade in/out of the alerts. fast, slow or integer in ms
        };
        
        // Kết hợp tùy chọn mặc định và tùy chọn của người dùng
        options = (typeof options == 'object') ? $.extend(defaultOptions, options) : defaultOptions;

        
        // Vùng chứa các thông báo, là một vùng div có ID là noti và class là .noti
        var notiContainer = $("#noti");

        // Nếu chưa có thì thêm vào trong trang
        if (notiContainer.length == 0) {
            notiContainer = $('<div id="noti" class="noti"></div>');
            $(document.body).append(notiContainer);
        }

        // Icon
        var icon_markup = "";
        if (options.icon) {
            icon_markup = "<span class='" + options.icon + "'></span> ";
        }

        // Sinh ra xâu HTML, hiển thị
        //<span class="closebtn">&times</span>
        //.fadeIn(options['fade-duration'])
        var html = $('<div class="alert ' + options.cssClass + '">' + icon_markup + text + '</div>');

        // Remove the notification on click
        html.on('click', function() {
            closeNotification($(this));
        });

        // Append the label to the container
        notiContainer.append(html);

        // After 'duration' seconds, the animation fades out
        if (options.autoClose) {
            setTimeout(function() {
                closeNotification(html);
            }, options.duration);
        }
    }

    /**
     * Xóa hết các thông báo cũ.
     */
    function closeNotification(element, options) {
        var defaultOptions = {
            'duration': 'fast' // duration of the alert fade out - 'fast', 'slow' or time in ms. Default 'fast'
        };
        
        options = (typeof options == 'object') ? $.extend(defaultOptions, options) : defaultOptions;
        
        if (typeof element !== "undefined") {
            element.fadeOut(options.duration, function() {
                $(this).remove();
            });
        } else {
            $('#noti .alert').fadeOut(options.duration, function() {
                $(this).remove();
            });
        }
    }

    function notifyWithDefault(text, defaultOptions, options) {
        options = (typeof options == 'object') ? $.extend(defaultOptions, options) : defaultOptions;
        notify(text, options);
    }

    function displayError(text, options) {
        notifyWithDefault(text, { cssClass: 'alert-error', autoClose: false }, options);
    }

    function displaySuccess(text, options) {
        notifyWithDefault(text, { cssClass: 'alert-success' }, options);
    }

    function displayInfo(text, options) {
        notifyWithDefault(text, { cssClass: 'alert-info' }, options);
    }

    function displayWarning(text, options) {
        notifyWithDefault(text, { cssClass: 'alert-warning' }, options);
    }

    // Hàm gọi khi người dùng đồng ý confirm
    function displayConfirm(text, callback, options) {
        // Tùy chọn mặc định
        var defaultOptions = {
            okText: 'Đồng ý',
            closeText: 'Đóng'
        };

        // Kết hợp tùy chọn mặc định và tùy chọn của người dùng
        options = (typeof options == 'object') ? $.extend(defaultOptions, options) : defaultOptions;

        // Vùng chứa confirm
        // Không được có dấu cách giữa 2 button
        var html = `
                    <div class="noti-confirm">
                        <div class="confirm-dialog">
                            <div class="confirm-message"></div>
                            <div class="confirm-buttons">
                                <a class="button accept"></a><a class="button reject"></a>
                            </div>
                        </div>
                    </div>`;
        var confirmContainer = $(html);

        var hideConfirm = function() {
            confirmContainer.remove();

            /*
            confirmContainer.fadeOut(function() {
                $(this).remove();
            });
            */
        };
        confirmContainer.find('.accept')
                .text(options.okText)
                .click(function() {
                    hideConfirm();
                    callback();
                });
        confirmContainer.find('.reject')
                .text(options.closeText)
                .click(function() {
                    hideConfirm();
                });
        confirmContainer.find('.confirm-message').text(text);

        // Show confirm modal
        $(document.body).append(confirmContainer);
        //$(confirmContainer).hide().appendTo('body').fadeIn();
		
		// Focus vào nút OK, có thể nhấn Enter
		//okButton.focus();
    }

    function openModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = "block";
    }

    function closeModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = "none";
    }

    window.addEventListener('click', function(event) {
        var tag = event.target;

        // When the user clicks anywhere outside of the modal, close it
        /*
        if (tag == modal) {
            modal.style.display = "none";
        }
        */

        // When the user clicks on <span> (x), close the modal
        var modalId = tag.getAttribute('data-dismiss-modal');
        if (modalId) {
            closeModal(modalId);
        }
    });

    return {
        error: displayError,
        success: displaySuccess,
        info: displayInfo,
        warning: displayWarning,
        confirm: displayConfirm,
        closeNotification: closeNotification,
        openModal: openModal,
        closeModal: closeModal
    }
})();
