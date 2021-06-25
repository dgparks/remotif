import json, random, ciso8601, time, pytz, re, secrets
from dateutil.parser import parse
from datetime import datetime

def parse_tags(text):
    allowed_tags = ['absinthe', 'airflow', 'alpinejs', 'android', 'angular', 'angularjs', 'apigee', 'apollo', 'aurora', 'aws', 'babel', 'backend', 'bazel', 'blockchain', 'c', 'c++', 'c#', 'celery', 'chef', 'circleci', 'citusdb', 'clojure', 'cloudformation', 'css', 'cucumber', 'data science', 'devops', 'django', 'docker', 'dropwizard', 'elasticsearch', 'elixir', 'ember', 'emberjs' 'entry-level', 'evm', 'excel', 'expressjs', 'fauna', 'figma', 'firebase', 'flask', 'frontend', 'fullstack', 'gatsby', 'gatsbyjs', 'gcp', 'gis', 'git', 'github', 'golang', 'graphql', 'grpc', 'grunt', 'gulp', 'hadoop', 'hbase', 'heroku', 'http', 'html', 'immutable', 'immutablejs', 'ios', 'jasmine', 'java', 'javascript', 'jest', 'jquery', 'js', 'julia', 'jupyter', 'k8s', 'kafka', 'karma', 'kong', 'kotlin', 'kubernetes', 'laravel', 'latex', 'less.js', 'linux', 'luigi', 'machine learning', 'microservices', 'mobx', 'mocha', 'mongodb', 'mysql', '.net', 'nextjs', 'nginx', 'nlp', 'node', 'nodejs', 'nosql', 'npm', 'nuclearjs', 'objective-c', 'openapi', 'open source', 'oss', 'pandas', 'phoenix', 'php', 'postgis', 'postgres', 'postgresql', 'postman', 'python', 'rabbitmq', 'rails', 'react', 'react native', 'reactivecocoa', 'reactjs', 'reactnative', 'redshift', 'redwood', 'redwoodjs', 'redux', 'relayjs', 'rollup', 'rpc', 'rspec', 'ror', 'ruby', 'ruby on rails', 'rust', 'rxjs', 'rxswift', 'salesforce', 'sass', 'scala', 'senior', 'seo', 'shell', 'shopify', 'sketch', 'slate', 'solidity', 'solr', 'spark', 'sql', 'sre', 'startup', 'svelte', 'swagger', 'swift', 'sysadmin', 'tailwind', 'telemetry', 'terraform', 'typescript', 'vue', 'vuejs', 'webpack', 'websockets', 'wordpress', 'wp rocket', 'zendesk', 'zookeeper']
    text = text.lower().replace('\n', ' ').replace(',', ' ').replace('.', ' ')
    tags = []
    for t in allowed_tags:
        sel = " " + t + " "
        if sel in text:
            tags.append(t)
    return tags

def get_company_info(company):
    # open the file we use to insert custom properties into the listing
    # company name, url to company logo, industry, remote-first / remote-friendly
    with open('companies.json') as json_companies:
        company_info = (json.load(json_companies))
    return company_info[company]

def get_random_salary():
    start = round(random.randint(70000, 120000) / 1000)
    end = round(random.randint(10000, 30000) / 1000) + start
    return '$' + str(start) + 'k - $' + str(end) + 'k'

def get_date_time(source, date_str):
    if source == 'greenhouse':
        date_time = parse(date_str)
        return date_time.strftime("%b %-d, %Y")
    else:
        return (datetime.fromtimestamp(date_str/1000, pytz.timezone("America/New_York")).strftime("%b %-d, %Y"))

def get_unix_timestamp(date_str):
    unix_timestamp = ciso8601.parse_datetime(date_str)
    return round(time.mktime(unix_timestamp.timetuple())*1000)

def is_remote(title, location, commitment, description):
    return any('remote' in s for s in [title, location, commitment, description]) or any('anywhere' in s for s in [title, location]) or any('home based' in s for s in [title, location]) or ('distributed' in location)

def is_not_internship(title):
    # we want to keep jobs with titles that include 'internal tools' or 'international', etc.
    # but reject jobs that otherwise include 'intern' or 'internship'
    return (('interna' in title or 'intern' not in title) and 'co-op' not in title)

def is_not_general_app(title):
    return ('?' not in title and 'dream job' not in title and 'general application' not in title)

def job_meets_requirements(title, location, commitment, description):
    return is_remote(title, location, commitment, description) and is_not_internship(title) and is_not_general_app(title)

def remove_non_alphanumeric_chars(from_string):
    pattern = re.compile('[\W_]+', re.UNICODE)
    return pattern.sub(' ', from_string)

def get_slug(from_list_of_strings):
    token_hex = '-' + secrets.token_hex(2)
    if type(from_list_of_strings) == str:
        return remove_non_alphanumeric_chars(from_list_of_strings).strip().replace(' ', '-').lower() + token_hex
    elif type(from_list_of_strings) == list:
        return remove_non_alphanumeric_chars(' '.join(from_list_of_strings)).strip().replace(' ', '-').lower() + token_hex
    else:
        return False

def normalize_category(category):
    with open ('job_categories.json') as f:
        cats = json.load(f)
    result = []
    for cat in cats:
        if category in cats[cat]:
            result.append(cat)
    if not result:
        result.append('Other')
        cats['Other'].append(category)
        with open ('job_categories.json', 'w') as f:
            json.dump(cats, f)
    return result

#
#
# The below functions are deprecated (no current use case)
#
#

flattened_list = []

def flatten(nested_list):
    for i in nested_list:
        if type(i) == list:
            flatten(i)
        elif type(i) == dict and i.get(id) == None:
            list_of_dicts = dict_of_dicts_to_list_of_dicts(i)
            for d in list_of_dicts:
                flattened_list.append(d)
        else:
            flattened_list.append(i)
    return flattened_list

def dict_of_dicts_to_list_of_dicts(dict_of_dicts):
    return [value for value in dict_of_dicts.values()]