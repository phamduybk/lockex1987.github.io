rm -rdf filtered
rm -f filtered.tar
mkdir filtered

cp -r app filtered
cp -r config filtered
cp -r public filtered
cp -r resources filtered
cp -r routes filtered
#cp -r bootstrap filtered
#cp -r database filtered
#cp -r storage filtered
#cp -r vendor filtered

#cp .env filtered
#cp artisan filtered
#cp server.php filtered
#cp composer.json filtered
#cp composer.lock filtered

tar cvf filtered.tar filtered

scp filtered.tar huyennv9@10.30.153.186:/home/huyennv9
ssh huyennv9@10.30.153.186 'bash -s' < remote_deploy.sh
