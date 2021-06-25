import scrapy
import json
from ..helpers import parse_tags, get_company_info, get_date_time, get_unix_timestamp, get_slug, normalize_category
from ..items import JobItem
import logging, os, time
import logging.handlers

class GreenhouseSpider(scrapy.Spider):
    name = "greenhouse"
    start_urls = []
    with open('jobscraper/spiders/greenhouse.txt') as f:
        companies = [eval(x.strip()) for x in f][0]
    
    # set up logfile
    # current_time = int(time.time())
    # logfile = "/home/ubuntu/remotefirst.xyz/remotefirst-api/jobscraper/logs/greenhouse-" + str(current_time) + ".log"
    # handler = logging.handlers.WatchedFileHandler(
    # os.environ.get("LOGFILE", logfile))
    # formatter = logging.Formatter(logging.BASIC_FORMAT)
    # handler.setFormatter(formatter)
    # logger = logging.getLogger(__name__)
    # logger.setLevel(os.environ.get("LOGLEVEL", "INFO"))
    # logger.addHandler(handler)

    def __init__(self):
        for company in self.companies:
            url = 'https://boards-api.greenhouse.io/v1/boards/' + company + '/jobs?content=true'
            self.start_urls.append(url)

    def parse(self, response):
        # get the JSON dump from the API
        jobs = json.loads(response.body)

        # parse through each job
        for job in jobs['jobs']:
            try:
                item = JobItem()

                # get custom entered data from companies.json
                company = response.request.url.split('/')[5]
                company_info = get_company_info(company)
                category = ''

                # handle wonky Affirm departments
                if company == 'affirm':
                    category = job['metadata'][0]['value']
                elif job['departments'] == []:
                    category = 'Unknown'
                else:
                    category = job['departments'][0]['name']

                item['logo'] = company_info['logo']
                item['company'] = company_info['name']
                item['title'] = job['title'].strip()
                item['location'] = job['location']['name'].strip()
                item['multiloc'] = []
                item['commitment'] = ''
                item['category'] = normalize_category(category.strip())
                item['industry'] = company_info['industry']
                item['remote_score'] = 0
                item['_tags'] = parse_tags(job['content'])
                item['slug'] = get_slug([company_info['name'], job['title'].strip()])
                item['apply_url'] = job['absolute_url']
                item['date_posted'] = get_date_time('greenhouse', job['updated_at'])
                item['unix_timestamp'] = get_unix_timestamp(job['updated_at'])
                item['expired'] = False
                item['flagged'] = False
                item['description'] = job['content']

                yield item
            
            except Exception:
                logging.exception(f"Exception raised for {company}")