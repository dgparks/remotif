#!/bin/bash

echo "**********************************************************************************************************"
echo "**********************************************************************************************************"
echo "************************************** $(date) **************************************"
echo "**********************************************************************************************************"
echo "**********************************************************************************************************"

# prep scraping environment
cd /home/ubuntu/remotif
source venv/bin/activate
cd server
mongo jobscraper --eval 'db.newly_scraped.drop()'
cp remote_ratios_template.json remote_ratios.json

# scrape data
scrapy crawl greenhouse
scrapy crawl lever

# process data
python 01_collapse_multiples.py
python 02_update_jobs.py

# backup data
python 03_perform_backup.py

# export a json for indexing with algolia
mongoexport --collection=jobs --db=jobscraper --jsonArray --out=jobs.json
python 04_algolia_hook.py

# create new json file called jobs_nodesc (no descriptions...for faster loading client-side)
# and place a copy in the asset folder of client
python 05_remove_descriptions.py
cp jobs_nodesc.json ../client/src/assets/data/jobs_nodesc.json

# create new json in canonical format for use with mongodb atlas
# and run a script that automatically updates the MongoDB Atlas with newest jobs
mongoexport --collection=jobs --db=jobscraper --jsonFormat=canonical --out=jobs_db.json
./06_atlas_import.exp

# build and deploy
cd ../client
npm run build
firebase deploy --token $FIREBASE_TOKEN --non-interactive