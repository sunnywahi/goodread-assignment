import pandas as pd
import math
from setup_logger import logger

columns = ['id', 'title', 'author', 'rating_count', 'average_rating', 'five_star_ratings', 'number_of_pages',
           'date_published', 'publisher', 'amazon_redirect_link', 'description']


class BooksData:
    def __init__(self, books_csv_zip):
        self.books_csv_url = books_csv_zip
        self.data = pd.read_csv(books_csv_zip, compression='zip', usecols=columns)
        self.data = self.data.dropna()
        self.data = self.data.sort_values(by='id', ascending=0)
        self.total = len(self.data.index)
        logger.info('total record size is %i', self.total)

    def load_data(self, page, per_page):
        logger.info('Loading book data starting for page %s and showing %s records per page', page, per_page)
        total_pages = math.ceil(self.total / per_page)
        logger.info('total pages are %i', total_pages)
        start_index = page * per_page
        to_index = ((page + 1) * per_page)
        logger.info('loading records from index %i to %i', start_index, to_index)
        new_df = self.data.iloc[start_index:to_index].to_dict(orient='records')
        records = {
            'page': page,
            'per_page': per_page,
            'total': self.total,
            'total_pages': total_pages,
            'data': new_df
        }
        return records

    def load_books_with_criteria(self, page, per_page, title):
        logger.info('Loading book data starting with title %s for page %s and showing %s records per page', title, page, per_page)
        filtered_dataframe = self.data.loc[(self.data['title'].str.contains(title))]
        total = len(filtered_dataframe.index)
        total_pages = math.ceil(total / per_page)
        logger.info('total pages are %i', total_pages)
        start_index = page * per_page
        to_index = ((page + 1) * per_page)
        logger.info('loading records from index %i to %i', start_index, to_index)
        filtered_dataframe = filtered_dataframe.iloc[start_index:to_index].to_dict(orient='records')
        records = {
            'page': page,
            'per_page': per_page,
            'total': total,
            'total_pages': total_pages,
            'data': filtered_dataframe
        }
        return records

    def data_trends(self):
        logger.info('predicting statistics about the data set')
        # column_name_list = self.data.columns.tolist()
        average_rating_column = self.data['average_rating']
        five_star_rating_column = self.data['five_star_ratings']
        page_count_column = self.data['number_of_pages']
        # idxmax returns the first occurence
        author_with_highest_5_stars = self.data.loc[five_star_rating_column.idxmax()]['author']
        author_with_lowest_5_stars = self.data.loc[five_star_rating_column.idxmin()]['author']
        title_with_highest_5_stars = self.data.loc[five_star_rating_column.idxmax()]['title']
        title_with_lowest_5_stars = self.data.loc[five_star_rating_column.idxmin()]['title']
        book_name_with_max_page_count = self.data.loc[page_count_column.idxmax()]['title']
        book_name_with_min_page_count = self.data.loc[page_count_column.idxmin()]['title']
        title_with_highest_average_rating = self.data.loc[average_rating_column.idxmax()]['title']
        title_with_lowest_average_rating = self.data.loc[average_rating_column.idxmin()]['title']
        trends = {'columns': ' '.join(map(str, columns)), 'records': len(self.data.index),
                  'author_with_highest_5_stars': author_with_highest_5_stars,
                  'author_with_lowest_5_stars': author_with_lowest_5_stars,
                  'title_with_highest_5_stars': title_with_highest_5_stars,
                  'title_with_lowest_5_stars': title_with_lowest_5_stars,
                  'title_with_highest_average_rating': title_with_highest_average_rating,
                  'title_with_lowest_average_rating': title_with_lowest_average_rating,
                  'highest_5_star_rating': int(five_star_rating_column.max()),
                  'lowest_5_star_rating': int(five_star_rating_column.min()),
                  'book_name_with_max_page_count': book_name_with_max_page_count,
                  'book_name_with_min_page_count': book_name_with_min_page_count,
                  'max_page_count': page_count_column.max(),
                  'min_page_count': page_count_column.min(),
                  'highest_average_rating': average_rating_column.max(),
                  'lowest_average_rating': average_rating_column.min()}
        return trends
