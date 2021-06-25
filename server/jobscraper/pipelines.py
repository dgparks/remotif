# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
from .helpers import job_meets_requirements
import pymongo
import logging, os, time, json
import logging.handlers

class MongoPipeline(object):

    collection = 'newly_scraped'

    # current_time = int(time.time())
    # logfile = "/home/ubuntu/remotefirst.xyz/remotefirst-api/jobscraper/logs/pipelines-" + str(current_time) + ".log"
    # handler = logging.handlers.WatchedFileHandler(
    # os.environ.get("LOGFILE", logfile))
    # formatter = logging.Formatter(logging.BASIC_FORMAT)
    # handler.setFormatter(formatter)
    # logger = logging.getLogger(__name__)
    # logger.setLevel(os.environ.get("LOGLEVEL", "INFO"))
    # logger.addHandler(handler)

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        ## pull in information from settings.py
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE')
        )

    def open_spider(self, spider):
        ## initializing spider
        ## opening db connection
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        ## clean up when spider is closed
        self.client.close()

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        title = adapter.get('title').lower()
        location = adapter.get('location').lower()
        commitment = adapter.get('commitment').lower()
        description = adapter.get('description').lower()

        if job_meets_requirements(title, location, commitment, description):
            with open('remote_ratios.json') as remote:
                data = json.load(remote)
                data[item['company']]['remote_jobs'] += 1
                data[item['company']]['total_jobs'] += 1
            with open('remote_ratios.json', 'w') as remote:
                json.dump(data, remote)
            self.db[self.collection].insert(dict(item))
            logging.debug("Job added to MongoDB")
            return item
        else:
            with open('remote_ratios.json') as remote:
                data = json.load(remote)
                data[item['company']]['total_jobs'] += 1
            with open('remote_ratios.json', 'w') as remote:
                json.dump(data, remote)
            raise DropItem(f"Job is not remote: {item['apply_url']}")