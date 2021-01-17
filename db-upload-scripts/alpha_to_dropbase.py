from alpha_load import *
from dropbase_load import *


def save_and_upload():
    """
    Saves CSV files from Alpha Vantage API and uploads to Dropbase Postgres DB
    using Dropbase Beta API
    :return: None
    """
    # companies_to_db_table = {
    #     "AMD": "amd_real",
    #     "AMZN": "amzn",
    #     "FB": "fb_real",
    #     "GOOGL": "googl",
    #     "MSFT": "msft_real",
    #     "NFLX": 'nflx',
    #     "NVDA": "nvda"
    # }

    # csv_paths = alpha_save(companies_to_db_table)
    # dropbase_upload(csv_paths)

    # Test
    companies_to_pipelines = {
        # "data_files/MSFT.csv": "6eYgtcf6GGS9QxLwjhzbEB",
        # "data_files/GOOGL.csv": "JnUkAhx5tvbsEMPQhpgLTu",
        # "data_files/NVDA.csv": "kPpVjuwzP3ae5g9ga8hqpA",
        # "data_files/AMD.csv": "invAmX7oDb3uU7HuKMvw5a",
        # "data_files/NFLX.csv": "FnTTGZnu3P4WR8ep7a6CWr",
        # "data_files/FB.csv": "enjHFWLJ7SeGP4dczawBbu",
        # "data_files/AMZN.csv": "ccFB48QYEaKZZfC8cTS5fe"
    }
    dropbase_upload(companies_to_pipelines)

    # csv_paths = alpha_save(companies_to_pipelines)
    print("DONE")


if __name__ == "__main__":
    save_and_upload()
