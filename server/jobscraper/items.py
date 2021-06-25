# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class JobItem(scrapy.Item):
    logo = scrapy.Field()
    company = scrapy.Field()
    title = scrapy.Field()
    location = scrapy.Field()
    multiloc = scrapy.Field()
    commitment = scrapy.Field()
    category = scrapy.Field()
    industry = scrapy.Field()
    remote_score = scrapy.Field()
    _tags = scrapy.Field()
    slug = scrapy.Field()
    apply_url = scrapy.Field()
    date_posted = scrapy.Field()
    unix_timestamp = scrapy.Field()
    expired = scrapy.Field()
    flagged = scrapy.Field()
    description = scrapy.Field()