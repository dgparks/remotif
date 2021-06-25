import pymongo, requests, json
from datetime import datetime
from datetime import timedelta

# initiate the pymongo client
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['jobscraper']
jobs = db['jobs']
newly_scraped = db['newly_scraped']

def main():
    start = datetime.now()
    start_expired = jobs.count_documents({'expired': {'$ne': False}})

    # Step 1
    check_expirations()

    # Step 2
    # update jobs and return a list of new jobs 
    # to be sent to listserv via mailgun
    new_job_ids = update_jobs()

    # Step 3
    send_emails(new_job_ids)

    end = datetime.now()
    end_expired = jobs.count_documents({'expired': {'$ne': False}})

    print('update_jobs took ' + str(end-start) + ' to finish.')
    print(str(end_expired-start_expired) + ' jobs expired and ' + str(len(new_job_ids)) + ' new jobs were added.')

# update 'jobs' with new versions from 'newly_scraped'
# or insert new job if no match exists
def update_jobs():
    new_job_ids = []
    for job in newly_scraped.find():
        # preserve the ObjectID and slug of old record, if it exists
        old_job = jobs.find_one({'title': job['title'], 'company': job['company']})
        if old_job:
            job['_id'] = old_job['_id']
            job['slug'] = old_job['slug']
            job['apply_url'] = old_job['apply_url']
            job['expired'] = old_job['expired']
            job['date_posted'] = old_job['date_posted']
            job['unix_timestamp'] = old_job['unix_timestamp']
        else:
            new_job_ids.append(job['_id'])

        # update job record in db.jobs
        jobs.find_one_and_replace({
            'title': job['title'],
            'company': job['company']
        }, job, upsert=True)

    add_remote_scores()

    return new_job_ids

# set all newly expired jobs to expired = 'date.yesterday()'
def check_expirations():
    for job in jobs.find({'expired': False}):
        if job_expired(job):
            set_expired(job)

# check to see if the job from 'jobs' is still active (is in 'newly_scraped')
# if not, the job is expired
def job_expired(job):
    still_active = newly_scraped.find_one({'title': job['title'], 'company': job['company']})
    if not still_active and not already_matching_active_apply_url(job):
        return True
    else:
        return False

# check to see if the job from 'jobs' is matching an apply_url in any
# of the recently collapsed 'multiloc' fields
def already_matching_active_apply_url(job):
    jobs_in_company = list(newly_scraped.find({'company': job['company']}))
    apply_urls = []
    for _job in jobs_in_company:
        apply_urls += [_job['apply_url']]
        apply_urls += _job['multiloc']
    if job['apply_url'] in apply_urls:
        return True
    else:
        return False

# TODO
def flag_urls_with_status_200(job):
    response = request.get(job['apply_url'])
    if not job['description'] in response.text:
        jobs.update_one({
            '_id': job['_id']
        }, {
            '$set': {
                'flagged': True
            }
        }, upsert=False)
    return

# change the 'expired' field of a job to 'date.yesterday()'
def set_expired(job):
    jobs.update_one({
        'title': job['title'], 
        'company': job['company']
    }, {
        '$set': {
            'expired': (datetime.now()-timedelta(days=1)).strftime('%b %-d, %Y')
        }
    }, upsert=False)

# send email containing recently added job postings
def send_emails(_ids):
    if _ids:
        email_body = generate_email_body(_ids)
        send_new_jobs_email(email_body)

def generate_email_body(job_ids):

    all_jobs_section = ''

    for _id in job_ids:
        job = jobs.find_one({'_id': _id})
        title = job['title']
        company = job['company']
        logo = job['logo']
        slug = job['slug']
        location = job['location']
        job_section = '''<div class="card"><div><img src="''' + logo + '''" height="50px" width="50px" alt="logo"></img></div><div class="right-of-logo"><a href="https://remotif.io/jobs/''' + slug + '''" title="''' + title + '''">''' + title + '''</a></span><br> <span class="company-text">''' + company + '''</span> </div> </div>'''
        all_jobs_section += job_section

    return '''<html> <head> <style> a { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; color: #3c4fe0; font-weight: 500; text-decoration: underline; } body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; } .container { /* margin-left: 48px; margin-top: 12px; margin-bottom: 12px; */ margin: 12px auto 12px auto; width: 400px; color: #23263b; font-weight: 500; } .header { margin: auto; width: fit-content; } .card-container { margin: 12px auto 12px auto; width: fit-content; border: 1px solid #23263b; padding: 24px 24px 12px 24px; } .card { display: flex; margin-bottom: 12px; width: 400px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } .right-of-logo { height: 50px; margin-top: 3px; margin-left: 12px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } .company-text { color: #23263b; font-weight: 500; opacity: 0.9; } .unsubscribe { margin: auto auto 24px auto; width: fit-content; font-size: smaller; } .unsubscribe a { color: #23263b; font-weight: 400; } </style> </head> <body> <div class="container"><div class="header">🔥 ''' + str(len(job_ids)) + ''' hot new jobs posted today on <a href="https://remotif.io" style="color: #23263b;">remotif.io</a> 🔥</div></div> <div class="card-container">''' + all_jobs_section + '''</div> </div> <div class="unsubscribe">Click here to <a href="https://remotif.io/unsubscribe">unsubscribe</a>.</div> </body> </html>'''

def send_new_jobs_email(email_body):
    return requests.post(
        MAILGUN_BASE_URL,
        auth=("api", MAILGUN_API_KEY),
        data={"from": "Remotif Daily <daily@remotif.io>",
            "to": ["daily@mg.remotif.io"],
            "subject": "Today's Job Postings — Remotif.io",
            "html": email_body})

def add_remote_scores():
    with open('remote_ratios.json') as f:
        remote_ratios = json.load(f)
    
    for company in remote_ratios:
        remote = remote_ratios[company]['remote_jobs']
        total = remote_ratios[company]['total_jobs']
        company_job_ids = [job['_id'] for job in jobs.find({"company": company})]
        if total > 0:
            remote_score = int(round(remote/total*100, 0))
        else:
            remote_score = 0
        for _id in company_job_ids:
            jobs.update_one({
                '_id': _id
            }, {
                '$set': {
                    'remote_score': remote_score
                }
            }, upsert=False)

if __name__ == "__main__":
    main()