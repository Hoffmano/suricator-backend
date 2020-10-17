import sys
import os
import nltk
nltk.download()
import nltk.tokenize.punkt
import json


txt = sys.argv[1]

def sentence_count(txt):
    return len(nltk.sent_tokenize(txt))


if __name__ == "__main__":
    sentence_count = sentence_count(txt)

    print(json.dumps({
        "sentences": sentence_count
    }))