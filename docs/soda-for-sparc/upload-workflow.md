---
lang: en-US
title: Function flowcharts
description: Understanding major functions in SODA for SPARC
---

# Overview

This page outlines the major functions in SODA for SPARC. It describes the upload and import processes. It also describes the process of creating a new dataset and uploading data to it. To aid in understanding key concepts links to the flask_restx documentation are included.

## Main upload process

The main upload process goes through a series of checks to ensure that the upload process will be successful. When uploading to Pennsieve a valid Pennsieve dataset and account is needed to begin. Local files/folders that will be uploaded are also validated
to ensure the paths are correct.
The process is initiated by the client. The client sends a request to the SODA server to upload data to a Pennsieve dataset.
The upload process is the process of uploading data to a Pennsieve dataset. The process is initiated by the client. The client sends a request to the server to upload data to a Pennsieve dataset. The server then sends a request to the Pennsieve Agent to
upload the data. The Agent then uploads the data to the Pennsieve dataset. The server then sends a request to the Pennsieve service to import the data. The Pennsieve service then imports the data into the Pennsieve dataset.

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

## Generate Dataset Locally

When generating datasets locally, the server will gather all files/folders and create them in the SDS 2.0 format. The server will then create a dataset on the user's local machine.

```mermaid
graph LR

subgraph localgen["generate_dataset_locally()"]
    direction TB
    A[[Create new folder for dataset or use existing folder if 'merge existing' is selected]]
    A .-> B[[Scan the dataset structure and create all folders with new name if renamed]]
    B .-> C[[Compile a list of files to be copied and a list of files to be moved with new name recorded if renamed]]
    C .-> D[[Add high-level metadata files in the list]]
    D .-> E[[Add manifest files in the list]]
    E .-> F[[Add manifest files in the list]]
    F .-> G[[Move files into new location]]
    G .-> H[[Copy files into new location and track amount of copied files for loggin purposes]]
    H .-> I[[Delete manifest folder and original folder if merge requested and rename new folder]]
end


```

## Generate New Dataset To Pennsieve

When generating new datasets to Pennsieve there are less pre-checks than when uploading to an existing dataset. The server will still check if the Pennsieve account and dataset are valid. The server will then recursively create the folders on Pennsieve before
uploading to files to the dataset. The server will then make a list of the files that will be uploaded to Pennsieve and send it to the Pennsieve Agent. The Agent will create a manifest of all the files that will be uploaded to Pennsieve. We add a subscriber to
the upload process to track the progress of the upload.

```mermaid
graph LR

subgraph newgen["ps_upload_to_dataset()"]
    direction TB
    A[[Scan the dataset structure to create all non-existen folders on Pennsieve]] .-> B[[Create a tracking dictionary which would track the generation of the dataset on Pennsieve]]
    B .-> C[[Scan the dataset structure and compile a list of files to be upload along with desired renaming]]
    C .-> D[[Add high level metadata files to a list]]
    D .-> E[[Add manifest files to a list]]
    E .-> F[[Using the Pennsieve agent, upload the files to Pennsieve]]
    F .-> G[[Upload the Metadata files]]
    G .-> H[[Upload the manifest files]]
end
```

## Generate Dataset To Existing Pennsieve Dataset

When generating datasets to an existing Pennsieve dataset there are more pre-checks than when uploading to a new Pennsieve dataset. The server will still check if the Pennsieve account and dataset are valid. The server will then recursively create the folders on Pennsieve before

```mermaid
graph LR

subgraph existinggen["ps_update_existing_dataset()"]
    direction TB
    A[[Remove all existing files on Pennsieve that user deleted]] .-> B[[Append '-DELETED' to any folders marked as deleted]]
    B .-> C[[Rename any folder done by the user]]
    C .-> D[[Get the status of all files currently on Pennsieve and create the folder path for all items in dataset structure]]
    D .-> E[[Move any files that are marked as moved on Pennsieve]]
    E .-> F[[Rename any Pennsieve files that are marks as 'renamed']]
    F .-> G[[Delete any Pennsieve folders that are marked as 'deleted']]
    G .-> H[[Delete any metadata files that are marked as 'deleted']]
    H .-> I[[Run the original code to upload any new files to Pennsieve dataset]]
    I --> J(ps_upload_to_dataset)
end
```
