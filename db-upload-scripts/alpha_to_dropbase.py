# Main Python script
# Saves CSV files for given stocks using Alpha Vantage API
# Uploads saved files to Dropbase DB using their beta REST API

from alpha_load import *
from dropbase_load import *

# Reference
# Company Ticker Symbol : Dropbase Table Name
companies_to_db_table = {
    "AMD": "amd_real",
    "AMZN": "amzn",
    "FB": "fb_real",
    "GOOGL": "googl",
    "MSFT": "msft_real",
    "NFLX": 'nflx',
    "NVDA": "nvda"
}


def save_and_upload():
    """
    Saves CSV files from Alpha Vantage API and uploads to Dropbase Postgres DB
    using Dropbase Beta REST API
    :return: None
    """

    # With ticker symbols keys, uses AlphaVantage API to create csv data files
    # With pipeline values: uses Dropbase API to upload data files to DB
    companies_to_pipelines = {
        "AMD": "invAmX7oDb3uU7HuKMvw5a",
        "AMZN": "ccFB48QYEaKZZfC8cTS5fe",
        "FB": "enjHFWLJ7SeGP4dczawBbu",
        "GOOGL": "JnUkAhx5tvbsEMPQhpgLTu",
        "MSFT": "6eYgtcf6GGS9QxLwjhzbEB",
        "NFLX": "FnTTGZnu3P4WR8ep7a6CWr",
        "NVDA": "kPpVjuwzP3ae5g9ga8hqpA",
    }
    csv_paths = alpha_save(companies_to_pipelines)
    dropbase_upload(csv_paths)

    # Tests

    # Test File Download from AlphaVantage
    # down_test = {
    #     "AMZN": "ccFB48QYEaKZZfC8cTS5fe"
    # }
    # alpha_save(down_test)

    # Test File Upload to Dropbase
    # up_test = {
    #     "/sample_data_files/AMZN.csv": "ccFB48QYEaKZZfC8cTS5fe",
    # }
    # dropbase_upload(up_test)


if __name__ == "__main__":
    save_and_upload()
