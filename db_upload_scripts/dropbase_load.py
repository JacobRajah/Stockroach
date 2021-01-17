# File for uploading csv files to Dropbase using their API

import requests
import json
import time


def generate_presigned_url(db_pipe_token):
    """
    Calls dropbase REST API to generate a URL to upload CSV file to

    @param db_pipe_token: Dropbase Pipeline Token
    @return: Dictionary of success, return_url, job_id
    """
    url = "https://api2.dropbase.io/v1/pipeline/generate_presigned_url"

    payload = "{\n    \"token\": \"" + db_pipe_token + "\"\n}"
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    if response.status_code == 200:
        # Successful URL generation
        resp = json.loads(response.text)
        if resp and "upload_url" in resp and "job_id" in resp:
            resp['success'] = True
        else:
            resp['success'] = False
        return resp
    else:
        # Unsuccessful
        return {
            "success": False,
            "error": response.text
        }


def upload_file(upload_url, file_path):
    """
    Calls dropbase REST API to generate a URL to upload CSV file to

    @param upload_url: URL to send the csv data to
    @param file_path: path the CSV file
    @return: dictionary of success or error response
    """

    with open(file_path, 'rb') as data:
        response = requests.put(upload_url, data=data)

    if response.status_code != 200:
        return {
            "success": False,
            "error": response
        }
    return {"success": True}


def wait_to_finish_upload(job_id):
    """
    Waits for file to finish uploading and processing on Dropbase
    Sleeps for given time before rechecking
    """
    url = "https://api2.dropbase.io/v1/pipeline/run_pipeline"

    payload = "{\n    \"job_id\":\"" + job_id + "\"\n}"
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    if response.status_code == 200:
        # Job Finished
        return True
    elif response.status_code == 202:
        # Job In Progress, try again in 15 seconds
        time.sleep(15)
        return wait_to_finish_upload(job_id)
    else:
        # Error
        print(f"Error waiting for job to finish: {job_id}")
        return False


def dropbase_upload(file_paths):
    """
    Uploads CSV data to dropbase database using their Beta REST API

    :param file_paths: Dictionary {paths to CSV files : Pipeline tokens}
    :return: None
    """
    for file in file_paths.keys():

        pre_sign = generate_presigned_url(file_paths[file])

        if pre_sign and pre_sign['success']:
            upload_success = upload_file(pre_sign['upload_url'], file)

            if not upload_success or not upload_success['success']:
                print(f"Failed uploading: {file}")
            else:
                time.sleep(5)   # Sleep  to ensure job_id processed on Dropbase
                wait_to_finish_upload(pre_sign['job_id'])
