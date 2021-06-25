import scrapy
import json
from ..helpers import parse_tags, get_company_info, get_date_time, get_unix_timestamp, get_slug, normalize_category
from ..items import JobItem
import logging, os, time
import logging.handlers

class LeverSpider(scrapy.Spider):
    name = "lever"
    start_urls = []
    with open('jobscraper/spiders/lever.txt') as f:
        companies = [eval(x.strip()) for x in f][0]
    
    # set up logfile
    # current_time = int(time.time())
    # logfile = "/home/ubuntu/remotefirst.xyz/remotefirst-api/jobscraper/logs/lever-" + str(current_time) + ".log"
    # handler = logging.handlers.WatchedFileHandler(
    #     os.environ.get("LOGFILE", logfile))
    # formatter = logging.Formatter(logging.BASIC_FORMAT)
    # handler.setFormatter(formatter)
    # logger = logging.getLogger(__name__)
    # logger.setLevel(os.environ.get("LOGLEVEL", "INFO"))
    # logger.addHandler(handler)
    
    def __init__(self):
        for company in self.companies:
            url = 'https://api.lever.co/v0/postings/' + company + '?mode=json'
            self.start_urls.append(url)

    def parse(self, response):
        # get the JSON dump from the API
        jobs = json.loads(response.body)

        # parse through each job
        for job in jobs:
            try:
                item = JobItem()

                # get custom entered data from companies.json
                company = response.request.url.split('/')[5][:-10]
                company_info = get_company_info(company)

                # construct full description from parts
                partial_description = job['description']
                additional = job['additional']
                description_lists = ''
                for desc_list in job['lists']:
                    description_lists += '<div><h3>' + desc_list['text'] + '</h3><ul>' + desc_list['content'] + '</ul></div>'
                full_description = partial_description + description_lists + additional

                if 'location' in job['categories']:
                    location = job['categories']['location'].strip()
                else:
                    location = 'Remote'

                item['logo'] = company_info['logo']
                item['company'] = company_info['name']
                item['title'] = job['text'].strip()
                item['location'] = location
                item['multiloc'] = []
                item['commitment'] = job['categories']['commitment'].strip()
                item['category'] = normalize_category(job['categories']['team'].strip())
                item['industry'] = company_info['industry']
                item['remote_score'] = 0
                item['_tags'] = parse_tags(full_description)
                item['slug'] = get_slug([company_info['name'], job['text'].strip()])
                item['apply_url'] = job['hostedUrl']
                item['date_posted'] = get_date_time('lever', job['createdAt'])
                item['unix_timestamp'] = job['createdAt']
                item['expired'] = False
                item['flagged'] = False
                item['description'] = full_description

                yield item

            except Exception:
                logging.exception(f"Exception raised for {company}")