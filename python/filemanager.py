from contextlib import contextmanager
import pandas as pd


@contextmanager
def open_file(path, mode):
    file_to = open(path, mode)
    yield file_to
    file_to.close()
