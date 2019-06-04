sudo rm -rdf filtered
sudo tar xvf filtered.tar
sudo rm -rdf /var/www/html/passport/public/js/*
sudo \cp -r filtered/* /var/www/html/passport
