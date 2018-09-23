agent_load_env() {
    env=~/.ssh/agent.env
    test -f "$env" && . "$env" >| /dev/null
}

unload_env() {
    unset env
}

agent_start() {
    (umask 077; ssh-agent >| "$env")
    . "$env" >| /dev/null
}

add_ssh_keys() {
    # Neu ban danh 'ssh-add' thi se chi add file ~/.ssh/id_rsa
    # Them key bitbucket khong co key-phrase
    ssh-add ~/.ssh/bitbucket
    # Them key id_rsa vi khi deploy nen server 186 can
    ssh-add ~/.ssh/id_rsa
    # Kiem tra add thanh cong chua
    ssh-add -l
}

check_ssh_keys() {
    # agent_run_state: 0=agent running w/ key; 1=agent w/o key; 2= agent not running
    agent_run_state=$(ssh-add -l >| /dev/null 2>&1; echo $?)

    if [ ! "$SSH_AUTH_SOCK" ] || [ $agent_run_state = 2 ]; then
        agent_start
        add_ssh_keys
    elif [ "$SSH_AUTH_SOCK" ] && [ $agent_run_state = 1 ]; then
        add_ssh_keys
    fi
}

goto_default_folder() {
    cd /d/xampp/htdocs/voice-landing-frontend/
}

agent_load_env
check_ssh_keys
unload_env
goto_default_folder
