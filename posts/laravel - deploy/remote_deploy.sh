rm -rdf filtered
tar xvf filtered.tar
#rm -rdf /var/www/html/sso/public/js/*
cp -r filtered/* /var/www/html/sso
#cp filtered/.env /var/www/html/sso