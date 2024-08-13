---
lang: en-US
title: Release procedure
description: How to gather analytics data from SODA for SPARC 
head:
  - - meta
    - name: 'og:image'
      content: 'https://kalai.fairdataihub.org/api/generate?app=soda-for-sparc&title=Release%20%7C%20SODA%20for%20SPARC&org=fairdataihub&description=How%20to%20release%20SODA%20for%20SPARC%20to%20the%20public'
---


# Prerequisites

- Access to the Analytics database from the Project or Team Lead.
- Access to the Kombucha Analytics Reporting repository from the Project or Team Lead
- Request access to the Excel file that will store the results of the queries from the Project or Team Lead. 

# Overview

The SODA team is required to gather usage statistics per the NIH's request and share the resuls in bi-monthly reports. For information on what we gather and the privacy policy please see the SODA repository README.md. 

Relevant usage statistics for the bi-monthly reports are:
- Number of users / month
- New Users / month
- Number of app launches / month 
- Number of files uploaded / month
- Size of file uploads / month 
- Datasets published on Sparc.Science that were touched by SODA / month 

# Procedure 

1. A SODA team member will request access to the Analytics database and gather its connection and authentication information. 
2. The SODA team member will visit the Kombuch Reporting repository and clone it to their local machine.
3. The SODA team member will setup their environment per the env.yaml file in the reposoitory
4. The SODA team member will run this command in the cli 'jupyter notebook' to open the analytics notebook that has the reporting queries. 
5. Set the dates for the queries to the desired range. Most often this will be one month at a time. 
6. Run the queries and store the results in the Excel file that was requested access to in the prerequisites.



