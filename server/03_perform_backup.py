import pymongo
from datetime import datetime

# initiate the pymongo client
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['jobscraper']
jobs = db['jobs']

weekday = datetime.now().strftime('%a').lower()
backup_name = 'jobs_backup_' + weekday
jobs_backup = db[backup_name]

jobs_backup.drop()

for job in jobs.find():
    jobs_backup.insert_one(job)

print('Backed up ' + str(jobs.count_documents({})) + ' records to ' + backup_name + '.')