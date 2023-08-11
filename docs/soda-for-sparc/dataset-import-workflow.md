---
lang: en-US
title: Function flowcharts
description: Understanding the import Pennsieve dataset function in SODA for SPARC
---

# Overview

The page outlines how the import function works for Pennsieve datasets. It describes the backend process of using the Pennsieve API to fetch a dataset and import it into SODA for SPARC.

## Import Pennsieve dataset

The import Pennsieve dataset function is the process of importing a Pennsieve dataset into SODA for SPARC. The process is initiated by the client. The client sends
request to the server to import. The server then goes through a series of steps to place all files/folders in the SODA JSON Structure.

```mermaid
graph TB
  subgraph main["import_pennsieve-dataset()"]
    direction TB
    A[[Get access token]] .-> B[[Get dataset name from JSON structure]]
    B .-> C[[Check if user has editing permissions]]
    C .-> D[[Get dataset ID from Pennsieve]]
    D .-> E[[Get amount of folders/files that need to be imported]]
    E .-> F[[Iterate through the root folder and organize metadata files + high level folders]]
    F .-> G[[Iterate through the high level folders to find manifest files]]
    G .-> H[[If manifest file is found, create a dataframe from the manifest file and convert to dictionary]]

    subgraph recursive["createFolderStructure()"]
      direction TB
      I[[Requests files/folders of current folder from Pennsieve]] --> J[[If files/folders are found, begin iterating through them and apply information to the SODA JSON structure]]
      J --> K[[Apply manifest file information to the SODA JSON structure]]
      K --> L[[Recusively iterate through each folder]]
    end

    H --> recursive
  end

```
