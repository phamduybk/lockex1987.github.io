#rm -rdf public/js/*
#npm run prod
#npm run dev

rm -rdf filtered
rm -f filtered.tar
mkdir filtered

#git diff --name-status HEAD~1 HEAD > changes.txt
#java -jar fileFilter.jar .

cp -r app filtered
#cp -r bootstrap filtered
cp -r config filtered
cp -r database filtered
cp -r public filtered
cp -r resources filtered
cp -r routes filtered
#cp -r storage filtered
#cp -r vendor filtered
cp webpack.mix.js filtered

tar cvf filtered.tar filtered

scp filtered.tar huyennv9@10.30.153.186:/home/huyennv9
ssh huyennv9@10.30.153.186 'bash -s' < remote_deploy.sh

#scp filtered.tar voice@10.30.153.113:/home/voice
#ssh voice@10.30.153.113 'bash -s' < remote_deploy.sh

#scp filtered.tar voice@10.30.153.114:/home/voice
#ssh voice@10.30.153.114 'bash -s' < remote_deploy.sh
