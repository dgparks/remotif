import pymongo
from datetime import datetime

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['jobscraper']
newly_scraped = db['newly_scraped']

def main():
    start = datetime.now()

    duplicates = list(newly_scraped.aggregate([
        {"$group" : { "_id": ["$title", "$company"], "count": { "$sum": 1 } } },
        {"$match": {"count" : {"$gt": 1} } }, 
        {"$sort": {"count" : -1} },
        {"$project": {"title_company" : "$_id", "count": "$count", "_id" : 0} }     
    ]))

    for d in duplicates:
        # get a sorted list of ids matching the duplicate set (d)
        # title_company is a list of the form [title, company]
        ids = get_ids(d['title_company'][0], d['title_company'][1])
        canonical_id = ids.pop()

        # get urls and locations and add list of dicts to canonical job
        multiloc = get_urls_locations(ids, canonical_id)

        # trim location data from Circle jobs (temp fix)
        for m in multiloc:
            n = m['location'].find('- will also consider') if m['location'].find('- will also consider') > 0 else len(m['location'])
            m['location'] = m['location'][:n].strip()
        
        newly_scraped.update_one({
            '_id': canonical_id
        }, {
            '$set': {
                'location': 'Remote (Multiple Locations)',
                'multiloc': multiloc
            }
        }, upsert=False)

        # delete duplicate jobs from database
        for _id in ids:
            newly_scraped.delete_one({'_id': _id})

    end = datetime.now()
    print('collapse_multiples took ' + str(end-start) + ' to finish.')

# get list of ids for each unique intersection between a title and company name
# return the list sorted so that we don't see arbitrary "expired" listings once a
# potentially different canonical_id is popped the next day
def get_ids(title, company):
	return sorted([job['_id'] for job in newly_scraped.find({"title": title, "company": company})])

def get_urls_locations(_ids, canonical_id):
    urls_locations = []
    for _id in _ids + [canonical_id]:
        job = newly_scraped.find_one({'_id': _id})
        urls_locations.append({'apply_url': job['apply_url'], 'location': job['location']})
    return sorted(urls_locations, key = lambda i: i['location'])

# find the longest common substring in a list of strings
def longest_common_substring(list_of_strings):
    # Determine size of the array
    n = len(list_of_strings)
    # Take first string from array as reference
    s = list_of_strings[0]
    l = len(s)
    result = ""
    for i in range(l):
        for j in range(i + 1, l + 1):
            # generating all possible substrings
            # of our reference string list_of_strings[0] i.e s
            substring = s[i:j]
            k = 1
            for k in range(1, n):
                # Check if the generated substring is
                # common to all strings
                if substring not in list_of_strings[k]:
                    break
            # If current substring is present in
            # all strings and its length is greater
            # than current result
            if (k + 1 == n and len(result) < len(substring)):
                result = substring
    return result

if __name__ == "__main__":
    main()