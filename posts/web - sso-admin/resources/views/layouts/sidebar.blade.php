<style>
    .sidebar .nav-link.active {
        color: #007bff;
    }

    .sidebar .nav-link {
        font-weight: 500;
        color: #333;
        padding: 0.8rem 1rem;
    }

    .sidebar nav .fa {
        margin-right: 15px;
    }
</style>

<div class="sidebar" style="background-color: #f8f9fa; box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1); min-width: 200px;">
    <div style="background-color: #343a40; padding: 10px 15px; height: 60px; font-size: 28px;" class="text-light d-flex align-items-center">
        <img src="/images/logo.png" style="width: 32px; height: 32px; margin-right: 15px;"/>
        {{ config('app.name', 'Laravel') }}
    </div>

    <div class="mt-3 mb-3 p-3 text-muted text-center">
        <div>
            <img class="rounded-circle"
                    src="/storage/avatars/{{ Auth::user()->avatar }}"
                    style="width: 64px; height: 64px; object-fit: cover;"
                    onerror="this.src = '/images/user-avatar.png'"/>
        </div>
        <div class="mt-1">
            {{ Auth::user()->name }}
        </div>
    </div>

    <nav>
        <a class="nav-link active-x" href="/users">
            <i class="fa fa-users"></i>
            Người dùng
        </a>
        <a class="nav-link" href="/apps">
            <i class="fa fa-desktop"></i>
            Ứng dụng
        </a>
        <a class="nav-link" href="/account">
            <i class="fa fa-cog"></i>
            Tài khoản
        </a>
        <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
            <i class="fa fa-power-off"></i>
            Đăng xuất
        </a>
    </nav>

    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
</div>
