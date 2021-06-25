import json, sys

######################################
#
# expecting arguments of the form:
# 'Company Name' 'source' 'companyid' 'industry' 'logo'
#
# Example use:
# python add_new_company.py 'Abarca Health' 'greenhouse' 'abarca' 'Healthtech' 'https://ik.imagekit.io/pxw4sffgk4l/abarca_health_logo_pzYuNVwuu4.png'
#
######################################

arguments = sys.argv[1:]

args = {
    "name": arguments[0],
    "source": arguments[1],
    "_id": arguments[2],
    "industry": arguments[3],
    "logo": arguments[4]
    }

with open('remote_ratios_template.json', 'r+') as f:
    remote_ratios = json.load(f)
    f.seek(0)
    remote_ratios[args['name']] = {
                            "remote_jobs": 0,
                            "total_jobs": 0
                        }
    json.dump(dict(sorted(remote_ratios.items())), f)
    f.truncate()

with open('jobscraper/spiders/' + args['source'] + '.txt', 'r+') as f:
    company_ids = [eval(x.strip()) for x in f]
    f.seek(0)
    company_ids[0].append(args['_id'])
    f.write(str(sorted(company_ids[0])))
    f.truncate()

with open('companies.json', 'r+') as f:
    companies = json.load(f)
    f.seek(0)
    companies[args['_id']] = {
        "name": args['name'],
        "industry": args['industry'],
        "logo": args['logo']
    }
    json.dump(dict(sorted(companies.items())), f)
    f.truncate()