from algoliasearch.configs import SearchConfig
from algoliasearch.search_client import SearchClient
from bs4 import BeautifulSoup
import json, re, unicodedata
from datetime import datetime
from tqdm import tqdm

config = SearchConfig(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
config.batch_size = 999999

client = SearchClient.create_with_config(config)
index = client.init_index('jobs')

start = datetime.now()

with open ('jobs.json') as jobs:
    jobs_data = jobs.read()

jobs = json.loads(jobs_data)

for job in tqdm(jobs):

    job['objectID'] = job['_id']['$oid']
    del job['_id']

    soup = BeautifulSoup(BeautifulSoup(job['description'], 'html.parser').get_text(), 'html.parser').get_text()
    job['description'] = re.sub(' +', ' ', unicodedata.normalize('NFKD', soup).replace('\n', ' ').strip())

    try:
        index.save_object(job)
    except Exception as e:
        print(e)

end = datetime.now()
print('algolia_hook took ' + str(end-start) + ' to finish.')