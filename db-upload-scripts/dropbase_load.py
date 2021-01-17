import requests
import json
import time


def generate_presigned_url(db_pipe_token):
    """Calls dropbase REST API to generate a URL to upload CSV file to"""
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
    """Calls dropbase REST API to generate a URL to upload CSV file to"""

    # payload="@/C:/Users/zhaya/Desktop/gistfile1.txt"
    headers = {
        'Content-Type': 'text/plain'
    }
    with open(file_path, 'rb') as data:
        # requests.put(url, data=data)
        response = requests.put(upload_url, data=data)
    if response.status_code != 200:
        # Unsuccessful
        return {
            "success": False,
            "error": response
        }
    return {"success": True}


def wait_to_finish_upload(job_id):
    url = "https://api2.dropbase.io/v1/pipeline/run_pipeline"

    payload = "{\n    \"job_id\":\"" + job_id + "\"\n}"
    headers = {
        'Content-Type': 'application/json'
    }
    print("Sending check wait response")
    response = requests.request("GET", url, headers=headers, data=payload)
    print(response.text)
    if response.status_code == 200:
        # Job Finished
        return True
    elif response.status_code == 202:
        # Job In Progress
        time.sleep(30)
        return wait_to_finish_upload(job_id)
    else:
        print(f"Error waiting for job to finish: {job_id}")
        return False


def dropbase_upload(file_paths):
    """
    Uploads CSV data to dropbase database using their Beta REST API
    :param file_paths:
    :return:
    """
    for file in file_paths.keys():
        print("Generating Presigned URL")
        presign_url = generate_presigned_url(file_paths[file])
        print("PURL: ", presign_url)
        print("")
        if presign_url and presign_url['success']:
            print("Uploading File:", file)
            upload_success = upload_file(presign_url['upload_url'], file)
            print("Uploaded", upload_success)
            if not upload_success or upload_success['success']:
                print(f"Failed uploaded: {file}")
            print("Waiting")
            time.sleep(5)
            wait_to_finish_upload(presign_url['job_id'])
            print("Finished Waiting")
