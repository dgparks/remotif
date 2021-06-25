import json

with open ('jobs.json') as f:
    jobs = json.load(f)

for job in jobs:
    del job['description']

with open ('jobs_nodesc.json', 'w') as f:
    json.dump(jobs, f)