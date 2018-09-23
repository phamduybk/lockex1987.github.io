# Can sua: username, host, folder1, folder2

rm -rdf filtered
rm -f filtered.tar
mkdir filtered

# Dung lenh
# git diff --name-status HEAD HEAD~3
# de lay ra danh sach file thay doi
git diff --name-status HEAD HEAD~5 > changes.txt

java -jar fileFilter.jar .
tar cvf filtered.tar filtered
scp filtered.tar huyennv9@10.30.153.186:/home/huyennv9

# Doan nay chay tren server, k chay file trong 1 script duoc
# ssh root@MachineB 'bash -s' < local_script.sh
# Can chinh ca server nua: sua file /etc/sudoers, "Defaults    requiretty" thanh "Defaults    !requiretty" (them dau cham than)
# https://www.shell-tips.com/2014/09/08/sudo-sorry-you-must-have-a-tty-to-run-sudo/
ssh huyennv9@10.30.153.186 'bash -s' < remote_deploy.sh
