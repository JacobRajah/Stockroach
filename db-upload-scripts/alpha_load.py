# File for downloading csv files from Alpha Vantage API

# import urllib
# import codecs
# import requests
# import csv
import time
import pandas as pd
# import io
from datetime import datetime
import ssl

# Workaround for https connection to pd.read_csv from Alpha Vantage
ssl._create_default_https_context = ssl._create_unverified_context


def check_ratelimit(current_calls, calls_per_min=5):
    if current_calls == calls_per_min-1:
        time.sleep(61)
        current_calls = 0
    else:
        print(f"No rate limit {current_calls}")
    return current_calls+1


def format_query(company, series_type, series, calc_period=0, output="full"):
    real_url = f'https://www.alphavantage.co/query?function={series}&' \
               f'symbol={company}&apikey=DLB9567IZF09E0UV&datatype=csv&' \
               f'outputsize={output}'
    transformed_url = f'https://www.alphavantage.co/query?function={series}&' \
                      f'symbol={company}&interval=daily&' \
                      f'time_period={calc_period}&series_type=close' \
                      f'&apikey=DLB9567IZF09E0UV&' \
                      f'datatype=csv&outputsize={output}'
    return real_url if series_type == "real" else transformed_url


def query_source(company, series_type, series, current_calls, calc_period=0,
                 output="full", df=None):
    print(output)
    url = format_query(company, series_type, series, calc_period)

    # response = requests.get(url).content
    # temp_df = pd.read_csv(io.StringIO(response.decode('utf-8')))

    temp_df = pd.read_csv(url)

    if calc_period != 0:
        print(f"{series}{calc_period}")
        if len(temp_df['time']) > len(df['time']):
            df['time'] = temp_df['time']
        df[f"{series}_{calc_period}"] = temp_df[f"{series}"]
        print(f"{series}_{calc_period} ", len(df[f'{series}_{calc_period}']),
              len(temp_df[f'{series}']))
    else:
        print(f"{series}")
        if len(temp_df["timestamp"]) > len(df['time']):
            df["time"] = temp_df["timestamp"]
        df["open"] = temp_df["open"]
        df["high"] = temp_df["high"]
        df["low"] = temp_df["low"]
        df["close"] = temp_df["close"]
        df["adjusted_close"] = temp_df["adjusted_close"]
        df["volume"] = temp_df["volume"]
        df["dividend_amount"] = temp_df["dividend_amount"]
        df["split_coefficient"] = temp_df["split_coefficient"]
    current_calls = check_ratelimit(current_calls)
    return current_calls


def df_to_csv(company, df):
    print(f"{company} written to csv")
    df.dropna(inplace=True)
    today = datetime.today().strftime('%Y-%m-%d')
    return df.to_csv(f"data_files/{today}|{company}.csv", index=False)


def alpha_save(companies):
    series_types = {
        "transformed": ["MOM", "EMA", "RSI"],
        "real": ["TIME_SERIES_DAILY_ADJUSTED"]
    }
    calc_periods = [50, 250]
    csv_columns = ["time", "mom_50", "mom_250", "ema_50", "ema_250",
                   "rsi_50", "rsi_250", "open", "high", "low", "close",
                   "adjusted_close", "volume", "dividend_amount",
                   "split_coefficient"]
    current_calls = 0

    update = False

    csv_files = {}

    for company in companies.keys():
        company_df = pd.DataFrame(columns=csv_columns)
        for series_type in series_types:
            indicators = series_types[series_type]
            if series_type == "transformed":
                for indicator in indicators:
                    for calc_period in calc_periods:
                        if not update:
                            current_calls = query_source(company, series_type,
                                                         indicator,
                                                         current_calls,
                                                         calc_period,
                                                         df=company_df)
                        else:
                            current_calls = query_source(company, series_type,
                                                         indicator,
                                                         current_calls,
                                                         calc_period,
                                                         "compact",
                                                         df=company_df)
            else:
                for indicator in indicators:
                    if not update:
                        current_calls = query_source(company, series_type,
                                                     indicator, current_calls,
                                                     df=company_df)
                    else:
                        current_calls = query_source(company, series_type,
                                                     indicator, current_calls,
                                                     0, "compact",
                                                     df=company_df)

        today = datetime.today().strftime('%Y-%m-%d')
        save_path = f"data_files/{today}|{company}"
        df_to_csv(company, company_df)
        csv_files[companies[company]] = save_path   # Table_Name : CSV File Path
    return csv_files
