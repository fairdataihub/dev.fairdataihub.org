---
lang: en-US
title: Function flowcharts
description: Understanding major functions in SODA for SPARC
---

# Overview

This page outlines the major functions in SODA for SPARC. It describes the upload and import processes. It also describes the process of creating a new dataset and uploading data to it. To aid in understanding key concepts links to the flask_restx documentation are included.

## Upload Process

The upload process is the process of uploading data to a Pennsieve dataset. The process is initiated by the client. The client sends a request to the server to upload data to a Pennsieve dataset. The server then sends a request to the Pennsieve Agent to upload the data. The Agent then uploads the data to the Pennsieve dataset. The server then sends a request to the Pennsieve service to import the data. The Pennsieve service then imports the data into the Pennsieve dataset.

```mermaid
graph LR
A[SODA-for-SPARC] -- Upload Request --> B[(SODA Server)]

subgraph main["main_curate_function()"]
    direction TB
    subgraph prechecks["Checking for potential errors"]
        direction TB
        C[[If local dataset, ensure destination is valid]] .-> D[[Verify Pennsieve dataset is valid]]
        D .-> E[[Verify Pennsieve account is valid]]
        E .-> F[[Ensure locally selected files paths are valid and are over 0KB]]
        F .-> G[[If uploading to an existing dataset on Pennsieve check if files/folder are valid on Pennsieve]]
    end
    subgraph localgen[" "]
        direction LR
        I(generate_dataset_locally)
    end
    subgraph newgen[" "]
        direction LR
        K(generate_dataset_locally)
    end
    prechecks -- Generate Locally --> localgen
    prechecks -- Generate New Pennsieve Dataset --> newgen
end

B --> main
```
